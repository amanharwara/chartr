<script>
  import ChartOption from "../../shared/ChartOption.svelte";
  import { lastFmOptions } from "../../store";
</script>

<ChartOption
  type="select"
  label="Type:"
  labelFor="lastfm_chart_type"
  bind:value={$lastFmOptions.type}>
  <option slot="select" value="albums">Albums</option>
  <option slot="select" value="tracks">Tracks</option>
  <option slot="select" value="artists">Artists</option>
</ChartOption>
<ChartOption
  type="select"
  label="Time Range:"
  labelFor="time-range"
  bind:value={$lastFmOptions.time_range}>
  <option slot="select" value="overall">Overall</option>
  <option slot="select" value="7day">Last 7 Days</option>
  <option slot="select" value="1month">Last 1 Month</option>
  <option slot="select" value="3month">Last 3 Months</option>
  <option slot="select" value="6month">Last 6 Months</option>
  <option slot="select" value="12month">Last 12 Months</option>
</ChartOption>
<ChartOption
  type="text"
  label="Background:"
  labelFor="bg-color"
  bind:value={$lastFmOptions.background} />
<ChartOption
  type="text"
  label="Foreground:"
  labelFor="fg-color"
  bind:value={$lastFmOptions.foreground} />
