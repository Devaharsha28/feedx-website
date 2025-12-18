import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Data directory for JSON files
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Uploads directory with subdirectories for file organization
const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');
const uploadSubDirs = ['images', 'videos', 'documents', 'others'];
uploadSubDirs.forEach(subDir => {
  const dir = path.join(uploadsDir, subDir);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});
console.log('✅ Uploads directory ready:', uploadsDir);

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Helper functions for JSON file storage
const readJsonFile = (filename) => {
  const filepath = path.join(dataDir, filename);
  if (!fs.existsSync(filepath)) {
    return [];
  }
  try {
    return JSON.parse(fs.readFileSync(filepath, 'utf8'));
  } catch {
    return [];
  }
};

const writeJsonFile = (filename, data) => {
  const filepath = path.join(dataDir, filename);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
};

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

// Initialize default admin user
const initializeAdmin = async () => {
  let users = readJsonFile('users.json');
  if (users.length === 0) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    users.push({
      id: generateId(),
      username: 'admin',
      password: hashedPassword,
      name: 'Administrator',
      email: 'admin@feedx.com',
      phone: '0000000000',
      pin: '0000',
      createdAt: new Date().toISOString()
    });
    writeJsonFile('users.json', users);
    console.log('✅ Default admin user created (username: admin, password: admin123)');
  }
};

initializeAdmin();

// Middleware
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// Serve public folder (for images, robots.txt, etc.)
const publicDir = path.join(__dirname, '..', 'public');
app.use(express.static(publicDir));

// Serve uploaded files statically
app.use('/uploads', express.static(uploadsDir));

// Configure multer for file uploads with organized storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Check if this is a resource upload (has resourceName in body)
    const resourceName = req.body.resourceName;
    
    if (resourceName) {
      // Create folder for this resource
      const sanitizedName = resourceName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const resourcePath = path.join(uploadsDir, 'resources', sanitizedName);
      
      if (!fs.existsSync(resourcePath)) {
        fs.mkdirSync(resourcePath, { recursive: true });
      }
      
      cb(null, resourcePath);
    } else {
      // Determine folder based on file type
      let uploadPath = path.join(uploadsDir, 'others');
      
      if (file.mimetype.startsWith('image/')) {
        uploadPath = path.join(uploadsDir, 'images');
      } else if (file.mimetype.startsWith('video/')) {
        uploadPath = path.join(uploadsDir, 'videos');
      } else if (
        file.mimetype.includes('pdf') || 
        file.mimetype.includes('document') || 
        file.mimetype.includes('text') ||
        file.mimetype.includes('word') ||
        file.mimetype.includes('excel') ||
        file.mimetype.includes('sheet') ||
        file.mimetype.includes('powerpoint') ||
        file.mimetype.includes('presentation')
      ) {
        uploadPath = path.join(uploadsDir, 'documents');
      }
      
      cb(null, uploadPath);
    }
  },
  filename: (req, file, cb) => {
    const resourceName = req.body.resourceName;
    const fileCounter = req.body.fileCounter || Date.now();
    
    if (resourceName) {
      // For resources, use resourceName-counter.extension format
      const sanitizedName = resourceName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const ext = path.extname(file.originalname);
      const filename = `${sanitizedName}-${fileCounter}${ext}`;
      cb(null, filename);
    } else {
      // Generate unique filename with timestamp for non-resource uploads
      const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
      cb(null, uniqueName);
    }
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      // Images
      'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/svg+xml',
      // Videos
      'video/mp4', 'video/avi', 'video/mov', 'video/mkv', 'video/webm', 'video/quicktime', 'video/wmv', 'video/flv',
      // Documents
      'application/pdf', 'text/plain',
      'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      // Archives
      'application/zip', 'application/x-zip-compressed', 'application/x-rar-compressed',
      // Text/Code files
      'text/csv', 'text/html', 'text/css', 'text/javascript', 'application/json',
      // Audio
      'audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp4'
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('File type not allowed. Supported: images, videos, PDFs, documents, archives, and text files.'), false);
    }
  }
});

