<script>
  import { currentChartStyle } from "../store";
  import AlbumCollageOptions from "./AlbumCollageOptions.svelte";
  import SpotifyChartOptions from "./SpotifyCharts/SpotifyChartOptions.svelte";
  import ChartOption from "../shared/ChartOption.svelte";

  let collapsed = false;

  const collapseIfMobile = () => {
    if (document.documentElement.clientWidth < 539) {
      collapsed = !collapsed;
    } else {
      collapsed = false;
    }
  };

  collapseIfMobile();
</script>

<style lang="scss">
  .left-sidebar {
    grid-row: 2 / 3;
    grid-column: 1 / 2;

    background: #11161c;
    padding: 0.5rem 0.75rem;

    overflow: auto;
    scrollbar-width: thin;
    scrollbar-color: dark;
  }

  .heading {
    margin-bottom: 0.75rem;
  }

  @media screen and (min-width: 1367px) {
    .left-sidebar {
      padding: 0.5vw 0.75vw;
    }
  }

  @media screen and (max-width: 539px) {
    .left-sidebar {
      grid-column: auto;
      grid-row: 3 / 4;
    }
  }

  @media screen and (min-width: 540px) and (max-width: 1024px) {
    .left-sidebar {
      grid-row: 3 / 4;
      grid-column: 1 / 2;
    }
  }
</style>

<aside class="left-sidebar" class:collapsed>
  <div class="heading" on:click={collapseIfMobile}>Chart Options:</div>

  <ChartOption
    type="select"
    label="Style:"
    labelFor="chart-style-select"
    bind:value={$currentChartStyle}>
    <option slot="select" value="album_collage">Album Collage</option>
    <option slot="select" value="album_top5">Top 5 Albums</option>
    <option slot="select" value="spotify_top5_artists">
      Spotify: Top 5 Artists
    </option>
    <option slot="select" value="spotify_top5_tracks">
      Spotify: Top 5 Tracks
    </option>
  </ChartOption>

  {#if $currentChartStyle === 'album_collage'}
    <AlbumCollageOptions />
  {:else if $currentChartStyle === 'spotify_top5_artists' || $currentChartStyle === 'spotify_top5_tracks'}
    <SpotifyChartOptions />
  {/if}
</aside>
