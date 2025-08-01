import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Building2, 
  MapPin, 
  Calendar, 
  Users, 
  ChevronDown,
  ChevronUp,
  X,
  ExternalLink,
  InfoIcon,
  Shield,
  Briefcase,
  Filter,
  Tag,
  Crown
} from 'lucide-react';

// Mock contract data
const mockContracts = [
  {
    id: '1',
    title: 'IT Infrastructure Modernization',
    agency: 'Department of Defense',
    amount: 15750000,
    awardDate: '2025-01-15',
    location: 'Virginia',
    naicsCode: '541511',
    naicsDescription: 'Custom Computer Programming Services',
    setAside: 'small-business',
    description: 'Comprehensive modernization of legacy IT systems including cloud migration and cybersecurity enhancements.',
    status: 'Active',
    endDate: '2027-01-15'
  },
  {
    id: '2',
    title: 'Renewable Energy Research',
    agency: 'Department of Energy',
    amount: 8500000,
    awardDate: '2025-01-10',
    location: 'California',
    naicsCode: '541712',
    naicsDescription: 'Research and Development in the Physical, Engineering, and Life Sciences',
    setAside: 'minority-owned',
    description: 'Advanced research into next-generation solar panel efficiency and energy storage solutions.',
    status: 'Active',
    endDate: '2026-12-31'
  },
  {
    id: '3',
    title: 'Highway Construction Project',
    agency: 'Department of Transportation',
    amount: 45200000,
    awardDate: '2025-01-08',
    location: 'Texas',
    naicsCode: '237310',
    naicsDescription: 'Highway, Street, and Bridge Construction',
    setAside: 'veteran-owned',
    description: 'Construction of 15-mile highway extension with advanced traffic management systems.',
    status: 'Active',
    endDate: '2027-06-30'
  }
];

// NAICS code data with descriptions
const naicsData = {
  '541511': {
    title: 'Custom Computer Programming Services',
    description: 'This industry comprises establishments primarily engaged in writing, modifying, testing, and supporting software to meet the needs of a particular customer.',
    examples: ['Custom software development', 'Software programming services', 'Application development'],
    averageContract: '$2.5M',
    totalContracts: '15,432'
  },
  '541712': {
    title: 'Research and Development in Physical, Engineering, and Life Sciences',
    description: 'This industry comprises establishments primarily engaged in conducting research and experimental development in the physical, engineering, and life sciences.',
    examples: ['Scientific research', 'Product development', 'Technology innovation'],
    averageContract: '$4.2M',
    totalContracts: '8,901'
  },
  '237310': {
    title: 'Highway, Street, and Bridge Construction',
    description: 'This industry comprises establishments primarily engaged in the construction of highways, streets, roads, airport runways, public sidewalks, or bridges.',
    examples: ['Road construction', 'Bridge building', 'Infrastructure development'],
    averageContract: '$12.8M',
    totalContracts: '6,234'
  }
};

// Set-aside type data
const setAsideData = {
  'small-business': {
    title: 'Small Business Set-Aside',
    description: 'Reserved for small businesses as defined by SBA size standards. Small businesses must meet specific size criteria based on their industry.',
    icon: Briefcase,
    requirements: ['Meet SBA size standards', 'Registered in SAM.gov', 'Eligible small business'],
    benefits: ['Reduced competition', 'Government contracting opportunities', 'Business development support'],
    color: 'bg-blue-500'
  },
  'minority-owned': {
    title: 'Minority-Owned Business',
    description: 'Set-aside for businesses that are at least 51% owned and controlled by one or more minority group members.',
    icon: Users,
    requirements: ['51% minority ownership', 'Minority control of operations', 'Certified by appropriate agency'],
    benefits: ['Access to specialized opportunities', 'Networking opportunities', 'Business development programs'],
    color: 'bg-green-500'
  },
  'veteran-owned': {
    title: 'Veteran-Owned Small Business',
    description: 'Reserved for small businesses that are at least 51% owned and controlled by veterans.',
    icon: Shield,
    requirements: ['Veteran ownership (51%+)', 'Veteran control', 'Small business qualification'],
    benefits: ['Veteran business opportunities', 'Support networks', 'Specialized training programs'],
    color: 'bg-purple-500'
  }
};

interface ContractAwardWallProps {}

