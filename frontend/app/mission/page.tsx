'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AgentNetwork } from '@/components/mission/AgentNetwork';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Map, Plane, DollarSign, Zap, TrendingUp, AlertCircle } from 'lucide-react';

interface MissionData {
  destination: string;
  duration: number;
  budget: string;
  travelStyle: string;
  startDate: string;
}

// Mock data
const mockFlightData = [
  { time: '08:00', status: 'Searching', price: 450 },
  { time: '12:00', status: 'Found', price: 420 },
  { time: '16:00', status: 'Optimized', price: 395 },
  { time: '20:00', status: 'Booked', price: 385 },
];

const mockBudgetData = [
  { day: 'Day 1', spent: 120, budget: 200 },
  { day: 'Day 2', spent: 280, budget: 400 },
  { day: 'Day 3', spent: 420, budget: 600 },
  { day: 'Day 4', spent: 580, budget: 800 },
];

const mockItinerary = [
  { time: '10:00 AM', activity: 'Arrive at Tokyo International Airport', icon: 'Plane' },
  { time: '12:00 PM', activity: 'Hotel Check-in (Shinjuku)', icon: 'Hotel' },
  { time: '2:00 PM', activity: 'Explore Shibuya Crossing', icon: 'Map' },
  { time: '6:00 PM', activity: 'Dinner at Michelin Star Restaurant', icon: 'Fork' },
  { time: '9:00 PM', activity: 'Visit Senso-ji Temple (Night)', icon: 'Landmark' },
];

export default function MissionPage() {
  const [missionData, setMissionData] = useState<MissionData | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'agents' | 'budget'>('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading mission data from session storage
    setTimeout(() => {
      setMissionData({
        destination: 'Tokyo, Japan',
        duration: 7,
        budget: '$5000',
        travelStyle: 'balanced',
        startDate: '2024-12-01',
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-primary mb-4">Initiating Mission...</h2>
          <p className="text-foreground-muted">AI agents are orchestrating your journey</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-background-secondary/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-3xl font-bold text-primary">{missionData?.destination}</h1>
              <p className="text-foreground-muted">
                {missionData?.duration} Days • {missionData?.budget} • {missionData?.travelStyle}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-foreground-muted">Mission Status</div>
              <motion.div
                animate={{ opacity: [0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex items-center gap-2 text-primary font-bold"
              >
                <div className="w-2 h-2 bg-primary rounded-full" />
                ACTIVE
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 flex gap-4 border-t border-border">
          {(['overview', 'timeline', 'agents', 'budget'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-4 font-semibold transition-all border-b-2 ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-foreground-muted hover:text-foreground'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Plane, label: 'Flights Found', value: '3 Options', color: 'primary' },
                { icon: Map, label: 'Hotels', value: '12 Available', color: 'accent' },
                { icon: DollarSign, label: 'Total Budget', value: missionData?.budget, color: 'primary' },
                { icon: Zap, label: 'Agents Active', value: '8/8', color: 'success' },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass rounded-lg border border-border p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <Icon size={24} className={`text-${stat.color}`} />
                      <TrendingUp size={16} className="text-success" />
                    </div>
                    <p className="text-foreground-muted text-sm mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Real-time Flight Tracking */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-lg border border-border p-6"
            >
              <h3 className="text-xl font-bold text-foreground mb-6">Flight Price Tracking</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockFlightData}>
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
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#00d9ff"
                    dot={{ fill: '#00d9ff', r: 6 }}
                    strokeWidth={2}
                    isAnimationActive
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </motion.div>
        )}

        {/* Timeline Tab */}
        {activeTab === 'timeline' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-foreground">Recommended Itinerary</h3>
            <div className="space-y-4">
              {mockItinerary.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-lg border border-border p-6 flex gap-6"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center text-primary font-bold">
                      {i + 1}
                    </div>
                    {i < mockItinerary.length - 1 && (
                      <div className="w-0.5 h-12 bg-primary/30 my-2" />
                    )}
                  </div>
                  <div className="flex-1 py-2">
                    <p className="text-primary font-bold text-sm mb-2">{item.time}</p>
                    <p className="text-foreground">{item.activity}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Agents Tab */}
        {activeTab === 'agents' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-foreground mb-6">AI Agent Network</h3>
            <div className="h-96 glass rounded-lg border border-border p-6">
              <AgentNetwork isActive={true} />
            </div>
          </motion.div>
        )}

        {/* Budget Tab */}
        {activeTab === 'budget' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-foreground mb-6">Budget Tracking</h3>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-lg border border-border p-6"
            >
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={mockBudgetData}>
                  <defs>
                    <linearGradient id="colorBudget" x1="0" y1="0" x2="0" y2="1">
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
                      border: '1px solid #00d9ff',
                      borderRadius: '8px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="spent"
                    stroke="#00d9ff"
                    fillOpacity={1}
                    fill="url(#colorBudget)"
                  />
                  <Area
                    type="monotone"
                    dataKey="budget"
                    stroke="#7c3aed"
                    fillOpacity={0.1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            <div className="glass rounded-lg border border-border p-6">
              <div className="flex items-start gap-4">
                <AlertCircle size={24} className="text-warning flex-shrink-0" />
                <div>
                  <p className="font-bold text-foreground">Budget Alert</p>
                  <p className="text-foreground-muted text-sm">You&apos;re tracking slightly above budget. Consider alternative hotels on Day 4.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
