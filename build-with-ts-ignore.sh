#!/bin/bash

# Build with TypeScript errors ignored
pnpm run build --no-lint || pnpm run build --no-lint --no-typescript
