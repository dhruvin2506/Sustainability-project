import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CompanyData, ESGData } from '../types/types';
import { companyDataService } from '../services/companyDataService';

interface HistoricalMetricsProps {
  company: CompanyData;
  months: number; // Number of months of historical data to show
}

interface HistoricalDataPoint extends ESGData {
  date: string;
}

const HistoricalMetrics = ({ company, months = 12 }: HistoricalMetricsProps): JSX.Element => {
  const [historicalData, setHistoricalData] = useState<HistoricalDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      setIsLoading(true);
      try {
        // Simulate fetching historical data
        // In a real application, you would make API calls for each time period
        const data = await Promise.all(
          Array.from({ length: months }, async (_, index) => {
            const date = new Date();
            date.setMonth(date.getMonth() - index);
            const esgData = await companyDataService.getCompanyESGData(company.ticker);
            return {
              date: date.toLocaleDateString('default', { month: 'short', year: 'numeric' }),
              ...esgData
            };
          })
        );
        setHistoricalData(data.reverse());
      } catch (err) {
        setError('Failed to fetch historical data');
        console.error('Error fetching historical data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistoricalData();
  }, [company.ticker, months]);

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="text-red-600 text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Historical ESG Performance - {company.name}</h2>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="environmental" 
              stroke="#059669" 
              name="Environmental Score" 
            />
            <Line 
              type="monotone" 
              dataKey="social" 
              stroke="#2563eb" 
              name="Social Score" 
            />
            <Line 
              type="monotone" 
              dataKey="governance" 
              stroke="#7c3aed" 
              name="Governance Score" 
            />
            <Line 
              type="monotone" 
              dataKey="totalEsg" 
              stroke="#d97706" 
              name="Total ESG Score" 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HistoricalMetrics;