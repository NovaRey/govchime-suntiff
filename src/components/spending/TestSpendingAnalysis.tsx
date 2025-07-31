import React from 'react';

const TestSpendingAnalysis: React.FC = () => {
  return (
    <div className="space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-200">
      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Test Spending Analysis</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-4">
          This is a test version to verify the page loads correctly.
        </p>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
            <div className="space-y-2">
              <p>Total Spending: $500B</p>
              <p>Active Contracts: 125,000</p>
              <p>Growth Rate: +12.4%</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">NAICS Codes</h2>
            <div className="space-y-2">
              <p>541511 - Computer Programming</p>
              <p>561210 - Facilities Support</p>
              <p>237310 - Highway Construction</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestSpendingAnalysis;
