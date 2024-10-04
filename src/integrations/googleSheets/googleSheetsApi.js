import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID; // Use environment variable
const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID; // Use environment variable

export const GoogleSheetsProvider = ({ children }) => (
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    {children}
  </GoogleOAuthProvider>
);

export const useGoogleSheetsAuth = () => {
  return useGoogleLogin({
    onSuccess: (response) => {
      console.log('Google login successful:', response);
      // You might want to store the access token in state or context
    },
    onError: (error) => console.error('Google login failed:', error),
    scope: 'https://www.googleapis.com/auth/spreadsheets',
  });
};

export const fetchSheetData = async (accessToken) => {
  const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/A1:Z1000`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch Google Sheets data');
  }

  const data = await response.json();
  return data.values;
};

export const createSheet = async (accessToken, sheetTitle) => {
  const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}:batchUpdate`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      requests: [
        {
          addSheet: {
            properties: {
              title: sheetTitle,
            },
          },
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create new sheet');
  }

  const data = await response.json();
  return data;
};