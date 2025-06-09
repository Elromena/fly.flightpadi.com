import React from 'react';
import { User, Mail, Phone, Calendar, Globe, ChevronUp, ChevronDown } from 'lucide-react';

interface PassengerForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
}

interface PassengerFormComponentProps {
  form: PassengerForm;
  index: number;
  expandedForms: number[];
  handleFormChange: (index: number, field: keyof PassengerForm, value: string) => void;
  toggleForm: (index: number) => void;
}

const PassengerFormComponent: React.FC<PassengerFormComponentProps> = ({
  form,
  index,
  expandedForms,
  handleFormChange,
  toggleForm
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-4 transition-shadow hover:shadow-md">
      <button
        type="button"
        onClick={() => toggleForm(index)}
        className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 transition-all duration-300"
      >
        <div className="flex items-center gap-3">
          <User className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-gray-900">
            Passenger {index + 1}
            {index === 0 && " (Primary Contact)"}
          </span>
        </div>
        {expandedForms.includes(index) ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>

      {expandedForms.includes(index) && (
        <div className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="flex items-center text-gray-700">
                <User className="w-4 h-4 mr-2" />
                First Name
              </label>
              <input
                type="text"
                required
                value={form.firstName}
                placeholder="Enter first name"
                onChange={(e) => handleFormChange(index, 'firstName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200 hover:border-gray-400"
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center text-gray-700">
                <User className="w-4 h-4 mr-2" />
                Last Name
              </label>
              <input
                type="text"
                required
                value={form.lastName}
                placeholder="Enter last name"
                onChange={(e) => handleFormChange(index, 'lastName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200 hover:border-gray-400"
              />
            </div>
            {index === 0 && (
              <>
                <div className="space-y-2">
                  <label className="flex items-center text-gray-700">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    placeholder="Enter email address"
                    onChange={(e) => handleFormChange(index, 'email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200 hover:border-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center text-gray-700">
                    <Phone className="w-4 h-4 mr-2" />
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    placeholder="Enter phone number"
                    onChange={(e) => handleFormChange(index, 'phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200 hover:border-gray-400"
                  />
                </div>
              </>
            )}
            <div className="space-y-2">
              <label className="flex items-center text-gray-700">
                <Calendar className="w-4 h-4 mr-2" />
                Date of Birth
              </label>
              <input
                type="date"
                required
                value={form.dateOfBirth}
                max={new Date().toISOString().split('T')[0]}
                onChange={(e) => handleFormChange(index, 'dateOfBirth', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200 hover:border-gray-400"
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center text-gray-700">
                <Globe className="w-4 h-4 mr-2" />
                Nationality
              </label>
              <select
                required
                value={form.nationality}
                onChange={(e) => handleFormChange(index, 'nationality', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200 hover:border-gray-400"
              >
                <option value="">Select nationality</option>
                {/* Africa */}
                <optgroup label="Africa">
                <option value="NG">Nigerian</option>
                <option value="GH">Ghanaian</option>
                <option value="KE">Kenyan</option>
                <option value="ZA">South African</option>
                <option value="CM">Cameroonian</option>
                <option value="CI">Ivorian</option>
                <option value="SN">Senegalese</option>
                <option value="UG">Ugandan</option>
                <option value="ET">Ethiopian</option>
                <option value="TZ">Tanzanian</option>
                </optgroup>
                {/* Europe */}
                <optgroup label="Europe">
                <option value="UK">British</option>
                <option value="FR">French</option>
                <option value="DE">German</option>
                <option value="IT">Italian</option>
                <option value="ES">Spanish</option>
                <option value="PT">Portuguese</option>
                <option value="NL">Dutch</option>
                <option value="BE">Belgian</option>
                <option value="IE">Irish</option>
                </optgroup>
                {/* North America */}
                <optgroup label="North America">
                <option value="US">American</option>
                <option value="CA">Canadian</option>
                <option value="MX">Mexican</option>
                </optgroup>
                {/* Asia */}
                <optgroup label="Asia">
                <option value="CN">Chinese</option>
                <option value="JP">Japanese</option>
                <option value="KR">Korean</option>
                <option value="IN">Indian</option>
                <option value="PK">Pakistani</option>
                <option value="PH">Filipino</option>
                <option value="MY">Malaysian</option>
                <option value="SG">Singaporean</option>
                </optgroup>
                {/* Middle East */}
                <optgroup label="Middle East">
                <option value="SA">Saudi Arabian</option>
                <option value="AE">Emirati</option>
                <option value="QA">Qatari</option>
                <option value="TR">Turkish</option>
                <option value="IL">Israeli</option>
                </optgroup>
                {/* Oceania */}
                <optgroup label="Oceania">
                <option value="AU">Australian</option>
                <option value="NZ">New Zealander</option>
                </optgroup>
                {/* South America */}
                <optgroup label="South America">
                <option value="BR">Brazilian</option>
                <option value="AR">Argentinian</option>
                <option value="CO">Colombian</option>
                <option value="CL">Chilean</option>
                </optgroup>
                {/* Other */}
                <optgroup label="Other">
                <option value="OTHER">Other Nationality</option>
                </optgroup>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PassengerFormComponent;