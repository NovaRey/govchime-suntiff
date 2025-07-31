import { ContractAward, SpendingData, SetAsideData } from '../types';

export const mockContractAwards: ContractAward[] = [
  {
    id: '1',
    awardDate: '2025-01-10',
    agency: 'Department of Defense',
    vendor: 'TechFlow Inc.',
    description: 'IT Support Services for Military Healthcare Systems',
    amount: 2500000,
    naicsCode: '541511',
    naicsDescription: 'Custom Computer Programming Services',
    setAside: 'SDVOSB',
    location: { state: 'Virginia', city: 'Arlington' },
    type: 'contract'
  },
  {
    id: '2',
    awardDate: '2025-01-10',
    agency: 'General Services Administration',
    vendor: 'Federal Solutions LLC',
    description: 'Facility Management and Maintenance Services',
    amount: 1800000,
    naicsCode: '561210',
    naicsDescription: 'Facilities Support Services',
    location: { state: 'Maryland', city: 'Bethesda' },
    type: 'contract'
  },
  {
    id: '3',
    awardDate: '2025-01-09',
    agency: 'Department of Homeland Security',
    vendor: 'SecureNet Technologies',
    description: 'Cybersecurity Consulting and Implementation',
    amount: 3200000,
    naicsCode: '541512',
    naicsDescription: 'Computer Systems Design Services',
    setAside: 'WOSB',
    location: { state: 'California', city: 'San Francisco' },
    type: 'contract'
  },
  {
    id: '4',
    awardDate: '2025-01-09',
    agency: 'Department of Veterans Affairs',
    vendor: 'HealthCare Innovations',
    description: 'Medical Equipment and Supplies',
    amount: 950000,
    naicsCode: '339112',
    naicsDescription: 'Surgical and Medical Instrument Manufacturing',
    setAside: '8(a)',
    location: { state: 'Texas', city: 'Austin' },
    type: 'contract'
  },
  {
    id: '5',
    awardDate: '2025-01-08',
    agency: 'Department of Energy',
    vendor: 'GreenTech Solutions',
    description: 'Renewable Energy Infrastructure Development',
    amount: 5600000,
    naicsCode: '237130',
    naicsDescription: 'Power and Communication Line Construction',
    location: { state: 'Colorado', city: 'Denver' },
    type: 'contract'
  },
  {
    id: '6',
    awardDate: '2025-01-08',
    agency: 'Small Business Administration',
    vendor: 'Business Growth Partners',
    description: 'Small Business Development Program Management',
    amount: 450000,
    naicsCode: '541611',
    naicsDescription: 'Administrative Management Consulting Services',
    setAside: 'HubZone',
    location: { state: 'Georgia', city: 'Atlanta' },
    type: 'grant'
  },
  {
    id: '7',
    awardDate: '2025-01-07',
    agency: 'Department of Transportation',
    vendor: 'Infrastructure Plus',
    description: 'Highway Construction and Repair Services',
    amount: 12500000,
    naicsCode: '237310',
    naicsDescription: 'Highway, Street, and Bridge Construction',
    location: { state: 'Florida', city: 'Miami' },
    type: 'contract'
  },
  {
    id: '8',
    awardDate: '2025-01-07',
    agency: 'National Institutes of Health',
    vendor: 'BioResearch Labs',
    description: 'Clinical Research and Data Analysis',
    amount: 2100000,
    naicsCode: '541714',
    naicsDescription: 'Research and Development in Biotechnology',
    setAside: 'WOSB',
    location: { state: 'Massachusetts', city: 'Boston' },
    type: 'grant'
  }
];

