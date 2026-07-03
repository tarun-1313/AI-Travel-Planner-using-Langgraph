'use client';

import { Header } from '@/components/shared/Header';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Globe, MapPin, DollarSign, Calendar, Users, Plane } from 'lucide-react';

const monthlyData = [
  { month: 'Jan', trips: 1, spending: 2400 },
  { month: 'Feb', trips: 2, spending: 1398 },
  { month: 'Mar', trips: 3, spending: 3200 },
  { month: 'Apr', trips: 1, spending: 2210 },
  { month: 'May', trips: 2, spending: 2290 },
  { month: 'Jun', trips: 4, spending: 2000 },
];

const destinationData = [
  { name: 'Japan', value: 25, color: '#ff6b6b' },
  { name: 'Thailand', value: 20, color: '#4ecdc4' },
  { name: 'Australia', value: 18, color: '#45b7d1' },
  { name: 'France', value: 22, color: '#f9ca24' },
  { name: 'Spain', value: 15, color: '#f0932b' },
];

const stats = [
  { icon: Plane, label: 'Total Flights', value: '24', color: 'from-blue-500 to-cyan-500' },
  { icon: MapPin, label: 'Countries Visited', value: '18', color: 'from-purple-500 to-pink-500' },
  { icon: Calendar, label: 'Total Days Traveled', value: '247', color: 'from-orange-500 to-red-500' },
  { icon: DollarSign, label: 'Total Spending', value: '$12,580', color: 'from-green-500 to-emerald-500' },
];

export default function StatisticsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Travel Statistics</h1>
          <p className="text-xl text-foreground-muted">
            Dive into your travel patterns, spending habits, and favorite destinations.
          </p>
        </div>

        {/* Key Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="glass rounded-xl p-6 border border-border hover:border-primary/30 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} p-3`}>
                    <Icon size={24} className="text-white" />
                  </div>
                </div>
                <p className="text-sm text-foreground-muted mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Monthly Trips Chart */}
          <div className="glass rounded-xl p-6 border border-border">
            <h2 className="text-xl font-bold mb-6 text-foreground">Trips Per Month (2024)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(10, 14, 39, 0.8)',
                    border: '1px solid rgba(0, 217, 255, 0.3)',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="trips" fill="#00d9ff" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Spending Trend */}
          <div className="glass rounded-xl p-6 border border-border">
            <h2 className="text-xl font-bold mb-6 text-foreground">Monthly Spending Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(10, 14, 39, 0.8)',
                    border: '1px solid rgba(124, 58, 237, 0.3)',
                    borderRadius: '8px',
                  }}
                />
                <Line type="monotone" dataKey="spending" stroke="#7c3aed" strokeWidth={3} dot={{ fill: '#7c3aed', r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Destination Distribution */}
          <div className="glass rounded-xl p-6 border border-border lg:col-span-2">
            <h2 className="text-xl font-bold mb-6 text-foreground">Top Destinations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={destinationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {destinationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(10, 14, 39, 0.8)',
                      border: '1px solid rgba(0, 217, 255, 0.3)',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Legend */}
              <div className="space-y-4">
                {destinationData.map((dest, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: dest.color }} />
                    <span className="text-foreground-muted">{dest.name}</span>
                    <span className="ml-auto font-bold text-foreground">{dest.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Travel Insights */}
        <div className="glass rounded-xl p-8 border border-border">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Key Insights</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-1 bg-primary rounded-full" />
              <div>
                <p className="font-semibold text-foreground">You&apos;re an Adventurous Traveler</p>
                <p className="text-foreground-muted text-sm">You visit a new destination every 2.5 weeks on average - you love exploring!</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1 bg-accent rounded-full" />
              <div>
                <p className="font-semibold text-foreground">Asia is Your Favorite</p>
                <p className="text-foreground-muted text-sm">50% of your trips have been to Asian destinations, especially Japan and Thailand.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1 bg-primary-light rounded-full" />
              <div>
                <p className="font-semibold text-foreground">Budget-Conscious Planner</p>
                <p className="text-foreground-muted text-sm">Your average trip cost is $1,048 - you get great value from your travels!</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1 bg-warning rounded-full" />
              <div>
                <p className="font-semibold text-foreground">Best Travel Period</p>
                <p className="text-foreground-muted text-sm">June was your most active month with 4 trips - consider planning more travels during that season.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
