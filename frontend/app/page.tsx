'use client';

import { motion } from 'framer-motion';
import { Globe } from '@/components/3d/Globe';
import { CommandConsole } from '@/components/mission/CommandConsole';
import { AgentNetwork } from '@/components/mission/AgentNetwork';
import { useState } from 'react';

export default function Home() {
  const [showAgents, setShowAgents] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-hidden">
      {/* Full-screen Mission Control Interface */}
      <div className="flex-1 relative">
        {/* 3D Earth Background */}
        <div className="absolute inset-0 w-full h-full">
          <Globe />
        </div>

        {/* Overlay gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/60" />

        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute top-20 left-0 right-0 z-10 flex flex-col items-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-4 glow-text-primary">
            NEXUS
          </h1>
          <p className="text-xl text-foreground-muted mb-2">TRAVEL OPERATING SYSTEM</p>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-2 text-primary text-sm font-semibold"
          >
            <div className="w-2 h-2 bg-primary rounded-full" />
            AI Supervisor Online
          </motion.div>
        </motion.div>

        {/* Center Status Card */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 flex justify-center px-4"
        >
          <div className="glass-dark rounded-2xl p-8 border border-primary/30 max-w-xl text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Ready for your next mission?</h2>
            <p className="text-foreground-muted mb-6">
              Define your travel parameters and let the AI agent network orchestrate your perfect journey.
            </p>
            <button
              onClick={() => setShowAgents(!showAgents)}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-primary-light text-background font-bold hover:shadow-lg glow-primary transition-all"
            >
              {showAgents ? 'Hide Agent Network' : 'View Agent Network'}
            </button>
          </div>
        </motion.div>

        {/* Agent Network Modal */}
        {showAgents && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm z-30 flex items-center justify-center p-4"
            onClick={() => setShowAgents(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl h-96 glass-dark rounded-2xl border border-primary/30 p-6"
            >
              <h3 className="text-xl font-bold text-primary mb-4">AI Agent Network</h3>
              <AgentNetwork isActive={showAgents} />
            </motion.div>
          </motion.div>
        )}

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-0 right-0 z-10 flex justify-center"
        >
          <p className="text-foreground-muted text-sm text-center px-4">
            © 2024 NEXUS AI Travel Operating System • Powered by LangGraph & Next.js
          </p>
        </motion.div>
      </div>

      {/* Command Console Button */}
      <CommandConsole />
    </div>
  );
}
