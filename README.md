# FeedX Polytechnic - Student Portal

A modern, professional website for FEEDX Polytechnic featuring glassmorphism design, attendance tracking, and student resources.

## Features

- **Attendance Viewer**: Fetch real-time attendance data from SBTET Telangana portal
- **AI-Powered FX Bot**: Interactive chatbot for student assistance
- **Resources Hub**: Access study materials, projects, and job opportunities
- **Updates & Events**: Stay informed about campus activities
- **Spotlight**: Showcase student achievements
- **Responsive Design**: Works seamlessly on all devices with mobile-first approach
- **Theme Toggle**: Light/Dark mode with smooth animations
- **Glassmorphism UI**: Modern design with animated floating lights

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: 
  - Node.js, Express (Main API)
  - Python Flask (SBTET Attendance API)
- **Build Tool**: Vite
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Python 3.8+ (for attendance API)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd feedx-nexus
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install Python dependencies for attendance API:
```bash
cd server
pip install -r requirements.txt
cd ..
```

4. Configure environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and set your API URL:
```
VITE_API_URL=http://localhost:5001
```

### Running the Application

#### Development Mode

1. Start the Python attendance API server:
```bash
cd server
python attendance_api.py
```
The API will run on `http://localhost:5001`

2. In another terminal, start the Node.js backend (if needed):
```bash
npm run server
```

3. In another terminal, start the frontend:
```bash
npm run dev
```

The application will be available at `http://localhost:8080`.

#### Production Mode

1. Build the frontend:
```bash
npm run build
```

2. Preview production build:
```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start frontend development server
- `npm run server` - Start Node.js backend API server
- `npm run build` - Build frontend for production
- `npm run preview` - Preview production build

## Backend APIs

### Attendance API (Python Flask)

**Base URL**: `http://localhost:5001`

#### Endpoints

- `GET /api/attendance?pin={PIN}` - Fetch attendance data from SBTET
  - Query Parameters:
    - `pin` (required): Student PIN (e.g., "24054-cps-024")
  - Returns: JSON with student info and daily attendance records
  
- `GET /health` - Health check endpoint

#### Example Usage

```bash
curl "http://localhost:5001/api/attendance?pin=24054-cps-024"
```

Response:
```json
{
  "success": true,
  "studentInfo": {
    "Name": "Student Name",
    "Pin": "24054-cps-024",
    "Semester": "4",
    "BranchCode": "CPS",
    "Percentage": "85.50",
    "NumberOfDaysPresent": "171",
    "WorkingDays": "200"
  },
  "attendanceRecords": [
    {
      "SNo": 1,
      "Date": "2024-01-15T00:00:00",
      "slotname": "Morning",
      "status": "P"
    }
  ]
}
```

## Project Structure

```
feedx-nexus/
├── server/                    # Backend APIs
│   ├── attendance_api.py     # Python Flask API for SBTET attendance
│   ├── requirements.txt      # Python dependencies
│   └── index.js              # Node.js Express server
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Navbar.tsx       # Navigation with theme toggle
│   │   ├── Footer.tsx       # Footer component
│   │   ├── GlassmorphismBackground.tsx  # Animated background
│   │   └── ui/              # Shadcn UI components
│   ├── contexts/            # React contexts
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── pages/               # Page components
│   │   ├── Index.tsx        # Home page
│   │   ├── ViewAttendance.tsx  # Attendance viewer
│   │   ├── FXBot.tsx        # AI chatbot
│   │   ├── Updates.tsx      # Campus updates
│   │   ├── Projects.tsx     # Student projects
│   │   ├── Resources.tsx    # Study resources
│   │   ├── Jobs.tsx         # Job opportunities
│   │   ├── Spotlight.tsx    # Student achievements
│   │   └── Join.tsx         # Community signup
│   ├── assets/              # Static assets
│   └── lib/                 # Utility functions
├── public/                  # Public assets
├── .env.example            # Environment variables template
└── package.json
```

## Features in Detail

### Attendance Viewer

The attendance viewer integrates with SBTET Telangana's official API to fetch real-time attendance data:

- Enter student PIN
- View overall attendance percentage
- See daily attendance records with date and status
- Displays total working days and days present
- Download and print functionality (coming soon)

### Theme Toggle

Custom animated sun/moon toggle that:
- Uses CSS variables for consistent brand colors
- Smooth 500ms transition animation
- Persists preference to localStorage
- Matches FEEDX brand colors (teal for light, indigo-blue for dark)

### Glassmorphism Design

All pages feature:
- Animated floating lights with radial gradients
- Backdrop blur effects
- Theme-aware glass cards
- Smooth hover interactions

## Configuration

### Environment Variables

Create a `.env.local` file with:

```env
# Backend API URL
VITE_API_URL=http://localhost:5001
```

### Color Customization

Edit `src/index.css` to customize the color scheme:

```css
:root {
  --primary: 217 48% 42%;      /* Indigo-blue */
  --secondary: 186 52% 45%;    /* Teal */
  /* ... more variables */
}
```

## Troubleshooting

### Navbar Clipping Content

If page content appears behind the fixed navbar:
- Check that pages have `pt-20` (80px top padding)
- `GlassmorphismBackground` component includes this by default

### Attendance API Not Working

1. Verify Python server is running: `http://localhost:5001/health`
2. Check SBTET API is accessible
3. Ensure PIN format is correct (e.g., "24054-cps-024")
4. Check browser console for CORS errors

### Theme Toggle Not Working

1. Clear browser localStorage
2. Check `ThemeContext.tsx` is properly imported
3. Verify CSS variables are defined in `index.css`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
