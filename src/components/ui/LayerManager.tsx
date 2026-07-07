import React from 'react';
import { Layers, CloudRain, AlertTriangle, Satellite, Maximize, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGlobalStore } from '../../store/useGlobalStore';
import clsx from 'clsx';

export default function LayerManager() {
  const { activeLayers, toggleLayer } = useGlobalStore();

  const layers = [
    { id: 'All Layers', icon: Layers, label: 'All Layers' },
    { id: 'Weather', icon: CloudRain, label: 'Weather' },
    { id: 'Disasters', icon: AlertTriangle, label: 'Disasters' },
    { id: 'Satellites', icon: Satellite, label: 'Satellites' },
    { id: 'Borders', icon: Maximize, label: 'Borders' },
    { id: 'Activity', icon: Activity, label: 'Activity' },
  ];

  return (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-20">
      <motion.button
        whileTap={{ scale: 0.92 }}
        className="w-12 h-12 rounded-full bg-[#0F121A]/80 backdrop-blur-xl border border-white/10 flex items-center justify-center mb-2 shadow-lg"
      >
        <Layers className="w-5 h-5 text-white" />
      </motion.button>
      
      <div className="flex flex-col gap-3 bg-[#0F121A]/60 backdrop-blur-md border border-white/5 rounded-full p-2">
        {layers.map(layer => {
          const isActive = activeLayers.includes(layer.id);
          const Icon = layer.icon;
          return (
            <motion.button
              key={layer.id}
              whileTap={{ scale: 0.92 }}
              onClick={() => toggleLayer(layer.id)}
              className="flex flex-col items-center group relative"
            >
              <div className={clsx(
                "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                isActive ? "bg-blue-500/20 shadow-[0_0_12px_rgba(59,130,246,0.3)]" : "hover:bg-white/5"
              )}>
                <Icon className={clsx("w-4 h-4", isActive ? "text-blue-400" : "text-gray-400")} />
              </div>
              <span className={clsx("text-[9px] mt-1 text-center leading-tight w-full max-w-[40px] truncate", isActive ? "text-blue-300" : "text-gray-500")}>
                {layer.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
