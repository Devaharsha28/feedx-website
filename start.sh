#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting FEEDX Application${NC}"
echo "================================================"
echo ""

# Function to check if a port is in use
check_port() {
    lsof -ti:$1 > /dev/null 2>&1
}

# Function to kill process on a port
kill_port() {
    if check_port $1; then
        echo -e "${YELLOW}⚠️  Port $1 is in use. Killing existing process...${NC}"
        lsof -ti:$1 | xargs kill -9 2>/dev/null
        sleep 1
    fi
}

# Check and kill processes on required ports
kill_port 8080  # Frontend
kill_port 3001  # Node.js API
kill_port 5001  # Python Backend API

echo -e "${GREEN}✓ Ports cleared${NC}"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python 3 is not installed. Please install Python 3.8 or higher.${NC}"
    exit 1
fi

# Check if Node is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 16 or higher.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Prerequisites check passed${NC}"
echo ""

# Install Python dependencies
echo -e "${BLUE}📦 Installing Python dependencies...${NC}"
cd server
pip install -q Flask flask-cors requests 2>/dev/null
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Python dependencies installed${NC}"
else
    echo -e "${YELLOW}⚠️  Some Python dependencies may have failed to install${NC}"
fi
cd ..
echo ""

# Install Node dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}📦 Installing Node dependencies...${NC}"
    npm install
    echo -e "${GREEN}✓ Node dependencies installed${NC}"
    echo ""
fi

# Create log directory
mkdir -p logs

echo -e "${BLUE}🌐 Starting Node.js API Server (Port 3001)...${NC}"
node server/index.js > logs/api.log 2>&1 &
API_PID=$!
echo -e "${GREEN}✓ Node API started (PID: $API_PID)${NC}"
echo ""

# Wait a moment for API to start
sleep 2

# Check if API started successfully
if check_port 3001; then
    echo -e "${GREEN}✓ Node API is running on http://localhost:3001${NC}"
else
    echo -e "${RED}❌ Node API failed to start. Check logs/api.log${NC}"
fi
echo ""

echo -e "${BLUE}🌐 Starting Python Backend API (Port 5001)...${NC}"
cd server
python3 attendance_api.py > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
cd ..
echo -e "${GREEN}✓ Python Backend started (PID: $BACKEND_PID)${NC}"
echo ""

# Wait a moment for backend to start
sleep 2

# Check if backend started successfully
if check_port 5001; then
    echo -e "${GREEN}✓ Python Backend API is running on http://localhost:5001${NC}"
else
    echo -e "${YELLOW}⚠️  Python Backend failed to start. Check logs/backend.log${NC}"
fi
echo ""

echo -e "${BLUE}🎨 Starting Frontend (Port 8080)...${NC}"
npm run dev > logs/frontend.log 2>&1 &
FRONTEND_PID=$!
echo -e "${GREEN}✓ Frontend started (PID: $FRONTEND_PID)${NC}"
echo ""

# Wait a moment for frontend to start
sleep 3

# Check if frontend started successfully
if check_port 8080; then
    echo -e "${GREEN}✓ Frontend is running on http://localhost:8080${NC}"
else
    echo -e "${RED}❌ Frontend failed to start. Check logs/frontend.log${NC}"
fi
echo ""

echo "================================================"
echo -e "${GREEN}✅ FEEDX is now running!${NC}"
echo ""
echo -e "${BLUE}📍 Access Points:${NC}"
echo "   Frontend:     http://localhost:8080"
echo "   Node API:     http://localhost:3001"
echo "   Python API:   http://localhost:5001"
echo "   Health:       http://localhost:5001/health"
echo ""
echo -e "${BLUE}📊 Process IDs:${NC}"
echo "   Node API PID:      $API_PID"
echo "   Python Backend PID: $BACKEND_PID"
echo "   Frontend PID:      $FRONTEND_PID"
echo ""
echo -e "${BLUE}📝 Logs:${NC}"
echo "   Node API:  logs/api.log"
echo "   Backend:   logs/backend.log"
echo "   Frontend:  logs/frontend.log"
echo ""
echo -e "${YELLOW}💡 Tips:${NC}"
echo "   • View backend logs:  tail -f logs/backend.log"
echo "   • View frontend logs: tail -f logs/frontend.log"
echo "   • Stop all services:  ./stop.sh"
echo ""
echo -e "${BLUE}Press Ctrl+C to stop all services${NC}"
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo -e "${YELLOW}🛑 Stopping services...${NC}"
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    kill_port 8080
    kill_port 5001
    echo -e "${GREEN}✓ All services stopped${NC}"
    exit 0
}

# Trap Ctrl+C
trap cleanup SIGINT SIGTERM

# Keep script running and show live logs
echo -e "${BLUE}📡 Live Backend Logs:${NC}"
echo "================================================"
tail -f logs/backend.log
