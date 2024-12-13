// src/components/CompanySelector.tsx
import { CompanyData } from '../types/types';

interface CompanySelectorProps {
  companies: CompanyData[];
  selectedCompanyId: string;
  onSelectCompany: (companyId: string) => void;
}

const CompanySelector = ({ companies, selectedCompanyId, onSelectCompany }: CompanySelectorProps): JSX.Element => {
  return (
    <div className="mb-6">
      <select
        value={selectedCompanyId}
        onChange={(e) => onSelectCompany(e.target.value)}
        className="px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
      >
        {companies.map((company) => (
          <option key={company.id} value={company.id}>
            {company.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CompanySelector;