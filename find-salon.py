#!/usr/bin/env python3
import os
import zipfile

# Find the salon ZIP specifically
print("[v0] Looking for salon project ZIP...")

# Search from root
for root, dirs, files in os.walk('/root'):
    for f in files:
        if 'salon' in f.lower() and f.endswith('.zip'):
            zip_path = os.path.join(root, f)
            print(f"[v0] Found: {zip_path}")
            
            try:
                with zipfile.ZipFile(zip_path, 'r') as z:
                    files_list = z.namelist()
                    print(f"[v0] Contains {len(files_list)} files")
                    print("[v0] Extracting...")
                    z.extractall(root)
                    print(f"[v0] Extracted to {root}")
                    
                    # List what was extracted
                    print("[v0] Extracted structure:")
                    for item in files_list[:15]:
                        print(f"  {item}")
            except Exception as e:
                print(f"[v0] Error: {e}")
            break
    break
