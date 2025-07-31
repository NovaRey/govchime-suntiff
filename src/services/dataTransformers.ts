import { SamGovOpportunity } from './samGovApi';
import { ContractAward } from '../types';

export function transformSamGovToContractAward(opportunity: SamGovOpportunity): ContractAward {
  // Parse award amount from string to number
  const parseAmount = (amountStr?: string): number => {
    if (!amountStr) return 0;
    // Remove currency symbols, commas, and convert to number
    const cleaned = amountStr.replace(/[$,]/g, '');
    return parseFloat(cleaned) || 0;
  };

  // Determine contract type based on opportunity data
  const getContractType = (opportunity: SamGovOpportunity): 'contract' | 'grant' | 'other' => {
    const title = opportunity.title?.toLowerCase() || '';
    const description = opportunity.description?.toLowerCase() || '';
    
    if (title.includes('grant') || description.includes('grant')) {
      return 'grant';
    }
    return 'contract';
  };

  // Get set-aside type
  const getSetAsideType = (setAsideDescription?: string): string | undefined => {
    if (!setAsideDescription) return undefined;
    
    const description = setAsideDescription.toLowerCase();
    if (description.includes('women') || description.includes('wosb')) return 'WOSB';
    if (description.includes('veteran') || description.includes('sdvosb')) return 'SDVOSB';
    if (description.includes('8(a)') || description.includes('8a')) return '8(a)';
    if (description.includes('hubzone')) return 'HubZone';
    if (description.includes('disadvantaged') || description.includes('sdb')) return 'SDB';
    
    return setAsideDescription;
  };

  // Get location from placeOfPerformance or officeAddress
  const getLocation = (opportunity: SamGovOpportunity) => {
    if (opportunity.placeOfPerformance?.state?.name && opportunity.placeOfPerformance?.city?.name) {
      return {
        state: opportunity.placeOfPerformance.state.name,
        city: opportunity.placeOfPerformance.city.name
      };
    }
    
    if (opportunity.officeAddress?.state && opportunity.officeAddress?.city) {
      return {
        state: opportunity.officeAddress.state,
        city: opportunity.officeAddress.city
      };
    }
    
    return {
      state: 'Unknown',
      city: 'Unknown'
    };
  };

  return {
    id: opportunity.noticeId,
    awardDate: opportunity.award?.date || opportunity.publicationDate || opportunity.postedDate,
    agency: opportunity.department || opportunity.organizationHierarchy?.toptier_name || 'Unknown Agency',
    vendor: opportunity.award?.awardee?.name || 'TBD',
    description: opportunity.title || opportunity.description || 'No description available',
    amount: parseAmount(opportunity.award?.amount),
    naicsCode: opportunity.naicsCode || opportunity.naics || '000000',
    naicsDescription: opportunity.naicsDescription || 'Not specified',
    setAside: getSetAsideType(opportunity.typeOfSetAsideDescription),
    location: getLocation(opportunity),
    type: getContractType(opportunity)
  };
}

export function transformSamGovOpportunities(opportunities: SamGovOpportunity[]): ContractAward[] {
  return opportunities
    .filter(opp => opp.noticeId) // Ensure we have valid data
    .map(transformSamGovToContractAward)
    .sort((a, b) => new Date(b.awardDate).getTime() - new Date(a.awardDate).getTime());
}