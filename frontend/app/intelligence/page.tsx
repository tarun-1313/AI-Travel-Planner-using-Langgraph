'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AlertTriangle, Leaf, Heart, Eye, Zap, Users, Compass, TrendingUp, Shield, MapPin, Lightbulb, Droplet } from 'lucide-react';

const features = [
  {
    icon: AlertTriangle,
    name: 'Risk Assessment',
    description: 'Real-time safety scoring for destinations',
    score: 87,
    color: 'text-success',
  },
  {
    icon: Leaf,
    name: 'Carbon Footprint',
    description: 'Calculate & offset your travel emissions',
    score: 45,
    color: 'text-primary',
  },
  {
    icon: Heart,
    name: 'Personality Match',
    description: 'Destination compatibility score',
    score: 92,
    color: 'text-accent',
  },
  {
    icon: Eye,
    name: 'Hidden Gems',
    description: 'Discover non-touristy attractions',
    score: 78,
    color: 'text-primary',
  },
  {
    icon: Zap,
    name: 'Crowd Prediction',
    description: 'AI forecasts peak & quiet times',
    score: 65,
    color: 'text-warning',
  },
  {
    icon: Users,
    name: 'Social Connect',
    description: 'Match with other travelers',
    score: 72,
    color: 'text-accent',
  },
  {
    icon: Compass,
    name: 'Route Optimizer',
    description: 'Perfect itinerary sequencing',
    score: 94,
    color: 'text-success',
  },
  {
    icon: TrendingUp,
    name: 'Price Predictor',
    description: 'Forecast flight & hotel prices',
    score: 81,
    color: 'text-primary',
  },
  {
    icon: Shield,
    name: 'Travel Insurance',
    description: 'AI-recommended coverage',
    score: 88,
    color: 'text-success',
  },
  {
    icon: MapPin,
    name: 'Local Experience',
    description: 'Authentic cultural activities',
    score: 86,
    color: 'text-accent',
  },
  {
    icon: Lightbulb,
    name: 'Smart Suggestions',
    description: 'AI-personalized recommendations',
    score: 91,
    color: 'text-warning',
  },
  {
    icon: Droplet,
    name: 'Weather Advisor',
    description: 'Detailed climate & packing guide',
    score: 79,
    color: 'text-primary',
  },
];

const personalityData = [
  { category: 'Adventure', value: 75 },
  { category: 'Culture', value: 88 },
  { category: 'Relaxation', value: 65 },
  { category: 'Food', value: 92 },
  { category: 'Nature', value: 78 },
  { category: 'Nightlife', value: 55 },
];

const crowdData = [
  { time: '06:00', crowd: 10 },
  { time: '09:00', crowd: 35 },
  { time: '12:00', crowd: 78 },
  { time: '15:00', crowd: 92 },
  { time: '18:00', crowd: 85 },
  { time: '21:00', crowd: 45 },
  { time: '23:00', crowd: 15 },
];

const carbonData = [
  { category: 'Flight', value: 65 },
  { category: 'Hotel', value: 20 },
  { category: 'Transport', value: 10 },
  { category: 'Activities', value: 5 },
];

const CARBON_COLORS = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6'];

