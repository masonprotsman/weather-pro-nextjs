import { ForecastData, TemperatureUnit } from '@/types/weather';
import { formatTemperature, getWeatherIcon, formatDate } from '@/lib/utils';
import Image from 'next/image';

interface WeatherForecastProps {
  forecast: ForecastData;
  unit: TemperatureUnit;
}

export default function WeatherForecast({ forecast, unit }: WeatherForecastProps) {
  // Group forecast by day and get one entry per day (at noon)
  const dailyForecasts = forecast.list.filter((item) => 
    item.dt_txt.includes('12:00:00')
  ).slice(0, 5);

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl">
      <h3 className="text-2xl font-bold text-white mb-6">5-Day Forecast</h3>
      
      <div className="space-y-4">
        {dailyForecasts.map((day) => (
          <div
            key={day.dt}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 flex items-center justify-between"
          >
            <div className="flex items-center gap-4 flex-1">
              <Image
                src={getWeatherIcon(day.weather[0].icon)}
                alt={day.weather[0].description}
                width={50}
                height={50}
              />
              <div>
                <p className="text-white font-semibold">{formatDate(day.dt)}</p>
                <p className="text-white/60 text-sm capitalize">{day.weather[0].description}</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-2xl font-bold text-white">
                {formatTemperature(day.main.temp, unit)}
              </p>
              <p className="text-white/60 text-sm">
                {formatTemperature(day.main.temp_min, unit)} / {formatTemperature(day.main.temp_max, unit)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
