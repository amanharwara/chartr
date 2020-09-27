import { writable } from "svelte/store";

// 1. album_collage (default)
// 2. spotify_top_tracks
// 3. spotify_top5_artists
let currentChartStyle = writable("album_collage");

let settingsVisible = writable(false);

// 1. itunes (default)
// 2. discogs
// 3. lastfm
let searchProvider = writable("itunes");

let settings = writable({
  spotifyToken: "",
  discogsToken: "",
  lastFmToken: "",
});

let current_list = writable([]);

let currentChartTitle = writable("Untitled Chart");

let albumCollageOptions = writable({
  showAlbumTitles: false,
  rows: 3,
  columns: 3,
  background: "#000",
  font: "Courier",
  gap: 5,
  padding: 7,
  fontColor: "#fff",
});

let spotifyOptions = writable({
  background: "#0E161E",
  foreground: "#D4FC79",
  time_range: "short_term",
  tracks_style: "top_10",
});

export {
  currentChartStyle,
  albumCollageOptions,
  currentChartTitle,
  spotifyOptions,
  settingsVisible,
  settings,
  current_list,
  searchProvider,
};
