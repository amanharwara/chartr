import { writable } from "svelte/store";

// 1. album_collage (default)
// 2. spotify_top_tracks
// 3. spotify_top5_artists
// 4. lastfm_top5
let currentChartStyle = writable("album_collage");

let settingsVisible = writable(false);

// 1. itunes (default)
// 2. discogs
// 3. lastfm
// 4. test (only available during development)
let searchProvider = writable("itunes");

let settings = writable({
  spotifyToken: "",
  discogsToken: "",
  lastFmUsername: "",
});

let current_list = writable([]);

let currentChartTitle = writable("Untitled Chart");

let albumCollageOptions = writable({
  showAlbumTitles: false,
  titlesBelowCover: false,
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

let lastFmOptions = writable({
  background: "#070B0F",
  foreground: "#E84646",
  time_range: "overall", // overall | 7day | 1month | 3month | 6month | 12month
  type: "albums", // artists | tracks | albums
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
  lastFmOptions,
};
