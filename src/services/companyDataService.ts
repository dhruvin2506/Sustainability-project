const YAHOO_FINANCE_API = 'https://query1.finance.yahoo.com/v8/finance/chart/';

interface CompanyESGData {
  environmental: number;
  social: number;
  governance: number;
  totalEsg: number;
}

interface TickerSymbols {
    [key: string]: string;
    msft: string;
    aapl: string;
    googl: string;
    amzn: string;
    tsla: string;
  }
  
  export const companyDataService = {
    getTickerSymbols: {
      msft: 'MSFT',
      aapl: 'AAPL',
      googl: 'GOOGL',
      amzn: 'AMZN',
      tsla: 'TSLA'
    } as TickerSymbols,

  async getCompanyESGData(tickerSymbol: string): Promise<CompanyESGData> {
    try {
      const response = await fetch(`${YAHOO_FINANCE_API}${tickerSymbol}`);
      const data = await response.json();
      
      // Parse and transform the data
      return {
        environmental: data.chart?.result[0]?.indicators?.quote[0]?.open[0] || 0,
        social: data.chart?.result[0]?.indicators?.quote[0]?.high[0] || 0,
        governance: data.chart?.result[0]?.indicators?.quote[0]?.low[0] || 0,
        totalEsg: data.chart?.result[0]?.indicators?.quote[0]?.close[0] || 0,
      };
    } catch (error) {
      console.error('Error fetching company ESG data:', error);
      throw error;
    }
  },

  };