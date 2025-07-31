import React, { useState } from 'react';
import { SetAsideData } from '../../types';
import { useClickTracking } from '../../hooks/useClickTracking';
import { 
  TrendingUp, 
  Users, 
  Award, 
  DollarSign, 
  Calendar, 
  ArrowUp, 
  ArrowDown, 
  X, 
  Info, 
  ExternalLink,
  Shield,
  Flag,
  MapPin,
  Building,
  Star,
  UserCheck
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface SetAsideIntelligenceProps {
  setAsideData: SetAsideData[];
}

const SetAsideIntelligence: React.FC<SetAsideIntelligenceProps> = ({ setAsideData }) => {
  const [showModal, setShowModal] = useState<string | null>(null);
  const { trackExternalClick } = useClickTracking();

  // Function to get relevant icons for each set-aside type
  const getSetAsideIcon = (type: string) => {
    switch (type.toUpperCase()) {
      case 'WOSB':
      case 'EDWOSB':
        return { icon: UserCheck, color: 'text-pink-500', bgColor: 'bg-pink-100 dark:bg-pink-900/30' };
      case 'SDVOSB':
      case 'VOSB':
        return { icon: Flag, color: 'text-red-500', bgColor: 'bg-red-100 dark:bg-red-900/30' };
      case '8(A)':
      case 'SDB':
        return { icon: Shield, color: 'text-blue-500', bgColor: 'bg-blue-100 dark:bg-blue-900/30' };
      case 'HUBZONE':
        return { icon: MapPin, color: 'text-green-500', bgColor: 'bg-green-100 dark:bg-green-900/30' };
      case 'ABILITYONE':
        return { icon: Star, color: 'text-purple-500', bgColor: 'bg-purple-100 dark:bg-purple-900/30' };
      default:
        return { icon: Building, color: 'text-gray-500', bgColor: 'bg-gray-100 dark:bg-gray-900/30' };
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const CustomBarTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/95 dark:bg-gray-800/95 backdrop-blur-sm p-3 border border-gray-600 rounded-lg shadow-xl">
          <h3 className="font-semibold text-white mb-2">{label}</h3>
          <div className="space-y-1 text-sm">
            <p className="text-gray-200">
              <span className="font-medium">Total Value:</span> {formatCurrency(payload[0].value)}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomLineTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/95 dark:bg-gray-800/95 backdrop-blur-sm p-3 border border-gray-600 rounded-lg shadow-xl">
          <h3 className="font-semibold text-white mb-2">{label}</h3>
          <div className="space-y-1 text-sm">
            {payload.map((entry: any, index: number) => (
              <p key={index} className="text-gray-200">
                <span className="font-medium" style={{ color: entry.color }}>{entry.dataKey}:</span> {entry.value}
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const programDescriptions = {
    'WOSB': {
      description: 'Women-Owned Small Business program helps women entrepreneurs access federal contracting opportunities.',
      samGovUrl: 'https://sam.gov/search/?index=opp&is_active=true&page=1&sort=-modifiedDate&set_aside_codes[]=WOSB',
      sbaUrl: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/women-owned-small-business-federal-contracting-program'
    },
    'SDVOSB': {
      description: 'Service-Disabled Veteran-Owned Small Business program supports veteran entrepreneurs.',
      samGovUrl: 'https://sam.gov/search/?index=opp&is_active=true&page=1&sort=-modifiedDate&set_aside_codes[]=SDVOSBC',
      sbaUrl: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/service-disabled-veteran-owned-small-businesses-program'
    },
    '8(a)': {
      description: 'SBA 8(a) Business Development program assists socially and economically disadvantaged entrepreneurs.',
      samGovUrl: 'https://sam.gov/search/?index=opp&is_active=true&page=1&sort=-modifiedDate&set_aside_codes[]=8A',
      sbaUrl: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/8a-business-development-program'
    },
    'HubZone': {
      description: 'Historically Underutilized Business Zone program encourages economic development in distressed areas.',
      samGovUrl: 'https://sam.gov/search/?index=opp&is_active=true&page=1&sort=-modifiedDate&set_aside_codes[]=HZC',
      sbaUrl: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/hubzone-program'
    },
    'SDB': {
      description: 'Small Disadvantaged Business program provides contracting opportunities to small businesses owned by socially and economically disadvantaged individuals.',
      samGovUrl: 'https://sam.gov/search/?index=opp&is_active=true&page=1&sort=-modifiedDate&set_aside_codes[]=SBA',
      sbaUrl: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/small-disadvantaged-business'
    },
    'VOSB': {
      description: 'Veteran-Owned Small Business program provides contracting opportunities for veteran entrepreneurs.',
      samGovUrl: 'https://sam.gov/search/?index=opp&is_active=true&page=1&sort=-modifiedDate&set_aside_codes[]=VOSB',
      sbaUrl: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/veteran-contracting-assistance-programs'
    },
    'EDWOSB': {
      description: 'Economically Disadvantaged Women-Owned Small Business program for women-owned businesses that meet economic disadvantage criteria.',
      samGovUrl: 'https://sam.gov/search/?index=opp&is_active=true&page=1&sort=-modifiedDate&set_aside_codes[]=EDWOSB',
      sbaUrl: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/women-owned-small-business-federal-contracting-program'
    },
    'AbilityOne': {
      description: 'AbilityOne Program creates employment opportunities for people who are blind or have significant disabilities.',
      samGovUrl: 'https://sam.gov/search/?index=opp&is_active=true&page=1&sort=-modifiedDate&keywords=AbilityOne',
      sbaUrl: 'https://www.abilityone.gov/'
    },
    'HBCU': {
      description: 'Historically Black Colleges and Universities program supports educational institutions in federal contracting.',
      samGovUrl: 'https://sam.gov/search/?index=opp&is_active=true&page=1&sort=-modifiedDate&keywords=HBCU',
      sbaUrl: 'https://www.sba.gov/offices/headquarters/obd/resources/14200'
    },
    'MSI': {
      description: 'Minority Serving Institutions program supports educational institutions that serve minority populations.',
      samGovUrl: 'https://sam.gov/search/?index=opp&is_active=true&page=1&sort=-modifiedDate&keywords=minority+serving+institution',
      sbaUrl: 'https://www.sba.gov/offices/headquarters/obd/resources/14200'
    },
    'WOSB-EDWOSB': {
      description: 'Combined Women-Owned Small Business and Economically Disadvantaged WOSB opportunities.',
      samGovUrl: 'https://sam.gov/search/?index=opp&is_active=true&page=1&sort=-modifiedDate&set_aside_codes[]=WOSB&set_aside_codes[]=EDWOSB',
      sbaUrl: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/women-owned-small-business-federal-contracting-program'
    },
    'SBA-Certified': {
      description: 'SBA Certified Small Business encompasses various SBA certification programs for small businesses.',
      samGovUrl: 'https://sam.gov/search/?index=opp&is_active=true&page=1&sort=-modifiedDate&keywords=small+business',
      sbaUrl: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs'
    },
    'Tribal': {
      description: 'Indian Small Business Economic Enterprise program supports Native American-owned businesses.',
      samGovUrl: 'https://sam.gov/search/?index=opp&is_active=true&page=1&sort=-modifiedDate&keywords=tribal',
      sbaUrl: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs'
    },
    'Alaska Native': {
      description: 'Alaska Native Corporation program provides contracting opportunities for Alaska Native-owned businesses.',
      samGovUrl: 'https://sam.gov/search/?index=opp&is_active=true&page=1&sort=-modifiedDate&keywords=alaska+native',
      sbaUrl: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs'
    },
    'Native Hawaiian': {
      description: 'Native Hawaiian Organization program supports Native Hawaiian-owned businesses in federal contracting.',
      samGovUrl: 'https://sam.gov/search/?index=opp&is_active=true&page=1&sort=-modifiedDate&keywords=native+hawaiian',
      sbaUrl: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs'
    }
  };

  const totalValue = setAsideData.reduce((sum, item) => sum + item.totalValue, 0);
  const totalContracts = setAsideData.reduce((sum, item) => sum + item.contractCount, 0);
  const avgGrowthRate = setAsideData.reduce((sum, item) => sum + item.growthRate, 0) / setAsideData.length;

  // Mock historical data for trend chart
  const historicalData = [
    { month: 'Jan', WOSB: 32, SDVOSB: 28, '8(a)': 45, HubZone: 18, SDB: 52 },
    { month: 'Feb', WOSB: 35, SDVOSB: 31, '8(a)': 48, HubZone: 20, SDB: 55 },
    { month: 'Mar', WOSB: 38, SDVOSB: 33, '8(a)': 52, HubZone: 22, SDB: 58 },
    { month: 'Apr', WOSB: 41, SDVOSB: 35, '8(a)': 49, HubZone: 24, SDB: 61 },
    { month: 'May', WOSB: 43, SDVOSB: 37, '8(a)': 53, HubZone: 26, SDB: 59 },
    { month: 'Jun', WOSB: 45, SDVOSB: 38, '8(a)': 56, HubZone: 28, SDB: 63 },
  ];

  const handleStatClick = (statType: string) => {
    setShowModal(statType);
  };

  const closeModal = () => {
    setShowModal(null);
  };

  const renderModal = () => {
    if (!showModal) return null;

    const modalContent = {
      'total-value': {
        title: 'Total Set-Aside Value Breakdown',
        content: (
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              This represents the combined value of all set-aside contracts across all programs in the current fiscal year.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {setAsideData.map((program) => (
                <div key={program.type} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{program.type}</h4>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {formatCurrency(program.totalValue)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {((program.totalValue / totalValue) * 100).toFixed(1)}% of total
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <Info className="w-4 h-4 inline mr-1" />
                Data sourced from SAM.gov and USASpending.gov for comprehensive coverage
              </p>
            </div>
          </div>
        )
      },
      'total-contracts': {
        title: 'Total Contracts Analysis',
        content: (
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              Total number of set-aside contracts awarded across all programs.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 dark:text-green-300">Active Contracts</h4>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {Math.floor(totalContracts * 0.85).toLocaleString()}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400">85% of total</p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-300">Completed</h4>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {Math.floor(totalContracts * 0.15).toLocaleString()}
                </p>
                <p className="text-sm text-yellow-600 dark:text-yellow-400">15% of total</p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">Contracts by Program</h4>
              {setAsideData.map((program) => (
                <div key={program.type} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                  <span className="text-gray-700 dark:text-gray-300">{program.type}</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {program.contractCount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )
      },
      'avg-growth': {
        title: 'Average Growth Rate Analysis',
        content: (
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              Year-over-year growth rate across all set-aside programs shows healthy expansion.
            </p>
            <div className="grid grid-cols-1 gap-3">
              {setAsideData.map((program) => (
                <div key={program.type} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900 dark:text-white">{program.type}</span>
                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                      {program.description.split(' ').slice(0, 3).join(' ')}...
                    </span>
                  </div>
                  <div className={`flex items-center px-2 py-1 rounded-full text-sm font-medium ${
                    program.growthRate > 15 ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' :
                    program.growthRate > 10 ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400' :
                    'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                  }`}>
                    {program.growthRate > 0 ? (
                      <ArrowUp className="w-3 h-3 mr-1" />
                    ) : (
                      <ArrowDown className="w-3 h-3 mr-1" />
                    )}
                    {program.growthRate}%
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-sm text-green-800 dark:text-green-300">
                <TrendingUp className="w-4 h-4 inline mr-1" />
                Overall positive trend indicates expanding opportunities for small businesses
              </p>
            </div>
          </div>
        )
      },
      'program-types': {
        title: 'Set-Aside Program Types',
        content: (
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              Federal set-aside programs designed to increase contracting opportunities for small businesses.
            </p>
            <div className="space-y-4">
              {setAsideData.map((program) => (
                <div key={program.type} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-lg">{program.type}</h4>
                    <div className="flex items-center space-x-2">
                      <a
                        href={programDescriptions[program.type].samGovUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackExternalClick(
                          programDescriptions[program.type].samGovUrl,
                          `${program.type} opportunities from modal`,
                          1
                        )}
                        className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                        title="View opportunities on SAM.gov"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <a
                        href={programDescriptions[program.type].sbaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackExternalClick(
                          programDescriptions[program.type].sbaUrl,
                          `${program.type} program info from modal`,
                          1
                        )}
                        className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                        title="Program information on SBA.gov"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    {programDescriptions[program.type].description}
                  </p>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Total Value</p>
                      <p className="font-semibold text-purple-600 dark:text-purple-400">
                        {formatCurrency(program.totalValue)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Contracts</p>
                      <p className="font-semibold text-blue-600 dark:text-blue-400">
                        {program.contractCount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Growth</p>
                      <p className={`font-semibold ${
                        program.growthRate > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        {program.growthRate > 0 ? '+' : ''}{program.growthRate}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      }
    };

    const content = modalContent[showModal as keyof typeof modalContent];
    if (!content) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-3d-hover dark:shadow-dark-3d-hover max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{content.title}</h2>
            <button
              onClick={closeModal}
              className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-6">
            {content.content}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-200">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Set-Aside Intelligence Center</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Discover small business contracting opportunities and trends</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div 
          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-3d dark:shadow-dark-3d hover:shadow-3d-hover dark:hover:shadow-dark-3d-hover transition-all duration-200 cursor-pointer transform hover:scale-105"
          onClick={() => handleStatClick('total-value')}
        >
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg shadow-3d dark:shadow-dark-3d">
              <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Set-Aside Value</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(totalValue)}</p>
            </div>
          </div>
        </div>

        <div 
          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-3d dark:shadow-dark-3d hover:shadow-3d-hover dark:hover:shadow-dark-3d-hover transition-all duration-200 cursor-pointer transform hover:scale-105"
          onClick={() => handleStatClick('total-contracts')}
        >
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg shadow-3d dark:shadow-dark-3d">
              <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Contracts</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalContracts.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div 
          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-3d dark:shadow-dark-3d hover:shadow-3d-hover dark:hover:shadow-dark-3d-hover transition-all duration-200 cursor-pointer transform hover:scale-105"
          onClick={() => handleStatClick('avg-growth')}
        >
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg shadow-3d dark:shadow-dark-3d">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Growth Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{avgGrowthRate.toFixed(1)}%</p>
            </div>
          </div>
        </div>

        <div 
          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-3d dark:shadow-dark-3d hover:shadow-3d-hover dark:hover:shadow-dark-3d-hover transition-all duration-200 cursor-pointer transform hover:scale-105"
          onClick={() => handleStatClick('program-types')}
        >
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg shadow-3d dark:shadow-dark-3d">
              <Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Program Types</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{setAsideData.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Program Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {setAsideData.map((program) => {
          const iconData = getSetAsideIcon(program.type);
          const IconComponent = iconData.icon;
          
          return (
            <div key={program.type} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-3d dark:shadow-dark-3d hover:shadow-3d-hover dark:hover:shadow-dark-3d-hover transition-all duration-200 group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  {/* Set-Aside Icon */}
                  <div className={`p-2 ${iconData.bgColor} rounded-lg shadow-3d dark:shadow-dark-3d transition-all duration-300`}>
                    <IconComponent className={`w-5 h-5 ${iconData.color} transition-colors duration-300`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                      {program.type}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{programDescriptions[program.type].description}</p>
                  </div>
                </div>
                
                {/* Growth Rate with Hover Info */}
                <div className="relative group/percentage">
                  <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium cursor-help ${
                    program.growthRate > 15 ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' :
                    program.growthRate > 10 ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400' :
                    'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                  }`}>
                    {program.growthRate > 0 ? (
                      <ArrowUp className="w-3 h-3 mr-1" />
                    ) : (
                      <ArrowDown className="w-3 h-3 mr-1" />
                    )}
                    {program.growthRate}%
                  </div>
                  
                  {/* Hover Info Tooltip */}
                  <div className="absolute -top-12 right-0 bg-gray-900 dark:bg-gray-700 text-white text-xs px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover/percentage:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                    Year-over-year growth rate
                    <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="group/value">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Value</p>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 group-hover/value:text-green-600 dark:group-hover/value:text-green-400 transition-colors duration-300">
                    {formatCurrency(program.totalValue)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Contracts</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{program.contractCount.toLocaleString()}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 space-y-2">
                <a
                  href={programDescriptions[program.type].samGovUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackExternalClick(
                    programDescriptions[program.type].samGovUrl,
                    `${program.type} set-aside opportunities`,
                    1
                  )}
                  className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium text-sm transition-colors duration-200 hover:underline"
                >
                  <ExternalLink size={14} className="mr-2" />
                  View Opportunities on SAM.gov
                </a>
                <br />
                <a
                  href={programDescriptions[program.type].sbaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackExternalClick(
                    programDescriptions[program.type].sbaUrl,
                    `${program.type} program information`,
                    1
                  )}
                  className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium text-sm transition-colors duration-200 hover:underline"
                >
                  <ExternalLink size={14} className="mr-2" />
                  Program Information (SBA)
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart - Program Comparison */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-3d dark:shadow-dark-3d">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Program Value Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={setAsideData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip content={<CustomBarTooltip />} />
              <Bar dataKey="totalValue" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart - Historical Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-3d dark:shadow-dark-3d">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">6-Month Award Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomLineTooltip />} />
              <Line type="monotone" dataKey="WOSB" stroke="#EC4899" strokeWidth={2} />
              <Line type="monotone" dataKey="SDVOSB" stroke="#3B82F6" strokeWidth={2} />
              <Line type="monotone" dataKey="8(a)" stroke="#10B981" strokeWidth={2} />
              <Line type="monotone" dataKey="HubZone" stroke="#F59E0B" strokeWidth={2} />
              <Line type="monotone" dataKey="SDB" stroke="#8B5CF6" strokeWidth={2} />
              <Line type="monotone" dataKey="VOSB" stroke="#EF4444" strokeWidth={2} />
              <Line type="monotone" dataKey="EDWOSB" stroke="#EC4899" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-6 shadow-3d dark:shadow-dark-3d">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Get Started with Set-Aside Programs</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="https://www.sba.gov/federal-contracting/contracting-assistance-programs"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackExternalClick(
              'https://www.sba.gov/federal-contracting/contracting-assistance-programs',
              'set-aside program eligibility',
              1
            )}
            className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-3d dark:shadow-dark-3d hover:shadow-3d-hover dark:hover:shadow-dark-3d-hover transition-all duration-200"
          >
            <Users className="w-8 h-8 text-purple-600 dark:text-purple-400 mr-3" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Program Eligibility</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Check your eligibility for set-aside programs</p>
            </div>
          </a>
          <a
            href="https://sam.gov/content/opportunities"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackExternalClick(
              'https://sam.gov/content/opportunities',
              'upcoming set-aside opportunities',
              2
            )}
            className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-3d dark:shadow-dark-3d hover:shadow-3d-hover dark:hover:shadow-dark-3d-hover transition-all duration-200"
          >
            <Calendar className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Upcoming Opportunities</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Browse upcoming set-aside contracts</p>
            </div>
          </a>
          <a
            href="https://www.usaspending.gov/search"
            target="_blank"
            rel="noopener noreferrer"
           onClick={() => trackExternalClick(
             'https://www.usaspending.gov/search',
             'market intelligence trends',
             3
           )}
            className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-3d dark:shadow-dark-3d hover:shadow-3d-hover dark:hover:shadow-dark-3d-hover transition-all duration-200"
          >
            <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400 mr-3" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Market Intelligence</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Analyze market trends and competition</p>
            </div>
          </a>
        </div>
      </div>

      {/* Modal */}
      {renderModal()}
    </div>
  );
};

export default SetAsideIntelligence;