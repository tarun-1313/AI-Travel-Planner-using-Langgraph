'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plane, MapPin, DollarSign, Calendar, Sparkles } from 'lucide-react';

interface MissionInput {
  destination: string;
  duration: number;
  budget: string;
  travelStyle: string;
  startDate: string;
}

export function CommandConsole() {
  const [isOpen, setIsOpen] = useState(false);
  const [missionInput, setMissionInput] = useState<MissionInput>({
    destination: '',
    duration: 7,
    budget: '$5000',
    travelStyle: 'balanced',
    startDate: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async () => {
    setIsProcessing(true);
    // Simulate mission processing
    setTimeout(() => {
      setIsProcessing(false);
      // Navigate to mission dashboard
      window.location.href = '/mission';
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  return (
    <>
      {/* Floating Command Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 p-4 rounded-full bg-gradient-to-r from-primary to-primary-light text-background shadow-2xl hover:shadow-primary/50 glow-primary z-50"
      >
        <Sparkles size={24} />
      </motion.button>

      {/* Console Modal */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl glass-dark rounded-2xl p-8 border border-primary/20"
          >
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-primary mb-2">MISSION CONTROL CONSOLE</h2>
              <p className="text-foreground-muted">Define your travel mission parameters</p>
            </div>

            {/* Input Fields */}
            <div className="space-y-6">
              {/* Destination */}
              <motion.div
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                custom={0}
                className="space-y-2"
              >
                <label className="flex items-center gap-2 text-foreground-muted text-sm font-semibold">
                  <MapPin size={16} className="text-primary" />
                  DESTINATION
                </label>
                <input
                  type="text"
                  placeholder="Enter destination (e.g., Tokyo, Paris, Bali)"
                  value={missionInput.destination}
                  onChange={(e) =>
                    setMissionInput({ ...missionInput, destination: e.target.value })
                  }
                  className="w-full bg-background-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-foreground-muted/50 focus:outline-none focus:border-primary transition-colors"
                />
              </motion.div>

              {/* Duration and Budget */}
              <div className="grid grid-cols-2 gap-4">
                {/* Duration */}
                <motion.div
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                  className="space-y-2"
                >
                  <label className="flex items-center gap-2 text-foreground-muted text-sm font-semibold">
                    <Calendar size={16} className="text-primary" />
                    DURATION (DAYS)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="90"
                    value={missionInput.duration}
                    onChange={(e) =>
                      setMissionInput({ ...missionInput, duration: parseInt(e.target.value) })
                    }
                    className="w-full bg-background-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </motion.div>

                {/* Budget */}
                <motion.div
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                  className="space-y-2"
                >
                  <label className="flex items-center gap-2 text-foreground-muted text-sm font-semibold">
                    <DollarSign size={16} className="text-primary" />
                    BUDGET
                  </label>
                  <select
                    value={missionInput.budget}
                    onChange={(e) =>
                      setMissionInput({ ...missionInput, budget: e.target.value })
                    }
                    className="w-full bg-background-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                  >
                    <option>$1000-$2500</option>
                    <option>$2500-$5000</option>
                    <option selected>$5000-$10000</option>
                    <option>$10000-$20000</option>
                    <option>$20000+</option>
                  </select>
                </motion.div>
              </div>

              {/* Travel Style */}
              <motion.div
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                custom={3}
                className="space-y-2"
              >
                <label className="flex items-center gap-2 text-foreground-muted text-sm font-semibold">
                  <Plane size={16} className="text-primary" />
                  TRAVEL STYLE
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {['Budget', 'Balanced', 'Luxury', 'Adventure'].map((style) => (
                    <button
                      key={style}
                      onClick={() =>
                        setMissionInput({
                          ...missionInput,
                          travelStyle: style.toLowerCase(),
                        })
                      }
                      className={`py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
                        missionInput.travelStyle === style.toLowerCase()
                          ? 'bg-primary text-background border border-primary'
                          : 'bg-background-secondary border border-border text-foreground-muted hover:border-primary'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Start Date */}
              <motion.div
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                custom={4}
                className="space-y-2"
              >
                <label className="flex items-center gap-2 text-foreground-muted text-sm font-semibold">
                  <Calendar size={16} className="text-primary" />
                  START DATE
                </label>
                <input
                  type="date"
                  value={missionInput.startDate}
                  onChange={(e) =>
                    setMissionInput({ ...missionInput, startDate: e.target.value })
                  }
                  className="w-full bg-background-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </motion.div>
            </div>

            {/* Submit Button */}
            <motion.button
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              custom={5}
              onClick={handleSubmit}
              disabled={!missionInput.destination || isProcessing}
              className="mt-8 w-full py-4 rounded-lg bg-gradient-to-r from-primary to-primary-light text-background font-bold text-lg hover:shadow-lg glow-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isProcessing ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    ⚙️
                  </motion.div>
                  INITIATING MISSION...
                </span>
              ) : (
                'LAUNCH MISSION'
              )}
            </motion.button>

            {/* Status */}
            {missionInput.destination && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 p-4 rounded-lg bg-background-tertiary border border-primary/20 text-sm text-foreground-muted"
              >
                <p>Mission Ready: {missionInput.destination} • {missionInput.duration} days • {missionInput.budget}</p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
