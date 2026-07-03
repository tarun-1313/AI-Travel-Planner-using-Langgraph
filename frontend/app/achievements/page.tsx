'use client';

import { useState } from 'react';
import { Header } from '@/components/shared/Header';
import { Trophy, Award, Zap, Target, Calendar, Globe } from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
  progress?: number;
  maxProgress?: number;
}

const achievements: Achievement[] = [
  {
    id: '1',
    name: 'First Steps',
    description: 'Complete your first trip',
    icon: '🎯',
    unlocked: true,
    unlockedDate: '2024-01-15',
  },
  {
    id: '2',
    name: 'Passport Master',
    description: 'Visit 10 different countries',
    icon: '🌍',
    unlocked: true,
    unlockedDate: '2024-03-20',
  },
  {
    id: '3',
    name: 'Budget Guru',
    description: 'Stay 30% under budget',
    icon: '💰',
    unlocked: true,
    unlockedDate: '2024-02-10',
  },
  {
    id: '4',
    name: 'Planner Pro',
    description: 'Plan itineraries for 5 trips',
    icon: '📋',
    unlocked: true,
    unlockedDate: '2024-03-01',
  },
  {
    id: '5',
    name: 'Eco Warrior',
    description: 'Offset 500kg of carbon',
    icon: '🌱',
    unlocked: false,
    progress: 320,
    maxProgress: 500,
  },
  {
    id: '6',
    name: 'Foodie Explorer',
    description: 'Try 50 different cuisines',
    icon: '🍽️',
    unlocked: false,
    progress: 34,
    maxProgress: 50,
  },
  {
    id: '7',
    name: 'Night Owl',
    description: 'Take 10 red-eye flights',
    icon: '🌙',
    unlocked: false,
    progress: 7,
    maxProgress: 10,
  },
  {
    id: '8',
    name: 'Globetrotter',
    description: 'Visit every continent',
    icon: '✈️',
    unlocked: false,
    progress: 4,
    maxProgress: 7,
  },
];

const stats = [
  { label: 'Trips Completed', value: '12', icon: Calendar },
  { label: 'Countries Visited', value: '18', icon: Globe },
  { label: 'Achievements Unlocked', value: '4', icon: Trophy },
  { label: 'Current Streak', value: '7 days', icon: Zap },
];

export default function AchievementsPage() {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  const filteredAchievements = achievements.filter((achievement) => {
    if (filter === 'unlocked') return achievement.unlocked;
    if (filter === 'locked') return !achievement.unlocked;
    return true;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Achievements & Gamification</h1>
          <p className="text-xl text-foreground-muted">
            Unlock badges, complete challenges, and become a travel master.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="glass rounded-xl p-6 border border-border hover:border-primary/30 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 p-3">
                    <Icon size={24} className="text-primary" />
                  </div>
                </div>
                <p className="text-sm text-foreground-muted mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Level & XP */}
        <div className="glass rounded-xl p-8 border border-border mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-foreground-muted mb-2">Travel Level</p>
              <p className="text-5xl font-bold text-primary">16</p>
              <p className="text-sm text-foreground-muted mt-2">Expert Traveler</p>
            </div>
            <Award className="text-accent text-6xl opacity-20" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-foreground-muted">Progress to Level 17</span>
              <span className="text-sm font-semibold text-primary">7,240 / 10,000 XP</span>
            </div>
            <div className="w-full bg-background-tertiary rounded-full h-4">
              <div
                className="h-4 rounded-full bg-gradient-to-r from-primary to-accent"
                style={{ width: '72.4%' }}
              />
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-3 mb-8">
          {(['all', 'unlocked', 'locked'] as const).map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === option
                  ? 'bg-primary text-background'
                  : 'glass border border-border hover:border-primary/30'
              }`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
              {option === 'unlocked' && ` (${achievements.filter(a => a.unlocked).length})`}
              {option === 'locked' && ` (${achievements.filter(a => !a.unlocked).length})`}
            </button>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`glass rounded-xl p-6 border transition-all ${
                achievement.unlocked
                  ? 'border-primary/50 bg-primary/5'
                  : 'border-border opacity-60 hover:opacity-100'
              }`}
            >
              {/* Icon */}
              <div className="text-5xl mb-4 text-center">{achievement.icon}</div>

              {/* Badge */}
              {achievement.unlocked && (
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-lg">✓</span>
                  </div>
                </div>
              )}

              {/* Name & Description */}
              <h3 className="font-bold text-foreground mb-2">{achievement.name}</h3>
              <p className="text-sm text-foreground-muted mb-4">{achievement.description}</p>

              {/* Progress */}
              {!achievement.unlocked && achievement.progress !== undefined && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-foreground-muted">
                      {achievement.progress} / {achievement.maxProgress}
                    </span>
                  </div>
                  <div className="w-full bg-background-tertiary rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-primary to-accent"
                      style={{ width: `${(achievement.progress! / achievement.maxProgress!) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Unlock Date */}
              {achievement.unlocked && achievement.unlockedDate && (
                <p className="text-xs text-foreground-muted text-center mt-4">
                  Unlocked {new Date(achievement.unlockedDate).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Challenges Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Active Challenges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Weekend Warrior',
                description: 'Plan and complete a weekend trip',
                reward: '500 XP',
                daysLeft: 5,
              },
              {
                title: 'Budget Master',
                description: 'Complete a trip 25% under budget',
                reward: '750 XP',
                daysLeft: 12,
              },
              {
                title: 'Social Explorer',
                description: 'Join 3 group tours',
                reward: '600 XP',
                daysLeft: 8,
              },
              {
                title: 'Cultural Immersion',
                description: 'Attend a local cultural event',
                reward: '400 XP',
                daysLeft: 3,
              },
            ].map((challenge, idx) => (
              <div key={idx} className="glass rounded-xl p-6 border border-border hover:border-primary/30 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-bold text-lg text-foreground">{challenge.title}</h3>
                  <span className="text-sm font-semibold text-primary">{challenge.daysLeft}d left</span>
                </div>
                <p className="text-sm text-foreground-muted mb-4">{challenge.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-accent font-semibold">{challenge.reward}</span>
                  <button className="px-3 py-1 rounded-lg bg-primary/20 text-primary text-sm font-medium hover:bg-primary/30 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
