<script>
  import { currentChartStyle } from "../store";
  import AlbumCollage from "./AlbumCollage.svelte";
  import SpotifyTop5Artists from "./SpotifyCharts/SpotifyTop5Artists.svelte";
  import SpotifyTop5Tracks from "./SpotifyCharts/SpotifyTop5Tracks.svelte";

  let center_content = false;

  $: {
    switch ($currentChartStyle) {
      case "spotify_top5_artists":
        center_content = true;
        break;
      case "spotify_top5_tracks":
        center_content = true;
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
    grid-row: 2 / 3;

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

  @media screen and (max-width: 425px) {
    .content {
      display: block;
      height: 100%;
    }
  }
</style>

<main class="content" class:center_content>
  {#if $currentChartStyle === 'album_collage'}
    <AlbumCollage />
  {:else if $currentChartStyle === 'spotify_top5_artists'}
    <SpotifyTop5Artists />
  {:else if $currentChartStyle === 'spotify_top5_tracks'}
    <SpotifyTop5Tracks />
  {:else if $currentChartStyle.includes('spotify')}
    Please connect your Spotify account in the settings.
  {/if}
</main>
