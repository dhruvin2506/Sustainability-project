import { useState, useEffect } from 'react';
import { CompanyData, ESGData } from '../types/types';
import { companyDataService } from '../services/companyDataService';

interface YearOverYearProps {
  company: CompanyData;
}

interface ComparisonData {
  currentYear: ESGData;
  previousYear: ESGData;
}

const YearOverYearComparison = ({ company }: YearOverYearProps): JSX.Element => {
  const [comparisonData, setComparisonData] = useState<ComparisonData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComparisonData = async () => {
      setIsLoading(true);
      try {
        // In a real application, you would make two separate API calls for different time periods
        const currentYearData = await companyDataService.getCompanyESGData(company.ticker);
        const previousYearData = await companyDataService.getCompanyESGData(company.ticker);

        setComparisonData({
          currentYear: currentYearData,
          previousYear: previousYearData
        });
      } catch (err) {
        setError('Failed to fetch comparison data');
        console.error('Error fetching comparison data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComparisonData();
  }, [company.ticker]);

  const calculateChange = (current: number, previous: number) => {
    const percentage = ((current - previous) / previous) * 100;
    return percentage.toFixed(1);
  };

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
        </div>
      </div>
    );
  }

  if (error || !comparisonData) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="text-red-600 text-center">{error || 'No data available'}</div>
      </div>
    );
  }

  const { currentYear, previousYear } = comparisonData;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Year-over-Year ESG Changes - {company.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold mb-2">Environmental Score</h3>
          <p className={`text-lg ${Number(calculateChange(currentYear.environmental, previousYear.environmental)) > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {calculateChange(currentYear.environmental, previousYear.environmental)}%
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Social Score</h3>
          <p className={`text-lg ${Number(calculateChange(currentYear.social, previousYear.social)) > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {calculateChange(currentYear.social, previousYear.social)}%
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Governance Score</h3>
          <p className={`text-lg ${Number(calculateChange(currentYear.governance, previousYear.governance)) > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {calculateChange(currentYear.governance, previousYear.governance)}%
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Total ESG Score</h3>
          <p className={`text-lg ${Number(calculateChange(currentYear.totalEsg, previousYear.totalEsg)) > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {calculateChange(currentYear.totalEsg, previousYear.totalEsg)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default YearOverYearComparison;