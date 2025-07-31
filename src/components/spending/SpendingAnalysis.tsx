import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SpendingData } from '../../types';
import { mockNAICSSpendingData, mockSpendingData2024 } from '../../data/mockData';
import DataSourceBadge from '../common/DataSourceBadge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LabelList } from 'recharts';
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
  Users,
  Crown,
  ChevronUp,
  Sparkles,
  Shield,
  Flag,
  Star,
  Info,
  Cpu,
  Heart,
  Truck
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
      icon: Users,
      color: 'bg-blue-500',
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
    setShowCustomReportModal(true);
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

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 1.4;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const data = chartData[index];

    // Get short description for NAICS codes
    const getShortDescription = (fullName: string) => {
      if (selectedView.includes('naics')) {
        // Extract key words from NAICS description
        const words = fullName.toLowerCase().split(' ');
        if (words.includes('computer') || words.includes('programming')) return 'IT Services';
        if (words.includes('construction') || words.includes('building')) return 'Construction';
        if (words.includes('engineering')) return 'Engineering';
        if (words.includes('consulting') || words.includes('management')) return 'Consulting';
        if (words.includes('research') || words.includes('development')) return 'R&D';
        if (words.includes('manufacturing')) return 'Manufacturing';
        if (words.includes('medical') || words.includes('surgical')) return 'Medical';
        if (words.includes('facilities') || words.includes('support')) return 'Facilities';
        if (words.includes('security') || words.includes('guard')) return 'Security';
        if (words.includes('testing') || words.includes('laboratories')) return 'Testing';
        if (words.includes('aircraft') || words.includes('aerospace')) return 'Aerospace';
        if (words.includes('scientific') || words.includes('technical')) return 'Tech Services';
        if (words.includes('advertising') || words.includes('marketing')) return 'Marketing';
        if (words.includes('janitorial') || words.includes('cleaning')) return 'Cleaning';
        if (words.includes('landscaping') || words.includes('grounds')) return 'Landscaping';
        return 'Services'; // Default fallback
      }
      return data.name; // For states, just return the state name
    };
    return (
      <g>
        {/* Connection line from pie slice to label */}
        <line
          x1={cx + (outerRadius + 10) * Math.cos(-midAngle * RADIAN)}
          y1={cy + (outerRadius + 10) * Math.sin(-midAngle * RADIAN)}
          x2={x}
          y2={y}
          stroke="#ffffff"
          strokeWidth={1.5}
          strokeDasharray="2,2"
          opacity={0.7}
          style={{
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))'
          }}
        />
        {/* Label background circle */}
        <circle
          cx={x}
          cy={y}
          r={8}
          fill="white"
          stroke={pieColors[index % pieColors.length]}
          strokeWidth={2}
          opacity={0.9}
          style={{
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
          }}
        />
        {/* State/NAICS indicator in circle */}
        <circle
          x={x}
          y={y}
          r={3}
          fill={pieColors[index % pieColors.length]}
        />
        {/* State name or NAICS code label */}
        <text
          x={x + (x > cx ? 15 : -15)}
          y={y}
          textAnchor={x > cx ? 'start' : 'end'}
          dominantBaseline="central"
          className="fill-gray-700 dark:fill-gray-300 text-sm font-semibold"
          style={{
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))'
          }}
        >
          {selectedView.includes('naics') ? data.name : data.name}
        </text>
        {/* Description/Value label */}
        <text
          x={x + (x > cx ? 15 : -15)}
          y={y + 12}
          textAnchor={x > cx ? 'start' : 'end'}
          dominantBaseline="central"
          className="fill-purple-600 dark:fill-purple-400 text-xs font-medium"
          style={{
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))'
          }}
        >
          {getShortDescription((data as any).fullName || data.name)}
        </text>
      </g>
    );
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
          <p className="text-gray-600 dark:text-gray-400 mt-1 flex items-center">
            Federal contract spending patterns and trends
            <DataSourceBadge source="USASpending.gov" className="ml-2" />
          </p>
        </div>
        <div className="relative group">
          <button 
            onClick={handleExportPDF}
            className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:text-white hover:border-transparent transition-all duration-300 shadow-3d dark:shadow-dark-3d hover:shadow-orange-glow group"
          >
            <Crown className="w-4 h-4 mr-2 group-hover:text-yellow-300 transition-colors duration-300" />
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
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-3d dark:shadow-dark-3d hover:shadow-3d-hover dark:hover:shadow-dark-3d-hover snappy-card cursor-pointer group">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg shadow-3d dark:shadow-dark-3d group-hover:shadow-green-glow figma-button">
              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400 icon-hover" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 figma-button">Total 2025 Spending</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 figma-button">
                {formatCurrency(spendingData.reduce((sum, state) => sum + state.totalSpending, 0))}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-3d dark:shadow-dark-3d hover:shadow-3d-hover dark:hover:shadow-dark-3d-hover snappy-card cursor-pointer group">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg shadow-3d dark:shadow-dark-3d group-hover:shadow-blue-glow figma-button">
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400 icon-hover" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 figma-button">Active Contracts</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 figma-button">
                {spendingData.reduce((sum, state) => sum + state.contractCount, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-3d dark:shadow-dark-3d hover:shadow-3d-hover dark:hover:shadow-dark-3d-hover snappy-card cursor-pointer group">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg shadow-3d dark:shadow-dark-3d group-hover:shadow-purple-glow figma-button">
              <Building2 className="w-6 h-6 text-purple-600 dark:text-purple-400 icon-hover" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 figma-button">Top NAICS Spending</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 figma-button">
                {formatCurrency((mockNAICSSpendingData && mockNAICSSpendingData[0]?.totalSpending2025) || 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-3d dark:shadow-dark-3d hover:shadow-3d-hover dark:hover:shadow-dark-3d-hover snappy-card cursor-pointer group">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg shadow-3d dark:shadow-dark-3d group-hover:shadow-orange-glow figma-button">
              <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400 icon-hover" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-orange-600 dark:group-hover:text-orange-400 figma-button">YoY Growth</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 figma-button">+12.4%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Chart Section */}
      <div id="spending-charts" className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-3d dark:shadow-dark-3d">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{getViewTitle()}</h2>
          </div>
          
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
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {option.label}
                </button>
              );
            })}
          </div>
          
          {/* Chart Type Switcher */}
          <div className="flex items-center space-x-2 ml-4">
            <button
              onClick={() => setChartType('bar')}
              className={`p-2 rounded-lg figma-button shadow-3d dark:shadow-dark-3d hover:shadow-3d-hover dark:hover:shadow-dark-3d-hover ${
                chartType === 'bar'
                  ? 'bg-blue-600 dark:bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              title="Bar Chart"
            >
              <BarChart3 className="w-4 h-4 icon-hover" />
            </button>
            <button
              onClick={() => setChartType('pie')}
              className={`p-2 rounded-lg figma-button shadow-3d dark:shadow-dark-3d hover:shadow-3d-hover dark:hover:shadow-dark-3d-hover ${
                chartType === 'pie'
                  ? 'bg-blue-600 dark:bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              title="Pie Chart"
            >
              <PieChartIcon className="w-4 h-4 icon-hover" />
            </button>
          </div>

          {/* Custom Report Button */}
          <div className="flex items-center space-x-2 ml-4">
            <button
              onClick={handleCustomReport}
              className="px-3 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-300 shadow-3d dark:shadow-dark-3d hover:shadow-purple-glow flex items-center space-x-2 group"
              title="Generate Customized Report"
            >
              <Users className="w-4 h-4 group-hover:text-yellow-300 transition-colors duration-300" />
              <span className="text-sm font-medium">Custom Report</span>
            </button>
          </div>
        </div>

        {/* Chart */}
        <div className="h-96 mb-6 chart-container">
          {chartType === 'bar' ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="transparent" opacity={0.3} />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval={0}
                  fontSize={12}
                  stroke="#6B7280"
                />
                <YAxis 
                  tickFormatter={(value) => formatCurrency(value)}
                  fontSize={12}
                  stroke="#6B7280"
                />
                <Tooltip 
                  content={<CustomTooltip />}
                  wrapperStyle={{ backgroundColor: 'transparent', border: 'none' }}
                  contentStyle={{ backgroundColor: 'transparent', border: 'none' }}
                />
                <Bar 
                  dataKey="value" 
                  radius={[4, 4, 0, 0]}
                  className="hover:opacity-80 transition-opacity duration-200 bar-chart-appear"
                >
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={140}
                  innerRadius={60}
                  dataKey="value"
                 onClick={(data) => {
                   // Show detailed information for clicked piece
                   try {
                     const pieceData = data?.payload || data;
                     if (pieceData && pieceData.name) {
                       // Position modal in center-right of the chart area
                       setInfoModal({
                         visible: true,
                         data: pieceData,
                         position: { 
                           x: 350, // Fixed position relative to chart
                           y: 200 
                         }
                       });
                     }
                   } catch (error) {
                     console.error('Error handling pie chart click:', error);
                   }
                 }}
                  animationBegin={0}
                  animationDuration={1000}
                  className="drop-shadow-lg"
                 style={{ cursor: 'pointer' }}
                >
                  {chartData.map((_, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={pieColors[index % pieColors.length]}
                      stroke="#ffffff"
                      strokeWidth={2}
                      className="transition-all duration-300 hover:brightness-110 hover:drop-shadow-lg cursor-pointer"
                      style={{
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                      }}
                    />
                  ))}
                  <LabelList content={<CustomLabel />} />
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Data Summary */}
        <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {formatCurrency(chartData.reduce((sum, item) => sum + item.value, 0))}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Displayed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {chartData.reduce((sum, item) => sum + (item.contracts || 0), 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Contracts</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {chartData.length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {selectedView.includes('naics') ? 'NAICS Codes' : 'States'} Shown
              </p>
            </div>
          </div>
        </div>
      </div>

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
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    NAICS Code
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    2025 Spending
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Contracts
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
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
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-md">
                          {naics.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600 dark:text-green-400">
                        {formatCurrency(naics.totalSpending2025)}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
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
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
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
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
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
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-300 shadow-purple-glow"
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
          
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
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
          
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-fade-in-scale">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    {setAsideModal.data?.icon && (
                      <div className={`p-3 ${setAsideModal.data.color} bg-opacity-20 rounded-lg`}>
                        {React.createElement(setAsideModal.data.icon, { 
                          className: "w-8 h-8", 
                          style: { color: setAsideModal.data.color?.replace('bg-', '').replace('-500', '') } 
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
                  >
                    <X className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                  </button>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                    {setAsideModal.data?.description}
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                    <h5 className="font-semibold text-green-800 dark:text-green-300 mb-1">Total Value</h5>
                    <p className="text-xl font-bold text-green-600 dark:text-green-400">
                      {setAsideModal.data?.totalValue}
                    </p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                    <h5 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">Growth Rate</h5>
                    <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                      {setAsideModal.data?.growthRate}
                    </p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
                    <h5 className="font-semibold text-purple-800 dark:text-purple-300 mb-1">Contracts</h5>
                    <p className="text-xl font-bold text-purple-600 dark:text-purple-400">
                      {setAsideModal.data?.contractCount}
                    </p>
                  </div>
                </div>

                {/* Requirements and Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-red-500" />
                      Eligibility Requirements
                    </h4>
                    <div className="space-y-2">
                      {setAsideModal.data?.requirements?.map((req: string, index: number) => (
                        <div key={index} className="flex items-start space-x-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <Star className="w-5 h-5 mr-2 text-green-500" />
                      Program Benefits
                    </h4>
                    <div className="space-y-2">
                      {setAsideModal.data?.benefits?.map((benefit: string, index: number) => (
                        <div key={index} className="flex items-start space-x-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Key Industries */}
                {setAsideModal.data?.industries && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <Building2 className="w-5 h-5 mr-2 text-blue-500" />
                      Key Industries
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {setAsideModal.data.industries.map((industry: string, index: number) => (
                        <div key={index} className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">{industry}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-700">
                  <div className="flex items-center space-x-3 mb-3">
                    <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    <h4 className="text-lg font-semibold text-purple-800 dark:text-purple-300">Ready to Get Started?</h4>
                  </div>
                  <p className="text-purple-700 dark:text-purple-300 mb-4">
                    Learn more about {setAsideModal.data?.title} certification and start accessing federal contracting opportunities.
                  </p>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => window.open('https://www.sba.gov', '_blank')}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
                    >
                      SBA Certification
                    </button>
                    <button
                      onClick={() => window.open('https://sam.gov', '_blank')}
                      className="px-4 py-2 border border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors duration-200 text-sm font-medium"
                    >
                      Find Opportunities
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