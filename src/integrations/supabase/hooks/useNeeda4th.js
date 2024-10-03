import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) {
        if (error.code === '42P01') {
            console.error('Table does not exist. Please create the table in Supabase.');
            return [];
        }
        throw new Error(error.message);
    }
    return data;
};

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

export const useTeeTimes = () => useQuery({
    queryKey: ['tee_times'],
    queryFn: async () => {
        try {
            return await fromSupabase(supabase.from('tee_times').select('*').order('date', { ascending: true }));
        } catch (error) {
            console.error('Error fetching tee times:', error);
            return [];
        }
    },
});

export const useAddTeeTime = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newTeeTime) => {
            try {
                return await fromSupabase(supabase.from('tee_times').insert([newTeeTime]));
            } catch (error) {
                console.error('Error adding tee time:', error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tee_times'] });
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

export const useDeleteTeeTime = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('tee_times').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tee_times'] });
        },
    });
};
