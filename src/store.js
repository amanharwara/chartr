import { writable } from "svelte/store";
import defaults from "./defaults";

// 1. album_collage (default)
// 2. spotify_top_tracks
// 3. spotify_top5_artists
// 4. lastfm_top5
// 5. tier_list
let currentChartStyle = writable(defaults.currentChartStyle);

let settingsVisible = writable(defaults.settingsVisible);

// 1. itunes (default)
// 2. discogs
// 3. lastfm
// 4. test (only available during development)
let searchProvider = writable(defaults.searchProvider);

let settings = writable(defaults.settings);

let current_list = writable([...defaults.current_list]);

let current_tier_list = writable({ ...defaults.current_tier_list });

let currentChartTitle = writable(defaults.currentChartTitle);

let albumCollageOptions = writable({ ...defaults.albumCollageOptions });

let spotifyOptions = writable({ ...defaults.spotifyOptions });

let lastFmOptions = writable({ ...defaults.lastFmOptions });

let screenWidth = writable(1280);

let showAddAlbumModal = writable(defaults.showAddAlbumModal);

let showBackupRestoreModal = writable(defaults.showBackupRestoreModal);

let addAlbumModalOptions = writable({});

export {
  currentChartStyle,
  albumCollageOptions,
  currentChartTitle,
  spotifyOptions,
  settingsVisible,
  settings,
  current_list,
  current_tier_list,
  searchProvider,
  lastFmOptions,
  screenWidth,
  showAddAlbumModal,
  addAlbumModalOptions,
  showBackupRestoreModal,
};
