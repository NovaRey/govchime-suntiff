// SAM.gov API service for pulling live federal contract opportunities
const SAM_GOV_BASE_URL = '/api/sam/prod/opportunities/v2';
const SAM_GOV_API_KEY = 'uWiwJAsOb46Qfwd39xkOzCJCHwMVIVr1nyrtRvc8';

// Debug function to test API connectivity
const testApiConnection = async () => {
  console.log('🔍 Testing SAM.gov API connection with required parameters...');
  
  try {
    const testUrl = '/api/sam/prod/opportunities/v2/search';
    
    // Create date range (last 30 days to today)
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
    
    const testPayload = {
      limit: 10,
      offset: 0,
      postedFrom: thirtyDaysAgo.toISOString().split('T')[0], // YYYY-MM-DD format
      postedTo: today.toISOString().split('T')[0], // YYYY-MM-DD format
      ptype: "o", // opportunities
      solicitationNumber: "",
      state: "",
      zip: "",
      typeOfSetAside: "",
      typeOfSetAsideDescription: ""
    };
    
    console.log('� Test payload:', testPayload);
    
    const response = await fetch(testUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Api-Key': SAM_GOV_API_KEY,
        'User-Agent': 'GovChime/1.0'
      },
      body: JSON.stringify(testPayload)
    });
    
    console.log('📊 Test Response Status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ API SUCCESS! Data received:', {
        totalRecords: data.totalRecords || 0,
        opportunitiesCount: data.opportunitiesData?.length || 0
      });
      return { 
        status: response.status, 
        ok: response.ok, 
        data: JSON.stringify(data, null, 2).substring(0, 1000) + '...',
        totalRecords: data.totalRecords,
        opportunities: data.opportunitiesData?.length || 0
      };
    } else {
      const errorText = await response.text();
      console.error('❌ API Error:', errorText);
      return { 
        status: response.status, 
        ok: response.ok, 
        data: errorText 
      };
    }
  } catch (error: any) {
    console.error('❌ API Test Failed:', error);
    return { error: error?.message || 'Unknown error' };
  }
};

// Rate limiting and caching
interface CacheEntry {
  data: any;
  timestamp: number;
  expiresAt: number;
}

class RateLimiter {
  private requests: number[] = [];
  private readonly maxRequests = 1;
  private readonly timeWindow = 60000; // 1 minute
  private readonly minDelay = 60000; // 60 seconds between requests
  private lastRequestTime = 0;

  async waitForSlot(): Promise<void> {
    const now = Date.now();
    
    // Remove old requests outside the time window
    this.requests = this.requests.filter(time => now - time < this.timeWindow);
    
    // Check if we've hit the rate limit
    if (this.requests.length >= this.maxRequests) {
      const oldestRequest = Math.min(...this.requests);
      const waitTime = this.timeWindow - (now - oldestRequest) + 5000; // Add 5 second buffer
      console.log(`⏳ Rate limit reached, waiting ${Math.round(waitTime / 1000)}s`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      return this.waitForSlot(); // Recursive call after waiting
    }
    
    // Ensure minimum delay between requests
    const timeSinceLastRequest = now - this.lastRequestTime;
    if (timeSinceLastRequest < this.minDelay) {
      const delayTime = this.minDelay - timeSinceLastRequest;
      console.log(`⏳ Enforcing minimum delay, waiting ${Math.round(delayTime / 1000)}s`);
      await new Promise(resolve => setTimeout(resolve, delayTime));
    }
    
    // Record this request
    this.requests.push(Date.now());
    this.lastRequestTime = Date.now();
  }
}

class ApiCache {
  private cache = new Map<string, CacheEntry>();
  private readonly defaultTTL = 300000; // 5 minutes cache

  private generateKey(endpoint: string, payload: any): string {
    return `${endpoint}:${JSON.stringify(payload)}`;
  }

  get<T>(endpoint: string, payload: any): T | null {
    const key = this.generateKey(endpoint, payload);
    const entry = this.cache.get(key);
    
    if (!entry) return null;
    
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    
    console.log('📦 Cache hit for:', key);
    return entry.data;
  }

