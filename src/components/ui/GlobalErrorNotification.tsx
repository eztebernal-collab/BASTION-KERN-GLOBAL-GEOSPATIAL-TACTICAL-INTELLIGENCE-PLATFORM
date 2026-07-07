import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalStore } from '../../store/useGlobalStore';
import { AlertTriangle, X } from 'lucide-react';

export default function GlobalErrorNotification() {
  const { globalError, setGlobalError } = useGlobalStore();

  useEffect(() => {
    if (globalError) {
      const timer = setTimeout(() => {
        setGlobalError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [globalError, setGlobalError]);

  return (
    <AnimatePresence>
      {globalError && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-sm pointer-events-auto"
        >
          <div className="bg-[#151923]/95 backdrop-blur-xl border border-red-500/30 rounded-2xl p-4 shadow-2xl flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4 text-red-500" />
            </div>
            <div className="flex-1 mt-0.5">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">System Error</h4>
              <p className="text-xs text-white/70 mt-1 leading-relaxed">{globalError}</p>
            </div>
            <button 
              onClick={() => setGlobalError(null)}
              className="p-1 hover:bg-white/5 rounded-lg transition-colors shrink-0"
            >
              <X className="w-4 h-4 text-white/50" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
