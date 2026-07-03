'use client';

import { useState } from 'react';
import { Header } from '@/components/shared/Header';
import { Download, FileText, Image, Music, Package, Share2, CheckCircle } from 'lucide-react';

interface ExportOption {
  id: string;
  name: string;
  description: string;
  format: string;
  icon: React.ReactNode;
  size: string;
  features: string[];
  downloadable: boolean;
}

const exportOptions: ExportOption[] = [
  {
    id: 'itinerary-pdf',
    name: 'Itinerary PDF',
    description: 'Print-friendly itinerary with maps and details',
    format: 'PDF',
    icon: <FileText size={24} className="text-red-400" />,
    size: '2.4 MB',
    features: ['Day-by-day schedule', 'Maps & locations', 'Booking confirmations', 'Emergency contacts'],
    downloadable: true,
  },
  {
    id: 'trip-album',
    name: 'Trip Photo Album',
    description: 'All memories and photos organized by date',
    format: 'ZIP',
    icon: <Image size={24} className="text-blue-400" />,
    size: '145 MB',
    features: ['High-res photos', 'Organized by date', 'Location metadata', 'Photo captions'],
    downloadable: true,
  },
  {
    id: 'travel-journal',
    name: 'Travel Journal (eBook)',
    description: 'Interactive ePub of your travel journal entries',
    format: 'ePub',
    icon: <Music size={24} className="text-purple-400" />,
    size: '8.3 MB',
    features: ['All journal entries', 'Interactive TOC', 'Cross-references', 'Searchable text'],
    downloadable: true,
  },
  {
    id: 'budget-report',
    name: 'Budget Analysis Report',
    description: 'Detailed spending breakdown and analysis',
    format: 'XLSX',
    icon: <FileText size={24} className="text-green-400" />,
    size: '1.2 MB',
    features: ['Expense breakdown', 'Charts & graphs', 'Category analysis', 'CSV export'],
    downloadable: true,
  },
  {
    id: 'complete-package',
    name: 'Complete Travel Package',
    description: 'All files, data, and media in one download',
    format: 'ZIP',
    icon: <Package size={24} className="text-yellow-400" />,
    size: '267 MB',
    features: ['Everything included', 'Organized structure', 'Readme file', 'Multiple formats'],
    downloadable: true,
  },
  {
    id: 'travel-stats',
    name: 'Travel Statistics',
    description: 'Comprehensive travel stats and analytics',
    format: 'JSON',
    icon: <FileText size={24} className="text-cyan-400" />,
    size: '0.5 MB',
    features: ['Raw data export', 'API compatible', 'All metrics', 'Machine-readable'],
    downloadable: true,
  },
];

const shareOptions = [
  { name: 'Social Media', icon: '📱', color: 'from-blue-500 to-purple-500' },
  { name: 'Email', icon: '📧', color: 'from-red-500 to-orange-500' },
  { name: 'Cloud Drive', icon: '☁️', color: 'from-cyan-500 to-blue-500' },
  { name: 'Public Link', icon: '🔗', color: 'from-green-500 to-emerald-500' },
];

export default function ExportPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [downloadedItems, setDownloadedItems] = useState<string[]>([]);

  const handleDownload = (id: string) => {
    setDownloadedItems([...downloadedItems, id]);
    setTimeout(() => {
      alert(`Downloading: ${id}\nYour file is ready!`);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Export Your Travel Data</h1>
          <p className="text-xl text-foreground-muted">
            Download your trips, memories, and statistics in multiple formats. Your data, always yours.
          </p>
        </div>

        {/* Export Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {exportOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedOption(selectedOption === option.id ? null : option.id)}
              className={`glass rounded-xl p-6 border transition-all text-left ${
                selectedOption === option.id ? 'border-primary' : 'border-border hover:border-primary/30'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="mt-1">{option.icon}</div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">{option.name}</h3>
                    <p className="text-xs text-foreground-muted mt-1">{option.format}</p>
                  </div>
                </div>
                {downloadedItems.includes(option.id) && (
                  <CheckCircle className="text-green-400" size={20} />
                )}
              </div>

              <p className="text-sm text-foreground-muted mb-4">{option.description}</p>

              {/* Size */}
              <p className="text-xs text-foreground-muted mb-4">Size: {option.size}</p>

              {/* Features */}
              {selectedOption === option.id && (
                <div className="mb-4 pt-4 border-t border-border/50 space-y-2">
                  {option.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-foreground-muted">
                      <span className="text-primary">✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
              )}

              {/* Download Button */}
              {selectedOption === option.id && (
                <button
                  onClick={() => handleDownload(option.id)}
                  className="w-full px-4 py-2 rounded-lg bg-primary text-background font-semibold hover:bg-primary-light transition-all mt-4 flex items-center justify-center gap-2"
                >
                  <Download size={18} />
                  Download
                </button>
              )}
            </button>
          ))}
        </div>

        {/* Share Section */}
        <div className="glass rounded-xl p-8 border border-border mb-12">
          <div className="flex items-center gap-3 mb-8">
            <Share2 className="text-accent" size={28} />
            <h2 className="text-2xl font-bold">Share Your Travel Stories</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {shareOptions.map((option, idx) => (
              <button
                key={idx}
                className={`glass rounded-xl p-6 border border-border hover:border-primary/30 transition-all flex items-center gap-4`}
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${option.color} flex items-center justify-center`}>
                  <span className="text-2xl">{option.icon}</span>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">{option.name}</p>
                  <p className="text-xs text-foreground-muted">Share your trip highlights</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Data Privacy */}
        <div className="glass rounded-xl p-8 border border-border bg-blue-500/5">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="text-2xl">🔒</span>
            Data Privacy & Security
          </h3>
          <ul className="space-y-3 text-foreground-muted text-sm">
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">•</span>
              <span>All exports are encrypted and downloaded directly to your device</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">•</span>
              <span>We never store downloaded files on our servers</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">•</span>
              <span>Your data remains fully under your control</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">•</span>
              <span>Exports can be deleted from our system anytime</span>
            </li>
          </ul>
        </div>

        {/* Storage Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="glass rounded-xl p-6 border border-border">
            <p className="text-sm text-foreground-muted mb-2">Total Data Size</p>
            <p className="text-3xl font-bold text-primary">423 MB</p>
          </div>
          <div className="glass rounded-xl p-6 border border-border">
            <p className="text-sm text-foreground-muted mb-2">Files & Records</p>
            <p className="text-3xl font-bold text-accent">2,847</p>
          </div>
          <div className="glass rounded-xl p-6 border border-border">
            <p className="text-sm text-foreground-muted mb-2">Export Count</p>
            <p className="text-3xl font-bold text-primary-light">12</p>
          </div>
        </div>
      </main>
    </div>
  );
}
