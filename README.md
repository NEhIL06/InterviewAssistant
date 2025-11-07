# Interview Assistant

A comprehensive AI-powered interview management system that automates the interview process for candidates and provides interviewers with tools to manage and evaluate candidates efficiently.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

Interview Assistant is a full-stack application that streamlines the interview process by:

- **For Candidates**: Register, upload resumes, and take AI-powered interviews
- **For Interviewers**: Sign in, view candidate profiles, manage interviews, and review AI-generated evaluations

The system uses Google's Gemini AI to generate interview questions based on candidate resumes and automatically score answers.

## ✨ Features

### Candidate Features
- 📝 Easy registration with personal information
- 📄 Resume upload and parsing (PDF support)
- 🤖 AI-generated interview questions tailored to resume
- ⏱️ Timed interview sessions
- 📊 Real-time answer submission and scoring

### Interviewer Features
- 🔐 Secure authentication (JWT-based)
- 📋 Dashboard to view all candidates
- 👤 Detailed candidate profiles
- 📈 Interview results and scoring breakdowns
- 📝 AI-generated performance summaries

### Technical Features
- 🎨 Modern React UI with shadcn/ui components
- 🔒 Protected routes for authenticated users
- 🚀 RESTful API with Express.js
- 🗄️ MongoDB for data persistence
- 🤖 Google Gemini AI integration
- ✅ Comprehensive unit testing

## 📁 Project Structure

```
InterviewAssistant/
├── ai-interviewer-ace/     # Frontend React application
├── backend/                 # Backend Express.js API
└── unitTest/               # Unit and integration tests
```

For detailed information about each folder, see:
- [Frontend README](./ai-interviewer-ace/README.md)
- [Backend README](./backend/README.md)
- [Unit Tests README](./unitTest/README.md)

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and caching
- **Zustand** - State management
- **shadcn/ui** - UI component library
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **PDF.js** - PDF parsing

### Backend
- **Node.js** with TypeScript
- **Express.js** - Web framework
- **MongoDB** with Mongoose - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Google Gemini AI** - AI question generation and scoring
- **Zod** - Schema validation

### Testing
- **Jest** - Testing framework
- **Supertest** - API testing
- **MongoDB Memory Server** - In-memory database for tests

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **bun** package manager
- **MongoDB** (local or cloud instance)
- **Google Gemini API Key** (optional, system works with mocks if not provided)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd InterviewAssistant
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd ai-interviewer-ace
   npm install
   # or
   bun install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Install Test Dependencies**
   ```bash
   cd ../unitTest
   npm install
   ```

## 🔧 Environment Setup

### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/interview
JWT_SECRET=your-secret-key-here
GEMINI_KEY=your-gemini-api-key-here
NODE_ENV=development
```

### Frontend Environment Variables

Create a `.env` file in the `ai-interviewer-ace/` directory (if needed):

```env
VITE_API_URL=http://localhost:3000/api
```

## ▶️ Running the Application

### Development Mode

1. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

2. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Backend will run on `http://localhost:3000`

3. **Start Frontend Development Server**
   ```bash
   cd ai-interviewer-ace
   npm run dev
   ```
   Frontend will run on `http://localhost:8080`

### Production Build

1. **Build Backend**
   ```bash
   cd backend
   npm run build
   npm start
   ```

2. **Build Frontend**
   ```bash
   cd ai-interviewer-ace
   npm run build
   npm run preview
   ```

## 📚 API Documentation

### Base URL
- Development: `http://localhost:3000/api`
- Production: `https://your-backend-url.com/api`

### Main Endpoints

#### Authentication
- `POST /api/auth/signup` - Register interviewer
- `POST /api/auth/signin` - Login interviewer

#### Candidate
- `POST /api/candidate/upload` - Upload candidate information

#### Interviewer
- `GET /api/interviewer/candidates` - List all candidates (protected)
- `GET /api/interviewer/candidate/:id` - Get candidate details (protected)

#### Interview
- `POST /api/interview/start` - Start interview session
- `POST /api/interview/answer` - Submit answer for scoring
- `POST /api/interview/finish` - Finish interview and get summary

For detailed API documentation, see [Backend README](./backend/README.md).

## 🧪 Testing

Run the test suite:

```bash
cd unitTest
npm test
```

The tests cover:
- Authentication endpoints
- Candidate management
- Interviewer routes
- Interview flow (start, answer, finish)

For more details, see [Unit Tests README](./unitTest/README.md).

## 🚢 Deployment

### Backend Deployment

1. Set environment variables on your hosting platform
2. Build the TypeScript code: `npm run build`
3. Start the server: `npm start`

### Frontend Deployment

1. Build the production bundle: `npm run build`
2. Deploy the `dist/` folder to your hosting service (Vercel, Netlify, etc.)
3. Update API URLs in environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👥 Author

**Nehil Chandrakar**

## 📞 Support

For issues and questions, please open an issue in the repository.

---

**Note**: Make sure to set up your MongoDB connection and Google Gemini API key before running the application. The system will work with mock data if the Gemini API key is not provided.

