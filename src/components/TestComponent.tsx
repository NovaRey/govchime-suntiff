import React from 'react';

const TestComponent: React.FC = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <h1 style={{ color: '#333' }}>Test Component Working!</h1>
      <p style={{ color: '#666' }}>If you can see this, React is working properly.</p>
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#e0ffe0', border: '1px solid #4caf50' }}>
        ✅ Component rendered successfully
      </div>
    </div>
  );
};

export default TestComponent;
