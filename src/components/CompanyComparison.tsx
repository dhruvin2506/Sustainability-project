// src/components/CompanyComparison.tsx
import { CompanyData } from '../types/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface CompanyComparisonProps {
  companies: CompanyData[];
  selectedYear: string;
}

const CompanyComparison = ({ companies, selectedYear }: CompanyComparisonProps): JSX.Element => {
  const comparisonData = companies.map(company => ({
    name: company.name,
    emissions: company.metrics[selectedYear]?.emissions || 0,
    energy: company.metrics[selectedYear]?.energy || 0,
    waste: company.metrics[selectedYear]?.waste || 0,
    renewable: company.metrics[selectedYear]?.renewablePercentage || 0
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Company Comparison</h2>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="emissions" fill="#059669" />
            <Bar dataKey="energy" fill="#2563eb" />
            <Bar dataKey="waste" fill="#d97706" />
            <Bar dataKey="renewable" fill="#7c3aed" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CompanyComparison;