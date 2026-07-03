'use client';

import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Header } from '@/components/shared/Header';

const travelMetrics = [
  { day: 'Day 1', satisfaction: 75, activity: 45, comfort: 80, experience: 70 },
  { day: 'Day 2', satisfaction: 92, activity: 85, comfort: 75, experience: 88 },
  { day: 'Day 3', satisfaction: 88, activity: 70, comfort: 82, experience: 85 },
];

const carbonFootprint = [
  { category: 'Flight', value: 1200 },
  { category: 'Hotel', value: 45 },
  { category: 'Transport', value: 30 },
  { category: 'Food', value: 15 },
];

const personalityMatch = [
  { trait: 'Cultural', value: 92 },
  { trait: 'Adventurous', value: 85 },
  { trait: 'Foodie', value: 88 },
  { trait: 'Social', value: 78 },
  { trait: 'Nature', value: 65 },
  { trait: 'History', value: 80 },
];

const riskScores = [
  { factor: 'Visa', score: 10, status: 'low' },
  { factor: 'Health', score: 15, status: 'low' },
  { factor: 'Safety', score: 8, status: 'low' },
  { factor: 'Weather', score: 25, status: 'medium' },
  { factor: 'Budget', score: 20, status: 'low' },
];

export default function Insights() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Trip <span className="text-primary">Insights & Analytics</span>
          </h1>
          <p className="text-foreground-muted">Deep dive into your Tokyo experience with AI-powered analysis</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass p-6 rounded-xl border border-border">
            <h4 className="text-sm text-foreground-muted mb-2">Total Cost</h4>
            <p className="text-3xl font-bold text-primary">$2,440</p>
            <p className="text-xs text-foreground-muted mt-2">$813/day average</p>
          </div>
          <div className="glass p-6 rounded-xl border border-border">
            <h4 className="text-sm text-foreground-muted mb-2">Avg Satisfaction</h4>
            <p className="text-3xl font-bold text-success">91%</p>
            <p className="text-xs text-foreground-muted mt-2">Highly optimized</p>
          </div>
          <div className="glass p-6 rounded-xl border border-border">
            <h4 className="text-sm text-foreground-muted mb-2">Activities Planned</h4>
            <p className="text-3xl font-bold text-accent">12</p>
            <p className="text-xs text-foreground-muted mt-2">Full itinerary</p>
          </div>
          <div className="glass p-6 rounded-xl border border-border">
            <h4 className="text-sm text-foreground-muted mb-2">Risk Level</h4>
            <p className="text-3xl font-bold text-success">LOW</p>
            <p className="text-xs text-foreground-muted mt-2">Safe to travel</p>
          </div>
        </div>

        {/* Travel Experience Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="glass p-6 rounded-xl border border-border">
            <h3 className="text-lg font-bold text-foreground mb-4">Travel Experience Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={travelMetrics}>
                <defs>
                  <linearGradient id="colorSatisfaction" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00d9ff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00d9ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="day" stroke="#a5b4fc" />
                <YAxis stroke="#a5b4fc" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f1535',
                    border: '1px solid #1e293b',
                    borderRadius: '8px',
                    color: '#e0e8ff',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="satisfaction"
                  stroke="#00d9ff"
                  fillOpacity={1}
                  fill="url(#colorSatisfaction)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Personality Match */}
          <div className="glass p-6 rounded-xl border border-border">
            <h3 className="text-lg font-bold text-foreground mb-4">Destination Personality Match</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={personalityMatch}>
                <PolarGrid stroke="#1e293b" />
                <PolarAngleAxis dataKey="trait" stroke="#a5b4fc" />
                <PolarRadiusAxis stroke="#a5b4fc" />
                <Radar
                  name="Match %"
                  dataKey="value"
                  stroke="#00d9ff"
                  fill="#00d9ff"
                  fillOpacity={0.6}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f1535',
                    border: '1px solid #1e293b',
                    borderRadius: '8px',
                    color: '#e0e8ff',
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="glass p-6 rounded-xl border border-border mb-8">
          <h3 className="text-lg font-bold text-foreground mb-4">Risk Assessment</h3>
          <div className="space-y-4">
            {riskScores.map((risk) => (
              <div key={risk.factor} className="flex items-center gap-4">
                <div className="w-24">
                  <p className="font-bold text-foreground text-sm">{risk.factor}</p>
                </div>
                <div className="flex-1">
                  <div className="w-full bg-background-tertiary rounded-full h-2">
                    <div
                      className={`h-full rounded-full ${
                        risk.status === 'low'
                          ? 'bg-success'
                          : risk.status === 'medium'
                            ? 'bg-warning'
                            : 'bg-danger'
                      }`}
                      style={{ width: `${risk.score}%` }}
                    />
                  </div>
                </div>
                <div className="w-16 text-right">
                  <span
                    className={`inline-block px-3 py-1 rounded text-xs font-bold ${
                      risk.status === 'low'
                        ? 'bg-success/20 text-success'
                        : risk.status === 'medium'
                          ? 'bg-warning/20 text-warning'
                          : 'bg-danger/20 text-danger'
                    }`}
                  >
                    {risk.score}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carbon Footprint */}
        <div className="glass p-6 rounded-xl border border-border mb-8">
          <h3 className="text-lg font-bold text-foreground mb-4">Carbon Footprint Analysis</h3>
          <p className="text-sm text-foreground-muted mb-4">Total: 1,290 kg CO2 emissions</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={carbonFootprint}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="category" stroke="#a5b4fc" />
              <YAxis stroke="#a5b4fc" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f1535',
                  border: '1px solid #1e293b',
                  borderRadius: '8px',
                  color: '#e0e8ff',
                }}
              />
              <Bar dataKey="value" fill="#ef4444" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recommendations */}
        <div className="glass p-6 rounded-xl border border-border">
          <h3 className="text-lg font-bold text-foreground mb-4">🤖 AI Recommendations</h3>
          <div className="space-y-4">
            <div className="p-4 bg-success/10 rounded-lg border border-success/30">
              <p className="font-bold text-foreground mb-1">✓ Excellent Itinerary Balance</p>
              <p className="text-sm text-foreground-muted">Your schedule balances cultural activities (45%), dining (30%), and rest (25%) perfectly for your personality profile.</p>
            </div>
            <div className="p-4 bg-warning/10 rounded-lg border border-warning/30">
              <p className="font-bold text-foreground mb-1">⚠ Weather Preparation Needed</p>
              <p className="text-sm text-foreground-muted">Dec 17 rain forecast is moderate risk. Consider adding indoor activities or bringing reliable rain gear.</p>
            </div>
            <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
              <p className="font-bold text-foreground mb-1">💡 Budget Optimization</p>
              <p className="text-sm text-foreground-muted">You&apos;re tracking at $813/day. Consider exploring more budget-friendly ramen shops to save $100+ for additional activities.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
