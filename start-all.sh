#!/bin/bash

set -e

# Always run from this script's directory (project root)
SCRIPT_DIR="$(cd -- "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

echo "🚀 Starting FEEDX Application..."

# Check if backend is already running
if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Backend server already running on port 3001"
else
    echo "🔧 Starting backend server on port 3001..."
    (cd "$SCRIPT_DIR/server" && node index.js) &
    BACKEND_PID=$!
    echo "✅ Backend server started (PID: $BACKEND_PID)"
fi

# Wait a bit for backend to start
sleep 2

# Check if frontend is already running
if lsof -Pi :8080 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Frontend server already running on port 8080"
else
    echo "🎨 Starting frontend server on port 8080..."
    (cd "$SCRIPT_DIR" && npm run dev) &
    FRONTEND_PID=$!
    echo "✅ Frontend server started (PID: $FRONTEND_PID)"
fi

echo ""
echo "✅ FEEDX is running!"
echo "   Frontend: http://localhost:8080"
echo "   Backend:  http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for user to stop
wait
