import React from 'react';

const SaaSFramework = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <footer className="bg-white shadow mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © 2024 Needa4th Golf League. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SaaSFramework;