// src/components/HistoricalMetrics.tsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CompanyData } from '../types/types';

interface HistoricalMetricsProps {
  company: CompanyData;
  years: string[];
}

const HistoricalMetrics = ({ company, years }: HistoricalMetricsProps): JSX.Element => {
  const historicalData = years.map(year => ({
    year,
    ...company.metrics[year],
    industryAvgEmissions: company.benchmarks?.industryAverageEmissions,
    industryAvgEnergy: company.benchmarks?.industryAverageEnergy
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Historical Performance</h2>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="emissions" stroke="#059669" name="Emissions" />
            <Line type="monotone" dataKey="industryAvgEmissions" stroke="#059669" strokeDasharray="5 5" name="Industry Avg Emissions" />
            <Line type="monotone" dataKey="energy" stroke="#2563eb" name="Energy Usage" />
            <Line type="monotone" dataKey="renewablePercentage" stroke="#7c3aed" name="Renewable %" />
            <Line type="monotone" dataKey="recyclingRate" stroke="#059669" name="Recycling Rate" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HistoricalMetrics;