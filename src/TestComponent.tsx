import React from 'react';

const TestComponent: React.FC = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <h1 style={{ color: '#333', fontSize: '24px', marginBottom: '16px' }}>
        Test Component Working!
      </h1>
      <p style={{ color: '#666', fontSize: '16px' }}>
        This is a basic test component to verify React is rendering correctly.
      </p>
      <div style={{ marginTop: '16px', padding: '8px', backgroundColor: '#fff', borderRadius: '4px' }}>
        Timestamp: {new Date().toLocaleString()}
      </div>
    </div>
  );
};

export default TestComponent;
