import React, { useState, useEffect } from 'react';
import { useSamGovData } from '../../hooks/useSamGovData';
import { ChevronDown, Calendar, Building2, MapPin, Award, Loader2, Shield, Server, Wrench, Users, Globe, Flag } from 'lucide-react';
import { format } from 'date-fns';

const ChatterWall: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: contracts, loading, error } = useSamGovData({ 
    limit: 50,
    filters: {
      dateFrom: '2025-01-01',
      dateTo: new Date().toISOString().split('T')[0],
    }
  });

  // Auto-scroll through contracts
  useEffect(() => {
    if (contracts.length > 0 && !isExpanded) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % Math.min(10, contracts.length));
      }, 3000); // Change every 3 seconds
      return () => clearInterval(interval);
    }
  }, [contracts.length, isExpanded]);

  // Get category icon for NAICS codes
  const getCategoryIcon = (naicsCode: string, description: string) => {
    const code = naicsCode || '';
    const desc = description?.toLowerCase() || '';
    
    if (desc.includes('cybersecurity') || desc.includes('security') || desc.includes('defense')) {
      return <Shield className="w-4 h-4 text-blue-500" />;
    }
    if (desc.includes('it') || desc.includes('software') || desc.includes('technology') || code.startsWith('54')) {
      return <Server className="w-4 h-4 text-green-500" />;
    }
    if (desc.includes('construction') || desc.includes('engineering') || desc.includes('maintenance')) {
      return <Wrench className="w-4 h-4 text-orange-500" />;
    }
    if (desc.includes('consulting') || desc.includes('professional') || desc.includes('management')) {
      return <Users className="w-4 h-4 text-purple-500" />;
    }
    if (desc.includes('transportation') || desc.includes('logistics') || desc.includes('supply')) {
      return <Globe className="w-4 h-4 text-teal-500" />;
    }
    return <Building2 className="w-4 h-4 text-gray-500" />;
  };

  // Check if set-aside includes SDVOSB
  const isSDVOSB = (setAside: string) => {
    return setAside?.toLowerCase().includes('sdvo') || setAside?.toLowerCase().includes('service-disabled veteran');
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(1)}B`;
    }
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const displayedContracts = isExpanded ? contracts.slice(0, 50) : contracts.slice(0, 10);
  const totalValue = displayedContracts.reduce((sum, contract) => sum + contract.amount, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 dark:text-blue-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading contract data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800 transition-colors duration-200 relative bg-gradient-grid-pattern">
      {/* Enhanced Floating Balls - Smaller and More Fintech */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="chatter-floating-ball-1 absolute top-1/4 left-1/4 w-20 h-20 bg-gradient-to-br from-purple-500/15 to-blue-500/10 rounded-full blur-lg"></div>
        <div className="chatter-floating-ball-2 absolute top-3/4 right-1/3 w-16 h-16 bg-gradient-to-br from-blue-500/10 to-indigo-500/15 rounded-full blur-md"></div>
        <div className="chatter-floating-ball-3 absolute top-1/2 right-1/4 w-18 h-18 bg-gradient-to-br from-indigo-500/15 to-purple-600/10 rounded-full blur-lg"></div>
        <div className="chatter-floating-ball-1 chatter-delay-3s absolute top-1/6 right-1/6 w-14 h-14 bg-gradient-to-br from-cyan-400/10 to-blue-500/15 rounded-full blur-md"></div>
        <div className="chatter-floating-ball-2 chatter-delay-1-5s absolute bottom-1/4 left-1/6 w-22 h-22 bg-gradient-to-br from-purple-400/10 to-pink-500/8 rounded-full blur-xl"></div>
      </div>
      
      {/* Header - Compact Fintech Style */}
      <div className="bg-white/95 dark:bg-gray-800/95 border-b border-gray-200/60 dark:border-gray-700/60 shadow-sm backdrop-blur-md relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="text-center">
            <h1 className="text-2xl font-extrabold mb-3 font-inter tracking-tight leading-tight bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 dark:from-purple-400 dark:via-blue-400 dark:to-indigo-500 bg-clip-text text-transparent filter drop-shadow-sm">
              Federal Contract Chatter Wall
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 font-inter font-medium">
              Real-time federal contracting activity and spending transparency
            </p>
            <div className="flex items-center justify-center space-x-6">
              <div className="text-center">
                <div className="text-lg font-bold text-green-600 dark:text-green-400 animate-pulse-slow">
                  {formatCurrency(totalValue)}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-inter">
                  Total Value
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {displayedContracts.length}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-inter">Contracts</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  {displayedContracts.filter(c => c.setAside).length}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-inter">Set-Aside</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contract Feed - Compact Fintech Cards */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-3">
          {displayedContracts.map((contract, index) => (
            <div
              key={contract.id}
              className={`chatter-card-compact bg-white/95 dark:bg-gray-800/95 rounded-md border border-gray-200/60 dark:border-gray-700/60 p-4 animate-slide-in-up chatter-card-delay-${Math.min(index, 9)} backdrop-blur-sm`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-3 gap-3">
                <div className="flex-1 min-w-0 pr-0 lg:pr-4">
                  <div className="flex flex-wrap items-center gap-1.5 mb-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-blue-600 text-white flex-shrink-0 shadow-sm">
                      #{index + 1}
                    </span>
                    {contract.setAside && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-purple-600 text-white flex-shrink-0 shadow-sm">
                        <Award className="w-3 h-3 mr-1" />
                        {isSDVOSB(contract.setAside) && (
                          <Flag className="w-3 h-3 mr-1 text-yellow-300 filter drop-shadow-sm" />
                        )}
                        {contract.setAside}
                      </span>
                    )}
                    <span className="chatter-naics-compact inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold flex-shrink-0">
                      {getCategoryIcon(contract.naicsCode, contract.naicsDescription)}
                      <span className="ml-1">{contract.naicsCode}</span>
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 leading-tight break-words pr-2 font-inter">
                    {contract.description}
                  </h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <div className="flex items-center min-w-0">
                      <Building2 className="w-3 h-3 mr-1.5 text-gray-400 flex-shrink-0" />
                      <span className="font-medium truncate font-inter text-xs">{contract.vendor}</span>
                    </div>
                    <div className="flex items-center min-w-0">
                      <Calendar className="w-3 h-3 mr-1.5 text-gray-400 flex-shrink-0" />
                      <span className="truncate font-inter text-xs">{format(new Date(contract.awardDate), 'MMM dd, yyyy')}</span>
                    </div>
                    <div className="flex items-center min-w-0">
                      <MapPin className="w-3 h-3 mr-1.5 text-gray-400 flex-shrink-0" />
                      <span className="truncate font-inter text-xs">{contract.location.city}, {contract.location.state}</span>
                    </div>
                    <div className="flex items-center min-w-0">
                      <Building2 className="w-3 h-3 mr-1.5 text-gray-400 flex-shrink-0" />
                      <span className="truncate font-inter text-xs">{contract.agency}</span>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="text-lg font-bold text-green-600 dark:text-green-400 font-inter">
                    {formatCurrency(contract.amount)}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-inter">
                    Contract Value
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-100/60 dark:border-gray-700/60 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs">
                  <span className="break-words font-inter chatter-naics-desc-compact">
                    <span className="font-semibold">NAICS:</span> {contract.naicsDescription}
                  </span>
                  <span className="flex-shrink-0 font-inter text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Type:</span> {contract.type.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Expand/Collapse Button - Compact */}
        {contracts.length > 10 && (
          <div className="text-center mt-6">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 group font-inter text-sm font-semibold"
            >
              <span className="mr-2">
                {isExpanded ? 'Show Less' : 'Show More Contracts'}
              </span>
              <ChevronDown 
                className={`w-4 h-4 transition-all duration-300 group-hover:text-orange-400 group-hover:rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                  isExpanded ? 'rotate-180' : ''
                }`} 
              />
            </button>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 font-inter">
              {isExpanded 
                ? `Showing ${displayedContracts.length} of ${contracts.length} contracts`
                : `Showing 10 of ${contracts.length} contracts`
              }
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg px-4 py-2 mt-6">
            <div className="flex items-center justify-center">
              <div className="text-yellow-600 dark:text-yellow-400 flex-shrink-0 mr-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-xs font-medium text-yellow-800 dark:text-yellow-400 whitespace-nowrap">
                Using demonstration data - {error}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatterWall;