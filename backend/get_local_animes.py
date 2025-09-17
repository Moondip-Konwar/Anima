import os

from natsort import natsorted
from utils import get_args, send_result

# python3 getLocalAnimes.py folders[]


def main():
    args = get_args()
    anime_container_folders: list = args[0]
    animes: dict[str, list] = {}
    # animes = { "Naruto": ["/abs/path/to/ep1.mp4", "/abs/path/to/ep2.mp4"], ... }

    for anime_container_folder in anime_container_folders:
        anime_folders = os.listdir(anime_container_folder)
        for anime_folder in anime_folders:
            anime_folder_path = os.path.join(anime_container_folder, anime_folder)
            episodes = [
                os.path.abspath(os.path.join(anime_folder_path, ep))
                for ep in natsorted(os.listdir(anime_folder_path))
            ]
            animes[anime_folder] = episodes  # ✅ key = folder name only

    send_result(animes)


if __name__ == "__main__":
    main()
