'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'beach', 'city', 'mountain', 'adventure'];
  
  const destinations = [
    { id: 1, name: 'Maldives', emoji: '🏝️', category: 'beach', price: 450, rating: 4.9, reviews: 1250 },
    { id: 2, name: 'Bali', emoji: '🌴', category: 'beach', price: 320, rating: 4.8, reviews: 980 },
    { id: 3, name: 'Paris', emoji: '🗼', category: 'city', price: 320, rating: 4.7, reviews: 2100 },
    { id: 4, name: 'Tokyo', emoji: '🗾', category: 'city', price: 380, rating: 4.8, reviews: 1850 },
    { id: 5, name: 'Swiss Alps', emoji: '⛰️', category: 'mountain', price: 620, rating: 4.9, reviews: 850 },
    { id: 6, name: 'Iceland', emoji: '🌋', category: 'adventure', price: 550, rating: 4.7, reviews: 750 },
    { id: 7, name: 'Santorini', emoji: '🏖️', category: 'beach', price: 480, rating: 4.9, reviews: 1640 },
    { id: 8, name: 'New York', emoji: '🏙️', category: 'city', price: 290, rating: 4.6, reviews: 2500 },
    { id: 9, name: 'Banff', emoji: '🏔️', category: 'mountain', price: 520, rating: 4.8, reviews: 680 },
  ];

  const filtered = selectedCategory === 'all' ? destinations : destinations.filter(d => d.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-neutral-gray">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-3xl font-bold text-primary">Wander</Link>
          <nav className="hidden md:flex gap-8">
            <Link href="/" className="text-foreground hover:text-primary transition">Home</Link>
            <Link href="/explore" className="text-primary font-semibold">Explore</Link>
            <Link href="/" className="text-foreground-muted hover:text-primary transition">Trips</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <motion.section
        className="bg-gradient-to-b from-blue-50 to-white py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Explore the World
          </motion.h1>
          <motion.p
            className="text-xl text-foreground-muted max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Discover amazing destinations curated just for you. Filter by category to find your perfect getaway.
          </motion.p>
        </div>
      </motion.section>

      {/* Category Filter */}
      <section className="border-b border-neutral-gray">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-background-secondary text-foreground hover:bg-neutral-gray'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            {filtered.map((destination, index) => (
              <motion.div
                key={destination.id}
                className="card card-hover overflow-hidden cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                {/* Image Section */}
                <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-6xl overflow-hidden">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="group-hover:scale-110 transition-transform"
                  >
                    {destination.emoji}
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{destination.name}</h3>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(destination.rating) ? '⭐' : '☆'} />
                      ))}
                    </div>
                    <span className="text-sm text-foreground-muted">({destination.reviews} reviews)</span>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-center pt-4 border-t border-neutral-gray">
                    <div className="text-2xl font-bold text-primary">${destination.price}</div>
                    <motion.button
                      className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-dark transition"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
