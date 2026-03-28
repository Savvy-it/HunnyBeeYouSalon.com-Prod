import zipfile
import os
import shutil

zip_path = "hunny,-bee-you!-salon (2).zip"
extract_to = "."

print("[v0] Starting ZIP extraction...")

try:
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        # List all files first
        file_list = zip_ref.namelist()
        print(f"[v0] Found {len(file_list)} files in ZIP")
        
        # Extract all files
        zip_ref.extractall(extract_to)
        print(f"[v0] Extracted to: {extract_to}")
        
        # List extracted directories
        for item in os.listdir("."):
            if os.path.isdir(item) and not item.startswith('.'):
                print(f"[v0] Directory: {item}")
        
        print("[v0] Extraction complete!")
        
except Exception as e:
    print(f"[v0] Error: {e}")
