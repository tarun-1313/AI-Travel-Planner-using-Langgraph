'use client';

import { useEffect } from 'react';
import SmoothScroll from '@/components/SmoothScroll';
import LandingHero from '@/components/sections/LandingHero';
import TakeoffSequence from '@/components/sections/TakeoffSequence';
import EarthSection from '@/components/sections/EarthSection';
import DestinationGallery from '@/components/sections/DestinationGallery';
import AIPlanningSection from '@/components/sections/AIPlanningSection';
import ItineraryTimeline from '@/components/sections/ItineraryTimeline';
import BudgetVisualization from '@/components/sections/BudgetVisualization';
import MissionComplete from '@/components/sections/MissionComplete';

export default function Home() {
  useEffect(() => {
    // Smooth scroll is handled by the SmoothScroll component wrapper
  }, []);

  return (
    <>
      <SmoothScroll>
        <main className="bg-white">
          {/* Section 1: Landing Hero */}
          <LandingHero />

          {/* Section 2: Takeoff Sequence */}
          <TakeoffSequence />

          {/* Section 3: Earth & Destination Reveal */}
          <EarthSection />

          {/* Section 4: Destination Video Gallery */}
          <DestinationGallery />

          {/* Section 5: AI Planning Process */}
          <AIPlanningSection />

          {/* Section 6: Itinerary Timeline */}
          <ItineraryTimeline />

          {/* Section 7: Budget & Analytics */}
          <BudgetVisualization />

          {/* Section 8: Mission Complete */}
          <MissionComplete />
        </main>
      </SmoothScroll>
    </>
  );
}
