import { CompanyGoal } from '../types/types';

interface GoalTrackingProps {
  goals: CompanyGoal[];
}

const GoalTracking = ({ goals }: GoalTrackingProps): JSX.Element => {
  const getStatusColor = (status: CompanyGoal['status']) => {
    switch (status) {
      case 'on-track': return 'bg-green-100 text-green-800';
      case 'at-risk': return 'bg-yellow-100 text-yellow-800';
      case 'behind': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Sustainability Goals</h2>
      <div className="space-y-6">
        {goals.map((goal) => (
          <div key={goal.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold">{goal.metric}</h3>
              <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(goal.status)}`}>
                {goal.status}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-4">{goal.description}</p>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-green-600">
                    {calculateProgress(goal.currentValue, goal.targetValue)}%
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
                  style={{ width: `${calculateProgress(goal.currentValue, goal.targetValue)}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalTracking;