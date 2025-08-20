# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Env Sangraha is an Electron desktop application built with TypeScript that helps users collect and archive .env files from directory trees. The app scans a target directory recursively, finds all .env files while ignoring node_modules folders, and creates a zip archive maintaining the original directory structure.

## Development Commands

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Run in development mode
npm run dev

# Run production build
npm start

# Clean build files
npm run clean

# Package for distribution
npm run pack
npm run dist
```

## Architecture

**Main Process (`src/main.ts`)**
- Electron main process handling window management
- IPC handlers for directory selection, file scanning, and archive creation
- File system operations using Node.js fs module
- ZIP creation using archiver library

**Renderer Process (`src/renderer.ts`)**
- Frontend logic for user interactions
- Communicates with main process via IPC
- Handles UI state management

**Preload Script (`src/preload.ts`)**
- Secure bridge between main and renderer processes
- Exposes electronAPI to renderer with contextBridge

**Key Features:**
- Recursive directory scanning (ignores node_modules)
- Maintains directory structure in archives
- TypeScript with strict mode enabled
- Modern Electron security practices (context isolation, no node integration in renderer)