import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';
import { toast } from "sonner";

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) {
        console.error('Supabase error:', error);
        throw new Error(error.message);
    }
    return data;
};

export const useTeeTimes = () => useQuery({
    queryKey: ['tee_times'],
    queryFn: async () => {
        console.log('Fetching tee times...');
        try {
            const query = supabase
                .from('tee_times')
                .select('*')
                .order('tee_date', { ascending: true });
            
            console.log('Supabase query:', query.toSQL());
            
            const data = await fromSupabase(query);
            console.log('Fetched tee times:', data);
            
            if (!data || data.length === 0) {
                console.log('No tee times found in the database.');
            }
            
            return data;
        } catch (error) {
            console.error('Error fetching tee times:', error);
            toast.error("Failed to fetch tee times. Please try again later.");
            throw error;
        }
    },
});

export const useTeeTime = (id) => useQuery({
    queryKey: ['tee_times', id],
    queryFn: () => fromSupabase(supabase.from('tee_times').select('*').eq('id', id).single()),
});

export const useAddTeeTime = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newTeeTime) => fromSupabase(supabase.from('tee_times').insert([newTeeTime])),
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