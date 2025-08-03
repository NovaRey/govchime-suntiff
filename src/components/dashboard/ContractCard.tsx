import React from 'react';
import { ContractAward } from '../../types';
import DataSourceBadge from '../common/DataSourceBadge';
import { useClickTracking } from '../../hooks/useClickTracking';
import { Calendar, Building, MapPin, Award, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

interface ContractCardProps {
  contract: ContractAward;
  searchQuery?: string;
  position?: number;
  onClick?: () => void;
}

const ContractCard: React.FC<ContractCardProps> = ({ 
  contract, 
  searchQuery = '', 
  position = 0, 
  onClick 
}) => {
  const { trackContractClick } = useClickTracking();

  // Generate SAM.gov URL for similar opportunities
  const getSamGovUrl = (contract: ContractAward) => {
    // Create a search URL for similar active opportunities
    const baseUrl = 'https://sam.gov/search/';
    const params = new URLSearchParams({
      'index': 'opp',
      'is_active': 'true',
      'page': '1',
      'sort': '-modifiedDate'
    });

    // Add NAICS code search if available
    if (contract.naicsCode && contract.naicsCode !== '000000') {
      params.append('naics_codes[]', contract.naicsCode);
    }

    // Add set-aside filter if available
    if (contract.setAside) {
      const setAsideMap: { [key: string]: string } = {
        'WOSB': 'WOSB',
        'SDVOSB': 'SDVOSBC',
        '8(a)': '8A',
        'HubZone': 'HZC',
        'SDB': 'SBA',
        'VOSB': 'VOSB',
        'EDWOSB': 'EDWOSB'
      };
      const setAsideCode = setAsideMap[contract.setAside];
      if (setAsideCode) {
        params.append('set_aside_codes[]', setAsideCode);
      }
    }

    // Add keywords from description (first 2-3 meaningful words)
    const keywords = contract.description
      .split(' ')
      .filter(word => word.length > 3 && !['services', 'support', 'system', 'management'].includes(word.toLowerCase()))
      .slice(0, 2)
      .join(' ');
    
    if (keywords) {
      params.append('keywords', keywords);
    }

    return `${baseUrl}?${params.toString()}`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getSetAsideBadge = (setAside?: string) => {
    if (!setAside) return null;
    
    const colors: { [key: string]: string } = {
      'WOSB': 'bg-pink-100 text-pink-800',
      'SDVOSB': 'bg-blue-100 text-blue-800',  
      '8(a)': 'bg-green-100 text-green-800',
      'HubZone': 'bg-orange-100 text-orange-800',
      'SDB': 'bg-purple-100 text-purple-800'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[setAside] || 'bg-gray-100 text-gray-800'}`}>
        <Award className="w-3 h-3 mr-1" />
        {setAside}
      </span>
    );
  };

  const handleClick = async () => {
    // Open SAM.gov contract page in new tab
    const samGovUrl = getSamGovUrl(contract);
    window.open(samGovUrl, '_blank', 'noopener,noreferrer');
    
    // Track the click for analytics (non-blocking)
    if (searchQuery) {
      trackContractClick(contract.id, searchQuery, position).catch(() => {
        // Silently handle tracking errors - don't prevent navigation
      });
    }
    
    // Call the original onClick handler if provided
    onClick?.();
  };

  return (
    <div 
      className="card-hover bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 dark:border-gray-700/60 p-4 sm:p-6 cursor-pointer group hover:border-emerald-400 dark:hover:border-emerald-500 shadow-lg hover:shadow-2xl transition-all duration-150"
      onClick={handleClick}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 sm:mb-4 gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-150">
            {contract.description} 
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 inline ml-2 opacity-0 group-hover:opacity-100 transition-all duration-150 transform group-hover:scale-110" />
          </h3>
          <div className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2">
            <Building className="w-3 h-3 sm:w-4 sm:h-4 mr-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-150 flex-shrink-0" />
            <span className="font-medium truncate">{contract.vendor}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-150">
            {formatCurrency(contract.amount)}
          </div>
          {contract.setAside && (
            <div className="mt-2 transform group-hover:scale-105 transition-transform duration-150">
              {getSetAsideBadge(contract.setAside)}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-150">
          <Calendar className="w-4 h-4 mr-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-150" />
          <span>{format(new Date(contract.awardDate), 'MMM dd, yyyy')}</span>
        </div>
        <div className="flex items-center group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-150">
          <MapPin className="w-4 h-4 mr-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-150" />
          <span>{contract.location.city}, {contract.location.state}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 group-hover:border-blue-200 dark:group-hover:border-blue-700 transition-colors duration-150">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-150">{contract.agency}</span>
            <DataSourceBadge source="SAM.gov" />
          </div>
          <div className="flex items-center space-x-2">
            <span className="naics-code-hover text-xs px-2 py-1 rounded text-orange-warm dark:text-orange-warm-dark transition-all duration-150">
              NAICS {contract.naicsCode}
            </span>
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-all duration-150">
          <ExternalLink className="w-3 h-3 inline mr-1" />
          Click to view full contract details on SAM.gov
        </div>
      </div>
    </div>
  );
};

export default ContractCard;