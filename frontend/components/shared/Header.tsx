'use client';

import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative z-50 border-b border-border">
      <div className="glass bg-background-secondary/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg glass flex items-center justify-center glow-primary">
                <span className="text-primary font-bold text-lg">✈</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  <span className="text-primary glow-text-primary">NEXUS</span>
                </h1>
                <p className="text-xs text-foreground-muted">Travel OS v1.0</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              {[
                { label: 'Dashboard', href: '/dashboard' },
                { label: '🤖 JARVIS', href: '/chat' },
                { label: 'Memories', href: '/memories' },
                { label: 'Advanced', href: '/advanced' },
                { label: 'Achievements', href: '/achievements' },
                { label: 'Insights', href: '/insights' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-foreground-muted hover:text-primary hover:bg-background-tertiary transition-all"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button className="px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium text-sm">
                Sign In
              </button>
              <button
                className="md:hidden p-2 rounded-lg glass hover:bg-background-tertiary"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="text-foreground">☰</span>
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <nav className="md:hidden mt-4 space-y-2 pb-4 border-t border-border/50 pt-4">
              {[
                { label: 'Dashboard', href: '/dashboard' },
                { label: '🤖 JARVIS Chat', href: '/chat' },
                { label: 'Memories', href: '/memories' },
                { label: 'Advanced', href: '/advanced' },
                { label: 'Achievements', href: '/achievements' },
                { label: 'Insights', href: '/insights' },
                { label: 'Export', href: '/export' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block w-full text-left px-4 py-2 rounded-lg text-sm font-medium text-foreground-muted hover:text-primary hover:bg-background-tertiary transition-all"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
