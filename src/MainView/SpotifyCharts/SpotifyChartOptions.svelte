<script>
  import { spotifyOptions } from "../../store";
  import ChartOption from "../../shared/ChartOption.svelte";
  import Select from "svelte-select";
  export let style;

  const tracksStyleItems = [
    { value: "top_5", label: "Top 5" },
    { value: "top_10", label: "Top 10" },
  ];

  let tracksStyle = tracksStyleItems.find(
    (item) => item.value === $spotifyOptions.tracks_style
  );

  $: $spotifyOptions.tracks_style = tracksStyle.value
    ? tracksStyle.value
    : tracksStyle;

  const timeRangeItems = [
    { value: "short_term", label: "Last 4 Weeks" },
    { value: "medium_term", label: "Last 6 Months" },
    { value: "long_term", label: "All Time" },
  ];

  let timeRange = timeRangeItems.find(
    (item) => item.value === $spotifyOptions.time_range
  );

  $: $spotifyOptions.time_range = timeRange.value ? timeRange.value : timeRange;
</script>

<style lang="scss">
  .tracks_style_select {
    margin-bottom: 0.75rem;
  }
</style>

{#if style === 'spotify_top_tracks'}
  <div class="tracks_style_select">
    <label for="tracks_style">Style:</label>
    <Select
      bind:selectedValue={tracksStyle}
      items={tracksStyleItems}
      inputAttributes={{ id: 'tracks_style' }}
      isClearable={false}
      isSearchable={false}
      showIndicator={true}
      listAutoWidth={false}
      showChevron={true} />
  </div>
{/if}
<ChartOption
  type="text"
  label="Background:"
  labelFor="bg-color"
  bind:value={$spotifyOptions.background} />
<ChartOption
  type="text"
  label="Foreground:"
  labelFor="fg-color"
  bind:value={$spotifyOptions.foreground} />
<div class="time_range_select">
  <label for="time_range">Time Range:</label>
  <Select
    bind:selectedValue={timeRange}
    items={timeRangeItems}
    inputAttributes={{ id: 'time_range' }}
    isClearable={false}
    isSearchable={false}
    showIndicator={true}
    listAutoWidth={false}
    showChevron={true} />
</div>
