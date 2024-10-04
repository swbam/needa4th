const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID;

export const fetchSheetData = async (range = 'A1:Z1000') => {
  if (!SHEET_ID) {
    console.error('Google Sheet ID is not defined. Please check your .env file.');
    return [];
  }

  const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}`);

  if (!response.ok) {
    throw new Error('Failed to fetch Google Sheets data');
  }

  const data = await response.json();
  return data.values || [];
};

// Note: Update and append operations require authentication, which we're not implementing here.
// If needed in the future, we'll need to implement a server-side solution for these operations.