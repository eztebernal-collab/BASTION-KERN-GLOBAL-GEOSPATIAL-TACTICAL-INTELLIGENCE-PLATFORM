import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Check } from 'lucide-react';

export default function Memberships() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute inset-0 z-30 bg-[#0B0D12] overflow-y-auto pb-32 pt-16 px-6"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Choose your operational tier.</h1>
        <p className="text-gray-400 text-sm">Monthly or annual billing. Cancel any time.</p>
      </div>

      <div className="flex bg-white/5 p-1 rounded-full w-fit mx-auto mb-10">
        <button className="px-6 py-2 rounded-full bg-amber-500 text-black font-semibold text-sm">Monthly</button>
        <button className="px-6 py-2 rounded-full text-gray-400 font-medium text-sm">Annual <span className="text-emerald-400 text-[10px] ml-1">2 months free</span></button>
      </div>

      <div className="space-y-4 max-w-sm mx-auto">
        <div className="bg-[#1A1D24] border border-amber-500/30 rounded-3xl p-6 relative shadow-[0_0_30px_rgba(245,158,11,0.1)]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-500 text-black text-[10px] font-bold px-3 py-1 rounded-full tracking-wider">
            MOST POPULAR
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            <Crown className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-bold text-white">Sentinel™</h2>
          </div>
          <p className="text-xs text-gray-400 mb-4">Professionals & teams.</p>
          
          <div className="mb-6">
            <span className="text-3xl font-bold text-white">€29.99</span>
            <span className="text-sm text-gray-500">/mo</span>
          </div>
          
          <button className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 rounded-xl transition-colors mb-6">
            Subscribe
          </button>
          
          <ul className="space-y-3">
            {[
              "Geo-tracking",
              "AI classification",
              "Sensor layers",
              "Advanced alerts"
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-white/5 border border-white/5 rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-lg font-bold text-white">Operator™</h2>
          </div>
          <p className="text-xs text-gray-400 mb-4">Essential tools.</p>
          
          <div className="mb-6">
            <span className="text-3xl font-bold text-white">Free</span>
          </div>
          
          <button className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 rounded-xl transition-colors mb-6">
            Current Plan
          </button>
          
          <ul className="space-y-3">
            {[
              "Smart Map access",
              "Basic alerts",
              "S.O.S routing",
              "Community reports"
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-gray-400">
                <Check className="w-4 h-4 text-gray-500 shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
