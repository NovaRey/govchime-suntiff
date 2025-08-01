import React from 'react';
import { Link } from 'react-router-dom';
import { useSamGovData } from '../../hooks/useSamGovData';
import { 
  ArrowRight, 
  BookOpen, 
  Award, 
  TrendingUp,
  FileText,
  Users,
  Search,
  AlertCircle,
  Loader2,
  BarChart3,
  MessageSquare
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { 
    data: contracts, 
    loading, 
    error, 
    totalRecords 
  } = useSamGovData({ 
    limit: 10,
    filters: {
      dateFrom: '2025-01-01',
      dateTo: new Date().toISOString().split('T')[0],
    }
  });

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000000) {
      return `$${(amount / 1000000000000).toFixed(1)}T`;
    }
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

  const tools = [
    {
      title: 'Federal Contracts',
      description: 'Browse and analyze federal contracting opportunities',
      icon: FileText,
      link: '/chatter',
      status: 'active',
      preview: `${totalRecords.toLocaleString()} active opportunities`
    },
    {
      title: 'State Contracts',
      description: 'State-level contracting opportunities and data',
      icon: Users,
      link: '#',
      status: 'coming-soon',
      preview: 'Comprehensive state contract database'
    },
    {
      title: 'Federal Grants',
      description: 'Grant opportunities and funding information',
      icon: Award,
      link: '#',
      status: 'coming-soon',
      preview: 'Grant.gov integration and analytics'
    },
    {
      title: 'Analytics Dashboard',
      description: 'Deep insights into spending patterns and trends',
      icon: BarChart3,
      link: '/spending',
      status: 'active',
      preview: 'Interactive spending visualization'
    },
    {
      title: 'Chatter Wall',
      description: 'Real-time contract activity and transparency feed',
      icon: MessageSquare,
      link: '/chatter',
      status: 'active',
      preview: 'Live contract announcements'
    },
    {
      title: 'Tutorials/Content',
      description: 'Comprehensive guides and tutorials',
      icon: BookOpen,
      link: '/learning',
      status: 'active',
      preview: 'Expert guidance and resources'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Error Banner */}
      {error && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2" />
            <div>
              <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-400">Using Sample Data</h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                API connection unavailable. Showing demonstration data for preview.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto">
                <div className="relative mb-12 flex justify-center items-center min-h-[200px]">
          {/* Digital fintech background */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/10 to-emerald-500/5 blur-xl transform scale-110 animate-pulse-slow"></div>
          <div className="relative bg-white/10 dark:bg-gray-800/10 backdrop-blur-md px-16 py-10 shadow-elevated hover:shadow-3d-hover transition-all duration-500 rounded-xl">
            {/* Digital grid pattern */}
            <div className="absolute inset-0 opacity-20 bg-grid-pattern"></div>
            <div className="relative">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-cyan-800 dark:from-white dark:via-blue-200 dark:to-cyan-200 bg-clip-text text-transparent mb-2 leading-tight">
                Welcome to <span className="relative inline-block group">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 dark:from-cyan-300 dark:via-blue-400 dark:to-emerald-300 bg-clip-text text-transparent animate-shimmer bg-size-200 bg-pos-0">GovChime</span>
                  
                  {/* Fish-like swimming particles behind GovChime */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-90 transition-opacity duration-1000" viewBox="0 0 200 60">
                    {/* Fish 1 - Blue - Long swimming path */}
                    <circle cx="20" cy="15" r="3.5" fill="#3b82f6" className="drop-shadow-lg" opacity="1">
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0,0; 8,5; 15,2; 25,-3; 35,4; 45,1; 55,-2; 65,6; 75,3; 85,-1; 95,5; 105,2; 115,-3; 125,4; 135,1; 145,-2; 155,6; 165,3; 175,-1; 180,2; 175,5; 165,1; 155,-2; 145,4; 135,-1; 125,3; 115,6; 105,2; 95,-3; 85,4; 75,-1; 65,3; 55,5; 45,2; 35,-2; 25,4; 15,1; 8,-2; 0,0"
                        dur="25s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="r"
                        values="3.5; 4.2; 3.8; 4.5; 3.2; 4; 3.7; 4.3; 3.5"
                        dur="12s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="1; 0.7; 0.9; 0.8; 1; 0.6; 0.8; 0.9; 1"
                        dur="15s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    
                    {/* Fish 2 - Orange - Reverse swimming */}
                    <circle cx="180" cy="45" r="3" fill="#f97316" className="drop-shadow-lg" opacity="0.95">
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0,0; -12,3; -25,-2; -38,5; -52,1; -65,-3; -78,4; -92,2; -105,-1; -118,6; -132,3; -145,-2; -158,5; -172,1; -185,-3; -180,-6; -165,-2; -150,3; -135,-1; -120,4; -105,2; -90,-3; -75,5; -60,1; -45,-2; -30,4; -15,2; -5,-1; 0,0"
                        dur="28s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="r"
                        values="3; 3.8; 2.8; 3.5; 3.2; 3.9; 2.5; 3.6; 3"
                        dur="14s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.95; 0.6; 1; 0.7; 0.95; 0.5; 0.8; 0.9; 0.95"
                        dur="16s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    
                    {/* Fish 3 - Purple - Figure-8 swimming */}
                    <circle cx="100" cy="10" r="3.2" fill="#8b5cf6" className="drop-shadow-lg" opacity="1">
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0,0; 5,8; 12,15; 20,20; 30,22; 40,20; 50,15; 58,8; 65,0; 70,-8; 75,-15; 78,-20; 75,-25; 70,-28; 60,-30; 50,-28; 40,-25; 30,-20; 20,-15; 12,-8; 5,0; 0,5; -5,10; -12,15; -20,18; -30,20; -40,18; -50,15; -58,10; -65,5; -70,0; -75,-5; -78,-10; -75,-15; -70,-18; -60,-20; -50,-18; -40,-15; -30,-10; -20,-5; -12,0; -5,5; 0,0"
                        dur="32s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="r"
                        values="3.2; 2.8; 4; 3.5; 3.8; 3; 4.2; 3.4; 3.2"
                        dur="18s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="1; 0.7; 1; 0.6; 0.9; 0.8; 1; 0.5; 0.8; 1"
                        dur="20s"
                        repeatCount="indefinite"
                      />
                    </circle>

                    {/* Fish 4 - Green - Gentle weaving */}
                    <circle cx="60" cy="35" r="2.2" fill="#22c55e" className="drop-shadow-md" opacity="0.9">
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0,0; 8,-4; 18,-6; 28,-4; 38,0; 48,4; 58,6; 68,4; 78,0; 88,-4; 98,-6; 108,-4; 118,0; 128,4; 138,6; 148,4; 158,0; 148,-4; 138,-8; 128,-6; 118,-2; 108,2; 98,6; 88,8; 78,6; 68,2; 58,-2; 48,-6; 38,-8; 28,-6; 18,-2; 8,2; 0,0"
                        dur="30s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="r"
                        values="2.2; 2.8; 2.4; 3; 2.6; 2.9; 2.3; 2.7; 2.2"
                        dur="16s"
                        repeatCount="indefinite"
                      />
                    </circle>

                    {/* Fish 5 - Indigo - Circular swimming */}
                    <circle cx="140" cy="25" r="2.5" fill="#4f46e5" className="drop-shadow-md" opacity="0.9">
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0,0; 6,6; 10,12; 12,18; 10,24; 6,30; 0,34; -6,30; -10,24; -12,18; -10,12; -6,6; 0,0"
                        dur="22s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="r"
                        values="2.5; 2; 3; 2.7; 3.2; 2.3; 2.8; 2.5"
                        dur="13s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    
                    {/* Small fish - Cyan - Quick darting */}
                    <circle cx="45" cy="50" r="1.8" fill="#06b6d4" className="drop-shadow-sm" opacity="0.8">
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0,0; 12,-8; 25,-12; 38,-8; 52,-4; 65,0; 78,4; 92,8; 105,4; 118,0; 132,-4; 145,-8; 158,-4; 172,0; 158,4; 145,8; 132,4; 118,0; 105,-4; 92,-8; 78,-4; 65,0; 52,4; 38,8; 25,4; 12,0; 0,0"
                        dur="35s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="r"
                        values="1.8; 2.3; 1.5; 2.1; 1.8"
                        dur="11s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </svg>
                  
                  {/* Only subtle pulse rings - no background highlighting */}
                  <div className="absolute inset-0 rounded-lg border border-blue-400/10 opacity-0 group-hover:opacity-20 animate-ping-slow"></div>
                  <div className="absolute inset-0 rounded-lg border border-indigo-400/8 opacity-0 group-hover:opacity-15 animate-ping-slower"></div>
                </span>
              </h1>
              <h2 className="text-2xl font-semibold text-gray-700/90 dark:text-gray-300/90 tracking-wide">
                Federal Contracting Intelligence Platform
              </h2>
            </div>
          </div>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-3xl mx-auto">
          We make government contracting simple. Find federal contracts, understand spending data, and learn how to win government business - all in one easy-to-use platform designed for small business owners.
        </p>
        
        {/* Value Propositions - Smaller */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center group hover:scale-105 transition-transform duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 shadow-soft hover:shadow-glow">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-glow group-hover:rotate-3 transition-all duration-300">
              <Search className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">Comprehensive Aggregation</h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs">
              All federal and state contracts in one unified platform
            </p>
          </div>
          <div className="text-center group hover:scale-105 transition-transform duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 shadow-soft hover:shadow-glow-purple">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-glow-purple group-hover:rotate-3 transition-all duration-300">
              <TrendingUp className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">Data Insights</h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs">
              Complex government data transformed into digestible insights
            </p>
          </div>
          <div className="text-center group hover:scale-105 transition-transform duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 shadow-soft hover:shadow-glow-green">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-glow-green group-hover:rotate-3 transition-all duration-300">
              <Users className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">Public Access</h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs">
              Democratizing access to government procurement intelligence
            </p>
          </div>
        </div>

        {/* Platform Tools Section - Moved Up with GovChime Style */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 dark:from-cyan-300 dark:via-blue-400 dark:to-emerald-300 bg-clip-text text-transparent animate-shimmer bg-size-200 bg-pos-0 mb-4">
              Platform Tools
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Comprehensive suite of tools for government contracting intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {tools.map((tool) => {
              const Icon = tool.icon;
              const isActive = tool.status === 'active';
              
              return (
                <div
                  key={tool.title}
                  className={`group relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 transition-all duration-500 hover:border-gray-300 dark:hover:border-gray-600 ${
                    isActive 
                      ? 'hover:shadow-elevated hover:-translate-y-2 cursor-pointer shadow-soft' 
                      : 'opacity-75 cursor-not-allowed shadow-subtle'
                  }`}
                >
                  {/* Subtle glow effect */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  )}
                  
                  <Link 
                    to={isActive ? tool.link : '#'} 
                    className={`block ${!isActive && 'pointer-events-none'}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-3 ${
                        isActive 
                          ? 'bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 group-hover:from-blue-100 group-hover:to-purple-100 dark:group-hover:from-blue-900/30 dark:group-hover:to-purple-900/30' 
                          : 'bg-gray-100 dark:bg-gray-700'
                      }`}>
                        <Icon className={`w-6 h-6 transition-all duration-500 ${
                          isActive 
                            ? 'text-blue-600 dark:text-blue-400 group-hover:text-purple-600 dark:group-hover:text-purple-400' 
                            : 'text-gray-400 dark:text-gray-500'
                        }`} />
                      </div>
                      {tool.status === 'coming-soon' && (
                        <span className="px-2 py-1 text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 rounded-full animate-pulse-slow">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    
                    <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                      isActive 
                        ? 'text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {tool.title}
                    </h3>
                    
                    <p className={`text-sm mb-4 transition-colors duration-300 ${
                      isActive 
                        ? 'text-gray-600 dark:text-gray-400' 
                        : 'text-gray-400 dark:text-gray-500'
                    }`}>
                      {tool.description}
                    </p>
                    
                    <div className={`text-xs font-medium transition-colors duration-300 ${
                      isActive 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-gray-400 dark:text-gray-500'
                    }`}>
                      {tool.preview}
                    </div>
                    
                    {isActive && (
                      <div className="mt-4 flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Explore Tool
                        <ArrowRight className="w-4 h-4 ml-1 transform group-hover:rotate-45 group-hover:scale-110 group-hover:text-orange-500 transition-all duration-300" />
                      </div>
                    )}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Activity Preview */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 shadow-elevated hover:shadow-glow transition-all duration-500 group">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">Recent Contract Activity</h2>
            <Link
              to="/chatter"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center transition-all duration-300 hover:scale-105 group"
            >
              View All
              <ArrowRight className="w-4 h-4 ml-1 transform group-hover:rotate-45 group-hover:scale-110 group-hover:text-orange-500 transition-all duration-300" />
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600 dark:text-blue-400" />
            </div>
          ) : (
            <div className="space-y-4">
              {contracts.slice(0, 3).map((contract) => (
                <div 
                  key={contract.id} 
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-102 shadow-subtle hover:shadow-soft"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                      {contract.description.length > 60 
                        ? `${contract.description.substring(0, 60)}...` 
                        : contract.description}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>{contract.agency}</span>
                      <span>•</span>
                      <span>{formatCurrency(contract.amount)}</span>
                      {contract.setAside && (
                        <>
                          <span>•</span>
                          <span className="text-purple-600 dark:text-purple-400 font-medium">{contract.setAside}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-500 hover:text-orange-500 hover:rotate-45 hover:scale-110 transition-all duration-300" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;