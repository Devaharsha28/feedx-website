# FeedX Portal - Anonymous Student Feedback System

A modern, responsive web application for anonymous student feedback with AI-powered chatbot integration.

## Features

- **Anonymous Feedback Submission**: Secure, anonymous feedback system
- **AI-Powered FX Bot**: WhatsApp chatbot for instant responses
- **Real-time Issue Tracking**: Track feedback status with unique IDs
- **Responsive Design**: Works seamlessly on all devices
- **User Authentication**: Secure sign-in and registration system
- **Smooth Animations**: Engaging UI with custom animations

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Node.js, Express, JWT Authentication
- **Database**: File-based JSON storage (easily replaceable with SQLite/PostgreSQL)
- **Build Tool**: Vite
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd feedx-nexus
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
npm run server
```

4. In another terminal, start the frontend:
```bash
npm run dev
```

5. For full development (both frontend and backend):
```bash
npm run dev:full
```

The application will be available at `http://localhost:8080` and the API at `http://localhost:3001`.

## Available Scripts

- `npm run dev` - Start frontend development server
- `npm run server` - Start backend API server
- `npm run dev:full` - Start both frontend and backend concurrently
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure

```
feedx-nexus/
├── server/                 # Backend API
│   └── index.js           # Express server with auth routes
├── src/
│   ├── components/        # Reusable UI components
│   ├── contexts/          # React contexts (Auth)
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page components
│   ├── assets/            # Static assets
│   └── lib/               # Utility functions
├── public/                # Public assets
└── package.json
```

## API Endpoints

- `POST /api/register` - User registration
- `POST /api/login` - User login
- `GET /api/profile` - Get user profile (authenticated)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
