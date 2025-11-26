# Fix for ERR_BLOCKED_BY_CLIENT Error

## Problem
Browser extensions (ad blockers, privacy extensions) block requests to `localhost:5001` causing `ERR_BLOCKED_BY_CLIENT` error.

## Solution Applied

### 1. Vite Proxy Configuration
Updated `vite.config.ts` to proxy `/api/*` requests through the Vite dev server:
- Requests to `/api/attendance` → proxied to `http://localhost:5001/api/attendance`
- This bypasses ad blocker rules that block localhost ports

### 2. Updated API Base URL
Changed from absolute URL to relative path:
- Before: `http://localhost:5001/api/attendance`
- After: `/api/attendance` (proxied by Vite)

### 3. Enhanced Error Detection
Added specific error handling for blocked requests:
- Detects `ERR_BLOCKED_BY_CLIENT` errors
- Shows helpful message to disable ad blocker
- Falls back to demo data gracefully

## How to Apply

### Step 1: Restart Dev Server (Required!)
```bash
# Stop current dev server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 2: Start Backend API
```bash
cd server
python3 attendance_api.py
```

### Step 3: Test
Visit `http://localhost:8080/view-attendance` and enter a PIN.

## Alternative Solutions (if proxy doesn't work)

### Option 1: Disable Ad Blocker
Temporarily disable ad blocker for `localhost:8080`

### Option 2: Whitelist the URL
Add `localhost:5001` to ad blocker whitelist

### Option 3: Use Different Browser
Try Firefox, Chrome (incognito), or Edge without extensions

### Option 4: Use Demo Mode
The app automatically falls back to demo data if backend is blocked

## Technical Details

### Vite Proxy Config
```typescript
proxy: {
  "/api": {
    target: "http://localhost:5001",
    changeOrigin: true,
    secure: false,
    rewrite: (path) => path,
  },
}
```

### Request Flow
```
Frontend (/api/attendance?pin=xxx)
    ↓
Vite Dev Server (localhost:8080)
    ↓ (proxy)
Flask API (localhost:5001)
    ↓
SBTET API
```

### Benefits
- ✅ Bypasses ad blocker rules
- ✅ No CORS issues
- ✅ Single origin for frontend
- ✅ Works with browser extensions enabled

## Status Indicators

### Real Data (Backend Connected)
- No warning banner
- Shows actual SBTET data

### Demo Mode (Backend Blocked/Unavailable)
- Yellow warning banner
- Shows "Demo mode: Request blocked by browser extension..."
- Displays sample data

## Troubleshooting

### Still Getting Blocked?
1. **Restart dev server** - Proxy config requires restart
2. Check if backend is running: `curl http://localhost:5001/health`
3. Check browser console for specific error
4. Try different port: Update vite.config.ts to use port 5002

### Backend Not Starting?
```bash
# Install dependencies
pip install Flask flask-cors requests

# Run on different port
PORT=5002 python3 attendance_api.py
```

Then update vite.config.ts target to `http://localhost:5002`
