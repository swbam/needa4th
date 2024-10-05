import { importAllData } from './importData';

const runImport = async () => {
  try {
    await importAllData();
    console.log('Data import completed successfully');
  } catch (error) {
    console.error('Error during data import:', error);
  }
};

runImport();