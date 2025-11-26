#!/bin/bash

echo "🚀 Starting FEEDX Polytechnic Attendance API"
echo "=============================================="

# Navigate to server directory
cd "$(dirname "$0")/server" || cd server || { echo "❌ Cannot find server directory"; exit 1; }

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

# Install Python dependencies
echo "📦 Checking Python dependencies..."
pip install -q Flask flask-cors requests

# Start the attendance API
echo "🌐 Starting SBTET Attendance API on port 5001..."
echo "   Press Ctrl+C to stop"
echo ""
python3 attendance_api.py
