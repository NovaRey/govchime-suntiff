import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  BookOpen, 
  Award, 
  TrendingUp,
  FileText,
  Users,
  Search,
  BarChart3,
  MessageSquare
} from 'lucide-react';

const SimpleDashboard: React.FC = () => {
  const tools = [
    {
      title: 'Spending Analysis',
      description: 'Comprehensive analysis of government spending patterns',
      icon: BarChart3,
      href: '/spending',
      stats: '10M+ Contracts',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Contract Awards',
      description: 'Search and track federal contract awards',
      icon: Award,
      href: '/awards',
      stats: '500K+ Awards',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Learning Center',
      description: 'Educational resources and training materials',
      icon: BookOpen,
      href: '/learning',
      stats: '100+ Resources',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'Set-Aside Intelligence',
      description: 'Navigate set-aside opportunities with AI insights',
      icon: TrendingUp,
      href: '/setaside',
      stats: 'AI Powered',
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      title: 'NAICS Directory',
      description: 'Comprehensive directory of NAICS codes',
      icon: FileText,
      href: '/naics',
      stats: '1,000+ Codes',
      color: 'bg-teal-500 hover:bg-teal-600'
    },
    {
      title: 'ChatterWall',
      description: 'Community discussions and insights',
      icon: MessageSquare,
      href: '/chatter',
      stats: 'Community Driven',
      color: 'bg-pink-500 hover:bg-pink-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-4">
            Government Contract Intelligence
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Your comprehensive platform for federal contracting insights, analysis, and opportunities
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Total Contracts</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">10.2M+</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Active Users</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">50K+</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Data Sources</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">12</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Search className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link 
              key={tool.title}
              to={tool.href}
              className="group bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center transition-colors duration-300`}>
                  <tool.icon className="w-6 h-6 text-white" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {tool.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                {tool.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full">
                  {tool.stats}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Explore government contracting opportunities with our powerful analytics and intelligence tools.
            </p>
            <Link 
              to="/spending"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Start Exploring
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleDashboard;
