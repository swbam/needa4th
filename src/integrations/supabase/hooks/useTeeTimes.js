import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "sonner";
import { format, parseISO, addDays } from 'date-fns';

const fromSupabase = async (query) => {
    try {
        const today = new Date();
        const prototypeData = [
            {
                id: 1,
                date_time: addDays(today, 1).toISOString(),
                course: { id: 1, name: 'Henry Horton' },
                organizer: { id: 1, name: 'Parker Smith' },
                attendees: [
                    { player: { id: 1, name: 'Parker Smith' } },
                    { player: { id: 2, name: 'Jesus Rios' } }
                ]
            },
            {
                id: 2,
                date_time: addDays(today, 2).toISOString(),
                course: { id: 2, name: 'Towhee' },
                organizer: { id: 2, name: 'Jesus Rios' },
                attendees: [
                    { player: { id: 3, name: 'Dominic Nanni' } },
                    { player: { id: 4, name: 'Connor Stanley' } }
                ]
            },
            {
                id: 3,
                date_time: addDays(today, 3).toISOString(),
                course: { id: 3, name: 'Harpeth Hills' },
                organizer: { id: 3, name: 'Dominic Nanni' },
                attendees: [
                    { player: { id: 5, name: 'Derek Kozakiewicz' } },
                    { player: { id: 1, name: 'Parker Smith' } }
                ]
            }
        ];

        return prototypeData;
    } catch (error) {
        console.error('Error fetching tee times:', error);
        throw new Error('Failed to fetch tee times');
    }
};

const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    try {
        return format(parseISO(dateString), 'EEE, MMM d');
    } catch (error) {
        console.error('Error formatting date:', error);
        return 'Invalid date';
    }
};

const formatTime = (dateString) => {
    if (!dateString) return 'Time not specified';
    try {
        return format(parseISO(dateString), 'h:mm a');
    } catch (error) {
        console.error('Error formatting time:', error);
        return 'Invalid time';
    }
};

export const useTeeTimes = () => useQuery({
    queryKey: ['tee_times'],
    queryFn: async () => {
        try {
            const data = await fromSupabase();
            return data?.map(teeTime => ({
                ...teeTime,
                formattedDate: formatDate(teeTime.date_time),
                formattedTime: formatTime(teeTime.date_time),
                attendees: teeTime.attendees || []
            })) || [];
        } catch (error) {
            console.error('Error in useTeeTimes:', error);
            toast.error("Failed to fetch tee times");
            throw error;
        }
    },
    retry: 2,
    retryDelay: 1000,
});

export const useUpdateTeeTime = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async ({ id, attendees }) => {
            try {
                console.log('Starting tee time update:', { id, attendees });
                
                const currentData = queryClient.getQueryData(['tee_times']);
                if (!currentData) {
                    throw new Error('No tee times data found');
                }

                const updatedData = currentData.map(teeTime => {
                    if (teeTime.id === id) {
                        console.log('Updating tee time:', id, 'with attendees:', attendees);
                        return {
                            ...teeTime,
                            attendees: attendees
                        };
                    }
                    return teeTime;
                });

                queryClient.setQueryData(['tee_times'], updatedData);

                const updatedTeeTime = updatedData.find(teeTime => teeTime.id === id);
                if (!updatedTeeTime) {
                    throw new Error('Failed to find updated tee time');
                }

                console.log('Successfully updated tee time:', updatedTeeTime);
                return updatedTeeTime;
            } catch (error) {
                console.error('Error updating tee time:', error);
                throw error;
            }
        },
        onSuccess: (data) => {
            console.log('Update successful:', data);
            queryClient.invalidateQueries({ queryKey: ['tee_times'] });
            const playerNames = data.attendees.map(a => a.player.name).join(', ');
            toast.success(`Successfully updated tee time with players: ${playerNames}`);
        },
        onError: (error) => {
            console.error('Update failed:', error);
            toast.error("Failed to update tee time. Please try again.");
            queryClient.invalidateQueries({ queryKey: ['tee_times'] });
        }
    });
};

export const useAddTeeTime = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newTeeTime) => {
            try {
                const currentData = queryClient.getQueryData(['tee_times']) || [];
                const newId = Math.max(...currentData.map(t => t.id)) + 1;
                
                const teeTimeToAdd = {
                    id: newId,
                    ...newTeeTime,
                    attendees: []
                };
                
                const updatedData = [...currentData, teeTimeToAdd];
                queryClient.setQueryData(['tee_times'], updatedData);
                
                return teeTimeToAdd;
            } catch (error) {
                console.error('Error adding tee time:', error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tee_times'] });
            toast.success("Successfully added new tee time.");
        },
        onError: (error) => {
            console.error('Error adding tee time:', error);
            toast.error("Failed to add tee time. Please try again.");
        },
    });
};