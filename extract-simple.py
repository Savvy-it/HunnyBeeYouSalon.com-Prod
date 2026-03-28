#!/usr/bin/env python3
import os
import zipfile

print(f"[v0] Current directory: {os.getcwd()}")
print(f"[v0] Directory exists: {os.path.exists(os.getcwd())}")

# List all files in current directory
files = os.listdir('.')
print(f"[v0] Files in current directory: {len(files)}")
for f in files[:10]:
    print(f"  {f}")

# Find ZIP file
zip_file = None
for file in files:
    if file.endswith('.zip'):
        zip_file = file
        print(f"[v0] Found ZIP file: {zip_file}")
        break

if zip_file:
    try:
        with zipfile.ZipFile(zip_file, 'r') as zip_ref:
            file_list = zip_ref.namelist()
            print(f"[v0] ZIP contains {len(file_list)} files")
            
            # Extract
            zip_ref.extractall('.')
            print("[v0] Extraction complete")
    except Exception as e:
        print(f"[v0] Error: {e}")
else:
    print("[v0] No ZIP file found")
