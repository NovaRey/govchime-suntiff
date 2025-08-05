import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClickTracking } from '../../hooks/useClickTracking';
import { 
  BookOpen, 
  ExternalLink, 
  FileText, 
  Users, 
  Award, 
  Search, 
  MessageCircle,
  ChevronRight,
  Play,
  Star,
  Clock
} from 'lucide-react';
import ChatBot from './ChatBot';

const LearningCenter: React.FC = () => {
  const { trackExternalClick } = useClickTracking();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('set-asides');
  const [showChatBot, setShowChatBot] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState<any>(null);

  const categories = [
    {
      id: 'set-asides',
      name: 'Set-Aside Programs',
      icon: Award,
      description: 'Small business contracting opportunities & intelligence',
      color: 'text-purple-600 dark:text-purple-400',
      priority: true
    },
    {
      id: 'getting-started',
      name: 'Getting Started',
      icon: BookOpen,
      description: 'New to federal contracting? Start here.',
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      id: 'tutorials',
      name: 'Video Tutorials',
      icon: Play,
      description: 'Step-by-step video guides and walkthroughs',
      color: 'text-red-600 dark:text-red-400'
    },
    {
      id: 'sam-gov',
      name: 'SAM.gov Resources',
      icon: Search,
      description: 'Master the System for Award Management',
      color: 'text-green-600 dark:text-green-400'
    },
    {
      id: 'advanced',
      name: 'Advanced Topics',
      icon: Users,
      description: 'Proposal writing, compliance, and more',
      color: 'text-orange-600 dark:text-orange-400'
    }
  ];

  const resources = {
    'getting-started': [
      {
        title: 'Federal Contracting 101',
        description: 'Complete beginner\'s guide to government contracting',
        type: 'guide',
        duration: '15 min read',
        url: 'https://www.sba.gov/federal-contracting',
        featured: true
      },
      {
        title: 'Understanding NAICS Codes',
        description: 'How to find and use the right industry codes',
        type: 'tutorial',
        duration: '10 min read',
        url: 'https://www.sba.gov/size-standards',
        featured: true
      },
      {
        title: 'Small Business Certifications',
        description: 'Overview of available certifications and benefits',
        type: 'guide',
        duration: '20 min read',
        url: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs',
        featured: false
      },
      {
        title: 'Getting Help with Contracting',
        description: 'Free resources and counseling services',
        type: 'guide',
        duration: '15 min read',
        url: 'https://www.sba.gov/about-sba/organization/contact-sba#government-contracting-assistance',
        featured: false
      }
    ],
    'sam-gov': [
      {
        title: 'Register Your Business in SAM.gov',
        description: 'Step-by-step registration process',
        type: 'tutorial',
        duration: '30 min',
        url: 'https://sam.gov/content/entity-registration',
        featured: true
      },
      {
        title: 'SAM.gov User Guide',
        description: 'Official comprehensive user manual',
        type: 'documentation',
        duration: '45 min read',
        url: 'https://sam.gov/content/help',
        featured: true
      },
      {
        title: 'Searching for Opportunities',
        description: 'Advanced search techniques and filters',
        type: 'tutorial',
        duration: '20 min',
        url: 'https://sam.gov/content/opportunities',
        featured: true
      },
      {
        title: 'Entity Registration Troubleshooting',
        description: 'Common issues and solutions',
        type: 'guide',
        duration: '15 min read',
        url: 'https://sam.gov/content/help',
        featured: false
      },
      {
        title: 'API Documentation',
        description: 'Technical guide for developers',
        type: 'documentation',
        duration: '60 min read',
        url: 'https://open.gsa.gov/api/entity-api/',
        featured: false
      }
    ],
    'tutorials': [
      // TikTok Videos
      {
        title: 'NAICS Codes Explained',
        description: 'Quick guide to industry codes',
        type: 'video',
        duration: '30 sec',
        platform: 'TikTok',
        videoId: 'tiktok-naics-guide',
        thumbnail: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
        featured: true
      },
      {
        title: 'SAM.gov Registration Tips',
        description: 'Essential registration steps',
        type: 'video',
        duration: '45 sec',
        platform: 'TikTok',
        videoId: 'tiktok-sam-tips',
        thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
        featured: true
      },
      {
        title: 'Small Biz Set-Aside Basics',
        description: 'Set-aside opportunities explained',
        type: 'video',
        duration: '60 sec',
        platform: 'TikTok',
        videoId: 'tiktok-setaside-basics',
        thumbnail: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=800',
        featured: false
      },
      // YouTube Videos
      {
        title: 'Complete NAICS Guide',
        description: 'Deep dive into industry classification',
        type: 'video',
        duration: '12 min',
        platform: 'YouTube',
        videoId: 'youtube-naics-complete',
        thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
        featured: true
      },
      {
        title: 'Federal Bidding Walkthrough',
        description: 'Step-by-step bidding process',
        type: 'video',
        duration: '18 min',
        platform: 'YouTube',
        videoId: 'youtube-bidding-walkthrough',
        thumbnail: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
        featured: false
      },
      {
        title: 'Contract Opportunities Deep Dive',
        description: 'Finding and analyzing opportunities',
        type: 'video',
        duration: '25 min',
        platform: 'YouTube',
        videoId: 'youtube-opportunities-deep',
        thumbnail: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
        featured: false
      },
      // LinkedIn Videos
      {
        title: 'Professional Networking for GovCon',
        description: 'B2B networking strategies',
        type: 'video',
        duration: '8 min',
        platform: 'LinkedIn',
        videoId: 'linkedin-networking-govcon',
        thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
        featured: false
      },
      {
        title: 'B2B Federal Sales Strategy',
        description: 'Professional sales approach',
        type: 'video',
        duration: '15 min',
        platform: 'LinkedIn',
        videoId: 'linkedin-sales-strategy',
        thumbnail: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=800',
        featured: false
      },
      {
        title: 'Building Past Performance',
        description: 'Track record development',
        type: 'video',
        duration: '10 min',
        platform: 'LinkedIn',
        videoId: 'linkedin-past-performance',
        thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
        featured: false
      }
    ],
    'set-asides': [
      {
        title: 'Set-Aside Intelligence Dashboard',
        description: 'Real-time data and analytics on all set-aside programs',
        type: 'dashboard',
        duration: 'Interactive',
        url: '/set-aside-dashboard',
        featured: true,
        internal: true
      },
      {
        title: 'Set-Aside Program Overview',
        description: 'Complete guide to all small business programs',
        type: 'guide',
        duration: '30 min read',
        url: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs',
        featured: true
      },
      {
        title: 'Women-Owned Small Business (WOSB)',
        description: 'Certification requirements and benefits',
        type: 'guide',
        duration: '15 min read',
        url: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/women-owned-small-business-federal-contracting-program',
        featured: true
      },
      {
        title: 'Service-Disabled Veteran-Owned Small Business (SDVOSB)',
        description: 'Veterans business certification program',
        type: 'guide',
        duration: '20 min read',
        url: 'https://www.va.gov/osdbu/verification/',
        featured: true
      },
      {
        title: '8(a) Business Development Program',
        description: 'Nine-year program for socially disadvantaged businesses',
        type: 'guide',
        duration: '25 min read',
        url: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/8a-business-development-program',
        featured: true
      },
      {
        title: 'HUBZone Program',
        description: 'Historically underutilized business zone certification',
        type: 'guide',
        duration: '18 min read',
        url: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/hubzone-program',
        featured: false
      },
      {
        title: 'Small Disadvantaged Business (SDB)',
        description: 'Certification for disadvantaged small businesses',
        type: 'guide',
        duration: '15 min read',
        url: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/small-disadvantaged-business',
        featured: false
      },
      {
        title: 'AbilityOne Program',
        description: 'Employment opportunities for people with disabilities',
        type: 'guide',
        duration: '12 min read',
        url: 'https://www.abilityone.gov/',
        featured: false
      },
      {
        title: 'NAICS Code Strategy for Set-Asides',
        description: 'Choosing the right codes for maximum opportunities',
        type: 'tutorial',
        duration: '20 min read',
        url: 'https://www.sba.gov/size-standards',
        featured: false
      },
      {
        title: 'Set-Aside Opportunity Trends 2024',
        description: 'Market analysis and forecasting',
        type: 'report',
        duration: '35 min read',
        url: '/set-aside-trends-2024',
        featured: false,
        internal: true
      }
    ],
    'advanced': [
      {
        title: 'Proposal Writing Best Practices',
        description: 'Win more contracts with better proposals',
        type: 'guide',
        duration: '45 min read',
        url: 'https://www.sba.gov/federal-contracting',
        featured: true
      },
      {
        title: 'Past Performance Documentation',
        description: 'Building a strong contracting history',
        type: 'guide',
        duration: '20 min read',
        url: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs',
        featured: true
      },
      {
        title: 'Compliance and Regulations',
        description: 'FAR, DFARS, and other regulatory requirements',
        type: 'documentation',
        duration: '60 min read',
        url: 'https://www.acquisition.gov/far/',
        featured: false
      },
      {
        title: 'Subcontracting Opportunities',
        description: 'Working with prime contractors',
        type: 'guide',
        duration: '25 min read',
        url: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/sba-mentor-protege-program',
        featured: false
      }
    ]
  };

  const getSetAsideDetails = (programTitle: string) => {
    const details: Record<string, {
      overview: string;
      eligibility: string[];
      benefits: string[];
      nextSteps: string;
    }> = {
      'Service-Disabled Veteran-Owned Small Business (SDVOSB)': {
        overview: 'The SDVOSB program provides contracting opportunities for service-disabled veterans who own and control small businesses. This program recognizes the sacrifices made by disabled veterans and helps them compete for federal contracts.',
        eligibility: [
          'Business must be at least 51% owned by one or more service-disabled veterans',
          'Service-disabled veteran(s) must control day-to-day operations',
          'Business must meet SBA small business size standards',
          'Service-disabled veteran must have a service-connected disability rating from VA',
          'Must be a U.S. citizen'
        ],
        benefits: [
          'Access to set-aside contracts exclusively for SDVOSBs',
          'Sole source contracts up to $4 million for most industries',
          'Priority in federal procurement opportunities',
          'Networking opportunities with other veteran-owned businesses',
          'Access to VA verification program for enhanced credibility'
        ],
        nextSteps: 'Start by obtaining your disability rating documentation from the VA, then register in SAM.gov and consider getting VA verification to enhance your credibility with contracting officers.'
      },
      'Women-Owned Small Business (WOSB)': {
        overview: 'The WOSB program levels the playing field for women entrepreneurs by providing access to federal contracting opportunities in industries where women are underrepresented.',
        eligibility: [
          'Business must be at least 51% owned by one or more women',
          'Women must control day-to-day operations and long-term decision making',
          'Business must meet SBA small business size standards',
          'Women owners must be U.S. citizens',
          'For EDWOSB: women must be economically disadvantaged'
        ],
        benefits: [
          'Access to set-aside contracts in underrepresented industries',
          'Sole source contracts up to $4 million',
          'Competitive advantages in federal procurement',
          'Networking and mentorship opportunities',
          'Access to SBA resources and training programs'
        ],
        nextSteps: 'Determine if your industry qualifies for WOSB set-asides, gather required documentation, and complete the certification process through an approved third-party certifier.'
      },
      '8(a) Business Development Program': {
        overview: 'The 8(a) program is a comprehensive 9-year business development program for socially and economically disadvantaged small businesses, providing access to government contracts and business development assistance.',
        eligibility: [
          'Business owner must be socially and economically disadvantaged',
          'Owner must demonstrate potential for success',
          'Business must be at least 51% owned by disadvantaged individual(s)',
          'Owner must control day-to-day operations',
          'Business must meet SBA small business size standards'
        ],
        benefits: [
          'Sole source contracts up to $4 million (goods) or $7 million (services)',
          'Access to exclusive 8(a) set-aside contracts',
          'Business development assistance and mentoring',
          'Training workshops and technical assistance',
          'Competitive advantages for 9 years'
        ],
        nextSteps: 'Prepare detailed financial and personal documentation, complete the extensive application process, and be prepared for a thorough review that can take 6-12 months.'
      },
      'HUBZone Program': {
        overview: 'The HUBZone program stimulates economic development in historically underutilized business zones by providing federal contracting opportunities to small businesses located in these areas.',
        eligibility: [
          'Business must be located in a qualified HUBZone area',
          'At least 35% of employees must live in a HUBZone',
          'Business must be at least 51% owned by U.S. citizens',
          'Principal office must be located in a HUBZone',
          'Business must meet SBA small business size standards'
        ],
        benefits: [
          'Access to HUBZone set-aside contracts',
          'Sole source contracts up to $4 million',
          'Price evaluation preference in full and open competition',
          'Contributes to community economic development',
          'Competitive advantages in federal procurement'
        ],
        nextSteps: 'Verify your location qualifies as a HUBZone using SBA\'s mapping tool, ensure employee residency requirements are met, and complete the certification application.'
      },
      'Small Disadvantaged Business (SDB)': {
        overview: 'The SDB program provides contracting opportunities for small businesses owned by socially and economically disadvantaged individuals, helping to address historical barriers to federal contracting.',
        eligibility: [
          'Business must be at least 51% owned by disadvantaged individual(s)',
          'Owner must be socially and economically disadvantaged',
          'Owner must control day-to-day operations',
          'Business must meet SBA small business size standards',
          'Must demonstrate good character and business integrity'
        ],
        benefits: [
          'Access to SDB set-aside contracts',
          'Price evaluation credits in certain competitions',
          'Subcontracting opportunities with large prime contractors',
          'Enhanced visibility to contracting officers',
          'Participation in mentor-protégé programs'
        ],
        nextSteps: 'Determine if you qualify as socially and economically disadvantaged, gather required documentation including financial statements, and complete the SBA certification process.'
      },
      'AbilityOne Program': {
        overview: 'AbilityOne creates employment opportunities for people who are blind or have significant disabilities by providing government contracts to qualified nonprofits.',
        eligibility: [
          'Must be a qualified nonprofit agency',
          'At least 75% of direct labor hours must be performed by people who are blind or have significant disabilities',
          'Must be designated by National Industries for the Blind or SourceAmerica',
          'Must meet quality and delivery standards',
          'Must comply with AbilityOne pricing policies'
        ],
        benefits: [
          'Access to mandatory source contracts',
          'Stable, long-term contracting opportunities',
          'Job creation for people with disabilities',
          'Direct sales authority with government agencies',
          'Priority in federal procurement for designated products/services'
        ],
        nextSteps: 'Contact National Industries for the Blind or SourceAmerica to begin the qualification process and learn about available contract opportunities in your area.'
      }
    };

    return details[programTitle] || {
      overview: 'This set-aside program provides specialized contracting opportunities for qualifying small businesses.',
      eligibility: ['Must meet specific program requirements', 'Business must qualify as a small business'],
      benefits: ['Access to set-aside contracts', 'Competitive advantages in federal procurement'],
      nextSteps: 'Visit the official program website to learn about specific requirements and application processes.'
    };
  };

  const handleResourceClick = async (resource: any, position: number) => {
    // Special handling for Set-Aside program resources - show info modal
    if (selectedCategory === 'set-asides' && !resource.internal && resource.type !== 'dashboard') {
      setSelectedResource(resource);
      setShowInfoModal(true);
      return;
    }
    
    if (resource.url) {
      // Check if it's an internal link
      if (resource.internal || resource.url.startsWith('/')) {
        // Handle internal navigation
        navigate(resource.url);
      } else {
        // Handle external links
        await trackExternalClick(resource.url, `learning center ${selectedCategory}`, position);
        window.open(resource.url, '_blank', 'noopener,noreferrer');
      }
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'guide': return BookOpen;
      case 'tutorial': return Play;
      case 'video': return Play;
      case 'documentation': return FileText;
      default: return BookOpen;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'guide': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400';
      case 'tutorial': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400';
      case 'video': return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400';
      case 'documentation': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Learning Center</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Master federal contracting with comprehensive resources and expert guidance
          </p>
        </div>
        <button
          onClick={() => setShowChatBot(true)}
          className="flex items-center px-4 py-2 bg-purple-600 dark:bg-purple-500 text-white rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition-all duration-200 shadow-3d dark:shadow-dark-3d hover:shadow-3d-hover dark:hover:shadow-dark-3d-hover transform hover:scale-105"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Ask AI Assistant
        </button>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Enhanced Category Sidebar */}
        <div className="lg:col-span-1 lg:sticky lg:top-6 lg:h-fit">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-xl dark:shadow-2xl backdrop-blur-sm">
            <div className="flex items-center mb-6">
              <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-3" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Learning Hub</h2>
            </div>
            
            <div className="space-y-3">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center p-4 rounded-xl transition-all duration-300 text-left group shadow-md hover:shadow-lg transform hover:scale-105 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 dark:from-purple-900/40 dark:via-blue-900/30 dark:to-indigo-900/40 text-purple-800 dark:text-purple-300 border-2 border-purple-300 dark:border-purple-600 shadow-lg shadow-purple-200 dark:shadow-purple-900/30'
                        : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gradient-to-br hover:from-gray-100 hover:to-purple-50 dark:hover:from-gray-600 dark:hover:to-purple-900/20 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-600'
                    }`}
                  >
                    <div className={`p-2 rounded-lg mr-4 transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-white dark:bg-purple-800/30 shadow-md'
                        : 'bg-white dark:bg-gray-600 group-hover:bg-purple-50 dark:group-hover:bg-purple-800/20'
                    }`}>
                      <Icon className={`w-5 h-5 ${category.color} ${
                        selectedCategory === category.id ? 'animate-pulse' : ''
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold text-sm mb-1 ${
                        selectedCategory === category.id ? 'text-purple-800 dark:text-purple-300' : ''
                      }`}>
                        {category.name}
                      </h3>
                      <p className="text-xs opacity-75 line-clamp-2">{category.description}</p>
                      {category.priority && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 rounded-full text-xs font-medium">
                          Priority
                        </span>
                      )}
                    </div>
                    <ChevronRight className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${
                      selectedCategory === category.id 
                        ? 'text-purple-600 dark:text-purple-400 transform rotate-90 scale-110' 
                        : 'text-gray-400 group-hover:text-purple-500 group-hover:transform group-hover:translate-x-1'
                    }`} />
                  </button>
                );
              })}
            </div>

            {/* Quick Access Actions */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <MessageCircle className="w-4 h-4 text-blue-500 mr-2" />
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setShowChatBot(true)}
                  className="w-full flex items-center p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 text-blue-700 dark:text-blue-300 transition-all duration-200 group shadow-sm hover:shadow-md"
                >
                  <MessageCircle className="w-4 h-4 mr-3 group-hover:animate-bounce" />
                  <span className="text-sm font-medium">Ask AI Assistant</span>
                </button>
                <button className="w-full flex items-center p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30 text-green-700 dark:text-green-300 transition-all duration-200 group shadow-sm hover:shadow-md">
                  <Search className="w-4 h-4 mr-3 group-hover:animate-pulse" />
                  <span className="text-sm font-medium">Browse All Resources</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Resources Content */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-3d dark:shadow-dark-3d">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {categories.find(c => c.id === selectedCategory)?.name} Resources
              </h2>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {resources[selectedCategory as keyof typeof resources]?.length} resources
              </span>
            </div>

            {/* Video Tutorials Section */}
            {selectedCategory === 'tutorials' && (
              <>
                {/* Platform Categories */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6 flex items-center">
                    <Play className="w-5 h-5 text-red-500 mr-2" />
                    Video Tutorials by Platform
                  </h3>
                  
                  {/* TikTok Section */}
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <svg className="w-6 h-6 mr-3 text-pink-500 drop-shadow-lg filter tiktok-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                      </svg>
                      <h4 className="text-md font-semibold text-gray-900 dark:text-white">TikTok - Quick Tips</h4>
                      <span className="ml-3 px-2 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-400 rounded-full text-xs">
                        Short Form
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {resources[selectedCategory as keyof typeof resources]
                        ?.filter(resource => (resource as any).platform === 'TikTok')
                        .map((resource) => (
                          <div
                            key={(resource as any).videoId}
                            className="group bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden shadow-3d dark:shadow-dark-3d hover:shadow-3d-hover dark:hover:shadow-dark-3d-hover transition-all duration-300 transform hover:scale-105"
                          >
                            {/* Video Thumbnail */}
                            <div className="relative aspect-video bg-gray-200 dark:bg-gray-600 overflow-hidden">
                              <img
                                src={(resource as any).thumbnail}
                                alt={resource.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors duration-300">
                                <div className="w-12 h-12 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                  <Play className="w-4 h-4 text-pink-600 dark:text-pink-400 ml-1" />
                                </div>
                              </div>
                              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                {resource.duration}
                              </div>
                            </div>
                            <div className="p-3">
                              <h5 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-200">
                                {resource.title}
                              </h5>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                {resource.description}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* YouTube Section */}
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <div className="relative">
                        <svg className="w-6 h-6 mr-3 text-red-600 dark:text-red-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                        <div className="absolute inset-0 w-6 h-6 mr-3 bg-red-600 dark:bg-red-500 rounded-full opacity-20 dark:opacity-40 blur-sm"></div>
                      </div>
                      <h4 className="text-md font-semibold text-gray-900 dark:text-white">YouTube - Deep Dives</h4>
                      <span className="ml-3 px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 rounded-full text-xs">
                        Long Form
                      </span>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {resources[selectedCategory as keyof typeof resources]
                        ?.filter(resource => (resource as any).platform === 'YouTube')
                        .map((resource) => (
                          <div
                            key={(resource as any).videoId}
                            className="group bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden shadow-3d dark:shadow-dark-3d hover:shadow-3d-hover dark:hover:shadow-dark-3d-hover transition-all duration-300 transform hover:scale-105"
                          >
                            <div className="relative aspect-video bg-gray-200 dark:bg-gray-600 overflow-hidden">
                              <img
                                src={(resource as any).thumbnail}
                                alt={resource.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors duration-300">
                                <div className="w-16 h-16 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                  <Play className="w-6 h-6 text-red-600 dark:text-red-400 ml-1" />
                                </div>
                              </div>
                              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                {resource.duration}
                              </div>
                            </div>
                            <div className="p-4">
                              <h5 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-200">
                                {resource.title}
                              </h5>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {resource.description}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* LinkedIn Section */}
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <div className="relative">
                        <svg className="w-6 h-6 mr-3 text-blue-700 dark:text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        <div className="absolute inset-0 w-6 h-6 mr-3 bg-blue-700 dark:bg-blue-400 rounded-sm opacity-20 dark:opacity-40 blur-sm"></div>
                      </div>
                      <h4 className="text-md font-semibold text-gray-900 dark:text-white">LinkedIn - Professional</h4>
                      <span className="ml-3 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full text-xs">
                        B2B Focus
                      </span>
                    </div>
                    <div className="space-y-3">
                      {resources[selectedCategory as keyof typeof resources]
                        ?.filter(resource => (resource as any).platform === 'LinkedIn')
                        .map((resource) => (
                          <div
                            key={(resource as any).videoId}
                            className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 cursor-pointer transition-all duration-200 shadow-3d dark:shadow-dark-3d hover:shadow-3d-hover dark:hover:shadow-dark-3d-hover group"
                          >
                            <div className="relative w-20 h-12 bg-gray-200 dark:bg-gray-600 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                              <img
                                src={(resource as any).thumbnail}
                                alt={resource.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                <div className="w-5 h-5 bg-white/90 rounded-full flex items-center justify-center">
                                  <Play className="w-2.5 h-2.5 text-blue-600 ml-0.5" />
                                </div>
                              </div>
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                                {resource.title}
                              </h5>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{resource.description}</p>
                              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                                <Clock className="w-3 h-3 mr-1" />
                                {resource.duration}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Twitter/X Placeholder */}
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <div className="relative">
                        <svg className="w-6 h-6 mr-3 text-black dark:text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                        <div className="absolute inset-0 w-6 h-6 mr-3 bg-gray-800 dark:bg-white rounded-full opacity-0 dark:opacity-30 blur-sm"></div>
                      </div>
                      <h4 className="text-md font-semibold text-gray-900 dark:text-white">X (Twitter) - Updates</h4>
                      <span className="ml-3 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-400 rounded-full text-xs">
                        Real-time
                      </span>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
                      <div className="text-gray-600 dark:text-gray-400 text-sm">
                        <p className="mb-2">Follow us for daily tips, alerts, and industry updates:</p>
                        <ul className="space-y-1 text-left max-w-xs mx-auto">
                          <li>• Daily GovCon Tips</li>
                          <li>• Weekly Opportunity Alerts</li>
                          <li>• Industry News & Updates</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Regular Resources for Other Categories */}
            {selectedCategory !== 'tutorials' && (
              <>
            {/* Featured Resources */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                <Star className="w-5 h-5 text-yellow-500 mr-2" />
                Featured Resources
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resources[selectedCategory as keyof typeof resources]
                  ?.filter(resource => resource.featured)
                  .map((resource, index) => {
                    const TypeIcon = getTypeIcon(resource.type);
                    return (
                      <div
                        key={resource.title}
                        onClick={() => handleResourceClick(resource, index + 1)}
                        className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-purple-300 dark:hover:border-purple-600 cursor-pointer transition-all duration-200 shadow-3d dark:shadow-dark-3d hover:shadow-3d-hover dark:hover:shadow-dark-3d-hover transform hover:scale-105"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center">
                            <TypeIcon className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" />
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                              {resource.type}
                            </span>
                          </div>
                          <ExternalLink className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{resource.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{resource.description}</p>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="w-3 h-3 mr-1" />
                          {resource.duration}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* All Resources */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">All Resources</h3>
              <div className="space-y-3">
                {resources[selectedCategory as keyof typeof resources]?.map((resource, index) => {
                  const TypeIcon = getTypeIcon(resource.type);
                  return (
                    <div
                      key={resource.title}
                      onClick={() => handleResourceClick(resource, index + 1)}
                      className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-purple-300 dark:hover:border-purple-600 cursor-pointer transition-all duration-200 shadow-3d dark:shadow-dark-3d hover:shadow-3d-hover dark:hover:shadow-dark-3d-hover"
                    >
                      <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg mr-4 shadow-3d dark:shadow-dark-3d">
                        <TypeIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <h4 className="font-medium text-gray-900 dark:text-white mr-2">{resource.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                            {resource.type}
                          </span>
                          {resource.featured && <Star className="w-4 h-4 text-yellow-500 ml-2" />}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{resource.description}</p>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="w-3 h-3 mr-1" />
                          {resource.duration}
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    </div>
                  );
                })}
              </div>
            </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Info Modal for Set-Aside Programs */}
      {showInfoModal && selectedResource && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-end p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 w-full max-w-md mt-16 mr-8 shadow-2xl dark:shadow-dark-3d-hover overflow-hidden">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold mb-1">
                    {selectedResource.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium">
                      {selectedResource.type}
                    </span>
                    <span className="text-sm opacity-90">
                      {selectedResource.duration}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowInfoModal(false)}
                  aria-label="Close modal"
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-4 max-h-[60vh] overflow-y-auto">
              <div className="space-y-4">
                {/* Program Details */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                    <Award className="w-4 h-4 mr-2 text-purple-600" />
                    Program Overview
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {getSetAsideDetails(selectedResource.title).overview}
                  </p>
                </div>

                {/* Eligibility */}
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Eligibility Requirements
                  </h4>
                  <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                    {getSetAsideDetails(selectedResource.title).eligibility.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                  <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2 flex items-center">
                    <Star className="w-4 h-4 mr-2" />
                    Key Benefits
                  </h4>
                  <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                    {getSetAsideDetails(selectedResource.title).benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Next Steps */}
                <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                  <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2 flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2" />
                    Getting Started
                  </h4>
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    {getSetAsideDetails(selectedResource.title).nextSteps}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
              <div className="flex flex-col gap-2">
                <button
                  onClick={async () => {
                    setShowInfoModal(false);
                    if (selectedResource.url) {
                      await trackExternalClick(selectedResource.url, `learning center ${selectedCategory} modal`, 1);
                      window.open(selectedResource.url, '_blank', 'noopener,noreferrer');
                    }
                  }}
                  className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Learn More on SBA.gov
                </button>
                <button
                  onClick={() => setShowInfoModal(false)}
                  className="flex items-center justify-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ChatBot */}
      {showChatBot && (
        <ChatBot onClose={() => setShowChatBot(false)} />
      )}
    </div>
  );
};

export default LearningCenter;