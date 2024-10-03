import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) {
        throw new Error(error.message);
    }
    return data;
};

const createTeeTimesTable = async () => {
    const { error } = await supabase.rpc('create_tee_times_table');
    if (error) throw new Error('Failed to create tee_times table');
};

const addDateColumnToTeeTimesTable = async () => {
    const { error } = await supabase.rpc('add_date_column_to_tee_times');
    if (error) throw new Error('Failed to add date column to tee_times table');
};

export const useTeeTimes = () => useQuery({
    queryKey: ['tee_times'],
    queryFn: async () => {
        try {
            return await fromSupabase(supabase.from('tee_times').select('*').order('date', { ascending: true }));
        } catch (error) {
            if (error.message.includes('relation "public.tee_times" does not exist')) {
                await createTeeTimesTable();
                return await fromSupabase(supabase.from('tee_times').select('*').order('date', { ascending: true }));
            } else if (error.message.includes('column tee_times.date does not exist')) {
                await addDateColumnToTeeTimesTable();
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
