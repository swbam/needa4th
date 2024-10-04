import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchSheetData, updateSheetData, appendSheetData } from '../googleSheetsApi';
import { toast } from "sonner";

export const useTeeTimes = () => {
  return useQuery({
    queryKey: ['tee_times'],
    queryFn: async () => {
      try {
        const sheetData = await fetchSheetData();
        
        // Assuming the first row is headers
        const headers = sheetData[0];
        const teeTimesData = sheetData.slice(1).map(row => {
          const teeTime = {};
          headers.forEach((header, index) => {
            teeTime[header.toLowerCase().replace(' ', '_')] = row[index];
          });
          return teeTime;
        });

        console.log('Fetched tee times:', teeTimesData);
        return teeTimesData;
      } catch (error) {
        console.error('Error fetching tee times:', error);
        toast.error("Failed to fetch tee times. Please check the console for more details.");
        throw error;
      }
    },
    retry: 3,
    retryDelay: 1000,
  });
};

export const useAddTeeTime = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (newTeeTime) => {
      const values = [
        [newTeeTime.date, newTeeTime.time, newTeeTime.course, newTeeTime.players.join(', ')]
      ];
      return await appendSheetData(values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('tee_times');
      toast.success("Tee time added successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to add tee time: ${error.message}`);
    },
  });
};

export const useUpdateTeeTime = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ index, updatedTeeTime }) => {
      const range = `A${index + 2}:D${index + 2}`; // +2 because sheet is 1-indexed and we have a header row
      const values = [
        [updatedTeeTime.date, updatedTeeTime.time, updatedTeeTime.course, updatedTeeTime.players.join(', ')]
      ];
      return await updateSheetData(range, values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('tee_times');
      toast.success("Tee time updated successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to update tee time: ${error.message}`);
    },
  });
};

export const useDeleteTeeTime = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (index) => {
      // To delete, we'll update the row with empty values
      const range = `A${index + 2}:D${index + 2}`;
      const values = [['', '', '', '']];
      return await updateSheetData(range, values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('tee_times');
      toast.success("Tee time deleted successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to delete tee time: ${error.message}`);
    },
  });
};