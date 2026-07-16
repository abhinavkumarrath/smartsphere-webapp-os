import os
import requests
import subprocess
from pathlib import Path

API_KEY = "AIzaSyA2cHUAZJnPgZl4jwA4NLnrryZ_kc4-7bU"
ROOT_FOLDER_ID = "1id9oryx_QlQISRzUMJXwKfILdYuL1Q-j"
DOWNLOAD_ROOT = os.path.join(os.getcwd(), 'temp_drive_download', 'SmartSphere Club')

def get_files_in_folder(folder_id):
    url = f"https://www.googleapis.com/drive/v3/files"
    params = {
        "key": API_KEY,
        "q": f"'{folder_id}' in parents and trashed = false",
        "fields": "nextPageToken, files(id, name, mimeType)",
        "pageSize": 1000
    }
    
    files = []
    while True:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        files.extend(data.get("files", []))
        
        if "nextPageToken" in data:
            params["pageToken"] = data["nextPageToken"]
        else:
            break
            
    return files

def download_file(file_id, dest_path):
    url = f"https://www.googleapis.com/drive/v3/files/{file_id}"
    params = {
        "key": API_KEY,
        "alt": "media"
    }
    response = requests.get(url, params=params, stream=True)
    if response.status_code == 200:
        with open(dest_path, "wb") as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        return True
    else:
        print(f"Failed to download {file_id}: {response.text}")
        return False

def sync_folder(folder_id, local_path, is_web_folder=False):
    if not os.path.exists(local_path):
        os.makedirs(local_path)
        
    print(f"Scanning folder: {local_path}")
    items = get_files_in_folder(folder_id)
    
    for item in items:
        folder_name = item["name"].strip()
        item_path = os.path.join(local_path, folder_name)
        
        if item["mimeType"] == "application/vnd.google-apps.folder":
            is_sub_web = (folder_name.lower() == "web")
            # If we are already in a web folder, all subfolders are also treated as web folders
            sync_folder(item["id"], item_path, is_web_folder=(is_web_folder or is_sub_web))
        else:
            if not is_web_folder:
                continue
                
            # To save time, we only download if it doesn't exist
            if not os.path.exists(item_path):
                print(f"Downloading new file: {item['name']} to {item_path}")
                download_file(item["id"], item_path)
            else:
                pass # File already exists locally, skip to save time and bandwidth

if __name__ == "__main__":
    print("=======================================")
    print("Starting Google Drive Sync...")
    print("=======================================")
    try:
        sync_folder(ROOT_FOLDER_ID, DOWNLOAD_ROOT)
        print("\n=======================================")
        print("Sync complete! Running optimize_images.py...")
        print("=======================================")
        subprocess.run(["python", "optimize_images.py"], check=True)
        print("\n=======================================")
        print("All done! Your new photos are ready and optimized.")
        print("=======================================")
    except Exception as e:
        print(f"\nError during sync: {e}")
