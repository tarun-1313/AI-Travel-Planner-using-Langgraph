'use client';

import { Globe } from '@/components/3d/Globe';

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(0, 217, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 217, 255, 0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
      }} />

      <div className="relative h-screen flex flex-col items-center justify-center px-4">
        {/* Globe Container */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 md:w-[600px] md:h-[600px]">
          <Globe />
        </div>

        {/* Content overlay */}
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <div className="space-y-6">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass bg-background-tertiary/50 border border-primary/30">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm text-primary font-medium">System Online • Ready for Mission</span>
            </div>

            {/* Main heading */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter">
                <span className="text-foreground">Your </span>
                <span className="text-primary glow-text-primary">AI Travel OS</span>
              </h1>
              <p className="text-lg md:text-xl text-foreground-muted max-w-xl mx-auto">
                Intelligent itinerary generation, real-time flight tracking, and comprehensive destination insights—all in one futuristic interface.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <button className="px-8 py-3 rounded-lg bg-primary text-background font-bold text-lg hover:bg-primary-light transition-all transform hover:scale-105 glow-primary">
                Start Your Journey
              </button>
              <button className="px-8 py-3 rounded-lg border border-primary/50 text-primary font-bold text-lg hover:bg-primary/10 transition-all">
                Watch Demo
              </button>
            </div>

            {/* Features grid */}
            <div className="grid grid-cols-3 gap-4 pt-8 max-w-md mx-auto">
              {[
                { icon: '🛫', label: 'Smart Flights', desc: 'AI-optimized' },
                { icon: '📍', label: 'Destinations', desc: '195+ countries' },
                { icon: '⚡', label: 'Real-time', desc: 'Live updates' },
              ].map((feature) => (
                <div key={feature.label} className="text-center">
                  <div className="text-3xl mb-2">{feature.icon}</div>
                  <p className="text-xs font-bold text-foreground">{feature.label}</p>
                  <p className="text-xs text-foreground-muted">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="text-2xl">↓</div>
      </div>
    </section>
  );
}
