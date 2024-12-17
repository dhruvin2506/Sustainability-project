import { useState, useEffect } from 'react';
import { CompanyData, ESGData } from '../types/types';
import { companyDataService } from '../services/companyDataService';

interface GoalTrackingProps {
  company: CompanyData;
}

type ESGMetric = 'environmental' | 'social' | 'governance' | 'totalEsg';

interface ESGGoal {
  id: string;
  metric: ESGMetric;
  targetValue: number;
  description: string;
}

const GoalTracking = ({ company }: GoalTrackingProps): JSX.Element => {
  const [esgData, setEsgData] = useState<ESGData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const goals: ESGGoal[] = [
    {
      id: '1',
      metric: 'environmental',
      targetValue: 80,
      description: 'Improve environmental sustainability score'
    },
    {
      id: '2',
      metric: 'social',
      targetValue: 75,
      description: 'Enhance social responsibility metrics'
    },
    {
      id: '3',
      metric: 'governance',
      targetValue: 85,
      description: 'Strengthen corporate governance practices'
    },
    {
      id: '4',
      metric: 'totalEsg',
      targetValue: 80,
      description: 'Improve overall ESG performance'
    }
  ];

  useEffect(() => {
    const fetchESGData = async () => {
      setIsLoading(true);
      try {
        const data = await companyDataService.getCompanyESGData(company.ticker);
        setEsgData(data);
      } catch (err) {
        setError('Failed to fetch ESG data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchESGData();
  }, [company.ticker]);

  const getStatusColor = (currentValue: number, targetValue: number) => {
    const progress = (currentValue / targetValue) * 100;
    if (progress >= 90) return 'bg-green-100 text-green-800';
    if (progress >= 75) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const calculateProgress = (currentValue: number, targetValue: number) => {
    return Math.min(Math.round((currentValue / targetValue) * 100), 100);
  };

  const getStatus = (currentValue: number, targetValue: number) => {
    const progress = (currentValue / targetValue) * 100;
    if (progress >= 90) return 'on-track';
    if (progress >= 75) return 'at-risk';
    return 'behind';
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
        </div>
      </div>
    );
  }

  if (error || !esgData) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-red-600">{error || 'No data available'}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">ESG Goals - {company.name}</h2>
      <div className="space-y-6">
        {goals.map((goal) => {
          const currentValue = esgData[goal.metric];
          const status = getStatus(currentValue, goal.targetValue);
          
          return (
            <div key={goal.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">
                  {goal.metric.charAt(0).toUpperCase() + goal.metric.slice(1)} Score
                </h3>
                <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(currentValue, goal.targetValue)}`}>
                  {status}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{goal.description}</p>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-green-600">
                      {calculateProgress(currentValue, goal.targetValue)}%
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block">
                      Target: {goal.targetValue}
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                  <div
                    style={{ width: `${calculateProgress(currentValue, goal.targetValue)}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GoalTracking;