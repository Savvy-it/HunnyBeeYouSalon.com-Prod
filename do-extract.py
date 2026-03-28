#!/usr/bin/env python3
import os
import zipfile
import sys

# The project root based on context
project_root = '/vercel/share/v0-project'

print(f"[v0] Project root: {project_root}")
print(f"[v0] Project root exists: {os.path.exists(project_root)}")

os.chdir(project_root)
print(f"[v0] Changed to: {os.getcwd()}")

# List files
files = os.listdir('.')
print(f"[v0] Files in project: {len(files)}")

# Find ZIP
zip_file = None
for file in files:
    if file.endswith('.zip'):
        zip_file = file
        print(f"[v0] Found ZIP: {zip_file}")
        break

if zip_file and os.path.exists(zip_file):
    print(f"[v0] ZIP file path exists: {os.path.exists(zip_file)}")
    try:
        with zipfile.ZipFile(zip_file, 'r') as zip_ref:
            file_list = zip_ref.namelist()
            print(f"[v0] ZIP contains {len(file_list)} files")
            print("[v0] First 10 files:")
            for f in file_list[:10]:
                print(f"  {f}")
            
            # Extract
            print("[v0] Extracting...")
            zip_ref.extractall('.')
            print("[v0] Extraction complete!")
    except Exception as e:
        print(f"[v0] Error: {e}")
        import traceback
        traceback.print_exc()
else:
    print("[v0] ZIP file not found")
