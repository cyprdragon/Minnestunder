#!/bin/bash
# Setup script for Minnestunder
# Run this after extracting the zip file

echo "🎨 Setting up Minnestunder..."

# Install dependencies
echo "📦 Installing frontend dependencies..."
npm install

echo "🔥 Installing backend dependencies..."
cd server
npm install
cd ..

# Create environment files
echo "🔧 Creating environment files..."
cp .env.example .env
cp server/.env.example server/.env

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env and add your Firebase credentials"
echo "2. Run: npm run dev"
echo "3. Visit: http://localhost:5173"
echo ""
echo "For backend development:"
echo "1. Edit server/.env with Firebase admin credentials"
echo "2. Run: cd server && npm run dev"
echo ""
echo "📖 Documentation:"
echo "- README.md - Quick start guide"
echo "- DOCUMENTATION.md - Technical documentation"
echo "- DEPLOYMENT.md - Deployment instructions"
