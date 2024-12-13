// src/components/YearOverYearComparison.tsx
import { CompanyData } from '../types/types';

interface YearOverYearProps {
  company: CompanyData;
  currentYear: string;
  previousYear: string;
}

const YearOverYearComparison = ({ company, currentYear, previousYear }: YearOverYearProps): JSX.Element => {
  const calculateChange = (current: number, previous: number) => {
    const percentage = ((current - previous) / previous) * 100;
    return percentage.toFixed(1);
  };

  const currentMetrics = company.metrics[currentYear];
  const previousMetrics = company.metrics[previousYear];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Year-over-Year Changes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold mb-2">Emissions</h3>
          <p className={`text-lg ${Number(calculateChange(currentMetrics.emissions, previousMetrics.emissions)) < 0 ? 'text-green-600' : 'text-red-600'}`}>
            {calculateChange(currentMetrics.emissions, previousMetrics.emissions)}%
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Renewable Energy</h3>
          <p className={`text-lg ${Number(calculateChange(currentMetrics.renewablePercentage, previousMetrics.renewablePercentage)) > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {calculateChange(currentMetrics.renewablePercentage, previousMetrics.renewablePercentage)}%
          </p>
        </div>
        {/* Add more metrics comparisons */}
      </div>
    </div>
  );
};

export default YearOverYearComparison;