const ContractAwardWall: React.FC<ContractAwardWallProps> = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSetAside, setSelectedSetAside] = useState('all');
  const [sortField, setSortField] = useState<'amount' | 'date' | 'title'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [showNAICSModal, setShowNAICSModal] = useState(false);
  const [selectedNAICS, setSelectedNAICS] = useState<string | null>(null);
  const [showSetAsideModal, setShowSetAsideModal] = useState(false);
  const [selectedSetAsideInfo, setSelectedSetAsideInfo] = useState<string | null>(null);
  
  // Enhanced filter states
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedAgency, setSelectedAgency] = useState('all');
  const [amountRange, setAmountRange] = useState({ min: '', max: '' });
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [quickFilter, setQuickFilter] = useState('all');

  // Enhanced filtering logic
  const filteredContracts = useMemo(() => {
    let filtered = mockContracts.filter(contract => {
      // Text search
      const matchesSearch = contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           contract.agency.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           contract.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Set-aside filter
      const matchesSetAside = selectedSetAside === 'all' || contract.setAside === selectedSetAside;
      
      // Agency filter
      const matchesAgency = selectedAgency === 'all' || contract.agency === selectedAgency;
      
      // Location filter
      const matchesLocation = selectedLocation === 'all' || contract.location.includes(selectedLocation);
      
      // Amount range filter
      const matchesAmount = (!amountRange.min || contract.amount >= parseInt(amountRange.min)) &&
                            (!amountRange.max || contract.amount <= parseInt(amountRange.max));
      
      // Date range filter
      const contractDate = new Date(contract.awardDate);
      const matchesDate = (!dateRange.start || contractDate >= new Date(dateRange.start)) &&
                          (!dateRange.end || contractDate <= new Date(dateRange.end));
      
      // Quick filter
      const matchesQuickFilter = quickFilter === 'all' || 
        (quickFilter === 'large' && contract.amount > 10000000) ||
        (quickFilter === 'recent' && new Date(contract.awardDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) ||
        (quickFilter === 'tech' && contract.naicsDescription?.toLowerCase().includes('technology')) ||
        (quickFilter === 'defense' && contract.agency.toLowerCase().includes('defense'));
      
      return matchesSearch && matchesSetAside && matchesAgency && matchesLocation && matchesAmount && matchesDate && matchesQuickFilter;
    });

    // Sort contracts
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'amount':
          comparison = a.amount - b.amount;
          break;
        case 'date':
          comparison = new Date(a.awardDate).getTime() - new Date(b.awardDate).getTime();
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [searchTerm, selectedSetAside, selectedAgency, selectedLocation, amountRange, dateRange, quickFilter, sortField, sortDirection]);

  // Get unique agencies for filter dropdown
  const uniqueAgencies = useMemo(() => {
    return [...new Set(mockContracts.map(contract => contract.agency))].sort();
  }, []);

  // Get unique locations for filter dropdown
  const uniqueLocations = useMemo(() => {
    return [...new Set(mockContracts.map(contract => contract.location))].sort();
  }, []);

  // Active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedSetAside !== 'all') count++;
    if (selectedAgency !== 'all') count++;
    if (selectedLocation !== 'all') count++;
    if (amountRange.min || amountRange.max) count++;
    if (dateRange.start || dateRange.end) count++;
    if (quickFilter !== 'all') count++;
    return count;
  }, [selectedSetAside, selectedAgency, selectedLocation, amountRange, dateRange, quickFilter]);

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedSetAside('all');
    setSelectedAgency('all');
    setSelectedLocation('all');
    setAmountRange({ min: '', max: '' });
    setDateRange({ start: '', end: '' });
    setQuickFilter('all');
    setSearchTerm('');
  };

  const handleSort = (field: 'amount' | 'date' | 'title') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getSetAsideIcon = (setAsideType: string) => {
    const iconData = setAsideData[setAsideType as keyof typeof setAsideData];
    return iconData ? iconData.icon : Briefcase;
  };

  const getSetAsideColor = (setAsideType: string) => {
    const colorData = setAsideData[setAsideType as keyof typeof setAsideData];
    return colorData ? colorData.color : 'bg-gray-500';
  };

  const handleNAICSClick = (naicsCode: string) => {
    setSelectedNAICS(naicsCode);
    setShowNAICSModal(true);
  };

  const handleSetAsideClick = (setAsideType: string) => {
    setSelectedSetAsideInfo(setAsideType);
    setShowSetAsideModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700">
      {/* Header */}
      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-b border-white/20 dark:border-slate-700/50 px-6 py-6">
        <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                  Contract Award Wall
                </h1>
                <div className="flex items-center gap-6 mt-3">
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    <span className="font-bold text-blue-600 dark:text-blue-400">{filteredContracts.length}</span> contracts found
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Total Value: <span className="font-bold text-green-600 dark:text-green-400">
                        {formatCurrency(filteredContracts.reduce((sum, contract) => sum + contract.amount, 0))}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Avg Value: <span className="font-bold text-green-600 dark:text-green-400">
                        {filteredContracts.length > 0 ? formatCurrency(filteredContracts.reduce((sum, contract) => sum + contract.amount, 0) / filteredContracts.length) : '$0'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Real-time indicator */}
              <div className="text-right">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Live Data
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  Updated {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>

          {/* Enhanced Search and Filters */}
          <div className="space-y-4">
            {/* Main Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search contracts, agencies, locations, or NAICS codes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-white/30 dark:border-slate-600/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2">
              {['all', 'large', 'recent', 'tech', 'defense'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setQuickFilter(filter)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                    quickFilter === filter
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-white/70 dark:bg-slate-800/70 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-slate-700/50 hover:scale-105'
                  }`}
                >
                  {filter === 'all' && '🏢 All Contracts'}
                  {filter === 'large' && '💰 Large ($10M+)'}
                  {filter === 'recent' && '🕒 Recent (30 days)'}
                  {filter === 'tech' && '💻 Technology'}
                  {filter === 'defense' && '🛡️ Defense'}
                </button>
              ))}
            </div>

            {/* Advanced Filters Toggle */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-200 font-medium"
              >
                <Filter className="w-4 h-4" />
                Advanced Filters
                {activeFiltersCount > 0 && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
                {showAdvancedFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium transition-colors duration-200"
                >
                  Clear All Filters
                </button>
              )}
            </div>

            {/* Advanced Filters Panel */}
            {showAdvancedFilters && (
              <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 border border-white/30 dark:border-slate-600/30 shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Set-aside Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Set-Aside Type
                    </label>
                    <select
                      value={selectedSetAside}
                      onChange={(e) => setSelectedSetAside(e.target.value)}
                      className="w-full px-3 py-2 bg-white/70 dark:bg-slate-700/70 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                      <option value="all">All Set-Asides</option>
                      <option value="small-business">Small Business</option>
                      <option value="minority-owned">Minority-Owned</option>
                      <option value="veteran-owned">Veteran-Owned</option>
                      <option value="woman-owned">Woman-Owned</option>
                      <option value="hubzone">HubZone</option>
                    </select>
                  </div>

                  {/* Agency Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Agency
                    </label>
                    <select
                      value={selectedAgency}
                      onChange={(e) => setSelectedAgency(e.target.value)}
                      className="w-full px-3 py-2 bg-white/70 dark:bg-slate-700/70 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                      <option value="all">All Agencies</option>
                      {uniqueAgencies.map(agency => (
                        <option key={agency} value={agency}>{agency}</option>
                      ))}
                    </select>
                  </div>

                  {/* Location Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Location
                    </label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full px-3 py-2 bg-white/70 dark:bg-slate-700/70 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                      <option value="all">All Locations</option>
                      {uniqueLocations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>

                  {/* Sort Controls */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Sort By
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSort('date')}
                        className={`flex-1 px-3 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
                          sortField === 'date'
                            ? 'bg-blue-500 text-white shadow-lg'
                            : 'bg-white/70 dark:bg-slate-700/70 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-slate-600/50'
                        }`}
                      >
                        Date {sortField === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
                      </button>
                      <button
                        onClick={() => handleSort('amount')}
                        className={`flex-1 px-3 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
                          sortField === 'amount'
                            ? 'bg-blue-500 text-white shadow-lg'
                            : 'bg-white/70 dark:bg-slate-700/70 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-slate-600/50'
                        }`}
                      >
                        Amount {sortField === 'amount' && (sortDirection === 'asc' ? '↑' : '↓')}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Amount Range Filter */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Amount Range
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Min amount"
                        value={amountRange.min}
                        onChange={(e) => setAmountRange(prev => ({ ...prev, min: e.target.value }))}
                        className="flex-1 px-3 py-2 bg-white/70 dark:bg-slate-700/70 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                      <input
                        type="number"
                        placeholder="Max amount"
                        value={amountRange.max}
                        onChange={(e) => setAmountRange(prev => ({ ...prev, max: e.target.value }))}
                        className="flex-1 px-3 py-2 bg-white/70 dark:bg-slate-700/70 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Date Range
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="date"
                        value={dateRange.start}
                        onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                        className="flex-1 px-3 py-2 bg-white/70 dark:bg-slate-700/70 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                      <input
                        type="date"
                        value={dateRange.end}
                        onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                        className="flex-1 px-3 py-2 bg-white/70 dark:bg-slate-700/70 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Active Filter Tags */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedSetAside !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">
                    Set-aside: {selectedSetAside}
                    <button onClick={() => setSelectedSetAside('all')} className="hover:text-blue-600">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedAgency !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm">
                    Agency: {selectedAgency}
                    <button onClick={() => setSelectedAgency('all')} className="hover:text-green-600">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedLocation !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">
                    Location: {selectedLocation}
                    <button onClick={() => setSelectedLocation('all')} className="hover:text-blue-600">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {quickFilter !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 rounded-full text-sm">
                    Quick: {quickFilter}
                    <button onClick={() => setQuickFilter('all')} className="hover:text-orange-600">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Contract Cards */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {filteredContracts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">No contracts found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Try adjusting your search terms or filters</p>
            <button
              onClick={clearAllFilters}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-8">
            {filteredContracts.map((contract, index) => {
              const SetAsideIcon = getSetAsideIcon(contract.setAside);
              const setAsideColor = getSetAsideColor(contract.setAside);
              
              return (
                <div
                  key={contract.id}
                  className="group card-3d bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-slate-700/30 p-8 relative overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Header */}
                  <div className="relative flex flex-col lg:flex-row lg:items-start justify-between mb-6">
                    <div className="flex-1 lg:pr-8">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                          <Briefcase className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                            {contract.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-6 text-sm">
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                              <Building2 className="w-4 h-4 text-blue-500" />
                              <span className="font-medium">{contract.agency}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                              <MapPin className="w-4 h-4 text-green-500" />
                              <span>{contract.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                              <Calendar className="w-4 h-4 text-blue-500" />
                              <span>{formatDate(contract.awardDate)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Amount Display */}
                    <div className="text-right bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800/30">
                      <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                        {formatCurrency(contract.amount)}
                      </div>
                      <div className="text-sm text-green-600/70 dark:text-green-400/70 font-medium">
                        Contract Value
                      </div>
                      {contract.amount > 10000000 && (
                        <div className="inline-flex items-center gap-1 mt-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-bold">
                          <Crown className="w-3 h-3" />
                          LARGE CONTRACT
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="relative mb-6">
                    <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                      {contract.description}
                    </p>
                  </div>

                  {/* Tags and Actions */}
                  <div className="relative flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                      {/* NAICS Code Button */}
                      <button
                        onClick={() => handleNAICSClick(contract.naicsCode)}
                        className="group/naics naics-code-hover flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200"
                      >
                        <Tag className="w-4 h-4" />
                        <span className="font-medium">NAICS {contract.naicsCode}</span>
                        <ChevronDown className="w-4 h-4 group-hover/naics:translate-y-0.5 transition-transform" />
                      </button>

                      {/* Set-aside Type Button */}
                      <button
                        onClick={() => handleSetAsideClick(contract.setAside)}
                        className={`group/setaside flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 ${setAsideColor} bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-gradient-to-r hover:from-orange-100 hover:to-blue-100 dark:hover:from-orange-900/30 dark:hover:to-blue-900/50 hover:border-orange-warm`}
                      >
                        <SetAsideIcon className="w-4 h-4" />
                        <span className="font-medium">{contract.setAside}</span>
                      </button>

                      {/* Status Badge */}
                      <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium border border-green-200 dark:border-green-800">
                        ✅ Active
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg">
                        <InfoIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Progress indicator for recent contracts */}
                  {new Date(contract.awardDate) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
                    <div className="absolute top-4 right-4">
                      <div className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-xs font-bold animate-pulse">
                        🔥 NEW
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* NAICS Modal */}
      {showNAICSModal && selectedNAICS && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                NAICS Code Details
              </h3>
              <button
                onClick={() => setShowNAICSModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              {naicsData[selectedNAICS as keyof typeof naicsData] && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-mono text-sm">
                      {selectedNAICS}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {naicsData[selectedNAICS as keyof typeof naicsData].title}
                    </h4>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    {naicsData[selectedNAICS as keyof typeof naicsData].description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Examples</h5>
                      <ul className="space-y-2">
                        {naicsData[selectedNAICS as keyof typeof naicsData].examples.map((example, index) => (
                          <li key={index} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {naicsData[selectedNAICS as keyof typeof naicsData].averageContract}
                        </div>
                        <div className="text-sm text-green-700 dark:text-green-300">Average Contract</div>
                      </div>
                      
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {naicsData[selectedNAICS as keyof typeof naicsData].totalContracts}
                        </div>
                        <div className="text-sm text-blue-700 dark:text-blue-300">Total Contracts</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Set-aside Modal */}
      {showSetAsideModal && selectedSetAsideInfo && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Set-Aside Information
              </h3>
              <button
                onClick={() => setShowSetAsideModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              {setAsideData[selectedSetAsideInfo as keyof typeof setAsideData] && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    {React.createElement(setAsideData[selectedSetAsideInfo as keyof typeof setAsideData].icon, {
                      className: "w-8 h-8 text-blue-600 dark:text-blue-400"
                    })}
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {setAsideData[selectedSetAsideInfo as keyof typeof setAsideData].title}
                    </h4>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    {setAsideData[selectedSetAsideInfo as keyof typeof setAsideData].description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Requirements</h5>
                      <ul className="space-y-2">
                        {setAsideData[selectedSetAsideInfo as keyof typeof setAsideData].requirements.map((req, index) => (
                          <li key={index} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Benefits</h5>
                      <ul className="space-y-2">
                        {setAsideData[selectedSetAsideInfo as keyof typeof setAsideData].benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractAwardWall;
