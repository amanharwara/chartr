<script>
  import { currentChartList, currentChartId } from "../../store";
  import ChartOption from "../../shared/ChartOption.svelte";

  let currentIndex = "";

  $: currentIndex = $currentChartList.findIndex(
    (chart) => chart.id === $currentChartId
  );
</script>

<ChartOption
  type="select"
  label="Time Range:"
  labelFor="lastfm_time_range"
  bind:value={$currentChartList[currentIndex].lastfmCollageOptions.time_range}>
  <option slot="select" value="overall">Overall</option>
  <option slot="select" value="7day">Last 7 Days</option>
  <option slot="select" value="1month">Last 1 Month</option>
  <option slot="select" value="3month">Last 3 Months</option>
  <option slot="select" value="6month">Last 6 Months</option>
  <option slot="select" value="12month">Last 12 Months</option>
</ChartOption>
<ChartOption
  type="checkbox"
  label="Show Album Titles"
  labelFor="lastfm-show-album-titles"
  bind:value={$currentChartList[currentIndex].lastfmCollageOptions.showAlbumTitles} />
{#if $currentChartList[currentIndex].lastfmCollageOptions.showAlbumTitles}
  <ChartOption
    type="checkbox"
    label="Album Title Below Cover"
    labelFor="lastfm-title-below-cover"
    bind:value={$currentChartList[currentIndex].lastfmCollageOptions.titlesBelowCover} />
  <ChartOption
    type="checkbox"
    label="Allow Editing Titles"
    labelFor="lastfm-allow-edit-titles"
    bind:value={$currentChartList[currentIndex].lastfmCollageOptions.allowEditTitles} />
{/if}
<ChartOption
  type="range"
  label="Rows:"
  labelFor="lastfm-rows"
  max={5}
  bind:value={$currentChartList[currentIndex].lastfmCollageOptions.rows} />
<ChartOption
  type="range"
  label="Columns:"
  labelFor="lastfm-columns"
  max={5}
  bind:value={$currentChartList[currentIndex].lastfmCollageOptions.columns} />
<ChartOption
  type="text"
  label="Font:"
  labelFor="lastfm-font"
  bind:value={$currentChartList[currentIndex].lastfmCollageOptions.font} />
<ChartOption
  type="text"
  label="Background Color / URL:"
  labelFor="lastfm-bg-color"
  bind:value={$currentChartList[currentIndex].lastfmCollageOptions.background} />
<ChartOption
  type="text"
  label="Font Color:"
  labelFor="lastfm-font-color"
  bind:value={$currentChartList[currentIndex].lastfmCollageOptions.fontColor} />
<ChartOption
  type="range"
  label="Padding:"
  labelFor="lastfm-padding"
  bind:value={$currentChartList[currentIndex].lastfmCollageOptions.padding} />
<ChartOption
  type="range"
  label="Gap Between Items:"
  labelFor="lastfm-gap"
  bind:value={$currentChartList[currentIndex].lastfmCollageOptions.gap} />
