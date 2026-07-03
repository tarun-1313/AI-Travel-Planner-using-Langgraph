'use client';

import { useState } from 'react';
import Header from '@/components/shared/Header';
import { ChevronRight, MapPin, Calendar, MoreVertical, Heart, MessageCircle, Share2 } from 'lucide-react';

interface Memory {
  id: string;
  trip: string;
  destination: string;
  startDate: string;
  endDate: string;
  highlights: string[];
  rating: number;
  photoCount: number;
  notes: string;
  duration: number;
  budget: number;
  sentiment: 'amazing' | 'great' | 'good' | 'memorable';
}

const SAMPLE_MEMORIES: Memory[] = [
  {
    id: '1',
    trip: 'Tokyo Adventure',
    destination: 'Tokyo, Japan',
    startDate: '2024-04-10',
    endDate: '2024-04-25',
    highlights: ['Cherry blossoms', 'Shibuya crossing', 'Senso-ji temple', 'Mount Fuji'],
    rating: 5,
    photoCount: 287,
    notes: 'Incredible experience exploring the blend of traditional and modern Japan',
    duration: 15,
    budget: 3200,
    sentiment: 'amazing'
  },
  {
    id: '2',
    trip: 'European Summer',
    destination: 'Paris, Rome, Barcelona',
    startDate: '2024-06-01',
    endDate: '2024-07-15',
    highlights: ['Eiffel Tower', 'Vatican', 'Sagrada Familia', 'Local cafes'],
    rating: 5,
    photoCount: 421,
    notes: 'Perfect summer trip across Europe with amazing food and culture',
    duration: 45,
    budget: 8500,
    sentiment: 'amazing'
  },
  {
    id: '3',
    trip: 'Thailand Beach',
    destination: 'Bangkok, Phuket, Krabi',
    startDate: '2024-08-05',
    endDate: '2024-08-20',
    highlights: ['Island hopping', 'Thai cuisine', 'Night markets', 'Beaches'],
    rating: 4,
    photoCount: 198,
    notes: 'Relaxing beach getaway with excellent food and warm hospitality',
    duration: 15,
    budget: 2100,
    sentiment: 'great'
  },
  {
    id: '4',
    trip: 'New York City',
    destination: 'New York, USA',
    startDate: '2024-09-10',
    endDate: '2024-09-17',
    highlights: ['Broadway show', 'Central Park', 'Street food', 'Times Square'],
    rating: 4,
    photoCount: 156,
    notes: 'Fast-paced city adventure with world-class attractions',
    duration: 7,
    budget: 3800,
    sentiment: 'great'
  }
];

