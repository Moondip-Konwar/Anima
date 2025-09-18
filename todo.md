# 📌 Todo Tasks

---

## 🐍 Python & Data

- [x] Create function to fetch anime list from API
- [ ] Integrate MyAnimeList (MAL) API
  - [ ] Handle authentication
  - [ ] Fetch user anime list
  - [ ] Sync progress with local data
- [ ] Implement `get_MAL_data()` helper
- [x] Implement `get_anime_info(anime_dir_name)`
- [x] Define JSON data storage structure
- [x] Store anime metadata locally:
  - [x] Titles
  - [x] Descriptions
  - [x] Ratings
  - [x] Images / thumbnails
  - [x] Genres, year, episode count
- [ ] Scan and add local animes to list
- [ ] Better error handling for python files

---

## 🎨 Svelte & Frontend

- [ ] Create `get_anime_info` UI component
- [ ] Implement video player component
  - [ ] Add resume/playback state saving
  - [ ] Add basic controls (seek, pause, fullscreen)
  - [ ] Subtitle support (planned)
- [ ] Add “Watching” tab for currently watched anime
- [x] Load anime library from JSON files instead of live API
- [ ] Merge all subtabs into a unified tab component
- [ ] Add MAL sync toggle in UI
- [ ] Proper & Better Navigation

---

## ⚙️ Others / General

- [x] Improve Todo.md styling & structure
- [ ] Test Tauri build process
  - [ ] Debug Python backend calls
  - [ ] Verify static assets work in packaged build
- [ ] Add project screenshots / demo GIFs to README
- [x] Setup `.gitignore` properly (`__pycache__`, build artifacts, etc.)
- [ ] Better docs for contributors
