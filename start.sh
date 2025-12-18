#!/bin/bash

# Production startup script for Azure Web App
# Azure will run: npm run build && npm start

echo "🚀 Starting FEEDX Production Server"
echo ""

# Install Python if not available
if ! command -v python3 &> /dev/null; then
    echo "🐍 Installing Python..."
    apt-get update && apt-get install -y python3 python3-pip
fi

# Install Python dependencies
if [ -f "server/requirements.txt" ]; then
    echo "🐍 Installing Python dependencies..."
    pip3 install -r server/requirements.txt
fi

# Install Node dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing Node dependencies..."
    npm install
fi

# Build frontend
echo "🔨 Building frontend..."
npm run build

# Start server (uses PORT from environment, defaults to 3001)
echo "🌐 Starting server on port ${PORT:-3001}..."
export NODE_ENV=production
npm start
