// src/types/types.ts

export interface CompanyMetrics {
  emissions: number;
  energy: number;
  waste: number;
  waterUsage: number;
  renewablePercentage: number;
  supplyChainEmissions: number;
  recyclingRate: number;
  carbonOffset: number;
}

// src/types/types.ts
export interface SustainabilityInitiative {
  title: string;
  description: string;
  startDate: string;
  impact: string;
}

export interface CompanyProfile {
  id: string;
  name: string;
  industry: string;
  description: string;
  foundedYear: number;
  headquarters: string;
  employeeCount: number;
  sustainabilityInitiatives: SustainabilityInitiative[];
  certifications: {
    name: string;
    issuer: string;
    validUntil: string;
  }[];
  goals: CompanyGoal[];
  historicalData: {
    [year: string]: CompanyMetrics;
  };
  predictedTrends?: {
    [year: string]: Partial<CompanyMetrics>;
  };
}

export interface CompanyData {
  id: string;
  name: string;
  industry: string;
  description: string;
  metrics: {
    [year: string]: CompanyMetrics;
  };
  benchmarks: {
    industryAverageEmissions: number;
    industryAverageEnergy: number;
    industryAverageWaste: number;
    industryAverageRenewable: number;
  };
}
export interface CompanyGoal {
  id: string;
  metric: string;
  targetValue: number;
  currentValue: number;
  deadline: string;
  status: 'on-track' | 'at-risk' | 'behind';
  description: string;
}

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

export interface BenchmarkData {
  industry: string;
  avgEmissions: number;
  avgEnergy: number;
  avgWaste: number;
  avgRenewable: number;
  avgWaterUsage: number;
  avgRecyclingRate: number;
}

