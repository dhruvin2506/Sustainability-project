// src/types/types.ts

// Basic company information
export interface CompanyData {
  id: string;
  ticker: string;
  name: string;
  industry: string;
  description: string;
}

// Real-time ESG data structure
export interface ESGData {
  environmental: number;
  social: number;
  governance: number;
  totalEsg: number;
}

// Metrics data structure for API responses
export interface MetricsData {
  date: string;
  emissions: number;
  energy: number;
  waste: number;
  waterUsage?: number;
  renewablePercentage?: number;
  supplyChainEmissions?: number;
  recyclingRate?: number;
  carbonOffset?: number;
  notes?: string;
}

// Auth types (if you're using authentication)
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  preferences?: {
    notifications: boolean;
    theme: 'light' | 'dark';
  };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// For the company selector
export interface CompanySelectorProps {
  companies: CompanyData[];
  selectedCompanyId: string;
  onSelectCompany: (id: string) => void;
}

// For real-time data fetching
export interface CompanyESGResponse {
  status: string;
  data: ESGData;
  timestamp: string;
}