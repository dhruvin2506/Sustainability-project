import { CompanyData } from '../types/types';

export const companiesData: CompanyData[] = [
  {
    id: "msft",
    name: "Microsoft",
    industry: "Technology",
    description: "Global technology company focused on software, cloud, and computing",
    metrics: {
      "2023": {
        emissions: 12400000,
        energy: 7800000,
        waste: 240000,
        renewablePercentage: 60,
        waterUsage: 1250000,
        supplyChainEmissions: 8900000,
        recyclingRate: 75,
        carbonOffset: 5600000
      },
      "2022": {
        emissions: 14100000,
        energy: 8200000,
        waste: 265000,
        renewablePercentage: 55,
        waterUsage: 1300000,
        supplyChainEmissions: 9200000,
        recyclingRate: 70,
        carbonOffset: 5100000
      }
    },
    benchmarks: {
      industryAverageEmissions: 13000000,
      industryAverageEnergy: 8000000,
      industryAverageWaste: 250000,
      industryAverageRenewable: 50
    }
  }
  // Add more companies as needed
];