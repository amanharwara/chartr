<script>
  import { spotifyOptions } from "../../store";
  import ChartOption from "../../shared/ChartOption.svelte";
  export let style;
</script>

{#if style === 'spotify_top_tracks'}
  <ChartOption
    type="select"
    label="Style:"
    labelFor="spotify_tracks_style"
    bind:value={$spotifyOptions.tracks_style}>
    <option slot="select" value="top_5">Top 5</option>
    <option slot="select" value="top_10">Top 10</option>
  </ChartOption>
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
<ChartOption
  type="select"
  label="Time Range:"
  labelFor="time-range"
  bind:value={$spotifyOptions.time_range}>
  <option slot="select" value="short_term">Last 4 Weeks</option>
  <option slot="select" value="medium_term">Last 6 Months</option>
  <option slot="select" value="long_term">All Time</option>
</ChartOption>
