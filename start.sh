#!/bin/bash

# Production startup script for Azure Web App
# Azure will run: npm run build && npm start

echo "🚀 Starting FEEDX Production Server"
echo ""

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build frontend
echo "🔨 Building frontend..."
npm run build

# Start server (uses PORT from environment, defaults to 3001)
echo "🌐 Starting server on port ${PORT:-3001}..."
export NODE_ENV=production
npm start
