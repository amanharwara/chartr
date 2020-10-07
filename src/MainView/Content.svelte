<script>
  import { currentChartStyle, screenWidth, showAddAlbumModal } from "../store";
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

  @media screen and (max-width: 539px) {
    .content {
      height: 100%;
    }
  }

  @media screen and (min-width: 540px) and (max-width: 1024px) {
    .content {
      grid-column: 1 / 4;
    }
  }
</style>

<main class="content" class:center_content>
  {#if $currentChartStyle === 'album_collage'}
    <AlbumCollage />
  {:else if $currentChartStyle === 'tier_list'}
    {#if $screenWidth < 539}
      <div style="margin-bottom: 0.5rem">
        You can click on any tier letter or empty space to add an album.
      </div>
    {/if}
    <TierList />
  {:else if $currentChartStyle === 'spotify_top5_artists'}
    <SpotifyTop5Artists />
  {:else if $currentChartStyle === 'spotify_top_tracks'}
    <SpotifyTopTracks />
  {:else if $currentChartStyle === 'lastfm_top5'}
    <LastFmChart />
  {/if}
</main>

{#if $screenWidth < 539}
  <AddAlbumModal />
{/if}
