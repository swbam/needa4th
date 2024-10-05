import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "sonner";
import { teeTimes } from '../../../utils/csvData';

export const useTeeTimes = () => useQuery({
    queryKey: ['tee_times'],
    queryFn: () => teeTimes,
});

export const useAddTeeTime = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newTeeTime) => {
            // Simulate adding a new tee time
            const updatedTeeTimes = [...teeTimes, { ...newTeeTime, id: Date.now() }];
            return Promise.resolve(updatedTeeTimes);
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

export const useDeleteTeeTime = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => {
            // Simulate deleting a tee time
            const updatedTeeTimes = teeTimes.filter(teeTime => teeTime.id !== id);
            return Promise.resolve(updatedTeeTimes);
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