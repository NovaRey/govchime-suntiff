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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 font-inter">
              Federal Contract Chatter Wall
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6 font-inter">
              Real-time federal contracting activity and spending transparency
            </p>
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 animate-pulse-slow">
                  {formatCurrency(totalValue)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 animate-pulse-slow" style={{
                  textShadow: '0 0 10px rgba(34, 197, 94, 0.3)',
                  animation: 'pulse 3s ease-in-out infinite'
                }}>
                  Total Value
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {displayedContracts.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Contracts Shown</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {displayedContracts.filter(c => c.setAside).length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Set-Aside</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contract Feed */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4">
          {displayedContracts.map((contract, index) => (
            <div
              key={contract.id}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 animate-slide-in-up"
              style={{
                animationDelay: `${index * 150}ms`,
                animationFillMode: 'both'
              }}
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4 gap-4">
                <div className="flex-1 min-w-0 pr-0 lg:pr-6">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 flex-shrink-0">
                      #{index + 1}
                    </span>
                    {contract.setAside && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 flex-shrink-0">
                        <Award className="w-3 h-3 mr-1" />
                        {isSDVOSB(contract.setAside) && (
                          <Flag className="w-3 h-3 mr-1 text-red-500 filter drop-shadow-sm" />
                        )}
                        {contract.setAside}
                      </span>
                    )}
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 flex-shrink-0">
                      {getCategoryIcon(contract.naicsCode, contract.naicsDescription)}
                      <span className="ml-1">{contract.naicsCode}</span>
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 leading-tight break-words pr-4 font-inter">
                    {contract.description}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center min-w-0">
                      <Building2 className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                      <span className="font-medium truncate font-inter">{contract.vendor}</span>
                    </div>
                    <div className="flex items-center min-w-0">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                      <span className="truncate font-inter">{format(new Date(contract.awardDate), 'MMM dd, yyyy')}</span>
                    </div>
                    <div className="flex items-center min-w-0">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                      <span className="truncate font-inter">{contract.location.city}, {contract.location.state}</span>
                    </div>
                    <div className="flex items-center min-w-0">
                      <Building2 className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                      <span className="truncate font-inter">{contract.agency}</span>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="text-xl lg:text-2xl font-bold text-green-600 dark:text-green-400 font-inter">
                    {formatCurrency(contract.amount)}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-inter">
                    Contract Value
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-100 dark:border-gray-700 pt-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <span className="break-words font-inter">
                    <span className="font-medium">NAICS:</span> {contract.naicsDescription}
                  </span>
                  <span className="flex-shrink-0 font-inter">
                    <span className="font-medium">Type:</span> {contract.type.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Expand/Collapse Button */}
        {contracts.length > 10 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 shadow-sm hover:shadow-lg transform hover:scale-105 group font-inter"
            >
              <span className="mr-2">
                {isExpanded ? 'Show Less' : 'Show More Contracts'}
              </span>
              <ChevronDown 
                className={`w-5 h-5 transition-all duration-300 group-hover:text-orange-400 group-hover:rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 ${
                  isExpanded ? 'rotate-180' : ''
                }`} 
              />
            </button>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 font-inter">
              {isExpanded 
                ? `Showing ${displayedContracts.length} of ${contracts.length} contracts`
                : `Showing 10 of ${contracts.length} contracts`
              }
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-6">
            <div className="flex items-center">
              <div className="text-yellow-600 dark:text-yellow-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-400">
                  Using demonstration data
                </h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatterWall;