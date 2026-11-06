export interface SpecificationItem {
  label: string;
  value: string;
  highlight?: boolean;
  note?: string;
}

export interface SpecificationSection {
  id: string;
  title: string;
  items: SpecificationItem[];
}

export interface Equipment {
  id: string;
  slug: string;
  brand: 'Lenovo' | 'Apple' | string;
  name: string;
  commercialName: string;
  category: string;
  subCategory: string;
  tagline: string;
  description: string;
  model3dPath: string;
  modelFileSize: string;
  badges: string[];
  quickSpecs: {
    screen: string;
    processor: string;
    ram: string;
    storage: string;
    batteryLife: string;
    weight: string;
    os: string;
  };
  sections: SpecificationSection[];
  loanAvailability: {
    status: 'disponible' | 'proximamente' | 'mantenimiento';
    locations: string[];
    targetAudience: string;
    requirements: string[];
    includedSoftware: string[];
  };
}

export const EQUIPMENT_VERSION = '1.0.0';
