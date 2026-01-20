import { NextRequest, NextResponse } from 'next/server';
import { getCurrentWeather, getCurrentWeatherByCoords } from '@/lib/weatherAPI';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get('city');
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  try {
    if (lat && lon) {
      const data = await getCurrentWeatherByCoords(parseFloat(lat), parseFloat(lon));
      return NextResponse.json(data);
    } else if (city) {
      const data = await getCurrentWeather(city);
      return NextResponse.json(data);
    } else {
      return NextResponse.json(
        { error: 'City or coordinates are required' },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}
