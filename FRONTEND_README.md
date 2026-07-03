# NEXUS Travel OS - Frontend

A futuristic, AI-powered travel planning operating system built with Next.js 16, React Three Fiber, and Recharts. This is a premium user interface for orchestrating the perfect journey with intelligent itinerary generation, real-time flight tracking, and comprehensive destination insights.

## Features Built (Phase 1-3 Complete)

### Phase 1: Design System & Landing Page ✅
- **Futuristic Dark Theme**: Neon blue (#00d9ff) primary color with aurora purple accents
- **Glassmorphism Design**: Semi-transparent, blurred glass cards with gradient overlays
- **3D Globe Component**: Rotating interactive globe using Three.js with custom textures
- **Responsive Hero Section**: Full-screen landing with gradient backgrounds and animated elements
- **Custom Design Tokens**: Complete color system with semantic tokens in globals.css

### Phase 2: Interactive Dashboard Pages ✅

**8 Integrated Dashboards:**

1. **🗺️ Map Dashboard** - Flight distribution, distance analytics, popular destinations visualization
2. **✈️ Flights Dashboard** - Price trends, available flight options, booking details, best value analysis
3. **📅 Timeline Dashboard** - Day-by-day itinerary with time-based activities and visual timeline
4. **💰 Budget Dashboard** - Budget breakdown by category, daily expenses vs budget, spending analysis
5. **🌤️ Weather Dashboard** - Current conditions, temperature forecasts, hourly predictions, packing tips
6. **🍽️ Food Dashboard** - Restaurant recommendations, local dish guides, dietary information, meal schedules
7. **🎒 Packing Dashboard** - Interactive packing checklist, AI-suggested items, category organization
8. **📋 Visa Dashboard** - Visa requirements, document checklist, rules & regulations, emergency contacts

### Phase 3: AI JARVIS Chat Interface ✅
- **Conversational AI Assistant**: Context-aware travel planning assistant
- **Suggested Questions**: Quick-access buttons for common travel questions
- **Real-time Responses**: Mock responses with typing indicators (ready for LangGraph integration)
- **Message History**: Full conversation tracking with timestamps
- **Responsive Design**: Mobile-friendly chat interface with glassmorphism styling

### Phase 4: Analytics & Insights ✅
- **Travel Experience Analytics**: Satisfaction tracking over time
- **Carbon Footprint Analysis**: Environmental impact visualization
- **Personality Match Radar**: Destination suitability scoring
- **Risk Assessment**: Travel risk factors with color-coded severity
- **AI Recommendations**: Personalized suggestions based on data

## Architecture

```
frontend/
├── app/
│   ├── api/chat/route.ts          # Chat API endpoint
│   ├── chat/page.tsx               # JARVIS AI Chat page
│   ├── dashboard/page.tsx           # Main dashboard
│   ├── insights/page.tsx            # Analytics & insights
│   ├── page.tsx                     # Landing page
│   ├── layout.tsx                   # Root layout
│   └── globals.css                  # Design system & theme
├── components/
│   ├── 3d/
│   │   └── Globe.tsx                # 3D rotating globe (Three.js)
│   ├── dashboard/
│   │   ├── DashboardCard.tsx        # Reusable card component
│   │   ├── Map.tsx                  # Map/destinations dashboard
│   │   ├── Flights.tsx              # Flights dashboard
│   │   ├── Timeline.tsx             # Itinerary timeline
│   │   ├── Budget.tsx               # Budget planning
│   │   ├── Weather.tsx              # Weather dashboard
│   │   ├── Food.tsx                 # Restaurant guide
│   │   ├── Packing.tsx              # Packing checklist
│   │   └── Visa.tsx                 # Visa information
│   └── shared/
│       ├── Header.tsx               # Navigation header
│       ├── Hero.tsx                 # Landing hero section
│       └── Features.tsx             # Feature showcase section
└── package.json
```

## Design System

### Color Palette
- **Primary**: #00d9ff (Neon Cyan/Blue)
- **Accent**: #7c3aed (Aurora Purple)
- **Background**: #0a0e27 (Deep Navy)
- **Text**: #e0e8ff (Light Blue-Gray)
- **Success**: #10b981 (Emerald)
- **Warning**: #f59e0b (Amber)
- **Danger**: #ef4444 (Red)

### Typography
- **Fonts**: Geist Sans (body), Geist Mono (code)
- **Font Family**: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto

### Components
- **Glass Cards**: `glass` class with backdrop blur and semi-transparent backgrounds
- **Glow Effects**: `glow-primary`, `glow-accent` for neon glow shadows
- **Responsive Grid**: Flexbox-first layouts with Tailwind responsive prefixes
- **Animations**: Fade-in, pulse, and bounce animations in CSS

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Charts**: Recharts for data visualization
- **3D Graphics**: Three.js with Three Fiber
- **AI Integration**: Vercel AI SDK (prepared for streaming)
- **Animations**: Framer Motion (prepared), CSS animations

## Getting Started

### Installation
```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Pages
- `/` - Landing page with 3D globe
- `/dashboard` - 8-tab dashboard system
- `/chat` - JARVIS AI assistant
- `/insights` - Analytics & insights
- `/api/chat` - Chat API endpoint

## Key Components

### Globe Component
3D rotating globe using Three.js with custom canvas-based texture:
```tsx
import { Globe } from '@/components/3d/Globe';
<Globe />
```

### Dashboard
Multi-tab dashboard with real-time switching:
```tsx
<div className="mb-8 glass rounded-xl border border-border p-2">
  <button onClick={() => setActiveTab('map')}>🗺️ Map</button>
  {/* Other tabs */}
</div>
```

### Charts
Recharts visualizations with custom styling:
```tsx
<ResponsiveContainer width="100%" height={300}>
  <BarChart data={data}>
    <Bar dataKey="value" fill="#00d9ff" radius={[8, 8, 0, 0]} />
  </BarChart>
</ResponsiveContainer>
```

## Next Steps (Phases 5-7)

### Phase 5: Travel Memory & Insights System
- Photo gallery with location tagging
- Travel memories & journal entries
- Experience ratings & reviews
- Trip statistics & achievements

### Phase 6: Advanced Features
- Risk score calculation
- Carbon footprint calculator
- Personality analysis
- Smart recommendations engine
- Expense tracking & analytics

### Phase 7: Bonus Features
- Voice mode for hands-free interaction
- AR preview of attractions
- Gamification (badges, points, leaderboards)
- Download itinerary as PDF/PNG
- Integration with travel bookings
- Real-time flight price alerts

## API Integration

The chat API is prepared to connect to the Python LangGraph backend:

```typescript
// app/api/chat/route.ts
export async function POST(request: NextRequest) {
  const { message, conversationHistory } = await request.json();
  
  // TODO: Connect to Python LangGraph backend
  // const response = await fetch(process.env.LANGGRAPH_ENDPOINT, {
  //   method: 'POST',
  //   body: JSON.stringify({ message, conversationHistory })
  // });
  
  return NextResponse.json({ message: response });
}
```

## Performance Optimizations

- **Code Splitting**: Lazy loading of dashboard components
- **Image Optimization**: Optimized globe texture with canvas rendering
- **CSS-in-JS**: Tailwind CSS for minimal runtime overhead
- **React Compiler**: Enabled for automatic optimization (Next.js 16)
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

Deploy to Vercel with a single click:

```bash
vercel deploy
```

Or use GitHub integration for automatic deployments.

## Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
# Additional variables as needed
```

## Contributing

1. Follow the existing component structure
2. Use Tailwind CSS for styling (no inline styles)
3. Maintain the design system color palette
4. Test responsive design on mobile
5. Add proper TypeScript types

## License

© 2024 NEXUS Travel OS. All rights reserved.

---

Built with ❤️ by v0 for the AI Travel Planner project. This frontend is designed to seamlessly integrate with the Python LangGraph backend for intelligent travel planning.
