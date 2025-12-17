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
      email: 'admin@feedxnexus.com',
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
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const users = readJsonFile('users.json');
    const user = users.find(u => u.username === username || u.email === username);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
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
