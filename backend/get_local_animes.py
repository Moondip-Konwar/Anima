import os
from natsort import natsorted
from utils import get_args, send_result

def main():
    try:
        root_folder, = get_args()  # unpack 1 arg
        anime_data = {}

        for anime_dir in os.listdir(root_folder):
            anime_folder_path = os.path.join(root_folder, anime_dir)

            # Only process directories
            if not os.path.isdir(anime_folder_path):
                continue

            try:
                episodes = natsorted(os.listdir(anime_folder_path))
            except PermissionError:
                # Skip dirs we can’t access (like /lost+found)
                continue

            anime_data[anime_dir] = [ep for ep in episodes if os.path.isfile(os.path.join(anime_folder_path, ep))]

        send_result({"status": "ok", "data": anime_data})

    except Exception as e:
        send_result({
            "status": "error",
            "message": str(e),
            "type": type(e).__name__,
        })

if __name__ == "__main__":
    main()
