#!/bin/bash

# Build script for Rumsan AI Admin Panel Docker image

set -e

# Add Docker to PATH if not already there
export PATH="/Applications/Docker.app/Contents/Resources/bin:$PATH"

echo "🚀 Building Rumsan AI Admin Panel Docker Image..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  Warning: .env file not found. Creating from .env.example..."
    if [ -f env.example ]; then
        cp env.example .env
        echo "📝 Please edit .env file with your actual values before building"
        exit 1
    fi
fi

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Check required environment variables
required_vars=("NEXT_PUBLIC_SUPABASE_URL" "NEXT_PUBLIC_SUPABASE_ANON_KEY")
missing_vars=()

for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        missing_vars+=("$var")
    fi
done

if [ ${#missing_vars[@]} -ne 0 ]; then
    echo "❌ Missing required environment variables:"
    printf '%s\n' "${missing_vars[@]}"
    echo "Please set these variables in your .env file"
    exit 1
fi

# Build the image
echo "🔨 Building Docker image..."
docker build \
    --build-arg NEXT_PUBLIC_SUPABASE_URL="$NEXT_PUBLIC_SUPABASE_URL" \
    --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY="$NEXT_PUBLIC_SUPABASE_ANON_KEY" \
    --build-arg NEXT_PUBLIC_URL="$NEXT_PUBLIC_URL" \
    --build-arg NEXT_PUBLIC_SERVER_API="$NEXT_PUBLIC_SERVER_API" \
    -t rumsan/ai-admin:latest \
    .

echo "✅ Build completed successfully!"
echo ""
echo "🎯 Available commands:"
echo "  docker run -p 3000:3000 rumsan/ai-admin:latest                 # Run the container"
echo "  docker-compose -f docker-compose.build.yml up --build          # Build and run with compose"
echo "  docker-compose up                                               # Run with pre-built image"
echo ""
echo "🔗 The application will be available at: http://localhost:3000"