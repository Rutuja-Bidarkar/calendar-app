# Cinematic Parallax Wall Calendar

A premium, high-fidelity wall calendar experience built with **Next.js**, **Framer Motion**, and **CSS Scroll Snapping**. This project transforms a utility tool into an immersive storytelling journey through the seasons.

## 🌟 Key Features

### 🌀 Cinematic Vortex Transitions
- **Digital Portal**: Experience a high-contrast fractal vortex transition on initial load and during month swaps.
- **Theme-Synced**: The transition glow and intensity adapt dynamically to the month's specific color palette.

### 💎 Glassmorphism UI
- **Translucent Aesthetic**: The calendar card uses a sophisticated glass effect with 25px background blur, allowing high-resolution Pexels photography to shine through.
- **Dynamic Contrast**: Automatically detects background luminance to flip between light and dark text themes for perfect legibility.

### 📅 Advanced Interactivity
- **Scroll-Stacked Navigation**: Native-feeling vertical scroll snapping that locks perfectly to each month.
- **Jump Selectors**: Click the Month or Year titles to open a 3x4 grid for instant navigation across decades.
- **Range Selection**: Intuitive click-and-drag-style range selection with soft theme-consistent highlighting.

### 📝 Integrated Notes & Festivals
- **Local Persistence**: Notes are saved to `localStorage`, surviving browser refreshes.
- **Cultural Sync**: Pre-integrated with Indian and Global festivals (Diwali, Holi, Christmas, etc.) displayed directly on the date tiles.

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Animation**: Framer Motion (for vortex, modals, and grid reveals)
- **Styling**: Vanilla CSS Modules (for precise 3D perspective and glass controls)
- **Icons**: Lucide React
- **Photography**: Sourced dynamically from Pexels.com

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Rutuja-Bidarkar/calendar-app.git
   cd calendar-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **View the project**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Design Choices

1. **Single-Screen Immersive View**: The app is locked to the viewport to maintain a cinematic feel, avoiding traditional webpage vertical scrolling.
2. **HSL Color-Mix**: Used modern CSS `color-mix` to derive range highlights and tile backgrounds from a single extracted accent color, ensuring 100% theme consistency.
3. **Geometric Windowing**: Only the active, previous, and next months are rendered at any time. This preserves a "scroll-snap" height while keeping the DOM lean for 60fps animations.

---
Developed as a premium UI concept for an interactive storytelling calendar.
