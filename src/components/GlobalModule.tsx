import React from 'react';
import { useGlobalStore } from '../store/useGlobalStore';
import EarthCanvas from './canvas/EarthCanvas';
import SearchOverlay from './ui/SearchOverlay';
import LayerManager from './ui/LayerManager';
import EventLedger from './ui/EventLedger';
import NavigationHub from './ui/NavigationHub';
import BottomTelemetrySheet from './ui/BottomTelemetrySheet';
import SOSHud from './ui/SOSHud';
import Memberships from './ui/Memberships';

export default function GlobalModule() {
  const currentModule = useGlobalStore(state => state.currentModule);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0B0D12] text-white touch-none">
      {/* Base Canvas */}
      <div className="absolute inset-0 z-0">
        <EarthCanvas />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="pointer-events-auto">
          <SearchOverlay />
        </div>
        <div className="pointer-events-auto">
          <LayerManager />
        </div>
        <div className="pointer-events-auto">
          <EventLedger />
        </div>
      </div>

      {/* Sheets & Dashboards */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        <div className="pointer-events-auto">
          {currentModule === 'sos' && <SOSHud />}
          {currentModule === 'memberships' && <Memberships />}
          {(currentModule === 'global' || currentModule === 'map') && <BottomTelemetrySheet />}
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-0 w-full z-40 pb-6 pointer-events-none">
        <div className="pointer-events-auto max-w-md mx-auto px-4">
          <NavigationHub />
        </div>
      </div>
    </div>
  );
}
