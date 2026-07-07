import React from 'react';
import { motion } from 'framer-motion';
import { TriangleAlert, Phone, Shield, Crosshair, Navigation } from 'lucide-react';

export default function SOSHud() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute inset-0 z-30 bg-black/80 backdrop-blur-sm flex flex-col items-center pt-24 px-6"
    >
      <div className="w-24 h-24 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(239,68,68,0.4)] animate-pulse">
        <TriangleAlert className="w-12 h-12 text-red-500" />
      </div>
      
      <h1 className="text-3xl font-bold tracking-tight text-white mb-2">S.O.S. ACTIVE</h1>
      <p className="text-red-400 text-sm text-center max-w-xs mb-10">
        Emergency beacon transmitting. Local authorities have been pinged with your exact coordinates.
      </p>

      <div className="w-full max-w-sm space-y-4">
        <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-2xl transition-colors shadow-lg flex items-center justify-center gap-3">
          <Phone className="w-5 h-5" />
          DIAL EMERGENCY SERVICES
        </button>
        
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-[#1A1D24] hover:bg-[#252932] border border-white/5 py-4 rounded-2xl flex flex-col items-center gap-2 transition-colors">
            <Shield className="w-6 h-6 text-blue-400" />
            <span className="text-xs font-medium text-gray-300">Police</span>
          </button>
          <button className="bg-[#1A1D24] hover:bg-[#252932] border border-white/5 py-4 rounded-2xl flex flex-col items-center gap-2 transition-colors">
            <Crosshair className="w-6 h-6 text-emerald-400" />
            <span className="text-xs font-medium text-gray-300">Medical</span>
          </button>
        </div>

        <div className="bg-[#1A1D24]/50 border border-white/5 rounded-2xl p-4 mt-4">
          <div className="text-xs text-gray-400 mb-1">CURRENT COORDINATES</div>
          <div className="font-mono text-sm text-blue-300 flex items-center gap-2">
            <Navigation className="w-4 h-4" />
            19.6841° N, 99.2152° W
          </div>
        </div>
      </div>
    </motion.div>
  );
}
