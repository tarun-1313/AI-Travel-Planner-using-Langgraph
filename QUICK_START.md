# NEXUS Travel OS - Quick Start Guide

## What You Get

A complete, production-ready AI Travel Planning Operating System with:
- **Futuristic Dark UI** with neon blue accents and glassmorphism
- **8 Interactive Dashboards** for every aspect of travel planning
- **AI Chat Interface** (JARVIS) ready for LangGraph integration
- **Analytics Dashboard** with risk assessment and recommendations
- **3D Rotating Globe** in the hero section

## Getting Started (5 Minutes)

### 1. Start the Dev Server
```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) - You should see the landing page with the 3D globe.

### 2. Explore the Features

**Landing Page** (`/`)
- View the rotating 3D globe
- See "System Online • Ready for Mission" badge
- Click "Start Your Journey" to go to dashboard

**Dashboard** (`/dashboard`)
- Click tabs to switch between 8 dashboards:
  - 🗺️ Map - Destination analytics
  - ✈️ Flights - Flight booking interface
  - 📅 Timeline - Day-by-day itinerary
  - 💰 Budget - Spending breakdown
  - 🌤️ Weather - Forecasts & packing tips
  - 🍽️ Food - Restaurant recommendations
  - 🎒 Packing - Interactive checklist
  - 📋 Visa - Requirements & documents

**JARVIS Chat** (`/chat`)
- Click suggested questions or type your own
- See AI responses appear with typing indicator
- Full chat history maintained

**Insights** (`/insights`)
- View travel analytics with 4 key metrics
- See trip satisfaction over time
- Check personality match to destination
- Review risk assessment
- Explore carbon footprint analysis

### 3. Customize the Design

Edit `/frontend/app/globals.css`:

```css
:root {
  /* Change primary color */
  --primary: #00d9ff;      /* Neon Cyan */
  --primary-light: #33e8ff;
  
  /* Change accent color */
  --accent: #7c3aed;       /* Aurora Purple */
  
  /* Change background */
  --background: #0a0e27;   /* Deep Navy */
}
```

### 4. Modify Data

All data is currently mocked. To use real data:

**Flights Dashboard** (`/frontend/components/dashboard/Flights.tsx`)
```typescript
const flightOptions = [
  { id: 1, airline: 'Your Airline', ... }
  // Replace with API call
];
```

**Weather Dashboard** (`/frontend/components/dashboard/Weather.tsx`)
```typescript
// Replace with weather API
const weatherData = [
  { day: 'Dec 15', temp: 52, ... }
];
```

## File Structure

```
frontend/
├── app/
│   ├── page.tsx              # Landing page
│   ├── dashboard/page.tsx    # Dashboard with 8 tabs
│   ├── chat/page.tsx         # JARVIS chat
│   ├── insights/page.tsx     # Analytics
│   ├── api/
│   │   └── chat/route.ts     # Chat API endpoint
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Design system
│
├── components/
│   ├── 3d/
│   │   └── Globe.tsx         # 3D rotating globe
│   ├── dashboard/
│   │   ├── Map.tsx
│   │   ├── Flights.tsx
│   │   ├── Timeline.tsx
│   │   ├── Budget.tsx
│   │   ├── Weather.tsx
│   │   ├── Food.tsx
│   │   ├── Packing.tsx
│   │   ├── Visa.tsx
│   │   └── DashboardCard.tsx
│   └── shared/
│       ├── Header.tsx        # Navigation
│       ├── Hero.tsx          # Landing section
│       └── Features.tsx      # Feature showcase
```

## Common Tasks

### Change Brand Name
1. Edit `/frontend/components/shared/Header.tsx`:
   ```jsx
   <h1 className="text-xl font-bold text-foreground">
     <span className="text-primary">YOUR_NAME</span>
   </h1>
   ```

### Add New Tab to Dashboard
1. Create new component in `/frontend/components/dashboard/`
2. Import in `/frontend/app/dashboard/page.tsx`
3. Add to `tabs` array:
   ```typescript
   const tabs = [
     { id: 'newpage', label: '📍 Your Tab', component: YourComponent },
     // ...
   ];
   ```

### Connect to Backend
Update `/frontend/app/api/chat/route.ts`:
```typescript
export async function POST(request: NextRequest) {
  const { message, conversationHistory } = await request.json();

  // Connect to Python backend
  const response = await fetch(process.env.LANGGRAPH_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({ message, conversationHistory })
  });

  const data = await response.json();
  return NextResponse.json(data);
}
```

### Add New Chart
Use Recharts in dashboard components:
```typescript
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

<ResponsiveContainer width="100%" height={300}>
  <BarChart data={data}>
    <CartesianGrid stroke="#1e293b" />
    <XAxis dataKey="name" />
    <YAxis />
    <Bar dataKey="value" fill="#00d9ff" />
  </BarChart>
</ResponsiveContainer>
```

## Styling Guide

### Use Design Tokens
```jsx
// Good - Uses design tokens
<div className="bg-background text-foreground border border-border">

// Bad - Uses hardcoded colors
<div className="bg-[#0a0e27] text-white border border-gray-700">
```

### Glassmorphism Cards
```jsx
<div className="glass p-6 rounded-xl border border-border">
  {/* Content */}
</div>
```

### Glow Effects
```jsx
<div className="glow-primary">
  {/* Glowing shadow */}
</div>

<span className="text-primary glow-text-primary">
  Glowing text
</span>
```

### Responsive Classes
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Mobile: 1 column, Tablet: 2, Desktop: 4 */}
</div>
```

## Performance Tips

1. **Images**: Optimize with `next/image`
2. **Charts**: Use dynamic imports for heavy components
3. **API Calls**: Cache with SWR when possible
4. **CSS**: Tailwind purges unused classes automatically
5. **Fonts**: Using system fonts (Geist) - already optimized

## Deployment

### Deploy to Vercel (1 click)
```bash
cd frontend
vercel deploy
```

### Deploy to Other Hosting
```bash
npm run build
npm start
```

Requires Node.js 18+

## Troubleshooting

### Globe Not Showing
- Check browser console for errors
- Ensure Three.js is installed: `npm list three`
- Verify GPU acceleration is enabled

### Charts Not Rendering
- Check data format matches Recharts requirements
- Verify ResponsiveContainer has parent with width
- Clear browser cache

### Styling Issues
- Run `npm run build` to rebuild Tailwind CSS
- Check CSS custom properties in `globals.css`
- Verify Tailwind config is correct

## Next Steps

1. **Integrate Backend**: Connect `/api/chat` to Python LangGraph
2. **Add Real Data**: Replace mock data with API calls
3. **User Auth**: Add authentication (e.g., NextAuth.js)
4. **Database**: Store user trips and preferences
5. **Real Flights**: Integrate flight booking APIs

## Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Recharts**: https://recharts.org
- **Three.js**: https://threejs.org/docs
- **React Docs**: https://react.dev

## Support

- Check `/FRONTEND_README.md` for detailed documentation
- Review component code for implementation examples
- See `globals.css` for design system reference

---

**Ready to build?** Start with Phase 5: Travel Memory System or integrate your Python backend!

**Current Status**: Phases 1-4 Complete (Landing, Dashboards, Chat, Analytics)
**Next Phases**: Phase 5 (Memory), Phase 6 (Advanced), Phase 7 (Bonus)
