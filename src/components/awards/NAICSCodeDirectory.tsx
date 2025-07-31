import React, { useState, useMemo } from 'react';
import { Search, ExternalLink, BookOpen, Building2, Wrench, Cpu, Truck, Heart, Leaf, Users } from 'lucide-react';

interface NAICSCode {
  code: string;
  title: string;
  description: string;
  examples: string[];
  category: string;
  icon: React.ComponentType<any>;
  color: string;
  setAsideEligible: boolean;
  commonAgencies: string[];
  averageContractSize: string;
}

interface NAICSCodeDirectoryProps {
  searchTerm: string;
}

const NAICSCodeDirectory: React.FC<NAICSCodeDirectoryProps> = ({ searchTerm }) => {
  const [selectedCode, setSelectedCode] = useState<NAICSCode | null>(null);

  const naicsCodes: NAICSCode[] = [
    {
      code: '541511',
      title: 'Custom Computer Programming Services',
      description: 'This industry comprises establishments primarily engaged in writing, modifying, testing, and supporting software to meet the needs of a particular customer.',
      examples: ['Software development', 'Custom application programming', 'Web application development', 'Mobile app development'],
      category: 'Technology',
      icon: Cpu,
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400',
      setAsideEligible: true,
      commonAgencies: ['Department of Defense', 'Department of Homeland Security', 'GSA'],
      averageContractSize: '$2.8B annually'
    },
    {
      code: '541512',
      title: 'Computer Systems Design Services',
      description: 'This industry comprises establishments primarily engaged in planning and designing computer systems that integrate computer hardware, software, and communication technologies.',
      examples: ['Systems integration', 'Network design', 'IT consulting', 'Enterprise architecture'],
      category: 'Technology',
      icon: Cpu,
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400',
      setAsideEligible: true,
      commonAgencies: ['Department of Defense', 'CIA', 'Department of Veterans Affairs'],
      averageContractSize: '$2.2B annually'
    },
    {
      code: '561210',
      title: 'Facilities Support Services',
      description: 'This industry comprises establishments primarily engaged in providing operating staff to perform a combination of support services within a client\'s facilities.',
      examples: ['Building maintenance', 'Janitorial services', 'Security services', 'Food service management'],
      category: 'Support Services',
      icon: Building2,
      color: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400',
      setAsideEligible: true,
      commonAgencies: ['GSA', 'Department of Defense', 'Department of Veterans Affairs'],
      averageContractSize: '$1.9B annually'
    },
    {
      code: '237310',
      title: 'Highway, Street, and Bridge Construction',
      description: 'This industry comprises establishments primarily engaged in the construction of highways, streets, roads, bridges, and tunnels.',
      examples: ['Road construction', 'Bridge building', 'Highway maintenance', 'Traffic infrastructure'],
      category: 'Construction',
      icon: Wrench,
      color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400',
      setAsideEligible: true,
      commonAgencies: ['Department of Transportation', 'Army Corps of Engineers', 'GSA'],
      averageContractSize: '$1.65B annually'
    },
    {
      code: '541330',
      title: 'Engineering Services',
      description: 'This industry comprises establishments primarily engaged in applying physical laws and principles of engineering in the design, development, and utilization of machines, materials, instruments, structures, processes, and systems.',
      examples: ['Civil engineering', 'Mechanical engineering', 'Electrical engineering', 'Environmental engineering'],
      category: 'Professional Services',
      icon: Wrench,
      color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400',
      setAsideEligible: true,
      commonAgencies: ['Department of Defense', 'Department of Transportation', 'NASA'],
      averageContractSize: '$1.45B annually'
    },
    {
      code: '541611',
      title: 'Administrative Management Consulting Services',
      description: 'This industry comprises establishments primarily engaged in providing operating advice and assistance to businesses and other organizations on administrative management issues.',
      examples: ['Management consulting', 'Business process improvement', 'Organizational development', 'Strategic planning'],
      category: 'Professional Services',
      icon: Users,
      color: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-400',
      setAsideEligible: true,
      commonAgencies: ['Department of Defense', 'Department of Health and Human Services', 'GSA'],
      averageContractSize: '$1.2B annually'
    },
    {
      code: '339112',
      title: 'Surgical and Medical Instrument Manufacturing',
      description: 'This industry comprises establishments primarily engaged in manufacturing medical, surgical, ophthalmic, and veterinary instruments and apparatus.',
      examples: ['Surgical instruments', 'Medical devices', 'Diagnostic equipment', 'Hospital supplies'],
      category: 'Healthcare',
      icon: Heart,
      color: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400',
      setAsideEligible: true,
      commonAgencies: ['Department of Veterans Affairs', 'Department of Defense', 'NIH'],
      averageContractSize: '$1.1B annually'
    },
    {
      code: '541714',
      title: 'Research and Development in Biotechnology',
      description: 'This industry comprises establishments primarily engaged in conducting biotechnology research and experimental development.',
      examples: ['Biomedical research', 'Pharmaceutical development', 'Genetic research', 'Clinical trials'],
      category: 'Research & Development',
      icon: Leaf,
      color: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400',
      setAsideEligible: true,
      commonAgencies: ['NIH', 'CDC', 'Department of Defense'],
      averageContractSize: '$980M annually'
    },
    {
      code: '336411',
      title: 'Aircraft Manufacturing',
      description: 'This industry comprises establishments primarily engaged in manufacturing or assembling complete aircraft.',
      examples: ['Military aircraft', 'Commercial aircraft', 'Aircraft components', 'Aerospace systems'],
      category: 'Manufacturing',
      icon: Truck,
      color: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-400',
      setAsideEligible: false,
      commonAgencies: ['Department of Defense', 'NASA', 'Coast Guard'],
      averageContractSize: '$950M annually'
    },
    {
      code: '541519',
      title: 'Other Computer Related Services',
      description: 'This industry comprises establishments primarily engaged in providing computer related services (except custom programming, systems integration design, and facilities management services).',
      examples: ['Computer training', 'Computer disaster recovery', 'Software installation', 'Computer maintenance'],
      category: 'Technology',
      icon: Cpu,
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400',
      setAsideEligible: true,
      commonAgencies: ['Department of Homeland Security', 'GSA', 'Department of Defense'],
      averageContractSize: '$850M annually'
    }
  ];

  const filteredCodes = useMemo(() => {
    if (!searchTerm) return naicsCodes;
    
    const term = searchTerm.toLowerCase();
    return naicsCodes.filter(code => 
      code.code.includes(term) ||
      code.title.toLowerCase().includes(term) ||
      code.description.toLowerCase().includes(term) ||
      code.examples.some(example => example.toLowerCase().includes(term)) ||
      code.category.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  const handleCodeClick = (code: NAICSCode) => {
    setSelectedCode(selectedCode?.code === code.code ? null : code);
  };

  return (
    <div className="space-y-4">
      {/* Educational Info Box */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
              📚 What are NAICS Codes?
            </h4>
            <p className="text-sm text-blue-800 dark:text-blue-300 mb-3">
              NAICS (North American Industry Classification System) codes classify businesses by their primary activity. 
              Federal agencies use these codes to categorize contract opportunities and determine small business set-aside eligibility.
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://www.census.gov/naics/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1 bg-blue-600 dark:bg-blue-500 text-white text-xs rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                Official NAICS Manual
              </a>
              <a
                href="https://www.sba.gov/federal-contracting/contracting-guide/size-standards"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1 bg-green-600 dark:bg-green-500 text-white text-xs rounded-full hover:bg-green-700 dark:hover:bg-green-600 transition-colors"
              >
                <Users className="w-3 h-3 mr-1" />
                SBA Guidance
              </a>
              <a
                href="https://sam.gov/search/?index=opp&is_active=true"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1 bg-purple-600 dark:bg-purple-500 text-white text-xs rounded-full hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                Browse All Opportunities
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Showing {filteredCodes.length} of {naicsCodes.length} NAICS codes
        {searchTerm && ` for "${searchTerm}"`}
      </div>

      {/* NAICS Code List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredCodes.map((code) => {
          const Icon = code.icon;
          const isSelected = selectedCode?.code === code.code;
          
          return (
            <div key={code.code} className="space-y-0">
              {/* Main Code Card */}
              <div
                onClick={() => handleCodeClick(code)}
                className={`p-4 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer transition-all duration-200 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-md ${
                  isSelected ? 'border-purple-500 dark:border-purple-400 shadow-md' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {/* Icon */}
                    <div className={`p-2 rounded-lg ${code.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    {/* Code Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {code.code}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${code.color}`}>
                          {code.category}
                        </span>
                        {code.setAsideEligible && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                            Set-Aside Eligible
                          </span>
                        )}
                      </div>
                      
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        {code.title}
                      </h4>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {code.description}
                      </p>
                      
                      {/* Quick Stats */}
                      <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                        <span>Annual Spending: {code.averageContractSize}</span>
                        <span>•</span>
                        <span>{code.commonAgencies.length} Major Agencies</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Expand Indicator */}
                  <div className={`transform transition-transform duration-200 ${isSelected ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {isSelected && (
                <div className="border-l-4 border-purple-500 dark:border-purple-400 bg-purple-50 dark:bg-purple-900/20 p-6 rounded-r-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                          <BookOpen className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" />
                          Common Examples
                        </h5>
                        <ul className="space-y-1">
                          {code.examples.map((example, index) => (
                            <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></span>
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                          <Building2 className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" />
                          Major Contracting Agencies
                        </h5>
                        <ul className="space-y-1">
                          {code.commonAgencies.map((agency, index) => (
                            <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                              {agency}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {/* Right Column */}
                    <div className="space-y-4">
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Key Information</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">NAICS Code:</span>
                            <span className="font-mono font-semibold text-purple-600 dark:text-purple-400">{code.code}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Category:</span>
                            <span className="font-medium text-gray-900 dark:text-white">{code.category}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Set-Aside Eligible:</span>
                            <span className={`font-medium ${code.setAsideEligible ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                              {code.setAsideEligible ? 'Yes' : 'No'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Annual Spending:</span>
                            <span className="font-semibold text-green-600 dark:text-green-400">{code.averageContractSize}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                        <h5 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">💡 Pro Tip</h5>
                        <p className="text-sm text-blue-800 dark:text-blue-300">
                          {code.setAsideEligible 
                            ? `This NAICS code is eligible for small business set-aside programs. Consider getting certified for WOSB, SDVOSB, or 8(a) programs to increase your chances of winning contracts.`
                            : `This NAICS code typically involves large-scale contracts. Consider partnering with prime contractors as a subcontractor to gain experience and build past performance.`
                          }
                        </p>
                      </div>
                      
                      <div className="flex flex-col space-y-2">
                        <a
                          href={`https://sam.gov/search/?index=opp&is_active=true&page=1&sort=-modifiedDate&naics_codes[]=${code.code}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center px-4 py-2 bg-purple-600 dark:bg-purple-500 text-white rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors text-sm font-medium"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Live Opportunities on SAM.gov
                        </a>
                        <a
                          href={`https://www.naics.com/naics-code-description/?code=${code.code}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm font-medium"
                        >
                          <BookOpen className="w-4 h-4 mr-2" />
                          Official NAICS Description
                        </a>
                        <a
                          href={`https://www.sba.gov/federal-contracting/contracting-guide/size-standards`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center px-4 py-2 bg-green-600 dark:bg-green-500 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors text-sm font-medium"
                        >
                          <Users className="w-4 h-4 mr-2" />
                          SBA NAICS Guide
                        </a>
                        <a
                          href={`https://www.fpds.gov/ezsearch/search.do?indexName=awardfull&templateName=1.5.2&s=FPDS.GOV&q=NAICS_CODE:"${code.code}"`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center px-4 py-2 bg-orange-600 dark:bg-orange-500 text-white rounded-lg hover:bg-orange-700 dark:hover:bg-orange-600 transition-colors text-sm font-medium"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Past Awards (FPDS)
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* No Results */}
      {filteredCodes.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No NAICS codes found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search terms or browse all codes above.
          </p>
        </div>
      )}

      {/* Additional Educational Resources */}
      {filteredCodes.length > 0 && (
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
            🎓 Federal Contracting Educational Resources
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-2">📋 Contract Opportunities</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="https://sam.gov/search" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    SAM.gov - Active Opportunities
                  </a>
                </li>
                <li>
                  <a href="https://www.gsa.gov/buying-selling/how-gsa-buys/procurement-policy-forecast" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    GSA Procurement Forecast
                  </a>
                </li>
                <li>
                  <a href="https://www.fpds.gov" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    FPDS - Past Awards
                  </a>
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-2">🏢 Small Business Programs</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="https://www.sba.gov/federal-contracting/contracting-assistance-programs" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    SBA Contracting Programs
                  </a>
                </li>
                <li>
                  <a href="https://www.sba.gov/federal-contracting/contracting-assistance-programs/women-owned-small-business-federal-contracting-program" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    WOSB Certification
                  </a>
                </li>
                <li>
                  <a href="https://www.sba.gov/federal-contracting/contracting-assistance-programs/8a-business-development-program" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    8(a) Business Development
                  </a>
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-2">📚 Training & Resources</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="https://www.acquisition.gov/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Federal Acquisition Regulation
                  </a>
                </li>
                <li>
                  <a href="https://www.sba.gov/federal-contracting/contracting-guide" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    SBA Contracting Guide
                  </a>
                </li>
                <li>
                  <a href="https://www.gsa.gov/buying-selling/how-to-sell-to-the-government" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    How to Sell to Government
                  </a>
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-3">🎥 Video Tutorials</h5>
              <div className="space-y-4">
                {/* TikTok Section */}
                <div className="border-b border-gray-100 dark:border-gray-700 pb-3">
                  <div className="flex items-center mb-2">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    </svg>
                    <span className="font-medium text-gray-900 dark:text-white">TikTok</span>
                  </div>
                  <ul className="space-y-1 text-sm pl-6">
                    <li className="text-gray-600 dark:text-gray-400">• NAICS Codes Explained (30s)</li>
                    <li className="text-gray-600 dark:text-gray-400">• SAM.gov Registration Tips (45s)</li>
                    <li className="text-gray-600 dark:text-gray-400">• Small Biz Set-Aside Basics (60s)</li>
                  </ul>
                </div>
                
                {/* YouTube Section */}
                <div className="border-b border-gray-100 dark:border-gray-700 pb-3">
                  <div className="flex items-center mb-2">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <span className="font-medium text-gray-900 dark:text-white">YouTube</span>
                  </div>
                  <ul className="space-y-1 text-sm pl-6">
                    <li className="text-gray-600 dark:text-gray-400">• Complete NAICS Guide (12 min)</li>
                    <li className="text-gray-600 dark:text-gray-400">• Federal Bidding Walkthrough (18 min)</li>
                    <li className="text-gray-600 dark:text-gray-400">• Contract Opportunities Deep Dive (25 min)</li>
                  </ul>
                </div>
                
                {/* LinkedIn Section */}
                <div className="border-b border-gray-100 dark:border-gray-700 pb-3">
                  <div className="flex items-center mb-2">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span className="font-medium text-gray-900 dark:text-white">LinkedIn</span>
                  </div>
                  <ul className="space-y-1 text-sm pl-6">
                    <li className="text-gray-600 dark:text-gray-400">• Professional Networking for GovCon (8 min)</li>
                    <li className="text-gray-600 dark:text-gray-400">• B2B Federal Sales Strategy (15 min)</li>
                    <li className="text-gray-600 dark:text-gray-400">• Building Past Performance (10 min)</li>
                  </ul>
                </div>
                
                {/* Twitter Section */}
                <div>
                  <div className="flex items-center mb-2">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <span className="font-medium text-gray-900 dark:text-white">X (Twitter)</span>
                  </div>
                  <ul className="space-y-1 text-sm pl-6">
                    <li className="text-gray-600 dark:text-gray-400">• Daily GovCon Tips</li>
                    <li className="text-gray-600 dark:text-gray-400">• Weekly Opportunity Alerts</li>
                    <li className="text-gray-600 dark:text-gray-400">• Industry News & Updates</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-300">
              💡 <strong>Pro Tip:</strong> Click on any NAICS code above to see live opportunities, past awards, and specific guidance for that industry. 
              Make sure to register in SAM.gov and get any relevant certifications before bidding on contracts.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NAICSCodeDirectory;