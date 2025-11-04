# Talent & Development Hub

A modern Talent & Development Hub web application with Buddy pairing and Mentorship modules, built with React + TypeScript + Vite + Tailwind CSS, featuring a Nubank-style UI.

## Features

### Buddy Module
- **New Joiner View** (`#/buddy/new-joiner`): 
  - Welcome dashboard for new joiners
  - Buddy profile and allocation explanation
  - 90-day journey timeline with progress tracking
  - Feedback form (unlocks at 80%+ completion)
  
- **Buddy View** (`#/buddy/buddy`):
  - Dashboard for buddies supporting new joiners
  - Capacity management
  - Journey tracking for assigned new joiners
  - Buddy-specific journey items and feedback

### Mentorship Module
- **Mentee View** (`#/mentorship/mentee`):
  - Mentorship snapshot and mentor information
  - Goals & ambitions management
  - Mentorship journey timeline
  - Action plan tracking
  - Rotation & next steps suggestions
  - End-of-cycle feedback
  
- **Mentor View** (`#/mentorship/mentor`):
  - Mentor dashboard with capacity management
  - Mentee overview and detailed profiles
  - Journey tracking and action plan management
  - End-of-cycle recommendations
  - Mentor feedback

## Tech Stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS 3** for styling
- **Zustand** for state management
- **lucide-react** for icons
- Hash-based routing

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Shared components
│   ├── ActionPlanTable.tsx
│   ├── FeedbackForm.tsx
│   ├── JourneyItemCard.tsx
│   ├── JourneyTimeline.tsx
│   ├── MatchingExplanationCard.tsx
│   ├── Navigation.tsx
│   └── ProfileCard.tsx
├── lib/                # Matching engines
│   ├── buddyMatching.ts
│   └── mentorshipMatching.ts
├── mock/               # Mock data
│   ├── buddyData.ts
│   └── mentorshipData.ts
├── pages/              # Page components
│   ├── BuddyBuddyPage.tsx
│   ├── BuddyNewJoinerPage.tsx
│   ├── MentorshipMenteePage.tsx
│   └── MentorshipMentorPage.tsx
├── store/              # Zustand store
│   └── useStore.ts
└── types/              # TypeScript types
    └── index.ts
```

## Mock Data

The application uses mock data with the following examples:

- **New Joiner**: Lucas Moda (paired with Thiago Fontes)
- **Buddy**: Thiago Fontes, José Luciano
- **Mentee**: Ariel Fontes (mentored by Henrique Lopes)
- **Mentor**: Henrique Lopes, Emilio Gonzalez

## Navigation

- `#/buddy/new-joiner` - New Joiner view
- `#/buddy/buddy` - Buddy view
- `#/mentorship/mentee` - Mentee view
- `#/mentorship/mentor` - Mentor view

## Design

- **Primary Color**: #820AD1 (Nubank purple)
- **UI Style**: Clean, modern dashboard with rounded cards, soft shadows, and subtle gradients
- **Responsive**: Desktop-first design with mobile support

## Deployment

The app is automatically deployed to GitHub Pages via GitHub Actions. After pushing to the `main` branch, the workflow will:

1. Build the application
2. Deploy to GitHub Pages

The app will be available at: `https://arielfontes98.github.io/Mentorship-and-Buddy/`

### Manual Deployment

If you need to deploy manually:

```bash
npm run build
# Then use GitHub CLI or upload dist/ folder to GitHub Pages
```

## License

MIT
