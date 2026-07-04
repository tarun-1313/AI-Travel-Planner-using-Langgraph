'use client';

import { motion } from 'framer-motion';
import { MapPin, Calendar, DollarSign, Sparkles, Play } from 'lucide-react';
import { useState } from 'react';

export default function LandingHero() {
  const [formData, setFormData] = useState({
    destination: '',
    dates: '',
    budget: '',
    style: 'Luxury',
  });

  const handleGenerateJourney = () => {
    // Scroll to next section
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 via-white to-white">
      {/* Animated Sky Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Moving Clouds */}
        <motion.div
          className="absolute top-12 left-0 w-96 h-24 bg-white rounded-full opacity-40 blur-3xl"
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-32 right-0 w-80 h-20 bg-white rounded-full opacity-30 blur-3xl"
          animate={{ x: ['200%', '-100%'] }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear', delay: 5 }}
        />

        {/* Animated Airplane with Trail */}
        <motion.div
          className="absolute top-20 left-0 right-0 flex items-center"
          animate={{ x: ['-10%', '110%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        >
          <svg className="w-96 h-1" viewBox="0 0 400 2" preserveAspectRatio="none">
            <motion.path
              d="M 0 1 Q 100 -1 200 1 T 400 1"
              stroke="#3b82f6"
              strokeWidth="1"
              fill="none"
              opacity="0.4"
            />
          </svg>
          <span className="text-4xl -ml-8 flex-shrink-0">✈️</span>
        </motion.div>

        {/* Occasional Birds */}
        <motion.div
          className="absolute top-40 left-1/4 text-2xl"
          animate={{ x: [0, 400], y: [0, -50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        >
          🦅
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 text-center py-12">
        {/* Main Headline */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-neutral-900 mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Every Journey Begins With A Dream.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Let AI create the perfect vacation designed only for you. Every moment crafted to perfection.
        </motion.p>

        {/* Search Bar Card */}
        <motion.div
          className="bg-white rounded-3xl shadow-lg p-8 md:p-10 border border-neutral-100"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, type: 'spring', stiffness: 80 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 items-end">
            {/* Destination */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-neutral-900 mb-2 flex items-center gap-2">
                <MapPin size={18} className="text-blue-600" />
                Destination
              </label>
              <input
                type="text"
                placeholder="Paris, Bali, Tokyo..."
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                className="px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-neutral-50 text-neutral-900 placeholder-neutral-500"
              />
            </div>

            {/* Dates */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-neutral-900 mb-2 flex items-center gap-2">
                <Calendar size={18} className="text-blue-600" />
                When
              </label>
              <input
                type="month"
                value={formData.dates}
                onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
                className="px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-neutral-50 text-neutral-900"
              />
            </div>

            {/* Budget */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-neutral-900 mb-2 flex items-center gap-2">
                <DollarSign size={18} className="text-blue-600" />
                Budget
              </label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-neutral-50 text-neutral-900"
              >
                <option value="">Select...</option>
                <option value="2000">$2,000</option>
                <option value="5000">$5,000</option>
                <option value="10000">$10,000+</option>
              </select>
            </div>

            {/* Travel Style */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-neutral-900 mb-2 flex items-center gap-2">
                <Sparkles size={18} className="text-blue-600" />
                Style
              </label>
              <select
                value={formData.style}
                onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                className="px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-neutral-50 text-neutral-900"
              >
                <option value="Luxury">Luxury</option>
                <option value="Adventure">Adventure</option>
                <option value="Culture">Culture</option>
                <option value="Budget">Budget</option>
              </select>
            </div>

            {/* CTA Button */}
            <motion.button
              onClick={handleGenerateJourney}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2 w-full h-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play size={20} />
              <span className="hidden md:inline">Generate Journey</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="mt-16 flex justify-center"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-neutral-400 text-sm">Scroll to begin</div>
        </motion.div>
      </div>
    </section>
  );
}
