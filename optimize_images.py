import os
import glob
from PIL import Image
import pillow_heif

# Register HEIF opener
pillow_heif.register_heif_opener()

def optimize_images(src_dir, dest_dir):
    if not os.path.exists(dest_dir):
        os.makedirs(dest_dir)

    # find all image files
    extensions = ('*.jpg', '*.jpeg', '*.png', '*.heic', '*.HEIC', '*.JPG', '*.JPEG', '*.PNG')
    files = []
    for ext in extensions:
        files.extend(glob.glob(os.path.join(src_dir, '**', ext), recursive=True))

    print(f"Found {len(files)} image files to process.")

    for idx, file_path in enumerate(files):
        try:
            # maintain subfolder structure based on session name
            # The structure is temp_drive_download/SmartSphere Club/Session X/Photos/file.jpg
            parts = file_path.split(os.sep)
            try:
                club_index = parts.index("SmartSphere Club")
                session_name = parts[club_index + 1]
            except ValueError:
                session_name = "Misc"

            session_dest_dir = os.path.join(dest_dir, session_name)
            if not os.path.exists(session_dest_dir):
                os.makedirs(session_dest_dir)

            base_name = os.path.splitext(os.path.basename(file_path))[0]
            dest_file_path = os.path.join(session_dest_dir, f"{base_name}.webp")

            if os.path.exists(dest_file_path):
                continue

            with Image.open(file_path) as img:
                # Convert to RGB if necessary (e.g. RGBA for PNG)
                if img.mode in ("RGBA", "P", "CMYK"):
                    img = img.convert("RGB")
                
                # Resize if too large (max width/height 1200)
                max_size = (1200, 1200)
                img.thumbnail(max_size, Image.Resampling.LANCZOS)
                
                # Save as webp with optimization
                img.save(dest_file_path, "WEBP", quality=80, optimize=True)
                print(f"Optimized [{idx+1}/{len(files)}] {file_path} -> {dest_file_path}")
        except Exception as e:
            print(f"Error optimizing {file_path}: {e}")

    # Generate manifest for the React app
    import json
    manifest = {}
    for root, dirs, f in os.walk(dest_dir):
        session_folder = os.path.basename(root)
        if session_folder == os.path.basename(dest_dir): continue
        webp_files = [file for file in f if file.endswith('.webp')]
        if webp_files:
            manifest[session_folder] = webp_files
            
    manifest_path = os.path.join(os.getcwd(), 'src', 'data', 'sessions_manifest.json')
    os.makedirs(os.path.dirname(manifest_path), exist_ok=True)
    with open(manifest_path, 'w') as f_out:
        json.dump(manifest, f_out, indent=2)
    print(f"Generated manifest at {manifest_path}")

if __name__ == '__main__':
    src = os.path.join(os.getcwd(), 'temp_drive_download')
    dest = os.path.join(os.getcwd(), 'public', 'images', 'sessions')
    optimize_images(src, dest)
