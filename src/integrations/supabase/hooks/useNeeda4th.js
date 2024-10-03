import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) {
        throw new Error(error.message);
    }
    return data;
};

const updateTeeTimesTable = async () => {
    const { error } = await supabase.rpc('update_tee_times_table');
    if (error) throw new Error('Failed to update tee_times table');
};

const createOrUpdateUsersTable = async () => {
    const { error } = await supabase.rpc('create_or_update_users_table');
    if (error) throw new Error('Failed to create or update users table');
};

export const useTeeTimes = () => useQuery({
    queryKey: ['tee_times'],
    queryFn: async () => {
        try {
            return await fromSupabase(supabase.from('tee_times').select('*').order('date', { ascending: true }));
        } catch (error) {
            if (error.message.includes('column "date" does not exist')) {
                await updateTeeTimesTable();
                return await fromSupabase(supabase.from('tee_times').select('*').order('date', { ascending: true }));
            }
            throw error;
        }
    },
});

export const useNeeda4th = (id) => useQuery({
    queryKey: ['needa4th', id],
    queryFn: () => fromSupabase(supabase.from('needa4th').select('*').eq('id', id).single()),
});

export const useNeeda4ths = () => useQuery({
    queryKey: ['needa4th'],
    queryFn: () => fromSupabase(supabase.from('needa4th').select('*')),
});

export const useAddNeeda4th = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newNeeda4th) => fromSupabase(supabase.from('needa4th').insert([newNeeda4th])),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['needa4th'] });
        },
    });
};

export const useUpdateNeeda4th = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('needa4th').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['needa4th'] });
        },
    });
};

export const useDeleteNeeda4th = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('needa4th').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['needa4th'] });
        },
    });
};

export const useUpdateTeeTime = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('tee_times').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tee_times'] });
        },
    });
};

export const useUsers = () => useQuery({
    queryKey: ['users'],
    queryFn: async () => {
        try {
            return await fromSupabase(supabase.from('users').select('*'));
        } catch (error) {
            if (error.message.includes('relation "users" does not exist')) {
                await createOrUpdateUsersTable();
                return await fromSupabase(supabase.from('users').select('*'));
            }
            throw error;
        }
    },
});