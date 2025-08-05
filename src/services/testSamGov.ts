// Simple test to check SAM.gov API without proxy
export const testDirectSamGovAPI = async () => {
  console.log('Testing direct SAM.gov API access...');
  
  const apiKey = 'uWiwJAsOb46Qfwd39xkOzCJCHwMVIVr1nyrtRvc8';
  
  // Try the actual SAM.gov API endpoints directly (CORS will block this, but we'll see different errors)
  const testEndpoints = [
    'https://api.sam.gov/opportunities/v2/search',
    'https://api.sam.gov/prod/opportunities/v2/search',
    'https://api.sam.gov/entity-information/v1/entities',
    'https://api.sam.gov/web/fsrs/api/v1/opportunities'
  ];
  
  for (const endpoint of testEndpoints) {
    try {
      console.log('Testing:', endpoint);
      
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'X-Api-Key': apiKey,
          'User-Agent': 'GovChime/1.0',
          'Accept': 'application/json'
        }
      });
      
      console.log(endpoint, '→ Status:', response.status);
      
      if (response.ok) {
        const data = await response.text();
        console.log('SUCCESS:', endpoint, data.substring(0, 200));
        return { success: true, endpoint, data };
      }
    } catch (error: any) {
      console.log('Error with', endpoint, ':', error.message);
      
      // CORS errors mean the endpoint exists but is blocked by browser
      if (error.message.includes('CORS') || error.message.includes('cross-origin')) {
        console.log('✅ CORS error indicates endpoint exists:', endpoint);
        return { 
          corsBlocked: true, 
          endpoint,
          note: 'Endpoint exists but blocked by CORS - this means our proxy should work'
        };
      }
    }
  }
  
  return { error: 'All endpoints failed' };
};
