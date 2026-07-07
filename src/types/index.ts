export type ThreatLevel = 'CRÍTICO' | 'ALTO' | 'MEDIO' | 'BAJO';

export interface TelemetryEvent {
  id: string;
  title: string;
  location: string;
  coordinates: [number, number]; // [lat, lng]
  timestamp: string;
  severity: ThreatLevel;
  metricLabel?: string;
  metricValue?: string;
  iconType: 'hurricane' | 'earthquake' | 'fire' | 'rain' | 'conflict' | 'solar' | 'traffic' | 'security' | 'infrastructure';
  description?: string;
  impactRadius?: number;
  recommendations?: string[];
  distance?: number; // km
  source?: {
    agency: string;
    verificationStatus: string;
    reliabilityRating: number;
  };
}

export interface OperationalAsset {
  id: string;
  codename: string;
  position: [number, number];
  status: 'active' | 'compromised' | 'standby';
  bearing: number;
}
