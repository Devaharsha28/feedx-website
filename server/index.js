import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Simple file-based storage
const USERS_FILE = path.join(__dirname, 'users.json');

// Helper functions
const readUsers = () => {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// Initialize users file if it doesn't exist
if (!fs.existsSync(USERS_FILE)) {
  writeUsers([]);
}

// Middleware
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:3000', 'http://127.0.0.1:8080', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.post('/api/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const users = readUsers();

    // Check if user exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = {
      id: Date.now(),
      email,
      password: hashedPassword,
      name,
      created_at: new Date().toISOString()
    };

    users.push(newUser);
    writeUsers(users);

    // Generate JWT
    const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET);

    res.status(201).json({ token, user: { id: newUser.id, email: newUser.email, name: newUser.name } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const users = readUsers();

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);

    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

app.get('/api/profile', authenticateToken, (req, res) => {
  const users = readUsers();
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  const { password, ...userWithoutPassword } = user;
  res.json({ user: userWithoutPassword });
});

// Proxy route for SBTET Telangana attendance API
app.get('/api/attendance', async (req, res) => {
  try {
    const { pin } = req.query;

    if (!pin) {
      return res.status(400).json({ error: 'PIN parameter is required' });
    }

    // For testing purposes, return mock data if pin is 'test'
    if (pin === 'test') {
      return res.json({
        studentName: "Test Student",
        pin: pin,
        totalSubjects: 5,
        overallAttendance: 85.5,
        status: "Active",
        message: "Mock data for testing"
      });
    }

    // Fetch data from SBTET Telangana API
    const apiUrl = `https://www.sbtet.telangana.gov.in/api/api/PreExamination/getAttendanceReport?Pin=${encodeURIComponent(pin)}`;

    console.log('Fetching from:', apiUrl);

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; FeedX-Proxy/1.0)'
      }
    });

    console.log('External API response status:', response.status);
    console.log('External API response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      console.error('API Response not ok:', response.status, response.statusText);
      let errorDetails = `Failed to fetch attendance data: ${response.statusText}`;

      try {
        const contentType = response.headers.get('content-type');
        console.log('Error response content-type:', contentType);

        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          console.log('Error response JSON:', errorData);
          errorDetails = errorData.message || errorData.error || errorDetails;
        } else {
          const textResponse = await response.text();
          console.log('Error response text (first 500 chars):', textResponse.substring(0, 500));
          if (textResponse) {
            errorDetails = `API Error (${response.status}): ${textResponse.substring(0, 200)}`;
          }
        }
      } catch (parseError) {
        console.error('Could not parse error response:', parseError);
      }

      return res.status(response.status).json({
        error: errorDetails
      });
    }

    // Check if response has content
    const contentLength = response.headers.get('content-length');
    console.log('Response content-length:', contentLength);

    if (contentLength === '0') {
      console.log('Response has no content');
      return res.status(404).json({
        error: 'No attendance data found for this PIN'
      });
    }

    let data;
    try {
      const responseText = await response.text();
      console.log('Raw response (first 500 chars):', responseText.substring(0, 500));

      if (!responseText.trim()) {
        return res.status(404).json({
          error: 'Empty response from attendance API'
        });
      }

      data = JSON.parse(responseText);
      console.log('Parsed JSON successfully');
    } catch (jsonError) {
      console.error('JSON parsing error:', jsonError);
      return res.status(500).json({
        error: 'Invalid JSON response from attendance API',
        details: jsonError.message
      });
    }

    console.log('API Response received successfully');
    res.json(data);

  } catch (error) {
    console.error('Error fetching attendance data:', error);
    res.status(500).json({ error: 'Internal server error while fetching attendance data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});