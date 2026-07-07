import React, { useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { useGlobalStore } from '../../store/useGlobalStore';
import { Wind, Activity, Flame, ShieldAlert, Navigation, CloudRain } from 'lucide-react';
import clsx from 'clsx';
import TelemetryCharts from './TelemetryCharts';
import HistoricalTrendsChart from './HistoricalTrendsChart';

export default function BottomTelemetrySheet() {
  const { bottomSheetState, setBottomSheetState, activeAlerts, currentModule } = useGlobalStore();
  const dragControls = useDragControls();
  const containerRef = useRef<HTMLDivElement>(null);

  // States: 0 (hidden), 1 (partial 380px), 2 (full)
  // For Framer Motion, we can animate `y` or use variants
  const variants = {
    hidden: { y: '100%', opacity: 0 },
    partial: { y: 'calc(100vh - 380px)', opacity: 1 },
    full: { y: 'env(safe-area-inset-top, 40px)', opacity: 1 }
  };

  const getVariant = () => {
    if (bottomSheetState === 0) return 'hidden';
    if (bottomSheetState === 1) return 'partial';
    return 'full';
  };

  const handleDragEnd = (event: any, info: any) => {
    const velocity = info.velocity.y;
    const offset = info.offset.y;

    if (velocity > 500 || offset > 100) {
      if (bottomSheetState === 2) setBottomSheetState(1);
      // else if (bottomSheetState === 1) setBottomSheetState(0); // Optional: Allow closing
    } else if (velocity < -500 || offset < -100) {
      if (bottomSheetState === 1) setBottomSheetState(2);
    }
  };

  // Only show when in map or global mode, but mostly meant for regional/map
  if (currentModule !== 'global' && currentModule !== 'map') return null;

  return (
    <motion.div
      ref={containerRef}
      className="absolute top-0 left-0 w-full h-full bg-[#0F121A]/95 backdrop-blur-3xl rounded-t-3xl border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-30 flex flex-col"
      variants={variants}
      initial="hidden"
      animate={getVariant()}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      drag="y"
      dragControls={dragControls}
      dragListener={false}
      dragConstraints={{ top: 0, bottom: window.innerHeight }}
      dragElastic={0.1}
      onDragEnd={handleDragEnd}
    >
      {/* Drag Handle Area */}
      <div 
        className="w-full flex justify-center pt-4 pb-2 cursor-grab active:cursor-grabbing touch-none"
        onPointerDown={(e) => dragControls.start(e)}
      >
        <div className="w-12 h-1.5 bg-white/20 rounded-full" />
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-32 no-scrollbar">
        {/* Environmental Header */}
        <div className="bg-white/[0.04] rounded-2xl p-4 border border-white/5 mb-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-xs text-gray-400 tracking-wider font-semibold mb-1">WEATHER SUMMARY</div>
              <div className="flex items-end gap-3">
                <Wind className="w-8 h-8 text-blue-400" />
                <span className="text-4xl font-bold tracking-tight">22°C</span>
              </div>
              <div className="text-sm text-gray-300 mt-1">Partly Cloudy</div>
            </div>
            
            {/* Forecast Row */}
            <div className="flex gap-3 text-center text-xs">
              {[
                { time: 'Now', temp: '22°', icon: Wind },
                { time: '03', temp: '21°', icon: Wind },
                { time: '04', temp: '20°', icon: Activity },
                { time: '05', temp: '19°', icon: Activity }
              ].map((f, i) => (
                <div key={i} className="flex flex-col items-center gap-1 opacity-80">
                  <span className="text-gray-400">{f.time}</span>
                  <f.icon className="w-4 h-4 text-blue-300" />
                  <span>{f.temp}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-black/30 rounded-lg px-3 py-2 text-xs flex items-center justify-between text-gray-400">
            <span className="truncate">54720 Cuautitlán Izcalli, State of Mexico</span>
            <span className="text-emerald-400 flex items-center gap-1.5 font-medium ml-2 shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Acceptable
            </span>
          </div>
        </div>

        {/* Threat Level Cards */}
        <div className="text-xs text-gray-400 tracking-wider font-semibold mb-3">RISK ZONES</div>
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-red-500/10 border border-red-500/40 rounded-xl p-3">
            <div className="text-[10px] text-red-400 font-bold mb-1">HIGH</div>
            <Flame className="w-6 h-6 text-red-500 mb-2" />
            <div className="text-xs font-medium text-white leading-tight">Industrial Park</div>
            <div className="text-[10px] text-gray-400 mt-1 leading-tight">High fire incidence</div>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3">
            <div className="text-[10px] text-amber-400 font-bold mb-1">MEDIUM</div>
            <Activity className="w-6 h-6 text-amber-500 mb-2" />
            <div className="text-xs font-medium text-white leading-tight">Urban Center</div>
            <div className="text-[10px] text-gray-400 mt-1 leading-tight">Traffic collisions</div>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3">
            <div className="text-[10px] text-emerald-400 font-bold mb-1">LOW</div>
            <ShieldAlert className="w-6 h-6 text-emerald-500 mb-2" />
            <div className="text-xs font-medium text-white leading-tight">Valle District</div>
            <div className="text-[10px] text-gray-400 mt-1 leading-tight">Clear status</div>
          </div>
        </div>

        {/* Active Events List */}
        <div className="flex justify-between items-center mb-3">
          <div className="text-xs text-gray-400 tracking-wider font-semibold">ACTIVE EVENTS</div>
          <button className="text-[10px] text-blue-400 font-medium">VIEW ALL</button>
        </div>
        
        <div className="space-y-3">
          {activeAlerts.map(event => (
            <div key={event.id} className="bg-white/5 border border-white/5 rounded-xl p-4 flex gap-4 items-center">
              <div className={clsx(
                "w-12 h-12 rounded-full flex items-center justify-center shrink-0",
                event.severity === 'CRÍTICO' ? "bg-red-500/20 text-red-500" :
                event.severity === 'ALTO' ? "bg-amber-500/20 text-amber-500" :
                "bg-blue-500/20 text-blue-500"
              )}>
                {event.iconType === 'hurricane' && <Wind className="w-6 h-6" />}
                {event.iconType === 'earthquake' && <Activity className="w-6 h-6" />}
                {event.iconType === 'fire' && <Flame className="w-6 h-6" />}
                {event.iconType === 'conflict' && <ShieldAlert className="w-6 h-6" />}
                {event.iconType === 'rain' && <CloudRain className="w-6 h-6" />}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div className="font-medium text-sm text-white truncate">{event.title}</div>
                  <div className="text-[10px] text-gray-400 shrink-0 ml-2">{event.timestamp}</div>
                </div>
                <div className="text-xs text-gray-400 mt-0.5 truncate">{event.location}</div>
                
                {event.severity === 'CRÍTICO' && (
                  <div className="mt-3 flex gap-2">
                    <button className="flex-1 bg-white/10 hover:bg-white/20 transition-colors py-2 rounded-lg text-xs font-medium">
                      DETAILS
                    </button>
                    <button className="flex-1 bg-red-500/20 text-red-400 border border-red-500/30 py-2 rounded-lg text-xs font-medium flex justify-center items-center gap-1">
                      <Navigation className="w-3 h-3" /> DETOUR
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Render charts primarily for Maximal Expand state or scrolled view */}
        <TelemetryCharts />
        {bottomSheetState === 2 && <HistoricalTrendsChart />}
      </div>
    </motion.div>
  );
}
