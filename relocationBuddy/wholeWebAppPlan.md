Here is the comprehensive architectural blueprint for the **ShiftBuddy** Web Application.

I have applied the **"Antigravity" design philosophy** (inspired by modern Material 3 and fluid interfaces) to this specific use case. The goal is to make the heavy, stressful process of moving feel **weightless, fluid, and frictionless**.

-----

````markdown
# ShiftBuddy - Product Architecture & Design Blueprint
**Version:** 1.0.0 (MVP)
**Design Philosophy:** "Antigravity" (Weightless, Fluid, Floating UI)
**Tech Stack:** React 18, Vite, TypeScript, TailwindCSS, Framer Motion, Zustand, Supabase.

---

## 1. Design Language: "Antigravity"
Moving cities is stressful and "heavy." The UI must be the antidote: light, playful, and fluid.

### Core Visual Principles
1.  **Floating Surfaces:** Content doesn't sit on a flat background; it floats on distinct layers with soft, diffused shadows (`shadow-gravity`).
2.  **Fluid Transitions:** Nothing simply "appears." Elements slide, expand, and morph using physics-based springs (Framer Motion).
3.  **Rounded Aesthetics:** High border radius (`rounded-3xl`) to mimic organic, friendly shapes.
4.  **Glass & Air:** Heavy use of backdrop blur (`backdrop-blur-xl`) for overlays (Map views, Video calls) to maintain context.

### Color Palette (Tailwind Config)
We avoid harsh blacks. We use "Ink" and "Paper" tones.

```javascript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        paper: '#FAFAFA',       // Main Background (Off-white)
        surface: '#FFFFFF',     // Cards (Pure White)
        ink: {
          400: '#9CA3AF',       // Muted text
          900: '#111827',       // Primary text (Soft Black)
        },
        primary: {
          DEFAULT: '#6366F1',   // Indigo (Trust)
          soft: '#E0E7FF',      // Light Indigo background
        },
        accent: {
          DEFAULT: '#F43F5E',   // Rose (Call to Action/Alerts)
        }
      },
      boxShadow: {
        'gravity-sm': '0 4px 20px -5px rgba(0, 0, 0, 0.05)',
        'gravity-lg': '0 20px 50px -10px rgba(99, 102, 241, 0.15)', // Floating effect
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'], // Modern, geometric, friendly
      }
    }
  }
}
````

-----

## 2\. Directory Structure (Feature-First)

This structure is designed for production scalability. Code is co-located by feature, not by technical type.

```text
src/
├── app/                    # Global App Setup
│   ├── App.tsx             # Routing & Layouts
│   ├── providers.tsx       # Context Wrappers (Auth, Theme)
│   └── store.ts            # Global Zustand Store
├── assets/                 # SVGs, Lottie Animations, Fonts
├── components/             # SHARED Atomic UI (Antigravity System)
│   ├── layout/             # Navbar, Footer, Container
│   └── ui/                 # The Design System
│       ├── FluidCard.tsx   # Base floating component
│       ├── ElasticButton.tsx # Button with spring press effect
│       ├── GlassModal.tsx  # Blur overlay
│       └── AvatarOrb.tsx   # User profile circles
├── features/               # Domain Logic
│   ├── auth/               # Login/Signup/OTP
│   ├── search/             # City/Area Search Logic
│   │   ├── components/     # SearchBar, FilterChips
│   │   └── hooks/          # useCitySearch
│   ├── buddy-listing/      # The "Tinder-like" Feed
│   │   ├── components/     # BuddyCard, VideoPreview, BioSheet
│   │   └── utils/          # sort-by-rating.ts
│   ├── booking/            # The Checkout Flow
│   │   ├── components/     # DatePicker, PaymentEscrow
│   │   └── logic/          # escrow-service.ts
│   └── dashboard/          # The User/Buddy Mission Control
│       ├── components/     # ChatWidget, MilestoneTracker, LiveStreamPlayer
│       └── hooks/          # useMissionStatus
├── lib/                    # Utilities
│   ├── supabase.ts         # DB Connection
│   ├── maps.ts             # Google Maps/Mapbox helpers
│   └── cn.ts               # Tailwind class merger
└── styles/
    └── globals.css         # Reset & Animation Directives
```

-----

## 3\. Core UI Components (The "Antigravity" Feel)

### A. `FluidCard.tsx` (The building block)

Instead of a static border, it lifts up when interacted with.

```tsx
import { motion } from 'framer-motion';

