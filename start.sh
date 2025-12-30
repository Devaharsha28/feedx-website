#!/bin/bash
set -e # Exit immediately if a command exits with a non-zero status

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
echo "🔨 Building main frontend..."
npm run build

# Build FXBot
echo "🤖 Building FXBot..."
if [ -d "fxbot" ]; then
    cd fxbot
    if [ ! -d "node_modules" ]; then
        echo "📦 Installing FXBot dependencies..."
        npm install
    fi
    # Always try to install to ensure deps are fresh if packages changed
    # skipping npm install if node_modules exists can be risky if package.json changed
    # but for speed we keep the check, or we can just run npm ci (clean install) if lockfile exists
    
    echo "📦 Ensuring FXBot dependencies..."
    npm install # Run install to be safe

    echo "🏗️ Running FXBot build..."
    npm run build
    cd ..
else
    echo "⚠️ fxbot directory not found, skipping..."
fi

# Start server (uses PORT from environment, defaults to 3001)
echo "🌐 Starting server on port ${PORT:-3001}..."
export NODE_ENV=production
npm start
