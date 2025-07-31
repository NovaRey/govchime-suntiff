// FPDS (Federal Procurement Data System) API service
// FPDS contains actual contract awards and is more reliable than SAM.gov for historical data

import { ContractAward } from '../types';

const FPDS_BASE_URL = '/api/fpds/ezsearch/FEEDS/ATOM';

class FPDSApiService {
  private baseUrl = FPDS_BASE_URL;

  async searchContracts(params: {
    query?: string;
    naics?: string;
    state?: string;
    agency?: string;
    dateFrom?: string;
    dateTo?: string;
    limit?: number;
  } = {}): Promise<ContractAward[]> {
    const {
      query = 'solicitation',
      naics,
      state,
      agency,
      dateFrom,
      dateTo,
      limit = 50
    } = params;

    // Build FPDS query parameters
    const queryParams = new URLSearchParams({
      FEEDNAME: 'PUBLIC',
      q: query,
      start: '1',
      num: limit.toString()
    });

    // Add filters if provided
    if (naics) {
      queryParams.append('NAICS_CODE', naics);
    }
    if (state) {
      queryParams.append('PLACE_OF_PERFORMANCE_STATE', state);
    }
    if (agency) {
      queryParams.append('CONTRACTING_AGENCY_NAME', agency);
    }
    if (dateFrom) {
      queryParams.append('LAST_MOD_DATE', `[${dateFrom} TO ${dateTo || new Date().toISOString().split('T')[0]}]`);
    }

    const url = `${this.baseUrl}?${queryParams.toString()}`;
    
    console.log('📡 FPDS API Request:', url);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/atom+xml',
          'User-Agent': 'GovChime/1.0 (Federal Contracting Platform)',
        }
      });

      if (!response.ok) {
        throw new Error(`FPDS API Error: ${response.status} - ${response.statusText}`);
      }

      const xmlText = await response.text();
      
      // Parse XML to extract contract data
      const contracts = this.parseXMLResponse(xmlText);
      
      console.log('✅ FPDS API Success:', {
        contractsFound: contracts.length
      });

      return contracts;
    } catch (error) {
      console.error('💥 FPDS API request failed:', error);
      throw error;
    }
  }

  private parseXMLResponse(xmlText: string): ContractAward[] {
    // Simple XML parsing for FPDS ATOM feed
    const contracts: ContractAward[] = [];
    
    try {
      // Extract entries using regex (basic XML parsing)
      const entryRegex = /<entry>(.*?)<\/entry>/gs;
      const entries = xmlText.match(entryRegex) || [];

      for (const entry of entries.slice(0, 50)) { // Limit to 50 entries
        try {
          const contract = this.parseEntry(entry);
          if (contract) {
            contracts.push(contract);
          }
        } catch (parseError) {
          console.warn('⚠️ Failed to parse FPDS entry:', parseError);
        }
      }
    } catch (error) {
      console.error('💥 Failed to parse FPDS XML:', error);
    }

    return contracts;
  }

  private parseEntry(entryXml: string): ContractAward | null {
    try {
      // Extract basic fields using regex
      const getXMLValue = (tag: string): string => {
        const regex = new RegExp(`<${tag}[^>]*>(.*?)</${tag}>`, 's');
        const match = entryXml.match(regex);
        return match ? match[1].trim() : '';
      };

      const title = getXMLValue('title');
      const id = getXMLValue('id');
      const updated = getXMLValue('updated');

      if (!title || !id) {
        return null;
      }

      // Create contract award object
      const contract: ContractAward = {
        id: id,
        agency: getXMLValue('contractingOfficeName') || 'Federal Agency',
        vendor: getXMLValue('vendorName') || 'Unknown Contractor',
        amount: parseFloat(getXMLValue('federalActionObligation') || '0'),
        awardDate: updated || new Date().toISOString(),
        naicsCode: getXMLValue('naicsCode') || '',
        naicsDescription: '',
        location: {
          city: getXMLValue('city') || '',
          state: getXMLValue('state') || ''
        },
        description: getXMLValue('awardDescription') || title,
        type: 'contract' as const
      };

      return contract;
    } catch (error) {
      console.warn('⚠️ Failed to parse FPDS entry:', error);
      return null;
    }
  }
}

export const fpdsApi = new FPDSApiService();

// Helper function for the hook
export async function fetchFromFPDS(filters: any = {}): Promise<ContractAward[]> {
  try {
    return await fpdsApi.searchContracts({
      naics: filters.naics,
      state: filters.state,
      agency: filters.department,
      dateFrom: filters.dateFrom,
      dateTo: filters.dateTo,
      limit: 25
    });
  } catch (error) {
    console.error('FPDS fetch failed:', error);
    return [];
  }
}