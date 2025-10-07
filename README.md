# Anima

#### An offline anime library & player built with Tauri + SvelteKit + Python.  
The full version is still in early development and incomplete, but for a lightweight, mostly complete Python-native alternative, check out [Anima Lite](https://github.com/Moondip-Konwar/anima-lite).

If you find this project useful, a star would be greatly appreciated ⭐

## Features
*Not all of the mentioned features are implemented yet*
* Organize and browse your **local anime collection** with a clean Netflix-style UI.
* **MAL sync support** (optional): update your watch progress and metadata.
* **Video playback with resume**: remembers your last watched position per episode.
* Stores metadata (titles, posters, etc.) locally for smooth offline browsing.
* Supports categories, filters, and multiple anime libraries.

## Future improvements

* Remote/TV navigation support.
* External subtitle integration.
* More advanced filtering and discovery.
* Deeper MAL integration (auto sync, stats).

## Requirements

* **Node.js** (v18+)
* **npm** or **yarn**
* **Python** (v3.10+) for backend scripts
* **Tauri prerequisites** (Rust, Cargo, etc.)

## Commands to run

### Run project locally (frontend + backend)

```bash
npm install
npm run dev
```

### Run desktop app (Tauri)

```bash
npm run tauri dev
```

### Build desktop app (production)

```bash
npm run tauri build
```

> Output will go to the folder you configured (e.g., `../build`)

## Folder structure

```
anima/
├── src/              # Frontend (SvelteKit)
├── backend/          # Python backend (scanning, metadata, MAL sync)
├── data/             # JSON files storing library + metadata
└── static/           # Static assets (favicon, CSS, fonts)
```

## How it looks

*Work-in-progress screenshots coming soon…*

