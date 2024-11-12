import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';
import { toast } from "sonner";
import { format, parseISO } from 'date-fns';

const fromSupabase = async (query) => {
    try {
        const { data, error } = await query;
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Supabase query error:', error);
        throw new Error('Unable to fetch data. Please ensure database tables are properly configured.');
    }
};

const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    try {
        const date = parseISO(dateString);
        return format(date, 'EEE, MMM d');
    } catch (error) {
        return 'Invalid date';
    }
};

const formatTime = (dateString) => {
    if (!dateString) return 'Time not specified';
    try {
        const date = parseISO(dateString);
        return format(date, 'h:mm a');
    } catch (error) {
        return dateString;
    }
};

export const useTeeTimes = () => useQuery({
    queryKey: ['tee_times'],
    queryFn: async () => {
        try {
            const { data, error } = await supabase
                .from('tee_times')
                .select('*, course:course_id(id, name), players_tee_times(player:player_id(id, name))');
            
            if (error) throw error;
            
            return data?.map(teeTime => ({
                ...teeTime,
                formattedDate: formatDate(teeTime.date_time),
                formattedTime: formatTime(teeTime.date_time),
                attendees: teeTime.players_tee_times || []
            })) || [];
        } catch (error) {
            console.error('Error fetching tee times:', error);
            return [];
        }
    },
    retry: 1,
    retryDelay: 1000,
});

export const useAddTeeTime = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newTeeTime) => {
            const { data, error } = await supabase
                .from('tee_times')
                .insert(newTeeTime)
                .select()
                .single();
            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tee_times'] });
            toast.success("Successfully added new tee time.");
        },
        onError: (error) => {
            console.error('Error adding tee time:', error);
            toast.error("Failed to add tee time. Please ensure database is properly configured.");
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
                .select()
                .single();
            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tee_times'] });
            toast.success("Successfully updated tee time.");
        },
        onError: (error) => {
            console.error('Error updating tee time:', error);
            toast.error("Failed to update tee time. Please ensure database is properly configured.");
        },
    });
};

export const useDeleteTeeTime = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            const { error } = await supabase
                .from('tee_times')
                .delete()
                .eq('id', id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tee_times'] });
            toast.success("Successfully deleted tee time.");
        },
        onError: (error) => {
            console.error('Error deleting tee time:', error);
            toast.error("Failed to delete tee time. Please ensure database is properly configured.");
        },
    });
};