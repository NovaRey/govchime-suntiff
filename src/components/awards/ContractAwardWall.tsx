import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronRight, Shield, Flag, Users, MapPin, Filter } from 'lucide-react';
import { useSamGovData } from '../../hooks/useSamGovData';
import ContractCard from '../dashboard/ContractCard';
import NAICSCodeDirectory from './NAICSCodeDirectory';

const ContractAwardWall: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchFilters, setShowSearchFilters] = useState(false);
  const [selectedSetAside, setSelectedSetAside] = useState<string>('');
  const [selectedAgency, setSelectedAgency] = useState<string>('');
  const [dateRange, setDateRange] = useState<string>('30');

  const { data: opportunities, loading, error } = useSamGovData();

  useEffect(() => {
    // Initial load - the hook will automatically fetch data
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, we'll just use the existing data from the hook
    // In a real implementation, this would trigger a new search
  };

  const setAsideTypes = [
    { value: '', label: 'All Set-Asides', icon: Filter },
    { value: 'SBA', label: 'Small Business', icon: Shield },
    { value: 'WOSB', label: 'Women-Owned Small Business', icon: Flag },
    { value: 'SDVOSB', label: 'Service-Disabled Veteran-Owned', icon: Shield },
    { value: '8(a)', label: '8(a) Business Development', icon: Users },
    { value: 'HubZone', label: 'HubZone', icon: MapPin },
  ];

  const agencies = [
    'All Agencies',
    'Department of Defense',
    'Department of Health and Human Services',
    'Department of Homeland Security',
    'General Services Administration',
    'Department of Veterans Affairs',
    'Department of Energy',
    'National Aeronautics and Space Administration',
  ];

  const filteredOpportunities = opportunities.filter(opportunity => {
    const matchesSearch = searchTerm === '' || 
      opportunity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.agency.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSetAside = selectedSetAside === '' || opportunity.setAside === selectedSetAside;
    const matchesAgency = selectedAgency === '' || selectedAgency === 'All Agencies' || 
      opportunity.agency.includes(selectedAgency);
    
    return matchesSearch && matchesSetAside && matchesAgency;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Federal Contract Awards</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {filteredOpportunities.length.toLocaleString()} opportunities found
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search opportunities, agencies, keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowSearchFilters(!showSearchFilters)}
              className="flex items-center px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              <Filter className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
              Filters
              {showSearchFilters ? (
                <ChevronDown className="w-4 h-4 ml-2 text-gray-600 dark:text-gray-400" />
              ) : (
                <ChevronRight className="w-4 h-4 ml-2 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </form>

          {/* Filter Options */}
          {showSearchFilters && (
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Set-Aside Type
                  </label>
                  <select
                    value={selectedSetAside}
                    onChange={(e) => setSelectedSetAside(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {setAsideTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Agency
                  </label>
                  <select
                    value={selectedAgency}
                    onChange={(e) => setSelectedAgency(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {agencies.map((agency) => (
                      <option key={agency} value={agency}>
                        {agency}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date Range
                  </label>
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="7">Last 7 days</option>
                    <option value="30">Last 30 days</option>
                    <option value="90">Last 90 days</option>
                    <option value="365">Last year</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="p-6">
        {error && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <Flag className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-400">Using Sample Data</h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading opportunities...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredOpportunities.map((opportunity) => (
                <ContractCard
                  key={opportunity.id}
                  contract={{
                    id: opportunity.id,
                    awardDate: opportunity.awardDate,
                    agency: opportunity.agency || 'Unknown Agency',
                    vendor: opportunity.vendor || 'TBD',
                    description: opportunity.description || 'No description available',
                    amount: typeof opportunity.amount === 'number' ? opportunity.amount : 0,
                    naicsCode: opportunity.naicsCode || '',
                    naicsDescription: opportunity.naicsDescription || '',
                    setAside: opportunity.setAside || '',
                    location: {
                      state: opportunity.location?.state || 'Unknown',
                      city: opportunity.location?.city || 'Unknown'
                    },
                    type: 'contract' as const
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* NAICS Code Directory */}
        <div className="mt-12">
          <NAICSCodeDirectory searchTerm="" />
        </div>
      </div>
    </div>
  );
};

export default ContractAwardWall;