'use client';

import { motion } from 'framer-motion';
import { Share2, Download, BookOpen } from 'lucide-react';

export default function MissionComplete() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-blue-50 to-blue-100 flex items-center justify-center">
      {/* Confetti-like particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: ['#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#06b6d4'][i % 5],
              left: `${Math.random() * 100}%`,
              top: `-20px`,
            }}
            animate={{
              y: 800,
              x: Math.random() * 200 - 100,
              opacity: [1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
        {/* Airplane Landing Animation */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -200 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, type: 'spring', stiffness: 60 }}
          viewport={{ once: false }}
        >
          <motion.div
            className="text-9xl md:text-[200px] inline-block"
            animate={{ rotate: [0, 0, 0, 45, 45], y: [0, 0, 50, 50, 50] }}
            transition={{
              duration: 2.5,
              times: [0, 0.3, 0.6, 0.8, 1],
              ease: 'easeInOut',
            }}
          >
            ✈️
          </motion.div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          className="text-6xl md:text-7xl font-bold text-neutral-900 mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: false }}
        >
          Your Journey is Ready!
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-lg md:text-2xl text-neutral-600 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: false }}
        >
          Your AI travel assistant has curated the perfect adventure, from flights to hidden gems.
        </motion.p>

        {/* Boarding Pass Visualization */}
        <motion.div
          className="bg-white rounded-2xl p-8 md:p-12 max-w-2xl mx-auto mb-12 border-l-4 border-blue-600 shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: false }}
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b-2 border-dashed border-neutral-300">
              <div className="text-left">
                <p className="text-sm text-neutral-600">PASSENGER</p>
                <p className="text-xl font-bold text-neutral-900">You</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-neutral-600">BOARDING PASS</p>
                <p className="text-xl font-bold text-neutral-900">001</p>
              </div>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-neutral-200">
              <div className="text-left">
                <p className="text-sm text-neutral-600">FROM</p>
                <p className="text-2xl font-bold text-neutral-900">JFK</p>
              </div>
              <motion.div
                animate={{ x: [0, 20, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
              <div className="text-right">
                <p className="text-sm text-neutral-600">TO</p>
                <p className="text-2xl font-bold text-neutral-900">NRT</p>
              </div>
            </div>
            <div className="flex justify-between items-center pt-4">
              <div className="text-left">
                <p className="text-sm text-neutral-600">DEPARTURE</p>
                <p className="font-bold text-neutral-900">In 14 Days</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-neutral-600">SEAT</p>
                <p className="font-bold text-neutral-900">1A</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col md:flex-row justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: false }}
        >
          {/* Primary CTA */}
          <motion.button
            className="px-10 py-4 bg-blue-600 text-white font-bold rounded-full text-lg hover:bg-blue-700 transition flex items-center justify-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <BookOpen size={24} />
            Book My Journey
          </motion.button>

          {/* Secondary CTA */}
          <motion.button
            className="px-10 py-4 bg-white text-blue-600 font-bold rounded-full text-lg border-2 border-blue-600 hover:bg-blue-50 transition flex items-center justify-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={24} />
            Download
          </motion.button>

          {/* Tertiary CTA */}
          <motion.button
            className="px-10 py-4 bg-white text-neutral-900 font-bold rounded-full text-lg border-2 border-neutral-300 hover:border-neutral-400 transition flex items-center justify-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Share2 size={24} />
            Share
          </motion.button>
        </motion.div>

        {/* Final Message */}
        <motion.p
          className="text-neutral-600 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: false }}
        >
          Adventure awaits. Your perfect itinerary is ready to explore.
        </motion.p>
      </div>
    </section>
  );
}
