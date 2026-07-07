import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TelemetryEvent } from '../types';
import { ACTIVE_ALERTS } from '../mockData';

type ModuleState = 'global' | 'map' | 'sos' | 'memberships' | 'profile' | 'reports';

interface GlobalState {
  cameraAltitude: number;
  setCameraAltitude: (altitude: number) => void;
  
  currentModule: ModuleState;
  setCurrentModule: (module: ModuleState) => void;
  
  activeLayers: string[];
  toggleLayer: (layer: string) => void;
  
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  
  bottomSheetState: 0 | 1 | 2;
  setBottomSheetState: (state: 0 | 1 | 2) => void;
  
  searchActive: boolean;
  setSearchActive: (active: boolean) => void;
  
  selectedEvent: TelemetryEvent | null;
  setSelectedEvent: (event: TelemetryEvent | null) => void;
  
  activeAlerts: TelemetryEvent[];
}

export const useGlobalStore = create<GlobalState>()(
  persist(
    (set) => ({
      cameraAltitude: 0.15,
      setCameraAltitude: (altitude) => set({ cameraAltitude: altitude }),
      
      currentModule: 'global',
      setCurrentModule: (module) => {
        set({ currentModule: module });
        if (module === 'global') {
          set({ cameraAltitude: 0.15 });
        } else if (module === 'map') {
          set({ cameraAltitude: 0.85 });
        }
      },
      
      activeLayers: ['All Layers'],
      toggleLayer: (layer) => set((state) => {
        if (layer === 'All Layers') {
          return { activeLayers: ['All Layers'] };
        }
        const layers = state.activeLayers.filter(l => l !== 'All Layers');
        if (layers.includes(layer)) {
          const newLayers = layers.filter(l => l !== layer);
          return { activeLayers: newLayers.length === 0 ? ['All Layers'] : newLayers };
        }
        return { activeLayers: [...layers, layer] };
      }),
      
      theme: 'dark',
      setTheme: (theme) => set({ theme }),
      
      bottomSheetState: 1, // Start partial
      setBottomSheetState: (state) => set({ bottomSheetState: state }),
      
      searchActive: false,
      setSearchActive: (active) => set({ searchActive: active }),
      
      selectedEvent: null,
      setSelectedEvent: (event) => set({ selectedEvent: event, bottomSheetState: event ? 1 : 1 }),
      
      activeAlerts: ACTIVE_ALERTS,
    }),
    {
      name: 'bastion-kern-storage', // name of the item in the storage (must be unique)
      partialize: (state) => ({ 
        activeLayers: state.activeLayers,
        theme: state.theme
      }),
    }
  )
);

