#!/bin/bash

# Extract the ZIP file
cd "$(dirname "$0")/.."
echo "[v0] Extracting project files..."
unzip -q -o "hunny,-bee-you!-salon (2).zip"
echo "[v0] Extraction complete"

# List the extracted files
echo "[v0] Project structure:"
ls -la

echo "[v0] Setup finished successfully"
