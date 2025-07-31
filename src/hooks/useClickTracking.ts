import { useCallback } from 'react';
import { searchGovApi } from '../services/searchGovApi';

interface UseClickTrackingReturn {
  trackContractClick: (contractId: string, query: string, position: number) => Promise<void>;
  trackExternalClick: (url: string, query: string, position: number) => Promise<void>;
  trackSearchClick: (url: string, query: string, position: number) => Promise<void>;
}

export function useClickTracking(): UseClickTrackingReturn {
  const trackContractClick = useCallback(async (contractId: string, query: string, position: number) => {
    try {
      await searchGovApi.trackContractClick(contractId, query, position);
    } catch (error) {
      console.warn('Failed to track contract click:', error);
      // Don't throw error - allow navigation to continue
    }
  }, []);

  const trackExternalClick = useCallback(async (url: string, query: string, position: number) => {
    try {
      await searchGovApi.trackExternalClick(url, query, position);
    } catch (error) {
      console.warn('Failed to track external click:', error);
      // Don't throw error - allow navigation to continue
    }
  }, []);

  const trackSearchClick = useCallback(async (url: string, query: string, position: number) => {
    try {
      await searchGovApi.trackSearchResultClick(url, query, position);
    } catch (error) {
      console.warn('Failed to track search click:', error);
      // Don't throw error - allow navigation to continue
    }
  }, []);

  return {
    trackContractClick,
    trackExternalClick,
    trackSearchClick
  };
}