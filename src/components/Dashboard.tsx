import React from 'react';
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

function Dashboard(): JSX.Element {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Sustainability Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Total Carbon Emissions</h2>
          <p className="text-2xl">1,330 kg CO2</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Energy Usage</h2>
          <p className="text-2xl">890 kWh</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Waste Generated</h2>
          <p className="text-2xl">700 kg</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Environmental Impact Trends</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="emissions" stroke="#8884d8" />
              <Line type="monotone" dataKey="energy" stroke="#82ca9d" />
              <Line type="monotone" dataKey="waste" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Reduction Goals</h2>
          <ul className="space-y-2">
            <li className="flex items-center justify-between">
              <span>Carbon Emissions</span>
              <span className="text-green-500">-15%</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Energy Usage</span>
              <span className="text-yellow-500">-8%</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Waste Generation</span>
              <span className="text-red-500">-5%</span>
            </li>
          </ul>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Switch to LED lighting to reduce energy consumption</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              <span>Implement recycling program for paper waste</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span>Regular maintenance of HVAC systems</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;