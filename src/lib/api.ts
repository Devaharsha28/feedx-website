// Resolve API host dynamically so it works in localhost and forwarded URLs (e.g., Codespaces)
const resolveApiHost = () => {
  // Highest priority: explicit env override
  if (import.meta.env?.VITE_API_URL) return import.meta.env.VITE_API_URL;

  if (typeof window !== 'undefined') {
    const origin = window.location.origin;
    console.log('Current origin:', origin);

    // Handle common dev setups: replace frontend port with backend port
    if (origin.includes(':8080')) {
      const apiUrl = origin.replace(':8080', ':3001');
      console.log('Resolved API URL:', apiUrl);
      return apiUrl;
    }
    if (origin.includes('-8080.')) {
      const apiUrl = origin.replace('-8080.', '-3001.');
      console.log('Resolved API URL:', apiUrl);
      return apiUrl;
    }

    // Fallback to same origin
    console.log('Using same origin for API:', origin);
    return origin;
  }

  // Static fallback for non-browser contexts
  return 'http://localhost:3001';
};

const API_HOST = '/api';
const API_BASE = `${API_HOST}/admin`;
const AUTH_BASE = `${API_HOST}/auth`;

// Helper function for authenticated requests
const authenticatedFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const token = localStorage.getItem('adminToken');
  
  // For FormData, don't set Content-Type (let browser set it with boundary)
  if (options.body instanceof FormData) {
    const headers: HeadersInit = {
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
    return fetch(url, {
      ...options,
      headers,
    });
  }

  // For JSON requests
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  return fetch(url, {
    ...options,
    headers,
  });
};

// Types
export interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
}

export interface Update {
  id: string;
  title: string;
  description: string;
  images: string[];
  priority: 'low' | 'medium' | 'high';
  timestamp: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  files: string[];
  images: string[];
  timestamp: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  location: string;
  registerLink: string;
  files: string[];
  timestamp: string;
}

export interface Spotlight {
  id: string;
  title: string;
  description: string;
  images: string[];
  timestamp: string;
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  content: string;
  image: string;
  timestamp: string;
}

