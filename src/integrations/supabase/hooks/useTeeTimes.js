import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';
import { toast } from "sonner";
import { format, parseISO } from 'date-fns';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

export const useTeeTimes = () => useQuery({
    queryKey: ['tee_times'],
    queryFn: async () => {
        const { data, error } = await supabase
            .from('tee_times')
            .select(`
                *,
                course:courses(id, name),
                attendees:players_tee_times(player:players(id, name))
            `);
        if (error) throw error;
        return data.map(teeTime => ({
            ...teeTime,
            formattedDate: formatDate(teeTime.date_time),
            formattedTime: formatTime(teeTime.date_time)
        }));
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

const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    try {
        const date = parseISO(dateString);
        return format(date, 'EEE, MMM d');
    } catch (error) {
        console.error('Error parsing date:', error);
        return 'Invalid date';
    }
};

const formatTime = (dateString) => {
    if (!dateString) return 'Time not specified';
    try {
        const date = parseISO(dateString);
        return format(date, 'h:mm a');
    } catch (error) {
        console.error('Error parsing time:', error);
        return dateString;
    }
};