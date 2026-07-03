import { Header } from '@/components/shared/Header';
import { Hero } from '@/components/shared/Hero';
import { Features } from '@/components/shared/Features';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        
        {/* CTA Section */}
        <section className="py-20 px-4 border-t border-border">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Plan Your <span className="text-primary">Perfect Journey?</span>
            </h2>
            <p className="text-xl text-foreground-muted mb-8 max-w-2xl mx-auto">
              Let the NEXUS AI Travel OS orchestrate your entire trip. From itinerary generation to real-time updates, we&apos;ve got you covered.
            </p>
            <button className="px-8 py-4 rounded-lg bg-primary text-background font-bold text-lg hover:bg-primary-light transition-all transform hover:scale-105 glow-primary">
              Start Planning Now
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border py-8 px-4">
          <div className="max-w-7xl mx-auto text-center text-foreground-muted text-sm">
            <p>© 2024 NEXUS Travel OS. Powered by LangGraph AI and Next.js.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
