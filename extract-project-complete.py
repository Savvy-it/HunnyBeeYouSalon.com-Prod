#!/usr/bin/env python3
import zipfile
import os
import shutil

zip_file = '/vercel/share/v0-project/hunny,-bee-you!-salon (2).zip'
extract_dir = '/vercel/share/v0-project'

print("[v0] Starting ZIP extraction...")

try:
    # Extract ZIP file
    with zipfile.ZipFile(zip_file, 'r') as zip_ref:
        zip_ref.extractall(extract_dir)
    print("[v0] ZIP extraction completed successfully")
    
    # List extracted files
    for root, dirs, files in os.walk(extract_dir):
        level = root.replace(extract_dir, '').count(os.sep)
        indent = ' ' * 2 * level
        print(f'{indent}{os.path.basename(root)}/')
        subindent = ' ' * 2 * (level + 1)
        for file in files[:5]:  # Show first 5 files per directory
            print(f'{subindent}{file}')
        if len(files) > 5:
            print(f'{subindent}... and {len(files) - 5} more files')
            
except Exception as e:
    print(f"[v0] Error during extraction: {e}")
    import traceback
    traceback.print_exc()
