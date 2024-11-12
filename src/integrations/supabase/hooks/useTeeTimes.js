import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';
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
        organizer: { id: 3, name: 'Dominic Nanni' },
        attendees: [
          { player: { id: 3, name: 'Dominic Nanni' } },
          { player: { id: 4, name: 'Connor Stanley' } }
        ]
      }
    ];

    return prototypeData;
  } catch (error) {
    console.error('Error fetching tee times:', error);
    return [];
  }
};

export const useTeeTimes = () => useQuery({
  queryKey: ['tee_times'],
  queryFn: async () => {
    try {
      const data = await fromSupabase();
      return data?.map(teeTime => ({
        ...teeTime,
        formattedDate: format(parseISO(teeTime.date_time), 'EEE, MMM d'),
        formattedTime: format(parseISO(teeTime.date_time), 'h:mm a'),
        attendees: teeTime.attendees || []
      })) || [];
    } catch (error) {
      console.error('Error fetching tee times:', error);
      return [];
    }
  }
});

export const useUpdateTeeTime = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updateData }) => {
      const currentData = queryClient.getQueryData(['tee_times']) || [];
      const updatedData = currentData.map(teeTime => 
        teeTime.id === id ? { ...teeTime, ...updateData } : teeTime
      );
      queryClient.setQueryData(['tee_times'], updatedData);
      return { id, ...updateData };
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