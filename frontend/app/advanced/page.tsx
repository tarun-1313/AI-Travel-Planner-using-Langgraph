'use client';

import { useState } from 'react';
import { Header } from '@/components/shared/Header';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, Legend } from 'recharts';
import { AlertTriangle, Leaf, Heart, TrendingUp } from 'lucide-react';

const personalityData = [
  { attribute: 'Adventure', value: 85 },
  { attribute: 'Comfort', value: 60 },
  { attribute: 'Culture', value: 90 },
  { attribute: 'Nature', value: 75 },
  { attribute: 'Luxury', value: 50 },
  { attribute: 'Budget', value: 70 },
];

const carbonData = [
  { transport: 'Flight', carbon: 850, percentage: 65 },
  { transport: 'Hotel', carbon: 280, percentage: 21 },
  { transport: 'Local Transit', carbon: 120, percentage: 9 },
  { transport: 'Activities', carbon: 50, percentage: 4 },
];

const riskCategories = [
  {
    name: 'Health & Safety',
    score: 72,
    details: ['Vaccinations up to date', 'Travel insurance: Active', 'Medical contacts: Saved'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    name: 'Weather & Natural',
    score: 58,
    details: ['Typhoon season awareness', 'Earthquake preparedness', 'Heat precautions'],
    color: 'from-yellow-500 to-orange-500',
  },
  {
    name: 'Security & Crime',
    score: 81,
    details: ['Low crime areas planned', 'Emergency contacts saved', 'Local alerts enabled'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Financial Risk',
    score: 88,
    details: ['Budget tracking active', 'Currency monitoring', 'Fraud protection on'],
    color: 'from-purple-500 to-pink-500',
  },
];

export default function AdvancedPage() {
  const [activeRiskCard, setActiveRiskCard] = useState(0);
  const totalCarbonEmissions = 1300;
  const offset = 1500;
  const carbonOffset = Math.round((offset / totalCarbonEmissions) * 100);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Advanced Travel Intelligence</h1>
          <p className="text-xl text-foreground-muted">
            AI-powered risk assessment, environmental impact analysis, and personality-based recommendations.
          </p>
        </div>

        {/* Personality Analysis */}
        <div className="glass rounded-xl p-8 border border-border mb-12">
          <div className="flex items-center gap-3 mb-8">
            <Heart className="text-primary" size={28} />
            <h2 className="text-2xl font-bold">Your Travel Personality Profile</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={personalityData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="attribute" stroke="rgba(255,255,255,0.5)" />
                  <PolarRadiusAxis stroke="rgba(255,255,255,0.5)" />
                  <Radar name="Your Profile" dataKey="value" stroke="#00d9ff" fill="#00d9ff" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              <div className="glass-dark rounded-lg p-4 border border-primary/20">
                <p className="text-sm text-foreground-muted mb-1">Travel Type</p>
                <p className="text-xl font-bold text-primary">Cultural Explorer</p>
                <p className="text-sm text-foreground-muted mt-2">
                  You seek authentic cultural experiences while maintaining moderate comfort levels. You&apos;re willing to adapt and explore.
                </p>
              </div>

              <div className="glass-dark rounded-lg p-4 border border-accent/20">
                <p className="text-sm text-foreground-muted mb-1">Recommended Travel Style</p>
                <p className="text-xl font-bold text-accent">Boutique & Local Experiences</p>
                <p className="text-sm text-foreground-muted mt-2">
                  Small-group tours, local homestays, and cultural immersion activities align perfectly with your profile.
                </p>
              </div>

              <div className="glass-dark rounded-lg p-4 border border-primary-light/20">
                <p className="text-sm text-foreground-muted mb-1">Risk Affinity</p>
                <p className="text-lg font-bold text-primary-light">Moderate Risk Taker</p>
                <p className="text-sm text-foreground-muted mt-2">
                  You&apos;re comfortable with some uncertainty but prefer researched, relatively safe adventures.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <AlertTriangle className="text-warning" size={28} />
            <h2 className="text-2xl font-bold">Risk Assessment Dashboard</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {riskCategories.map((category, idx) => (
              <button
                key={idx}
                onClick={() => setActiveRiskCard(idx)}
                className={`glass rounded-xl p-6 border transition-all text-left ${
                  activeRiskCard === idx ? 'border-primary' : 'border-border hover:border-primary/30'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg text-foreground">{category.name}</h3>
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                    <span className="text-white font-bold text-xl">{category.score}</span>
                  </div>
                </div>

                {activeRiskCard === idx && (
                  <div className="mt-6 pt-6 border-t border-border/50 space-y-2">
                    <p className="text-sm text-foreground-muted font-semibold">Safety Measures:</p>
                    {category.details.map((detail, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-foreground-muted">
                        <span className="text-primary">✓</span>
                        {detail}
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-4 w-full bg-background-tertiary rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${category.color}`}
                    style={{ width: `${category.score}%` }}
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Overall Risk Score */}
          <div className="glass rounded-xl p-6 border border-border mt-6">
            <p className="text-sm text-foreground-muted mb-2">Overall Travel Safety Score</p>
            <div className="flex items-center gap-4">
              <div className="text-5xl font-bold text-primary">75</div>
              <div className="flex-1">
                <div className="w-full bg-background-tertiary rounded-full h-3">
                  <div className="h-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500" style={{ width: '75%' }} />
                </div>
                <p className="text-sm text-foreground-muted mt-2">Good - Your trip is well-planned and safe</p>
              </div>
            </div>
          </div>
        </div>

        {/* Carbon Footprint Calculator */}
        <div className="glass rounded-xl p-8 border border-border">
          <div className="flex items-center gap-3 mb-8">
            <Leaf className="text-green-500" size={28} />
            <h2 className="text-2xl font-bold">Carbon Footprint Analysis</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={carbonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="transport" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(10, 14, 39, 0.8)',
                      border: '1px solid rgba(0, 217, 255, 0.3)',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="carbon" fill="#10b981" radius={[8, 8, 0, 0]}>
                    {carbonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.percentage > 40 ? '#ef4444' : '#10b981'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              <div className="glass-dark rounded-lg p-4 border border-green-500/20">
                <p className="text-sm text-foreground-muted mb-1">Total Emissions</p>
                <p className="text-3xl font-bold text-green-400">{totalCarbonEmissions} kg CO₂</p>
                <p className="text-xs text-foreground-muted mt-1">Estimated for this 7-day trip</p>
              </div>

              <div className="glass-dark rounded-lg p-4 border border-blue-500/20">
                <p className="text-sm text-foreground-muted mb-1">Carbon Offset</p>
                <p className="text-3xl font-bold text-blue-400">{offset} kg CO₂</p>
                <p className="text-xs text-foreground-muted mt-1">You&apos;ve offset {carbonOffset}% of your trip</p>
              </div>

              <div className="rounded-lg p-4 bg-green-500/10 border border-green-500/30">
                <p className="text-sm font-semibold text-green-400 mb-2">Carbon Reduction Tips:</p>
                <ul className="text-sm text-foreground-muted space-y-1">
                  <li>• Choose direct flights (saves fuel)</li>
                  <li>• Use public transport over taxis</li>
                  <li>• Support eco-friendly hotels</li>
                  <li>• Consider train travel where available</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
