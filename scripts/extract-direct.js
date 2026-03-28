import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const zipPath = '/vercel/share/v0-project/hunny,-bee-you!-salon (2).zip';
const targetDir = '/vercel/share/v0-project';

try {
  console.log('[v0] Extracting ZIP file...');
  
  // Use unzip command to extract
  execSync(`cd "${targetDir}" && unzip -q "${zipPath}" && mv "hunny,-bee-you!-salon"/* . 2>/dev/null || true`, { 
    stdio: 'inherit',
    shell: '/bin/bash'
  });
  
  console.log('[v0] Extraction complete!');
  console.log('[v0] Listing extracted files...');
  
  const files = execSync(`find "${targetDir}" -maxdepth 2 -type f -name "*.json" -o -name "*.tsx" -o -name "*.ts" | head -20`, {
    encoding: 'utf-8'
  });
  
  console.log(files);
  
} catch (error) {
  console.error('[v0] Error during extraction:', error.message);
  process.exit(1);
}
