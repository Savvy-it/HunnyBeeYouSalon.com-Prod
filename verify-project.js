#!/usr/bin/env node

/**
 * Project Assembly Verification Script
 * Verifies all required files are in place for the salon web project
 */

const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

const checks = {
  passed: `${colors.green}✓${colors.reset}`,
  failed: `${colors.red}✗${colors.reset}`,
  warning: `${colors.yellow}⚠${colors.reset}`,
};

function fileExists(filePath) {
  return fs.existsSync(path.join(projectRoot, filePath));
}

function printHeader(text) {
  console.log(`\n${colors.blue}${text}${colors.reset}`);
  console.log(`${colors.blue}${'-'.repeat(text.length)}${colors.reset}\n`);
}

function checkFile(filePath, category = '') {
  const exists = fileExists(filePath);
  const status = exists ? checks.passed : checks.failed;
  const catStr = category ? `[${category}] ` : '';
  console.log(`${status} ${catStr}${filePath}`);
  return exists;
}

function main() {
  console.log(`${colors.blue}${'='.repeat(50)}${colors.reset}`);
  console.log(`${colors.blue}  Hunny, bee you! Salon Web - Project Verification${colors.reset}`);
  console.log(`${colors.blue}${'='.repeat(50)}${colors.reset}`);

  let totalChecks = 0;
  let passedChecks = 0;

  // Core Source Files
  printHeader('Core Source Files');
  const coreFiles = [
    'src/App.tsx',
    'src/main.tsx',
    'src/types.ts',
    'src/supabase.ts',
    'src/sampleData.ts',
    'src/index.css',
    'src/vite-env.d.ts'
  ];
  coreFiles.forEach(file => {
    totalChecks++;
    if (checkFile(file, 'CORE')) passedChecks++;
  });

  // Service Files
  printHeader('Service Integration Files');
  const serviceFiles = [
    'src/services/geminiService.ts',
    'src/services/emailService.ts'
  ];
  serviceFiles.forEach(file => {
    totalChecks++;
    if (checkFile(file, 'SERVICE')) passedChecks++;
  });

  // Configuration Files
  printHeader('Configuration Files');
  const configFiles = [
    'package.json',
    'tsconfig.json',
    'vite.config.ts',
    'vercel.json',
    'index.html',
    '.env.local',
    '.gitignore'
  ];
  configFiles.forEach(file => {
    totalChecks++;
    if (checkFile(file, 'CONFIG')) passedChecks++;
  });

  // Documentation Files
  printHeader('Documentation Files');
  const docFiles = [
    'README.md',
    'SETUP_GUIDE.md',
    'DEPLOYMENT_CHECKLIST.md',
    'DEPLOYMENT.md',
    'PROJECT_SUMMARY.md',
    'QUICK_REFERENCE.md'
  ];
  docFiles.forEach(file => {
    totalChecks++;
    if (checkFile(file, 'DOCS')) passedChecks++;
  });

  // Database Schema
  printHeader('Database Files');
  totalChecks++;
  if (checkFile('supabase-setup.sql', 'DB')) passedChecks++;

  // Summary
  printHeader('Verification Summary');
  const percentage = Math.round((passedChecks / totalChecks) * 100);
  const statusColor = percentage === 100 ? colors.green : colors.yellow;
  
  console.log(`Total Checks: ${totalChecks}`);
  console.log(`Passed: ${colors.green}${passedChecks}${colors.reset}`);
  console.log(`Failed: ${passedChecks === totalChecks ? colors.green : colors.red}${totalChecks - passedChecks}${colors.reset}`);
  console.log(`\nCompletion: ${statusColor}${percentage}%${colors.reset}`);

  if (passedChecks === totalChecks) {
    printHeader(`${colors.green}✓ All checks passed! Ready to deploy.${colors.reset}`);
    console.log('\nNext steps:');
    console.log('  1. npm install');
    console.log('  2. npm run dev');
    console.log('  3. Open http://localhost:3000');
    console.log('\nFor deployment, see: DEPLOYMENT_CHECKLIST.md\n');
    process.exit(0);
  } else {
    printHeader(`${colors.yellow}⚠ Some checks failed. Please review above.${colors.reset}\n`);
    process.exit(1);
  }
}

main();