export const mockSpendingData: SpendingData[] = [
  {
    state: 'California',
    totalSpending: 125000000,
    averageAward: 2500000,
    contractCount: 50,
    topAgencies: ['Department of Defense', 'Department of Energy', 'NASA']
  },
  {
    state: 'Virginia',
    totalSpending: 98000000,
    averageAward: 1960000,
    contractCount: 50,
    topAgencies: ['Department of Defense', 'CIA', 'FBI']
  },
  {
    state: 'Texas',
    totalSpending: 87000000,
    averageAward: 1740000,
    contractCount: 50,
    topAgencies: ['Department of Defense', 'Department of Energy', 'NASA']
  },
  {
    state: 'Maryland',
    totalSpending: 76000000,
    averageAward: 1900000,
    contractCount: 40,
    topAgencies: ['NIH', 'NSA', 'CDC']
  },
  {
    state: 'Florida',
    totalSpending: 65000000,
    averageAward: 1625000,
    contractCount: 40,
    topAgencies: ['Department of Defense', 'Coast Guard', 'NOAA']
  },
  {
    state: 'New York',
    totalSpending: 58000000,
    averageAward: 1450000,
    contractCount: 40,
    topAgencies: ['Department of Homeland Security', 'GSA', 'Department of Veterans Affairs']
  },
  {
    state: 'Illinois',
    totalSpending: 52000000,
    averageAward: 1300000,
    contractCount: 40,
    topAgencies: ['Department of Defense', 'Department of Transportation', 'EPA']
  },
  {
    state: 'Pennsylvania',
    totalSpending: 48000000,
    averageAward: 1200000,
    contractCount: 40,
    topAgencies: ['Department of Defense', 'Department of Veterans Affairs', 'GSA']
  },
  {
    state: 'Ohio',
    totalSpending: 45000000,
    averageAward: 1125000,
    contractCount: 40,
    topAgencies: ['Department of Defense', 'NASA', 'Department of Energy']
  },
  {
    state: 'Georgia',
    totalSpending: 42000000,
    averageAward: 1050000,
    contractCount: 40,
    topAgencies: ['CDC', 'Department of Defense', 'GSA']
  },
  {
    state: 'North Carolina',
    totalSpending: 38000000,
    averageAward: 950000,
    contractCount: 40,
    topAgencies: ['Department of Defense', 'EPA', 'Department of Agriculture']
  },
  {
    state: 'Washington',
    totalSpending: 35000000,
    averageAward: 875000,
    contractCount: 40,
    topAgencies: ['Department of Defense', 'Department of Energy', 'NOAA']
  },
  {
    state: 'Colorado',
    totalSpending: 32000000,
    averageAward: 800000,
    contractCount: 40,
    topAgencies: ['NOAA', 'Department of Defense', 'Department of Energy']
  },
  {
    state: 'Arizona',
    totalSpending: 28000000,
    averageAward: 700000,
    contractCount: 40,
    topAgencies: ['Department of Defense', 'Department of Homeland Security', 'NASA']
  },
  {
    state: 'Massachusetts',
    totalSpending: 25000000,
    averageAward: 625000,
    contractCount: 40,
    topAgencies: ['NIH', 'Department of Defense', 'NSF']
  },
  {
    state: 'Michigan',
    totalSpending: 22000000,
    averageAward: 550000,
    contractCount: 40,
    topAgencies: ['Department of Defense', 'EPA', 'Department of Transportation']
  },
  {
    state: 'Tennessee',
    totalSpending: 20000000,
    averageAward: 500000,
    contractCount: 40,
    topAgencies: ['Department of Energy', 'Department of Defense', 'TVA']
  },
  {
    state: 'New Jersey',
    totalSpending: 18000000,
    averageAward: 450000,
    contractCount: 40,
    topAgencies: ['Department of Defense', 'EPA', 'Coast Guard']
  },
  {
    state: 'Indiana',
    totalSpending: 16000000,
    averageAward: 400000,
    contractCount: 40,
    topAgencies: ['Department of Defense', 'Department of Veterans Affairs', 'USDA']
  },
  {
    state: 'Missouri',
    totalSpending: 14000000,
    averageAward: 350000,
    contractCount: 40,
    topAgencies: ['Department of Defense', 'GSA', 'Department of Agriculture']
  },
  {
    state: 'Wisconsin',
    totalSpending: 12000000,
    averageAward: 300000,
    contractCount: 40,
    topAgencies: ['Department of Defense', 'USDA', 'EPA']
  },
  {
    state: 'Minnesota',
    totalSpending: 11000000,
    averageAward: 275000,
    contractCount: 40,
    topAgencies: ['Department of Defense', 'USDA', 'Department of Transportation']
  },
  {
    state: 'Louisiana',
    totalSpending: 10000000,
    averageAward: 250000,
    contractCount: 40,
    topAgencies: ['Coast Guard', 'Department of Defense', 'NOAA']
  },
  {
    state: 'Alabama',
    totalSpending: 9500000,
    averageAward: 237500,
    contractCount: 40,
    topAgencies: ['Department of Defense', 'NASA', 'Department of Veterans Affairs']
  },
  {
    state: 'South Carolina',
    totalSpending: 9000000,
    averageAward: 225000,
    contractCount: 40,
    topAgencies: ['Department of Defense', 'Department of Energy', 'EPA']
  },
  {
    state: 'Kentucky',
    totalSpending: 8500000,
    averageAward: 212500,
    contractCount: 40,
    topAgencies: ['Department of Defense', 'USDA', 'Department of Veterans Affairs']
  },
  {
    state: 'Oregon',
    totalSpending: 8000000,
    averageAward: 200000,
    contractCount: 40,
    topAgencies: ['Department of Defense', 'USDA', 'NOAA']
  },
  {
    state: 'Oklahoma',
    totalSpending: 7500000,
    averageAward: 187500,
    contractCount: 40,
    topAgencies: ['Department of Defense', 'USDA', 'Department of Energy']
  },
  {
    state: 'Connecticut',
    totalSpending: 7000000,
    averageAward: 175000,
    contractCount: 40,
    topAgencies: ['Department of Defense', 'Coast Guard', 'EPA']
  },
  {
    state: 'Iowa',
    totalSpending: 6500000,
    averageAward: 162500,
    contractCount: 40,
    topAgencies: ['USDA', 'Department of Defense', 'EPA']
  },
  {
    state: 'Arkansas',
    totalSpending: 6000000,
    averageAward: 150000,
    contractCount: 40,
    topAgencies: ['USDA', 'Department of Defense', 'Department of Veterans Affairs']
  },
  {
    state: 'Kansas',
    totalSpending: 5500000,
    averageAward: 137500,
    contractCount: 40,
    topAgencies: ['USDA', 'Department of Defense', 'EPA']
  },
  {
    state: 'Utah',
    totalSpending: 5000000,
    averageAward: 125000,
    contractCount: 40,
    topAgencies: ['Department of Defense', 'Department of Interior', 'EPA']
  },
  {
    state: 'Nevada',
    totalSpending: 4500000,
    averageAward: 112500,
    contractCount: 40,
    topAgencies: ['Department of Defense', 'Department of Energy', 'Department of Interior']
  },
  {
    state: 'New Mexico',
    totalSpending: 4000000,
    averageAward: 100000,
    contractCount: 40,
    topAgencies: ['Department of Defense', 'Department of Energy', 'Department of Interior']
  },
  {
    state: 'West Virginia',
    totalSpending: 3500000,
    averageAward: 87500,
    contractCount: 40,
    topAgencies: ['Department of Defense', 'USDA', 'EPA']
  },
  {
    state: 'Nebraska',
    totalSpending: 3000000,
    averageAward: 75000,
    contractCount: 40,
    topAgencies: ['USDA', 'Department of Defense', 'Department of Veterans Affairs']
  },
  {
    state: 'Idaho',
    totalSpending: 2500000,
    averageAward: 62500,
    contractCount: 40,
    topAgencies: ['Department of Interior', 'USDA', 'Department of Defense']
  },
  {
    state: 'Hawaii',
    totalSpending: 2000000,
    averageAward: 50000,
    contractCount: 40,
    topAgencies: ['Department of Defense', 'NOAA', 'Department of Interior']
  },
  {
    state: 'New Hampshire',
    totalSpending: 1800000,
    averageAward: 45000,
    contractCount: 40,
    topAgencies: ['Department of Defense', 'EPA', 'USDA']
  },
  {
    state: 'Maine',
    totalSpending: 1600000,
    averageAward: 40000,
    contractCount: 40,
    topAgencies: ['Department of Defense', 'NOAA', 'USDA']
  },
  {
    state: 'Rhode Island',
    totalSpending: 1400000,
    averageAward: 35000,
    contractCount: 40,
    topAgencies: ['Department of Defense', 'Coast Guard', 'EPA']
  },
  {
    state: 'Montana',
    totalSpending: 1200000,
    averageAward: 30000,
    contractCount: 40,
    topAgencies: ['Department of Interior', 'USDA', 'Department of Defense']
  },
  {
    state: 'Delaware',
    totalSpending: 1000000,
    averageAward: 25000,
    contractCount: 40,
    topAgencies: ['Department of Defense', 'EPA', 'Coast Guard']
  },
  {
    state: 'South Dakota',
    totalSpending: 800000,
    averageAward: 20000,
    contractCount: 40,
    topAgencies: ['USDA', 'Department of Interior', 'Department of Defense']
  },
  {
    state: 'North Dakota',
    totalSpending: 600000,
    averageAward: 15000,
    contractCount: 40,
    topAgencies: ['USDA', 'Department of Interior', 'Department of Defense']
  },
  {
    state: 'Alaska',
    totalSpending: 500000,
    averageAward: 12500,
    contractCount: 40,
    topAgencies: ['Department of Interior', 'Department of Defense', 'NOAA']
  },
  {
    state: 'Vermont',
    totalSpending: 400000,
    averageAward: 10000,
    contractCount: 40,
    topAgencies: ['USDA', 'Department of Defense', 'EPA']
  },
  {
    state: 'Wyoming',
    totalSpending: 300000,
    averageAward: 7500,
    contractCount: 40,
    topAgencies: ['Department of Interior', 'USDA', 'Department of Defense']
  }
];

export const mockSetAsideData: SetAsideData[] = [
  {
    type: 'WOSB',
    description: 'Women-Owned Small Business',
    totalValue: 52000000,
    contractCount: 145,
    growthRate: 18.5
  },
  {
    type: 'SDVOSB',
    description: 'Service-Disabled Veteran-Owned Small Business',
    totalValue: 48000000,
    contractCount: 128,
    growthRate: 16.2
  },
  {
    type: '8(a)',
    description: 'SBA 8(a) Business Development Program',
    totalValue: 68000000,
    contractCount: 189,
    growthRate: 22.1
  },
  {
    type: 'HubZone',
    description: 'Historically Underutilized Business Zone',
    totalValue: 35000000,
    contractCount: 95,
    growthRate: 12.8
  },
  {
    type: 'SDB',
    description: 'Small Disadvantaged Business',
    totalValue: 78000000,
    contractCount: 225,
    growthRate: 24.3
  },
  {
    type: 'VOSB',
    description: 'Veteran-Owned Small Business',
    totalValue: 42000000,
    contractCount: 118,
    growthRate: 14.7
  },
  {
    type: 'EDWOSB',
    description: 'Economically Disadvantaged Women-Owned Small Business',
    totalValue: 38000000,
    contractCount: 102,
    growthRate: 19.4
  },
  {
    type: 'AbilityOne',
    description: 'AbilityOne Program (Nonprofit Agencies for People with Disabilities)',
    totalValue: 28000000,
    contractCount: 76,
    growthRate: 8.9
  },
  {
    type: 'HBCU',
    description: 'Historically Black Colleges and Universities',
    totalValue: 22000000,
    contractCount: 58,
    growthRate: 15.6
  },
  {
    type: 'MSI',
    description: 'Minority Serving Institutions',
    totalValue: 18000000,
    contractCount: 45,
    growthRate: 13.2
  },
  {
    type: 'WOSB-EDWOSB',
    description: 'Women-Owned Small Business (WOSB) and EDWOSB Combined',
    totalValue: 31000000,
    contractCount: 89,
    growthRate: 17.8
  },
  {
    type: 'SBA-Certified',
    description: 'SBA Certified Small Business',
    totalValue: 95000000,
    contractCount: 285,
    growthRate: 20.5
  },
  {
    type: 'Tribal',
    description: 'Indian Small Business Economic Enterprise',
    totalValue: 15000000,
    contractCount: 38,
    growthRate: 11.3
  },
  {
    type: 'Alaska Native',
    description: 'Alaska Native Corporation',
    totalValue: 25000000,
    contractCount: 62,
    growthRate: 9.7
  },
  {
    type: 'Native Hawaiian',
    description: 'Native Hawaiian Organization',
    totalValue: 12000000,
    contractCount: 28,
    growthRate: 7.4
  }
];

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

