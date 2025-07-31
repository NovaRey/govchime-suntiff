const SEARCH_GOV_BASE_URL = 'https://api.gsa.gov/technology/searchgov/v2';
const SEARCH_GOV_AFFILIATE = import.meta.env.VITE_SEARCH_GOV_AFFILIATE;
const SEARCH_GOV_ACCESS_KEY = import.meta.env.VITE_SEARCH_GOV_ACCESS_KEY;

export interface ClickTrackingParams {
  url: string;
  query: string;
  position: number;
  moduleCode: 'BOOS' | 'NEWS' | 'VIDS' | 'IMAG' | 'JOBS' | 'FGOV' | 'AWEB';
}

class SearchGovApiService {
  private baseUrl = SEARCH_GOV_BASE_URL;
  private affiliate = SEARCH_GOV_AFFILIATE;
  private accessKey = SEARCH_GOV_ACCESS_KEY;

  async trackClick(params: ClickTrackingParams): Promise<void> {
    if (!this.affiliate || !this.accessKey) {
      console.warn('Search.gov API configuration missing. Click tracking disabled.');
      return;
    }

    try {
      const formData = new URLSearchParams({
        url: params.url,
        query: params.query,
        affiliate: this.affiliate,
        position: params.position.toString(),
        module_code: params.moduleCode,
        access_key: this.accessKey
      });

      const response = await fetch(`${this.baseUrl}/clicks/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'GovChime/1.0'
        },
        body: formData
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.warn('Search.gov click tracking failed:', response.status, errorText);
      }
    } catch (error) {
      console.warn('Search.gov click tracking error:', error);
    }
  }

  // Helper method to track contract award clicks
  async trackContractClick(contractId: string, query: string, position: number): Promise<void> {
    const url = `${window.location.origin}/contract/${contractId}`;
    await this.trackClick({
      url,
      query,
      position,
      moduleCode: 'BOOS' // Business Opportunities
    });
  }

  // Helper method to track external link clicks
  async trackExternalClick(url: string, query: string, position: number): Promise<void> {
    await this.trackClick({
      url,
      query,
      position,
      moduleCode: 'FGOV' // Federal Government
    });
  }

  // Helper method to track search result clicks
  async trackSearchResultClick(url: string, query: string, position: number): Promise<void> {
    await this.trackClick({
      url,
      query,
      position,
      moduleCode: 'AWEB' // All Web Results
    });
  }
}

export const searchGovApi = new SearchGovApiService();