import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';
import { toast } from "sonner";

export const useTeeTimes = () => useQuery({
    queryKey: ['tee_times'],
    queryFn: async () => {
        const { data, error } = await supabase.from('tee_times').select('*');
        if (error) throw error;
        return data;
    },
});

export const useAddTeeTime = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newTeeTime) => {
            const { data, error } = await supabase.from('tee_times').insert(newTeeTime).single();
            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tee_times'] });
            toast.success("Successfully added new tee time.");
        },
        onError: () => {
            toast.error("Failed to add new tee time. Please try again.");
        },
    });
};

export const useUpdateTeeTime = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...updateData }) => {
            const { data, error } = await supabase
                .from('tee_times')
                .update(updateData)
                .eq('id', id)
                .single();
            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tee_times'] });
            toast.success("Successfully updated tee time.");
        },
        onError: () => {
            toast.error("Failed to update tee time. Please try again.");
        },
    });
};

export const useDeleteTeeTime = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            const { error } = await supabase.from('tee_times').delete().eq('id', id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tee_times'] });
            toast.success("Successfully deleted tee time.");
        },
        onError: () => {
            toast.error("Failed to delete tee time. Please try again.");
        },
    });
};

export const useJoinTeeTime = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ teeTimeId, userId }) => {
            const { data, error } = await supabase
                .from('tee_time_attendees')
                .insert({ tee_time_id: teeTimeId, user_id: userId })
                .single();
            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tee_times'] });
            toast.success("Successfully joined tee time.");
        },
        onError: () => {
            toast.error("Failed to join tee time. Please try again.");
        },
    });
};