export const mockNAICSSpendingData: NAICSSpendingData[] = [
  {
    code: '541511',
    description: 'Custom Computer Programming Services',
    totalSpending2025: 2800000000,
    totalSpending2024: 2400000000,
    contractCount2025: 1250,
    contractCount2024: 1100,
    growthRate: 16.7,
    topAgencies: ['Department of Defense', 'Department of Homeland Security', 'GSA']
  },
  {
    code: '541512',
    description: 'Computer Systems Design Services',
    totalSpending2025: 2200000000,
    totalSpending2024: 1950000000,
    contractCount2025: 980,
    contractCount2024: 850,
    growthRate: 12.8,
    topAgencies: ['Department of Defense', 'CIA', 'Department of Veterans Affairs']
  },
  {
    code: '561210',
    description: 'Facilities Support Services',
    totalSpending2025: 1900000000,
    totalSpending2024: 1750000000,
    contractCount2025: 2100,
    contractCount2024: 1950,
    growthRate: 8.6,
    topAgencies: ['GSA', 'Department of Defense', 'Department of Veterans Affairs']
  },
  {
    code: '237310',
    description: 'Highway, Street, and Bridge Construction',
    totalSpending2025: 1650000000,
    totalSpending2024: 1500000000,
    contractCount2025: 450,
    contractCount2024: 420,
    growthRate: 10.0,
    topAgencies: ['Department of Transportation', 'Army Corps of Engineers', 'GSA']
  },
  {
    code: '541330',
    description: 'Engineering Services',
    totalSpending2025: 1450000000,
    totalSpending2024: 1300000000,
    contractCount2025: 780,
    contractCount2024: 720,
    growthRate: 11.5,
    topAgencies: ['Department of Defense', 'Department of Transportation', 'NASA']
  },
  {
    code: '541611',
    description: 'Administrative Management Consulting Services',
    totalSpending2025: 1200000000,
    totalSpending2024: 1100000000,
    contractCount2025: 650,
    contractCount2024: 600,
    growthRate: 9.1,
    topAgencies: ['Department of Defense', 'Department of Health and Human Services', 'GSA']
  },
  {
    code: '339112',
    description: 'Surgical and Medical Instrument Manufacturing',
    totalSpending2025: 1100000000,
    totalSpending2024: 950000000,
    contractCount2025: 320,
    contractCount2024: 290,
    growthRate: 15.8,
    topAgencies: ['Department of Veterans Affairs', 'Department of Defense', 'NIH']
  },
  {
    code: '541714',
    description: 'Research and Development in Biotechnology',
    totalSpending2025: 980000000,
    totalSpending2024: 850000000,
    contractCount2025: 180,
    contractCount2024: 160,
    growthRate: 15.3,
    topAgencies: ['NIH', 'CDC', 'Department of Defense']
  },
  {
    code: '336411',
    description: 'Aircraft Manufacturing',
    totalSpending2025: 950000000,
    totalSpending2024: 900000000,
    contractCount2025: 85,
    contractCount2024: 80,
    growthRate: 5.6,
    topAgencies: ['Department of Defense', 'NASA', 'Coast Guard']
  },
  {
    code: '541519',
    description: 'Other Computer Related Services',
    totalSpending2025: 850000000,
    totalSpending2024: 750000000,
    contractCount2025: 520,
    contractCount2024: 480,
    growthRate: 13.3,
    topAgencies: ['Department of Homeland Security', 'GSA', 'Department of Defense']
  },
  {
    code: '238220',
    description: 'Plumbing, Heating, and Air-Conditioning Contractors',
    totalSpending2025: 780000000,
    totalSpending2024: 720000000,
    contractCount2025: 890,
    contractCount2024: 820,
    growthRate: 8.3,
    topAgencies: ['GSA', 'Department of Veterans Affairs', 'Department of Defense']
  },
  {
    code: '541990',
    description: 'All Other Professional, Scientific, and Technical Services',
    totalSpending2025: 720000000,
    totalSpending2024: 650000000,
    contractCount2025: 410,
    contractCount2024: 380,
    growthRate: 10.8,
    topAgencies: ['Department of Energy', 'EPA', 'Department of Defense']
  },
  {
    code: '336992',
    description: 'Military Armored Vehicle, Tank, and Tank Component Manufacturing',
    totalSpending2025: 680000000,
    totalSpending2024: 620000000,
    contractCount2025: 45,
    contractCount2024: 42,
    growthRate: 9.7,
    topAgencies: ['Department of Defense', 'Army', 'Marines']
  },
  {
    code: '541618',
    description: 'Other Management Consulting Services',
    totalSpending2025: 650000000,
    totalSpending2024: 580000000,
    contractCount2025: 380,
    contractCount2024: 350,
    growthRate: 12.1,
    topAgencies: ['Department of Defense', 'Department of Health and Human Services', 'Department of Homeland Security']
  },
  {
    code: '238210',
    description: 'Electrical Contractors and Other Wiring Installation Contractors',
    totalSpending2025: 620000000,
    totalSpending2024: 570000000,
    contractCount2025: 750,
    contractCount2024: 690,
    growthRate: 8.8,
    topAgencies: ['GSA', 'Department of Defense', 'Department of Energy']
  },
  {
    code: '541380',
    description: 'Testing Laboratories',
    totalSpending2025: 580000000,
    totalSpending2024: 520000000,
    contractCount2025: 290,
    contractCount2024: 270,
    growthRate: 11.5,
    topAgencies: ['Department of Defense', 'EPA', 'FDA']
  },
  {
    code: '561612',
    description: 'Security Guards and Patrol Services',
    totalSpending2025: 550000000,
    totalSpending2024: 510000000,
    contractCount2025: 680,
    contractCount2024: 630,
    growthRate: 7.8,
    topAgencies: ['GSA', 'Department of Homeland Security', 'Department of Veterans Affairs']
  },
  {
    code: '237130',
    description: 'Power and Communication Line Construction',
    totalSpending2025: 520000000,
    totalSpending2024: 480000000,
    contractCount2025: 180,
    contractCount2024: 170,
    growthRate: 8.3,
    topAgencies: ['Department of Energy', 'Department of Defense', 'GSA']
  },
  {
    code: '541715',
    description: 'Research and Development in the Physical, Engineering, and Life Sciences',
    totalSpending2025: 490000000,
    totalSpending2024: 440000000,
    contractCount2025: 220,
    contractCount2024: 200,
    growthRate: 11.4,
    topAgencies: ['NASA', 'Department of Energy', 'NSF']
  },
  {
    code: '336413',
    description: 'Other Aircraft Parts and Auxiliary Equipment Manufacturing',
    totalSpending2025: 460000000,
    totalSpending2024: 420000000,
    contractCount2025: 150,
    contractCount2024: 140,
    growthRate: 9.5,
    topAgencies: ['Department of Defense', 'NASA', 'Coast Guard']
  },
  {
    code: '561730',
    description: 'Landscaping Services',
    totalSpending2025: 430000000,
    totalSpending2024: 400000000,
    contractCount2025: 920,
    contractCount2024: 850,
    growthRate: 7.5,
    topAgencies: ['GSA', 'Department of Veterans Affairs', 'National Park Service']
  },
  {
    code: '238110',
    description: 'Poured Concrete Foundation and Structure Contractors',
    totalSpending2025: 410000000,
    totalSpending2024: 380000000,
    contractCount2025: 280,
    contractCount2024: 260,
    growthRate: 7.9,
    topAgencies: ['Army Corps of Engineers', 'GSA', 'Department of Defense']
  },
  {
    code: '541613',
    description: 'Marketing Consulting Services',
    totalSpending2025: 390000000,
    totalSpending2024: 350000000,
    contractCount2025: 240,
    contractCount2024: 220,
    growthRate: 11.4,
    topAgencies: ['GSA', 'Department of Health and Human Services', 'Department of Defense']
  },
  {
    code: '561621',
    description: 'Security Systems Services (except Locksmiths)',
    totalSpending2025: 370000000,
    totalSpending2024: 340000000,
    contractCount2025: 310,
    contractCount2024: 290,
    growthRate: 8.8,
    topAgencies: ['Department of Homeland Security', 'GSA', 'Department of Defense']
  },
  {
    code: '238990',
    description: 'All Other Specialty Trade Contractors',
    totalSpending2025: 350000000,
    totalSpending2024: 320000000,
    contractCount2025: 450,
    contractCount2024: 420,
    growthRate: 9.4,
    topAgencies: ['GSA', 'Department of Defense', 'Department of Veterans Affairs']
  },
  {
    code: '541690',
    description: 'Other Scientific and Technical Consulting Services',
    totalSpending2025: 330000000,
    totalSpending2024: 300000000,
    contractCount2025: 190,
    contractCount2024: 175,
    growthRate: 10.0,
    topAgencies: ['EPA', 'Department of Energy', 'Department of Defense']
  },
  {
    code: '238160',
    description: 'Roofing Contractors',
    totalSpending2025: 310000000,
    totalSpending2024: 290000000,
    contractCount2025: 520,
    contractCount2024: 480,
    growthRate: 6.9,
    topAgencies: ['GSA', 'Department of Defense', 'Department of Veterans Affairs']
  },
  {
    code: '541620',
    description: 'Environmental Consulting Services',
    totalSpending2025: 290000000,
    totalSpending2024: 260000000,
    contractCount2025: 160,
    contractCount2024: 145,
    growthRate: 11.5,
    topAgencies: ['EPA', 'Army Corps of Engineers', 'Department of Energy']
  },
  {
    code: '238320',
    description: 'Painting and Wall Covering Contractors',
    totalSpending2025: 270000000,
    totalSpending2024: 250000000,
    contractCount2025: 680,
    contractCount2024: 630,
    growthRate: 8.0,
    topAgencies: ['GSA', 'Department of Defense', 'Department of Veterans Affairs']
  },
  {
    code: '561110',
    description: 'Office Administrative Services',
    totalSpending2025: 250000000,
    totalSpending2024: 230000000,
    contractCount2025: 340,
    contractCount2024: 320,
    growthRate: 8.7,
    topAgencies: ['GSA', 'Department of Defense', 'Department of Health and Human Services']
  },
  {
    code: '238140',
    description: 'Masonry Contractors',
    totalSpending2025: 230000000,
    totalSpending2024: 210000000,
    contractCount2025: 380,
    contractCount2024: 350,
    growthRate: 9.5,
    topAgencies: ['GSA', 'Army Corps of Engineers', 'Department of Veterans Affairs']
  },
  {
    code: '541370',
    description: 'Surveying and Mapping (except Geophysical) Services',
    totalSpending2025: 210000000,
    totalSpending2024: 190000000,
    contractCount2025: 120,
    contractCount2024: 110,
    growthRate: 10.5,
    topAgencies: ['Army Corps of Engineers', 'Department of Transportation', 'Department of Interior']
  },
  {
    code: '238310',
    description: 'Drywall and Insulation Contractors',
    totalSpending2025: 190000000,
    totalSpending2024: 175000000,
    contractCount2025: 420,
    contractCount2024: 390,
    growthRate: 8.6,
    topAgencies: ['GSA', 'Department of Defense', 'Department of Veterans Affairs']
  },
  {
    code: '561720',
    description: 'Janitorial Services',
    totalSpending2025: 170000000,
    totalSpending2024: 160000000,
    contractCount2025: 1200,
    contractCount2024: 1100,
    growthRate: 6.3,
    topAgencies: ['GSA', 'Department of Veterans Affairs', 'Department of Defense']
  },
  {
    code: '238130',
    description: 'Framing Contractors',
    totalSpending2025: 150000000,
    totalSpending2024: 140000000,
    contractCount2025: 280,
    contractCount2024: 260,
    growthRate: 7.1,
    topAgencies: ['GSA', 'Department of Defense', 'Army Corps of Engineers']
  },
  {
    code: '541810',
    description: 'Advertising Agencies',
    totalSpending2025: 130000000,
    totalSpending2024: 120000000,
    contractCount2025: 95,
    contractCount2024: 88,
    growthRate: 8.3,
    topAgencies: ['Department of Defense', 'Department of Health and Human Services', 'GSA']
  },
  {
    code: '238290',
    description: 'Other Building Equipment Contractors',
    totalSpending2025: 110000000,
    totalSpending2024: 100000000,
    contractCount2025: 220,
    contractCount2024: 200,
    growthRate: 10.0,
    topAgencies: ['GSA', 'Department of Veterans Affairs', 'Department of Defense']
  },
  {
    code: '561790',
    description: 'Other Services to Buildings and Dwellings',
    totalSpending2025: 90000000,
    totalSpending2024: 85000000,
    contractCount2025: 350,
    contractCount2024: 320,
    growthRate: 5.9,
    topAgencies: ['GSA', 'Department of Veterans Affairs', 'National Park Service']
  },
  {
    code: '238330',
    description: 'Flooring Contractors',
    totalSpending2025: 70000000,
    totalSpending2024: 65000000,
    contractCount2025: 180,
    contractCount2024: 170,
    growthRate: 7.7,
    topAgencies: ['GSA', 'Department of Defense', 'Department of Veterans Affairs']
  },
  {
    code: '238350',
    description: 'Finish Carpentry Contractors',
    totalSpending2025: 50000000,
    totalSpending2024: 46000000,
    contractCount2025: 140,
    contractCount2024: 130,
    growthRate: 8.7,
    topAgencies: ['GSA', 'Department of Veterans Affairs', 'National Park Service']
  },
  {
    code: '561440',
    description: 'Collection Agencies',
    totalSpending2025: 30000000,
    totalSpending2024: 28000000,
    contractCount2025: 45,
    contractCount2024: 42,
    growthRate: 7.1,
    topAgencies: ['Department of Treasury', 'Department of Education', 'GSA']
  },
  {
    code: '238120',
    description: 'Structural Steel and Precast Concrete Contractors',
    totalSpending2025: 25000000,
    totalSpending2024: 23000000,
    contractCount2025: 65,
    contractCount2024: 60,
    growthRate: 8.7,
    topAgencies: ['Army Corps of Engineers', 'GSA', 'Department of Transportation']
  },
  {
    code: '238190',
    description: 'Other Foundation, Structure, and Building Exterior Contractors',
    totalSpending2025: 20000000,
    totalSpending2024: 18500000,
    contractCount2025: 85,
    contractCount2024: 80,
    growthRate: 8.1,
    topAgencies: ['GSA', 'Army Corps of Engineers', 'Department of Defense']
  },
  {
    code: '238340',
    description: 'Tile and Terrazzo Contractors',
    totalSpending2025: 15000000,
    totalSpending2024: 14000000,
    contractCount2025: 95,
    contractCount2024: 88,
    growthRate: 7.1,
    topAgencies: ['GSA', 'Department of Veterans Affairs', 'Department of Defense']
  },
  {
    code: '238390',
    description: 'Other Building Finishing Contractors',
    totalSpending2025: 12000000,
    totalSpending2024: 11000000,
    contractCount2025: 75,
    contractCount2024: 70,
    growthRate: 9.1,
    topAgencies: ['GSA', 'Department of Defense', 'Department of Veterans Affairs']
  },
  {
    code: '238910',
    description: 'Site Preparation Contractors',
    totalSpending2025: 10000000,
    totalSpending2024: 9200000,
    contractCount2025: 55,
    contractCount2024: 50,
    growthRate: 8.7,
    topAgencies: ['Army Corps of Engineers', 'Department of Transportation', 'GSA']
  },
  {
    code: '238150',
    description: 'Glass and Glazing Contractors',
    totalSpending2025: 8000000,
    totalSpending2024: 7500000,
    contractCount2025: 45,
    contractCount2024: 42,
    growthRate: 6.7,
    topAgencies: ['GSA', 'Department of Defense', 'Department of Veterans Affairs']
  },
  {
    code: '238170',
    description: 'Siding Contractors',
    totalSpending2025: 6000000,
    totalSpending2024: 5500000,
    contractCount2025: 35,
    contractCount2024: 32,
    growthRate: 9.1,
    topAgencies: ['GSA', 'Department of Veterans Affairs', 'National Park Service']
  },
  {
    code: '238920',
    description: 'Demolition Contractors',
    totalSpending2025: 5000000,
    totalSpending2024: 4600000,
    contractCount2025: 28,
    contractCount2024: 25,
    growthRate: 8.7,
    topAgencies: ['Army Corps of Engineers', 'GSA', 'Department of Defense']
  }
];