export default function IntelligencePage() {
  const [selectedFeature, setSelectedFeature] = useState(0);
  const [activeView, setActiveView] = useState<'overview' | 'personality' | 'crowd' | 'carbon'>('overview');

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-background-secondary/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold text-primary mb-2">Intelligence Hub</h1>
            <p className="text-foreground-muted">AI-powered travel insights and predictions</p>
          </motion.div>
        </div>

        {/* View Tabs */}
        <div className="max-w-7xl mx-auto px-4 flex gap-4 border-t border-border">
          {(['overview', 'personality', 'crowd', 'carbon'] as const).map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`px-4 py-4 font-semibold transition-all border-b-2 ${
                activeView === view
                  ? 'border-primary text-primary'
                  : 'border-transparent text-foreground-muted hover:text-foreground'
              }`}
            >
              {view === 'overview' && 'Features'}
              {view === 'personality' && 'Personality'}
              {view === 'crowd' && 'Crowd Prediction'}
              {view === 'carbon' && 'Carbon Footprint'}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Overview Tab */}
        {activeView === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">AI Intelligence Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {features.map((feature, i) => {
                  const Icon = feature.icon;
                  return (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => setSelectedFeature(i)}
                      className={`text-left p-6 rounded-lg border transition-all ${
                        selectedFeature === i
                          ? 'glass-dark border-primary/50 bg-primary/10'
                          : 'glass border-border hover:border-primary/30'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <Icon size={24} className={feature.color} />
                        <div className="text-right">
                          <div className="text-2xl font-bold text-foreground">{feature.score}%</div>
                        </div>
                      </div>
                      <h3 className="font-bold text-foreground mb-1">{feature.name}</h3>
                      <p className="text-sm text-foreground-muted">{feature.description}</p>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Selected Feature Detail */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-dark rounded-lg border border-primary/30 p-8"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {features[selectedFeature].name}
                  </h3>
                  <p className="text-foreground-muted">{features[selectedFeature].description}</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-primary">{features[selectedFeature].score}%</div>
                  <p className="text-foreground-muted text-sm mt-2">Score</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-bold text-foreground">Key Insights</h4>
                  <ul className="space-y-2 text-sm text-foreground-muted">
                    <li>✓ Real-time data processing with ML models</li>
                    <li>✓ Continuous learning from user preferences</li>
                    <li>✓ Integration with external data sources</li>
                    <li>✓ Personalized recommendations engine</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-bold text-foreground">Impact</h4>
                  <p className="text-sm text-foreground-muted">
                    This intelligence feature helps optimize your travel experience by providing data-driven insights
                    and recommendations tailored to your unique preferences and travel style.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Personality Tab */}
        {activeView === 'personality' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <h2 className="text-2xl font-bold text-foreground">Your Travel Personality</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="glass-dark rounded-lg border border-primary/30 p-8 flex items-center justify-center"
              >
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={personalityData}>
                    <PolarGrid stroke="#1e293b" />
                    <PolarAngleAxis dataKey="category" stroke="#a5b4fc" />
                    <PolarRadiusAxis stroke="#a5b4fc" />
                    <Radar name="Score" dataKey="value" stroke="#00d9ff" fill="#00d9ff" fillOpacity={0.3} />
                  </RadarChart>
                </ResponsiveContainer>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-bold text-foreground mb-6">Your Profile</h3>
                {personalityData.map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <span className="text-foreground">{item.category}</span>
                      <span className="text-primary font-bold">{item.value}%</span>
                    </div>
                    <div className="w-full bg-background-secondary rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.value}%` }}
                        transition={{ delay: i * 0.1 + 0.3, duration: 0.8 }}
                        className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Crowd Prediction Tab */}
        {activeView === 'crowd' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <h2 className="text-2xl font-bold text-foreground">Crowd Prediction</h2>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="glass-dark rounded-lg border border-primary/30 p-8"
            >
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={crowdData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="time" stroke="#a5b4fc" />
                  <YAxis stroke="#a5b4fc" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f1535',
                      border: '1px solid #00d9ff',
                      borderRadius: '8px',
                    }}
                  />
                  <Line type="monotone" dataKey="crowd" stroke="#00d9ff" strokeWidth={2} dot={{ fill: '#00d9ff' }} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            <div className="glass-dark rounded-lg border border-primary/30 p-6">
              <h4 className="font-bold text-foreground mb-4">Recommendations</h4>
              <div className="space-y-3">
                <p className="text-sm text-foreground-muted">
                  <span className="text-primary font-bold">Best Time:</span> 06:00 - 09:00 AM (low crowds)
                </p>
                <p className="text-sm text-foreground-muted">
                  <span className="text-accent font-bold">Peak Hours:</span> 12:00 - 15:00 (avoid)
                </p>
                <p className="text-sm text-foreground-muted">
                  <span className="text-success font-bold">Evening:</span> 18:00 - 21:00 (moderate crowds)
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Carbon Footprint Tab */}
        {activeView === 'carbon' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <h2 className="text-2xl font-bold text-foreground">Carbon Footprint Analysis</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="glass-dark rounded-lg border border-primary/30 p-8 flex items-center justify-center"
              >
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={carbonData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {carbonData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CARBON_COLORS[index % CARBON_COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-2">4.2 Tons CO₂</h3>
                  <p className="text-foreground-muted">Total estimated emissions</p>
                </div>

                <div className="space-y-4">
                  {[
                    { item: 'Carbon Offset Program', cost: '+$45', status: 'Available' },
                    { item: 'Eco-friendly Hotels', cost: '-$120', status: 'Savings' },
                    { item: 'Green Transport', cost: '-$30', status: 'Savings' },
                  ].map((option, i) => (
                    <div key={i} className="p-4 rounded-lg bg-background-secondary border border-border">
                      <div className="flex justify-between mb-2">
                        <span className="font-bold text-foreground">{option.item}</span>
                        <span className={option.status === 'Savings' ? 'text-success' : 'text-primary'}>
                          {option.cost}
                        </span>
                      </div>
                      <p className="text-xs text-foreground-muted">{option.status}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
