const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID;

export const fetchSheetData = async () => {
  const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1!A1:Z1000`);

  if (!response.ok) {
    throw new Error('Failed to fetch Google Sheets data');
  }

  const data = await response.json();
  return data.values;
};

export const updateSheetData = async (range, values) => {
  const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?valueInputOption=USER_ENTERED`, {
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
  const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/A1:append?valueInputOption=USER_ENTERED`, {
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