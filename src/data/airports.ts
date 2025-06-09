import type { DomesticAirport } from '../types/flight';

export const nigerianAirports: DomesticAirport[] = [
  {
    iata: 'LOS',
    name: 'Murtala Muhammed International Airport',
    city: 'Lagos',
    type: 'domestic',
    routes: {
      domestic: ['ABV', 'PHC', 'ENU', 'KAN', 'QOW', 'KAD', 'SKO', 'YOL', 'CBQ', 'IBA', 'ILR', 'MDI', 'BNI', 'QRW', 'AKR', 'MXJ', 'MIU', 'BCU', 'DKA', 'GMO', 'JAL', 'ABB', 'DUT', 'ZAR', 'JOS'],
      international: ['LHR', 'CDG', 'FRA', 'AMS', 'IST', 'DXB', 'DOH', 'AUH', 'JFK', 'IAD', 'ATL', 'YYZ', 'ADD', 'NBO', 'CAI', 'ACC', 'DKR']
    }
  },
  {
    iata: 'ABV',
    name: 'Nnamdi Azikiwe International Airport',
    city: 'Abuja',
    type: 'domestic',
    routes: {
      domestic: ['LOS', 'PHC', 'ENU', 'KAN', 'QOW', 'KAD', 'SKO', 'YOL', 'CBQ', 'IBA', 'ILR', 'MDI', 'BNI', 'QRW', 'AKR', 'MXJ', 'MIU', 'BCU', 'DKA', 'GMO', 'JAL', 'ABB', 'DUT', 'ZAR', 'JOS'],
      international: ['LHR', 'CDG', 'DXB', 'DOH', 'ADD', 'CAI', 'ACC']
    }
  },
  {
    iata: 'PHC',
    name: 'Port Harcourt International Airport',
    city: 'Port Harcourt',
    type: 'domestic',
    routes: {
      domestic: ['LOS', 'ABV'],
      international: ['ACC']
    }
  },
  {
    iata: 'ENU',
    name: 'Akanu Ibiam International Airport',
    city: 'Enugu',
    type: 'domestic',
    routes: {
      domestic: ['LOS', 'ABV'],
      international: ['ADD']
    }
  },
  {
    iata: 'KAN',
    name: 'Mallam Aminu Kano International Airport',
    city: 'Kano',
    type: 'domestic',
    routes: {
      domestic: ['LOS', 'ABV', 'PHC', 'ENU', 'CBQ', 'DKA', 'SKO'],
      international: ['CAI', 'JED', 'IST']
    }
  },
  {
    iata: 'QOW',
    name: 'Sam Mbakwe International Cargo Airport',
    city: 'Owerri',
    type: 'domestic',
    routes: {
      domestic: ['LOS', 'ABV', 'CBQ', 'ENU'],
      international: ['ACC', 'ADD']
    }
  },
  {
    iata: 'KAD',
    name: 'Kaduna International Airport',
    city: 'Kaduna',
    type: 'domestic',
    routes: {
      domestic: ['LOS', 'ABV', 'KAN', 'SKO'],
      international: ['CAI']
    }
  },
  {
    iata: 'SKO',
    name: 'Sadiq Abubakar III International Airport',
    city: 'Sokoto',
    type: 'domestic',
    routes: {
      domestic: ['LOS', 'ABV', 'KAN', 'KAD'],
      international: ['CAI']
    }
  },
  {
    iata: 'YOL',
    name: 'Yola International Airport',
    city: 'Yola',
    type: 'domestic',
    routes: {
      domestic: ['LOS', 'ABV'],
      international: []
    }
  },
  {
    iata: 'CBQ',
    name: 'Margaret Ekpo International Airport',
    city: 'Calabar',
    type: 'domestic',
    routes: {
      domestic: ['LOS', 'ABV', 'PHC', 'ENU', 'KAN', 'QOW'],
      international: ['ACC']
    }
  },
  {
    iata: 'IBA',
    name: 'Ibadan Airport',
    city: 'Ibadan',
    type: 'domestic',
    routes: {
      domestic: ['LOS', 'ABV', 'AKR', 'BNI'],
      international: []
    }
  },
  {
    iata: 'ILR',
    name: 'Ilorin International Airport',
    city: 'Ilorin',
    type: 'domestic',
    routes: {
      domestic: ['LOS', 'ABV'],
      international: []
    }
  },
  {
    iata: 'MDI',
    name: 'Makurdi Airport',
    city: 'Makurdi',
    type: 'domestic',
    routes: {
      domestic: ['LOS', 'ABV'],
      international: []
    }
  },
  {
    iata: 'BNI',
    name: 'Benin Airport',
    city: 'Benin City',
    type: 'domestic',
    routes: {
      domestic: ['LOS', 'ABV', 'AKR', 'IBA'],
      international: []
    }
  },
  {
    iata: 'QRW',
    name: 'Warri Airport (Osubi Airstrip)',
    city: 'Warri',
    type: 'domestic',
    routes: {
      domestic: ['LOS', 'ABV'],
      international: []
    }
  },
  {
    iata: 'AKR',
    name: 'Akure Airport',
    city: 'Akure',
    type: 'domestic',
    routes: {
      domestic: ['LOS', 'ABV', 'BNI', 'IBA'],
      international: []
    }
  },
  {
    iata: 'MXJ',
    name: 'Minna Airport',
    city: 'Minna',
    type: 'domestic',
    routes: {
      domestic: ['LOS', 'ABV'],
      international: []
    }
  },
  {
    iata: 'MIU',
    name: 'Maiduguri International Airport',
    city: 'Maiduguri',
    type: 'domestic',
    routes: {
      domestic: ['LOS', 'ABV'],
      international: []
    }
  },
  {
    iata: 'BCU',
    name: 'Bauchi Airport',
    city: 'Bauchi',
    type: 'domestic',
    routes: {
      domestic: ['LOS', 'ABV'],
      international: []
    }
  },
  {
    iata: 'DKA',
    name: 'Katsina Airport',
    city: 'Katsina',
    type: 'domestic',
    routes: {
      domestic: ['LOS', 'ABV'],
      international: []
    }
  },
  {
    iata: 'GMO',
    name: 'Gombe Lawanti International Airport',
    city: 'Gombe',
    type: 'domestic',
    routes: {
      domestic: ['LOS', 'ABV'],
      international: []
    }
  },
  {
    iata: 'JAL',
    name: 'Jalingo Airport',
    city: 'Jalingo',
    type: 'domestic',
    routes: {
      domestic: ['LOS', 'ABV'],
      international: []
    }
  },
  {
    iata: 'ABB',
    name: 'Asaba International Airport',
    city: 'Asaba',
    type: 'domestic',
    routes: {
      domestic: ['LOS', 'ABV'],
      international: []
    }
  },
  {
    iata: 'DUT',
    name: 'Dutse International Airport',
    city: 'Dutse',
    type: 'domestic',
    routes: {
      domestic: ['LOS', 'ABV'],
      international: []
    }
  },
  {
    iata: 'ZAR',
    name: 'Zuru Airstrip',
    city: 'Zuru',
    type: 'domestic',
    routes: {
      domestic: ['LOS', 'ABV'],
      international: []
    }
  },
  {
    iata: 'JOS',
    name: 'Yakubu Gowon Airport',
    city: 'Jos',
    type: 'domestic',
    routes: {
      domestic: ['LOS', 'ABV'],
      international: []
    }
  }
];