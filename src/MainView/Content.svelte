<script>
  import { currentChartStyle } from "../store";
  import AlbumCollage from "./AlbumCollage.svelte";
  import SpotifyTop5Artists from "./SpotifyCharts/SpotifyTop5Artists.svelte";
  import SpotifyTopTracks from "./SpotifyCharts/SpotifyTopTracks.svelte";

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

  @media screen and (max-width: 539px) {
    .content {
      height: 100%;
      grid-column: auto;
      grid-row: 2 / 3;
    }
  }

  @media screen and (min-width: 540px) and (max-width: 1024px) {
    .content {
      grid-column: 1 / 3;
    }
  }
</style>

<main class="content" class:center_content>
  {#if $currentChartStyle === 'album_collage'}
    <AlbumCollage />
  {:else if $currentChartStyle === 'spotify_top5_artists'}
    <SpotifyTop5Artists />
  {:else if $currentChartStyle === 'spotify_top_tracks'}
    <SpotifyTopTracks />
  {:else if $currentChartStyle.includes('spotify')}
    Please connect your Spotify account in the settings.
  {/if}
</main>
