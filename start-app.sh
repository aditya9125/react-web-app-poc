#!/bin/bash

# 🎓 LEARNING: Shell Script to Start Full-Stack Application
echo "🚀 Starting MY CINEMA Full-Stack Application..."

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "📊 Starting MongoDB..."
    brew services start mongodb/brew/mongodb-community
    sleep 2
else
    echo "✅ MongoDB is already running"
fi

# Start Backend Server
echo "🔧 Starting Backend Server..."
cd backend
npm run dev &
BACKEND_PID=$!
sleep 3

# Test Backend
echo "🧪 Testing Backend..."
if curl -s http://localhost:3001/api/health > /dev/null; then
    echo "✅ Backend is running on http://localhost:3001"
else
    echo "❌ Backend failed to start"
    exit 1
fi

# Go back to root directory
cd ..

# Start Frontend Server
echo "⚛️  Starting Frontend Server..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "🎉 Application Started Successfully!"
echo "   Frontend: http://localhost:5173 (or check terminal for actual port)"
echo "   Backend:  http://localhost:3001"
echo "   MongoDB:  mongodb://localhost:27017"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for user to press Ctrl+C
trap 'echo ""; echo "🛑 Stopping servers..."; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit' INT
wait 