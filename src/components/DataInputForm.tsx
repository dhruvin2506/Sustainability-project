import { useState } from 'react';
import { metricsService } from '../services/metricsService';

interface MetricsFormData {
  date: string;
  emissions: number;
  energy: number;
  waste: number;
  notes: string;
}

interface FormErrors {
  date?: string;
  emissions?: string;
  energy?: string;
  waste?: string;
  submit?: string;
}

const DataInputForm = (): JSX.Element => {
  const [formData, setFormData] = useState<MetricsFormData>({
    date: new Date().toISOString().split('T')[0],
    emissions: 0,
    energy: 0,
    waste: 0,
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.date) newErrors.date = 'Date is required';
    if (formData.emissions < 0) newErrors.emissions = 'Emissions cannot be negative';
    if (formData.energy < 0) newErrors.energy = 'Energy cannot be negative';
    if (formData.waste < 0) newErrors.waste = 'Waste cannot be negative';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    
    try {
      await metricsService.saveMetrics(formData);
      setSubmitSuccess(true);
      setFormData({
        date: new Date().toISOString().split('T')[0],
        emissions: 0,
        energy: 0,
        waste: 0,
        notes: ''
      });
      
      // Reset success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      setErrors({ 
        ...errors, 
        submit: 'Failed to save metrics. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const parsedValue = e.target.type === 'number' ? parseFloat(value) || 0 : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: parsedValue
    }));

    // Clear error for this field if it exists
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof FormErrors];
        return newErrors;
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Add New Metrics</h2>
        {submitSuccess && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded">
            Metrics saved successfully!
          </div>
        )}
      </div>

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
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 bg-white text-gray-900
                ${errors.date ? 'border-red-300' : 'border-gray-300'}`}
            />
            {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
          </div>
          <div>
            <label htmlFor="emissions" className="block text-sm font-medium text-gray-700">Carbon Emissions (kg CO2)</label>
            <input
              type="number"
              id="emissions"
              name="emissions"
              value={formData.emissions}
              onChange={handleChange}
              min="0"
              step="0.1"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 bg-white text-gray-900
                ${errors.emissions ? 'border-red-300' : 'border-gray-300'}`}
            />
            {errors.emissions && <p className="mt-1 text-sm text-red-600">{errors.emissions}</p>}
          </div>
          <div>
            <label htmlFor="energy" className="block text-sm font-medium text-gray-700">Energy Usage (kWh)</label>
            <input
              type="number"
              id="energy"
              name="energy"
              value={formData.energy}
              onChange={handleChange}
              min="0"
              step="0.1"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 bg-white text-gray-900
                ${errors.energy ? 'border-red-300' : 'border-gray-300'}`}
            />
            {errors.energy && <p className="mt-1 text-sm text-red-600">{errors.energy}</p>}
          </div>
          <div>
            <label htmlFor="waste" className="block text-sm font-medium text-gray-700">Waste Generated (kg)</label>
            <input
              type="number"
              id="waste"
              name="waste"
              value={formData.waste}
              onChange={handleChange}
              min="0"
              step="0.1"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 bg-white text-gray-900
                ${errors.waste ? 'border-red-300' : 'border-gray-300'}`}
            />
            {errors.waste && <p className="mt-1 text-sm text-red-600">{errors.waste}</p>}
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 bg-white text-gray-900"
          />
        </div>
        
        {errors.submit && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {errors.submit}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 
              focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center gap-2`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              'Save Metrics'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DataInputForm;