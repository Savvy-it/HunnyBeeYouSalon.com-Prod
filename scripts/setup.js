import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import AdmZip from 'adm-zip';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

console.log('[v0] Starting project setup...');

try {
  // Find the ZIP file
  const zipPath = path.join(projectRoot, 'hunny,-bee-you!-salon (2).zip');
  
  if (!fs.existsSync(zipPath)) {
    console.error('[v0] ZIP file not found');
    process.exit(1);
  }

  console.log('[v0] Found ZIP file, extracting...');
  const zip = new AdmZip(zipPath);
  
  // Extract to project root
  zip.extractAllTo(projectRoot, true);
  
  console.log('[v0] Extraction complete');
  
  // List extracted files
  const files = fs.readdirSync(projectRoot);
  console.log('[v0] Directory contents:', files);
  
} catch (error) {
  console.error('[v0] Setup error:', error.message);
  process.exit(1);
}
