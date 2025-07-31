const USA_SPENDING_BASE_URL = 'https://api.usaspending.gov/api/v2';

export interface USASpendingAward {
  Award: {
    id: number;
    generated_unique_award_id: string;
    display_award_id: string;
    category: string;
    type: string;
    type_description: string;
    description: string;
    piid: string;
    fain: string;
    uri: string;
    total_obligation: number;
    base_and_all_options_value: number;
    date_signed: string;
    period_of_performance_start_date: string;
    period_of_performance_current_end_date: string;
    potential_total_value_of_award: number;
  };
  recipient: {
    recipient_name: string;
    recipient_unique_id: string;
    parent_recipient_unique_id: string;
    business_categories: string[];
    location: {
      address_line1: string;
      city_name: string;
      state_code: string;
      state_name: string;
      zip5: string;
      country_name: string;
    };
  };
  awarding_agency: {
    id: number;
    toptier_agency: {
      name: string;
      code: string;
    };
    subtier_agency: {
      name: string;
      code: string;
    };
  };
  funding_agency: {
    id: number;
    toptier_agency: {
      name: string;
      code: string;
    };
  };
  place_of_performance: {
    city_name: string;
    state_code: string;
    state_name: string;
    zip5: string;
    country_name: string;
  };
}

export interface USASpendingResponse {
  results: USASpendingAward[];
  page_metadata: {
    page: number;
    count: number;
    next: string | null;
    previous: string | null;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

export interface SpendingByGeographyResponse {
  results: Array<{
    shape_code: string;
    display_name: string;
    aggregated_amount: number;
    per_capita: number;
  }>;
  page_metadata: {
    page: number;
    count: number;
    total: number;
  };
}

class USASpendingApiService {
  private baseUrl = USA_SPENDING_BASE_URL;

  private async makeRequest<T>(endpoint: string, body: any): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    console.log('USASpending API Request:', url, body);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`USASpending API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('USASpending API request failed:', error);
      throw error;
    }
  }

  async searchAwards(params: {
    limit?: number;
    page?: number;
    filters?: {
      time_period?: Array<{
        start_date: string;
        end_date: string;
      }>;
      agencies?: Array<{
        type: string;
        tier: string;
        name: string;
      }>;
      recipient_locations?: Array<{
        country: string;
        state: string;
      }>;
      naics_codes?: string[];
      award_type_codes?: string[];
    };
    sort?: string;
    order?: 'asc' | 'desc';
  } = {}): Promise<USASpendingResponse> {
    const body = {
      filters: {
        time_period: params.filters?.time_period || [
          {
            start_date: '2025-01-01',
            end_date: new Date().getFullYear() >= 2025 ? 
              new Date().toISOString().split('T')[0] : 
              '2025-12-31'
          }
        ],
        ...params.filters
      },
      fields: [
        'Award',
        'recipient',
        'awarding_agency',
        'funding_agency',
        'place_of_performance'
      ],
      page: params.page || 1,
      limit: params.limit || 20,
      sort: params.sort || 'Award.date_signed',
      order: params.order || 'desc'
    };

    return this.makeRequest<USASpendingResponse>('/search/spending_by_award/', body);
  }

  async getSpendingByGeography(params: {
    scope: 'state' | 'county' | 'district';
    geo_layer: 'state' | 'county' | 'district';
    filters?: {
      time_period?: Array<{
        start_date: string;
        end_date: string;
      }>;
      agencies?: Array<{
        type: string;
        tier: string;
        name: string;
      }>;
    };
  }): Promise<SpendingByGeographyResponse> {
    const body = {
      scope: params.scope,
      geo_layer: params.geo_layer,
      filters: {
        time_period: params.filters?.time_period || [
          {
            start_date: '2025-01-01',
            end_date: new Date().getFullYear() >= 2025 ? 
              new Date().toISOString().split('T')[0] : 
              '2025-12-31'
          }
        ],
        ...params.filters
      }
    };

    return this.makeRequest<SpendingByGeographyResponse>('/search/spending_by_geography/', body);
  }
}

export const usaSpendingApi = new USASpendingApiService();

// Helper function for the hook
export async function fetchFromUSASpending(filters: any = {}): Promise<ContractAward[]> {
  try {
    // Explicitly construct valid filters to prevent 422 errors
    const searchFilters: any = {
      time_period: [
        {
          start_date: filters.dateFrom || '2024-01-01',
          end_date: filters.dateTo || new Date().toISOString().split('T')[0]
        }
      ]
    };

    // Only add valid filters that the USASpending API recognizes
    if (filters.state) {
      searchFilters.place_of_performance_locations = [{ state: filters.state }];
    }

    if (filters.naics_codes) {
      searchFilters.naics_codes = [filters.naics_codes];
    }

    const response = await usaSpendingApi.searchAwards({
      filters: searchFilters,
      limit: 25
    });
    
    return response.results || [];
  } catch (error) {
    console.error('USAspending fetch failed:', error);
    return [];
  }
}