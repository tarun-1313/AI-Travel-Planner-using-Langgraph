'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Search, MapPin, Calendar, Users, Plane } from 'lucide-react';

interface Destination {
  name: string;
  gradient: string;
  emoji: string;
  description: string;
  theme: 'cherry-blossom' | 'ocean-waves' | 'sparkles' | 'snow' | 'palm-sway';
}

const destinations: Destination[] = [
  { 
    name: 'Japan', 
    gradient: 'from-pink-100 via-purple-50 to-blue-100', 
    emoji: '🇯🇵',
    description: 'Ancient temples meet modern cities',
    theme: 'cherry-blossom'
  },
  { 
    name: 'Maldives', 
    gradient: 'from-cyan-100 via-blue-50 to-teal-100', 
    emoji: '🏝️',
    description: 'Turquoise waters and endless skies',
    theme: 'ocean-waves'
  },
  { 
    name: 'Paris', 
    gradient: 'from-amber-50 via-rose-50 to-purple-100', 
    emoji: '🗼',
    description: 'The city of light and romance',
    theme: 'sparkles'
  },
  { 
    name: 'Switzerland', 
    gradient: 'from-blue-50 via-white to-gray-100', 
    emoji: '🏔️',
    description: 'Majestic mountains and alpine charm',
    theme: 'snow'
  },
  { 
    name: 'Bali', 
    gradient: 'from-green-50 via-emerald-50 to-yellow-50', 
    emoji: '🌴',
    description: 'Tropical paradise with rich culture',
    theme: 'palm-sway'
  },
];

