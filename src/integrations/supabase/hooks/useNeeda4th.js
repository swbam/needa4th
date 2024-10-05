import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "sonner";
import { teeTimes, users } from '../../../utils/csvData';

export const useTeeTimes = () => useQuery({
    queryKey: ['tee_times'],
    queryFn: () => teeTimes,
});

export const useNeeda4th = (id) => useQuery({
    queryKey: ['needa4th', id],
    queryFn: () => teeTimes.find(teeTime => teeTime.id === id),
});

export const useNeeda4ths = () => useQuery({
    queryKey: ['needa4th'],
    queryFn: () => teeTimes,
});

export const useAddNeeda4th = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newNeeda4th) => {
            // Simulate adding a new tee time
            const updatedTeeTimes = [...teeTimes, { ...newNeeda4th, id: Date.now() }];
            return Promise.resolve(updatedTeeTimes);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['needa4th'] });
            toast.success("Successfully added new needa4th.");
        },
        onError: () => {
            toast.error("Failed to add new needa4th. Please try again.");
        },
    });
};

export const useUpdateNeeda4th = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => {
            // Simulate updating a tee time
            const updatedTeeTimes = teeTimes.map(teeTime => 
                teeTime.id === id ? { ...teeTime, ...updateData } : teeTime
            );
            return Promise.resolve(updatedTeeTimes);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['needa4th'] });
            toast.success("Successfully updated needa4th.");
        },
        onError: () => {
            toast.error("Failed to update needa4th. Please try again.");
        },
    });
};

export const useDeleteNeeda4th = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => {
            // Simulate deleting a tee time
            const updatedTeeTimes = teeTimes.filter(teeTime => teeTime.id !== id);
            return Promise.resolve(updatedTeeTimes);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['needa4th'] });
            toast.success("Successfully deleted needa4th.");
        },
        onError: () => {
            toast.error("Failed to delete needa4th. Please try again.");
        },
    });
};

export const useUpdateTeeTime = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => {
            // Simulate updating a tee time
            const updatedTeeTimes = teeTimes.map(teeTime => 
                teeTime.id === id ? { ...teeTime, ...updateData } : teeTime
            );
            return Promise.resolve(updatedTeeTimes);
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

export const useUsers = () => useQuery({
    queryKey: ['users'],
    queryFn: () => users,
});