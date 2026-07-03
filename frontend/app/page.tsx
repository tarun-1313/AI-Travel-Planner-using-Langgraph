'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, MapPin, Calendar, Users } from 'lucide-react';

export default function Home() {
  const [selectedDates, setSelectedDates] = useState({ checkIn: '', checkOut: '' });
  const [isGenerating, setIsGenerating] = useState(false);

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

      {/* Premium Hero Section */}
      <motion.section
        className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-sky-100 via-blue-50 to-neutral-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Moving Clouds */}
          <motion.div
            className="absolute top-8 left-0 w-32 h-16 bg-white rounded-full opacity-70"
            animate={{ x: ['-100%', '120%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute top-24 right-0 w-40 h-20 bg-white rounded-full opacity-50"
            animate={{ x: ['120%', '-100%'] }}
            transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          />
          
          {/* Flying Birds */}
          <motion.div
            className="absolute top-12 left-1/4 text-3xl"
            animate={{ x: [0, 400], y: [0, -50, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          >
            🦅
          </motion.div>
          <motion.div
            className="absolute top-20 right-1/3 text-2xl"
            animate={{ x: [0, -300], y: [0, 40, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'linear', delay: 2 }}
          >
            🦅
          </motion.div>
          
          {/* Airplane with Trail */}
          <motion.div
            className="absolute top-1/3 -left-20 flex items-center gap-2"
            animate={{ x: ['0%', '110vw'], y: [0, -30, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            <div className="text-5xl">✈️</div>
            <svg className="w-96 h-1 opacity-30" viewBox="0 0 400 1" preserveAspectRatio="none">
              <path d="M 0 0.5 Q 100 -2 200 0.5 T 400 0.5" stroke="#2563eb" strokeWidth="2" fill="none" />
            </svg>
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Your Dream Vacation<br />
            <span className="text-primary">Starts Here</span>
          </motion.h1>
          
          <motion.p
            className="text-lg text-foreground-muted max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Plan the perfect trip with AI-powered recommendations. Discover destinations, book flights & hotels, and create unforgettable memories.
          </motion.p>
        </div>
      </motion.section>

      {/* Premium AI Search Card - Floating */}
      <motion.div
        className="max-w-5xl mx-auto w-full px-4 md:px-8 -mt-16 md:-mt-24 relative z-20 mb-20"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8, type: 'spring', stiffness: 100 }}
      >
        <div className="card card-large p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-end">
            {/* Destination Input */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <MapPin size={18} className="text-primary" />
                Where
              </label>
              <input
                type="text"
                placeholder="Paris, Tokyo, Maldives..."
                className="px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-neutral-50 text-foreground placeholder-foreground-muted transition"
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
                className="px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-neutral-50 text-foreground transition"
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
                className="px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-neutral-50 text-foreground transition"
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
              <select className="px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-neutral-50 text-foreground transition">
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
                className="px-8 py-3 bg-gradient-to-r from-primary to-primary-light text-white font-semibold rounded-xl hover:shadow-lg transition flex items-center justify-center gap-2 w-full h-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isGenerating}
              >
                <Search size={20} />
                <span className="hidden md:inline">Search</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Featured Destinations - Premium Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 w-full">
        <div className="mb-12">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-foreground mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Trending Destinations
          </motion.h2>
          <motion.p
            className="text-foreground-muted text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Discover the most popular destinations loved by travelers worldwide
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Maldives', image: '🏝️', desc: 'Crystal clear waters and luxury resorts', temp: '28°C', rating: '4.9', reviews: '2.4k', price: '$450' },
            { name: 'Paris', image: '🗼', desc: 'The city of light, love, and culture', temp: '18°C', rating: '4.8', reviews: '5.1k', price: '$320' },
            { name: 'Tokyo', image: '🗾', desc: 'Modern innovation meets tradition', temp: '22°C', rating: '4.9', reviews: '3.8k', price: '$380' },
          ].map((destination, index) => (
            <motion.div
              key={destination.name}
              className="card card-hover overflow-hidden cursor-pointer group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6, type: 'spring' }}
              viewport={{ once: true }}
            >
              {/* Image Section */}
              <div className="h-56 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-7xl overflow-hidden relative">
                <motion.div
                  animate={{ y: [0, -8, 0], scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="group-hover:scale-110 transition-transform"
                >
                  {destination.image}
                </motion.div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">{destination.name}</h3>
                <p className="text-foreground-muted text-sm mb-4">{destination.desc}</p>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-primary font-semibold">{destination.rating}</span>
                  <span className="text-yellow-400">★</span>
                  <span className="text-foreground-muted text-sm">({destination.reviews})</span>
                </div>
                
                {/* Footer */}
                <div className="flex justify-between items-center pt-4 border-t border-neutral-200">
                  <div className="text-sm text-foreground-muted">{destination.temp}</div>
                  <div className="text-lg font-bold text-primary">{destination.price}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

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
