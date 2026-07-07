import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SearchOverlay() {
  return (
    <div className="absolute top-0 w-full pt-[env(safe-area-inset-top,24px)] flex justify-center z-20">
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="mt-4 flex items-center bg-white/[0.05] border border-white/10 backdrop-blur-xl rounded-full px-4 py-3 w-[90%] max-w-md shadow-2xl"
      >
        <Search className="w-5 h-5 text-gray-400 mr-3" />
        <input 
          type="text" 
          placeholder="Search locations, events, assets..." 
          className="bg-transparent border-none outline-none text-white w-full placeholder-gray-400 text-sm"
        />
        <button className="ml-3 p-1 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
          <SlidersHorizontal className="w-4 h-4 text-gray-300" />
        </button>
      </motion.div>
    </div>
  );
}
