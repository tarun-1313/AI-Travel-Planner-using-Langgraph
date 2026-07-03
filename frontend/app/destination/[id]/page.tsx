'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DestinationPage({ params }: { params: { id: string } }) {
  // Mock destination data - in real app would fetch based on ID
  const destination = {
    name: 'Maldives',
    emoji: '🏝️',
    rating: 4.9,
    reviews: 1250,
    basePrice: 450,
    description: 'The Maldives is a tropical paradise known for its crystal-clear waters, white-sand beaches, and vibrant coral reefs. Perfect for honeymooners, adventure seekers, and those looking to relax in paradise.',
    highlights: [
      'Crystal clear turquoise waters',
      'Pristine white-sand beaches',
      'World-class snorkeling and diving',
      'Luxury overwater bungalows',
      'Traditional Dhoni boat experiences',
      'Sunset fishing adventures',
    ],
    climate: 'Tropical, warm year-round',
    bestTime: 'November to April',
    currency: 'Maldivian Rufiyaa (MVR)',
    language: 'Dhivehi, English widely spoken',
    itinerary: [
      { day: 1, title: 'Arrival & Resort Check-in', desc: 'Arrive at Malé airport and speedboat transfer to your resort' },
      { day: 2, title: 'Snorkeling Adventure', desc: 'Explore the coral reefs with professional guides' },
      { day: 3, title: 'Island Hopping', desc: 'Visit local islands and experience Maldivian culture' },
      { day: 4, title: 'Water Sports', desc: 'Try windsurfing, jet skiing, or surfing' },
      { day: 5, title: 'Relaxation Day', desc: 'Spa, beach time, and sunset dinner' },
      { day: 6, title: 'Departure', desc: 'Speedboat transfer back to airport' },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-neutral-gray">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-3xl font-bold text-primary">Wander</Link>
          <motion.button
            className="px-6 py-2 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition"
            whileHover={{ scale: 1.05 }}
          >
            Book Now
          </motion.button>
        </div>
      </header>

      {/* Hero */}
      <motion.section
        className="h-96 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-9xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          {destination.emoji}
        </motion.div>
      </motion.section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold text-foreground mb-4">{destination.name}</h1>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-2xl">{i < Math.floor(destination.rating) ? '⭐' : '☆'}</span>
              ))}
            </div>
            <span className="text-lg text-foreground-muted">({destination.reviews} reviews)</span>
            <span className="text-3xl font-bold text-primary">${destination.basePrice}</span>
          </div>
          <p className="text-lg text-foreground-muted">{destination.description}</p>
        </motion.div>

        {/* Highlights */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground mb-6">Why Visit {destination.name}?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {destination.highlights.map((highlight, idx) => (
              <motion.div
                key={idx}
                className="card p-4 flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <span className="text-2xl">✨</span>
                <span className="text-foreground font-medium">{highlight}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Practical Info */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground mb-6">Practical Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: 'Climate', value: destination.climate },
              { label: 'Best Time', value: destination.bestTime },
              { label: 'Currency', value: destination.currency },
              { label: 'Language', value: destination.language },
            ].map((info, idx) => (
              <motion.div
                key={idx}
                className="card p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <h3 className="text-sm font-semibold text-foreground-muted mb-2">{info.label}</h3>
                <p className="text-xl font-bold text-foreground">{info.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Sample Itinerary */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground mb-6">6-Day Sample Itinerary</h2>
          <div className="space-y-4">
            {destination.itinerary.map((item, idx) => (
              <motion.div
                key={idx}
                className="card-hover p-6 flex gap-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    {item.day}
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-foreground-muted">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-primary rounded-2xl p-12 text-center text-white mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Ready for Your Adventure?</h2>
          <p className="text-lg text-blue-100 mb-8">Start planning your {destination.name} trip with AI-powered recommendations</p>
          <motion.button
            className="px-8 py-4 bg-white text-primary font-bold rounded-full text-lg hover:bg-blue-50 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Plan Your Trip
          </motion.button>
        </motion.section>
      </div>

      {/* Footer */}
      <footer className="bg-foreground text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-300">© 2024 Wander. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
