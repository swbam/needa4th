import { useQuery } from '@tanstack/react-query';
import { fetchSheetData, useGoogleSheetsAuth } from '../googleSheetsApi';
import { toast } from "sonner";

export const useTeeTimes = () => {
  const login = useGoogleSheetsAuth();

  return useQuery({
    queryKey: ['tee_times'],
    queryFn: async () => {
      try {
        const response = await login();
        const sheetData = await fetchSheetData(response.access_token);
        
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

// Note: Add, Update, and Delete operations would require write access to the sheet
// and more complex logic to modify the Google Sheet. For now, these are placeholders.

export const useAddTeeTime = () => {
  // Implement Google Sheets write operation
};

export const useUpdateTeeTime = () => {
  // Implement Google Sheets update operation
};

export const useDeleteTeeTime = () => {
  // Implement Google Sheets delete operation
};