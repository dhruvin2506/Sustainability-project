import { CompanyData } from '../types/types';
import { companiesData } from '../data/companiesData';

interface MetricsData {
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

interface BenchmarkData {
  industry: string;
  avgEmissions: number;
  avgEnergy: number;
  avgWaste: number;
  avgRenewable: number;
  avgWaterUsage: number;
  avgRecyclingRate: number;
}

export const metricsService = {
  // Fetch metrics for a date range
  async getMetrics(_startDate: string, _endDate: string): Promise<MetricsData[]> {
    // TODO: Replace with actual API call
    return Promise.resolve([
      { 
        date: '2024-01-01', 
        emissions: 400, 
        energy: 240, 
        waste: 180,
        waterUsage: 1200,
        renewablePercentage: 45,
        supplyChainEmissions: 800,
        recyclingRate: 65,
        carbonOffset: 200
      },
      { 
        date: '2024-02-01', 
        emissions: 300, 
        energy: 220, 
        waste: 170,
        waterUsage: 1100,
        renewablePercentage: 48,
        supplyChainEmissions: 750,
        recyclingRate: 68,
        carbonOffset: 180
      }
    ]);
  },

  // Fetch company-specific metrics
  async getCompanyMetrics(companyId: string, _startDate: string, _endDate: string): Promise<MetricsData[]> {
    const company = companiesData.find(c => c.id === companyId);
    if (!company) {
      throw new Error('Company not found');
    }

    const metrics = Object.entries(company.metrics).map(([year, data]) => ({
      date: `${year}-01-01`,
      emissions: data.emissions,
      energy: data.energy,
      waste: data.waste,
      waterUsage: data.waterUsage,
      renewablePercentage: data.renewablePercentage,
      supplyChainEmissions: data.supplyChainEmissions,
      recyclingRate: data.recyclingRate,
      carbonOffset: data.carbonOffset,
      notes: `Data for ${company.name} - ${year}`
    }));

    return Promise.resolve(metrics);
  },

  // Get industry benchmarks
  async getIndustryBenchmarks(industry: string): Promise<BenchmarkData> {
    const industryCompanies = companiesData.filter(c => c.industry === industry);
    const currentYear = "2023";

    const calculateAverage = (key: keyof CompanyData['metrics']['2023']) => {
      const sum = industryCompanies.reduce((acc, company) => 
        acc + (company.metrics[currentYear]?.[key] || 0), 0);
      return sum / industryCompanies.length;
    };

    return {
      industry,
      avgEmissions: calculateAverage('emissions'),
      avgEnergy: calculateAverage('energy'),
      avgWaste: calculateAverage('waste'),
      avgRenewable: calculateAverage('renewablePercentage'),
      avgWaterUsage: calculateAverage('waterUsage'),
      avgRecyclingRate: calculateAverage('recyclingRate')
    };
  },

  // Save new metrics
  async saveMetrics(data: MetricsData): Promise<void> {
    console.log('Saving metrics:', data);
    return Promise.resolve();
  },

  // Export metrics report with enhanced data
  async exportReport(_startDate: string, _endDate: string): Promise<Blob> {
    const data = await this.getMetrics(_startDate, _endDate);
    const csv = this.convertToCSV(data);
    return new Blob([csv], { type: 'text/csv' });
  },

  // Export company comparison report with enhanced metrics
  async exportCompanyComparison(year: string): Promise<Blob> {
    const comparisonData = companiesData.map(company => ({
      Company: company.name,
      Industry: company.industry,
      ...company.metrics[year]
    }));

    const headers = [
      'Company',
      'Industry',
      'Emissions (kg CO2)',
      'Energy (kWh)',
      'Waste (kg)',
      'Renewable %',
      'Water Usage (m³)',
      'Supply Chain Emissions (kg CO2)',
      'Recycling Rate %',
      'Carbon Offset (kg CO2)'
    ];

    const rows = comparisonData.map(item => [
      item.Company,
      item.Industry,
      item.emissions.toString(),
      item.energy.toString(),
      item.waste.toString(),
      item.renewablePercentage.toString(),
      (item as any).waterUsage?.toString() || '0',
      (item as any).supplyChainEmissions?.toString() || '0',
      (item as any).recyclingRate?.toString() || '0',
      (item as any).carbonOffset?.toString() || '0'
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    return new Blob([csv], { type: 'text/csv' });
  },

  // Helper function to convert data to CSV with enhanced metrics
  convertToCSV(data: MetricsData[]): string {
    const headers = [
      'Date',
      'Emissions (kg CO2)',
      'Energy (kWh)',
      'Waste (kg)',
      'Water Usage (m³)',
      'Renewable %',
      'Supply Chain Emissions (kg CO2)',
      'Recycling Rate %',
      'Carbon Offset (kg CO2)',
      'Notes'
    ];

    const rows = data.map(item => [
      item.date,
      item.emissions.toString(),
      item.energy.toString(),
      item.waste.toString(),
      item.waterUsage?.toString() || '0',
      item.renewablePercentage?.toString() || '0',
      item.supplyChainEmissions?.toString() || '0',
      item.recyclingRate?.toString() || '0',
      item.carbonOffset?.toString() || '0',
      item.notes || ''
    ]);
    
    return [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
  }
};