  set<T>(endpoint: string, payload: any, data: T, ttl?: number): void {
    const key = this.generateKey(endpoint, payload);
    const now = Date.now();
    
    this.cache.set(key, {
      data,
      timestamp: now,
      expiresAt: now + (ttl || this.defaultTTL)
    });
    
    console.log('💾 Cached data for:', key);
  }

  clear(): void {
    this.cache.clear();
    console.log('🗑️ Cache cleared');
  }
}

export interface SamGovOpportunity {
  noticeId: string;
  title: string;
  solicitationNumber?: string;
  department: string;
  subTier?: string;
  office?: string;
  postedDate: string;
  publicationDate: string;
  type: string;
  baseType?: string;
  archiveType?: string;
  archiveDate?: string;
  typeOfSetAsideDescription?: string;
  typeOfSetAside?: string;
  responseDeadLine?: string;
  naicsCode: string;
  naicsDescription?: string;
  naics?: string;
  classificationCode?: string;
  active: string;
  award?: {
    date: string;
    number: string;
    amount: string;
    awardee: {
      name: string;
      location: {
        streetAddress: string;
        city: { code: string; name: string; };
        state: { code: string; name: string; };
        zip: string;
        country: { code: string; name: string; };
      };
    };
  };
  placeOfPerformance?: {
    city: { code: string; name: string; };
    state: { code: string; name: string; };
    country: { code: string; name: string; };
  };
  organizationType?: string;
  officeAddress?: {
    zipcode: string;
    city: string;
    countryCode: string;
    state: string;
  };
  links?: Array<{ rel: string; href: string; }>;
  resourceLinks?: string[];
  uiLink?: string;
  description: string;
  organizationHierarchy?: {
    toptier_name: string;
    subtier_name: string;
    office_name: string;
  };
}

export interface SamGovApiResponse {
  totalRecords: number;
  limit?: number;
  offset?: number;
  opportunitiesData: SamGovOpportunity[];
  page?: number;
  size?: number;
}

class SamGovApiService {
  private baseUrl = SAM_GOV_BASE_URL;
  private rateLimiter = new RateLimiter();
  private cache = new ApiCache();
  private isRateLimited = false;
  private rateLimitResetTime = 0;