export default function Home() {
  const [selectedDates, setSelectedDates] = useState({ checkIn: '', checkOut: '' });
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentDestinationIndex, setCurrentDestinationIndex] = useState(0);

  // Rotate destinations every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDestinationIndex((prev) => (prev + 1) % destinations.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Premium Minimal Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <motion.div
            className="text-2xl font-bold text-primary"
            whileHover={{ scale: 1.05 }}
          >
            Wander
          </motion.div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/explore" className="text-foreground-muted text-sm font-medium hover:text-foreground transition">Explore</Link>
            <Link href="/" className="text-foreground-muted text-sm font-medium hover:text-foreground transition">My Trips</Link>
            <Link href="/" className="text-foreground-muted text-sm font-medium hover:text-foreground transition">Saved</Link>
            <Link href="/" className="text-foreground-muted text-sm font-medium hover:text-foreground transition">Messages</Link>
          </nav>
          <motion.button
            className="px-6 py-2 bg-primary text-white rounded-full font-semibold text-sm hover:bg-primary-dark transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign In
          </motion.button>
        </div>
      </header>

      {/* Immersive Destination-Transitioning Hero */}
      <motion.section
        className="relative min-h-screen overflow-hidden flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated Destination Background */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDestinationIndex}
            className={`absolute inset-0 bg-gradient-to-b ${destinations[currentDestinationIndex].gradient}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            {/* Destination-Specific Animated Elements */}
            {destinations[currentDestinationIndex].theme === 'cherry-blossom' && (
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-pink-400 text-4xl"
                    initial={{ y: -100, x: Math.random() * 100 + '%', opacity: 0 }}
                    animate={{ 
                      y: 500, 
                      x: Math.random() * 100 + '%',
                      opacity: [0, 1, 0],
                      rotate: Math.random() * 360
                    }}
                    transition={{
                      duration: 6 + Math.random() * 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: Math.random() * 2
                    }}
                  >
                    🌸
                  </motion.div>
                ))}
              </div>
            )}

            {destinations[currentDestinationIndex].theme === 'ocean-waves' && (
              <div className="absolute bottom-0 left-0 right-0 h-32">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 120">
                  <motion.path
                    d="M0,60 Q300,30 600,60 T1200,60 L1200,120 L0,120 Z"
                    fill="rgba(15, 118, 110, 0.1)"
                    animate={{ d: ['M0,60 Q300,30 600,60 T1200,60 L1200,120 L0,120 Z', 'M0,70 Q300,40 600,70 T1200,70 L1200,120 L0,120 Z', 'M0,60 Q300,30 600,60 T1200,60 L1200,120 L0,120 Z'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </svg>
              </div>
            )}

            {destinations[currentDestinationIndex].theme === 'sparkles' && (
              <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-yellow-300 rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: Math.random() * 4
                    }}
                    style={{
                      left: Math.random() * 100 + '%',
                      top: Math.random() * 100 + '%'
                    }}
                  />
                ))}
              </div>
            )}

            {destinations[currentDestinationIndex].theme === 'snow' && (
              <div className="absolute inset-0">
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-white text-2xl"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{
                      y: 600,
                      x: Math.sin(i) * 100,
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 8 + Math.random() * 4,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: Math.random() * 3
                    }}
                    style={{
                      left: Math.random() * 100 + '%'
                    }}
                  >
                    ❄️
                  </motion.div>
                ))}
              </div>
            )}

            {destinations[currentDestinationIndex].theme === 'palm-sway' && (
              <div className="absolute bottom-0 right-0 text-6xl">
                <motion.div
                  animate={{ rotate: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ transformOrigin: 'bottom right' }}
                >
                  🌴
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Content Overlay */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
          <motion.div
            key={currentDestinationIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <motion.div
              className="text-9xl mb-4 inline-block"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              {destinations[currentDestinationIndex].emoji}
            </motion.div>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-8xl font-bold text-foreground mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            key={`title-${currentDestinationIndex}`}
          >
            {destinations[currentDestinationIndex].name}
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-foreground-muted mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            key={`desc-${currentDestinationIndex}`}
          >
            {destinations[currentDestinationIndex].description}
          </motion.p>

          <motion.p
            className="text-lg text-foreground-muted max-w-2xl mx-auto mb-12 hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Your dream vacation awaits. Let our AI craft the perfect itinerary just for you.
          </motion.p>

          {/* Animated Airplane */}
          <motion.div
            className="absolute top-20 left-0 right-0 h-20 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <motion.div
              className="flex items-center gap-1"
              animate={{ x: ['-120vw', '120vw'] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            >
              <span className="text-5xl">✈️</span>
              <svg className="w-96 h-0.5" viewBox="0 0 400 2" preserveAspectRatio="none">
                <motion.path
                  d="M 0 1 Q 100 0 200 1 T 400 1"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-primary opacity-40"
                />
              </svg>
            </motion.div>
          </motion.div>

          {/* Moving Clouds */}
          <motion.div
            className="absolute top-16 left-10 w-48 h-16 bg-white rounded-full opacity-40 blur-xl"
            animate={{ x: ['-100%', '110vw'] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute top-40 right-20 w-40 h-12 bg-white rounded-full opacity-30 blur-xl"
            animate={{ x: ['110vw', '-100%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear', delay: 3 }}
          />
        </div>
      </motion.section>

      {/* Premium AI Search Card - Floating with Airplane Animation */}
      <motion.div
        className="max-w-5xl mx-auto w-full px-4 md:px-8 -mt-32 relative z-20 mb-20"
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.9, type: 'spring', stiffness: 80 }}
      >
        <div className="card card-large p-8 md:p-10 relative">
          {/* Airplane Taking Off Animation */}
          <AnimatePresence>
            {isGenerating && (
              <motion.div
                className="absolute inset-0 z-50 flex items-end justify-center pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="relative w-full h-full flex items-end justify-end pb-12 pr-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="text-6xl"
                    animate={{
                      x: [0, 100, 200, 400, 600, 800, 1000],
                      y: [0, -50, -150, -300, -500, -700, -900],
                      rotate: [0, 15, 25]
                    }}
                    transition={{
                      duration: 3,
                      ease: 'easeIn',
                      times: [0, 0.1, 0.3, 0.5, 0.7, 0.85, 1]
                    }}
                  >
                    ✈️
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className={`grid grid-cols-1 md:grid-cols-5 gap-6 items-end ${isGenerating ? 'opacity-50 pointer-events-none' : ''}`}>
            {/* Destination Input */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <MapPin size={18} className="text-primary" />
                Where
              </label>
              <input
                type="text"
                placeholder="Paris, Tokyo, Maldives..."
                disabled={isGenerating}
                className="px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-neutral-50 text-foreground placeholder-foreground-muted transition disabled:opacity-50"
              />
            </div>

            {/* Check-in Date */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Calendar size={18} className="text-primary" />
                Check in
              </label>
              <input
                type="date"
                disabled={isGenerating}
                className="px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-neutral-50 text-foreground transition disabled:opacity-50"
                value={selectedDates.checkIn}
                onChange={(e) => setSelectedDates({ ...selectedDates, checkIn: e.target.value })}
              />
            </div>

            {/* Check-out Date */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Calendar size={18} className="text-primary" />
                Check out
              </label>
              <input
                type="date"
                disabled={isGenerating}
                className="px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-neutral-50 text-foreground transition disabled:opacity-50"
                value={selectedDates.checkOut}
                onChange={(e) => setSelectedDates({ ...selectedDates, checkOut: e.target.value })}
              />
            </div>

            {/* Travelers */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Users size={18} className="text-primary" />
                Guests
              </label>
              <select disabled={isGenerating} className="px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-neutral-50 text-foreground transition disabled:opacity-50">
                <option>1 Guest</option>
                <option>2 Guests</option>
                <option>3 Guests</option>
                <option>4+ Guests</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="flex flex-col">
              <motion.button
                onClick={() => setIsGenerating(true)}
                className="px-8 py-3 bg-gradient-to-r from-primary to-primary-light text-white font-semibold rounded-xl hover:shadow-lg transition flex items-center justify-center gap-2 w-full h-full disabled:opacity-50"
                whileHover={!isGenerating ? { scale: 1.05 } : {}}
                whileTap={!isGenerating ? { scale: 0.95 } : {}}
                disabled={isGenerating}
              >
                <motion.div
                  animate={isGenerating ? { rotate: 360 } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Plane size={20} />
                </motion.div>
                <span className="hidden md:inline">{isGenerating ? 'Planning...' : 'Plan My Trip'}</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Animated Travel Moments Loading Experience */}
      <AnimatePresence>
        {isGenerating && (
          <section className="max-w-4xl mx-auto px-4 md:px-8 py-16 w-full">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-foreground mb-4">Planning Your Perfect Journey...</h2>
              <p className="text-foreground-muted">Our AI is discovering amazing experiences for you</p>
            </motion.div>

            {/* Travel Moments Timeline */}
            <div className="space-y-6">
              {[
                { icon: '✈️', label: 'Searching Flights', color: 'from-blue-400 to-blue-600' },
                { icon: '🏨', label: 'Finding Hotels', color: 'from-purple-400 to-purple-600' },
                { icon: '🍽️', label: 'Discovering Restaurants', color: 'from-orange-400 to-orange-600' },
                { icon: '🎭', label: 'Curating Attractions', color: 'from-pink-400 to-pink-600' },
                { icon: '🌤️', label: 'Checking Weather', color: 'from-cyan-400 to-cyan-600' },
                { icon: '📋', label: 'Assembling Itinerary', color: 'from-green-400 to-green-600' },
              ].map((moment, index) => (
                <motion.div
                  key={moment.label}
                  className={`bg-gradient-to-r ${moment.color} rounded-2xl p-6 text-white flex items-center gap-4 overflow-hidden relative`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.3, duration: 0.6 }}
                >
                  <motion.div
                    className="text-4xl flex-shrink-0"
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.15 }}
                  >
                    {moment.icon}
                  </motion.div>
                  <div className="flex-1">
                    <p className="font-semibold text-lg">{moment.label}</p>
                  </div>
                  <motion.div
                    className="w-12 h-12 bg-white bg-opacity-30 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.15 }}
                  />
                </motion.div>
              ))}
            </div>

            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              <motion.button
                onClick={() => setIsGenerating(false)}
                className="px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Your Itinerary
              </motion.button>
            </motion.div>
          </section>
        )}
      </AnimatePresence>

      {/* Story-Like Itinerary (shows after generation) */}
      {isGenerating === false && (
        <section className="max-w-6xl mx-auto px-4 md:px-8 py-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-5xl font-bold text-foreground mb-4">Your Adventure Awaits</h2>
            <p className="text-xl text-foreground-muted">A 5-day journey through paradise, crafted just for you</p>
          </motion.div>

          {/* Day-by-Day Itinerary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { day: 1, date: 'Mon, Jun 10', activities: ['Arrive at airport', 'Check-in at resort', 'Evening beach walk'], emoji: '✈️' },
              { day: 2, date: 'Tue, Jun 11', activities: ['Island tour', 'Water sports', 'Sunset dinner'], emoji: '🏝️' },
              { day: 3, date: 'Wed, Jun 12', activities: ['Snorkeling', 'Local market', 'Spa treatment'], emoji: '🤿' },
              { day: 4, date: 'Thu, Jun 13', activities: ['Mountain hike', 'Cultural show', 'Local cuisine'], emoji: '🏔️' },
              { day: 5, date: 'Fri, Jun 14', activities: ['Shopping', 'Beach time', 'Departure'], emoji: '🛫' },
            ].map((dayPlan, index) => (
              <motion.div
                key={dayPlan.day}
                className="card p-6 sticky"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6, type: 'spring' }}
                viewport={{ once: true }}
              >
                <div className="mb-4">
                  <motion.div
                    className="text-5xl mb-2"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  >
                    {dayPlan.emoji}
                  </motion.div>
                  <h3 className="text-2xl font-bold text-primary">Day {dayPlan.day}</h3>
                  <p className="text-sm text-foreground-muted">{dayPlan.date}</p>
                </div>
                <div className="space-y-3">
                  {dayPlan.activities.map((activity, actIndex) => (
                    <motion.div
                      key={activity}
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.15 + actIndex * 0.1, duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-primary mt-1">✓</span>
                      <span className="text-sm text-foreground-muted">{activity}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Premium CTA Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-light to-sky opacity-95" />
        
        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full"
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-72 h-72 bg-white opacity-5 rounded-full"
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 md:px-8">
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Ready to Wander?
          </motion.h2>
          <motion.p
            className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Start planning your dream vacation today. Let our AI discover perfect destinations, flights, and experiences tailored just for you.
          </motion.p>
          <motion.button
            className="px-10 py-4 bg-white text-primary font-bold rounded-full text-lg hover:bg-neutral-50 transition shadow-xl"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Explore Destinations
          </motion.button>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="bg-neutral-900 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold text-primary mb-3">Wander</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Discover the world with AI-powered travel recommendations and seamless booking.
              </p>
              <div className="flex gap-4 mt-6">
                <a href="#" className="text-neutral-400 hover:text-primary transition text-sm">Twitter</a>
                <a href="#" className="text-neutral-400 hover:text-primary transition text-sm">Instagram</a>
              </div>
            </div>

            {/* Explore */}
            <div>
              <h4 className="font-semibold mb-6 text-white">Explore</h4>
              <ul className="space-y-3 text-neutral-400 text-sm">
                <li><a href="/explore" className="hover:text-primary transition">Destinations</a></li>
                <li><a href="#" className="hover:text-primary transition">Travel Guides</a></li>
                <li><a href="#" className="hover:text-primary transition">Hot Deals</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-6 text-white">Company</h4>
              <ul className="space-y-3 text-neutral-400 text-sm">
                <li><a href="#" className="hover:text-primary transition">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition">Careers</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-6 text-white">Support</h4>
              <ul className="space-y-3 text-neutral-400 text-sm">
                <li><a href="#" className="hover:text-primary transition">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary transition">FAQ</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-6 text-white">Legal</h4>
              <ul className="space-y-3 text-neutral-400 text-sm">
                <li><a href="#" className="hover:text-primary transition">Privacy</a></li>
                <li><a href="#" className="hover:text-primary transition">Terms</a></li>
                <li><a href="#" className="hover:text-primary transition">Cookies</a></li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-neutral-800 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-neutral-400 text-sm mb-4 md:mb-0">
                © 2024 Wander. Crafted with ✈️ for travelers worldwide.
              </p>
              <div className="flex items-center gap-2 text-neutral-400 text-sm">
                <span>Made for wanderers</span>
                <span className="text-2xl">🌍</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
