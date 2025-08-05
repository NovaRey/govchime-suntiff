/**
 * AI-powered title enhancement service for federal contract opportunities
 * Analyzes NAICS codes, descriptions, and scope of work to generate clearer titles
 * Enhanced version with better preservation of original meaning and SAM.gov compliance
 */

export interface ContractData {
  description: string;
  naicsCode?: string;
  naicsDescription?: string;
  agency: string;
  amount?: number;
  setAside?: string;
}

export interface EnhancedTitle {
  original: string;
  enhanced: string;
  confidence: number;
  category: string;
  keywords: string[];
  preservationScore: number; // How well we preserved original meaning
  samCompliance: boolean; // Whether enhancement maintains SAM.gov intent
}

// NAICS code mapping for better categorization
const naicsCategories: Record<string, string> = {
  '11': 'Agriculture & Forestry',
  '21': 'Mining & Extraction',
  '22': 'Utilities',
  '23': 'Construction',
  '31': 'Manufacturing',
  '32': 'Manufacturing',
  '33': 'Manufacturing',
  '42': 'Wholesale Trade',
  '44': 'Retail Trade',
  '45': 'Retail Trade',
  '48': 'Transportation',
  '49': 'Transportation',
  '51': 'Information Technology',
  '52': 'Finance & Insurance',
  '53': 'Real Estate',
  '54': 'Professional Services',
  '55': 'Management Services',
  '56': 'Administrative Services',
  '61': 'Educational Services',
  '62': 'Healthcare',
  '71': 'Arts & Entertainment',
  '72': 'Accommodation & Food',
  '81': 'Other Services',
  '92': 'Public Administration'
};

// Common contract types and their enhanced descriptions
const contractTypePatterns = [
  {
    pattern: /maintenance|repair|service/i,
    category: 'Maintenance & Support',
    template: '{category} Services for {agency}'
  },
  {
    pattern: /software|system|application|IT|technology/i,
    category: 'Technology Solutions',
    template: '{category} Development & Implementation'
  },
  {
    pattern: /construction|building|facility|infrastructure/i,
    category: 'Construction & Infrastructure',
    template: '{category} Project for {agency}'
  },
  {
    pattern: /research|study|analysis|evaluation/i,
    category: 'Research & Analysis',
    template: '{category} Services for {agency}'
  },
  {
    pattern: /training|education|learning/i,
    category: 'Training & Education',
    template: '{category} Program Development'
  },
  {
    pattern: /security|protection|defense/i,
    category: 'Security & Defense',
    template: '{category} Solutions & Services'
  },
  {
    pattern: /consulting|advisory|management/i,
    category: 'Consulting Services',
    template: '{category} for {agency}'
  },
  {
    pattern: /medical|health|healthcare|clinical/i,
    category: 'Healthcare Services',
    template: '{category} Solutions & Support'
  }
];

/**
 * Analyzes contract description and extracts key information
 */
function analyzeContractScope(description: string): {
  keywords: string[];
  contractType: string;
  complexity: 'simple' | 'moderate' | 'complex';
} {
  const keywords = description
    .toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 3)
    .filter(word => !['and', 'the', 'for', 'with', 'that', 'this', 'will', 'are', 'were', 'have', 'been'].includes(word))
    .slice(0, 10);

  // Determine contract type
  let contractType = 'General Services';
  for (const pattern of contractTypePatterns) {
    if (pattern.pattern.test(description)) {
      contractType = pattern.category;
      break;
    }
  }

  // Determine complexity based on description length and technical terms
  const techTerms = ['system', 'software', 'technology', 'infrastructure', 'implementation', 'integration', 'development'];
  const techCount = techTerms.filter(term => description.toLowerCase().includes(term)).length;
  
  let complexity: 'simple' | 'moderate' | 'complex' = 'simple';
  if (description.length > 500 || techCount > 2) {
    complexity = 'complex';
  } else if (description.length > 200 || techCount > 0) {
    complexity = 'moderate';
  }

  return { keywords, contractType, complexity };
}

/**
 * Gets category from NAICS code
 */
function getNAICSCategory(naicsCode?: string): string {
  if (!naicsCode) return 'General Services';
  
  const prefix = naicsCode.substring(0, 2);
  return naicsCategories[prefix] || 'Specialized Services';
}

/**
 * Enhances contract title using AI-like analysis
 */
