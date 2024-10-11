import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';
import { toast } from "sonner";

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
                course:courses(name),
                attendees:players_tee_times(player:players(id, name))
            `);
        if (error) throw error;
        console.log('Fetched tee times:', data);
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
        mutationFn: async ({ teeTimeId, playerId }) => {
            const { data, error } = await supabase
                .from('players_tee_times')
                .insert({ tee_time_id: teeTimeId, player_id: playerId })
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

// New function to test adding a tee time and a player
export const testAddTeeTimeAndPlayer = async () => {
    try {
        // Add a new tee time
        const { data: newTeeTime, error: teeTimeError } = await supabase
            .from('tee_times')
            .insert({
                date_time: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
                course_id: 1, // Assuming course with id 1 exists
                max_players: 4
            })
            .single();

        if (teeTimeError) throw teeTimeError;

        console.log('New tee time added:', newTeeTime);

        // Add a player to the tee time
        const { data: newPlayerTeeTime, error: playerTeeTimeError } = await supabase
            .from('players_tee_times')
            .insert({
                tee_time_id: newTeeTime.id,
                player_id: 1 // Assuming player with id 1 exists
            })
            .single();

        if (playerTeeTimeError) throw playerTeeTimeError;

        console.log('Player added to tee time:', newPlayerTeeTime);

        return { newTeeTime, newPlayerTeeTime };
    } catch (error) {
        console.error('Error in test:', error);
        throw error;
    }
};