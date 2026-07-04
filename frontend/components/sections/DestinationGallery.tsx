'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, Star } from 'lucide-react';

const destinations = [
  {
    name: 'Japan',
    emoji: '🇯🇵',
    description: 'Where ancient traditions meet modern innovation',
    rating: '4.9',
    reviews: '2.3k',
    price: '$1,200',
    color: 'from-pink-400 to-rose-300',
  },
  {
    name: 'Maldives',
    emoji: '🏝️',
    description: 'Turquoise waters and pristine sandy shores',
    rating: '4.95',
    reviews: '3.1k',
    price: '$1,500',
    color: 'from-cyan-400 to-blue-300',
  },
  {
    name: 'Paris',
    emoji: '🗼',
    description: 'The city of light, love, and endless romance',
    rating: '4.8',
    reviews: '4.2k',
    price: '$1,100',
    color: 'from-yellow-300 to-orange-300',
  },
  {
    name: 'Switzerland',
    emoji: '🏔️',
    description: 'Majestic mountains and alpine serenity',
    rating: '4.85',
    reviews: '1.8k',
    price: '$1,400',
    color: 'from-blue-300 to-cyan-200',
  },
  {
    name: 'Bali',
    emoji: '🌴',
    description: 'Tropical paradise with rich cultural heritage',
    rating: '4.9',
    reviews: '2.9k',
    price: '$800',
    color: 'from-green-400 to-emerald-300',
  },
];

export default function DestinationGallery() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <section className="relative min-h-screen overflow-hidden bg-white">
      {/* Carousel Container */}
      <div className="relative h-screen overflow-hidden">
        {/* Destination Cards - using emoji as "video" background */}
        {destinations.map((dest, index) => (
          <motion.div
            key={index}
            className={`absolute inset-0 bg-gradient-to-br ${dest.color}`}
            animate={{
              opacity: selectedIndex === index ? 1 : 0,
              zIndex: selectedIndex === index ? 10 : 0,
            }}
            transition={{ duration: 1.2 }}
          >
            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                className="text-9xl md:text-[200px] mb-8"
                animate={{
                  scale: selectedIndex === index ? 1 : 0.8,
                  opacity: selectedIndex === index ? 1 : 0,
                }}
                transition={{ duration: 1 }}
              >
                {dest.emoji}
              </motion.div>

              <motion.div
                className="text-center z-20 px-4"
                initial={{ opacity: 0, y: 40 }}
                animate={{
                  opacity: selectedIndex === index ? 1 : 0,
                  y: selectedIndex === index ? 0 : 40,
                }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="text-6xl md:text-7xl font-bold text-white mb-4">{dest.name}</h2>
                <p className="text-xl md:text-2xl text-white text-opacity-90 mb-8 max-w-2xl">
                  {dest.description}
                </p>

                {/* Rating and Price */}
                <div className="flex items-center justify-center gap-8 mb-12 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Star size={24} className="text-yellow-300 fill-yellow-300" />
                    <span className="text-white text-xl font-semibold">{dest.rating}</span>
                    <span className="text-white text-opacity-70">({dest.reviews})</span>
                  </div>
                  <div className="text-white text-2xl font-bold">From {dest.price}</div>
                </div>

                <motion.button
                  className="px-8 py-4 bg-white text-blue-600 font-bold rounded-full text-lg hover:bg-opacity-90 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore {dest.name}
                </motion.button>
              </motion.div>
            </div>

            {/* Parallax Effect */}
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                y: selectedIndex === index ? 0 : 20,
              }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30 flex gap-4">
        {destinations.map((_, index) => (
          <motion.button
            key={index}
            className={`w-3 h-3 rounded-full transition ${
              selectedIndex === index ? 'bg-white' : 'bg-white bg-opacity-40'
            }`}
            onClick={() => setSelectedIndex(index)}
            animate={{
              scale: selectedIndex === index ? 1.5 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      {/* Scroll Instructions */}
      <motion.div
        className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-30 text-white text-center"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown size={32} className="mx-auto" />
        <p className="text-sm mt-2">Scroll to explore</p>
      </motion.div>
    </section>
  );
}
