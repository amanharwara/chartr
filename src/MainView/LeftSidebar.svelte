<script>
  import { currentChartStyle, screenWidth } from "../store";
  import AlbumCollageOptions from "./AlbumCollageOptions.svelte";
  import SpotifyChartOptions from "./SpotifyCharts/SpotifyChartOptions.svelte";
  import LastFmChartOptions from "./LastFmChart/LastFmChartOptions.svelte";
  import Select from "svelte-select";

  const chartStyleSelectItems = [
    { value: "album_collage", label: "Album Collage" },
    { value: "tier_list", label: "Tier List" },
    { value: "spotify_top_tracks", label: "Spotify: Top Tracks" },
    { value: "spotify_top5_artists", label: "Spotify: Top 5 Artists" },
    { value: "lastfm_top5", label: "Last.fm Top 5" },
  ];

  let chartStyle = chartStyleSelectItems.find(
    (item) => item.value === $currentChartStyle
  );

  $: $currentChartStyle = chartStyle.value ? chartStyle.value : chartStyle;
</script>

<style lang="scss">
  .left-sidebar {
    grid-row: 1 / 3;
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

  .chart-style-select {
    margin-bottom: 0.75rem;
  }

  @media screen and (min-width: 1367px) {
    .left-sidebar {
      padding: 0.5vw 0.75vw;
    }

    .chart-style-select {
      margin-bottom: 0.75vw;
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

<aside class="left-sidebar">
  <div class="heading">Chart Options:</div>

  <div class="chart-style-select">
    <Select
      bind:selectedValue={chartStyle}
      items={chartStyleSelectItems}
      isClearable={false}
      isSearchable={false}
      showIndicator={true}
      listAutoWidth={false}
      listPlacement="bottom"
      showChevron={true} />
  </div>

  {#if $currentChartStyle === 'album_collage'}
    <AlbumCollageOptions />
  {:else if $currentChartStyle === 'spotify_top5_artists' || $currentChartStyle === 'spotify_top_tracks'}
    <SpotifyChartOptions style={$currentChartStyle} />
  {:else if $currentChartStyle === 'lastfm_top5'}
    <LastFmChartOptions />
  {/if}
</aside>
