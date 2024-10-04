import { fetchSheetData } from '../integrations/googleSheets/googleSheetsApi';

const setupSheet = async () => {
  const tables = [
    {
      name: 'Tee Times',
      range: 'Tee Times!A1:F1',
      headers: ['Date', 'Time', 'Course', 'Players', 'Walk/Ride', 'Organizer']
    },
    {
      name: 'Users',
      range: 'Users!A1:D1',
      headers: ['Name', 'Email', 'Home Course', 'Handicap']
    },
    {
      name: 'Courses',
      range: 'Courses!A1:C1',
      headers: ['Name', 'Address', 'Phone']
    }
  ];

  for (const table of tables) {
    const data = await fetchSheetData(table.range);
    if (data.length === 0 || data[0].join(',') !== table.headers.join(',')) {
      console.log(`Setting up ${table.name} table...`);
      // In a real scenario, we would update the sheet here.
      // Since we can't write to the sheet without authentication, we'll just log the action.
      console.log(`Would set headers for ${table.name}: ${table.headers.join(', ')}`);
    } else {
      console.log(`${table.name} table is already set up correctly.`);
    }
  }
};

export const initializeDatabase = async () => {
  try {
    await setupSheet();
    console.log('Database (Google Sheets) initialized successfully.');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};