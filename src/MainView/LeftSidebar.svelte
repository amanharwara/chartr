<script>
  import {
    albumCollageOptions,
    currentChartStyle,
    currentChartTitle,
  } from "../store";
  import AlbumCollageOptions from "./AlbumCollageOptions.svelte";
  import SpotifyChartOptions from "./SpotifyCharts/SpotifyChartOptions.svelte";
  import ChartOption from "../shared/ChartOption.svelte";
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
</style>

<aside class="left-sidebar">
  <div class="heading">Chart Options:</div>

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
