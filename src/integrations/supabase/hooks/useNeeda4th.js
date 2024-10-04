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
            const data = await fromSupabase(supabase.from('tee_times').select('*').order('tee_date', { ascending: true }));
            console.log('Fetched tee times:', data); // Log fetched data
            return data;
        } catch (error) {
            console.error('Error fetching tee times:', error);
            toast.error("Failed to fetch tee times. Please try again later.");
            throw error;
        }
    },
});

export const useNeeda4th = (id) => useQuery({
    queryKey: ['needa4th', id],
    queryFn: async () => {
        try {
            return await fromSupabase(supabase.from('needa4th').select('*').eq('id', id).single());
        } catch (error) {
            console.error('Error fetching needa4th:', error);
            toast.error("Failed to fetch needa4th data. Please try again later.");
            throw error;
        }
    },
});

export const useNeeda4ths = () => useQuery({
    queryKey: ['needa4th'],
    queryFn: async () => {
        try {
            return await fromSupabase(supabase.from('needa4th').select('*'));
        } catch (error) {
            console.error('Error fetching needa4ths:', error);
            toast.error("Failed to fetch needa4ths data. Please try again later.");
            throw error;
        }
    },
});

export const useAddNeeda4th = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newNeeda4th) => {
            return await fromSupabase(supabase.from('needa4th').insert([newNeeda4th]));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['needa4th'] });
            toast.success("Successfully added new needa4th.");
        },
        onError: (error) => {
            console.error('Error adding needa4th:', error);
            toast.error("Failed to add new needa4th. Please try again.");
        },
    });
};

export const useUpdateNeeda4th = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...updateData }) => {
            return await fromSupabase(supabase.from('needa4th').update(updateData).eq('id', id));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['needa4th'] });
            toast.success("Successfully updated needa4th.");
        },
        onError: (error) => {
            console.error('Error updating needa4th:', error);
            toast.error("Failed to update needa4th. Please try again.");
        },
    });
};

export const useDeleteNeeda4th = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            return await fromSupabase(supabase.from('needa4th').delete().eq('id', id));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['needa4th'] });
            toast.success("Successfully deleted needa4th.");
        },
        onError: (error) => {
            console.error('Error deleting needa4th:', error);
            toast.error("Failed to delete needa4th. Please try again.");
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

export const useUsers = () => useQuery({
    queryKey: ['users'],
    queryFn: async () => {
        try {
            return await fromSupabase(supabase.from('users').select('*'));
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error("Failed to fetch users. Please try again later.");
            throw error;
        }
    },
});