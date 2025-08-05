import React, { useState, useEffect } from 'react';
import { Crown, Building2, Code, Shield, CheckCircle, ArrowRight, ArrowLeft, Sparkles, Bell, Zap } from 'lucide-react';

interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  industry: string;
  cageCode: string;
  businessType: string;
  targetAgencies: string[];
  interests: string[];
}

interface AIOpportunity {
  title: string;
  agency: string;
  value: string;
  deadline: string;
  matchReason: string;
  isNew: boolean;
}

const SignUpPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SignUpFormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    industry: '',
    cageCode: '',
    businessType: '',
    targetAgencies: [],
    interests: []
  });
  const [aiOpportunities, setAiOpportunities] = useState<AIOpportunity[]>([]);
  const [showOpportunities, setShowOpportunities] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const industries = [
    { value: 'technology', label: 'Information Technology', icon: '💻', description: 'Software, cybersecurity, cloud services' },
    { value: 'defense', label: 'Defense & Aerospace', icon: '🛡️', description: 'Military, aerospace, security systems' },
    { value: 'healthcare', label: 'Healthcare & Medical', icon: '🏥', description: 'Medical devices, pharmaceuticals, services' },
    { value: 'construction', label: 'Construction & Engineering', icon: '🏗️', description: 'Infrastructure, facilities, civil engineering' },
    { value: 'consulting', label: 'Professional Services', icon: '💼', description: 'Consulting, training, advisory services' },
    { value: 'manufacturing', label: 'Manufacturing', icon: '🏭', description: 'Equipment, supplies, industrial goods' },
    { value: 'research', label: 'Research & Development', icon: '🔬', description: 'R&D, scientific services, testing' },
    { value: 'logistics', label: 'Transportation & Logistics', icon: '🚛', description: 'Shipping, warehousing, supply chain' },
    { value: 'energy', label: 'Energy & Environment', icon: '⚡', description: 'Renewable energy, environmental services' },
    { value: 'other', label: 'Other Industries', icon: '🔧', description: 'Tell us more about your industry' }
  ];

  const businessTypes = [
    { value: 'small-business', label: 'Small Business', description: 'Under SBA size standards' },
    { value: 'wosb', label: 'Women-Owned Small Business', description: 'WOSB certified' },
    { value: 'sdvosb', label: 'Service-Disabled Veteran-Owned', description: 'SDVOSB certified' },
    { value: '8a', label: '8(a) Business Development', description: 'SBA 8(a) certified' },
    { value: 'hubzone', label: 'HubZone', description: 'Located in HubZone area' },
    { value: 'large-business', label: 'Large Business', description: 'Above SBA size standards' }
  ];

  const agencies = [
    'Department of Defense', 'Department of Health and Human Services', 'Department of Homeland Security',
    'General Services Administration', 'Department of Veterans Affairs', 'Department of Energy',
    'National Aeronautics and Space Administration', 'Department of Transportation',
    'Department of Agriculture', 'Department of Commerce'
  ];

  const contractInterests = [
    'Prime Contracts', 'Subcontracting Opportunities', 'IDIQ Contracts', 'GSA Schedule',
    'Set-Aside Contracts', 'R&D Contracts', 'Construction Projects', 'IT Services',
    'Professional Services', 'Maintenance Contracts'
  ];

  const handleInputChange = (field: keyof SignUpFormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayToggle = (field: 'targetAgencies' | 'interests', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  // AI Opportunity Detection
  useEffect(() => {
    if (formData.industry && formData.cageCode && formData.cageCode.length >= 5) {
      // Simulate AI analysis based on industry and CAGE code
      const generateOpportunities = () => {
        const opportunityPool = [
          {
            title: "IT Infrastructure Modernization Program",
            agency: "Department of Defense",
            value: "$45M",
            deadline: "45 days",
            matchReason: "Matches your IT services capability",
            isNew: true
          },
          {
            title: "Cybersecurity Assessment Services",
            agency: "Department of Homeland Security",
            value: "$12M",
            deadline: "30 days",
            matchReason: "Aligns with your CAGE code classification",
            isNew: true
          },
          {
            title: "Cloud Migration Support",
            agency: "General Services Administration",
            value: "$8.5M",
            deadline: "60 days",
            matchReason: "Perfect fit for your industry expertise",
            isNew: false
          }
        ];

        // Filter based on industry
        const relevantOpportunities = opportunityPool.filter(opp => {
          if (formData.industry === 'technology') return true;
          if (formData.industry === 'defense' && opp.agency.includes('Defense')) return true;
          if (formData.industry === 'healthcare' && opp.title.includes('Health')) return true;
          return Math.random() > 0.5; // Random relevance for demo
        });

        setAiOpportunities(relevantOpportunities.slice(0, 2));
        setShowOpportunities(true);
      };

      const timeout = setTimeout(generateOpportunities, 1500);
      return () => clearTimeout(timeout);
    }
  }, [formData.industry, formData.cageCode]);

  const handleStepClick = (step: number) => {
    if (step <= 4) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(step);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const handleSubmit = () => {
    console.log('Signup data:', formData);
    // Here you would typically submit to your backend
    alert('Welcome to GovChime Pro! Your account has been created.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-gray-900 dark:via-orange-900/10 dark:to-amber-900/20">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                <Crown className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Join GovChime Pro
            </h1>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto">
              Get personalized contract opportunities tailored to your industry and capabilities
            </p>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <button
                onClick={() => handleStepClick(step)}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 transform hover:scale-110 shadow-lg ${
                  step <= currentStep 
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-orange-500/30' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'
                } ${step === currentStep ? 'ring-4 ring-orange-500/30 scale-110' : ''}`}
              >
                {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
              </button>
              {step < 4 && (
                <div className={`w-20 h-1 mx-4 transition-all duration-500 ${
                  step < currentStep ? 'bg-gradient-to-r from-orange-500 to-orange-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}></div>
              )}
            </div>
          ))}
        </div>

        {/* AI Opportunities Alert */}
        {showOpportunities && (
          <div className="mb-8 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 shadow-lg animate-pulse">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="relative">
                  <Bell className="w-6 h-6 text-red-500 animate-bounce" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <Zap className="w-5 h-5 text-yellow-500 mr-2" />
                  AI-Discovered Opportunities
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Based on your industry and CAGE code, we found {aiOpportunities.length} potential matches:
                </p>
                <div className="space-y-3">
                  {aiOpportunities.map((opportunity, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">{opportunity.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{opportunity.agency}</p>
                          <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">{opportunity.matchReason}</p>
                        </div>
                        <div className="text-right ml-4">
                          <p className="font-semibold text-green-600 dark:text-green-400">{opportunity.value}</p>
                          <p className="text-sm text-gray-500">{opportunity.deadline}</p>
                          {opportunity.isNew && (
                            <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mt-1">
                              New!
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className={`bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-300 ${isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
          {currentStep === 1 && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Let's start with the basics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-lg"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-lg"
                    placeholder="Enter your last name"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter your email address"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter your company name"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                What industry are you in?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                This helps us show you the most relevant contract opportunities
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {industries.map((industry) => (
                  <div
                    key={industry.value}
                    onClick={() => handleInputChange('industry', industry.value)}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      formData.industry === industry.value
                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-600'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{industry.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {industry.label}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {industry.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Business Information
              </h2>
              <div className="space-y-8">
                {/* CAGE Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    CAGE Code (Optional)
                  </label>
                  <div className="relative">
                    <Code className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={formData.cageCode}
                      onChange={(e) => handleInputChange('cageCode', e.target.value.toUpperCase())}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter your CAGE code (e.g., 1ABC2)"
                      maxLength={5}
                    />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Your Commercial and Government Entity code helps us match you with relevant opportunities
                  </p>
                </div>

                {/* Business Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Business Type
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {businessTypes.map((type) => (
                      <div
                        key={type.value}
                        onClick={() => handleInputChange('businessType', type.value)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                          formData.businessType === type.value
                            ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-orange-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Shield className="w-5 h-5 text-orange-500" />
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                              {type.label}
                            </h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {type.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Customize Your Experience
              </h2>
              
              {/* Target Agencies */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                  Which agencies interest you most? (Select up to 5)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {agencies.map((agency) => (
                    <div
                      key={agency}
                      onClick={() => handleArrayToggle('targetAgencies', agency)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                        formData.targetAgencies.includes(agency)
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-orange-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Building2 className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {agency}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contract Interests */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                  What types of contracts are you interested in?
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {contractInterests.map((interest) => (
                    <div
                      key={interest}
                      onClick={() => handleArrayToggle('interests', interest)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                        formData.interests.includes(interest)
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-orange-300'
                      }`}
                    >
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {interest}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="px-8 py-6 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-200 font-medium ${
                  currentStep === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm hover:shadow-md transform hover:scale-[1.02]'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {currentStep === 4 ? (
                <button
                  onClick={handleSubmit}
                  className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 hover:from-orange-600 hover:via-orange-700 hover:to-red-700 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] font-semibold"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Create My Pro Account</span>
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  className="flex items-center space-x-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
