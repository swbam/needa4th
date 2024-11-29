import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "sonner";
import { format, parseISO, addDays } from 'date-fns';

const fromSupabase = async (query) => {
    try {
        // Instead of fetching from Supabase, return our prototype data
        const today = new Date();
        const prototypeData = [
            {
                id: 1,
                date_time: addDays(today, 1).toISOString(),
                course: { id: 1, name: 'Henry Horton' },
                organizer_id: 1,
                attendees: [
                    { player: { id: 1, name: 'Parker Smith' } },
                    { player: { id: 2, name: 'Jesus Rios' } }
                ]
            },
            {
                id: 2,
                date_time: addDays(today, 2).toISOString(),
                course: { id: 2, name: 'Towhee' },
                organizer_id: 2,
                attendees: [
                    { player: { id: 3, name: 'Dominic Nanni' } },
                    { player: { id: 4, name: 'Connor Stanley' } }
                ]
            },
            {
                id: 3,
                date_time: addDays(today, 3).toISOString(),
                course: { id: 3, name: 'Harpeth Hills' },
                organizer_id: 3,
                attendees: [
                    { player: { id: 5, name: 'Derek Kozakiewicz' } },
                    { player: { id: 1, name: 'Parker Smith' } }
                ]
            },
            {
                id: 4,
                date_time: addDays(today, 4).toISOString(),
                course: { id: 4, name: 'McCabe' },
                organizer_id: 4,
                attendees: [
                    { player: { id: 2, name: 'Jesus Rios' } },
                    { player: { id: 3, name: 'Dominic Nanni' } }
                ]
            },
            {
                id: 5,
                date_time: addDays(today, 5).toISOString(),
                course: { id: 5, name: 'Ted Rhodes' },
                organizer_id: 5,
                attendees: [
                    { player: { id: 4, name: 'Connor Stanley' } },
                    { player: { id: 5, name: 'Derek Kozakiewicz' } }
                ]
            }
        ];

        return prototypeData;
    } catch (error) {
        console.error('Error fetching tee times:', error);
        return [];
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
            const data = await fromSupabase();
            return data?.map(teeTime => ({
                ...teeTime,
                formattedDate: formatDate(teeTime.date_time),
                formattedTime: formatTime(teeTime.date_time),
                attendees: teeTime.attendees || []
            })) || [];
        } catch (error) {
            console.error('Error fetching tee times:', error);
            toast.error("Failed to fetch tee times");
            return [];
        }
    },
    retry: 1,
    retryDelay: 1000,
});

export const useUpdateTeeTime = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async ({ id, attendees }) => {
            try {
                console.log('Starting mutation with:', { id, attendees });
                
                // Get current data
                const currentData = queryClient.getQueryData(['tee_times']);
                if (!currentData) {
                    throw new Error('No tee times data found');
                }

                // Create updated data
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

                // Update cache immediately for optimistic updates
                queryClient.setQueryData(['tee_times'], updatedData);

                // Return the updated tee time
                const updatedTeeTime = updatedData.find(teeTime => teeTime.id === id);
                if (!updatedTeeTime) {
                    throw new Error('Failed to find updated tee time');
                }

                console.log('Successfully updated tee time:', updatedTeeTime);
                return updatedTeeTime;
            } catch (error) {
                console.error('Error in mutation:', error);
                throw error;
            }
        },
        onSuccess: (data) => {
            console.log('Mutation successful, invalidating queries');
            queryClient.invalidateQueries({ queryKey: ['tee_times'] });
            const playerNames = data.attendees.map(a => a.player.name).join(', ');
            toast.success(`Successfully updated tee time with players: ${playerNames}`);
        },
        onError: (error) => {
            console.error('Mutation error:', error);
            toast.error("Failed to update tee time. Please try again.");
            // Revert optimistic update on error
            queryClient.invalidateQueries({ queryKey: ['tee_times'] });
        }
    });
};

export const useAddTeeTime = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newTeeTime) => {
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