import { useState, useEffect } from 'react';
import { CompanyData, ESGData } from '../types/types';
import { companyDataService } from '../services/companyDataService';

interface CompanyProfileProps {
  company: CompanyData;
}

const CompanyProfileView = ({ company }: CompanyProfileProps): JSX.Element => {
  const [esgData, setEsgData] = useState<ESGData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchESGData = async () => {
      setIsLoading(true);
      try {
        const data = await companyDataService.getCompanyESGData(company.ticker);
        setEsgData(data);
      } catch (err) {
        setError('Failed to fetch ESG data');
        console.error('Error fetching ESG data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchESGData();
  }, [company.ticker]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">{company.name}</h2>
          <div className="space-y-3">
            <p className="text-gray-600">
              <span className="font-semibold">Industry:</span> {company.industry}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Ticker:</span> {company.ticker}
            </p>
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-3">Description</h3>
              <p className="text-gray-700">{company.description}</p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-3">ESG Performance</h3>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
            </div>
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : esgData && (
            <div className="space-y-4">
              <div className="border-l-4 border-emerald-500 pl-4">
                <h4 className="font-semibold">Environmental Score</h4>
                <p className="text-2xl text-emerald-600">{esgData.environmental.toFixed(2)}</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold">Social Score</h4>
                <p className="text-2xl text-blue-600">{esgData.social.toFixed(2)}</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold">Governance Score</h4>
                <p className="text-2xl text-purple-600">{esgData.governance.toFixed(2)}</p>
              </div>
              <div className="border-l-4 border-gray-500 pl-4">
                <h4 className="font-semibold">Total ESG Score</h4>
                <p className="text-2xl text-gray-800">{esgData.totalEsg.toFixed(2)}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileView;