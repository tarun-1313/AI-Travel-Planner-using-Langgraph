'use client';

import { useState } from 'react';
import { Header } from '@/components/shared/Header';
import { Map } from '@/components/dashboard/Map';
import { Flights } from '@/components/dashboard/Flights';
import { Timeline } from '@/components/dashboard/Timeline';
import { Budget } from '@/components/dashboard/Budget';
import { Weather } from '@/components/dashboard/Weather';
import { Food } from '@/components/dashboard/Food';
import { Packing } from '@/components/dashboard/Packing';
import { Visa } from '@/components/dashboard/Visa';

const tabs = [
  { id: 'map', label: '🗺️ Map', component: Map },
  { id: 'flights', label: '✈️ Flights', component: Flights },
  { id: 'timeline', label: '📅 Timeline', component: Timeline },
  { id: 'budget', label: '💰 Budget', component: Budget },
  { id: 'weather', label: '🌤️ Weather', component: Weather },
  { id: 'food', label: '🍽️ Food', component: Food },
  { id: 'packing', label: '🎒 Packing', component: Packing },
  { id: 'visa', label: '📋 Visa', component: Visa },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('map');

  const activeComponent = tabs.find(tab => tab.id === activeTab)?.component;
  const ActiveComponent = activeComponent || Map;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      {/* Dashboard Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            <span className="text-primary">Tokyo Trip</span> Dashboard
          </h1>
          <p className="text-foreground-muted">Dec 15 - Dec 17, 2024 • 3 Days</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 glass rounded-xl border border-border p-2 overflow-x-auto">
          <div className="flex gap-2 min-w-full md:min-w-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-background'
                    : 'text-foreground-muted hover:text-foreground hover:bg-background-tertiary/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="animate-fadeIn">
          <ActiveComponent />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 mt-12">
        <div className="max-w-7xl mx-auto text-center text-foreground-muted text-sm">
          <p>© 2024 NEXUS Travel OS. All your travel data is securely stored and encrypted.</p>
        </div>
      </footer>
    </div>
  );
}
