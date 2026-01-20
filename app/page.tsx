'use client';

import { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import TemperatureToggle from '@/components/TemperatureToggle';
import WeatherCard from '@/components/WeatherCard';
import WeatherForecast from '@/components/WeatherForecast';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import { WeatherData, ForecastData, TemperatureUnit } from '@/types/weather';
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const searchParams = useSearchParams();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<TemperatureUnit>('celsius');

  useEffect(() => {
    const city = searchParams.get('city');
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        let weatherUrl = '/api/weather/current';
        let forecastUrl = '/api/weather/forecast';

        if (lat && lon) {
          weatherUrl += `?lat=${lat}&lon=${lon}`;
          forecastUrl += `?lat=${lat}&lon=${lon}`;
        } else {
          const cityName = city || 'New York';
          weatherUrl += `?city=${encodeURIComponent(cityName)}`;
          forecastUrl += `?city=${encodeURIComponent(cityName)}`;
        }

        const [weatherRes, forecastRes] = await Promise.all([
          fetch(weatherUrl),
          fetch(forecastUrl),
        ]);

        if (!weatherRes.ok) {
          const errorData = await weatherRes.json();
          throw new Error(errorData.error || 'Failed to fetch weather data');
        }

        if (!forecastRes.ok) {
          const errorData = await forecastRes.json();
          throw new Error(errorData.error || 'Failed to fetch forecast data');
        }

        const weatherData = await weatherRes.json();
        const forecastData = await forecastRes.json();

        setWeather(weatherData);
        setForecast(forecastData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [searchParams]);

  const toggleUnit = () => {
    setUnit(unit === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{
          backgroundImage:
            `url('https://images.pexels.com/photos/1431822/pexels-photo-1431822.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/40 to-indigo-900/40"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-2xl tracking-tight">
                Weather
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Pro
                </span>
              </h1>
              <p className="text-white/80 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
                Experience weather like never before with real-time data, beautiful visuals, and precise
                forecasts for any location worldwide.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center space-y-4 lg:space-y-0 lg:space-x-6 mb-12">
              <SearchBar initialCity={searchParams.get('city') || ''} />
              <TemperatureToggle unit={unit} onToggle={toggleUnit} />
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8 pb-12">
            {loading && (
              <div className="flex justify-center">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                  <LoadingSpinner />
                  <p className="text-white/80 text-center mt-4 font-medium">
                    Fetching latest weather data...
                  </p>
                </div>
              </div>
            )}

            {error && !loading && (
              <div className="max-w-2xl mx-auto">
                <ErrorMessage message={error} onRetry={handleRetry} />
              </div>
            )}

            {weather && !loading && !error && (
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2">
                  <WeatherCard weather={weather} unit={unit} />
                </div>
                <div className="xl:col-span-1">
                  {forecast && <WeatherForecast forecast={forecast} unit={unit} />}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
