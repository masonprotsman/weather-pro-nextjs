import { WeatherData, TemperatureUnit } from '@/types/weather';
import { formatTemperature, getWeatherIcon, formatTime } from '@/lib/utils';
import { Droplets, Wind, Eye, Gauge } from 'lucide-react';
import Image from 'next/image';

interface WeatherCardProps {
  weather: WeatherData;
  unit: TemperatureUnit;
}

export default function WeatherCard({ weather, unit }: WeatherCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
        <div className="text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
            {weather.name}, {weather.sys.country}
          </h2>
          <p className="text-white/60 text-lg capitalize">
            {weather.weather[0].description}
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Image
            src={getWeatherIcon(weather.weather[0].icon)}
            alt={weather.weather[0].description}
            width={100}
            height={100}
            className="drop-shadow-2xl"
          />
          <div className="text-6xl md:text-7xl font-bold text-white">
            {formatTemperature(weather.main.temp, unit)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
          <div className="flex items-center gap-2 text-white/60 mb-2">
            <Droplets size={20} />
            <span className="text-sm">Humidity</span>
          </div>
          <p className="text-2xl font-semibold text-white">{weather.main.humidity}%</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
          <div className="flex items-center gap-2 text-white/60 mb-2">
            <Wind size={20} />
            <span className="text-sm">Wind Speed</span>
          </div>
          <p className="text-2xl font-semibold text-white">{weather.wind.speed} m/s</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
          <div className="flex items-center gap-2 text-white/60 mb-2">
            <Eye size={20} />
            <span className="text-sm">Visibility</span>
          </div>
          <p className="text-2xl font-semibold text-white">{(weather.visibility / 1000).toFixed(1)} km</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
          <div className="flex items-center gap-2 text-white/60 mb-2">
            <Gauge size={20} />
            <span className="text-sm">Pressure</span>
          </div>
          <p className="text-2xl font-semibold text-white">{weather.main.pressure} hPa</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="text-white/60 text-sm mb-1">Feels Like</p>
          <p className="text-xl font-semibold text-white">
            {formatTemperature(weather.main.feels_like, unit)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-white/60 text-sm mb-1">Sunrise / Sunset</p>
          <p className="text-xl font-semibold text-white">
            {formatTime(weather.sys.sunrise)} / {formatTime(weather.sys.sunset)}
          </p>
        </div>
      </div>
    </div>
  );
}
