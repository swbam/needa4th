const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;

export const fetchSheetData = async () => {
  if (!SHEET_ID) {
    console.error('Google Sheet ID is not defined. Please check your .env file.');
    return [];
  }

  if (!API_KEY) {
    console.error('Google Sheets API Key is not defined. Please check your .env file.');
    return [];
  }

  const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1!A1:Z1000?key=${API_KEY}`);

  if (!response.ok) {
    throw new Error('Failed to fetch Google Sheets data');
  }

  const data = await response.json();
  return data.values || [];
};

export const updateSheetData = async (range, values) => {
  if (!SHEET_ID || !API_KEY) {
    console.error('Google Sheet ID or API Key is not defined. Please check your .env file.');
    return;
  }

  const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?valueInputOption=USER_ENTERED&key=${API_KEY}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: values,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to update Google Sheets data');
  }

  return await response.json();
};

export const appendSheetData = async (values) => {
  if (!SHEET_ID || !API_KEY) {
    console.error('Google Sheet ID or API Key is not defined. Please check your .env file.');
    return;
  }

  const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/A1:append?valueInputOption=USER_ENTERED&key=${API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: values,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to append to Google Sheets');
  }

  return await response.json();
};