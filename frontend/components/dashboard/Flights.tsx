'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';

const priceData = [
  { date: 'Mon', price: 320, airline: 'SkyWing' },
  { date: 'Tue', price: 280, airline: 'AirFlow' },
  { date: 'Wed', price: 290, airline: 'CloudPath' },
  { date: 'Thu', price: 250, airline: 'SkyWing' },
  { date: 'Fri', price: 410, airline: 'AirFlow' },
  { date: 'Sat', price: 490, airline: 'CloudPath' },
  { date: 'Sun', price: 380, airline: 'SkyWing' },
];

const flightOptions = [
  { id: 1, airline: 'SkyWing', departure: '08:30', arrival: '16:45', duration: '8h 15m', price: 320, stops: 0, rating: 4.8 },
  { id: 2, airline: 'AirFlow', departure: '10:15', arrival: '19:30', duration: '9h 15m', price: 280, stops: 1, rating: 4.5 },
  { id: 3, airline: 'CloudPath', departure: '14:00', arrival: '23:15', duration: '9h 15m', price: 290, stops: 1, rating: 4.6 },
  { id: 4, airline: 'SkyWing', departure: '22:00', arrival: '06:30+1', duration: '8h 30m', price: 250, stops: 0, rating: 4.8 },
];

export function Flights() {
  return (
    <div className="space-y-8">
      {/* Price Trends */}
      <div className="glass p-6 rounded-xl border border-border">
        <h3 className="text-lg font-bold text-foreground mb-4">Price Trends (7 Days)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={priceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="date" stroke="#a5b4fc" />
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
            <Line
              type="monotone"
              dataKey="price"
              stroke="#00d9ff"
              strokeWidth={2}
              dot={{ fill: '#00d9ff', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Available Flights */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">Available Flights</h3>
        <div className="space-y-3">
          {flightOptions.map((flight) => (
            <div key={flight.id} className="glass p-6 rounded-xl border border-border hover:border-primary/50 transition-colors">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                {/* Airline & Rating */}
                <div>
                  <p className="font-bold text-foreground">{flight.airline}</p>
                  <p className="text-sm text-foreground-muted">★ {flight.rating}</p>
                </div>

                {/* Times */}
                <div className="flex items-center gap-2">
                  <div>
                    <p className="font-bold text-foreground">{flight.departure}</p>
                    <p className="text-xs text-foreground-muted">Departure</p>
                  </div>
                  <div className="flex-1 border-t border-dashed border-border/50" />
                  <div className="text-center">
                    <p className="text-xs text-foreground-muted">{flight.duration}</p>
                    {flight.stops === 0 ? (
                      <p className="text-xs text-success font-bold">Nonstop</p>
                    ) : (
                      <p className="text-xs text-warning font-bold">{flight.stops} stop</p>
                    )}
                  </div>
                  <div className="flex-1 border-t border-dashed border-border/50" />
                  <div className="text-right">
                    <p className="font-bold text-foreground">{flight.arrival}</p>
                    <p className="text-xs text-foreground-muted">Arrival</p>
                  </div>
                </div>

                {/* Stops */}
                <div className="text-center">
                  <p className="text-sm text-foreground-muted">
                    {flight.stops === 0 ? 'Direct' : `${flight.stops} Stop`}
                  </p>
                </div>

                {/* Price & Button */}
                <div className="flex items-center justify-between md:justify-end gap-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">${flight.price}</p>
                    <p className="text-xs text-foreground-muted">per person</p>
                  </div>
                  <button className="px-6 py-2 bg-primary text-background font-bold rounded-lg hover:bg-primary-light transition-all">
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Flight Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-xl border border-border">
          <h4 className="text-sm text-foreground-muted mb-2">Cheapest Option</h4>
          <p className="text-3xl font-bold text-primary">$250</p>
          <p className="text-xs text-foreground-muted mt-2">SkyWing • 8h 30m</p>
        </div>
        <div className="glass p-6 rounded-xl border border-border">
          <h4 className="text-sm text-foreground-muted mb-2">Fastest Option</h4>
          <p className="text-3xl font-bold text-success">8h 15m</p>
          <p className="text-xs text-foreground-muted mt-2">SkyWing • $320</p>
        </div>
        <div className="glass p-6 rounded-xl border border-border">
          <h4 className="text-sm text-foreground-muted mb-2">Best Value</h4>
          <p className="text-3xl font-bold text-accent">⭐ 4.8</p>
          <p className="text-xs text-foreground-muted mt-2">SkyWing Airlines</p>
        </div>
      </div>
    </div>
  );
}
