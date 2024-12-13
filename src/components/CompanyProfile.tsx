import { CompanyProfile, SustainabilityInitiative } from '../types/types';

interface CompanyProfileProps {
  profile: CompanyProfile;
}

const CompanyProfileView = ({ profile }: CompanyProfileProps): JSX.Element => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">{profile.name}</h2>
          <div className="space-y-3">
            <p className="text-gray-600"><span className="font-semibold">Industry:</span> {profile.industry}</p>
            <p className="text-gray-600"><span className="font-semibold">Founded:</span> {profile.foundedYear}</p>
            <p className="text-gray-600"><span className="font-semibold">Headquarters:</span> {profile.headquarters}</p>
            <p className="text-gray-600"><span className="font-semibold">Employees:</span> {profile.employeeCount.toLocaleString()}</p>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3">Description</h3>
            <p className="text-gray-700">{profile.description}</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-3">Sustainability Initiatives</h3>
          <div className="space-y-4">
          {profile.sustainabilityInitiatives.map((initiative: SustainabilityInitiative, index: number) => (
              <div key={index} className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold">{initiative.title}</h4>
                <p className="text-sm text-gray-600">{initiative.description}</p>
                <p className="text-sm text-gray-500 mt-1">Started: {initiative.startDate}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileView;