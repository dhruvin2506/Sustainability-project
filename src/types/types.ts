export interface CompanyMetrics {
  emissions: number;
  energy: number;
  waste: number;
  renewablePercentage: number;
  waterUsage: number;
  supplyChainEmissions: number;
  recyclingRate: number;
  carbonOffset: number;
}

export interface CompanyData {
  id: string;
  name: string;
  industry: string;
  description: string;
  metrics: {
    [year: string]: CompanyMetrics;
  };
  benchmarks?: {
    industryAverageEmissions: number;
    industryAverageEnergy: number;
    industryAverageWaste: number;
    industryAverageRenewable: number;
  };
}

export interface MetricsData {
  date: string;
  emissions: number;
  energy: number;
  waste: number;
  notes?: string;
}