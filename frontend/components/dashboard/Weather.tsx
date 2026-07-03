'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const weatherData = [
  { day: 'Dec 15', temp: 52, humidity: 65, windSpeed: 12 },
  { day: 'Dec 16', temp: 55, humidity: 60, windSpeed: 10 },
  { day: 'Dec 17', temp: 50, humidity: 70, windSpeed: 15 },
];

const hourlyWeather = [
  { time: '08:00', temp: 48, condition: 'Cloudy', icon: '☁️', humidity: 65 },
  { time: '12:00', temp: 54, condition: 'Partly Cloudy', icon: '🌤️', humidity: 60 },
  { time: '16:00', temp: 52, condition: 'Cloudy', icon: '☁️', humidity: 62 },
  { time: '20:00', temp: 50, condition: 'Rainy', icon: '🌧️', humidity: 75 },
];

export function Weather() {
  return (
    <div className="space-y-8">
      {/* Current Conditions */}
      <div className="glass p-8 rounded-xl border border-border text-center">
        <div className="text-6xl mb-4">🌤️</div>
        <p className="text-4xl font-bold text-foreground mb-2">52°F</p>
        <p className="text-xl text-foreground-muted mb-4">Partly Cloudy in Tokyo</p>
        <div className="grid grid-cols-3 gap-4 mt-6 max-w-md mx-auto">
          <div className="p-3 bg-background-tertiary rounded-lg">
            <p className="text-xs text-foreground-muted">Humidity</p>
            <p className="text-lg font-bold text-foreground">65%</p>
          </div>
          <div className="p-3 bg-background-tertiary rounded-lg">
            <p className="text-xs text-foreground-muted">Wind Speed</p>
            <p className="text-lg font-bold text-foreground">12 mph</p>
          </div>
          <div className="p-3 bg-background-tertiary rounded-lg">
            <p className="text-xs text-foreground-muted">UV Index</p>
            <p className="text-lg font-bold text-foreground">4/11</p>
          </div>
        </div>
      </div>

      {/* Temperature Trend */}
      <div className="glass p-6 rounded-xl border border-border">
        <h3 className="text-lg font-bold text-foreground mb-4">Temperature Forecast</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weatherData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="day" stroke="#a5b4fc" />
            <YAxis stroke="#a5b4fc" domain={[40, 60]} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f1535',
                border: '1px solid #1e293b',
                borderRadius: '8px',
                color: '#e0e8ff',
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="temp" stroke="#f59e0b" strokeWidth={2} name="Temperature (°F)" />
            <Line type="monotone" dataKey="humidity" stroke="#00d9ff" strokeWidth={2} name="Humidity (%)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Hourly Forecast */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">Hourly Forecast</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {hourlyWeather.map((hour) => (
            <div key={hour.time} className="glass p-4 rounded-lg border border-border/50 text-center">
              <p className="text-sm font-bold text-foreground-muted mb-2">{hour.time}</p>
              <div className="text-4xl mb-2">{hour.icon}</div>
              <p className="text-2xl font-bold text-foreground mb-1">{hour.temp}°</p>
              <p className="text-xs text-foreground-muted mb-3">{hour.condition}</p>
              <p className="text-xs text-foreground-muted">💧 {hour.humidity}%</p>
            </div>
          ))}
        </div>
      </div>

      {/* Packing Suggestions */}
      <div className="glass p-6 rounded-xl border border-border">
        <h3 className="text-lg font-bold text-foreground mb-4">Weather-Based Packing Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-accent/10 rounded-lg border border-accent/30">
            <p className="font-bold text-foreground mb-2">Bring:</p>
            <ul className="text-sm text-foreground-muted space-y-1">
              <li>✓ Light jacket or sweater</li>
              <li>✓ Umbrella (rainy on Dec 17)</li>
              <li>✓ Comfortable walking shoes</li>
              <li>✓ Sunglasses & sunscreen</li>
            </ul>
          </div>
          <div className="p-4 bg-danger/10 rounded-lg border border-danger/30">
            <p className="font-bold text-foreground mb-2">Avoid:</p>
            <ul className="text-sm text-foreground-muted space-y-1">
              <li>✗ Heavy winter coat</li>
              <li>✗ Shorts or sleeveless tops</li>
              <li>✗ Sandals (wet conditions)</li>
              <li>✗ Heavy rain gear</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
