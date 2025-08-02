import React, { useState } from 'react';
import { Filter, Calendar, Building2, MapPin, Award, DollarSign, X } from 'lucide-react';

export interface DashboardFilters {
  dateRange: string;
  agency: string;
  state: string;
  naicsCode: string;
  setAside: string;
  minAmount: string;
  maxAmount: string;
  contractType: string;
}

interface DashboardFiltersProps {
  filters: DashboardFilters;
  onFiltersChange: (filters: DashboardFilters) => void;
  onClearFilters: () => void;
  agencies: string[];
  states: string[];
  setAsideTypes: string[];
}

const DashboardFilters: React.FC<DashboardFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  agencies,
  states,
  setAsideTypes
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (key: keyof DashboardFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const getActiveFilterCount = () => {
    return Object.values(filters).filter(value => value && value.trim() !== '').length;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className="bg-gradient-to-br from-white/90 to-slate-50/90 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-200/60 dark:border-gray-700/60 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all duration-500">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-yellow-500 dark:text-yellow-400 drop-shadow-sm" />
            <h2 className="text-lg font-semibold text-white dark:text-white drop-shadow-sm">Filters</h2>
            {activeFilterCount > 0 && (
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                {activeFilterCount} active
              </span>
            )}
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-yellow-400 hover:text-yellow-300 dark:text-yellow-300 dark:hover:text-yellow-200 font-medium transition-all duration-300 hover:scale-105 drop-shadow-sm"
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={onClearFilters}
            className="flex items-center text-sm text-white/80 hover:text-white dark:text-white/80 dark:hover:text-white transition-all duration-300 hover:scale-105 bg-red-500/20 hover:bg-red-500/30 px-3 py-1.5 rounded-lg border border-red-400/30 hover:border-red-400/50 shadow-sm hover:shadow-md"
          >
            <X className="w-4 h-4 mr-1" />
            Clear All
          </button>
        )}
      </div>

      {/* Quick Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {filters.dateRange && (
          <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-md hover:shadow-lg transition-all duration-300">
            <Calendar className="w-3 h-3 mr-1 drop-shadow-sm" />
            {filters.dateRange}
          </span>
        )}
        {filters.agency && (
          <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-green-400 to-green-500 text-white shadow-md hover:shadow-lg transition-all duration-300">
            <Building2 className="w-3 h-3 mr-1 drop-shadow-sm" />
            {filters.agency}
          </span>
        )}
        {filters.state && (
          <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-md hover:shadow-lg transition-all duration-300">
            <MapPin className="w-3 h-3 mr-1 drop-shadow-sm" />
            {filters.state}
          </span>
        )}
        {filters.setAside && (
          <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-400 to-purple-500 text-white shadow-md hover:shadow-lg transition-all duration-300">
            <Award className="w-3 h-3 mr-1 drop-shadow-sm" />
            {filters.setAside}
          </span>
        )}
        {(filters.minAmount || filters.maxAmount) && (
          <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-md hover:shadow-lg transition-all duration-300">
            <DollarSign className="w-3 h-3 mr-1 drop-shadow-sm" />
            Amount Range
          </span>
        )}
      </div>

      {/* Expanded Filter Controls */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-800/30 dark:bg-slate-900/50 rounded-xl p-4 backdrop-blur-sm border border-slate-600/30 dark:border-slate-700/30">
          <div>
            <label className="flex items-center text-sm font-medium text-white dark:text-white mb-2">
              <Calendar className="w-4 h-4 mr-1 text-yellow-400" />
              Date Range
            </label>
            <select
              value={filters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              className="w-full bg-white/10 dark:bg-gray-800/50 border border-white/20 dark:border-gray-600/50 rounded-lg px-3 py-2.5 text-white dark:text-white placeholder-white/60 dark:placeholder-gray-400 focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:border-white/30 text-sm shadow-lg"
            >
              <option value="" className="bg-gray-800 text-white">All Time</option>
              <option value="last7days" className="bg-gray-800 text-white">Last 7 Days</option>
              <option value="last30days" className="bg-gray-800 text-white">Last 30 Days</option>
              <option value="last90days" className="bg-gray-800 text-white">Last 90 Days</option>
              <option value="thisyear" className="bg-gray-800 text-white">This Year</option>
              <option value="lastyear" className="bg-gray-800 text-white">Last Year</option>
            </select>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-white dark:text-white mb-2">
              <Building2 className="w-4 h-4 mr-1 text-yellow-400" />
              Agency
            </label>
            <select
              value={filters.agency}
              onChange={(e) => handleFilterChange('agency', e.target.value)}
              className="w-full bg-white/10 dark:bg-gray-800/50 border border-white/20 dark:border-gray-600/50 rounded-lg px-3 py-2.5 text-white dark:text-white placeholder-white/60 dark:placeholder-gray-400 focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:border-white/30 text-sm shadow-lg"
            >
              <option value="" className="bg-gray-800 text-white">All Agencies</option>
              {agencies.map(agency => (
                <option key={agency} value={agency} className="bg-gray-800 text-white">{agency}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-white dark:text-white mb-2">
              <MapPin className="w-4 h-4 mr-1 text-yellow-400" />
              State
            </label>
            <select
              value={filters.state}
              onChange={(e) => handleFilterChange('state', e.target.value)}
              className="w-full bg-white/10 dark:bg-gray-800/50 border border-white/20 dark:border-gray-600/50 rounded-lg px-3 py-2.5 text-white dark:text-white placeholder-white/60 dark:placeholder-gray-400 focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:border-white/30 text-sm shadow-lg"
            >
              <option value="" className="bg-gray-800 text-white">All States</option>
              {states.map(state => (
                <option key={state} value={state} className="bg-gray-800 text-white">{state}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-white dark:text-white mb-2">
              <Award className="w-4 h-4 mr-1 text-yellow-400" />
              Set-Aside Type
            </label>
            <select
              value={filters.setAside}
              onChange={(e) => handleFilterChange('setAside', e.target.value)}
              className="w-full bg-white/10 dark:bg-gray-800/50 border border-white/20 dark:border-gray-600/50 rounded-lg px-3 py-2.5 text-white dark:text-white placeholder-white/60 dark:placeholder-gray-400 focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:border-white/30 text-sm shadow-lg"
            >
              <option value="" className="bg-gray-800 text-white">All Types</option>
              {setAsideTypes.map(type => (
                <option key={type} value={type} className="bg-gray-800 text-white">{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white dark:text-white mb-2">NAICS Code</label>
            <input
              type="text"
              placeholder="e.g., 541511"
              value={filters.naicsCode}
              onChange={(e) => handleFilterChange('naicsCode', e.target.value)}
              className="w-full bg-white/10 dark:bg-gray-800/50 border border-white/20 dark:border-gray-600/50 rounded-lg px-3 py-2.5 text-white dark:text-white placeholder-white/60 dark:placeholder-gray-400 focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:border-white/30 text-sm shadow-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white dark:text-white mb-2">Contract Type</label>
            <select
              value={filters.contractType}
              onChange={(e) => handleFilterChange('contractType', e.target.value)}
              className="w-full bg-white/10 dark:bg-gray-800/50 border border-white/20 dark:border-gray-600/50 rounded-lg px-3 py-2.5 text-white dark:text-white placeholder-white/60 dark:placeholder-gray-400 focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:border-white/30 text-sm shadow-lg"
            >
              <option value="" className="bg-gray-800 text-white">All Types</option>
              <option value="contract" className="bg-gray-800 text-white">Contracts</option>
              <option value="grant" className="bg-gray-800 text-white">Grants</option>
              <option value="other" className="bg-gray-800 text-white">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white dark:text-white mb-2">Min Amount</label>
            <input
              type="text"
              placeholder="$0"
              value={filters.minAmount}
              onChange={(e) => handleFilterChange('minAmount', e.target.value)}
              className="w-full bg-white/10 dark:bg-gray-800/50 border border-white/20 dark:border-gray-600/50 rounded-lg px-3 py-2.5 text-white dark:text-white placeholder-white/60 dark:placeholder-gray-400 focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:border-white/30 text-sm shadow-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white dark:text-white mb-2">Max Amount</label>
            <input
              type="text"
              placeholder="No limit"
              value={filters.maxAmount}
              onChange={(e) => handleFilterChange('maxAmount', e.target.value)}
              className="w-full bg-white/10 dark:bg-gray-800/50 border border-white/20 dark:border-gray-600/50 rounded-lg px-3 py-2.5 text-white dark:text-white placeholder-white/60 dark:placeholder-gray-400 focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:border-white/30 text-sm shadow-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardFilters;

export { DashboardFilters }