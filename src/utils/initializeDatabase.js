import { fetchSheetData } from '../integrations/googleSheets/googleSheetsApi';

export const initializeDatabase = async () => {
  try {
    const sheetData = await fetchSheetData();
    console.log('Google Sheets data fetched successfully:', sheetData);
    // You can perform any initial data processing here if needed
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};