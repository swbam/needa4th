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
            const data = await fromSupabase(supabase.from('tee_times').select('*').order('date', { ascending: true }));
            console.log('Fetched tee times:', data);
            return data;
        } catch (error) {
            console.error('Error fetching tee times:', error);
            toast.error("Failed to fetch tee times. Please try again later.");
            throw error;
        }
    },
});

export const useAddTeeTime = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newTeeTime) => {
            return await fromSupabase(supabase.from('tee_times').insert([newTeeTime]));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tee_times'] });
            toast.success("Successfully added new tee time.");
        },
        onError: (error) => {
            console.error('Error adding tee time:', error);
            toast.error("Failed to add new tee time. Please try again.");
        },
    });
};

export const useUpdateTeeTime = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...updateData }) => {
            return await fromSupabase(supabase.from('tee_times').update(updateData).eq('id', id));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tee_times'] });
            toast.success("Successfully updated tee time.");
        },
        onError: (error) => {
            console.error('Error updating tee time:', error);
            toast.error("Failed to update tee time. Please try again.");
        },
    });
};

export const useDeleteTeeTime = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            return await fromSupabase(supabase.from('tee_times').delete().eq('id', id));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tee_times'] });
            toast.success("Successfully deleted tee time.");
        },
        onError: (error) => {
            console.error('Error deleting tee time:', error);
            toast.error("Failed to delete tee time. Please try again.");
        },
    });
};