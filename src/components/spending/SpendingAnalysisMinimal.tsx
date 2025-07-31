import React from 'react';
import { SpendingData } from '../../types';

interface SpendingAnalysisProps {
  spendingData: SpendingData[];
}

const SpendingAnalysisMinimal: React.FC<SpendingAnalysisProps> = ({ spendingData = [] }) => {
  console.log('SpendingAnalysisMinimal: Component loaded successfully');
  console.log('SpendingAnalysisMinimal: Data received:', spendingData?.length || 0, 'items');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Spending Analysis
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Federal contract spending patterns and trends
          </p>
        </div>

        {/* Status Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            System Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h3 className="font-semibold text-green-800 dark:text-green-300">Component</h3>
              <p className="text-green-600 dark:text-green-400">✅ Loaded Successfully</p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-semibold text-blue-800 dark:text-blue-300">Data</h3>
              <p className="text-blue-600 dark:text-blue-400">
                {spendingData?.length > 0 ? `✅ ${spendingData.length} states loaded` : '❌ No data'}
              </p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h3 className="font-semibold text-purple-800 dark:text-purple-300">Timestamp</h3>
              <p className="text-purple-600 dark:text-purple-400">
                {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>

        {/* Data Display */}
        {spendingData && spendingData.length > 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              State Spending Overview
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      State
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Total Spending
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Contracts
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Average Award
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {spendingData.slice(0, 10).map((state, index) => (
                    <tr key={state.state} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">
                        {state.state}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                        ${(state.totalSpending / 1000000).toFixed(1)}M
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                        {state.contractCount.toLocaleString()}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                        ${(state.averageAward / 1000000).toFixed(1)}M
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {spendingData.length > 10 && (
              <p className="mt-4 text-gray-500 dark:text-gray-400 text-center">
                Showing 10 of {spendingData.length} states
              </p>
            )}
          </div>
        ) : (
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
            <h2 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-2">
              Data Error
            </h2>
            <p className="text-red-700 dark:text-red-300 mb-4">
              Unable to load spending data. This might indicate an import or data structure issue.
            </p>
            <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded text-sm">
              <p className="text-red-800 dark:text-red-200">
                <strong>Debug Info:</strong><br/>
                spendingData type: {typeof spendingData}<br/>
                spendingData value: {JSON.stringify(spendingData).slice(0, 100)}...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpendingAnalysisMinimal;
