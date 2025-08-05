import { useState } from 'react';
import { testApiConnection } from '../../services/samGovApi';

export function ApiDebugPanel() {
  const [testResult, setTestResult] = useState<any>(null);
  const [testing, setTesting] = useState(false);

  const runTest = async () => {
    setTesting(true);
    setTestResult(null);
    
    try {
      const result = await testApiConnection();
      setTestResult(result);
    } catch (error: any) {
      setTestResult({ error: error?.message || 'Unknown error' });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="fixed top-4 right-4 bg-white p-4 border border-gray-300 rounded-lg shadow-lg z-50 max-w-md">
      <h3 className="font-bold text-lg mb-2">SAM.gov API Debug</h3>
      
      <button
        onClick={runTest}
        disabled={testing}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {testing ? 'Testing...' : 'Test API Connection'}
      </button>
      
      {testResult && (
        <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
          <h4 className="font-semibold mb-2">Test Result:</h4>
          <pre className="whitespace-pre-wrap text-xs overflow-auto max-h-32">
            {JSON.stringify(testResult, null, 2)}
          </pre>
        </div>
      )}
      
      <div className="mt-2 text-xs text-gray-600">
        <p>Check browser console for detailed logs</p>
      </div>
    </div>
  );
}
