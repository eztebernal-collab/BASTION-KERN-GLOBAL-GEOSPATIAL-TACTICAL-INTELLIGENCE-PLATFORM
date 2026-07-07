import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Map as MapIcon, TriangleAlert, FileText, User, LucideIcon } from 'lucide-react';
import { useGlobalStore } from '../../store/useGlobalStore';
import clsx from 'clsx';

type NavItem = {
  id: 'global' | 'map' | 'sos' | 'reports' | 'profile';
  icon: LucideIcon;
  label: string;
  isSOS?: boolean;
};

export default function NavigationHub() {
  const { currentModule, setCurrentModule } = useGlobalStore();

  const navItems: NavItem[] = [
    { id: 'global', icon: Globe, label: 'Global' },
    { id: 'map', icon: MapIcon, label: 'Map' },
    { id: 'sos', icon: TriangleAlert, label: 'S.O.S.', isSOS: true },
    { id: 'reports', icon: FileText, label: 'Reports' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="bg-[#0F121A]/90 backdrop-blur-2xl border border-white/10 rounded-[28px] p-2 flex justify-between items-center shadow-2xl relative overflow-hidden">
      {navItems.map(item => {
        const isActive = currentModule === item.id;
        const Icon = item.icon;
        
        return (
          <motion.button
            key={item.id}
            whileTap={{ scale: 0.88 }}
            onClick={() => {
              if (navigator.vibrate) navigator.vibrate(50); // Haptic micro-interaction
              setCurrentModule(item.id);
            }}
            className="relative flex-1 flex flex-col items-center justify-center py-2 h-16 group outline-none"
          >
            {isActive && !item.isSOS && (
              <motion.div
                layoutId="navIndicator"
                className="absolute inset-0 bg-white/5 rounded-2xl"
                transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              />
            )}
            
            <div className={clsx(
              "relative z-10 flex flex-col items-center justify-center transition-transform duration-200",
              isActive ? "scale-105" : "scale-100",
              item.isSOS && "transform -translate-y-1"
            )}>
              {item.isSOS ? (
                <div className={clsx(
                  "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
                  isActive 
                    ? "bg-red-500/20 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)] border-2" 
                    : "bg-white/5 border border-red-500/30"
                )}>
                  <Icon className={clsx("w-6 h-6", isActive ? "text-red-500" : "text-red-400")} />
                </div>
              ) : (
                <Icon className={clsx("w-5 h-5 mb-1", isActive ? "text-blue-400" : "text-gray-400")} />
              )}
              
              <span className={clsx(
                "text-[10px] font-medium tracking-wide mt-1",
                item.isSOS ? (isActive ? "text-red-500" : "text-red-400") : (isActive ? "text-blue-300" : "text-gray-500")
              )}>
                {item.label}
              </span>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
