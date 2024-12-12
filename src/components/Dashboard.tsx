import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DataPoint {
  month: string;
  emissions: number;
  energy: number;
  waste: number;
}

const sampleData: DataPoint[] = [
  { month: 'Jan', emissions: 400, energy: 240, waste: 180 },
  { month: 'Feb', emissions: 300, energy: 220, waste: 170 },
  { month: 'Mar', emissions: 350, energy: 230, waste: 190 },
  { month: 'Apr', emissions: 280, energy: 200, waste: 160 }
];

const Dashboard = (): JSX.Element => {
  return (
    <div className="p-6 text-gray-800"> {/* Added text color here */}
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Sustainability Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">Total Carbon Emissions</h2>
          <p className="text-2xl text-emerald-600">1,330 kg CO2</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">Energy Usage</h2>
          <p className="text-2xl text-blue-600">890 kWh</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">Waste Generated</h2>
          <p className="text-2xl text-amber-600">700 kg</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Environmental Impact Trends</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sampleData}>
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
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Recommendations</h2>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              <span className="text-gray-700">Switch to LED lighting to reduce energy consumption</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span className="text-gray-700">Implement recycling program for paper waste</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
              <span className="text-gray-700">Regular maintenance of HVAC systems</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;