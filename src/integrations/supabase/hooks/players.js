import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';
import { toast } from "sonner";

const fromSupabase = async (query) => {
    try {
        const { data, error } = await query;
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Supabase query error:', error);
        return [];
    }
};

export const usePlayer = (id) => useQuery({
    queryKey: ['players', id],
    queryFn: () => fromSupabase(supabase.from('players').select('*').eq('id', id).single()),
    retry: 1,
    enabled: !!id,
});

export const usePlayers = () => useQuery({
    queryKey: ['players'],
    queryFn: () => fromSupabase(supabase.from('players').select('*')),
    retry: 1,
    retryDelay: 1000,
});

export const useAddPlayer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newPlayer) => {
            const { data, error } = await supabase
                .from('players')
                .insert([newPlayer])
                .select()
                .single();
            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['players'] });
            toast.success("Successfully added new player.");
        },
        onError: (error) => {
            console.error('Error adding player:', error);
            toast.error("Failed to add player. Please ensure database is properly configured.");
        },
    });
};

export const useUpdatePlayer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...updateData }) => {
            const { data, error } = await supabase
                .from('players')
                .update(updateData)
                .eq('id', id)
                .select();
            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['players'] });
            toast.success("Successfully updated player.");
        },
        onError: (error) => {
            console.error('Error updating player:', error);
            toast.error("Failed to update player. Please ensure database is properly configured.");
        },
    });
};

export const useDeletePlayer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            const { error } = await supabase
                .from('players')
                .delete()
                .eq('id', id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['players'] });
            toast.success("Successfully deleted player.");
        },
        onError: (error) => {
            console.error('Error deleting player:', error);
            toast.error("Failed to delete player. Please ensure database is properly configured.");
        },
    });
};