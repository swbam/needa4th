import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) {
        throw new Error(error.message);
    }
    return data;
};

const ensureTablesExist = async () => {
    await supabase.rpc('create_tee_times_table');
    await supabase.rpc('create_users_table');
};

export const useTeeTimes = () => useQuery({
    queryKey: ['tee_times'],
    queryFn: async () => {
        try {
            await ensureTablesExist();
            return await fromSupabase(supabase.from('tee_times').select('*').order('tee_date', { ascending: true }));
        } catch (error) {
            console.error('Error fetching tee times:', error);
            throw error;
        }
    },
});

export const useNeeda4th = (id) => useQuery({
    queryKey: ['needa4th', id],
    queryFn: async () => {
        try {
            await ensureTablesExist();
            return await fromSupabase(supabase.from('needa4th').select('*').eq('id', id).single());
        } catch (error) {
            console.error('Error fetching needa4th:', error);
            throw error;
        }
    },
});

export const useNeeda4ths = () => useQuery({
    queryKey: ['needa4th'],
    queryFn: async () => {
        try {
            await ensureTablesExist();
            return await fromSupabase(supabase.from('needa4th').select('*'));
        } catch (error) {
            console.error('Error fetching needa4ths:', error);
            throw error;
        }
    },
});

export const useAddNeeda4th = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newNeeda4th) => {
            await ensureTablesExist();
            return await fromSupabase(supabase.from('needa4th').insert([newNeeda4th]));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['needa4th'] });
        },
    });
};

export const useUpdateNeeda4th = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...updateData }) => {
            await ensureTablesExist();
            return await fromSupabase(supabase.from('needa4th').update(updateData).eq('id', id));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['needa4th'] });
        },
    });
};

export const useDeleteNeeda4th = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            await ensureTablesExist();
            return await fromSupabase(supabase.from('needa4th').delete().eq('id', id));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['needa4th'] });
        },
    });
};

export const useUpdateTeeTime = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...updateData }) => {
            await ensureTablesExist();
            return await fromSupabase(supabase.from('tee_times').update(updateData).eq('id', id));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tee_times'] });
        },
    });
};

export const useUsers = () => useQuery({
    queryKey: ['users'],
    queryFn: async () => {
        try {
            await ensureTablesExist();
            return await fromSupabase(supabase.from('users').select('*'));
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },
});