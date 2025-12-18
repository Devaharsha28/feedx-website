#!/bin/bash

# Production startup script for Azure Web App
# Serves React frontend + Node.js API on single $PORT

echo "🚀 Starting FEEDX Production Server"
echo ""

# Install Node dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing Node dependencies..."
    npm install
fi

# Build frontend
echo "🔨 Building frontend..."
npm run build

# Start Node server (serves both API and frontend on $PORT)
echo "🌐 Starting server on port ${PORT:-3001}..."
export NODE_ENV=production
npm start
