import { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DataInputForm from './DataInputForm';
import { metricsService } from '../services/metricsService';
import { companiesData } from '../data/companiesData';
import { companyDataService } from '../services/companyDataService';
import CompanySelector from './CompanySelector';
import CompanyComparison from './CompanyComparison';
import YearOverYearComparison from './YearOverYearComparison';
import HistoricalMetrics from './HistoricalMetrics';
import GoalTracking from './GoalTracking';

interface TickerSymbols {
  [key: string]: string;
  msft: string;
  aapl: string;
  googl: string;
  amzn: string;
  tsla: string;
}
interface DataPoint {
  month: string;
  emissions: number;
  energy: number;
  waste: number;
}

interface RealTimeData {
  environmental: number;
  social: number;
  governance: number;
  totalEsg: number;
}

const sampleData: DataPoint[] = [
  { month: 'Jan', emissions: 400, energy: 240, waste: 180 },
  { month: 'Feb', emissions: 300, energy: 220, waste: 170 },
  { month: 'Mar', emissions: 350, energy: 230, waste: 190 },
  { month: 'Apr', emissions: 280, energy: 200, waste: 160 }
];

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-40">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
  </div>
);

const Dashboard = (): JSX.Element => {
  const [metrics, setMetrics] = useState(sampleData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'high' | 'low'>('all');
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>(companiesData[0].id);
  const [selectedYear, setSelectedYear] = useState<string>("2023");
  const [realTimeData, setRealTimeData] = useState<RealTimeData | null>(null);

  const calculateTotals = useMemo(() => {
    return metrics.reduce((acc, curr) => ({
      totalEmissions: acc.totalEmissions + curr.emissions,
      totalEnergy: acc.totalEnergy + curr.energy,
      totalWaste: acc.totalWaste + curr.waste
    }), { totalEmissions: 0, totalEnergy: 0, totalWaste: 0 });
  }, [metrics]);

  const filteredData = useMemo(() => {
    return metrics.filter(metric => {
      const matchesSearch = metric.month.toLowerCase().includes(searchTerm.toLowerCase());
      if (filterType === 'high') return matchesSearch && metric.emissions > 350;
      if (filterType === 'low') return matchesSearch && metric.emissions < 350;
      return matchesSearch;
    });
  }, [metrics, searchTerm, filterType]);

  useEffect(() => {
    const fetchRealTimeData = async () => {
      try {
        const ticker = companyDataService.getTickerSymbols[selectedCompanyId as keyof TickerSymbols];
        if (ticker) {
          const data = await companyDataService.getCompanyESGData(ticker);
          setRealTimeData(data);
        }
      } catch (error) {
        console.error('Error fetching real-time data:', error instanceof Error ? error.message : 'An error occurred');
      }
    };
  
    fetchRealTimeData();
    const interval = setInterval(fetchRealTimeData, 60000);
    return () => clearInterval(interval);
  }, [selectedCompanyId]);

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const startDate = dateRange[0]?.toISOString() || '2024-01-01';
        const endDate = dateRange[1]?.toISOString() || '2024-12-31';
        const data = await metricsService.getCompanyMetrics(selectedCompanyId, startDate, endDate);
        const transformedData = data.map(d => ({
          month: new Date(d.date).toLocaleString('default', { month: 'short' }),
          emissions: d.emissions,
          energy: d.energy,
          waste: d.waste
        }));
        setMetrics(transformedData);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Error fetching metrics');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, [dateRange, selectedCompanyId]);

  const handleExportData = async () => {
    try {
      const startDate = dateRange[0]?.toISOString().split('T')[0] || '2024-01-01';
      const endDate = dateRange[1]?.toISOString().split('T')[0] || '2024-12-31';
      const blob = await metricsService.exportReport(startDate, endDate);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sustainability-metrics.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error exporting data');
    }
  };

  return (
    <div className="p-6 text-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Sustainability Dashboard</h1>
        <div className="flex gap-4">
            <CompanySelector 
            companies={companiesData}
            selectedCompanyId={selectedCompanyId}
            onSelectCompany={setSelectedCompanyId}
            />
            <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-3 py-2 border rounded-md  bg-white text-gray-900"
            >
            <option value="2023">2023</option>
            <option value="2022">2022</option>
        </select>
        <div className="flex items-center gap-2">
            <DatePicker
              selectsRange
              startDate={dateRange[0]}
              endDate={dateRange[1]}
              onChange={(dates) => {
                const [start, end] = dates;
                setDateRange([start, end]);
              }}
              className="px-3 py-2 border rounded-md bg-white text-gray-900"
              placeholderText="Select date range"
            />
          </div>
          <button
            onClick={handleExportData}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Export Data
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">Total Carbon Emissions</h2>
          <p className="text-2xl text-emerald-600">{calculateTotals.totalEmissions.toLocaleString()} kg CO2</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">Energy Usage</h2>
          <p className="text-2xl text-blue-600">{calculateTotals.totalEnergy.toLocaleString()} kWh</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">Waste Generated</h2>
          <p className="text-2xl text-amber-600">{calculateTotals.totalWaste.toLocaleString()} kg</p>
        </div>
      </div>
      {realTimeData && (
  <div className="bg-white p-4 rounded-lg shadow">
    <h2 className="text-xl font-semibold mb-4 text-gray-800">ESG Score Goals</h2>
    <ul className="space-y-2">
      <li className="flex items-center justify-between">
        <span className="text-gray-700">Environmental Score</span>
        <span className={`font-semibold ${realTimeData.environmental > 70 ? 'text-green-600' : 'text-red-600'}`}>
          {realTimeData.environmental.toFixed(1)}
        </span>
      </li>
      <li className="flex items-center justify-between">
        <span className="text-gray-700">Social Score</span>
        <span className={`font-semibold ${realTimeData.social > 70 ? 'text-green-600' : 'text-red-600'}`}>
          {realTimeData.social.toFixed(1)}
        </span>
      </li>
      <li className="flex items-center justify-between">
        <span className="text-gray-700">Governance Score</span>
        <span className={`font-semibold ${realTimeData.governance > 70 ? 'text-green-600' : 'text-red-600'}`}>
          {realTimeData.governance.toFixed(1)}
        </span>
      </li>
    </ul>
  </div>
)}

      <div className="mb-6">
        <DataInputForm />
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Environmental Impact Trends</h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search by month..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border rounded-md bg-white text-gray-900"
            />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as 'all' | 'high' | 'low')}
              className="px-3 py-2 border rounded-md bg-white text-gray-900"
            >
              <option value="all">All Emissions</option>
              <option value="high">High Emissions</option>
              <option value="low">Low Emissions</option>
            </select>
          </div>
        </div>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="emissions" stroke="#059669" strokeWidth={2} />
                <Line type="monotone" dataKey="energy" stroke="#2563eb" strokeWidth={2} />
                <Line type="monotone" dataKey="waste" stroke="#d97706" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <CompanyComparison 
        companies={companiesData}
        selectedYear={selectedYear}
      />
      <div className="grid grid-cols-1 gap-6 mb-6">
  <HistoricalMetrics 
    company={companiesData.find(c => c.id === selectedCompanyId)!}
    months={12}
  />
  
  <YearOverYearComparison 
    company={companiesData.find(c => c.id === selectedCompanyId)!}
  />

  <GoalTracking 
    company={companiesData.find(c => c.id === selectedCompanyId)!}
  />
</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Reduction Goals</h2>
          <ul className="space-y-2">
            <li className="flex items-center justify-between">
              <span className="text-gray-700">Carbon Emissions</span>
              <span className="text-emerald-600 font-semibold">-15%</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-gray-700">Energy Usage</span>
              <span className="text-blue-600 font-semibold">-8%</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-gray-700">Waste Generation</span>
              <span className="text-amber-600 font-semibold">-5%</span>
            </li>
          </ul>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
  <h2 className="text-xl font-semibold mb-4 text-gray-800">ESG Recommendations</h2>
  <ul className="space-y-2">
    {realTimeData && realTimeData.environmental < 70 && (
      <li className="flex items-center gap-2">
        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
        <span className="text-gray-700">Implement environmental management system</span>
      </li>
    )}
    {realTimeData && realTimeData.social < 70 && (
      <li className="flex items-center gap-2">
        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
        <span className="text-gray-700">Enhance stakeholder engagement programs</span>
      </li>
    )}
    {realTimeData && realTimeData.governance < 70 && (
      <li className="flex items-center gap-2">
        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
        <span className="text-gray-700">Strengthen corporate governance practices</span>
      </li>
    )}
  </ul>
</div>
      </div>
    </div>
  );
};

export default Dashboard;