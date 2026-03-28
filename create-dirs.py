#!/usr/bin/env python3
import os
import json

project_root = '/vercel/share/v0-project'
os.chdir(project_root)

# Create directory structure
dirs = [
    'src',
    'src/services',
    'src/components',
    'src/hooks',
    'src/utils',
    'public'
]

for dir_path in dirs:
    os.makedirs(dir_path, exist_ok=True)
    print(f"[v0] Created directory: {dir_path}")

# List created directories
print("\n[v0] Directory structure created:")
for root, dirs_list, files in os.walk('src'):
    level = root.replace('src', '').count(os.sep)
    indent = ' ' * 2 * level
    print(f"{indent}{os.path.basename(root)}/")

print("[v0] Setup complete!")
