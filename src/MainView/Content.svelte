<script>
  import { currentChartStyle } from "../store";
  import AlbumCollage from "./AlbumCollage.svelte";
  import LastFmChart from "./LastFmChart/LastFmChart.svelte";
  import SpotifyTop5Artists from "./SpotifyCharts/SpotifyTop5Artists.svelte";
  import SpotifyTopTracks from "./SpotifyCharts/SpotifyTopTracks.svelte";
  import TierList from "./TierList/TierList.svelte";
  import AddAlbumModal from "./AddAlbumModal.svelte";

  let center_content = false;

  $: {
    switch ($currentChartStyle) {
      case "spotify_top5_artists":
        center_content =
          document.documentElement.clientWidth < 500 ? false : true;
        break;
      case "spotify_top_tracks":
        center_content =
          document.documentElement.clientWidth < 500 ? false : true;
        break;
      case "lastfm_top5":
        center_content =
          document.documentElement.clientWidth < 500 ? false : true;
        break;
      default:
        center_content = false;
        break;
    }
  }
</script>

<style lang="scss">
  .content {
    grid-column: 2 / 3;
    grid-row: 1 / 3;

    padding: 1rem;

    box-sizing: border-box;
    overflow: auto;

    &.center_content {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
    }
  }

  .album-collage-hotkeys {
    margin: 1vw 0;

    span:last-child {
      display: inline-block;
      margin-top: 0.5vw;
    }
  }

  .tier-list-message {
    display: none;
  }

  @media screen and (max-width: 539px) {
    .content {
      height: 100%;
      height: max-content;
      max-height: max-content;
    }
    .tier-list-message {
      display: block;
    }
    .album-collage-hotkeys {
      display: none;
    }
  }

  @media screen and (min-width: 540px) and (max-width: 1024px) {
    .content {
      grid-column: 1 / 4;
    }
  }
</style>

<main class="content" class:center_content>
  {#if $currentChartStyle === 'album_collage' || $currentChartStyle === 'lastfm_collage'}
    <AlbumCollage />
    <div class="album-collage-hotkeys">
      <span>Use <kbd>Shift</kbd>+<kbd>Click</kbd> on an empty tile to manually add album details.</span>
      <span>Use
        <kbd>↑</kbd>
        /
        <kbd>↓</kbd>
        /
        <kbd>←</kbd>
        /
        <kbd>→</kbd>
        to select any item.</span>
      <span>Use
        <kbd>Ctrl</kbd>+
        <kbd>↑</kbd>
        /
        <kbd>↓</kbd>
        /
        <kbd>←</kbd>
        /
        <kbd>→</kbd>
        to move any selected item.</span>
      <br />
      <span>Use <kbd>Del</kbd> to delete any selected item.</span>
    </div>
  {:else if $currentChartStyle === 'tier_list'}
    <div class="tier-list-message" style="margin-bottom: 0.5rem">
      You can click on any tier letter or empty space to add an album.
    </div>
    <TierList />
  {:else if $currentChartStyle === 'spotify_top5_artists'}
    <SpotifyTop5Artists />
  {:else if $currentChartStyle === 'spotify_top_tracks'}
    <SpotifyTopTracks />
  {:else if $currentChartStyle === 'lastfm_top5'}
    <LastFmChart />
  {/if}
</main>
<AddAlbumModal />
