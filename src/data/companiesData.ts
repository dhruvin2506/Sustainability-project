// src/data/companiesData.ts
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
        renewablePercentage: 60
      },
      "2022": {
        emissions: 14100000,
        energy: 8200000,
        waste: 265000,
        renewablePercentage: 55
      }
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
        renewablePercentage: 75
      },
      "2022": {
        emissions: 23100000,
        energy: 13100000,
        waste: 410000,
        renewablePercentage: 70
      }
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
        renewablePercentage: 80
      },
      "2022": {
        emissions: 12500000,
        energy: 16400000,
        waste: 315000,
        renewablePercentage: 75
      }
    }
  }
];