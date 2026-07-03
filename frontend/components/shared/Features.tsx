'use client';

import { DashboardCard } from '@/components/dashboard/DashboardCard';

export function Features() {
  const features = [
    {
      icon: '🗺️',
      title: 'Interactive Map',
      description: 'Real-time destination visualization with flight routes and weather overlays',
      variant: 'default' as const,
    },
    {
      icon: '✈️',
      title: 'Flight Tracker',
      description: 'Live flight data, prices, and intelligent routing recommendations',
      variant: 'accent' as const,
    },
    {
      icon: '📅',
      title: 'Smart Timeline',
      description: 'Day-by-day itinerary planning with AI-suggested activities',
      variant: 'default' as const,
    },
    {
      icon: '💰',
      title: 'Budget Planner',
      description: 'Track expenses, estimate costs, and optimize your travel budget',
      variant: 'success' as const,
    },
    {
      icon: '🌤️',
      title: 'Weather Insights',
      description: 'Seasonal forecasts and climate data for your destinations',
      variant: 'accent' as const,
    },
    {
      icon: '🍽️',
      title: 'Food Guide',
      description: 'Curated restaurants and local cuisine recommendations',
      variant: 'default' as const,
    },
    {
      icon: '🎒',
      title: 'Packing List',
      description: 'AI-generated packing recommendations based on weather and activities',
      variant: 'success' as const,
    },
    {
      icon: '📋',
      title: 'Visa Assistant',
      description: 'Visa requirements, documentation, and processing timelines',
      variant: 'default' as const,
    },
  ];

  return (
    <section className="relative py-20 px-4 border-t border-border">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Complete Travel</span>
            <br />
            <span className="text-primary">Command Center</span>
          </h2>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
            Eight integrated dashboards to manage every aspect of your journey, from flights to cuisine, visas to emergency contacts.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <DashboardCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              variant={feature.variant}
            />
          ))}
        </div>

        {/* Feature highlights */}
        <div className="mt-20 pt-12 border-t border-border/50 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-5xl mb-4">🤖</div>
            <h3 className="text-xl font-bold text-primary mb-2">AI Orchestration</h3>
            <p className="text-foreground-muted">
              LangGraph-powered agent that coordinates all planning decisions in real-time
            </p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-primary mb-2">Live Updates</h3>
            <p className="text-foreground-muted">
              Stream real-time information as your AI agent researches and plans your trip
            </p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">🔒</div>
            <h3 className="text-xl font-bold text-primary mb-2">Secure & Private</h3>
            <p className="text-foreground-muted">
              Your travel data is encrypted and never shared with third parties
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
