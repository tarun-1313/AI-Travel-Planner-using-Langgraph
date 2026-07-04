'use client';

import { motion } from 'framer-motion';

const planningMoments = [
  {
    icon: '✈️',
    label: 'Searching Flights',
    description: 'Finding the best airlines and routes',
    color: 'from-blue-500 to-blue-600',
    delay: 0,
  },
  {
    icon: '🏨',
    label: 'Finding Boutique Hotels',
    description: 'Curating luxury accommodations',
    color: 'from-purple-500 to-purple-600',
    delay: 0.3,
  },
  {
    icon: '🍽️',
    label: 'Discovering Local Food',
    description: 'Researching authentic cuisines',
    color: 'from-orange-500 to-orange-600',
    delay: 0.6,
  },
  {
    icon: '🎭',
    label: 'Curating Unique Attractions',
    description: 'Finding hidden gems and experiences',
    color: 'from-pink-500 to-pink-600',
    delay: 0.9,
  },
  {
    icon: '🌤️',
    label: 'Checking Perfect Weather',
    description: 'Optimizing your travel dates',
    color: 'from-cyan-500 to-cyan-600',
    delay: 1.2,
  },
  {
    icon: '📋',
    label: 'Planning Perfect Days',
    description: 'Assembling your personalized itinerary',
    color: 'from-green-500 to-green-600',
    delay: 1.5,
  },
];

export default function AIPlanningSection() {
  return (
    <section className="relative min-h-screen py-24 overflow-hidden bg-gradient-to-b from-white to-neutral-50">
      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
        >
          <h2 className="text-6xl md:text-7xl font-bold text-neutral-900 mb-6">
            Your Personal Travel Assistant
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto">
            Watch as our AI discovers amazing experiences, curated exclusively for your journey.
          </p>
        </motion.div>

        {/* Planning Moments */}
        <div className="space-y-6">
          {planningMoments.map((moment, index) => (
            <motion.div
              key={moment.label}
              className={`bg-gradient-to-r ${moment.color} rounded-3xl p-8 md:p-10 text-white overflow-hidden relative`}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: moment.delay }}
              viewport={{ once: false }}
            >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 opacity-10"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Content */}
              <div className="relative z-10 flex items-start gap-6">
                {/* Icon */}
                <motion.div
                  className="text-5xl md:text-6xl flex-shrink-0"
                  animate={{ scale: [1, 1.15, 1], rotate: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.15 }}
                >
                  {moment.icon}
                </motion.div>

                {/* Text */}
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">{moment.label}</h3>
                  <p className="text-white text-opacity-90">{moment.description}</p>
                </div>

                {/* Progress Circle */}
                <motion.div
                  className="flex-shrink-0 w-16 h-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.15 }}
                >
                  <motion.div
                    className="text-white font-bold text-lg"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.15 }}
                  >
                    ✓
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Almost Ready Message */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
          viewport={{ once: false }}
        >
          <p className="text-xl md:text-2xl font-bold text-neutral-900 mb-2">Almost Ready...</p>
          <p className="text-neutral-600">Your personalized itinerary is being assembled</p>
        </motion.div>
      </div>
    </section>
  );
}