// Notifications API
export const notificationsAPI = {
  getAll: async (): Promise<Notification[]> => {
    const response = await authenticatedFetch(`${API_BASE}/notifications`);
    if (!response.ok) throw new Error('Failed to fetch notifications');
    return response.json();
  },
  
  create: async (data: Omit<Notification, 'id' | 'timestamp'>): Promise<Notification> => {
    const response = await authenticatedFetch(`${API_BASE}/notifications`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create notification');
    return response.json();
  },
  
  delete: async (id: string): Promise<void> => {
    const response = await authenticatedFetch(`${API_BASE}/notifications/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete notification');
  }
};

// Updates API
export const updatesAPI = {
  getAll: async (): Promise<Update[]> => {
    const response = await authenticatedFetch(`${API_BASE}/updates`);
    if (!response.ok) throw new Error('Failed to fetch updates');
    return response.json();
  },
  
  create: async (data: Omit<Update, 'id' | 'timestamp'>): Promise<Update> => {
    const response = await authenticatedFetch(`${API_BASE}/updates`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create update');
    return response.json();
  },
  
  delete: async (id: string): Promise<void> => {
    const response = await authenticatedFetch(`${API_BASE}/updates/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete update');
  }
};

// Resources API
export const resourcesAPI = {
  getAll: async (): Promise<Resource[]> => {
    const response = await authenticatedFetch(`${API_BASE}/resources`);
    if (!response.ok) throw new Error('Failed to fetch resources');
    return response.json();
  },
  
  getById: async (id: string): Promise<Resource> => {
    const response = await authenticatedFetch(`${API_BASE}/resources/${id}`);
    if (!response.ok) throw new Error('Failed to fetch resource');
    return response.json();
  },
  
  create: async (data: Omit<Resource, 'id' | 'timestamp'>): Promise<Resource> => {
    const response = await authenticatedFetch(`${API_BASE}/resources`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create resource');
    return response.json();
  },
  
  delete: async (id: string): Promise<void> => {
    const response = await authenticatedFetch(`${API_BASE}/resources/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete resource');
  }
};

// Events API
export const eventsAPI = {
  getAll: async (): Promise<Event[]> => {
    const response = await authenticatedFetch(`${API_BASE}/events`);
    if (!response.ok) throw new Error('Failed to fetch events');
    return response.json();
  },
  
  create: async (data: Omit<Event, 'id' | 'timestamp'>): Promise<Event> => {
    const response = await authenticatedFetch(`${API_BASE}/events`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create event');
    return response.json();
  },
  
  delete: async (id: string): Promise<void> => {
    const response = await authenticatedFetch(`${API_BASE}/events/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete event');
  }
};

// Spotlight API
export const spotlightAPI = {
  getAll: async (): Promise<Spotlight[]> => {
    const response = await authenticatedFetch(`${API_BASE}/spotlight`);
    if (!response.ok) throw new Error('Failed to fetch spotlight');
    return response.json();
  },
  
  create: async (data: Omit<Spotlight, 'id' | 'timestamp'>): Promise<Spotlight> => {
    const response = await authenticatedFetch(`${API_BASE}/spotlight`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create spotlight');
    return response.json();
  },
  
  delete: async (id: string): Promise<void> => {
    const response = await authenticatedFetch(`${API_BASE}/spotlight/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete spotlight');
  }
};

// Testimonials API
export const testimonialsAPI = {
  getAll: async (): Promise<Testimonial[]> => {
    const response = await authenticatedFetch(`${API_BASE}/testimonials`);
    if (!response.ok) throw new Error('Failed to fetch testimonials');
    return response.json();
  },
  
  create: async (data: Omit<Testimonial, 'id' | 'timestamp'>): Promise<Testimonial> => {
    const response = await authenticatedFetch(`${API_BASE}/testimonials`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create testimonial');
    return response.json();
  },
  
  delete: async (id: string): Promise<void> => {
    const response = await authenticatedFetch(`${API_BASE}/testimonials/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete testimonial');
  }
};

// Auth API
export const authAPI = {
  login: async (username: string, password: string) => {
    console.log('Auth API login called with:', { username, AUTH_BASE });
    const response = await fetch(`${AUTH_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    console.log('Auth API response status:', response.status);
    const data = await response.json();
    console.log('Auth API response data:', data);
    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }
    return data;
  }
};

// Image upload helper - uploads to server and returns URL (WhatsApp style)
export const uploadImage = async (file: File): Promise<string> => {
  console.log('uploadImage called with:', file.name, file.type, file.size);
  
  // Validate file size (max 10MB for images)
  if (file.size > 10 * 1024 * 1024) {
    throw new Error('Image file size must be less than 10MB');
  }

  // Validate file type
  if (!file.type.startsWith('image/')) {
    throw new Error('Please select a valid image file');
  }

  // Upload to server
  const formData = new FormData();
  formData.append('file', file);

  console.log('Sending upload request to /api/upload');
  const response = await authenticatedFetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  console.log('Upload response status:', response.status);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Upload failed' }));
    console.error('Upload error response:', error);
    throw new Error(error.error || `Upload failed: ${response.status}`);
  }

  const data = await response.json();
  console.log('Upload success:', data);
  return data.url;
};

// File upload helper - uploads to server and returns URL (WhatsApp style)
export const uploadFile = async (file: File): Promise<string> => {
  console.log('uploadFile called with:', file.name, file.type, file.size);
  
  // Validate file size (max 100MB for files)
  const maxSize = 100 * 1024 * 1024; // 100MB
  if (file.size > maxSize) {
    throw new Error('File size must be less than 100MB');
  }

  // Validate file type
  const allowedTypes = [
    'application/pdf',
    'video/mp4',
    'video/avi',
    'video/mov',
    'video/wmv',
    'video/flv',
    'video/webm',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'text/plain',
    'application/zip',
    'application/x-rar-compressed',
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp'
  ];

  const isAllowedType = allowedTypes.includes(file.type) || 
    file.name.match(/\.(pdf|mp4|avi|mov|wmv|flv|webm|doc|docx|xls|xlsx|ppt|pptx|txt|zip|rar|jpg|jpeg|png|gif|webp)$/i);

  if (!isAllowedType) {
    throw new Error('Unsupported file type. Please upload images, PDF, video files, documents, or archives.');
  }

  // Upload to server
  const formData = new FormData();
  formData.append('file', file);

  console.log('Sending upload request to /api/upload');
  const response = await authenticatedFetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  console.log('Upload response status:', response.status);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Upload failed' }));
    console.error('Upload error response:', error);
    throw new Error(error.error || `Upload failed: ${response.status}`);
  }

  const data = await response.json();
  console.log('Upload success:', data);
  return data.url;
};
