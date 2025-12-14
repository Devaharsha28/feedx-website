#!/bin/bash

# Simple startup script for quick testing
# This runs Node API in foreground so you can see errors immediately

echo "🚀 Starting Node.js API Server..."
echo "================================"
echo ""
echo "Server will run on http://localhost:3001"
echo "Press Ctrl+C to stop"
echo ""

node server/index.js