export default function MemoriesPage() {
  const [memories, setMemories] = useState<Memory[]>(SAMPLE_MEMORIES);
  const [selectedSentiment, setSelectedSentiment] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');

  const filteredMemories = selectedSentiment
    ? memories.filter(m => m.sentiment === selectedSentiment)
    : memories;

  const totalTrips = memories.length;
  const totalDays = memories.reduce((sum, m) => sum + m.duration, 0);
  const totalPhotoCount = memories.reduce((sum, m) => sum + m.photoCount, 0);
  const totalBudget = memories.reduce((sum, m) => sum + m.budget, 0);
  const averageRating = (memories.reduce((sum, m) => sum + m.rating, 0) / memories.length).toFixed(1);

  const getSentimentColor = (sentiment: string) => {
    const colors: Record<string, string> = {
      amazing: 'from-amber-500/20 to-amber-600/10 border-amber-500/20',
      great: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/20',
      good: 'from-purple-500/20 to-purple-600/10 border-purple-500/20',
      memorable: 'from-pink-500/20 to-pink-600/10 border-pink-500/20',
    };
    return colors[sentiment] || colors.great;
  };

  const getSentimentEmoji = (sentiment: string) => {
    const emojis: Record<string, string> = {
      amazing: '⭐',
      great: '✨',
      good: '😊',
      memorable: '💫',
    };
    return emojis[sentiment] || '✨';
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Travel <span className="text-primary glow-text-primary">Memories</span>
          </h1>
          <p className="text-foreground-muted">Relive your unforgettable journeys and discover patterns in your travel history</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { label: 'Trips', value: totalTrips, icon: '✈' },
            { label: 'Days Traveled', value: totalDays, icon: '📅' },
            { label: 'Photos', value: totalPhotoCount, icon: '📸' },
            { label: 'Avg Rating', value: `${averageRating}⭐`, icon: '⭐' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass glass-border p-4 rounded-lg border border-border/30"
            >
              <p className="text-foreground-muted text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedSentiment(null)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                selectedSentiment === null
                  ? 'bg-primary text-background'
                  : 'glass glass-border hover:bg-background-tertiary'
              }`}
            >
              All Trips
            </button>
            {['amazing', 'great', 'good', 'memorable'].map((sentiment) => (
              <button
                key={sentiment}
                onClick={() => setSelectedSentiment(sentiment)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all capitalize ${
                  selectedSentiment === sentiment
                    ? `bg-gradient-to-r ${getSentimentColor(sentiment).split(' ')[0]} text-foreground border border-border/50`
                    : 'glass glass-border hover:bg-background-tertiary'
                }`}
              >
                {getSentimentEmoji(sentiment)} {sentiment}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                viewMode === 'grid'
                  ? 'bg-primary text-background'
                  : 'glass glass-border hover:bg-background-tertiary'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                viewMode === 'timeline'
                  ? 'bg-primary text-background'
                  : 'glass glass-border hover:bg-background-tertiary'
              }`}
            >
              Timeline
            </button>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {filteredMemories.map((memory, idx) => (
              <div
                key={memory.id}
                className={`group glass glass-border border border-border/30 rounded-xl overflow-hidden hover:border-primary/50 transition-all hover:scale-105 duration-300`}
              >
                {/* Memory Card Header */}
                <div className={`bg-gradient-to-r ${getSentimentColor(memory.sentiment)} p-6 border-b border-border/30`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{memory.trip}</h3>
                      <div className="flex items-center gap-1 text-foreground-muted text-sm mt-1">
                        <MapPin size={14} />
                        {memory.destination}
                      </div>
                    </div>
                    <button className="p-2 hover:bg-background-tertiary/50 rounded-lg transition-colors">
                      <MoreVertical size={16} className="text-foreground-muted" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getSentimentEmoji(memory.sentiment)}</span>
                    <div className="flex gap-1">
                      {Array(memory.rating).fill(0).map((_, i) => (
                        <span key={i} className="text-primary">★</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Memory Card Content */}
                <div className="p-6">
                  <div className="space-y-4">
                    {/* Date & Duration */}
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar size={16} className="text-primary" />
                      <span className="text-foreground-muted">
                        {new Date(memory.startDate).toLocaleDateString()} - {new Date(memory.endDate).toLocaleDateString()}
                      </span>
                      <span className="text-foreground font-medium ml-auto">{memory.duration} days</span>
                    </div>

                    {/* Highlights */}
                    <div>
                      <p className="text-xs text-foreground-muted uppercase tracking-wide mb-2">Highlights</p>
                      <div className="flex flex-wrap gap-2">
                        {memory.highlights.slice(0, 3).map((highlight, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs bg-background-tertiary/50 text-foreground-muted rounded-full"
                          >
                            {highlight}
                          </span>
                        ))}
                        {memory.highlights.length > 3 && (
                          <span className="px-3 py-1 text-xs bg-background-tertiary/50 text-foreground-muted rounded-full">
                            +{memory.highlights.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Notes */}
                    <p className="text-sm text-foreground-muted line-clamp-2">{memory.notes}</p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border/20">
                      <div className="text-center">
                        <p className="text-xs text-foreground-muted">Photos</p>
                        <p className="text-lg font-bold text-foreground">{memory.photoCount}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-foreground-muted">Budget</p>
                        <p className="text-lg font-bold text-foreground">${memory.budget}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-foreground-muted">Days</p>
                        <p className="text-lg font-bold text-foreground">{memory.duration}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="glass-border border-t border-border/20 px-6 py-3 flex items-center justify-between">
                  <button className="text-foreground-muted hover:text-primary transition-colors">
                    <Heart size={18} />
                  </button>
                  <button className="text-foreground-muted hover:text-primary transition-colors">
                    <MessageCircle size={18} />
                  </button>
                  <button className="flex items-center gap-1 text-foreground-muted hover:text-primary transition-colors">
                    <Share2 size={18} />
                  </button>
                  <button className="ml-auto px-3 py-1 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors flex items-center gap-1">
                    View <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Timeline View */}
        {viewMode === 'timeline' && (
          <div className="relative mb-12">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-purple-500 to-cyan-500" />

            {/* Timeline items */}
            <div className="space-y-8">
              {filteredMemories.map((memory, idx) => (
                <div key={memory.id} className={`relative flex ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 top-4 w-14 h-14 md:w-16 md:h-16 -ml-7 md:-ml-8 rounded-full border-4 border-background glass flex items-center justify-center font-bold text-lg">
                    {getSentimentEmoji(memory.sentiment)}
                  </div>

                  {/* Content */}
                  <div className="ml-24 md:ml-0 md:w-1/2 md:pr-8">
                    <div className={`glass glass-border border border-border/30 rounded-lg p-6 ${idx % 2 !== 0 ? 'md:text-right' : ''}`}>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-bold text-foreground">{memory.trip}</h3>
                          <p className="text-sm text-foreground-muted mt-1">{memory.destination}</p>
                        </div>
                        <span className="text-2xl">{Array(memory.rating).fill('★').join('')}</span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-foreground-muted mt-3">
                        <Calendar size={12} />
                        {memory.duration} days • ${memory.budget.toLocaleString()}
                      </div>

                      <p className="text-sm text-foreground-muted mt-4">{memory.notes}</p>

                      <button className="mt-4 text-xs text-primary font-medium hover:text-primary/80 transition-colors flex items-center gap-1">
                        View Details <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {filteredMemories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-foreground-muted text-lg">No memories found for the selected filter</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="glass glass-border border border-border/30 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Start Recording Your Adventures</h2>
          <p className="text-foreground-muted mb-6">Upload photos, write journals, and capture memories from your next trip</p>
          <button className="px-6 py-3 bg-gradient-to-r from-primary to-cyan-500 text-background font-bold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all">
            + Add New Memory
          </button>
        </div>
      </main>
    </div>
  );
}
