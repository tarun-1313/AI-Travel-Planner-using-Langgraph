'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function EarthSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const earthRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !earthRef.current) return;

    gsap.to(earthRef.current, {
      rotation: 360,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 2,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden flex items-center justify-center bg-gradient-to-b from-blue-100 via-blue-50 to-white">
      {/* Star Field Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7,
            }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.h2
          className="text-6xl md:text-7xl font-bold text-neutral-900 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
        >
          Exploring The World
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: false }}
        >
          Our AI searches across the globe to find destinations that match your dreams perfectly.
        </motion.p>

        {/* Animated Earth Sphere */}
        <div ref={earthRef} className="inline-block">
          <motion.div
            className="w-48 h-48 md:w-72 md:h-72 rounded-full bg-gradient-to-br from-blue-400 via-cyan-300 to-green-300 relative shadow-2xl overflow-hidden"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            {/* Continents simulation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl md:text-8xl">🌍</div>
            </div>

            {/* Glowing aura */}
            <motion.div
              className="absolute inset-0 border-4 border-blue-400 rounded-full"
              animate={{ opacity: [0.5, 0.1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>
        </div>

        {/* Destination Markers */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: false }}
        >
          <p className="text-neutral-600 mb-8">Featured Destinations</p>
          <div className="flex justify-center gap-4 flex-wrap">
            {['🇯🇵', '🏖️', '🗼', '🏔️', '🌴'].map((emoji, i) => (
              <motion.div
                key={i}
                className="text-4xl"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                {emoji}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
