# Design System & Visual Guidelines

## Aesthetics & Principles
CareerDiscover AI uses a high-contrast dark theme optimized for technical professionals and recruiters. The UI emphasizes clarity, real-time feedback, interactive score indicators, and clean typography.

## Color Palette
- **Primary Accent**: `#6366F1` (Indigo / Electric Blue)
- **Secondary Accent**: `#10B981` (Emerald Green for high ATS matches)
- **Warning / Missing**: `#F59E0B` (Amber for missing keywords)
- **Background Slate**: `#0F172A` (Dark Slate 900)
- **Card Container**: `#1E293B` (Slate 800)
- **Text Main**: `#F8FAFC` (Slate 50)
- **Text Muted**: `#94A3B8` (Slate 400)

## Typography
- **Primary Font**: `Inter`, sans-serif
- **Code / Metrics Font**: `Fira Code` / `JetBrains Mono`

## UI Component Tokens
- **Border Radius**: `12px` (`rounded-xl`)
- **Card Borders**: `1px solid rgba(255, 255, 255, 0.1)`
- **Button Padding**: `px-4 py-2.5 rounded-lg font-medium transition-all`
- **Hover Micro-Animations**: Scale `1.02x` on interactive cards and buttons.

## UX State Requirements
- **Loading States**: Animated pulse skeletons during multi-agent AI execution.
- **Empty States**: Clear illustration and instructions when no profile or JD is entered.
- **Error States**: Toast notification and fallbacks if API keys are missing or invalid.
- **Responsive Layout**: Fluid flex/grid adapting from desktop (1440px) to tablet (768px) and mobile (375px).
