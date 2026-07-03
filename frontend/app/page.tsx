'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  const [selectedDates, setSelectedDates] = useState({ checkIn: '', checkOut: '' });

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-neutral-gray">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-3xl font-bold text-primary">Wander</div>
          <nav className="hidden md:flex gap-8">
            <Link href="/" className="text-foreground hover:text-primary transition">Explore</Link>
            <Link href="/" className="text-foreground-muted hover:text-primary transition">My Trips</Link>
            <Link href="/" className="text-foreground-muted hover:text-primary transition">Messages</Link>
            <Link href="/" className="text-foreground-muted hover:text-primary transition">Account</Link>
          </nav>
          <button className="hidden md:block px-6 py-2 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition">
            Search Trips
          </button>
        </div>
      </header>

      {/* Hero Section with Animated Background */}
      <motion.section
        className="relative h-96 overflow-hidden bg-gradient-to-b from-blue-50 to-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated Sky */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 400">
          {/* Sky gradient background */}
          <defs>
            <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#e0f2fe', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <rect width="1200" height="400" fill="url(#skyGradient)" />
          
          {/* Animated clouds */}
          <motion.ellipse
            cx="200" cy="80" rx="60" ry="30"
            fill="white" opacity="0.8"
            animate={{ x: [0, 100, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <motion.ellipse
            cx="800" cy="120" rx="50" ry="25"
            fill="white" opacity="0.6"
            animate={{ x: [0, -150, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          />
          <motion.ellipse
            cx="600" cy="60" rx="70" ry="35"
            fill="white" opacity="0.7"
            animate={{ x: [0, 120, 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />
          
          {/* Animated airplane */}
          <motion.g
            animate={{ x: [-100, 1200] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <path d="M 0 0 L 20 -5 L 30 0 L 20 5 Z" fill="#0066ff" transform="translate(0, 200)" />
            <circle cx="10" cy="200" r="3" fill="#0066ff" />
          </motion.g>

          {/* Floating balloons */}
          <motion.circle cx="150" cy="300" r="15" fill="#ff6b35" animate={{ y: [-50, -150] }} transition={{ duration: 4, repeat: Infinity }} opacity="0.8" />
          <motion.circle cx="1050" cy="320" r="12" fill="#0099ff" animate={{ y: [-30, -120] }} transition={{ duration: 5, repeat: Infinity }} opacity="0.7" />
          <motion.circle cx="500" cy="280" r="14" fill="#2ecc71" animate={{ y: [-40, -140] }} transition={{ duration: 6, repeat: Infinity }} opacity="0.75" />
        </svg>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Plan Your Perfect Trip
          </motion.h1>
          <motion.p
            className="text-xl text-foreground-muted max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Discover amazing destinations, book flights & hotels, and create unforgettable memories with AI-powered recommendations.
          </motion.p>
        </div>
      </motion.section>

      {/* Search Bar Card - Floating */}
      <motion.div
        className="max-w-4xl mx-auto w-full px-4 -mt-20 relative z-20 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        <div className="card card-hover p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Destination Input */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-foreground mb-2">Where</label>
              <input
                type="text"
                placeholder="City, country or region"
                className="px-4 py-3 border border-neutral-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background-secondary"
              />
            </div>

            {/* Check-in Date */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-foreground mb-2">Check in</label>
              <input
                type="date"
                className="px-4 py-3 border border-neutral-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background-secondary"
                value={selectedDates.checkIn}
                onChange={(e) => setSelectedDates({ ...selectedDates, checkIn: e.target.value })}
              />
            </div>

            {/* Check-out Date */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-foreground mb-2">Check out</label>
              <input
                type="date"
                className="px-4 py-3 border border-neutral-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background-secondary"
                value={selectedDates.checkOut}
                onChange={(e) => setSelectedDates({ ...selectedDates, checkOut: e.target.value })}
              />
            </div>

            {/* Search Button */}
            <div className="flex flex-col justify-end">
              <motion.button
                className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Search
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Featured Destinations */}
      <section className="max-w-7xl mx-auto px-4 py-12 w-full">
        <motion.h2
          className="text-3xl font-bold text-foreground mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Trending Destinations
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Maldives', image: '🏝️', desc: 'Crystal clear waters', temp: '28°C', price: '$450' },
            { name: 'Paris', image: '🗼', desc: 'City of love', temp: '18°C', price: '$320' },
            { name: 'Tokyo', image: '🗾', desc: 'Vibrant culture', temp: '22°C', price: '$380' },
          ].map((destination, index) => (
            <motion.div
              key={destination.name}
              className="card-hover cursor-pointer overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-6xl overflow-hidden">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {destination.image}
                </motion.div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{destination.name}</h3>
                <p className="text-foreground-muted text-sm mb-4">{destination.desc}</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-foreground-muted">{destination.temp}</div>
                  <div className="text-lg font-bold text-primary">{destination.price}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16 mt-12">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.h2
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to Wander?
          </motion.h2>
          <motion.p
            className="text-lg mb-8 text-blue-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Start planning your dream vacation today with AI-powered recommendations.
          </motion.p>
          <motion.button
            className="px-8 py-4 bg-white text-primary font-bold rounded-full text-lg hover:bg-blue-50 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Destinations
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">Wander</h3>
              <p className="text-sm text-gray-300">Your trusted travel planning companion.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Explore</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">Destinations</a></li>
                <li><a href="#" className="hover:text-white">Travel Guides</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 Wander. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
