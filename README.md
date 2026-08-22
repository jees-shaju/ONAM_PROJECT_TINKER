# 👑 MAVELI — FIND MY NEXT MEMORY
> *"One day. A thousand possibilities."*

[![Onam Hackathon 2026](https://img.shields.io/badge/Onam%20Hackathon-Track%2002-gold?style=for-the-badge&logo=kerala)](https://github.com)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-purple?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-teal?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer--Motion-11-pink?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

---

## 📌 Problem Statement

King Mahabali (Maveli) returns to Kerala after 364 days, but he has **only 12 hours (1 day)** before he must return. Everyone wants Maveli at their celebration—his inbox is overflowing with verified and unverified invitations, messages, and directions.

The core challenge: **"How can Maveli decide what is actually worth experiencing in the limited time he has?"**

---

## 💡 The Solution

**MAVELI** is a smart, personalized companion web application that helps King Maveli curate, optimize, and navigate his one-day return to Kerala.

### 🌟 Core Philosophy:
- **PEOPLE** > PLACES
- **EXPERIENCES** > ITINERARIES
- **MEMORIES** > DESTINATIONS

---

## ✨ Key Features

1. 🌼 **"While You Were Away" Interactive Welcome**:
   A 10–15 second onboarding story sequence introducing Maveli to what changed in Kerala over 364 days (*Onam Traditions, Young Kerala Tech, Modern Innovations, Street Art, Community Harmony*).

2. 👑 **Expressive Royal Maveli Companion**:
   A custom animated Mahabali character featuring realistic royal Kerala attire, crown, gold ornaments, traditional moustache, and reactive expressions (`happy`, `curious`, `surprised`, `thoughtful`, `amused`, `nostalgic`).

3. 🔮 **"FIND MY NEXT MEMORY" Smart Recommender**:
   Multi-factor recommendation engine balancing user interests, current location, remaining day time, and category diversity to present ONE prime experience with explicit rationale.

4. 🗺️ **"Dora-the-Explorer" Style Animated Kerala Map**:
   A custom SVG Kerala map featuring step-by-step path drawing, a bouncing Maveli explorer avatar, and pulsing **"ON THE WAY"** unexpected discoveries (*vibrating Chenda 🥁, steaming Sadya 🍛, floating music 🎵, moving game pieces 🎲*).

5. 📋 **"Organise My Day" Itinerary Optimizer**:
   Greedy nearest-neighbor sorting algorithm that re-orders scheduled activities based on geographical coordinate proximity to eliminate backtrack travel time.

6. 🌸 **Dynamic Floral Pookalam Memory Carpet**:
   Every completed experience blooms a unique colorful flower petal ring on Maveli's interactive circular Pookalam. Clicking petals unlocks comparative *364 Days Ago vs Today* historical insights.

7. 🏆 **Final Day Celebration**:
   End-of-day summary where Maveli's traveled path transforms into a glowing, blooming Pookalam carpet with full journey statistics.

8. 🔊 **Onam Sound FX Synthesizer**:
   Native Web Audio API sound generator producing Onam chimes, Chenda drum beats, and fanfare celebrations with zero external audio assets.

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 + Vite
- **Styling**: Tailwind CSS + Custom Onam Visual Palette (`#062C1E` Emerald, `#FFFDF5` Cream, `#FFD700` Royal Gold, `#C85A32` Terracotta)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Audio & FX**: Web Audio API Synthesizer
- **Memory Backend**: Express API with a file-backed JSON vault

---

## 🚀 Quick Start Guide

### Prerequisites
Make sure you have Node.js (v18+) installed.

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/maveli-find-my-next-memory.git
   cd maveli-find-my-next-memory
   ```

2. **Install dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start the frontend and memory backend together**:
   ```bash
   npm run dev:full
   ```

4. **Open in browser**:
   Navigate to `http://localhost:5173/`

   Memories are stored by the API in `server/memories.json`. Completing an experience or detour adds it automatically; deleting a memory or resetting the vault removes it from the backend too.

   To run the services separately, use `npm run server` and `npm run dev` in two terminals.

5. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📸 Demo Flow for Hackathon Judges

1. **Welcome Screen**: Experience the "While You Were Away" 364-day recap sequence.
2. **Personalize**: Select custom interests (*Food, People, Modern Kerala, Nature*).
3. **Find Memory**: Click **`[ ✨ FIND MY NEXT MEMORY ]`** to activate the 3-step scanner.
4. **Animated Map**: Click **`[ TAKE ME THERE ]`** and hit **`[ START JOURNEY ]`** to watch Maveli travel along the glowing Kerala trail.
5. **Detour Discovery**: Intercept an **"ON THE WAY"** surprise encounter (e.g., *Onam Kali street game*), choose an action, and save the detour memory.
6. **Complete Experience**: Reach destination, interact with the story choices, and unlock a flower petal for your Pookalam!
7. **Optimize Day**: Visit `/my-day` and click **`[ OPTIMISE MY DAY ]`** to reorder activities by location proximity.

---

## 📜 License

Distributed under the MIT License. Created with ❤️ for Onam Mini-Hackathon 2026.
