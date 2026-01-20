'use client';

import { TemperatureUnit } from '@/types/weather';

interface TemperatureToggleProps {
  unit: TemperatureUnit;
  onToggle: () => void;
}

export default function TemperatureToggle({ unit, onToggle }: TemperatureToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white font-medium hover:bg-white/20 transition-all flex items-center gap-2"
    >
      <span className={unit === 'celsius' ? 'font-bold' : 'opacity-60'}>°C</span>
      <span className="opacity-60">|</span>
      <span className={unit === 'fahrenheit' ? 'font-bold' : 'opacity-60'}>°F</span>
    </button>
  );
}
