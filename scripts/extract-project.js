import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const zipPath = '/vercel/share/v0-project/hunny,-bee-you!-salon (2).zip';
const extractDir = '/vercel/share/v0-project/salon-project';

// Create extract directory
if (!fs.existsSync(extractDir)) {
  fs.mkdirSync(extractDir, { recursive: true });
}

try {
  // Use system unzip command
  console.log('[v0] Extracting ZIP file...');
  execSync(`unzip -q "${zipPath}" -d "${extractDir}"`, { stdio: 'inherit' });
  console.log('[v0] ZIP extraction complete');

  // List extracted contents
  console.log('[v0] Extracted files:');
  const files = execSync(`find "${extractDir}" -type f | head -20`).toString();
  console.log(files);

  console.log('[v0] Setup complete!');
} catch (error) {
  console.error('[v0] Error during extraction:', error.message);
  process.exit(1);
}
