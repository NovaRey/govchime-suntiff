import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SpendingData } from '../../types';
import { mockNAICSSpendingData, mockSpendingData2024 } from '../../data/mockData';
import DataSourceBadge from '../common/DataSourceBadge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';
import { 
  TrendingUp, 
  ChevronDown,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  DollarSign,
  FileText,
  Building2,
  MapPin,
  X,
  Crown,
  ChevronUp,
  Sparkles,
  Shield,
  Flag,
  Star,
  Info,
  Cpu,
  Heart,
  Truck,
  ArrowUpRight,
  Medal,
  Award
} from 'lucide-react';

interface SpendingAnalysisProps {
  spendingData: SpendingData[];
}

type ChartView = 'states-2025' | 'states-2024' | 'naics-top10' | 'naics-top50';
type ChartType = 'bar' | 'pie';

const SpendingAnalysis: React.FC<SpendingAnalysisProps> = ({ spendingData = [] }) => {
  // Debug: Log when component renders
  console.log('SpendingAnalysis rendering with data:', spendingData?.length || 0, 'items');
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedView, setSelectedView] = useState<ChartView>('states-2025');
  const [chartType, setChartType] = useState<ChartType>('bar');
  const [showProModal, setShowProModal] = useState<boolean>(false);
  const [showCustomReportModal, setShowCustomReportModal] = useState<boolean>(false);
  const [naicsDetailsExpanded, setNaicsDetailsExpanded] = useState<boolean>(true);
  const [infoModal, setInfoModal] = useState<{
    visible: boolean;
    data: any;
    position: { x: number; y: number };
  }>({ visible: false, data: null, position: { x: 0, y: 0 } });
  const [naicsModal, setNaicsModal] = useState<{
    visible: boolean;
    data: any;
  }>({ visible: false, data: null });
  const [setAsideModal, setSetAsideModal] = useState<{
    visible: boolean;
    data: any;
  }>({ visible: false, data: null });
  const [showYoYChart, setShowYoYChart] = useState<boolean>(false);
  const [showTotalSpendingData, setShowTotalSpendingData] = useState<boolean>(false);

  // Mock YoY Growth Data (Fixed and enhanced)
  const mockYoYGrowthData = [
    { month: 'Jan', current: 125.2, previous: 98.1, label: 'January 2025' },
    { month: 'Feb', current: 142.8, previous: 122.3, label: 'February 2025' },
    { month: 'Mar', current: 138.6, previous: 131.7, label: 'March 2025' },
    { month: 'Apr', current: 161.4, previous: 148.9, label: 'April 2025' },
    { month: 'May', current: 158.9, previous: 152.1, label: 'May 2025' },
    { month: 'Jun', current: 167.3, previous: 154.8, label: 'June 2025' },
    { month: 'Jul', current: 172.5, previous: 158.2, label: 'July 2025' },
    { month: 'Aug', current: 169.8, previous: 161.4, label: 'August 2025' },
    { month: 'Sep', current: 175.2, previous: 163.9, label: 'September 2025' },
    { month: 'Oct', current: 178.6, previous: 165.7, label: 'October 2025' },
    { month: 'Nov', current: 181.3, previous: 167.2, label: 'November 2025' },
    { month: 'Dec', current: 184.7, previous: 169.8, label: 'December 2025' }
  ];

  // Mock Total Spending Breakdown Data
  const mockTotalSpendingData = [
    { category: 'Defense', amount: 423.7, percentage: 32.1, change: '+8.3%' },
    { category: 'Health & Human Services', amount: 298.4, percentage: 22.6, change: '+12.7%' },
    { category: 'Homeland Security', amount: 187.9, percentage: 14.2, change: '+6.8%' },
    { category: 'Energy', amount: 156.3, percentage: 11.8, change: '+15.2%' },
    { category: 'Veterans Affairs', amount: 124.8, percentage: 9.5, change: '+9.4%' },
    { category: 'Transportation', amount: 89.2, percentage: 6.8, change: '+4.1%' },
    { category: 'Other Agencies', amount: 39.7, percentage: 3.0, change: '+2.8%' }
  ];

  // Early return if no data
  if (!spendingData || spendingData.length === 0) {
    console.log('SpendingAnalysis: No data provided, showing loading state');
    return (
      <div className="space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-200">
        <div className="p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Spending Analysis</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-4">No spending data available</p>
          <div className="mt-4 p-4 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
            <p className="text-yellow-800 dark:text-yellow-200">
              Debug: spendingData is {spendingData ? `empty (length: ${spendingData.length})` : 'null/undefined'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Handle URL parameters for state selection
  useEffect(() => {
    const stateParam = searchParams.get('state');
    const viewParam = searchParams.get('view');
    
    if (stateParam && viewParam) {
      setSelectedView(viewParam as ChartView);
      // Auto-scroll to the chart section
      setTimeout(() => {
        const chartElement = document.getElementById('spending-charts');
        if (chartElement) {
          chartElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [searchParams]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (infoModal.visible) {
          setInfoModal({ visible: false, data: null, position: { x: 0, y: 0 } });
        }
        if (naicsModal.visible) {
          setNaicsModal({ visible: false, data: null });
        }
        if (setAsideModal.visible) {
          setSetAsideModal({ visible: false, data: null });
        }
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [infoModal.visible, naicsModal.visible, setAsideModal.visible]);

  // NAICS Code detailed information
  const naicsDetails = {
    '541511': {
      title: 'Custom Computer Programming Services',
      description: 'Writing, modifying, testing, and supporting software to meet specific customer needs.',
      icon: Cpu,
      color: 'bg-blue-500',
      examples: ['Software development', 'Custom application programming', 'Web application development', 'Mobile app development'],
      commonAgencies: ['Department of Defense', 'Department of Homeland Security', 'GSA'],
      averageContract: '$2.8B annually',
      requirements: 'Security clearances often required, especially for defense contracts.',
      opportunities: 'High demand for cloud migration, cybersecurity, and AI/ML solutions.'
    },
    '541512': {
      title: 'Computer Systems Design Services',
      description: 'Planning and designing computer systems that integrate hardware, software, and communications.',
      icon: Cpu,
      color: 'bg-indigo-500',
      examples: ['Systems integration', 'Network design', 'IT consulting', 'Enterprise architecture'],
      commonAgencies: ['Department of Defense', 'CIA', 'Department of Veterans Affairs'],
      averageContract: '$2.2B annually',
      requirements: 'Often requires proven experience with large-scale systems and federal compliance.',
      opportunities: 'Growing need for legacy system modernization and cloud infrastructure.'
    },
    '561210': {
      title: 'Facilities Support Services',
      description: 'Providing operating staff to perform a combination of support services within a facility.',
      icon: Building2,
      color: 'bg-green-500',
      examples: ['Facility management', 'Building maintenance', 'Grounds keeping', 'Security services'],
      commonAgencies: ['GSA', 'Department of Veterans Affairs', 'Department of Defense'],
      averageContract: '$1.8B annually',
      requirements: 'Bonding and insurance requirements, background checks for personnel.',
      opportunities: 'Steady demand for federal building maintenance and support services.'
    },
    '237310': {
      title: 'Highway, Street, and Bridge Construction',
      description: 'Construction of highways, streets, roads, bridges, and related infrastructure.',
      icon: Truck,
      color: 'bg-orange-500',
      examples: ['Road construction', 'Bridge building', 'Highway maintenance', 'Infrastructure repair'],
      commonAgencies: ['Department of Transportation', 'Army Corps of Engineers', 'GSA'],
      averageContract: '$1.5B annually',
      requirements: 'Heavy equipment, bonding, and specialized construction certifications.',
      opportunities: 'Infrastructure Investment and Jobs Act creating significant opportunities.'
    },
    '621111': {
      title: 'Offices of Physicians (except Mental Health)',
      description: 'Medical practices providing primary care, specialty care, and outpatient services.',
      icon: Heart,
      color: 'bg-red-500',
      examples: ['Primary care', 'Specialty medical services', 'Outpatient clinics', 'Telemedicine'],
      commonAgencies: ['Department of Veterans Affairs', 'Department of Defense', 'Indian Health Service'],
      averageContract: '$900M annually',
      requirements: 'Medical licensing, HIPAA compliance, and often security clearances.',
      opportunities: 'Telehealth expansion and rural healthcare delivery programs.'
    }
  };

  // Set-aside detailed information with benefits and requirements
  const setAsideDetails = {
    'WOSB': {
      title: 'Women-Owned Small Business',
      fullName: 'Women-Owned Small Business Program',
      description: 'Federal contracting program designed to provide contracting opportunities for women-owned small businesses in industries where women are underrepresented.',
      icon: Flag,
      color: 'bg-pink-500',
      requirements: [
        'Business must be at least 51% owned by women',
        'Women must control day-to-day operations',
        'Annual receipts must not exceed SBA size standards',
        'Must be certified through SBA or approved third-party'
      ],
      benefits: [
        'Access to set-aside contracts in underrepresented industries',
        'Sole source awards up to $4 million for manufacturing, $7 million for all other industries',
        'Price evaluation preferences in certain competitions',
        'Networking and mentorship opportunities'
      ],
      industries: ['Professional services', 'Construction', 'Manufacturing', 'Technology'],
      totalValue: '$52M annually',
      growthRate: '+18.5%',
      contractCount: 145
    },
    'SDVOSB': {
      title: 'Service-Disabled Veteran-Owned Small Business',
      fullName: 'Service-Disabled Veteran-Owned Small Business Program',
      description: 'Program providing contracting opportunities for small businesses owned by veterans with service-connected disabilities.',
      icon: Medal,
      color: 'bg-cyan-400',
      requirements: [
        'Owned by veterans with service-connected disabilities',
        'Veteran must control day-to-day operations',
        'Must meet SBA small business size standards',
        'Veteran must have qualifying service-connected disability'
      ],
      benefits: [
        'Access to SDVOSB set-aside contracts',
        'Sole source awards up to $4 million for manufacturing, $7 million for other industries',
        'Government goal of 3% of all federal contracting dollars',
        'Priority in federal contracting opportunities'
      ],
      industries: ['Security services', 'IT services', 'Construction', 'Professional services'],
      totalValue: '$48M annually',
      growthRate: '+16.2%',
      contractCount: 128
    },
    '8(a)': {
      title: '8(a) Business Development',
      fullName: 'SBA 8(a) Business Development Program',
      description: 'Nine-year program designed to help socially and economically disadvantaged entrepreneurs gain access to the economic mainstream.',
      icon: Star,
      color: 'bg-purple-500',
      requirements: [
        'Business must be 51% owned by socially/economically disadvantaged individuals',
        'Owner must demonstrate potential for success',
        'Business must meet SBA size standards',
        'Must apply and be accepted into 9-year program'
      ],
      benefits: [
        'Access to 8(a) set-aside and sole source contracts',
        'Business development assistance and training',
        'Mentoring opportunities with established firms',
        'Government goal of 5% of all federal contracting dollars'
      ],
      industries: ['Professional services', 'Construction', 'Technology', 'Manufacturing'],
      totalValue: '$68M annually',
      growthRate: '+22.1%',
      contractCount: 189
    },
    'HubZone': {
      title: 'HUBZone',
      fullName: 'Historically Underutilized Business Zone Program',
      description: 'Program encouraging economic development in historically underutilized business zones through employment and capital investment.',
      icon: MapPin,
      color: 'bg-green-500',
      requirements: [
        'Business must be located in a designated HUBZone',
        'At least 35% of employees must reside in a HUBZone',
        'Must be a small business according to SBA standards',
        'Must be certified through SBA'
      ],
      benefits: [
        'Access to HUBZone set-aside contracts',
        'Sole source awards up to $4 million for manufacturing, $7 million for other industries',
        'Government goal of 3% of all federal contracting dollars',
        'Price evaluation preferences in full and open competitions'
      ],
      industries: ['Construction', 'Professional services', 'Manufacturing', 'Technology'],
      totalValue: '$35M annually',
      growthRate: '+12.8%',
      contractCount: 95
    },
    'SDB': {
      title: 'Small Disadvantaged Business',
      fullName: 'Small Disadvantaged Business Program',
      description: 'Program providing contracting opportunities for small businesses owned by socially and economically disadvantaged individuals.',
      icon: Shield,
      color: 'bg-indigo-500',
      requirements: [
        'Must be a small business according to SBA standards',
        'At least 51% owned by socially and economically disadvantaged individuals',
        'Disadvantaged individuals must control management and operations',
        'Must be certified through SBA'
      ],
      benefits: [
        'Price evaluation credits in certain competitions',
        'Access to SDB set-aside contracts',
        'Government goal of 5% of all federal contracting dollars',
        'Subcontracting opportunities with large prime contractors'
      ],
      industries: ['Professional services', 'Construction', 'Technology', 'Manufacturing'],
      totalValue: '$78M annually',
      growthRate: '+24.3%',
      contractCount: 225
    }
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

  const getChartData = () => {
    switch (selectedView) {
      case 'states-2025':
        return spendingData.slice(0, 15).map(state => ({
          name: state.state,
          value: state.totalSpending,
          contracts: state.contractCount,
          average: state.averageAward
        }));
      case 'states-2024':
        return mockSpendingData2024.slice(0, 15).map(state => ({
          name: state.state,
          value: state.totalSpending,
          contracts: state.contractCount,
          average: state.averageAward
        }));
      case 'naics-top10':
        return (mockNAICSSpendingData || []).slice(0, 10).map(naics => ({
          name: `${naics.code}`,
          fullName: naics.description,
          value: naics.totalSpending2025,
          contracts: naics.contractCount2025,
          growth: naics.growthRate
        }));
      case 'naics-top50':
        return (mockNAICSSpendingData || []).slice(0, 50).map(naics => ({
          name: `${naics.code}`,
          fullName: naics.description,
          value: naics.totalSpending2025,
          contracts: naics.contractCount2025,
          growth: naics.growthRate
        }));
      default:
        return [];
    }
  };

  const chartData = getChartData();

  // Colors for pie chart pieces
  const pieColors = [
    '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', 
    '#EC4899', '#8B5A2B', '#6B7280', '#84CC16', '#F97316',
    '#3B82F6', '#8B5CF6', '#14B8A6', '#F59E0B', '#EF4444'
  ];

  const getViewTitle = () => {
    switch (selectedView) {
      case 'states-2025': return 'Federal Spending by State (2025)';
      case 'states-2024': return 'Federal Spending by State (2024)';
      case 'naics-top10': return 'Top 10 NAICS Codes by Spending (2025)';
      case 'naics-top50': return 'Top 50 NAICS Codes by Spending (2025)';
      default: return 'Federal Spending Analysis';
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div 
          className="bg-gray-900/95 dark:bg-gray-800/95 p-3 border border-gray-600 rounded-lg shadow-xl backdrop-blur-sm"
          style={{ 
            backgroundColor: 'rgba(17, 24, 39, 0.95)', 
            border: '1px solid rgb(75, 85, 99)',
            borderRadius: '8px'
          }}
        >
          <h3 className="font-semibold text-white mb-2">
            {selectedView.includes('naics') ? `${label} - ${data.fullName}` : label}
          </h3>
          <div className="space-y-1 text-sm">
            <p className="text-gray-200">
              <span className="font-medium">Total Spending:</span> {formatCurrency(data.value)}
            </p>
            <p className="text-gray-200">
              <span className="font-medium">Contracts:</span> {data.contracts?.toLocaleString()}
            </p>
            {data.average && (
              <p className="text-gray-200">
                <span className="font-medium">Avg Award:</span> {formatCurrency(data.average)}
              </p>
            )}
            {data.growth && (
              <p className="text-gray-200">
                <span className="font-medium">Growth Rate:</span> {data.growth}%
              </p>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-900/90 dark:bg-gray-800/90 backdrop-blur-sm p-3 border border-gray-600 rounded-lg shadow-xl z-50">
          <h3 className="font-semibold text-white mb-2">
            {selectedView.includes('naics') ? `${data.name} - ${data.fullName}` : data.name}
          </h3>
          <div className="space-y-1 text-sm">
            <p className="text-gray-200">
              <span className="font-medium">Total Spending:</span> {formatCurrency(data.value)}
            </p>
            <p className="text-gray-200">
              <span className="font-medium">Contracts:</span> {data.contracts?.toLocaleString()}
            </p>
            {data.average && (
              <p className="text-gray-200">
                <span className="font-medium">Avg Award:</span> {formatCurrency(data.average)}
              </p>
            )}
            {data.growth && (
              <p className="text-gray-200">
                <span className="font-medium">Growth Rate:</span> {data.growth}%
              </p>
            )}
            <p className="text-gray-300 text-xs mt-2">
              {((data.value / chartData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}% of total
            </p>
            <p className="text-purple-400 text-xs mt-2 font-medium border-t border-gray-500 pt-2">
              💡 Click for detailed information
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  // Export functionality
  const handleExportPDF = () => {
    setShowProModal(true);
  };

  const handleCustomReport = () => {
    navigate('/signup');
  };

  const generateCustomReport = (location: string, contractingType: string) => {
    // This would generate a customized geographical report
    console.log(`Generating custom report for ${location} - ${contractingType}`);
    setShowCustomReportModal(false);
    // Implementation would include:
    // - Geographical analysis
    // - Neighboring states comparison
    // - Market opportunity assessment
  };

  const viewOptions = [
    { id: 'states-2025', label: '2025 State Spending', icon: MapPin },
    { id: 'states-2024', label: '2024 State Spending', icon: MapPin },
    { id: 'naics-top10', label: 'Top 10 NAICS Codes', icon: BarChart3 },
    { id: 'naics-top50', label: 'Top 50 NAICS Codes', icon: Activity },
  ];

  return (
    <div className="space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Spending Analysis</h1>
          <p className="text-gray-700 dark:text-gray-300 mt-1 flex items-center">
            Federal contract spending patterns and trends
            <DataSourceBadge source="USASpending.gov" className="ml-2" />
          </p>
        </div>
        <div className="relative group">
          <button 
            onClick={handleExportPDF}
            className="flex items-center px-4 py-2.5 bg-gradient-to-r from-slate-50/80 to-slate-100/80 dark:from-slate-800/80 dark:to-slate-900/80 border border-slate-200/50 dark:border-slate-700/50 text-white dark:text-white rounded-xl hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:text-white hover:border-transparent transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(255,165,0,0.3)] backdrop-blur-sm group font-medium"
          >
            <Crown className="w-4 h-4 mr-2 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300 drop-shadow-sm" />
            Export Pro Report
          </button>
          {/* Pro feature tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
            🚀 Pro Feature - Sign up for advanced analytics!
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div 
          onClick={() => {
            setSelectedView('states-2025');
            setShowTotalSpendingData(true);
          }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-3d dark:shadow-dark-3d hover:shadow-3d-hover dark:hover:shadow-dark-3d-hover snappy-card cursor-pointer group"
        >
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg shadow-3d dark:shadow-dark-3d group-hover:shadow-green-glow figma-button">
              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400 icon-hover" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 figma-button">Total 2025 Spending</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 figma-button">
                {formatCurrency(spendingData.reduce((sum, state) => sum + state.totalSpending, 0))}
              </p>
            </div>
          </div>
        </div>

        <div 
          onClick={() => navigate('/awards')}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-3d dark:shadow-dark-3d hover:shadow-3d-hover dark:hover:shadow-dark-3d-hover snappy-card cursor-pointer group"
        >
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg shadow-3d dark:shadow-dark-3d group-hover:shadow-blue-glow figma-button">
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400 icon-hover" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 figma-button">Active Contracts</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 figma-button">
                {spendingData.reduce((sum, state) => sum + state.contractCount, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div 
          onClick={() => setSelectedView('naics-top10')}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-3d dark:shadow-dark-3d hover:shadow-3d-hover dark:hover:shadow-dark-3d-hover snappy-card cursor-pointer group"
        >
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg shadow-3d dark:shadow-dark-3d group-hover:shadow-purple-glow figma-button">
              <Building2 className="w-6 h-6 text-purple-600 dark:text-purple-400 icon-hover" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 figma-button">Top NAICS Spending</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 figma-button">
                {formatCurrency((mockNAICSSpendingData && mockNAICSSpendingData[0]?.totalSpending2025) || 0)}
              </p>
            </div>
          </div>
        </div>

        <div 
          onClick={() => setShowYoYChart(!showYoYChart)}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-3d dark:shadow-dark-3d hover:shadow-3d-hover dark:hover:shadow-dark-3d-hover snappy-card cursor-pointer group"
        >
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg shadow-3d dark:shadow-dark-3d group-hover:shadow-orange-glow figma-button">
              <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400 icon-hover" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-orange-600 dark:group-hover:text-orange-400 figma-button">YoY Growth</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 figma-button">+8.7%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Chart Section */}
      <div id="spending-charts" className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-3d dark:shadow-dark-3d">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{getViewTitle()}</h2>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            {/* View Switcher */}
            <div className="flex flex-wrap gap-2">
              {viewOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.id}
                    onClick={() => setSelectedView(option.id as ChartView)}
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium figma-button shadow-3d dark:shadow-dark-3d hover:shadow-3d-hover dark:hover:shadow-dark-3d-hover ${
                      selectedView === option.id
                        ? 'bg-purple-600 dark:bg-purple-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {option.label}
                  </button>
                );
              })}
            </div>
            
            <div className="flex items-center gap-2">
              {/* Chart Type Switcher */}
              <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-700 p-1 rounded-lg border border-gray-200 dark:border-gray-600">
                <button
                  onClick={() => setChartType('bar')}
                  className={`p-2 rounded-md figma-button transition-all duration-200 ${
                    chartType === 'bar'
                      ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white dark:hover:bg-gray-600'
                  }`}
                  title="Bar Chart"
                >
                  <BarChart3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setChartType('pie')}
                  className={`p-2 rounded-md figma-button transition-all duration-200 ${
                    chartType === 'pie'
                      ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white dark:hover:bg-gray-600'
                  }`}
                  title="Pie Chart"
                >
                  <PieChartIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Custom Report Button - Enhanced Pro Style */}
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
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="h-96 mb-6">
          <style>{`
            @keyframes harmonious-wave {
              0%, 100% { transform: translateX(0px); }
              25% { transform: translateX(0.5px); }
              50% { transform: translateX(0px); }
              75% { transform: translateX(-0.5px); }
            }
            
            @keyframes fadeIn {
              from { 
                opacity: 0; 
                transform: translateY(20px) scale(0.95); 
              }
              to { 
                opacity: 1; 
                transform: translateY(0) scale(1); 
              }
            }
            
            @keyframes pieSliceIn {
              from { 
                opacity: 0; 
                transform: scale(0.8) rotate(-10deg); 
              }
              to { 
                opacity: 1; 
                transform: scale(1) rotate(0deg); 
              }
            }
            
            .animate-fade-in {
              animation: fadeIn 0.8s ease-out forwards;
            }
            
            .pie-slice {
              animation: pieSliceIn 1.2s ease-out forwards;
            }
            
            .bar-cell:hover {
              transform: scaleY(1.03) !important;
              opacity: 1 !important;
              transition: all 0.6s ease;
            }
            
            .bar-cell {
              transition: all 0.6s ease;
              transform-origin: bottom;
            }
            
            .label-float {
              transition: all 0.6s ease;
            }
            
            .bar-cell:hover + .label-float {
              transform: translateY(-1px);
              opacity: 1;
            }
          `}</style>
          {chartType === 'bar' ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <filter id="barShadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="3" dy="6" stdDeviation="4" floodOpacity="0.3"/>
                  </filter>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopOpacity="1"/>
                    <stop offset="100%" stopOpacity="0.8"/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => formatCurrency(value)} />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg p-4">
                          <h4 className="font-bold text-gray-900 dark:text-white mb-2">{label}</h4>
                          <p className="text-green-600 dark:text-green-400 font-semibold">
                            Total Spending: {formatCurrency(data.value)}
                          </p>
                          {data.contracts && (
                            <p className="text-blue-600 dark:text-blue-400">
                              Contracts: {data.contracts.toLocaleString()}
                            </p>
                          )}
                          {data.average && (
                            <p className="text-purple-600 dark:text-purple-400">
                              Avg Award: {formatCurrency(data.average)}
                            </p>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="value" 
                  radius={[8, 8, 0, 0]}
                  className="hover:opacity-80 transition-opacity duration-200"
                  filter="url(#barShadow)"
                  animationBegin={0}
                  animationDuration={2000}
                >
                  {chartData.map((_, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={`url(#barGradient)`} 
                      className="bar-cell"
                      style={{ 
                        fill: pieColors[index % pieColors.length]
                      }}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-full h-full relative">
              {/* Professional Title */}
              <div className="absolute top-4 left-4 z-10">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white bg-white dark:bg-gray-800 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm">
                  {selectedView === 'states-2025' && 'TOP 15 STATES (2025)'}
                  {selectedView === 'states-2024' && 'TOP 15 STATES (2024)'}
                  {selectedView === 'naics-top10' && 'TOP 10 NAICS CODES'}
                  {selectedView === 'naics-top50' && 'TOP 50 NAICS CODES'}
                </h3>
              </div>

              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={800} height={400}>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={140}
                    innerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={1500}
                    onClick={(data) => {
                      console.log('Pie clicked:', data);
                      if (data && data.name) {
                        setInfoModal({
                          visible: true,
                          data: data,
                          position: { x: 400, y: 200 }
                        });
                      }
                    }}
                  >
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={pieColors[index % pieColors.length]}
                        stroke="#ffffff"
                        strokeWidth={2}
                        style={{ cursor: 'pointer' }}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              
              {/* Dynamic Legend */}
              <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-3 text-sm shadow-lg max-w-xs">
                <div className="font-bold text-gray-800 dark:text-gray-200 mb-2">
                  {selectedView.includes('states') ? 'Federal Spending by State' : 'Federal Spending by NAICS'}
                </div>
                <div className="space-y-1 max-h-40 overflow-y-auto">
                  {chartData.slice(0, 8).map((item, index) => (
                    <div key={item.name} className="flex items-center text-xs">
                      <div 
                        className="w-3 h-3 rounded-full mr-2 flex-shrink-0" 
                        style={{ backgroundColor: pieColors[index % pieColors.length] }}
                      ></div>
                      <span className="text-gray-600 dark:text-gray-400 truncate">
                        {selectedView.includes('naics') 
                          ? `${item.name} - ${item.fullName?.substring(0, 20)}...` 
                          : item.name
                        }
                      </span>
                    </div>
                  ))}
                  {chartData.length > 8 && (
                    <div className="text-xs text-gray-500 dark:text-gray-500 pt-1 border-t border-gray-200 dark:border-gray-600">
                      +{chartData.length - 8} more items
                    </div>
                  )}
                </div>
                <div className="text-gray-500 dark:text-gray-500 text-xs mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                  💡 Click slices for details
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chart Data Table for Bar Chart */}
        {chartType === 'bar' && (
          <div className="mb-6 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Quick Reference: {selectedView.includes('naics') ? 'NAICS Codes' : 'States'} & Spending Values
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 text-xs">
              {chartData.slice(0, 15).map((item, index) => (
                <div 
                  key={item.name} 
                  className="flex items-center justify-between p-2 bg-white dark:bg-gray-600 rounded border-l-4"
                  style={{ borderLeftColor: pieColors[index % pieColors.length] }}
                >
                  <span className="font-medium text-gray-700 dark:text-gray-200 truncate mr-2">
                    {item.name}
                  </span>
                  <span className="text-gray-900 dark:text-white font-bold whitespace-nowrap">
                    {formatCurrency(item.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Data Summary */}
        <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {formatCurrency(chartData.reduce((sum, item) => sum + item.value, 0))}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">Total Displayed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {chartData.reduce((sum, item) => sum + (item.contracts || 0), 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">Total Contracts</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {chartData.length}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {selectedView.includes('naics') ? 'NAICS Codes' : 'States'} Shown
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* YoY Growth Chart */}
      {showYoYChart && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-3d dark:shadow-dark-3d animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <ArrowUpRight className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Year-over-Year Growth Analysis
              </h3>
            </div>
            <button
              onClick={() => setShowYoYChart(false)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
            </button>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockYoYGrowthData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <defs>
                  <linearGradient id="orangeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="grayGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6b7280" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6b7280" stopOpacity={0.05}/>
                  </linearGradient>
                  <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.3"/>
                  </filter>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.4} />
                <XAxis 
                  dataKey="month" 
                  stroke="#1f2937"
                  fontSize={13}
                  fontWeight="600"
                  tick={{ fill: '#1f2937', fontWeight: 600 }}
                />
                <YAxis 
                  stroke="#1f2937"
                  fontSize={13}
                  fontWeight="600"
                  tick={{ fill: '#1f2937', fontWeight: 600 }}
                  tickFormatter={(value) => `$${value}B`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.98)', 
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    color: '#1f2937',
                    fontWeight: '600'
                  }}
                  labelStyle={{ color: '#1f2937', fontWeight: '700', marginBottom: '8px' }}
                  formatter={(value, name) => [
                    <span style={{ color: name === 'current' ? '#f97316' : '#6b7280', fontWeight: '700' }}>
                      ${value}B
                    </span>, 
                    name === 'current' ? '2025' : '2024'
                  ]}
                />
                <Area 
                  type="monotone" 
                  dataKey="previous" 
                  stroke="#6b7280" 
                  strokeWidth={3}
                  fill="url(#grayGradient)"
                  name="previous"
                  filter="url(#shadow)"
                />
                <Area 
                  type="monotone" 
                  dataKey="current" 
                  stroke="#f97316" 
                  strokeWidth={4}
                  fill="url(#orangeGradient)"
                  name="current"
                  filter="url(#shadow)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 grid grid-cols-3 gap-4 text-center border-t pt-4">
            <div>
              <p className="text-lg font-bold text-orange-600 dark:text-orange-400">+8.7%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Average Growth</p>
            </div>
            <div>
              <p className="text-lg font-bold text-green-600 dark:text-green-400">$184.7B</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Current Peak</p>
            </div>
            <div>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">$169.8B</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Previous Peak</p>
            </div>
          </div>
        </div>
      )}

      {/* Total Spending Breakdown */}
      {showTotalSpendingData && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-3d dark:shadow-dark-3d animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                2025 Federal Spending Breakdown
              </h3>
            </div>
            <button
              onClick={() => setShowTotalSpendingData(false)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
            </button>
          </div>
          
          <div className="space-y-4">
            {mockTotalSpendingData.map((item, index) => (
              <div key={item.category} className={`flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors animate-slide-in delay-${index}`}>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-lg flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{item.category}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.percentage}% of total spending</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600 dark:text-green-400">${item.amount}B</p>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{item.change}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Source:</strong> USASpending.gov - Federal spending data aggregated from multiple agencies and departments. 
              Data reflects obligated amounts for fiscal year 2025 as of the latest reporting period.
            </p>
          </div>
        </div>
      )}

      {/* NAICS Detailed List */}
      {selectedView.includes('naics') && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-3d dark:shadow-dark-3d">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              NAICS Code Details
            </h3>
            <div className="flex items-center space-x-3">
              {selectedView === 'naics-top10' && (
                <button
                  onClick={() => setSelectedView('naics-top50')}
                  className="flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium"
                >
                  View Top 50 <ChevronDown className="w-4 h-4 ml-1" />
                </button>
              )}
              
              {/* Expand/Collapse Button */}
              <button
                onClick={() => setNaicsDetailsExpanded(!naicsDetailsExpanded)}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium figma-button shadow-3d dark:shadow-dark-3d hover:shadow-3d-hover dark:hover:shadow-dark-3d-hover transition-all duration-300 ${
                  naicsDetailsExpanded
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 hover:shadow-red-glow'
                    : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50 hover:shadow-green-glow'
                }`}
                title={naicsDetailsExpanded ? 'Collapse Table' : 'Expand Table'}
              >
                {naicsDetailsExpanded ? (
                  <>
                    <ChevronUp className="w-4 h-4 icon-hover transition-transform duration-300" />
                    <ChevronUp className="w-4 h-4 -ml-2 icon-hover transition-transform duration-300" />
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4 icon-hover transition-transform duration-300" />
                    <ChevronDown className="w-4 h-4 -ml-2 icon-hover transition-transform duration-300" />
                  </>
                )}
              </button>
            </div>
          </div>
          
          {naicsDetailsExpanded ? (
            <div className="overflow-x-auto transition-all duration-500 ease-in-out">
              <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    NAICS Code
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    2025 Spending
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Contracts
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Growth
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {(mockNAICSSpendingData || []).slice(0, selectedView === 'naics-top50' ? 50 : 10).map((naics, index) => (
                  <tr 
                    key={naics.code} 
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                    onClick={() => {
                      const naicsInfo = naicsDetails[naics.code as keyof typeof naicsDetails];
                      const modalData = naicsInfo ? { ...naicsInfo, ...naics } : {
                        code: naics.code,
                        title: naics.description,
                        description: `This NAICS code represents: ${naics.description}`,
                        totalSpending2025: naics.totalSpending2025,
                        contractCount2025: naics.contractCount2025,
                        growthRate: naics.growthRate,
                        icon: Building2,
                        color: 'bg-gray-500'
                      };
                      setNaicsModal({
                        visible: true,
                        data: modalData
                      });
                    }}
                  >
                    <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      #{index + 1}
                    </td>
                    <td className="px-4 py-4 text-sm font-mono text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
                      {naics.code}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                      <div className="flex items-center">
                        <Info className="w-4 h-4 text-blue-500 mr-2" />
                        {naics.description}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold text-green-600 dark:text-green-400">
                      {formatCurrency(naics.totalSpending2025)}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                      {naics.contractCount2025.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        naics.growthRate > 10 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                          : naics.growthRate > 5
                          ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400'
                          : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                      }`}>
                        {naics.growthRate > 0 ? '+' : ''}{naics.growthRate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          ) : (
            <div className="transition-all duration-500 ease-in-out">
              <div className="grid grid-cols-1 gap-4">
                {(mockNAICSSpendingData || []).slice(0, 3).map((naics, index) => (
                  <div key={naics.code} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <div className="flex items-center space-x-4">
                      <span className="w-8 h-8 bg-purple-600 dark:bg-purple-500 text-white text-sm font-bold rounded-full flex items-center justify-center">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-mono text-purple-600 dark:text-purple-400 font-medium">
                          {naics.code}
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-md">
                          {naics.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600 dark:text-green-400">
                        {formatCurrency(naics.totalSpending2025)}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {naics.contractCount2025.toLocaleString()} contracts
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Showing top 3 of {selectedView === 'naics-top50' ? '50' : '10'} NAICS codes
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Set-Aside Programs Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-3d dark:shadow-dark-3d">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Federal Set-Aside Programs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(setAsideDetails).map(([key, setAside]) => {
            const IconComponent = setAside.icon;
            return (
              <div
                key={key}
                className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-all duration-200 hover:shadow-lg group"
                onClick={() => setSetAsideModal({ visible: true, data: setAside })}
              >
                <div className="flex items-center mb-3">
                  <div className={`p-2 rounded-lg ${setAside.color} bg-opacity-20 mr-3 group-hover:bg-opacity-30 transition-all duration-200`}>
                    <IconComponent className={`w-5 h-5 text-current`} style={{ color: setAside.color.replace('bg-', '').replace('-500', '') }} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {setAside.title}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Click for details
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Total Value:</span>
                    <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                      {setAside.totalValue}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Growth:</span>
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                      {setAside.growthRate}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Contracts:</span>
                    <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                      {setAside.contractCount}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Year-over-Year Comparison */}
      {selectedView.includes('states') && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-3d dark:shadow-dark-3d">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Year-over-Year State Comparison
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Top Gainers (2024 → 2025)</h4>
              <div className="space-y-2">
                {spendingData.slice(0, 5).map((state) => {
                  const state2024 = mockSpendingData2024.find(s => s.state === state.state);
                  const growth = state2024 ? ((state.totalSpending - state2024.totalSpending) / state2024.totalSpending) * 100 : 0;
                  return (
                    <div key={state.state} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <span className="font-medium text-gray-900 dark:text-white">{state.state}</span>
                      <span className="text-green-600 dark:text-green-400 font-semibold">+{growth.toFixed(1)}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Spending Leaders 2025</h4>
              <div className="space-y-2">
                {spendingData.slice(0, 5).map((state, index) => (
                  <div key={state.state} className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="flex items-center">
                      <span className="w-6 h-6 bg-purple-600 dark:bg-purple-500 text-white text-xs font-bold rounded-full flex items-center justify-center mr-3">
                        {index + 1}
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">{state.state}</span>
                    </div>
                    <span className="text-purple-600 dark:text-purple-400 font-semibold">
                      {formatCurrency(state.totalSpending)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Info Modal */}
      {infoModal.visible && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
            onClick={() => setInfoModal({ visible: false, data: null, position: { x: 0, y: 0 } })}
          />
          
          {/* Modal */}
          <div 
            className="fixed z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-2xl p-6 max-w-md animate-fade-in-scale"
            style={{
              left: `${Math.min(infoModal.position.x, window.innerWidth - 400)}px`,
              top: `${Math.min(infoModal.position.y, window.innerHeight - 300)}px`,
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setInfoModal({ visible: false, data: null, position: { x: 0, y: 0 } })}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
            </button>

            {/* Modal content */}
            <div className="pr-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {selectedView.includes('naics') 
                  ? `${infoModal.data.name} - ${infoModal.data.fullName}` 
                  : infoModal.data.name}
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Total Spending:</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(infoModal.data.value)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Contracts:</span>
                  <span className="font-bold text-green-600 dark:text-green-400">
                    {infoModal.data.contracts?.toLocaleString() || 'N/A'}
                  </span>
                </div>
                
                {infoModal.data.average && (
                  <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Avg Award:</span>
                    <span className="font-bold text-purple-600 dark:text-purple-400">
                      {formatCurrency(infoModal.data.average)}
                    </span>
                  </div>
                )}
                
                {infoModal.data.growth && (
                  <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Growth Rate:</span>
                    <span className="font-bold text-orange-600 dark:text-orange-400">
                      {infoModal.data.growth}%
                    </span>
                  </div>
                )}
                
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Percentage of Total:</span>
                  <span className="font-bold text-gray-600 dark:text-gray-400">
                    {((infoModal.data.value / chartData.reduce((sum: number, item: any) => sum + item.value, 0)) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
                <button 
                  onClick={() => {
                    const stateName = infoModal.data.name;
                    const currentPath = window.location.pathname;
                    
                    if (currentPath === '/spending') {
                      // We're already on the spending page, just update the view and highlight the state
                      if (selectedView.includes('naics')) {
                        // If looking at NAICS data, switch to state view
                        setSelectedView('states-2025');
                      }
                      
                      // Close modal
                      setInfoModal({ visible: false, data: null, position: { x: 0, y: 0 } });
                      
                      // Scroll to chart and highlight
                      setTimeout(() => {
                        const chartElement = document.getElementById('spending-charts');
                        if (chartElement) {
                          chartElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }, 100);
                      
                      // Show a subtle notification
                      const notification = document.createElement('div');
                      notification.className = 'fixed top-20 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300';
                      notification.innerHTML = `📊 Showing data for ${stateName}`;
                      document.body.appendChild(notification);
                      
                      setTimeout(() => {
                        notification.style.opacity = '0';
                        setTimeout(() => document.body.removeChild(notification), 300);
                      }, 2000);
                      
                    } else {
                      // Navigate to spending page with state parameter
                      const view = selectedView.includes('naics') ? 'states-2025' : selectedView;
                      navigate(`/spending?state=${encodeURIComponent(stateName)}&view=${view}`);
                    }
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  {window.location.pathname === '/spending' 
                    ? `📊 Focus on ${infoModal.data.name}` 
                    : `📊 Analyze ${infoModal.data.name} in Detail`
                  }
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Pro Features Modal */}
      {showProModal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowProModal(false)} />
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full animate-fade-in-scale">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Crown className="w-6 h-6 text-yellow-500" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Premium Feature
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowProModal(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Professional PDF Reports
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Export beautiful, professional PDF reports with AI-powered insights, 
                    custom branding, and comprehensive analysis.
                  </p>
                  
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-4 rounded-lg mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Sparkles className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                      <span className="font-medium text-orange-800 dark:text-orange-200">Pro Features Include:</span>
                    </div>
                    <ul className="text-sm text-orange-700 dark:text-orange-300 space-y-1">
                      <li>• AI-generated executive summaries</li>
                      <li>• Custom GovChime branding</li>
                      <li>• Advanced data visualizations</li>
                      <li>• Unlimited exports</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowProModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Maybe Later
                  </button>
                  <button
                    onClick={() => {
                      setShowProModal(false);
                      window.open('https://govchime.com/pro', '_blank');
                    }}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-lg transition-all duration-300 shadow-orange-glow"
                  >
                    Upgrade Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Custom Report Modal */}
      {showCustomReportModal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowCustomReportModal(false)} />
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-lg w-full animate-fade-in-scale">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-6 h-6 text-purple-500" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Customized Geographic Report
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowCustomReportModal(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="mb-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Generate an AI-powered analysis of federal contracting opportunities 
                    in your target geographical area.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Target State or Region
                      </label>
                      <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                        <option>Select your target area...</option>
                        <option>California</option>
                        <option>Texas</option>
                        <option>Florida</option>
                        <option>New York</option>
                        <option>Virginia</option>
                        <option>Maryland</option>
                        <option>Washington DC Metro</option>
                        <option>Other (specify below)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Industry Focus (Optional)
                      </label>
                      <input 
                        type="text"
                        placeholder="e.g., IT Services, Construction, Healthcare..."
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500"
                      />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-4 rounded-lg mt-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      <span className="font-medium text-purple-800 dark:text-purple-200">Report Will Include:</span>
                    </div>
                    <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                      <li>• Spending trends in your target area</li>
                      <li>• Neighboring states comparison</li>
                      <li>• Top agencies and contractors</li>
                      <li>• Market opportunity assessment</li>
                      <li>• Competitive landscape analysis</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowCustomReportModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowCustomReportModal(false);
                      generateCustomReport('Selected Area', 'General Analysis');
                    }}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl transition-all duration-300 shadow-[0_8px_32px_rgba(147,51,234,0.3)] hover:shadow-[0_12px_40px_rgba(147,51,234,0.5)] font-medium backdrop-blur-sm"
                  >
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* NAICS Code Detail Modal */}
      {naicsModal.visible && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
            onClick={() => setNaicsModal({ visible: false, data: null })}
          />
          
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in-scale">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    {naicsModal.data?.icon && (
                      <div className={`p-3 ${naicsModal.data.color} bg-opacity-20 rounded-lg`}>
                        {React.createElement(naicsModal.data.icon, { 
                          className: "w-8 h-8", 
                          style: { color: naicsModal.data.color?.replace('bg-', '').replace('-500', '') } 
                        })}
                      </div>
                    )}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        NAICS {naicsModal.data?.code}
                      </h3>
                      <p className="text-lg text-gray-600 dark:text-gray-300">
                        {naicsModal.data?.title}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setNaicsModal({ visible: false, data: null })}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                  </button>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Description</h4>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {naicsModal.data?.description}
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h5 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">2025 Spending</h5>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {formatCurrency(naicsModal.data?.totalSpending2025 || 0)}
                    </p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <h5 className="font-semibold text-green-800 dark:text-green-300 mb-1">Active Contracts</h5>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {naicsModal.data?.contractCount2025?.toLocaleString() || '0'}
                    </p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                    <h5 className="font-semibold text-purple-800 dark:text-purple-300 mb-1">Average Contract</h5>
                    <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                      {naicsModal.data?.averageContract || 'N/A'}
                    </p>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                    <h5 className="font-semibold text-orange-800 dark:text-orange-300 mb-1">Growth Rate</h5>
                    <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
                      +{naicsModal.data?.growthRate || 0}%
                    </p>
                  </div>
                </div>

                {/* Examples */}
                {naicsModal.data?.examples && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Common Services</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {naicsModal.data.examples.map((example: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">{example}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Common Agencies */}
                {naicsModal.data?.commonAgencies && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Top Contracting Agencies</h4>
                    <div className="space-y-2">
                      {naicsModal.data.commonAgencies.map((agency: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <Building2 className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{agency}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Requirements and Opportunities */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {naicsModal.data?.requirements && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Key Requirements</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                        {naicsModal.data.requirements}
                      </p>
                    </div>
                  )}
                  {naicsModal.data?.opportunities && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Market Opportunities</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                        {naicsModal.data.opportunities}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Set-Aside Detail Modal */}
      {setAsideModal.visible && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
            onClick={() => setSetAsideModal({ visible: false, data: null })}
          />
          
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-2xl max-w-4xl w-full my-8 animate-fade-in-scale">
              <div className="p-6 max-h-[85vh] overflow-y-auto">
                <style>{`
                  @keyframes sparkle-rotate {
                    0% { transform: rotate(0deg) scale(1); }
                    50% { transform: rotate(180deg) scale(1.1); }
                    100% { transform: rotate(360deg) scale(1); }
                  }
                  
                  @keyframes shield-rotate {
                    0% { transform: rotateY(0deg) scale(1); }
                    100% { transform: rotateY(360deg) scale(1.05); }
                  }
                  
                  @keyframes pulse-glow {
                    0%, 100% { 
                      transform: scale(1); 
                      box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
                    }
                    50% { 
                      transform: scale(1.05); 
                      box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
                    }
                  }
                  
                  @keyframes bounce-subtle {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-3px); }
                  }
                  
                  .sparkle-hover:hover .star-icon {
                    animation: sparkle-rotate 0.8s ease-in-out;
                    color: #facc15 !important;
                  }
                  
                  .shield-hover:hover .shield-icon {
                    animation: shield-rotate 0.6s ease-in-out;
                  }
                  
                  .stats-hover:hover {
                    animation: pulse-glow 1.2s ease-in-out;
                  }
                  
                  .bounce-hover:hover {
                    animation: bounce-subtle 0.6s ease-in-out;
                  }
                `}</style>
                
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    {setAsideModal.data?.icon && (
                      <div className={`p-4 ${setAsideModal.data.color} bg-opacity-20 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
                        {React.createElement(setAsideModal.data.icon, { 
                          className: "w-10 h-10 transition-all duration-300", 
                          style: { 
                            color: setAsideModal.data.color?.includes('cyan') ? '#06b6d4' : 
                                   setAsideModal.data.color?.replace('bg-', '').replace('-500', '') 
                          } 
                        })}
                      </div>
                    )}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {setAsideModal.data?.title}
                      </h3>
                      <p className="text-lg text-gray-600 dark:text-gray-300">
                        {setAsideModal.data?.fullName}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSetAsideModal({ visible: false, data: null })}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    title="Close modal"
                  >
                    <X className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                  </button>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                    {setAsideModal.data?.description}
                  </p>
                </div>

                {/* Enhanced Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="stats-hover bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 p-6 rounded-xl text-center border border-green-200 dark:border-green-700 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                    <h5 className="font-semibold text-green-800 dark:text-green-300 mb-2 text-sm uppercase tracking-wider">Total Value</h5>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400 bounce-hover">
                      {setAsideModal.data?.totalValue}
                    </p>
                  </div>
                  <div className="stats-hover bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 p-6 rounded-xl text-center border border-blue-200 dark:border-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                    <h5 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 text-sm uppercase tracking-wider">Growth Rate</h5>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 bounce-hover">
                      {setAsideModal.data?.growthRate}
                    </p>
                  </div>
                  <div className="stats-hover bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 p-6 rounded-xl text-center border border-purple-200 dark:border-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                    <h5 className="font-semibold text-purple-800 dark:text-purple-300 mb-2 text-sm uppercase tracking-wider">Contracts</h5>
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 bounce-hover">
                      {setAsideModal.data?.contractCount}
                    </p>
                  </div>
                </div>

                {/* Requirements and Benefits */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <div className="shield-hover">
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                      <Shield className="shield-icon w-6 h-6 mr-3 text-yellow-500 transition-all duration-300" />
                      Eligibility Requirements
                    </h4>
                    <div className="space-y-3">
                      {setAsideModal.data?.requirements?.map((req: string, index: number) => (
                        <div key={index} className="flex items-start space-x-3 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-xl border border-yellow-200 dark:border-yellow-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
                          <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full mt-2.5 flex-shrink-0 shadow-sm"></div>
                          <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="sparkle-hover">
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                      <Star className="star-icon w-6 h-6 mr-3 text-green-500 transition-all duration-300" />
                      Program Benefits
                    </h4>
                    <div className="space-y-3">
                      {setAsideModal.data?.benefits?.map((benefit: string, index: number) => (
                        <div key={index} className="flex items-start space-x-3 p-4 bg-gradient-to-r from-yellow-50 to-lime-50 dark:from-yellow-900/20 dark:to-lime-900/20 rounded-xl border border-yellow-200 dark:border-yellow-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
                          <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full mt-2.5 flex-shrink-0 shadow-sm"></div>
                          <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Key Industries */}
                {setAsideModal.data?.industries && (
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                      <Building2 className="w-6 h-6 mr-3 text-blue-500 hover:text-blue-600 transition-colors duration-300" />
                      Key Industries
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {setAsideModal.data.industries.map((industry: string, index: number) => (
                        <div key={index} className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl text-center border border-blue-200 dark:border-blue-700 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">{industry}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Enhanced Call to Action */}
                <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 dark:from-purple-900/20 dark:via-indigo-900/20 dark:to-blue-900/20 p-8 rounded-xl border border-purple-200 dark:border-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                      <Sparkles className="w-8 h-8 text-purple-600 dark:text-purple-400 hover:rotate-12 transition-transform duration-300" />
                    </div>
                    <h4 className="text-xl font-semibold text-purple-800 dark:text-purple-300">Ready to Get Started?</h4>
                  </div>
                  <p className="text-purple-700 dark:text-purple-300 mb-6 text-lg leading-relaxed">
                    Learn more about {setAsideModal.data?.title} certification and start accessing federal contracting opportunities today.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => window.open('https://www.sba.gov', '_blank')}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                      title="Visit SBA for certification"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <Award className="w-4 h-4" />
                        <span>SBA Certification</span>
                      </div>
                    </button>
                    <button
                      onClick={() => window.open('https://sam.gov', '_blank')}
                      className="flex-1 px-6 py-3 border-2 border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                      title="Find opportunities on SAM.gov"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <Star className="w-4 h-4" />
                        <span>Find Opportunities</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SpendingAnalysis;