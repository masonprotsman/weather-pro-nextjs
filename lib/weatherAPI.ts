import { WeatherData, ForecastData, CitySearchResult } from '@/types/weather';
import { getApiKey } from './awsConfig';

const BASE_URL = "https://api.openweathermap.org/data/2.5";
const GEO_URL = "https://api.openweathermap.org/geo/1.0";

export async function getCurrentWeather(city: string): Promise<WeatherData> {
  const API_KEY = await getApiKey();
  
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`,
      { next: { revalidate: 300 } } // Cache for 5 minutes
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`City ${city} not found, please check the spelling and try again.`);
      } else if (response.status === 401) {
        throw new Error("Invalid API key. Please check your OpenWeatherMap API key.");
      } else {
        throw new Error("Weather service is temporarily unavailable, please try again later.");
      }
    }

    const data = await response.json();

    if (!data.dt) {
      data.dt = Math.floor(Date.now() / 1000);
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error("Network error occurred. Please check your internet connection.");
    }
    throw error;
  }
}

export async function getCurrentWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
  const API_KEY = await getApiKey();
  
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
      { next: { revalidate: 300 } }
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Invalid API key. Please check your OpenWeatherMap API key.");
      } else {
        throw new Error("Weather service is temporarily unavailable, please try again later.");
      }
    }

    const data = await response.json();

    if (!data.dt) {
      data.dt = Math.floor(Date.now() / 1000);
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error("Network error occurred. Please check your internet connection.");
    }
    throw error;
  }
}

export async function getWeatherForecast(city: string): Promise<ForecastData> {
  const API_KEY = await getApiKey();
  
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`,
      { next: { revalidate: 300 } }
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`City ${city} not found, please check the spelling and try again.`);
      } else if (response.status === 401) {
        throw new Error("Invalid API key. Please check your OpenWeatherMap API key.");
      } else {
        throw new Error("Weather service is temporarily unavailable, please try again later.");
      }
    }

    return await response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error("Network error occurred. Please check your internet connection.");
    }
    throw error;
  }
}

export async function getWeatherForecastByCoords(lat: number, lon: number): Promise<ForecastData> {
  const API_KEY = await getApiKey();
  
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
      { next: { revalidate: 300 } }
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Invalid API key. Please check your OpenWeatherMap API key.");
      } else {
        throw new Error("Weather service is temporarily unavailable, please try again later.");
      }
    }
    

    return await response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error("Network error occurred. Please check your internet connection.");
    }
    throw error;
  }
}

export async function searchCities(query: string): Promise<CitySearchResult[]> {
  const API_KEY = await getApiKey();
  
  try {
    const response = await fetch(
      `${GEO_URL}/direct?q=${query}&limit=5&appid=${API_KEY}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Invalid API key. Please check your OpenWeatherMap API key.");
      } else {
        throw new Error("Weather service is temporarily unavailable, please try again later.");
      }
    }

    const data = await response.json();

    return data.map((city: any) => ({
      name: city.name,
      lat: city.lat,
      lon: city.lon,
      country: city.country,
      state: city.state || "",
    }));
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error("Network error occurred. Please check your internet connection.");
    }
    throw error;
  }
}
