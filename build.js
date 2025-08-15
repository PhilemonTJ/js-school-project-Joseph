#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Building Timeline App...');

try {
  // Clean dist directory
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true });
    console.log('✅ Cleaned dist directory');
  }

  // Compile TypeScript
  console.log('📝 Compiling TypeScript...');
  execSync('npx tsc', { stdio: 'inherit' });
  console.log('✅ TypeScript compilation complete');

  // Copy static files to dist
  console.log('📁 Copying static files...');
  
  // Create dist directory if it doesn't exist
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
  }

  // Copy CSS
  fs.copyFileSync('styles.css', 'dist/styles.css');
  console.log('✅ Copied styles.css');

  // Copy data directory
  if (fs.existsSync('data')) {
    fs.cpSync('data', 'dist/data', { recursive: true });
    console.log('✅ Copied data directory');
  }

  console.log('🎉 Build complete! Files are ready in dist/');
  console.log('💡 Run "npm run dev" to start the development server');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
} 