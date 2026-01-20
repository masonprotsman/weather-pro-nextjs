# Weather Pro - Next.js

A modern weather application built with Next.js 14, TypeScript, and Tailwind CSS, featuring server-side rendering and the OpenWeatherMap API.

## Features

- 🌤️ Real-time weather data for any location worldwide
- 📅 5-day weather forecast
- 🌡️ Temperature unit toggle (Celsius/Fahrenheit)
- 📍 Geolocation support for current location weather
- 🎨 Beautiful, responsive UI with Tailwind CSS
- ⚡ Server-side rendering for better performance and SEO
- 🔒 Secure API key handling on the server

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **API:** OpenWeatherMap API

## Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenWeatherMap API key (get one free at [openweathermap.org](https://openweathermap.org/api))

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd weather-pro-nextjs
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
OPENWEATHER_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
weather-pro-nextjs/
├── app/
│   ├── api/
│   │   └── weather/
│   │       ├── current/route.ts    # Current weather API route
│   │       └── forecast/route.ts   # Forecast API route
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx                    # Home page
│   └── globals.css                 # Global styles
├── components/
│   ├── ErrorMessage.tsx            # Error display component
│   ├── LoadingSpinner.tsx          # Loading indicator
│   ├── SearchBar.tsx               # City search and location
│   ├── TemperatureToggle.tsx       # Unit toggle button
│   ├── WeatherCard.tsx             # Current weather display
│   └── WeatherForecast.tsx         # 5-day forecast
├── lib/
│   ├── utils.ts                    # Utility functions
│   └── weatherAPI.ts               # Weather API client
├── types/
│   └── weather.ts                  # TypeScript interfaces
└── .env.local                      # Environment variables
```

## Features in Detail

### Server-Side Rendering
Weather data is fetched on the server through Next.js API routes, keeping your API key secure and improving performance.

### Temperature Units
Toggle between Celsius and Fahrenheit with a single click.

### Location Search
- Search for any city worldwide
- Use your current location with one click
- Beautiful autocomplete suggestions

### Responsive Design
Fully responsive layout that works perfectly on mobile, tablet, and desktop devices.

## Environment Variables

Create a `.env.local` file with:

```env
OPENWEATHER_API_KEY=your_api_key_here
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add your `OPENWEATHER_API_KEY` environment variable
4. Deploy!

### Other Platforms

This is a standard Next.js application and can be deployed to any platform that supports Node.js.

## License

MIT

## Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons by [Lucide](https://lucide.dev/)
- Background image from [Pexels](https://www.pexels.com/)
# weather-pro-nextjs
