const currentChartStyle = "album_collage";

const settingsVisible = false;

const searchProvider = "itunes";

const settings = {
  spotifyToken: "",
  discogsToken: "",
  lastFmUsername: "",
  resizableLayout: false,
};

const showAddAlbumModal = false;

const showBackupRestoreModal = false;

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

const currentChartId = "untitled-chart";

const currentAlbumCollageList = [];

const currentTierList = {
  tier_s: [],
  tier_a: [],
  tier_b: [],
  tier_c: [],
  tier_d: [],
  tier_e: [],
  tier_f: [],
};

const currentChartList = [
  {
    id: "untitled-chart",
    name: "Untitled Chart",
    albumCollageOptions,
    albumCollageList: currentAlbumCollageList,
    tierList: currentTierList,
    spotifyOptions,
    lastFmOptions,
  },
];

const defaults = {
  currentChartStyle,
  albumCollageOptions,
  spotifyOptions,
  settingsVisible,
  settings,
  searchProvider,
  lastFmOptions,
  showAddAlbumModal,
  showBackupRestoreModal,
  currentAlbumCollageList,
  currentTierList,
  currentChartId,
  currentChartList,
};

export default defaults;
