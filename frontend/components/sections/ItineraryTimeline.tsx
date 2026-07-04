'use client';

import { motion } from 'framer-motion';

const days = [
  {
    day: 1,
    title: 'Arrival & Discovery',
    emoji: '✈️',
    activities: ['Arrive at airport', 'Hotel check-in', 'Evening stroll'],
    time: '2.5 hours travel',
    budget: '$450',
  },
  {
    day: 2,
    title: 'Exploration',
    emoji: '🗺️',
    activities: ['Local market tour', 'Cultural landmarks', 'Sunset view'],
    time: '8 hours',
    budget: '$280',
  },
  {
    day: 3,
    title: 'Adventure',
    emoji: '🏔️',
    activities: ['Mountain hike', 'Nature photography', 'Local cuisine'],
    time: '6 hours',
    budget: '$350',
  },
  {
    day: 4,
    title: 'Immersion',
    emoji: '🎭',
    activities: ['Cultural show', 'Art galleries', 'Traditional dinner'],
    time: '5 hours',
    budget: '$320',
  },
  {
    day: 5,
    title: 'Departure',
    emoji: '🛫',
    activities: ['Last minute shopping', 'Farewell meal', 'Airport transfer'],
    time: '3 hours',
    budget: '$200',
  },
];

export default function ItineraryTimeline() {
  return (
    <section className="relative min-h-screen py-24 overflow-hidden bg-white">
      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
        >
          <h2 className="text-6xl md:text-7xl font-bold text-neutral-900 mb-6">Your Itinerary</h2>
          <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto">
            A day-by-day journey crafted to create unforgettable memories
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-8">
          {/* Vertical Timeline Line */}
          <svg className="w-1 h-full mx-auto absolute left-1/2 transform -translate-x-1/2" viewBox="0 0 1 1000">
            <motion.line
              x1="0.5"
              y1="0"
              x2="0.5"
              y2="1000"
              stroke="#e5e7eb"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 1.5 }}
              viewport={{ once: false }}
            />
          </svg>

          {/* Day Cards */}
          <div className="relative">
            {days.map((dayPlan, index) => (
              <motion.div
                key={dayPlan.day}
                className={`mb-12 flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: false }}
              >
                {/* Card */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <div className="bg-neutral-50 rounded-2xl p-6 md:p-8 border border-neutral-200 hover:border-blue-300 transition">
                    {/* Day Header */}
                    <div className="flex items-center gap-4 mb-4">
                      <motion.div
                        className="text-5xl"
                        animate={{ rotate: [0, 10, 0], scale: [1, 1.1, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.2,
                        }}
                      >
                        {dayPlan.emoji}
                      </motion.div>
                      <div>
                        <h3 className="text-3xl font-bold text-blue-600">Day {dayPlan.day}</h3>
                        <p className="text-neutral-600">{dayPlan.title}</p>
                      </div>
                    </div>

                    {/* Activities */}
                    <div className="space-y-3 mb-6">
                      {dayPlan.activities.map((activity, actIndex) => (
                        <motion.div
                          key={activity}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.4,
                            delay: index * 0.15 + actIndex * 0.1,
                          }}
                          viewport={{ once: false }}
                        >
                          <span className="text-blue-600 font-bold mt-1">✓</span>
                          <span className="text-neutral-700">{activity}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Footer Info */}
                    <div className="flex justify-between items-center pt-4 border-t border-neutral-200">
                      <span className="text-sm text-neutral-600">{dayPlan.time}</span>
                      <span className="font-bold text-blue-600">{dayPlan.budget}</span>
                    </div>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="w-2/12 flex justify-center">
                  <motion.div
                    className="w-6 h-6 bg-blue-600 rounded-full border-4 border-white relative z-10"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  />
                </div>

                {/* Empty Space */}
                <div className="w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Budget Summary */}
        <motion.div
          className="mt-20 bg-blue-50 rounded-3xl p-8 md:p-12 text-center border border-blue-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: false }}
        >
          <h3 className="text-3xl font-bold text-neutral-900 mb-4">Total Budget</h3>
          <motion.p
            className="text-5xl md:text-6xl font-bold text-blue-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
          >
            $1,600
          </motion.p>
          <p className="text-neutral-600 mt-2">For your 5-day journey</p>
        </motion.div>
      </div>
    </section>
  );
}
