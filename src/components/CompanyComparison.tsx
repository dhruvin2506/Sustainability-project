import { useState, useEffect } from 'react';
import { CompanyData } from '../types/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { companyDataService } from '../services/companyDataService';

interface CompanyComparisonProps {
  companies: CompanyData[];
  selectedYear: string;
}

interface ComparisonDataPoint {
  name: string;
  environmental: number;
  social: number;
  governance: number;
  totalEsg: number;
}

const CompanyComparison = ({ companies, selectedYear }: CompanyComparisonProps): JSX.Element => {
  const [comparisonData, setComparisonData] = useState<ComparisonDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const companyDataPromises = companies.map(async (company) => {
          const esgData = await companyDataService.getCompanyESGData(company.ticker);
          return {
            name: company.name,
            ...esgData
          };
        });

        const results = await Promise.all(companyDataPromises);
        setComparisonData(results);
      } catch (err) {
        setError('Failed to fetch comparison data');
        console.error('Error fetching company data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanyData();
  }, [companies, selectedYear]);

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="text-red-600 text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Company ESG Comparison</h2>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="environmental" fill="#059669" name="Environmental Score" />
            <Bar dataKey="social" fill="#2563eb" name="Social Score" />
            <Bar dataKey="governance" fill="#7c3aed" name="Governance Score" />
            <Bar dataKey="totalEsg" fill="#d97706" name="Total ESG Score" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CompanyComparison;