import { writable } from "svelte/store";

let currentChartStyle = writable("album_collage");

let settingsVisible = writable(false);

let settings = writable({
  spotifyToken: "",
  discogsToken: "",
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
});

let spotifyOptions = writable({
  background: "#0E161E",
  foreground: "#D4FC79",
  time_range: "short_term",
});

export {
  currentChartStyle,
  albumCollageOptions,
  currentChartTitle,
  spotifyOptions,
  settingsVisible,
  settings,
  current_list,
};
