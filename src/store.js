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

let screenWidth = writable(1280);

let showAddAlbumModal = writable(defaults.showAddAlbumModal);

let showBackupRestoreModal = writable(defaults.showBackupRestoreModal);

let addAlbumModalOptions = writable({});

let currentChartId = writable(defaults.currentChartId);

let currentChartList = writable(defaults.currentChartList);

export {
  currentChartStyle,
  settingsVisible,
  settings,
  searchProvider,
  screenWidth,
  showAddAlbumModal,
  addAlbumModalOptions,
  showBackupRestoreModal,
  currentChartId,
  currentChartList,
};
