#!/bin/bash
echo "Cleaning project..."
rm -rf node_modules
rm -rf .next

echo "Installing dependencies..."
pnpm install

echo "Building project..."
pnpm run build
