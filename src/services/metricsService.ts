import { companiesData } from '../data/companiesData';

interface MetricsData {
  date: string;
  emissions: number;
  energy: number;
  waste: number;
  notes?: string;
}

export const metricsService = {
  // Fetch metrics for a date range
  async getMetrics(_startDate: string, _endDate: string): Promise<MetricsData[]> {
    // TODO: Replace with actual API call
    return Promise.resolve([
      { date: '2024-01-01', emissions: 400, energy: 240, waste: 180 },
      { date: '2024-02-01', emissions: 300, energy: 220, waste: 170 }
    ]);
  },

  // Fetch company-specific metrics
  async getCompanyMetrics(companyId: string, _startDate: string, _endDate: string): Promise<MetricsData[]> {
    // TODO: Replace with actual API call
    const company = companiesData.find(c => c.id === companyId);
    if (!company) {
      throw new Error('Company not found');
    }

    // Convert company metrics to MetricsData format
    const metrics = Object.entries(company.metrics).map(([year, data]) => ({
      date: `${year}-01-01`,
      emissions: data.emissions,
      energy: data.energy,
      waste: data.waste,
      notes: `Data for ${company.name} - ${year}`
    }));

    return Promise.resolve(metrics);
  },

  // Save new metrics
  async saveMetrics(data: MetricsData): Promise<void> {
    // TODO: Replace with actual API call
    console.log('Saving metrics:', data);
    return Promise.resolve();
  },

  // Export metrics report
  async exportReport(_startDate: string, _endDate: string): Promise<Blob> {
    // TODO: Replace with actual API call
    const data = await this.getMetrics(_startDate, _endDate);
    const csv = this.convertToCSV(data);
    return new Blob([csv], { type: 'text/csv' });
  },

  // Export company comparison report
  async exportCompanyComparison(year: string): Promise<Blob> {
    const comparisonData = companiesData.map(company => ({
      Company: company.name,
      Industry: company.industry,
      ...company.metrics[year]
    }));

    const headers = ['Company', 'Industry', 'Emissions (kg CO2)', 'Energy (kWh)', 'Waste (kg)', 'Renewable %'];
    const rows = comparisonData.map(item => [
      item.Company,
      item.Industry,
      item.emissions.toString(),
      item.energy.toString(),
      item.waste.toString(),
      item.renewablePercentage.toString()
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    return new Blob([csv], { type: 'text/csv' });
  },

  // Helper function to convert data to CSV
  convertToCSV(data: MetricsData[]): string {
    const headers = ['Date', 'Emissions (kg CO2)', 'Energy (kWh)', 'Waste (kg)', 'Notes'];
    const rows = data.map(item => [
      item.date,
      item.emissions.toString(),
      item.energy.toString(),
      item.waste.toString(),
      item.notes || ''
    ]);
    
    return [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
  }
};