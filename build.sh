#!/bin/bash

# Remove problematic files
rm -rf node_modules/.pnpm/three*
rm -rf node_modules/.pnpm/@react-three*

# Build the project
pnpm run build
