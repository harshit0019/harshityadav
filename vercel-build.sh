#!/bin/bash

# Build the frontend and backend for Vercel deployment
echo "Building project for Vercel deployment..."

# Build the project using the existing build script
npm run build

# Copy any necessary files to the dist directory
cp vercel.json dist/
mkdir -p dist/api
cp -r api/* dist/api/

echo "Build completed successfully!"