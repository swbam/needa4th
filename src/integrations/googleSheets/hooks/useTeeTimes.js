import { useQuery } from '@tanstack/react-query';
import { fetchSheetData } from '../googleSheetsApi';
import { toast } from "sonner";

export const useTeeTimes = () => {
  return useQuery({
    queryKey: ['tee_times'],
    queryFn: async () => {
      try {
        const sheetData = await fetchSheetData('Tee Times!A:F');
        
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

// Note: Add, update, and delete operations are not implemented here as they require authentication.
// If needed, these operations should be implemented on a server-side component.
