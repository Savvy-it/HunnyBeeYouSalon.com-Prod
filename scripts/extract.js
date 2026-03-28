import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';

const zipFile = '/vercel/share/v0-project/hunny,-bee-you!-salon (2).zip';
const extractDir = '/vercel/share/v0-project/extracted';

// Create extraction directory
if (!existsSync(extractDir)) {
  mkdirSync(extractDir, { recursive: true });
}

// Extract the ZIP file
try {
  execSync(`unzip -o "${zipFile}" -d "${extractDir}"`, { stdio: 'inherit' });
  console.log('[v0] ZIP file extracted successfully');
  
  // List extracted contents
  const contents = execSync(`find "${extractDir}" -type f | head -100`, { encoding: 'utf-8' });
  console.log('[v0] Extracted files:');
  console.log(contents);
} catch (error) {
  console.error('[v0] Error extracting:', error.message);
}
