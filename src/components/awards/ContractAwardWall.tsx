import React, { useState, useEffect, useMemo } from 'react';
import { Search, ChevronDown, ChevronRight, Shield, Flag, Users, MapPin, Filter, Crown, Sparkles, FileText, X, Zap, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSamGovData } from '../../hooks/useSamGovData';
import NAICSCodeDirectory from './NAICSCodeDirectory';
import { enhanceContractTitle, getContractInsights, type ContractData } from '../../services/aiTitleEnhancer';
import { GrokLoadingBar } from '../common/GrokLoadingBar';

const ContractAwardWall: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchFilters, setShowSearchFilters] = useState(false);
  const [selectedSetAside, setSelectedSetAside] = useState<string>('');
  const [selectedAgency, setSelectedAgency] = useState<string>('');
  const [dateRange, setDateRange] = useState<string>('30');
  const [showProModal, setShowProModal] = useState<boolean>(false);
  const [useAITitles, setUseAITitles] = useState<boolean>(true);
  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);

  const { data: opportunities, loading, error } = useSamGovData();

  // Function to get agency icon
  const getAgencyIcon = (agency: string) => {
    const agencyLower = agency.toLowerCase();
    if (agencyLower.includes('defense') || agencyLower.includes('dod')) return '🛡️';
    if (agencyLower.includes('health') || agencyLower.includes('hhs')) return '🏥';
    if (agencyLower.includes('homeland') || agencyLower.includes('dhs')) return '🔒';
    if (agencyLower.includes('energy') || agencyLower.includes('doe')) return '⚡';
    if (agencyLower.includes('transportation') || agencyLower.includes('dot')) return '🚛';
    if (agencyLower.includes('agriculture') || agencyLower.includes('usda')) return '🌾';
    if (agencyLower.includes('nasa')) return '🚀';
    if (agencyLower.includes('veterans') || agencyLower.includes('va')) return '🎖️';
    if (agencyLower.includes('gsa') || agencyLower.includes('general services')) return '🏛️';
    if (agencyLower.includes('justice') || agencyLower.includes('doj')) return '⚖️';
    if (agencyLower.includes('commerce') || agencyLower.includes('doc')) return '💼';
    if (agencyLower.includes('education')) return '🎓';
    if (agencyLower.includes('treasury')) return '💰';
    if (agencyLower.includes('state') || agencyLower.includes('dos')) return '🌍';
    if (agencyLower.includes('interior')) return '🏞️';
    return '🏛️'; // Default government building icon
  };

  // Function to open detail modal
  const openDetailModal = (opportunity: any) => {
    setSelectedOpportunity(opportunity);
    setShowDetailModal(true);
  };

  // Function to close detail modal
  const closeDetailModal = () => {
    setSelectedOpportunity(null);
    setShowDetailModal(false);
  };

  // Enhanced contract data with AI-generated titles
  const enhancedOpportunities = useMemo(() => {
    if (!useAITitles) return opportunities;
    
    return opportunities.map(opportunity => {
      const contractData: ContractData = {
        description: opportunity.description,
        naicsCode: opportunity.naicsCode,
        naicsDescription: opportunity.naicsDescription,
        agency: opportunity.agency,
        amount: opportunity.amount,
        setAside: opportunity.setAside
      };
      
      const enhancedTitle = enhanceContractTitle(contractData);
      const insights = getContractInsights(contractData);
      
      return {
        ...opportunity,
        enhancedTitle,
        insights
      };
    });
  }, [opportunities, useAITitles]);

  useEffect(() => {
    // Initial load - the hook will automatically fetch data
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, we'll just use the existing data from the hook
    // In a real implementation, this would trigger a new search
  };

  const handleCustomReport = () => {
    navigate('/signup');
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

  const filteredOpportunities = enhancedOpportunities.filter(opportunity => {
    const matchesSearch = searchTerm === '' || 
      opportunity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.agency.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSetAside = selectedSetAside === '' || opportunity.setAside === selectedSetAside;
    const matchesAgency = selectedAgency === '' || selectedAgency === 'All Agencies' || 
      opportunity.agency.includes(selectedAgency);
    
    return matchesSearch && matchesSetAside && matchesAgency;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Header Section - Apple Style */}
      <div className="relative overflow-hidden pb-12">
        {/* Extended Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/30 dark:from-gray-900/90 dark:via-gray-800/95 dark:to-indigo-900/50"></div>
        
        {/* Professional background extension */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/80 via-blue-50/40 to-transparent dark:from-gray-900/80 dark:via-gray-800/40 dark:to-transparent"></div>
        
        {/* Subtle animated background elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/40 to-purple-100/20 dark:from-blue-900/20 dark:to-purple-900/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-gradient-to-br from-indigo-100/30 to-blue-100/20 dark:from-indigo-900/15 dark:to-blue-900/10 rounded-full blur-3xl animate-pulse animate-delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
          {/* Title Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent leading-tight tracking-tight">
              Federal Contract Awards
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
              Discover opportunities, analyze trends, and navigate the federal contracting landscape with intelligence.
            </p>
            <div className="mt-8 flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {filteredOpportunities.length.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">
                  Opportunities
                </div>
              </div>
              <div className="w-px h-12 bg-gray-300 dark:bg-gray-600"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  Live
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">
                  Data Feed
                </div>
              </div>
            </div>
          </div>

          </div>

          {/* Search Section - Apple Style */}
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 w-6 h-6 transition-colors duration-200" />
                <input
                  type="text"
                  placeholder="Search opportunities, agencies, keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 text-lg border-2 border-gray-200/60 dark:border-gray-600/60 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 backdrop-blur-sm transition-all duration-300 shadow-xl"
                />
              </div>
              <button
                type="button"
                onClick={() => setShowSearchFilters(!showSearchFilters)}
                className="flex items-center px-6 py-4 bg-white/90 dark:bg-gray-800/90 border-2 border-gray-200/60 dark:border-gray-600/60 rounded-2xl hover:bg-gray-50/90 dark:hover:bg-gray-700/90 transition-all duration-300 backdrop-blur-sm shadow-xl group"
              >
                <Filter className="w-5 h-5 mr-3 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-gray-900 dark:text-gray-100 font-semibold">Filters</span>
                {showSearchFilters ? (
                  <ChevronDown className="w-5 h-5 ml-3 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-200" />
                ) : (
                  <ChevronRight className="w-5 h-5 ml-3 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-200" />
                )}
              </button>
              {/* Custom Report Button - Enhanced iOS Style */}
              <button
                type="button"
                onClick={handleCustomReport}
                className="relative flex items-center justify-center px-6 py-4 bg-gradient-to-r from-gray-100/90 to-gray-200/90 dark:from-gray-700/90 dark:to-gray-800/90 border-2 border-gray-200/60 dark:border-gray-600/60 text-gray-700 dark:text-gray-300 rounded-2xl hover:!bg-gradient-to-br hover:!from-[#ff6900] hover:!via-[#ff7a00] hover:!to-[#ff4500] hover:border-transparent transition-all duration-300 ease-out shadow-xl backdrop-blur-sm transform hover:scale-[1.02] font-semibold group overflow-hidden"
                title="Generate Custom Contract Report - Pro Feature"
              >
                {/* Animated Glowing Border */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#ff6900] via-[#ff7a00] to-[#ff4500] animate-pulse"></div>
                  <div className="absolute inset-[2px] rounded-2xl bg-gradient-to-br from-[#ff6900] via-[#ff7a00] to-[#ff4500]"></div>
                </div>
                
                {/* Glass Shimmer Effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 via-transparent to-white/10"></div>
                  <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/20 to-transparent"></div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                </div>
                
                {/* Flowing Border Animation */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <div className="absolute -inset-2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 flex items-center">
                  <Crown className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400 group-hover:text-black transition-colors duration-300 ease-out" />
                  <div className="relative overflow-hidden">
                    <span className="inline-block transition-all duration-300 ease-out group-hover:opacity-0 group-hover:-translate-y-full group-hover:text-black">
                      Custom Report
                    </span>
                    <span className="absolute inset-0 inline-block transition-all duration-300 ease-out opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 text-black font-bold">
                      Pro Feature
                    </span>
                  </div>
                </div>
              </button>
            </form>

            {/* Filter Options */}
            {showSearchFilters && (
              <div className="mt-8 bg-white/90 dark:bg-gray-800/90 p-6 rounded-2xl border-2 border-gray-200/60 dark:border-gray-600/60 backdrop-blur-sm shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Set-Aside Type
                  </label>
                  <select
                    title="Select set-aside type"
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
                    title="Select agency"
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
                    title="Select date range"
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

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {error && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg px-4 py-2 mb-6">
            <div className="flex items-center justify-center">
              <Flag className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mr-2 flex-shrink-0" />
              <span className="text-xs font-medium text-yellow-800 dark:text-yellow-400 whitespace-nowrap">
                Using Sample Data - {error}
              </span>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <GrokLoadingBar color="blue" size="lg" className="mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Loading opportunities...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Results Summary */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Contract Opportunities
                </h2>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                  {filteredOpportunities.length} results
                </span>
              </div>
              
              {/* AI Enhancement Toggle */}
              <div className="flex items-center space-x-3">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">AI Enhanced Titles</span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={useAITitles}
                      onChange={(e) => setUseAITitles(e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-10 h-6 rounded-full transition-colors duration-200 ${
                      useAITitles ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`}>
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 transform translate-y-1 ${
                        useAITitles ? 'translate-x-5' : 'translate-x-1'
                      }`}></div>
                    </div>
                  </div>
                  <Brain className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </label>
              </div>
            </div>

            {/* Table Layout */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Agency
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Set Aside
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Posted
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Deadline
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Tools
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredOpportunities.map((opportunity) => (
                      <tr 
                        key={opportunity.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 group"
                      >
                        <td className="px-6 py-6">
                          <div className="space-y-2">
                            {/* Enhanced Title */}
                            {useAITitles && opportunity.enhancedTitle ? (
                              <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                  <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 cursor-pointer transition-colors duration-200">
                                    {opportunity.enhancedTitle.enhanced}
                                  </h3>
                                  <div className="flex items-center space-x-1">
                                    <Zap className="w-3 h-3 text-green-500" />
                                    <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                                      {Math.round(opportunity.enhancedTitle.confidence * 100)}%
                                    </span>
                                  </div>
                                </div>
                                {/* Solicitation Number */}
                                {opportunity.solicitationNumber && (
                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                      SOL: {opportunity.solicitationNumber}
                                    </span>
                                  </div>
                                )}
                                <details className="group">
                                  <summary className="text-xs text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300">
                                    View original description
                                  </summary>
                                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mt-1 pl-2 border-l-2 border-gray-200 dark:border-gray-600">
                                    {opportunity.description.length > 150 
                                      ? `${opportunity.description.substring(0, 150)}...` 
                                      : opportunity.description}
                                  </p>
                                </details>
                              </div>
                            ) : (
                              <div className="space-y-1">
                                <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 cursor-pointer transition-colors duration-200">
                                  {opportunity.description.length > 80 
                                    ? `${opportunity.description.substring(0, 80)}...` 
                                    : opportunity.description}
                                </h3>
                                {/* Solicitation Number */}
                                {opportunity.solicitationNumber && (
                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                      SOL: {opportunity.solicitationNumber}
                                    </span>
                                  </div>
                                )}
                                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                  {opportunity.naicsDescription && opportunity.naicsDescription.length > 100
                                    ? `${opportunity.naicsDescription.substring(0, 100)}...`
                                    : opportunity.naicsDescription || 'No description available'}
                                </p>
                              </div>
                            )}
                            
                            {/* Contract Value */}
                            {opportunity.amount > 0 && (
                              <div className="flex items-center space-x-2">
                                <span className="text-xs font-medium text-green-600 dark:text-green-400">
                                  Estimated Value:
                                </span>
                                <span className="text-xs font-bold text-green-700 dark:text-green-300">
                                  ${opportunity.amount.toLocaleString()}
                                </span>
                              </div>
                            )}
                            
                            {/* AI Insights */}
                            {useAITitles && opportunity.insights && (
                              <div className="flex items-center space-x-2 pt-1">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                  opportunity.insights.riskLevel === 'high' 
                                    ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                                    : opportunity.insights.riskLevel === 'medium'
                                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                                    : 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                                }`}>
                                  {opportunity.insights.riskLevel} risk
                                </span>
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                  opportunity.insights.competitiveness === 'high'
                                    ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300'
                                    : opportunity.insights.competitiveness === 'medium'
                                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                                    : 'bg-gray-100 dark:bg-gray-700/30 text-gray-800 dark:text-gray-300'
                                }`}>
                                  {opportunity.insights.competitiveness} competition
                                </span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <div className="flex flex-col space-y-1">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                              Contract Opportunity
                            </span>
                            {opportunity.naicsCode && (
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                NAICS: {opportunity.naicsCode}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <div className="flex items-center space-x-2">
                            <div className="text-lg">{getAgencyIcon(opportunity.agency)}</div>
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {opportunity.agency.length > 25 
                                  ? `${opportunity.agency.substring(0, 25)}...` 
                                  : opportunity.agency}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {opportunity.location?.state || 'Unknown'}, {opportunity.location?.city || 'Unknown'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          {opportunity.setAside ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                              {opportunity.setAside}
                            </span>
                          ) : (
                            <span className="text-xs text-gray-400 dark:text-gray-500">None</span>
                          )}
                        </td>
                        <td className="px-6 py-6">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {new Date(opportunity.awardDate).toLocaleDateString('en-US', {
                              month: '2-digit',
                              day: '2-digit',
                              year: '2-digit'
                            })}
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <div className="flex items-center space-x-1">
                            <span className="text-sm text-gray-900 dark:text-white">
                              {new Date(new Date(opportunity.awardDate).getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                                month: '2-digit',
                                day: '2-digit',
                                year: '2-digit'
                              })}
                            </span>
                            <div className="w-3 h-3 bg-green-500 rounded-full opacity-75"></div>
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <div className="flex items-center space-x-2">
                            <button
                              title="View Details"
                              className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                            >
                              <Search className="w-4 h-4" />
                            </button>
                            <button
                              title="Save Opportunity"
                              className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 text-gray-600 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-all duration-200"
                            >
                              <Flag className="w-4 h-4" />
                            </button>
                            <button
                              title="Export"
                              className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-green-100 dark:hover:bg-green-900/30 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-all duration-200"
                            >
                              <FileText className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Showing {filteredOpportunities.length} of {opportunities.length} opportunities
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200">
                      Previous
                    </button>
                    <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      1
                    </button>
                    <button className="px-3 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* NAICS Code Directory */}
        <div className="mt-12">
          <NAICSCodeDirectory searchTerm="" />
        </div>
      </div>

      {/* Pro Features Modal - Orange Professional Theme */}
      {showProModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-start justify-center pt-8 pb-8 px-4 overflow-y-auto">
          <div 
            className="relative bg-gradient-to-br from-white via-orange-50/50 to-orange-100/30 dark:from-gray-900 dark:via-orange-900/10 dark:to-orange-800/20 rounded-3xl shadow-2xl border-2 border-orange-200/50 dark:border-orange-600/30 max-w-2xl w-full animate-fade-in-scale backdrop-blur-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100/40 via-amber-50/30 to-yellow-100/20 dark:from-orange-900/20 dark:via-amber-900/15 dark:to-yellow-900/10 rounded-3xl"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.1),transparent_50%)] rounded-3xl"></div>
            </div>

            {/* Header */}
            <div className="relative z-10 p-8 pb-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 via-orange-700 to-red-600 dark:from-orange-400 dark:via-orange-300 dark:to-red-400 bg-clip-text text-transparent">
                      Pro Contract Reports
                    </h3>
                    <p className="text-sm text-orange-600/80 dark:text-orange-300/80 font-medium">
                      Professional Intelligence Platform
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowProModal(false)}
                  title="Close modal"
                  className="p-2 rounded-full bg-orange-100/50 dark:bg-orange-900/30 hover:bg-orange-200/70 dark:hover:bg-orange-800/50 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Preview Report Card */}
              <div className="mb-6 p-6 bg-white/80 dark:bg-gray-800/80 rounded-2xl border border-orange-200/50 dark:border-orange-600/30 shadow-lg backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    📊 Sample Contract Intelligence Report
                  </h4>
                  <div className="px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold rounded-full">
                    PRO
                  </div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-lg">
                    <span className="font-medium text-gray-700 dark:text-gray-300">📈 Market Analysis</span>
                    <span className="text-orange-600 dark:text-orange-400 font-bold">$2.4B Identified</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-lg">
                    <span className="font-medium text-gray-700 dark:text-gray-300">🎯 Win Probability</span>
                    <span className="text-green-600 dark:text-green-400 font-bold">87% Match</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-lg">
                    <span className="font-medium text-gray-700 dark:text-gray-300">🏆 Competitive Edge</span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold">12 Insights</span>
                  </div>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-orange-200/40 dark:border-orange-600/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <Sparkles className="w-4 h-4 text-orange-500" />
                    <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">AI Insights</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Smart trend analysis & predictions</p>
                </div>
                
                <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-orange-200/40 dark:border-orange-600/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <FileText className="w-4 h-4 text-orange-500" />
                    <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">PDF Export</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Professional branded reports</p>
                </div>
                
                <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-orange-200/40 dark:border-orange-600/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <Filter className="w-4 h-4 text-orange-500" />
                    <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">Advanced Filters</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Custom segmentation tools</p>
                </div>
                
                <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-orange-200/40 dark:border-orange-600/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="w-4 h-4 text-orange-500" />
                    <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">Competitor Intel</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Market positioning analysis</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowProModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-orange-200 dark:border-orange-600/50 text-orange-700 dark:text-orange-300 rounded-xl hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-300 font-semibold"
                >
                  Maybe Later
                </button>
                <button
                  onClick={() => {
                    setShowProModal(false);
                    window.open('https://govchime.com/pro', '_blank');
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 hover:from-orange-600 hover:via-orange-700 hover:to-red-700 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] font-bold flex items-center justify-center space-x-2"
                >
                  <Crown className="w-4 h-4" />
                  <span>Upgrade to Pro</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractAwardWall;