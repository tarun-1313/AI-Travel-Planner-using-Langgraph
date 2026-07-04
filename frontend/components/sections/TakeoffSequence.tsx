'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TakeoffSequence() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const airplaneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !airplaneRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
      },
    });

    // Airplane takeoff animation
    tl.to(
      airplaneRef.current,
      {
        y: -400,
        x: 200,
        rotation: 45,
        scale: 1.2,
        duration: 2,
      },
      0
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden flex items-center justify-center bg-gradient-to-b from-white via-blue-50 to-blue-100"
    >
      {/* Clouds that fade and move */}
      <motion.div className="absolute top-0 left-0 right-0 h-64 overflow-hidden">
        <motion.div
          className="w-full h-full bg-gradient-to-b from-white to-transparent"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.h2
          className="text-6xl md:text-7xl font-bold text-neutral-900 mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
        >
          Taking Off...
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: false }}
        >
          Your journey into discovery begins. Watch as we search the world for your perfect destination.
        </motion.p>

        {/* Animated Airplane */}
        <div ref={airplaneRef} className="text-8xl">
          ✈️
        </div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-200 to-transparent"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </section>
  );
}
