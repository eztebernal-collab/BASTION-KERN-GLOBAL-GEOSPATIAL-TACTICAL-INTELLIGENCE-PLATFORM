import { TelemetryEvent } from './types';

export const ACTIVE_ALERTS: TelemetryEvent[] = [
  {
    id: "evt-01",
    title: "Huracán Categoría 4",
    location: "Océano Atlántico Norte",
    coordinates: [24.125, -75.432],
    timestamp: "Hace 10 min",
    severity: "CRÍTICO",
    metricLabel: "Velocidad de vientos",
    metricValue: "215 km/h",
    iconType: "hurricane",
    description: "High-velocity atmospheric vector tracking northwest.",
    impactRadius: 15000,
    distance: 12.4,
    source: {
      agency: "SSN-MX",
      verificationStatus: "Verified Official",
      reliabilityRating: 0.99
    },
    recommendations: [
      "Move to internal concrete safe rooms immediately.",
      "Avoid perimeter glass installations."
    ]
  },
  {
    id: "evt-02",
    title: "Terremoto M6.7",
    location: "Chile",
    coordinates: [-33.448, -70.669],
    timestamp: "Hace 25 min",
    severity: "ALTO",
    iconType: "earthquake",
    description: "Major tectonic rift detected.",
    impactRadius: 50000,
    distance: 6540.2,
    source: {
      agency: "USGS",
      verificationStatus: "Verified Official",
      reliabilityRating: 0.99
    }
  },
  {
    id: "evt-03",
    title: "Incendio Forestal",
    location: "Columbia Británica, Canadá",
    coordinates: [53.726, -127.647],
    timestamp: "Hace 1 hr",
    severity: "ALTO",
    iconType: "fire",
    description: "Macro-scale thermal anomaly.",
    impactRadius: 8000,
    distance: 4320.5
  },
  {
    id: "evt-04",
    title: "Lluvia Intensa",
    location: "India",
    coordinates: [20.5937, 78.9629],
    timestamp: "Hace 2 hrs",
    severity: "MEDIO",
    iconType: "rain"
  },
  {
    id: "evt-05",
    title: "Conflicto Político",
    location: "Europa del Este",
    coordinates: [48.3794, 31.1656],
    timestamp: "Hace 3 hrs",
    severity: "CRÍTICO",
    iconType: "conflict"
  },
  {
    id: "evt-06",
    title: "Erupción Solar",
    location: "Clase M2.3",
    coordinates: [0, 0], // Represented globally
    timestamp: "Hace 5 hrs",
    severity: "MEDIO",
    iconType: "solar"
  }
];
