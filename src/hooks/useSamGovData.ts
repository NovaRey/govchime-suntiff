import { useState, useEffect, useCallback } from 'react';
import { samGovApi, SamGovApiResponse } from '../services/samGovApi';
import { transformSamGovOpportunities } from '../services/dataTransformers';
import { ContractAward } from '../types';
import { fetchFromFPDS } from '../services/fpdsApi';
import { fetchFromUSASpending } from '../services/usaSpendingApi';

// Helper function to convert YYYY-MM-DD to ISO 8601 format
function formatDateForSamGov(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00.000Z');
  return date.toISOString();
}

interface UseSamGovDataOptions {
  limit?: number;
  autoRefresh?: boolean;
  refreshInterval?: number;
  filters?: {
    state?: string;
    naics?: string;
    department?: string;
    dateFrom?: string;
    dateTo?: string;
  };
}

interface UseSamGovDataReturn {
  data: ContractAward[];
  loading: boolean;
  error: string | null;
  totalRecords: number;
  refresh: () => Promise<void>;
  loadMore: () => Promise<void>;
  hasMore: boolean;
}

export function useSamGovData(options: UseSamGovDataOptions = {}): UseSamGovDataReturn {
  const {
    limit = 50,
    autoRefresh = false,
    refreshInterval = 300000, // 5 minutes
    filters = {}
  } = options;

  const [data, setData] = useState<ContractAward[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalRecords, setTotalRecords] = useState(0);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [currentRefreshInterval, setCurrentRefreshInterval] = useState(refreshInterval);

  const fetchData = useCallback(async (resetData = true) => {
    try {
      setLoading(true);
      
      console.log('🔄 Fetching SAM.gov data with filters:', filters);

      const currentOffset = resetData ? 0 : offset;
      
      let response: SamGovApiResponse;
      
      try {
        // Clear any previous errors when attempting new request
        setError(null);
        
        response = await samGovApi.getOpportunities({
          limit: limit,
          page: Math.floor(currentOffset / limit),
          state: filters.state,
          naics: filters.naics,
          department: filters.department,
          postedFrom: formatDateForSamGov(filters.dateFrom || '2025-01-01'),
          postedTo: formatDateForSamGov(filters.dateTo || (() => {
            const now = new Date();
            return now.getFullYear() >= 2025 ? now.toISOString().split('T')[0] : '2025-12-31';
          })()),
        });
        
        console.log('✅ SAM.gov API Response received:', {
          totalRecords: response.totalRecords,
          dataLength: response.opportunitiesData?.length || 0
        });
        
        // Transform real API data
        const transformedData = transformSamGovOpportunities(response.opportunitiesData || []);
        
        if (resetData) {
          setData(transformedData);
          setOffset(limit);
        } else {
          setData(prev => [...prev, ...transformedData]);
          setOffset(prev => prev + limit);
        }

        setTotalRecords(response.totalRecords || 0);
        setHasMore((currentOffset + limit) < (response.totalRecords || 0));
        
        // Reset refresh interval on successful API call
        setCurrentRefreshInterval(refreshInterval);
        
        console.log('✅ Successfully processed SAM.gov data:', {
          transformedCount: transformedData.length,
          totalRecords: response.totalRecords
        });
        
        return; // Exit early on success
        
      } catch (apiError: any) {
        // Handle different types of API errors
        if (apiError.message && apiError.message.includes('429')) {
          setCurrentRefreshInterval(7200000); // 2 hours
          setError('SAM.gov API rate limited. Trying alternative sources (FPDS, USAspending)...');
          
          // Try FPDS as backup
          try {
            console.log('🔄 Attempting FPDS fallback...');
            const fpdsData = await fetchFromFPDS(filters);
            if (fpdsData.length > 0) {
              if (resetData) {
                setData(fpdsData);
                setOffset(limit);
              } else {
                setData(prev => [...prev, ...fpdsData]);
                setOffset(prev => prev + limit);
              }
              setTotalRecords(fpdsData.length);
              setHasMore(false);
              setError('Using FPDS data (federal contract awards)');
              return;
            }
          } catch (fpdsError) {
            console.warn('⚠️ FPDS fallback failed:', fpdsError);
          }
          
          // Try USAspending as final backup
          try {
            console.log('🔄 Attempting USAspending fallback...');
            const usaSpendingData = await fetchFromUSASpending(filters);
            if (usaSpendingData.length > 0) {
              if (resetData) {
                setData(usaSpendingData);
                setOffset(limit);
              } else {
                setData(prev => [...prev, ...usaSpendingData]);
                setOffset(prev => prev + limit);
              }
              setTotalRecords(usaSpendingData.length);
              setHasMore(false);
              setError('Using USAspending data (federal spending records)');
              return;
            }
          } catch (usaError) {
            console.warn('⚠️ USAspending fallback failed:', usaError);
          }
          
          setError('All federal data sources unavailable. Using demonstration data.');
        } else if (apiError.message && apiError.message.includes('API_NOT_CONFIGURED')) {
          setError('SAM.gov API key not configured. Trying alternative sources...');
        } else if (apiError.message && apiError.message.includes('fetch')) {
          setCurrentRefreshInterval(300000); // 5 minutes for network errors
          setError('Network connection issue. Trying alternative sources...');
        } else {
          setCurrentRefreshInterval(refreshInterval);
          setError('SAM.gov API temporarily unavailable. Trying alternative sources...');
        }
        
        // Import and use mock data as fallback
        const { mockContractAwards } = await import('../data/mockData');
        
        // Filter mock data based on provided filters
        let filteredMockData = [...mockContractAwards];
        
        if (filters.state) {
          filteredMockData = filteredMockData.filter(contract => 
            contract.location.state.toLowerCase().includes(filters.state!.toLowerCase())
          );
        }
        
        if (filters.department) {
          filteredMockData = filteredMockData.filter(contract => 
            contract.agency.toLowerCase().includes(filters.department!.toLowerCase())
          );
        }

        // Simulate pagination with mock data
        const startIndex = currentOffset;
        const endIndex = startIndex + limit;
        const paginatedData = filteredMockData.slice(startIndex, endIndex);
        
        if (resetData) {
          setData(paginatedData);
          setOffset(limit);
        } else {
          setData(prev => [...prev, ...paginatedData]);
          setOffset(prev => prev + limit);
        }

        setTotalRecords(filteredMockData.length);
        setHasMore(endIndex < filteredMockData.length);
        
        console.log('📋 Using mock data fallback:', {
          mockDataCount: paginatedData.length,
          totalMockRecords: filteredMockData.length
        });
        return;
      }
    } catch (err: any) {
      console.error('💥 Failed to fetch SAM.gov data:', err);
      setError(err.message || 'Failed to fetch data');
      
      // Fallback to mock data on any error
      if (data.length === 0) {
        const { mockContractAwards } = await import('../data/mockData');
        setData(mockContractAwards.slice(0, limit));
        setTotalRecords(mockContractAwards.length);
        setHasMore(limit < mockContractAwards.length);
      }
    } finally {
      setLoading(false);
    }
  }, [limit, offset, filters]);

  const refresh = useCallback(async () => {
    setOffset(0);
    await fetchData(true);
  }, [fetchData]);

  const loadMore = useCallback(async () => {
    if (!loading && hasMore) {
      await fetchData(false);
    }
  }, [fetchData, loading, hasMore]);

  // Initial data fetch
  useEffect(() => {
    fetchData(true);
  }, [filters.state, filters.naics, filters.department, filters.dateFrom, filters.dateTo]);

  // Auto-refresh functionality
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      refresh();
    }, currentRefreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, currentRefreshInterval, refresh]);

  return {
    data,
    loading,
    error,
    totalRecords,
    refresh,
    loadMore,
    hasMore
  };
}