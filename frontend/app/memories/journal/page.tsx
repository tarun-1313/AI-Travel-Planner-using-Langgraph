'use client';

import { useState } from 'react';
import { Header } from '@/components/shared/Header';
import { ChevronDown, Heart, Trash2, Plus } from 'lucide-react';

interface JournalEntry {
  id: string;
  date: string;
  title: string;
  destination: string;
  content: string;
  mood: 'amazing' | 'good' | 'okay' | 'tough' | 'memorable';
  favorites: number;
  tags: string[];
}

const moodEmojis = {
  amazing: '🤩',
  good: '😊',
  okay: '🙂',
  tough: '😤',
  memorable: '✨',
};

const moodColors = {
  amazing: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400',
  good: 'bg-green-500/20 border-green-500/50 text-green-400',
  okay: 'bg-blue-500/20 border-blue-500/50 text-blue-400',
  tough: 'bg-red-500/20 border-red-500/50 text-red-400',
  memorable: 'bg-purple-500/20 border-purple-500/50 text-purple-400',
};

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      date: '2024-03-15',
      title: 'First Day in Tokyo',
      destination: 'Tokyo, Japan',
      content: 'Arrived at Narita. The city is bustling with energy. Checked into our hotel in Shibuya and immediately felt the vibrant nightlife. Grabbed ramen at a local spot - absolutely delicious!',
      mood: 'amazing',
      favorites: 12,
      tags: ['first-day', 'food', 'culture'],
    },
    {
      id: '2',
      date: '2024-03-16',
      title: 'Temple Hopping Day',
      destination: 'Tokyo, Japan',
      content: 'Visited Sensoji Temple and several smaller temples. The serenity and architecture were breathtaking. Watched monks performing a ritual ceremony - truly spiritual experience.',
      mood: 'memorable',
      favorites: 18,
      tags: ['temples', 'spirituality', 'photography'],
    },
    {
      id: '3',
      date: '2024-03-17',
      title: 'Weather Challenge',
      destination: 'Tokyo, Japan',
      content: 'Heavy rain today limited our plans, but we discovered cozy bookstores and cafes. Found an amazing vintage video game store. Sometimes the best discoveries come from Plan B!',
      mood: 'good',
      favorites: 8,
      tags: ['adaptation', 'shopping', 'weather'],
    },
  ]);

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  const toggleLike = (id: string) => {
    setEntries(entries.map(e =>
      e.id === id ? { ...e, favorites: e.favorites + 1 } : e
    ));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Travel Journal</h1>
          <p className="text-xl text-foreground-muted">
            Capture your moments, feelings, and discoveries from every journey.
          </p>
        </div>

        {/* New Entry Button */}
        <div className="mb-8">
          <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-background font-semibold hover:bg-primary-light transition-all glow-primary">
            <Plus size={20} />
            New Journal Entry
          </button>
        </div>

        {/* Journal Entries */}
        <div className="space-y-4">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="glass rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all"
            >
              {/* Entry Header */}
              <button
                onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
                className="w-full p-6 flex items-start justify-between gap-4 hover:bg-background-tertiary/50 transition-colors"
              >
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{moodEmojis[entry.mood]}</span>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{entry.title}</h3>
                      <p className="text-sm text-foreground-muted">{entry.destination}</p>
                    </div>
                  </div>
                  <p className="text-xs text-foreground-muted">{new Date(entry.date).toLocaleDateString()}</p>
                </div>
                <ChevronDown
                  size={24}
                  className={`text-primary transition-transform ${expandedId === entry.id ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Entry Content */}
              {expandedId === entry.id && (
                <div className="border-t border-border px-6 py-4 space-y-4 bg-background-secondary/50">
                  {/* Content */}
                  <p className="text-foreground-muted leading-relaxed">{entry.content}</p>

                  {/* Mood Badge */}
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${moodColors[entry.mood]}`}>
                      {entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/20"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                    <button
                      onClick={() => toggleLike(entry.id)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-background-tertiary transition-colors text-foreground-muted hover:text-primary"
                    >
                      <Heart size={18} />
                      <span className="text-sm">{entry.favorites}</span>
                    </button>
                    <button
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-500/10 transition-colors text-foreground-muted hover:text-danger"
                    >
                      <Trash2 size={18} />
                      <span className="text-sm">Delete</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Stats Footer */}
        <div className="mt-12 grid grid-cols-3 gap-4">
          <div className="glass rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-primary">{entries.length}</p>
            <p className="text-sm text-foreground-muted">Entries Written</p>
          </div>
          <div className="glass rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-accent">{entries.reduce((sum, e) => sum + e.favorites, 0)}</p>
            <p className="text-sm text-foreground-muted">Total Favorites</p>
          </div>
          <div className="glass rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-primary-light">{new Set(entries.map(e => e.destination)).size}</p>
            <p className="text-sm text-foreground-muted">Destinations</p>
          </div>
        </div>
      </main>
    </div>
  );
}