  private async makeRequest<T>(endpoint: string, payload: any = {}): Promise<T> {
    console.log('🔍 SAM.gov API Request:', {
      endpoint,
      payload,
      baseUrl: this.baseUrl,
    });

    // Check if base URL is configured
    if (!this.baseUrl) {
      console.warn('⚠️ SAM.gov API not configured - missing base URL');
      throw new Error('SAM_API_ERROR: API not configured - missing base URL');
    }

    // Check if we're currently rate limited
    if (this.isRateLimited && Date.now() < this.rateLimitResetTime) {
      const waitTime = Math.round((this.rateLimitResetTime - Date.now()) / 1000);
      console.warn(`⚠️ Still rate limited, ${waitTime}s remaining`);
      throw new Error(`SAM_API_ERROR: 429 - Rate Limited (${waitTime}s remaining)`);
    }

    // Check cache first
    const cachedData = this.cache.get<T>(endpoint, payload);
    if (cachedData) {
      return cachedData;
    }

    // Wait for rate limiter slot
    await this.rateLimiter.waitForSlot();

    const url = `${this.baseUrl}${endpoint}`;
    
    console.log('📡 Making POST request to:', url);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'GovChime/1.0 (Federal Contracting Platform)',
          'X-Api-Key': SAM_GOV_API_KEY,
          'Cache-Control': 'no-cache',
        },
        body: JSON.stringify(payload)
      });

      console.log('📊 SAM.gov API Response Status:', response.status);

      if (!response.ok) {
        let errorText = '';
        try {
          errorText = await response.text();
        } catch {
          errorText = 'Unable to read error response';
        }
        
        if (response.status === 429) {
          // Set rate limit flag and reset time
          this.isRateLimited = true;
          this.rateLimitResetTime = Date.now() + (60 * 60 * 1000); // 1 hour
          
          console.warn('⚠️ SAM.gov API Rate Limit:', {
            status: response.status,
            statusText: response.statusText,
            error: errorText,
            resetTime: new Date(this.rateLimitResetTime).toLocaleTimeString()
          });
          throw new Error(`SAM_API_ERROR: 429 - Rate Limit Exceeded - Wait 1 hour`);
        } else {
          console.error('❌ SAM.gov API Error:', {
            status: response.status,
            statusText: response.statusText,
            error: errorText
          });
          throw new Error(`SAM_API_ERROR: ${response.status} - ${response.statusText}`);
        }
      }

      const data = await response.json();
      
      // Validate response structure
      if (!data || typeof data !== 'object') {
        console.warn('⚠️ Invalid response structure from SAM.gov API');
        throw new Error('SAM_API_ERROR: Invalid response structure');
      }
      
      // Cache successful response
      this.cache.set(endpoint, payload, data);
      
      // Reset rate limit flag on successful request
      this.isRateLimited = false;
      this.rateLimitResetTime = 0;
      
      console.log('✅ SAM.gov API Success:', {
        totalRecords: data.totalRecords || 0,
        dataLength: data.opportunitiesData?.length || 0
      });
      
      return data;
    } catch (error) {
      // Check if this is a rate limit error (expected and handled condition)
      if (error instanceof Error && error.message.includes('SAM_API_ERROR: 429')) {
        console.warn('⚠️ SAM.gov API rate limited (expected):', error.message);
      } else {
        console.error('💥 SAM.gov API request failed:', error);
      }
       
      // If it's a network error, wait before retrying
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.log('🔄 Network error detected, implementing backoff');
        this.isRateLimited = true;
        this.rateLimitResetTime = Date.now() + (5 * 60 * 1000); // 5 minutes
      }
       
      throw error;
    }
  }

  async getOpportunities(params: {
    limit?: number;
    page?: number;
    daysBack?: number;
    noticeTypes?: string[];
    state?: string;
    naics?: string;
    department?: string;
    postedFrom?: string;
    postedTo?: string;
  } = {}): Promise<SamGovApiResponse> {
    // Calculate date range - default to last 30 days for more data
    const today = new Date();
    const daysBack = params.daysBack || 30;
    const fromDate = new Date(today.getTime() - (daysBack * 24 * 60 * 60 * 1000));
    
    // Format dates for SAM.gov API (YYYY-MM-DD format)
    const formatDate = (date: Date): string => {
      return date.toISOString().split('T')[0];
    };

    const payload: any = {
      limit: params.limit || 50,
      offset: (params.page || 0) * (params.limit || 50),
      postedFrom: params.postedFrom ? params.postedFrom.split('T')[0] : formatDate(fromDate),
      postedTo: params.postedTo ? params.postedTo.split('T')[0] : formatDate(today),
      ptype: "o", // opportunities
      solicitationNumber: "",
      zip: "",
      typeOfSetAside: "",
      typeOfSetAsideDescription: ""
    };

    // Add optional filters
    if (params.state) {
      payload.state = params.state;
    }
    
    if (params.naics) {
      payload.ncode = params.naics; // SAM.gov uses 'ncode' for NAICS
    }
    
    if (params.department) {
      payload.organizationName = params.department;
    }

    return this.makeRequest<SamGovApiResponse>('/search', payload);
  }

  async getRecentOpportunities(limit: number = 50): Promise<SamGovApiResponse> {
    return this.getOpportunities({ 
      limit, 
      daysBack: 1, // Last 24 hours for most recent
      noticeTypes: [
        "Presolicitation",
        "Solicitation", 
        "Sources Sought",
        "Combined Synopsis/Solicitation"
      ]
    });
  }

  async getOpportunityDetails(noticeId: string): Promise<SamGovOpportunity> {
    const payload = {
      page: 0,
      size: 1,
      filters: {
        noticeId: noticeId
      }
    };
    
    const response = await this.makeRequest<SamGovApiResponse>('/search', payload);
    
    if (response.opportunitiesData && response.opportunitiesData.length > 0) {
      return response.opportunitiesData[0];
    }
    
    throw new Error(`Opportunity with ID ${noticeId} not found`);
  }
}

export const samGovApi = new SamGovApiService();

// Export test function for debugging
export { testApiConnection };