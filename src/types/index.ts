export interface ContractAward {
  id: string;
  awardDate: string;
  agency: string;
  vendor: string;
  description: string;
  amount: number;
  naicsCode: string;
  naicsDescription: string;
  setAside?: string;
  location: {
    state: string;
    city: string;
  };
  type: 'contract' | 'grant' | 'other';
}

export interface SpendingData {
  state: string;
  totalSpending: number;
  averageAward: number;
  contractCount: number;
  topAgencies: string[];
}

export interface SetAsideData {
  type: 'WOSB' | 'SDVOSB' | '8(a)' | 'HubZone' | 'SDB';
  description: string;
  totalValue: number;
  contractCount: number;
  growthRate: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  tier: 'free' | 'pro';
  preferences: {
    naicsCodes: string[];
    states: string[];
    agencies: string[];
  };
}

export interface NAICSSpendingData {
  code: string;
  description: string;
  totalSpending2025: number;
  totalSpending2024: number;
  contractCount2025: number;
  contractCount2024: number;
  growthRate: number;
  topAgencies: string[];
}

export interface Awardee {
  id: string;
  name: string;
  uei: string;
  cageCode: string;
  hqCountry: string;
  hqState: string;
  hqCity: string;
  founded: number | null;
  totalPYAwards: number;
  businessType: string[];
}