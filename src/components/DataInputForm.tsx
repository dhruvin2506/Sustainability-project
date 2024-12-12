import { useState } from 'react';

interface MetricsFormData {
  date: string;
  emissions: number;
  energy: number;
  waste: number;
  notes: string;
}

const DataInputForm = (): JSX.Element => {
  const [formData, setFormData] = useState<MetricsFormData>({
    date: new Date().toISOString().split('T')[0],
    emissions: 0,
    energy: 0,
    waste: 0,
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add API integration here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Metrics</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="emissions" className="block text-sm font-medium text-gray-700">Carbon Emissions (kg CO2)</label>
            <input
              type="number"
              id="emissions"
              name="emissions"
              value={formData.emissions}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="energy" className="block text-sm font-medium text-gray-700">Energy Usage (kWh)</label>
            <input
              type="number"
              id="energy"
              name="energy"
              value={formData.energy}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="waste" className="block text-sm font-medium text-gray-700">Waste Generated (kg)</label>
            <input
              type="number"
              id="waste"
              name="waste"
              value={formData.waste}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
        </div>
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Save Metrics
          </button>
        </div>
      </form>
    </div>
  );
};

export default DataInputForm;