import React from 'react';
import { SpendingData } from '../../types';

interface SpendingAnalysisProps {
  spendingData: SpendingData[];
}

const SpendingAnalysisSimple: React.FC<SpendingAnalysisProps> = ({ spendingData = [] }) => {
  console.log('SpendingAnalysisSimple rendering with:', spendingData.length, 'items');
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Spending Analysis - Simple Version
        </h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Debug Information
          </h2>
          <div className="space-y-2 text-gray-700 dark:text-gray-300">
            <p><strong>Data loaded:</strong> {spendingData.length} states</p>
            <p><strong>Component status:</strong> ✅ Rendering successfully</p>
            <p><strong>Date:</strong> {new Date().toLocaleString()}</p>
          </div>
        </div>

        {spendingData.length > 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              State Spending Data
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {spendingData.slice(0, 6).map((state, index) => (
                <div 
                  key={state.state} 
                  className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                    {state.state}
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <p>Total: ${(state.totalSpending / 1000000).toFixed(1)}M</p>
                    <p>Contracts: {state.contractCount}</p>
                    <p>Avg: ${(state.averageAward / 1000000).toFixed(1)}M</p>
                  </div>
                </div>
              ))}
            </div>
            
            {spendingData.length > 6 && (
              <p className="mt-4 text-gray-500 dark:text-gray-400 text-center">
                Showing 6 of {spendingData.length} states
              </p>
            )}
          </div>
        ) : (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800">
            <h2 className="text-xl font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
              No Data Available
            </h2>
            <p className="text-yellow-700 dark:text-yellow-300">
              The spending data array is empty or not loaded properly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpendingAnalysisSimple;