export function enhanceContractTitle(contract: ContractData): EnhancedTitle {
  const { description, naicsCode, naicsDescription, agency, amount, setAside } = contract;
  
  // Analyze the scope of work
  const analysis = analyzeContractScope(description);
  const naicsCategory = getNAICSCategory(naicsCode);
  
  // Extract agency name (simplified)
  const agencyShort = agency.split(' ').slice(0, 3).join(' ');
  
  // Generate enhanced title based on analysis
  let enhancedTitle = '';
  let confidence = 0.7; // Base confidence
  
  // Title enhancement logic
  if (analysis.contractType !== 'General Services') {
    // Use identified contract type
    enhancedTitle = `${analysis.contractType}`;
    confidence += 0.1;
    
    // Add NAICS category if different
    if (naicsCategory !== 'General Services' && !enhancedTitle.includes(naicsCategory.split(' ')[0])) {
      enhancedTitle += ` - ${naicsCategory}`;
    }
    
    // Add complexity indicator for complex projects
    if (analysis.complexity === 'complex') {
      enhancedTitle += ' (Multi-Phase)';
    }
    
    // Add agency context
    enhancedTitle += ` for ${agencyShort}`;
    
  } else {
    // Fallback to NAICS-based title
    enhancedTitle = `${naicsCategory} Contract`;
    
    if (naicsDescription && naicsDescription.length < 50) {
      enhancedTitle = naicsDescription;
      confidence += 0.1;
    }
    
    enhancedTitle += ` - ${agencyShort}`;
  }
  
  // Add value indicator for high-value contracts
  if (amount && amount > 1000000) {
    enhancedTitle += ' (High-Value)';
    confidence += 0.05;
  }
  
  // Add set-aside indicator
  if (setAside && setAside !== 'None') {
    enhancedTitle += ` [${setAside}]`;
  }
  
  // Ensure title isn't too long
  if (enhancedTitle.length > 80) {
    enhancedTitle = enhancedTitle.substring(0, 77) + '...';
  }
  
  // Calculate preservation score and SAM compliance
  const originalWords = new Set(description.toLowerCase().split(/\s+/));
  const enhancedWords = new Set(enhancedTitle.toLowerCase().split(/\s+/));
  const commonWords = [...originalWords].filter(word => enhancedWords.has(word));
  const preservationScore = commonWords.length / originalWords.size;
  
  // SAM.gov compliance check - ensure we haven't changed core meaning
  const samCompliance = preservationScore >= 0.6 && 
                       enhancedTitle.length <= description.length * 1.5 &&
                       enhancedTitle.length >= description.length * 0.8;
  
  // Adjust confidence based on available data and compliance
  if (naicsCode) confidence += 0.1;
  if (naicsDescription) confidence += 0.1;
  if (amount) confidence += 0.05;
  if (samCompliance) confidence += 0.1;
  if (preservationScore >= 0.8) confidence += 0.1;
  
  confidence = Math.min(confidence, 0.95); // Cap at 95%
  
  return {
    original: description.substring(0, 100) + (description.length > 100 ? '...' : ''),
    enhanced: enhancedTitle,
    confidence,
    category: analysis.contractType,
    keywords: analysis.keywords,
    preservationScore,
    samCompliance
  };
}

/**
 * Batch enhance multiple contract titles
 */
export function enhanceMultipleContractTitles(contracts: ContractData[]): EnhancedTitle[] {
  return contracts.map(contract => enhanceContractTitle(contract));
}

/**
 * Get contract insights for better understanding
 */
export function getContractInsights(contract: ContractData): {
  riskLevel: 'low' | 'medium' | 'high';
  competitiveness: 'low' | 'medium' | 'high';
  recommendations: string[];
} {
  const analysis = analyzeContractScope(contract.description);
  
  // Determine risk level
  let riskLevel: 'low' | 'medium' | 'high' = 'low';
  if (analysis.complexity === 'complex' || (contract.amount && contract.amount > 10000000)) {
    riskLevel = 'high';
  } else if (analysis.complexity === 'moderate' || (contract.amount && contract.amount > 1000000)) {
    riskLevel = 'medium';
  }
  
  // Determine competitiveness
  let competitiveness: 'low' | 'medium' | 'high' = 'medium';
  if (contract.setAside && contract.setAside !== 'None') {
    competitiveness = 'low'; // Set-asides are typically less competitive
  } else if (analysis.contractType === 'Technology Solutions' || analysis.contractType === 'Consulting Services') {
    competitiveness = 'high'; // Tech and consulting are highly competitive
  }
  
  // Generate recommendations
  const recommendations: string[] = [];
  
  if (riskLevel === 'high') {
    recommendations.push('Consider partnering with experienced contractors');
    recommendations.push('Ensure robust project management capabilities');
  }
  
  if (competitiveness === 'high') {
    recommendations.push('Develop a strong technical approach');
    recommendations.push('Highlight relevant past performance');
  }
  
  if (contract.setAside) {
    recommendations.push(`Leverage ${contract.setAside} set-aside advantage`);
  }
  
  if (analysis.complexity === 'complex') {
    recommendations.push('Break down into manageable phases');
    recommendations.push('Invest in detailed requirement analysis');
  }
  
  return {
    riskLevel,
    competitiveness,
    recommendations
  };
}