// Add 2024 spending data for states
export const mockSpendingData2024: SpendingData[] = [
  {
    state: 'California',
    totalSpending: 110000000,
    averageAward: 2200000,
    contractCount: 50,
    topAgencies: ['Department of Defense', 'Department of Energy', 'NASA']
  },
  {
    state: 'Virginia',
    totalSpending: 85000000,
    averageAward: 1700000,
    contractCount: 50,
    topAgencies: ['Department of Defense', 'CIA', 'FBI']
  },
  {
    state: 'Texas',
    totalSpending: 75000000,
    averageAward: 1500000,
    contractCount: 50,
    topAgencies: ['Department of Defense', 'Department of Energy', 'NASA']
  },
  {
    state: 'Maryland',
    totalSpending: 65000000,
    averageAward: 1625000,
    contractCount: 40,
    topAgencies: ['NIH', 'NSA', 'CDC']
  },
  {
    state: 'Florida',
    totalSpending: 55000000,
    averageAward: 1375000,
    contractCount: 40,
    topAgencies: ['Department of Defense', 'Coast Guard', 'NOAA']
  },
  {
    state: 'New York',
    totalSpending: 48000000,
    averageAward: 1200000,
    contractCount: 40,
    topAgencies: ['Department of Homeland Security', 'GSA', 'Department of Veterans Affairs']
  },
  {
    state: 'Illinois',
    totalSpending: 42000000,
    averageAward: 1050000,
    contractCount: 40,
    topAgencies: ['Department of Defense', 'Department of Transportation', 'EPA']
  },
  {
    state: 'Pennsylvania',
    totalSpending: 38000000,
    averageAward: 950000,
    contractCount: 40,
    topAgencies: ['Department of Defense', 'Department of Veterans Affairs', 'GSA']
  },
  {
    state: 'Ohio',
    totalSpending: 35000000,
    averageAward: 875000,
    contractCount: 40,
    topAgencies: ['Department of Defense', 'NASA', 'Department of Energy']
  },
  {
    state: 'Georgia',
    totalSpending: 32000000,
    averageAward: 800000,
    contractCount: 40,
    topAgencies: ['CDC', 'Department of Defense', 'GSA']
  }
];

