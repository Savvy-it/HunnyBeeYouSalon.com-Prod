#!/usr/bin/env python3
import os
import zipfile

# Try multiple possible paths
possible_paths = [
    os.getcwd(),
    '/home/user',
    os.path.expanduser('~'),
    '/vercel/share',
    '/tmp'
]

print("[v0] Searching for project...")
for path in possible_paths:
    if os.path.exists(path):
        files = os.listdir(path)
        zip_files = [f for f in files if f.endswith('.zip')]
        if zip_files:
            print(f"[v0] Found ZIP files in {path}:")
            for zf in zip_files:
                print(f"  {zf}")
            
            # Try to extract
            for zf in zip_files:
                zip_path = os.path.join(path, zf)
                try:
                    print(f"[v0] Extracting {zf}...")
                    with zipfile.ZipFile(zip_path, 'r') as z:
                        z.extractall(path)
                    print(f"[v0] Successfully extracted to {path}")
                except Exception as e:
                    print(f"[v0] Error extracting: {e}")
            break
