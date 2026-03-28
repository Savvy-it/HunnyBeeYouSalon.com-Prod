#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

// Create all necessary directories
const dirs = [
  'src',
  'src/services',
  'src/components',
  'public'
];

dirs.forEach(dir => {
  const fullPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

console.log('Project directory structure created successfully!');
