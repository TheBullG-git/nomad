#!/bin/bash
echo "Clearing cache and rebuilding..."
rm -rf .next
rm -rf node_modules/.cache
npm run build
echo "Build completed!"
