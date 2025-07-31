import React, { useState } from 'react';
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
  const [selectedCategory, setSelectedCategory] = useState<string>('getting-started');
  const [showChatBot, setShowChatBot] = useState(false);

  const categories = [
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
      id: 'set-asides',
      name: 'Set-Aside Programs',
      icon: Award,
      description: 'Small business contracting opportunities',
      color: 'text-purple-600 dark:text-purple-400'
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
        title: '8(a) Business Development Program',
        description: 'Nine-year program for disadvantaged businesses',
        type: 'guide',
        duration: '25 min read',
        url: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/8a-business-development-program',
        featured: true
      },
      {
        title: 'HubZone Certification',
        description: 'Historically underutilized business zones',
        type: 'guide',
        duration: '20 min read',
        url: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/hubzone-program',
        featured: false
      },
      {
        title: 'Service Disabled Veteran (SDVOSB)',
        description: 'Service-disabled veteran-owned small business certification',
        type: 'guide',
        duration: '18 min read',
        url: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/service-disabled-veteran-owned-small-businesses-program',
        featured: true
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

  const handleResourceClick = async (resource: any, position: number) => {
    if (resource.url) {
      await trackExternalClick(resource.url, `learning center ${selectedCategory}`, position);
      window.open(resource.url, '_blank', 'noopener,noreferrer');
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
        {/* Category Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-3d dark:shadow-dark-3d">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Categories</h2>
            <div className="space-y-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 text-left group ${
                      selectedCategory === category.id
                        ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 shadow-3d dark:shadow-dark-3d'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mr-3 ${category.color}`} />
                    <div className="flex-1">
                      <h3 className="font-medium">{category.name}</h3>
                      <p className="text-xs opacity-75">{category.description}</p>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-all duration-300 ${
                      selectedCategory === category.id 
                        ? 'text-purple-600 dark:text-purple-400 transform rotate-45 scale-110' 
                        : 'text-gray-400 group-hover:text-orange-500 group-hover:transform group-hover:rotate-45 group-hover:scale-110'
                    }`} />
                  </button>
                );
              })}
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
                      <svg className="w-6 h-6 mr-3 text-pink-500 drop-shadow-lg filter" viewBox="0 0 24 24" fill="currentColor" style={{filter: 'drop-shadow(0 0 8px rgba(236, 72, 153, 0.4))'}}>
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

      {/* ChatBot */}
      {showChatBot && (
        <ChatBot onClose={() => setShowChatBot(false)} />
      )}
    </div>
  );
};

export default LearningCenter;