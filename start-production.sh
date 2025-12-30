#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting FEEDX Production Server${NC}"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installing dependencies...${NC}"
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Failed to install dependencies${NC}"
        exit 1
    fi
fi

# Copy assets to public folder for meta tags
echo -e "${BLUE}📋 Copying assets to public folder...${NC}"
if [ -f "src/assets/feedx-logo.png" ]; then
    cp src/assets/feedx-logo.png public/
fi
if [ -f "src/assets/fxbot-icon.svg" ]; then
    cp src/assets/fxbot-icon.svg public/
fi

# Build the frontend
echo -e "${BLUE}🔨 Building frontend for production...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Frontend build failed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Frontend build completed${NC}"
echo ""

# Check if dist directory exists
if [ ! -d "dist" ]; then
    echo -e "${RED}❌ Build directory not found${NC}"
    exit 1
fi

# Start the backend server (which will also serve the frontend)
echo -e "${BLUE}🚀 Starting production server...${NC}"
echo -e "${YELLOW}Server will be available at: http://0.0.0.0:3001${NC}"
echo ""

# Set production environment
export NODE_ENV=production

# Start the server
node server/index-json.js