export const mockAwardees: Awardee[] = [
  {
    id: '1',
    name: 'Lockheed Martin Corporation',
    uei: 'F6W148T789P4',
    cageCode: '180KN',
    hqCountry: 'USA',
    hqState: 'MD',
    hqCity: 'Bethesda',
    founded: 1995,
    totalPYAwards: 12500000,
    businessType: ['Large Business', 'Defense']
  },
  {
    id: '2',
    name: 'SAIC',
    uei: 'M2ZU5H2CH6G1',
    cageCode: '1TXU3',
    hqCountry: 'USA',
    hqState: 'VA',
    hqCity: 'Reston',
    founded: 1969,
    totalPYAwards: 8750000,
    businessType: ['Large Business', 'Technology']
  },
  {
    id: '3',
    name: 'Booz Allen Hamilton',
    uei: 'NPC0Q87N6NY5',
    cageCode: 'None',
    hqCountry: 'USA',
    hqState: 'VA',
    hqCity: 'McLean',
    founded: 1914,
    totalPYAwards: 7800000,
    businessType: ['Large Business', 'Consulting']
  },
  {
    id: '4',
    name: 'General Dynamics',
    uei: 'KJ4HF2X2EQN3',
    cageCode: '3TYD5',
    hqCountry: 'USA',
    hqState: 'VA',
    hqCity: 'Reston',
    founded: 1952,
    totalPYAwards: 11200000,
    businessType: ['Large Business', 'Defense']
  },
  {
    id: '5',
    name: 'Raytheon Technologies',
    uei: 'XKVH5XMJAPP8',
    cageCode: '96RF9',
    hqCountry: 'USA',
    hqState: 'MA',
    hqCity: 'Waltham',
    founded: 1922,
    totalPYAwards: 9850000,
    businessType: ['Large Business', 'Defense', 'Technology']
  },
  {
    id: '6',
    name: 'Northrop Grumman',
    uei: 'N88NQWE78576',
    cageCode: '6NP88',
    hqCountry: 'USA',
    hqState: 'VA',
    hqCity: 'Falls Church',
    founded: 1994,
    totalPYAwards: 10300000,
    businessType: ['Large Business', 'Defense']
  },
  {
    id: '7',
    name: 'Boeing Company',
    uei: 'D5HJ2M67KNW5',
    cageCode: '4HCM8',
    hqCountry: 'USA',
    hqState: 'IL',
    hqCity: 'Chicago',
    founded: 1916,
    totalPYAwards: 13500000,
    businessType: ['Large Business', 'Defense', 'Aerospace']
  },
  {
    id: '8',
    name: 'CACI International',
    uei: 'YWK2QJMJ4M16',
    cageCode: '4SJF1',
    hqCountry: 'USA',
    hqState: 'VA',
    hqCity: 'Reston',
    founded: 1962,
    totalPYAwards: 6200000,
    businessType: ['Large Business', 'Technology']
  },
  {
    id: '9',
    name: 'ManTech International',
    uei: 'LDM4F4728R53',
    cageCode: '1Q3V8',
    hqCountry: 'USA',
    hqState: 'VA',
    hqCity: 'Herndon',
    founded: 1968,
    totalPYAwards: 5400000,
    businessType: ['Large Business', 'Technology']
  },
  {
    id: '10',
    name: 'Accenture Federal Services',
    uei: 'GDX1RMJF1BU7',
    cageCode: 'None',
    hqCountry: 'USA',
    hqState: 'VA',
    hqCity: 'Arlington',
    founded: 2004,
    totalPYAwards: 7100000,
    businessType: ['Large Business', 'Consulting']
  },
  {
    id: '11',
    name: 'IBM Corporation',
    uei: 'KA8ZXB6WPQT3',
    cageCode: '1NYT5',
    hqCountry: 'USA',
    hqState: 'NY',
    hqCity: 'Armonk',
    founded: 1911,
    totalPYAwards: 8900000,
    businessType: ['Large Business', 'Technology']
  },
  {
    id: '12',
    name: 'Microsoft Corporation',
    uei: 'KXXDXF9XV8T3',
    cageCode: '44H38',
    hqCountry: 'USA',
    hqState: 'WA',
    hqCity: 'Redmond',
    founded: 1975,
    totalPYAwards: 6800000,
    businessType: ['Large Business', 'Technology']
  },
  {
    id: '13',
    name: 'Amazon Web Services',
    uei: 'C2N7LVJCNCW8',
    cageCode: '4DC71',
    hqCountry: 'USA',
    hqState: 'WA',
    hqCity: 'Seattle',
    founded: 2006,
    totalPYAwards: 9200000,
    businessType: ['Large Business', 'Technology', 'Cloud Services']
  },
  {
    id: '14',
    name: 'Palantir Technologies',
    uei: 'J5RN6QE85824',
    cageCode: 'None',
    hqCountry: 'USA',
    hqState: 'CO',
    hqCity: 'Denver',
    founded: 2003,
    totalPYAwards: 4500000,
    businessType: ['Large Business', 'Technology', 'Data Analytics']
  },
  {
    id: '15',
    name: 'Deloitte Consulting',
    uei: 'MFA3QHPXR58',
    cageCode: '3TYT1',
    hqCountry: 'USA',
    hqState: 'VA',
    hqCity: 'Arlington',
    founded: 1845,
    totalPYAwards: 5900000,
    businessType: ['Large Business', 'Consulting']
  },
  {
    id: '16',
    name: 'Leidos Holdings',
    uei: 'UFLVD4X9G281',
    cageCode: '3M7G1',
    hqCountry: 'USA',
    hqState: 'VA',
    hqCity: 'Reston',
    founded: 2013,
    totalPYAwards: 7600000,
    businessType: ['Large Business', 'Technology', 'Defense']
  },
  {
    id: '17',
    name: 'CSRA Inc.',
    uei: 'FU8HTRR9X3',
    cageCode: 'None',
    hqCountry: 'USA',
    hqState: 'VA',
    hqCity: 'Falls Church',
    founded: 2015,
    totalPYAwards: 4200000,
    businessType: ['Large Business', 'Technology']
  },
  {
    id: '18',
    name: 'CGI Federal',
    uei: 'DAMZYD5DY4G6',
    cageCode: 'None',
    hqCountry: 'USA',
    hqState: 'VA',
    hqCity: 'Fairfax',
    founded: 1976,
    totalPYAwards: 3800000,
    businessType: ['Large Business', 'Technology', 'Consulting']
  },
  {
    id: '19',
    name: 'BAE Systems',
    uei: 'R67MNW5T8',
    cageCode: '6W9B9',
    hqCountry: 'USA',
    hqState: 'VA',
    hqCity: 'Arlington',
    founded: 1999,
    totalPYAwards: 6500000,
    businessType: ['Large Business', 'Defense']
  },
  {
    id: '20',
    name: 'L3Harris Technologies',
    uei: 'UK66CLD4DX71',
    cageCode: '33Y54',
    hqCountry: 'USA',
    hqState: 'FL',
    hqCity: 'Melbourne',
    founded: 2019,
    totalPYAwards: 8100000,
    businessType: ['Large Business', 'Defense', 'Technology']
  }
];