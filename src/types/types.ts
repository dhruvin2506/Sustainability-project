// src/types/types.ts
export interface CompanyData {
    id: string;
    name: string;
    industry: string;
    description: string;
    metrics: {
      [year: string]: {
        emissions: number;
        energy: number;
        waste: number;
        renewablePercentage: number;
      }
    }
  }