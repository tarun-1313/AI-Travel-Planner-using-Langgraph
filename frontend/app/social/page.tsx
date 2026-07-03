'use client';

import { motion } from 'framer-motion';
import { Share2, Users, MessageCircle, Globe, Download, Eye } from 'lucide-react';

const shareOptions = [
  {
    icon: Globe,
    name: 'Share Link',
    description: 'Generate a shareable mission link',
    action: 'Copy Link',
    color: 'from-primary to-primary-light',
  },
  {
    icon: Users,
    name: 'Collaborate',
    description: 'Invite friends to plan together',
    action: 'Invite',
    color: 'from-accent to-accent-light',
  },
  {
    icon: MessageCircle,
    name: 'Social Media',
    description: 'Share to Instagram, Twitter, Facebook',
    action: 'Share',
    color: 'from-primary to-accent',
  },
];

const exportFormats = [
  { format: 'PDF', description: 'Printable itinerary document', size: '2.4 MB' },
  { format: 'ePub', description: 'E-book format for readers', size: '1.8 MB' },
  { format: 'XLSX', description: 'Spreadsheet with all details', size: '0.6 MB' },
  { format: 'JSON', description: 'Data export for backup', size: '0.4 MB' },
  { format: 'ZIP', description: 'Complete package with media', size: '45 MB' },
  { format: 'CSV', description: 'Itinerary timeline format', size: '0.2 MB' },
];

const travelPals = [
  { name: 'Alex Chen', destination: 'Tokyo', dates: 'Dec 1-7', match: 92 },
  { name: 'Sarah Jones', destination: 'Tokyo', dates: 'Dec 2-8', match: 87 },
  { name: 'Mike Wilson', destination: 'Kyoto', dates: 'Dec 4-6', match: 78 },
  { name: 'Emma Davis', destination: 'Tokyo', dates: 'Dec 1-5', match: 84 },
];

export default function SocialPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-background-secondary/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold text-primary mb-2">Social & Sharing</h1>
            <p className="text-foreground-muted">Connect, collaborate, and share your travel missions</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        {/* Share Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">Share Your Mission</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shareOptions.map((option, i) => {
              const Icon = option.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-dark rounded-lg border border-border p-6 hover:border-primary/50 transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <Icon size={28} className="text-primary group-hover:text-primary-light transition-colors" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{option.name}</h3>
                  <p className="text-sm text-foreground-muted mb-4">{option.description}</p>
                  <button
                    className={`w-full py-2 px-4 rounded-lg bg-gradient-to-r ${option.color} text-background font-semibold text-sm hover:shadow-lg transition-all`}
                  >
                    {option.action}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Travel Pals Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">Find Travel Companions</h2>
          <div className="space-y-4">
            {travelPals.map((pal, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-lg border border-border p-6 flex items-center justify-between hover:border-primary/50 transition-all group"
              >
                <div className="flex-1">
                  <h3 className="font-bold text-foreground mb-2">{pal.name}</h3>
                  <p className="text-sm text-foreground-muted">
                    {pal.destination} • {pal.dates}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-bold text-primary">{pal.match}%</p>
                    <p className="text-xs text-foreground-muted">Match</p>
                  </div>
                  <button className="px-6 py-2 rounded-lg bg-primary/20 border border-primary/50 text-primary hover:bg-primary/30 transition-all">
                    Connect
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Export Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">Export Your Itinerary</h2>
          <div className="glass-dark rounded-lg border border-border p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {exportFormats.map((item, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="group text-left p-6 rounded-lg bg-background-secondary border border-border hover:border-primary/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-foreground text-lg mb-1">{item.format}</h4>
                      <p className="text-xs text-foreground-muted">{item.size}</p>
                    </div>
                    <Download size={20} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm text-foreground-muted">{item.description}</p>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Privacy & Security */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="glass-dark rounded-lg border border-border p-8"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">Privacy & Security</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Eye size={20} className="text-primary" />
                Who can see your mission?
              </h3>
              <ul className="space-y-2 text-sm text-foreground-muted">
                <li>✓ Only you (private)</li>
                <li>✓ Invited friends</li>
                <li>✓ Public to all users</li>
                <li>✓ Link-sharing with password</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Share2 size={20} className="text-accent" />
                Control what you share
              </h3>
              <ul className="space-y-2 text-sm text-foreground-muted">
                <li>✓ Hide budget information</li>
                <li>✓ Hide personal dates</li>
                <li>✓ Mask exact locations</li>
                <li>✓ Encrypt sensitive data</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Activity Feed */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { user: 'Sarah Jones', action: 'joined your Tokyo mission', time: '2 hours ago' },
              { user: 'Mike Wilson', action: 'commented on Day 3 itinerary', time: '4 hours ago' },
              { user: 'Emma Davis', action: 'shared the mission to Instagram', time: '6 hours ago' },
            ].map((activity, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-lg border border-border p-4 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/50" />
                <div className="flex-1">
                  <p className="text-foreground">
                    <span className="font-bold">{activity.user}</span>
                    {' '}
                    <span className="text-foreground-muted">{activity.action}</span>
                  </p>
                  <p className="text-xs text-foreground-muted mt-1">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
