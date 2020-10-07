const currentChartStyle = "album_collage";

const settingsVisible = false;

const searchProvider = "itunes";

const settings = {
  spotifyToken: "",
  discogsToken: "",
  lastFmUsername: "",
  resizableLayout: false,
};

const current_list = [];

const showAddAlbumModal = false;

const showBackupRestoreModal = false;

const current_tier_list = {
  tier_s: [],
  tier_a: [],
  tier_b: [],
  tier_c: [],
  tier_d: [],
  tier_e: [],
  tier_f: [],
};

const currentChartTitle = "Untitled Chart";

const albumCollageOptions = {
  showAlbumTitles: false,
  titlesBelowCover: false,
  allowEditTitles: false,
  rows: 3,
  columns: 3,
  background: "#000",
  font: "Inter",
  gap: 5,
  padding: 7,
  fontColor: "#fff",
};

const spotifyOptions = {
  background: "#0E161E",
  foreground: "#D4FC79",
  time_range: "short_term",
  tracks_style: "top_10",
};

const lastFmOptions = {
  background: "#070B0F",
  foreground: "#E84646",
  time_range: "overall",
  type: "albums",
};

const defaults = {
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
  showAddAlbumModal,
  showBackupRestoreModal,
};

export default defaults;
