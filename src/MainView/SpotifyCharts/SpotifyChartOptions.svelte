<script>
  import { spotifyOptions } from "../../store";
  import ChartOption from "../../shared/ChartOption.svelte";
</script>

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
  labelFor="fg-color"
  bind:value={$spotifyOptions.time_range}>
  <option slot="select" value="short_term">Last 4 Weeks</option>
  <option slot="select" value="medium_term">Last 6 Months</option>
  <option slot="select" value="long_term">All Time</option>
</ChartOption>
