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
        try {
            const query = supabase
                .from('tee_times')
                .select('*')
                .order('tee_date', { ascending: true });
            
            const data = await fromSupabase(query);
            
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
    retry: 3,
    retryDelay: 1000,
});

export const useAddTeeTime = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newTeeTime) => fromSupabase(supabase.from('tee_times').insert([newTeeTime])),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tee_times'] });
            toast.success("Tee time added successfully!");
        },
        onError: (error) => {
            toast.error(`Failed to add tee time: ${error.message}`);
        },
    });
};

export const useUpdateTeeTime = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('tee_times').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tee_times'] });
            toast.success("Tee time updated successfully!");
        },
        onError: (error) => {
            toast.error(`Failed to update tee time: ${error.message}`);
        },
    });
};

export const useDeleteTeeTime = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('tee_times').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tee_times'] });
            toast.success("Tee time deleted successfully!");
        },
        onError: (error) => {
            toast.error(`Failed to delete tee time: ${error.message}`);
        },
    });
};