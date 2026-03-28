#!/bin/bash
set -e

# Find and extract the ZIP file
ZIP_FILE=$(find /vercel/share/v0-project -maxdepth 1 -name "*.zip" -type f | head -1)

if [ -z "$ZIP_FILE" ]; then
  echo "No ZIP file found!"
  exit 1
fi

echo "Found ZIP file: $ZIP_FILE"
echo "Extracting..."

# Extract to root directory
cd /vercel/share/v0-project
unzip -o "$ZIP_FILE" -d /tmp/extracted

# Move all contents from extracted directory to project root
if [ -d "/tmp/extracted" ]; then
  # Find the main project directory (usually one level deep in the ZIP)
  if [ -d "/tmp/extracted"/*/ ]; then
    # Copy everything from the nested directory
    cp -r "/tmp/extracted"/*/* /vercel/share/v0-project/ 2>/dev/null || true
  else
    # Copy everything from root of extraction
    cp -r "/tmp/extracted"/* /vercel/share/v0-project/ 2>/dev/null || true
  fi
  rm -rf /tmp/extracted
fi

echo "Extraction complete!"
ls -la /vercel/share/v0-project/ | head -20
