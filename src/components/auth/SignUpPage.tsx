import React, { useState, useEffect } from 'react';
import { Crown, X, Mail, Star, Save, Bell, Zap, CheckCircle, ArrowRight, ArrowLeft, Sparkles, Building2, Code, Shield } from 'lucide-react';

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

type SignUpMode = 'basic' | 'pro';

const SignUpPage: React.FC = () => {
  const [signUpMode, setSignUpMode] = useState<SignUpMode>('basic');
  const [currentStep, setCurrentStep] = useState(1);
  const [showModal, setShowModal] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [aiOpportunities, setAiOpportunities] = useState<AIOpportunity[]>([]);
  const [showOpportunities, setShowOpportunities] = useState(false);
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

        const relevantOpportunities = opportunityPool.filter(opp => {
          if (formData.industry === 'technology') return true;
          if (formData.industry === 'defense' && opp.agency.includes('Defense')) return true;
          if (formData.industry === 'healthcare' && opp.title.includes('Health')) return true;
          return Math.random() > 0.5;
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
    if (signUpMode === 'basic') {
      if (!formData.email) {
        alert('Please enter your email address');
        return;
      }
      console.log('Basic signup:', { email: formData.email });
      alert('Thank you! You\'ll receive contract notifications at your email.');
      setShowModal(false);
    } else {
      if (!formData.email || !formData.firstName || !formData.lastName) {
        alert('Please fill in all required fields');
        return;
      }
      console.log('Pro signup data:', formData);
      alert('Welcome to GovChime Pro! Your account has been created.');
      setShowModal(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    window.history.back();
  };

  if (!showModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-h-[85vh] overflow-y-auto ${
        signUpMode === 'basic' ? 'max-w-lg' : 'max-w-2xl'
      }`}>
        {/* Header with Close Button */}
        <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Crown className="w-5 h-5" />
              <h2 className="text-lg font-bold">Join GovChime</h2>
            </div>
            <button
              onClick={handleCloseModal}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              title="Close signup modal"
              aria-label="Close signup modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {signUpMode === 'basic' ? (
          /* Basic Signup Form */
          <div className="p-6">
            <div className="text-center mb-6">
              <Mail className="w-12 h-12 text-orange-500 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Stay Updated on Contract Opportunities
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Get email notifications about relevant government contracts and opportunities
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-lg"
                  placeholder="your.email@company.com"
                  required
                />
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">What you'll get:</h4>
                <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    Weekly contract opportunity digest
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    Industry-specific notifications
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    Market insights and trends
                  </li>
                </ul>
              </div>

              <div className="flex flex-col space-y-3">
                <button
                  onClick={handleSubmit}
                  className="w-full px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                >
                  Get Email Updates
                </button>
                <button
                  onClick={() => setSignUpMode('pro')}
                  className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-xl transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.02] flex items-center justify-center space-x-2"
                >
                  <Crown className="w-4 h-4" />
                  <span>Upgrade to Pro Features</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Pro Signup Workflow */
          <div>
            {/* AI Opportunities Alert */}
            {showOpportunities && (
              <div className="m-3 mb-2 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 shadow-lg animate-pulse">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <Bell className="w-5 h-5 text-red-500 animate-bounce" />
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center">
                      <Zap className="w-4 h-4 text-yellow-500 mr-2" />
                      AI-Discovered Opportunities
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">
                      Found {aiOpportunities.length} potential matches:
                    </p>
                    <div className="space-y-2">
                      {aiOpportunities.map((opportunity, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700 shadow-sm">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 dark:text-white text-sm">{opportunity.title}</h4>
                              <p className="text-xs text-gray-600 dark:text-gray-300">{opportunity.agency}</p>
                            </div>
                            <div className="text-right ml-3">
                              <p className="font-semibold text-green-600 dark:text-green-400 text-sm">{opportunity.value}</p>
                              <p className="text-xs text-gray-500">{opportunity.deadline}</p>
                              {opportunity.isNew && (
                                <span className="inline-block bg-red-100 text-red-800 text-xs px-1 py-0.5 rounded-full mt-1">
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

            {/* Progress Indicator */}
            <div className="px-3 py-2">
              <div className="flex items-center justify-between mb-3">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <button
                      onClick={() => handleStepClick(step)}
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-semibold transition-all duration-300 transform hover:scale-110 shadow-lg text-xs ${
                        step <= currentStep 
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-orange-500/30' 
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'
                      } ${step === currentStep ? 'ring-2 ring-orange-500/30 scale-110' : ''}`}
                    >
                      {step < currentStep ? <CheckCircle className="w-3 h-3" /> : step}
                    </button>
                    {step < 4 && (
                      <div className={`w-12 h-1 mx-2 transition-all duration-500 ${
                        step < currentStep ? 'bg-gradient-to-r from-orange-500 to-orange-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-300 mx-3 mb-3 ${isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
              {currentStep === 1 && (
                <div className="p-4">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                    Let's start with the basics
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                <div className="p-4">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                    What industry are you in?
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                    This helps us show you the most relevant contract opportunities
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {industries.map((industry) => (
                      <div
                        key={industry.value}
                        onClick={() => handleInputChange('industry', industry.value)}
                        className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                          formData.industry === industry.value
                            ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-600'
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          <span className="text-lg">{industry.icon}</span>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                              {industry.label}
                            </h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
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
                <div className="p-4">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                    Business Information
                  </h2>
                  <div className="space-y-4">
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
                <div className="p-4">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                    Customize Your Experience
                  </h2>
                  
                  <div className="mb-4">
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
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm ${
                      currentStep === 1
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm hover:shadow-md transform hover:scale-[1.02]'
                    }`}
                  >
                    <ArrowLeft className="w-3 h-3" />
                    <span>Previous</span>
                  </button>

                  <button
                    onClick={() => setSignUpMode('basic')}
                    className="px-3 py-1.5 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors font-medium text-xs"
                  >
                    ← Back to Basic Signup
                  </button>

                  {currentStep === 4 ? (
                    <button
                      onClick={handleSubmit}
                      className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 hover:from-orange-600 hover:via-orange-700 hover:to-red-700 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] font-semibold text-sm"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Create My Pro Account</span>
                    </button>
                  ) : (
                    <button
                      onClick={nextStep}
                      className="flex items-center space-x-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.02] text-sm"
                    >
                      <span>Next</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
