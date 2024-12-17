import { CompanyData } from '../types/types';
import { ESGData } from '../types/types';

export const companiesData: CompanyData[] = [
  {
    id: "msft",
    ticker: "MSFT",
    name: "Microsoft",
    industry: "Technology",
    description: "Global technology company focusing on software, cloud computing, and AI"
  },
  {
    id: "aapl",
    ticker: "AAPL",
    name: "Apple",
    industry: "Technology",
    description: "Consumer electronics and software company"
  },
  {
    id: "googl",
    ticker: "GOOGL",
    name: "Google",
    industry: "Technology",
    description: "Technology company specializing in internet services and AI"
  },
  {
    id: "tsla",
    ticker: "TSLA",
    name: "Tesla",
    industry: "Automotive",
    description: "Electric vehicle and clean energy company"
  },
  {
    id: "amzn",
    ticker: "AMZN",
    name: "Amazon",
    industry: "E-commerce",
    description: "Global e-commerce and cloud computing company"
  }
];

export const companyDataService = {
  getTickerSymbols: {
    msft: 'MSFT',
    aapl: 'AAPL',
    googl: 'GOOGL',
    amzn: 'AMZN',
    tsla: 'TSLA'
  },

  async getCompanyESGData(ticker: string): Promise<ESGData> {
    // Mock data based on the company
    const mockData: { [key: string]: ESGData } = {
      'MSFT': {
        environmental: 85,
        social: 82,
        governance: 88,
        totalEsg: 85
      },
      'AAPL': {
        environmental: 82,
        social: 80,
        governance: 85,
        totalEsg: 82
      },
      'GOOGL': {
        environmental: 80,
        social: 78,
        governance: 83,
        totalEsg: 80
      },
      'TSLA': {
        environmental: 90,
        social: 75,
        governance: 78,
        totalEsg: 81
      },
      'AMZN': {
        environmental: 75,
        social: 72,
        governance: 80,
        totalEsg: 76
      }
    };

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return mockData[ticker] || {
      environmental: 70,
      social: 70,
      governance: 70,
      totalEsg: 70
    };
  }
};