import React from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { Plane, Calendar, Users, ArrowRightLeft, Settings, ChevronDown, ChevronUp } from 'lucide-react';
import { nigerianAirports } from '../data/airports';
import { internationalAirports } from '../data/internationalAirports';
import type { TravelClass } from '../types/flight';

const MainSearch = () => {
  const navigate = useNavigate();
  const [tripType, setTripType] = React.useState<'oneway' | 'roundtrip'>('roundtrip');
  const [searchQuery, setSearchQuery] = React.useState({ from: '', to: '' });
  const [showDropdown, setShowDropdown] = React.useState({ from: false, to: false });
  const [showAdvanced, setShowAdvanced] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [formData, setFormData] = React.useState({
    departure_id: '',
    arrival_id: '',
    outbound_date: '',
    return_date: '',
    travel_class: 'ECONOMY' as TravelClass,
    adults: '1',
    children: '0'
  });

  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const searchParams = createSearchParams({
      trip_type: tripType,
      ...formData,
      // Only include return_date for round trips
      ...(tripType === 'roundtrip' && formData.return_date && { return_date: formData.return_date })
    }).toString();
    
    navigate({
      pathname: '/results',
      search: searchParams
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getAvailableDestinations = () => {
    const selectedDeparture = formData.departure_id;
    
    if (!selectedDeparture) return [...nigerianAirports, ...internationalAirports];

    const departureAirport = nigerianAirports.find(
      airport => airport.iata === selectedDeparture
    ) || internationalAirports.find(
      airport => airport.iata === selectedDeparture
    ); 

    if (!departureAirport) return [];

    if ('routes' in departureAirport) {
      const availableRoutes = [...departureAirport.routes.domestic, ...departureAirport.routes.international];
      return [...nigerianAirports, ...internationalAirports].filter(
        airport => availableRoutes.includes(airport.iata)
      );
    }

    // For international airports, find all Nigerian airports that have this airport in their routes
    const domesticConnections = nigerianAirports.filter(airport => 
      airport.routes.international.includes(departureAirport.iata)
    );
    
    // Return both the domestic connections and their international routes
    return [...domesticConnections, ...internationalAirports.filter(airport =>
      domesticConnections.some(domestic => 
        domestic.routes.international.includes(airport.iata)
      )
    )];
  };

  const filteredAirports = {
    from: [...nigerianAirports, ...internationalAirports].filter(airport => 
      airport.name.toLowerCase().includes(searchQuery.from.toLowerCase()) ||
      airport.city.toLowerCase().includes(searchQuery.from.toLowerCase()) ||
      airport.iata.toLowerCase().includes(searchQuery.from.toLowerCase()) ||
      (airport.country && airport.country.toLowerCase().includes(searchQuery.from.toLowerCase()))
    ),
    to: getAvailableDestinations().filter(airport => 
      airport.name.toLowerCase().includes(searchQuery.to.toLowerCase()) ||
      airport.city.toLowerCase().includes(searchQuery.to.toLowerCase()) ||
      airport.iata.toLowerCase().includes(searchQuery.to.toLowerCase()) ||
      (airport.country && airport.country.toLowerCase().includes(searchQuery.to.toLowerCase()))
    )
  };

  const handleAirportSelect = (type: 'from' | 'to', airport: typeof nigerianAirports[0]) => {
    setFormData(prev => {
      const updatedData = {
        ...prev,
        [type === 'from' ? 'departure_id' : 'arrival_id']: airport.iata
      };
      
      if (type === 'from') {
        updatedData.arrival_id = '';
      }
      
      return updatedData;
    });
    setSearchQuery(prev => ({
      ...prev,
      [type]: `${airport.city} (${airport.iata})`,
      // Clear destination input if changing departure
      ...(type === 'from' ? { to: '' } : {})
    }));
    setShowDropdown(prev => ({ ...prev, [type]: false }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 px-4 py-20">
      <div className={`w-full max-w-2xl transform transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <h1 className="text-4xl font-bold text-center mb-3 bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent relative z-10">
          Your Journey Begins Here
        </h1>
        <p className="text-center text-gray-600 mb-8 max-w-xl mx-auto text-lg leading-relaxed relative z-10">
          Skip the complexity of flight booking. We'll help you find the perfect flight that fits your schedule and budget.
        </p>
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100 relative z-20">
          <div className="flex items-center justify-center mb-6">
            <div className="inline-flex rounded-full border border-blue-100 p-1 bg-blue-50/50">
              <button
                type="button"
                onClick={() => setTripType('oneway')}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  tripType === 'oneway'
                    ? 'bg-blue-600 text-white rounded-full shadow-sm'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Plane className="w-4 h-4 mr-2" />
                One-way
              </button>
              <button
                type="button"
                onClick={() => setTripType('roundtrip')}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  tripType === 'roundtrip'
                    ? 'bg-blue-600 text-white rounded-full shadow-sm'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <ArrowRightLeft className="w-4 h-4 mr-2" />
                Round-trip
              </button>
            </div>
          </div>
          
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <label className="flex items-center text-gray-700 font-medium mb-2">
                    <Plane className="w-5 h-5 mr-2" />
                    From
                  </label>
                  <input
                    type="text"
                    value={searchQuery.from}
                    onChange={(e) => {
                      setSearchQuery(prev => ({ ...prev, from: e.target.value }));
                      setShowDropdown(prev => ({ ...prev, from: true }));
                    }}
                    onFocus={() => setShowDropdown(prev => ({ ...prev, from: true }))}
                    placeholder="Search city or airport"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/50 backdrop-blur-sm transition-shadow duration-200 hover:border-gray-300"
                  />
                  {showDropdown.from && (
                    <div className="absolute z-30 w-full mt-1 bg-white/95 backdrop-blur-sm border border-gray-100 rounded-lg shadow-xl max-h-60 overflow-auto">
                      {filteredAirports.from.map(airport => (
                        <button
                          key={airport.iata}
                          type="button"
                          onClick={() => handleAirportSelect('from', airport)}
                          className="w-full px-4 py-3 text-left hover:bg-blue-50/50 focus:bg-blue-50/50 focus:outline-none transition-colors duration-150"
                        >
                          <div className="font-medium text-gray-900">{airport.city} ({airport.iata})</div>
                          <div className="text-sm text-gray-500 mt-0.5">
                            {airport.name}
                            {airport.country && ` • ${airport.country}`}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="relative">
                  <label className="flex items-center text-gray-700 font-medium mb-2">
                    <Plane className="w-5 h-5 mr-2 transform rotate-90" />
                    To
                  </label>
                  <input
                    type="text"
                    value={searchQuery.to}
                    onChange={(e) => {
                      setSearchQuery(prev => ({ ...prev, to: e.target.value }));
                      setShowDropdown(prev => ({ ...prev, to: true }));
                    }}
                    onFocus={() => setShowDropdown(prev => ({ ...prev, to: true }))}
                    placeholder="Search city or airport"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/50 backdrop-blur-sm transition-shadow duration-200 hover:border-gray-300"
                  />
                  {showDropdown.to && (
                    <div className="absolute z-30 w-full mt-1 bg-white/95 backdrop-blur-sm border border-gray-100 rounded-lg shadow-xl max-h-60 overflow-auto">
                      {filteredAirports.to.map(airport => (
                        <button
                          key={airport.iata}
                          type="button"
                          onClick={() => handleAirportSelect('to', airport)}
                          className="w-full px-4 py-3 text-left hover:bg-blue-50/50 focus:bg-blue-50/50 focus:outline-none transition-colors duration-150"
                        >
                          <div className="font-medium text-gray-900">{airport.city} ({airport.iata})</div>
                          <div className="text-sm text-gray-500 mt-0.5">
                            {airport.name}
                            {airport.country && ` • ${airport.country}`}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className={`grid ${tripType === 'roundtrip' ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
                <div>
                  <label className="flex items-center text-gray-700 font-medium">
                    <Calendar className="w-5 h-5 mr-2" />
                    Departure Date
                  </label>
                  <input
                    name="outbound_date"
                    type="date"
                    value={formData.outbound_date}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/50 backdrop-blur-sm transition-shadow duration-200 hover:border-gray-300"
                  />
                </div>
                {tripType === 'roundtrip' && (
                  <div>
                    <label className="flex items-center text-gray-700 font-medium">
                      <Calendar className="w-5 h-5 mr-2" />
                      Return Date
                    </label>
                    <input
                      name="return_date"
                      type="date"
                      value={formData.return_date}
                      onChange={handleInputChange}
                      required
                      min={formData.outbound_date || new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/50 backdrop-blur-sm transition-shadow duration-200 hover:border-gray-300"
                    />
                  </div>
                )}
              </div>
            </div>
            
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center justify-center gap-2 w-full text-gray-600 hover:text-blue-600 py-3 transition-colors group"
            >
              <Settings className="w-4 h-4" />
              More Options
              {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            
            {showAdvanced && (
              <div className="space-y-6 pt-6 mt-2 border-t border-gray-100 bg-blue-50/30 p-6 rounded-xl">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center text-gray-700 font-medium">
                      <Users className="w-5 h-5 mr-2" />
                      Travel Class
                    </label>
                    <select
                      name="travel_class"
                      value={formData.travel_class}
                      onChange={handleInputChange}
                      className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/80 backdrop-blur-sm transition-shadow duration-200 hover:border-gray-300"
                    >
                      <option value="ECONOMY">Economy</option>
                      <option value="PREMIUM_ECONOMY">Premium Economy</option>
                      <option value="BUSINESS">Business</option>
                      <option value="FIRST">First</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="flex items-center text-gray-700 font-medium">
                      <Users className="w-5 h-5 mr-2" /> Adults (12+)
                    </label>
                    <input
                      name="adults"
                      type="number"
                      min="1"
                      max="9"
                      value={formData.adults}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/80 backdrop-blur-sm transition-shadow duration-200 hover:border-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center text-gray-700 font-medium">
                      <Users className="w-5 h-5 mr-2" /> Children (2-11)
                    </label>
                    <input
                      name="children"
                      type="number"
                      min="0"
                      max="9"
                      value={formData.children}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/80 backdrop-blur-sm transition-shadow duration-200 hover:border-gray-300"
                    />
                  </div>
                </div>
                
                <div className="p-4 bg-blue-100/50 rounded-lg border border-blue-200/50">
                  <p className="text-sm text-blue-800">
                    <strong>Traveling with an infant (under 2)?</strong> Please call our customer service at 
                    <a href="tel:+2349124118963" className="text-blue-600 hover:text-blue-800 ml-1">
                      +234 912 411 8963
                    </a>
                  </p>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 rounded-xl font-medium hover:from-blue-700 hover:to-blue-600 transition-all duration-300 mt-6 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transform hover:-translate-y-0.5"
            >
              Search Flights
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MainSearch