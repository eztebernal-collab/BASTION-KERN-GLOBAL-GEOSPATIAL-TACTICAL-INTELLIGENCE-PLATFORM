import React from 'react';
import { motion } from 'framer-motion';

export default function EventLedger() {
  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="absolute bottom-32 left-4 z-20"
    >
      <div className="bg-[#0F121A]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl min-w-[140px]">
        <ul className="space-y-3 text-xs font-mono tracking-wider">
          <li className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-gray-300">SATELLITES</span>
            </div>
            <span className="text-blue-400 font-bold">9</span>
          </li>
          <li className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-gray-300">EVENTS</span>
            </div>
            <span className="text-red-400 font-bold">4</span>
          </li>
          <li className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-gray-300">ASSETS</span>
            </div>
            <span className="text-emerald-400 font-bold">23</span>
          </li>
          <li className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-gray-300">ALERTS</span>
            </div>
            <span className="text-amber-400 font-bold">2</span>
          </li>
        </ul>
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-[10px] text-gray-400">Updated 2m ago</span>
        </div>
      </div>
    </motion.div>
  );
}