// Auth Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// ================== FILE UPLOAD ==================
app.post('/api/upload', verifyToken, (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.error('Multer error:', err);
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File too large. Maximum size is 100MB.' });
      }
      return res.status(400).json({ error: `Upload error: ${err.message}` });
    } else if (err) {
      console.error('Upload error:', err);
      return res.status(400).json({ error: err.message || 'Failed to upload file' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Get relative path from uploads dir (e.g., "images/123456.jpg")
    const relativePath = path.relative(uploadsDir, req.file.path).replace(/\\/g, '/');
    const fileUrl = `/uploads/${relativePath}`;
    
    console.log('✅ File uploaded:', req.file.filename, '→', fileUrl);
    
    res.json({
      success: true,
      url: fileUrl,
      file: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.path,
        url: fileUrl
      }
    });
  });
});

// Handle multer errors globally
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 100MB.' });
    }
    return res.status(400).json({ error: `Upload error: ${error.message}` });
  }
  
  if (error.message && error.message.includes('File type not allowed')) {
    return res.status(400).json({ error: error.message });
  }
  
  console.error('Server error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// ================== AUTH ROUTES ==================
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Login attempt:', { username, passwordProvided: !!password });
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const users = readJsonFile('users.json');
    console.log('Users loaded:', users.length, 'users found');
    console.log('Looking for user:', username);
    
    const user = users.find(u => u.username === username || u.email === username);

    if (!user) {
      console.log('User not found');
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    console.log('User found:', user.username);

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', passwordMatch);
    
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, username: user.username, name: user.name }, JWT_SECRET, { expiresIn: '24h' });

    res.json({
      token,
      user: { id: user.id, username: user.username, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Register new user (admin only)
app.post('/api/auth/register', verifyToken, async (req, res) => {
  try {
    const { username, password, name, email, phone, pin } = req.body;

    if (!username || !password || !name || !email) {
      return res.status(400).json({ error: 'Username, password, name, and email are required' });
    }

    const users = readJsonFile('users.json');
    
    // Check if username or email already exists
    if (users.find(u => u.username === username)) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: generateId(),
      username,
      password: hashedPassword,
      name,
      email,
      phone: phone || '',
      pin: pin || '',
      created_at: new Date().toISOString()
    };

    users.push(newUser);
    writeJsonFile('users.json', users);

    res.json({ 
      message: 'User created successfully',
      user: { id: newUser.id, username: newUser.username, name: newUser.name, email: newUser.email }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all users (admin only)
app.get('/api/auth/users', verifyToken, (req, res) => {
  const users = readJsonFile('users.json');
  // Return users without passwords
  const safeUsers = users.map(u => ({
    id: u.id,
    username: u.username,
    name: u.name,
    email: u.email,
    phone: u.phone,
    created_at: u.created_at || u.createdAt
  }));
  res.json(safeUsers);
});

// Delete user (admin only)
app.delete('/api/auth/users/:id', verifyToken, (req, res) => {
  let users = readJsonFile('users.json');
  const userToDelete = users.find(u => u.id === req.params.id || u.id === parseInt(req.params.id));
  
  if (!userToDelete) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  // Prevent deleting the last admin
  if (users.length === 1) {
    return res.status(400).json({ error: 'Cannot delete the last user' });
  }
  
  users = users.filter(u => u.id !== req.params.id && u.id !== parseInt(req.params.id));
  writeJsonFile('users.json', users);
  
  res.json({ message: 'User deleted successfully' });
});

app.get('/api/auth/me', verifyToken, (req, res) => {
  const users = readJsonFile('users.json');
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json({ id: user.id, username: user.username, name: user.name, email: user.email });
});

// ================== GENERIC CRUD HELPERS ==================
const createCrudRoutes = (resourceName) => {
  const filename = `${resourceName}.json`;


  // GET all
  app.get(`/api/admin/${resourceName}`, (req, res) => {
    const data = readJsonFile(filename);
    res.json(data);
  });

  // GET by ID
  app.get(`/api/admin/${resourceName}/:id`, (req, res) => {
    const data = readJsonFile(filename);
    const item = data.find(d => d.id === req.params.id);
    if (!item) {
      return res.status(404).json({ error: `${resourceName} not found` });
    }
    res.json(item);
  });

  // POST create
  app.post(`/api/admin/${resourceName}`, verifyToken, (req, res) => {
    const data = readJsonFile(filename);
    const newItem = {
      id: generateId(),
      ...req.body,
      timestamp: new Date().toISOString()
    };
    data.unshift(newItem);
    writeJsonFile(filename, data);
    console.log(`✅ Created ${resourceName}:`, newItem.id);
    res.status(201).json(newItem);
  });

  // PUT update
  app.put(`/api/admin/${resourceName}/:id`, verifyToken, (req, res) => {
    const data = readJsonFile(filename);
    const index = data.findIndex(d => d.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: `${resourceName} not found` });
    }
    data[index] = { ...data[index], ...req.body, updatedAt: new Date().toISOString() };
    writeJsonFile(filename, data);
    res.json(data[index]);
  });

  // DELETE
  app.delete(`/api/admin/${resourceName}/:id`, verifyToken, (req, res) => {
    let data = readJsonFile(filename);
    const index = data.findIndex(d => d.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: `${resourceName} not found` });
    }
    data.splice(index, 1);
    writeJsonFile(filename, data);
    console.log(`✅ Deleted ${resourceName}:`, req.params.id);
    res.json({ success: true });
  });
};

// Create CRUD routes for all resources
createCrudRoutes('notifications');
createCrudRoutes('updates');
createCrudRoutes('resources');
createCrudRoutes('events');
createCrudRoutes('spotlight');
createCrudRoutes('testimonials');

// INSTITUTES - Custom routes for institute management
app.get('/api/admin/institutes', (req, res) => {
  const institutes = readJsonFile('institutes.json');
  res.json(institutes);
});

app.get('/api/admin/institutes/:code', (req, res) => {
  const institutes = readJsonFile('institutes.json');
  const institute = institutes.find(i => i.code.toUpperCase() === req.params.code.toUpperCase());
  if (institute) {
    res.json(institute);
  } else {
    res.status(404).json({ error: 'Institute not found' });
  }
});

app.post('/api/admin/institutes', verifyToken, (req, res) => {
  try {
    const data = req.body;
    if (!data.code || !data.name) {
      return res.status(400).json({ error: 'Code and name are required' });
    }
    
    const institutes = readJsonFile('institutes.json');
    const existingIndex = institutes.findIndex(i => i.code.toUpperCase() === data.code.toUpperCase());
    
    const instituteData = {
      ...data,
      code: data.code.toUpperCase(),
      updatedAt: new Date().toISOString()
    };
    
    if (existingIndex >= 0) {
      institutes[existingIndex] = instituteData;
    } else {
      instituteData.createdAt = new Date().toISOString();
      institutes.push(instituteData);
    }
    
    writeJsonFile('institutes.json', institutes);
    res.json(instituteData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/admin/institutes/:code', verifyToken, (req, res) => {
  try {
    const institutes = readJsonFile('institutes.json');
    const filtered = institutes.filter(i => i.code.toUpperCase() !== req.params.code.toUpperCase());
    writeJsonFile('institutes.json', filtered);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ================== SBTET API PROXY ==================
// In-memory cache for results
const resultsCache = new Map();
const resultsJsonCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const sbtetHeaders = {
  'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  'Accept': 'application/json, text/javascript, */*; q=0.01',
  'Accept-Language': 'en-US,en;q=0.9',
  'X-Requested-With': 'XMLHttpRequest',
  'Referer': 'https://www.sbtet.telangana.gov.in/',
};

// Helper to convert value to number
const toNumber = (value) => {
  if (value === null || value === undefined) return null;
  if (typeof value === 'number') return value;
  const s = String(value).trim();
  if (!s) return null;
  const cleaned = s.replace(/[^0-9.]/g, '');
  if (!cleaned) return null;
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
};

// Helper to find number by key pattern
const pickNumberByKey = (obj, patterns) => {
  if (!obj || typeof obj !== 'object') return null;
  for (const [key, value] of Object.entries(obj)) {
    const k = String(key).toLowerCase();
    if (patterns.some(p => k.match(p))) {
      const n = toNumber(value);
      if (n !== null) return n;
    }
  }
  return null;
};

// Compute attendance summary
const computeAttendanceSummary = (studentInfo, records) => {
  const source = (studentInfo && Object.keys(studentInfo).length > 0) 
    ? studentInfo 
    : (records && records.length > 0 ? records[0] : {});

  let totalDays = pickNumberByKey(source, [/total.*day/, /working.*day/, /no.*day/, /totday/, /twd/]);
  let presentDays = pickNumberByKey(source, [/present.*day/, /attend.*day/, /presentday/, /pday/]);
  let percent = pickNumberByKey(source, [/percent/, /percentage/, /attend.*%/, /att.*per/]);

  if (percent === null && totalDays !== null && totalDays > 0 && presentDays !== null) {
    percent = (presentDays / totalDays) * 100;
  }

  const asInt = (n) => {
    if (n === null) return null;
    return Math.abs(n - Math.round(n)) < 1e-9 ? Math.round(n) : n;
  };

  const totalDaysN = asInt(totalDays);
  const presentDaysN = asInt(presentDays);
  const absentDaysN = (totalDaysN !== null && presentDaysN !== null) 
    ? asInt(totalDaysN - presentDaysN) 
    : null;

  return {
    attendancePercentage: percent !== null ? Math.round(percent * 100) / 100 : null,
    totalDays: totalDaysN,
    presentDays: presentDaysN,
    absentDays: absentDaysN,
  };
};

// Fetch attendance from SBTET
const fetchAttendance = async (pin) => {
  const urls = [
    `https://www.sbtet.telangana.gov.in/api/api/PreExamination/getAttendanceReport?Pin=${pin}`,
    `https://www.sbtet.telangana.gov.in/api/PreExamination/getAttendanceReport?Pin=${pin}`,
  ];

  let lastError = null;
  for (const url of urls) {
    try {
      const response = await fetch(url, { headers: sbtetHeaders, timeout: 15000 });
      if (!response.ok) {
        lastError = new Error(`HTTP ${response.status}`);
        continue;
      }
      let data = await response.json();
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }
      return data;
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError || new Error('Failed to fetch from SBTET');
};

// Fetch results JSON from SBTET
const fetchResultsJson = async (pin) => {
  const pinKey = pin.toLowerCase();
  const cached = resultsJsonCache.get(pinKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const urls = [
    `https://www.sbtet.telangana.gov.in/api/api/Results/GetConsolidatedResults?Pin=${pin}`,
    `https://www.sbtet.telangana.gov.in/api/Results/GetConsolidatedResults?Pin=${pin}`,
  ];

  let lastError = null;
  for (const url of urls) {
    try {
      const response = await fetch(url, { headers: sbtetHeaders, timeout: 20000 });
      if (!response.ok) {
        lastError = new Error(`HTTP ${response.status}`);
        continue;
      }
      let data = await response.json();
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }
      if (!data) throw new Error('Empty response');
      
      resultsJsonCache.set(pinKey, { timestamp: Date.now(), data });
      return data;
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError || new Error('Failed to fetch results');
};

// Fetch results HTML from proxy
const fetchResultsHtml = async (pin) => {
  const pinKey = pin.toLowerCase();
  const cached = resultsCache.get(pinKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.html;
  }

  const url = `http://18.61.7.125/result/${pin}`;
  const response = await fetch(url, {
    headers: {
      'User-Agent': sbtetHeaders['User-Agent'],
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    },
    timeout: 20000,
  });

  if (response.status === 404) {
    throw new Error('Student not found');
  }
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const html = await response.text();
  if (html.length < 200) {
    throw new Error('Empty HTML response');
  }

  resultsCache.set(pinKey, { timestamp: Date.now(), html });
  return html;
};

// GET /api/attendance - Fetch attendance by PIN
app.get('/api/attendance', async (req, res) => {
  const { pin } = req.query;
  if (!pin) {
    return res.status(400).json({ error: 'Missing pin parameter' });
  }

  try {
    const data = await fetchAttendance(pin);

    if (!data) {
      return res.status(404).json({ success: false, error: 'No data returned from SBTET API' });
    }

    const response = {
      success: true,
      studentInfo: {},
      attendanceRecords: [],
      attendanceSummary: {
        attendancePercentage: null,
        totalDays: null,
        presentDays: null,
        absentDays: null,
      },
    };

    if (typeof data === 'object') {
      if (!data || Object.values(data).every(v => !v)) {
        return res.status(404).json({
          success: false,
          error: 'No data found for this PIN. Please verify the PIN is correct.',
        });
      }

      if (data.Table && Array.isArray(data.Table) && data.Table.length > 0) {
        response.studentInfo = data.Table[0];
      }

      if (data.Table1 && Array.isArray(data.Table1)) {
        response.attendanceRecords = data.Table1;
      } else if (data.Table && Array.isArray(data.Table) && !response.studentInfo) {
        response.attendanceRecords = data.Table;
      }
    }

    response.attendanceSummary = computeAttendanceSummary(
      response.studentInfo,
      response.attendanceRecords
    );

    if (!response.studentInfo || Object.keys(response.studentInfo).length === 0) {
      return res.status(404).json({
        success: false,
        error: 'No data found for this PIN. The PIN may be invalid or not in the SBTET system.',
      });
    }

    res.json(response);
  } catch (err) {
    console.error('Attendance API error:', err.message);
    if (err.message.includes('404') || err.message.includes('not found')) {
      return res.status(404).json({ error: 'Student not found. Please check the PIN.' });
    }
    if (err.message.includes('timeout')) {
      return res.status(504).json({ error: 'Request timeout. Please try again.' });
    }
    res.status(502).json({ error: `Network error: ${err.message}` });
  }
});

// GET /api/results - Fetch consolidated results JSON
app.get('/api/results', async (req, res) => {
  const { pin } = req.query;
  if (!pin) {
    return res.status(400).json({ success: false, error: 'Missing pin parameter' });
  }

  try {
    const data = await fetchResultsJson(pin);
    res.json({ success: true, pin, data });
  } catch (err) {
    console.error('Results API error:', err.message);
    if (err.message.includes('404') || err.message.includes('not found')) {
      return res.status(404).json({ success: false, error: 'Student not found. Please check the PIN.' });
    }
    if (err.message.includes('timeout')) {
      return res.status(504).json({ success: false, error: 'Request timeout. Please try again.' });
    }
    res.status(500).json({ success: false, error: `Server error: ${err.message}` });
  }
});

// GET /api/results/raw - Fetch results HTML
app.get('/api/results/raw', async (req, res) => {
  const { pin } = req.query;
  if (!pin) {
    return res.status(400).json({ success: false, error: 'Missing pin parameter' });
  }

  try {
    const html = await fetchResultsHtml(pin);
    res.json({ success: true, pin, html });
  } catch (err) {
    console.error('Results raw API error:', err.message);
    if (err.message.includes('not found')) {
      return res.status(404).json({ success: false, error: 'Student not found. Please check the PIN.' });
    }
    if (err.message.includes('timeout')) {
      return res.status(504).json({ success: false, error: 'Request timeout. Please try again.' });
    }
    res.status(500).json({ success: false, error: `Server error: ${err.message}` });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve built frontend static files in production
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '..', 'dist');
  app.use(express.static(distPath));
  
  // Handle client-side routing - return index.html for all non-API, non-upload routes
  app.get('*', (req, res, next) => {
    // Don't intercept API or upload requests
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
      return next();
    }
    res.sendFile(path.join(distPath, 'index.html'));
  });
  
  console.log('📦 Serving frontend from:', distPath);
}

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Uploads directory: ${uploadsDir}`);
  console.log(`💾 Data directory: ${dataDir}`);
  console.log(`\n📋 Available endpoints:`);
  console.log(`   POST /api/auth/login`);
  console.log(`   POST /api/upload`);
  console.log(`   GET/POST/PUT/DELETE /api/admin/notifications`);
  console.log(`   GET/POST/PUT/DELETE /api/admin/updates`);
  console.log(`   GET/POST/PUT/DELETE /api/admin/resources`);
  console.log(`   GET/POST/PUT/DELETE /api/admin/events`);
  console.log(`   GET/POST/PUT/DELETE /api/admin/spotlight`);
  console.log(`   GET/POST/PUT/DELETE /api/admin/testimonials`);
  console.log(`   GET/POST/DELETE /api/admin/institutes`);
  console.log(`\n✅ Default admin: username=admin, password=admin123\n`);
});
