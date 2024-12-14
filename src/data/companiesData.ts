// src/data/companiesData.ts
import { CompanyData } from '../types/types';

export const companiesData: CompanyData[] = [
  {
    id: "msft",
    name: "Microsoft",
    industry: "Technology",
    description: "Global technology company focusing on software, cloud computing, and AI",
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
      }
    },
    benchmarks: {
      industryAverageEmissions: 13000000,
      industryAverageEnergy: 8000000,
      industryAverageWaste: 250000,
      industryAverageRenewable: 50
    }
  },
  {
    id: "aapl",
    name: "Apple",
    industry: "Technology",
    description: "Consumer electronics and software company",
    metrics: {
      "2023": {
        emissions: 22300000,
        energy: 12500000,
        waste: 380000,
        renewablePercentage: 75,
        waterUsage: 1400000,
        supplyChainEmissions: 15800000,
        recyclingRate: 70,
        carbonOffset: 8900000
      }
    },
    benchmarks: {
      industryAverageEmissions: 13000000,
      industryAverageEnergy: 8000000,
      industryAverageWaste: 250000,
      industryAverageRenewable: 50
    }
  },
  {
    id: "googl",
    name: "Google",
    industry: "Technology",
    description: "Technology company specializing in internet services and AI",
    metrics: {
      "2023": {
        emissions: 11200000,
        energy: 15800000,
        waste: 290000,
        renewablePercentage: 80,
        waterUsage: 1600000,
        supplyChainEmissions: 7200000,
        recyclingRate: 78,
        carbonOffset: 6100000
      }
    },
    benchmarks: {
      industryAverageEmissions: 13000000,
      industryAverageEnergy: 8000000,
      industryAverageWaste: 250000,
      industryAverageRenewable: 50
    }
  },
  {
    id: "tsla",
    name: "Tesla",
    industry: "Automotive",
    description: "Electric vehicle and clean energy company",
    metrics: {
      "2023": {
        emissions: 8500000,
        energy: 9200000,
        waste: 420000,
        renewablePercentage: 85,
        waterUsage: 2100000,
        supplyChainEmissions: 5600000,
        recyclingRate: 82,
        carbonOffset: 4200000
      }
    },
    benchmarks: {
      industryAverageEmissions: 15000000,
      industryAverageEnergy: 10000000,
      industryAverageWaste: 400000,
      industryAverageRenewable: 30
    }
  },
  {
    id: "amzn",
    name: "Amazon",
    industry: "E-commerce",
    description: "Global e-commerce and cloud computing company",
    metrics: {
      "2023": {
        emissions: 25600000,
        energy: 18900000,
        waste: 520000,
        renewablePercentage: 65,
        waterUsage: 2800000,
        supplyChainEmissions: 19200000,
        recyclingRate: 68,
        carbonOffset: 9800000
      }
    },
    benchmarks: {
      industryAverageEmissions: 20000000,
      industryAverageEnergy: 15000000,
      industryAverageWaste: 450000,
      industryAverageRenewable: 40
    }
  }
];