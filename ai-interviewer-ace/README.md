# AI Interviewer ACE - Frontend Application

A modern, responsive React application built with TypeScript, Vite, and shadcn/ui components for managing AI-powered interviews.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Configuration](#configuration)
- [Components](#components)
- [Pages](#pages)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Styling](#styling)
- [Build & Deployment](#build--deployment)

## 🎯 Overview

This is the frontend application for the Interview Assistant system. It provides a user-friendly interface for both candidates and interviewers to interact with the AI-powered interview platform.

## ✨ Features

### User Interface
- 🎨 Modern, responsive design with Tailwind CSS
- 🧩 Reusable UI components from shadcn/ui
- 🌙 Theme support (light/dark mode ready)
- 📱 Mobile-responsive layout
- ⚡ Fast page loads with Vite
- 🎭 Smooth animations with Framer Motion

### Candidate Features
- 📝 Registration form with validation
- 📄 Resume upload (PDF support)
- 🤖 AI-generated interview questions
- ⏱️ Timer component for interview sessions
- 📝 Answer submission interface
- 📊 Real-time feedback

### Interviewer Features
- 🔐 Secure sign-in page
- 📋 Dashboard with candidate list
- 👤 Detailed candidate profile view
- 📈 Interview results visualization
- 🔒 Protected routes with authentication

## 🛠️ Technology Stack

### Core
- **React 18.3.1** - UI library
- **TypeScript 5.8.3** - Type safety
- **Vite 5.4.19** - Build tool and dev server

### Routing & State
- **React Router DOM 6.30.1** - Client-side routing
- **Zustand 5.0.8** - State management
- **TanStack Query 5.83.0** - Server state management

### UI Components
- **shadcn/ui** - Component library built on Radix UI
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **Framer Motion** - Animation library

### Forms & Validation
- **React Hook Form 7.61.1** - Form handling
- **Zod 3.25.76** - Schema validation
- **@hookform/resolvers** - Form validation resolvers

### Utilities
- **Axios 1.12.2** - HTTP client
- **PDF.js 5.4.296** - PDF parsing
- **date-fns 3.6.0** - Date utilities
- **clsx & tailwind-merge** - Conditional styling

### Styling
- **Tailwind CSS 3.4.17** - Utility-first CSS
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 📁 Project Structure

```
ai-interviewer-ace/
├── public/                 # Static assets
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── components/         # React components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── CandidateForm.tsx
│   │   ├── InterviewQuestionCard.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── Timer.tsx
│   ├── hooks/             # Custom React hooks
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── lib/               # Utility libraries
│   │   ├── api.ts        # API client
│   │   ├── auth.ts       # Authentication utilities
│   │   ├── pdfExtractor.ts  # PDF parsing
│   │   └── utils.ts      # General utilities
│   ├── pages/            # Page components
│   │   ├── Candidate/
│   │   │   ├── Interview.tsx
│   │   │   └── Register.tsx
│   │   ├── Interviewer/
│   │   │   ├── CandidateDetail.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   └── SignIn.tsx
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   ├── store/            # State management
│   │   └── useAuthStore.ts
│   ├── App.tsx           # Main app component
│   ├── App.css           # Global styles
│   ├── index.css         # Base styles
│   └── main.tsx          # Entry point
├── index.html            # HTML template
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
├── vite.config.ts        # Vite configuration
├── tailwind.config.ts    # Tailwind configuration
└── postcss.config.js     # PostCSS configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, or bun package manager

### Installation

1. **Navigate to the frontend directory**
   ```bash
   cd ai-interviewer-ace
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   bun run dev
   ```

   The app will be available at `http://localhost:8080`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## ⚙️ Configuration

### Vite Configuration

The app runs on port **8080** by default (configured in `vite.config.ts`).

### Path Aliases

- `@/` maps to `./src/` directory
- Example: `import { Button } from "@/components/ui/button"`

### Environment Variables

Create a `.env` file in the root of `ai-interviewer-ace/`:

```env
VITE_API_URL=http://localhost:3000/api
```

## 🧩 Components

### UI Components (`src/components/ui/`)

All shadcn/ui components are available:
- Button, Input, Textarea
- Card, Dialog, Sheet
- Form, Select, Checkbox
- Toast, Alert, Badge
- And many more...

### Custom Components

- **CandidateForm** - Registration form for candidates
- **InterviewQuestionCard** - Display interview questions
- **Navbar** - Navigation bar
- **ProtectedRoute** - Route guard for authenticated routes
- **Timer** - Countdown timer for interviews

## 📄 Pages

### Public Pages
- **Index** (`/`) - Landing page
- **Candidate Register** (`/candidate/register`) - Candidate registration
- **Candidate Interview** (`/candidate/interview/:candidateId`) - Interview session

### Protected Pages (Interviewer)
- **Sign In** (`/interviewer/signin`) - Interviewer login
- **Dashboard** (`/interviewer/dashboard`) - List of all candidates
- **Candidate Detail** (`/interviewer/candidate/:id`) - Detailed candidate view

### Error Pages
- **NotFound** (`*`) - 404 page

## 🔄 State Management

### Zustand Store

**Auth Store** (`src/store/useAuthStore.ts`)
- Manages authentication state
- Stores JWT token
- Provides login/logout functions

### TanStack Query

Used for server state management:
- Automatic caching
- Background refetching
- Optimistic updates

## 🌐 API Integration

API client is configured in `src/lib/api.ts`:
- Base URL configuration
- Request interceptors
- Error handling
- Token management

### API Endpoints Used

- `POST /api/candidate/upload` - Upload candidate
- `POST /api/auth/signin` - Interviewer login
- `GET /api/interviewer/candidates` - Get all candidates
- `GET /api/interviewer/candidate/:id` - Get candidate details
- `POST /api/interview/start` - Start interview
- `POST /api/interview/answer` - Submit answer
- `POST /api/interview/finish` - Finish interview

## 🎨 Styling

### Tailwind CSS

The project uses Tailwind CSS for styling:
- Utility-first approach
- Custom theme configuration
- Responsive design utilities
- Dark mode support (ready)

### Custom Styles

- `src/index.css` - Base styles and Tailwind directives
- `src/App.css` - App-specific styles

## 🏗️ Build & Deployment

### Production Build

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Deployment Options

1. **Vercel**
   - Connect your repository
   - Set build command: `npm run build`
   - Set output directory: `dist`

2. **Netlify**
   - Set build command: `npm run build`
   - Set publish directory: `dist`

3. **Static Hosting**
   - Upload the `dist/` folder to any static hosting service

### Environment Variables for Production

Make sure to set:
- `VITE_API_URL` - Your backend API URL

## 🔧 Development Tips

1. **Component Development**
   - Use shadcn/ui components as base
   - Follow the existing component patterns
   - Use TypeScript for type safety

2. **State Management**
   - Use Zustand for global state
   - Use TanStack Query for server state
   - Use React Hook Form for form state

3. **Styling**
   - Prefer Tailwind utility classes
   - Use CSS variables for theming
   - Keep custom CSS minimal

4. **API Calls**
   - Use the API client from `src/lib/api.ts`
   - Handle loading and error states
   - Use TanStack Query for data fetching

## 📝 Notes

- The app uses React Router for client-side routing
- Protected routes require authentication
- PDF parsing is handled client-side using PDF.js
- All API calls are made through the centralized API client

---

For backend API documentation, see [Backend README](../backend/README.md).