export const FluidCard = ({ children, className }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={`bg-surface rounded-3xl shadow-gravity-sm hover:shadow-gravity-lg transition-shadow duration-300 p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
};
```

### B. `BuddyCard.tsx` (The "Vibe Check")

Logic: Hovers play a muted video intro (like YouTube previews).

```tsx
import { useState } from 'react';
import { FluidCard } from '@/components/ui/FluidCard';

export const BuddyCard = ({ buddy }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <FluidCard className="relative overflow-hidden group h-[400px]">
      {/* Background Image / Video Layer */}
      <div 
        className="absolute inset-0 bg-gray-200"
        onMouseEnter={() => setIsPlaying(true)}
        onMouseLeave={() => setIsPlaying(false)}
      >
        {isPlaying ? (
          <video src={buddy.introVideo} autoPlay muted loop className="object-cover w-full h-full" />
        ) : (
          <img src={buddy.photoUrl} className="object-cover w-full h-full" />
        )}
      </div>

      {/* Floating Info Glass (Bottom) */}
      <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-white">
        <h3 className="font-bold text-lg">{buddy.name}</h3>
        <p className="text-sm opacity-90">{buddy.college} • {buddy.languages.join(', ')}</p>
      </div>
    </FluidCard>
  );
};
```

-----

## 4\. Feature Logic & State Management

### A. The Search Store (`useSearchStore.ts`)

Handles the flow from "Where are you moving?" to "Here are your buddies."

```typescript
import { create } from 'zustand';

interface SearchState {
  city: string | null;
  locality: string | null;
  moveDate: Date | null;
  filters: {
    language: string[];
    gender: 'male' | 'female' | 'any';
  };
  actions: {
    setCity: (city: string) => void;
    setLocality: (loc: string) => void;
  };
}

export const useSearchStore = create<SearchState>((set) => ({
  city: null,
  locality: null,
  moveDate: null,
  filters: { language: [], gender: 'any' },
  actions: {
    setCity: (city) => set({ city }),
    setLocality: (locality) => set({ locality }),
  }
}));
```

### B. The Mission Dashboard Logic

Once booked, the app transforms into a project management tool.

**Milestone Logic:**

1.  **Stage 1 (Pending):** Waiting for Buddy to Accept.
2.  **Stage 2 (Scouting):** Buddy uploads 5 PDF links of properties.
3.  **Stage 3 (Tour):** "Join Live" button becomes active.
4.  **Stage 4 (Closing):** Escrow release trigger.

-----

## 5\. Key UX Flows (The "Happy Path")

### Flow 1: The "Search & Vibe" Experience

1.  **Landing:** Huge typography. "Where next?" Search bar floats in the center.
2.  **Transition:** User types "Bangalore". The background morphs to a blurred image of Bangalore streets.
3.  **Results:** A grid of `BuddyCards`. No list views. Visuals first.
4.  **Profile:** Clicking a card opens a **Side Sheet** (doesn't navigate away), keeping the context of the search results visible.

### Flow 2: The "Live Tour" (The Product USP)

1.  **Notification:** User gets a push/SMS: "Rahul is at the flat. Tour starting."
2.  **Interface:**
      * **Main View:** Live video feed from Buddy's phone (via Agora SDK).
      * **Overlay (Right):** "Inspection Checklist."
          * [ ] Check Water Pressure
          * [ ] Check Traffic Noise
          * [ ] Check 5G Signal
      * **Interaction:** User clicks "Check Water", a toast pops up on Buddy's screen: "Client wants to see the tap."

-----

## 6\. Technical Implementation Steps

### Step 1: Project Init

```bash
npm create vite@latest shiftbuddy -- --template react-ts
npm install tailwindcss framer-motion zustand @supabase/supabase-js lucide-react date-fns react-router-dom
```

### Step 2: Base Layout

Create `src/app/App.tsx`. Use a **Sticky Floating Navbar** (Glassmorphism) that stays at the top but shrinks on scroll.

### Step 3: The Map Integration

Use `react-map-gl` (Mapbox).

  * **Logic:** When a user hovers over a Buddy Card, the Map on the right highlights their specific "Service Zone" (Polygon). This proves they are truly "Hyper-local."

### Step 4: The Chat System

Implement Real-time chat using **Supabase Realtime**.

  * **UI:** WhatsApp style, but embedded in the Dashboard.
  * **Features:** "Smart Chips". If the user asks "Where is the gym?", the Buddy can click a chip to send a Google Maps Pin instantly.

-----

## 7\. Zero-to-One Prototype Goals (MVP)

For the first version, focus ONLY on:

1.  **Search:** City -\> Locality.
2.  **Listing:** Displaying dummy Buddy profiles with video support.
3.  **Booking:** A mock payment flow (Stripe Test mode).
4.  **Dashboard:** A simple view showing the "Milestones."

(Skip the actual Live Video integration for Week 1. Just use a "Link to WhatsApp Video Call" button for the MVP).

```
```