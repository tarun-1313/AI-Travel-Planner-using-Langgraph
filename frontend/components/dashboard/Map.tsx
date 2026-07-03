'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const destinations = [
  { name: 'Tokyo', flights: 45, distance: 5500, color: '#00d9ff' },
  { name: 'Paris', flights: 38, distance: 5800, color: '#7c3aed' },
  { name: 'Bangkok', flights: 52, distance: 6200, color: '#10b981' },
  { name: 'Dubai', flights: 31, distance: 4800, color: '#f59e0b' },
  { name: 'New York', flights: 58, distance: 8600, color: '#ef4444' },
];

const routeData = destinations.map(d => ({
  name: d.name,
  flights: d.flights,
}));

const distanceData = destinations.map(d => ({
  name: d.name,
  distance: d.distance,
}));

export function Map() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Flight Distribution */}
        <div className="glass p-6 rounded-xl border border-border">
          <h3 className="text-lg font-bold text-foreground mb-4">Flight Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={routeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#a5b4fc" />
              <YAxis stroke="#a5b4fc" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f1535',
                  border: '1px solid #1e293b',
                  borderRadius: '8px',
                  color: '#e0e8ff',
                }}
              />
              <Legend />
              <Bar dataKey="flights" fill="#00d9ff" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Distance to Destinations */}
        <div className="glass p-6 rounded-xl border border-border">
          <h3 className="text-lg font-bold text-foreground mb-4">Distance to Destinations</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={distanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#a5b4fc" />
              <YAxis stroke="#a5b4fc" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f1535',
                  border: '1px solid #1e293b',
                  borderRadius: '8px',
                  color: '#e0e8ff',
                }}
              />
              <Legend />
              <Bar dataKey="distance" fill="#7c3aed" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Destinations */}
      <div className="glass p-6 rounded-xl border border-border">
        <h3 className="text-lg font-bold text-foreground mb-4">Popular Destinations</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {destinations.map((dest) => (
            <div key={dest.name} className="p-4 rounded-lg bg-background-tertiary border border-border/50 hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: dest.color }}
                />
                <h4 className="font-bold text-foreground">{dest.name}</h4>
              </div>
              <p className="text-sm text-foreground-muted">
                <span className="text-primary font-bold">{dest.flights}</span> flights
              </p>
              <p className="text-xs text-foreground-muted mt-1">
                {dest.distance} km
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Route Coverage */}
      <div className="glass p-6 rounded-xl border border-border">
        <h3 className="text-lg font-bold text-foreground mb-4">Route Coverage</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={routeData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, flights }) => `${name}: ${flights}`}
              outerRadius={80}
              fill="#00d9ff"
              dataKey="flights"
            >
              {destinations.map((dest) => (
                <Cell key={dest.name} fill={dest.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f1535',
                border: '1px solid #1e293b',
                borderRadius: '8px',
                color: '#e0e8ff',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
