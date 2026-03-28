#!/usr/bin/env python3
import zipfile
import os
import sys

# Find the ZIP file
zip_file = None
for file in os.listdir('/vercel/share/v0-project'):
    if file.endswith('.zip'):
        zip_file = os.path.join('/vercel/share/v0-project', file)
        break

if not zip_file:
    print("[v0] No ZIP file found")
    sys.exit(1)

print(f"[v0] Found ZIP file: {zip_file}")

try:
    with zipfile.ZipFile(zip_file, 'r') as zip_ref:
        # List contents first
        file_list = zip_ref.namelist()
        print(f"[v0] ZIP contains {len(file_list)} files")
        
        # Print first few files
        for i, file in enumerate(file_list[:20]):
            print(f"  {file}")
        
        # Extract to project root
        zip_ref.extractall('/vercel/share/v0-project')
        print("[v0] Extraction complete")
        
except Exception as e:
    print(f"[v0] Error during extraction: {e}")
    import traceback
    traceback.print_exc()
