'use client';

import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  initialCity?: string;
}

export default function SearchBar({ initialCity = '' }: SearchBarProps) {
  const [city, setCity] = useState(initialCity);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      router.push(`/?city=${encodeURIComponent(city.trim())}`);
    }
  };

  const handleLocationSearch = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          router.push(`/?lat=${latitude}&lon=${longitude}`);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please enable location services.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl">
      <div className="relative flex-1">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search for a city..."
          className="w-full px-6 py-4 pr-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white/80 hover:text-white transition-colors"
        >
          <Search size={24} />
        </button>
      </div>
      <button
        type="button"
        onClick={handleLocationSearch}
        className="px-6 py-4 bg-blue-500/20 backdrop-blur-xl border border-blue-400/30 rounded-2xl text-white font-medium hover:bg-blue-500/30 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
      >
        <MapPin size={20} />
        <span className="hidden sm:inline">Use My Location</span>
      </button>
    </form>
  );
}
