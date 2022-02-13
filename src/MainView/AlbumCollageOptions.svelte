<script>
  import { currentChartList, currentChartId } from "../store";
  import ChartOption from "../shared/ChartOption.svelte";

  let currentIndex = "";

  $: currentIndex = $currentChartList.findIndex(
    (chart) => chart.id === $currentChartId
  );

  const initialZoom = parseFloat(
    document.documentElement.style.getPropertyValue("--item-zoom")
  );

  let zoomValue = !initialZoom || initialZoom === NaN ? 1 : initialZoom;

  $: {
    document.documentElement.style.setProperty("--item-zoom", `${zoomValue}`);
  }
</script>

<ChartOption
  type="text-range"
  label="Chart zoom:"
  labelFor="zoom"
  min={0.5}
  max={2}
  step={0.25}
  bind:value={zoomValue}
/>
<ChartOption
  type="checkbox"
  label="Show Album Titles"
  labelFor="show-album-titles"
  bind:value={$currentChartList[currentIndex].albumCollageOptions
    .showAlbumTitles}
/>
{#if $currentChartList[currentIndex].albumCollageOptions.showAlbumTitles}
  <ChartOption
    type="checkbox"
    label="Album Title Below Cover"
    labelFor="title-below-cover"
    bind:value={$currentChartList[currentIndex].albumCollageOptions
      .titlesBelowCover}
  />
  <ChartOption
    type="checkbox"
    label="Allow Editing Titles"
    labelFor="allow-edit-titles"
    bind:value={$currentChartList[currentIndex].albumCollageOptions
      .allowEditTitles}
  />
{/if}
<ChartOption
  type="range"
  label="Rows:"
  labelFor="rows"
  bind:value={$currentChartList[currentIndex].albumCollageOptions.rows}
/>
<ChartOption
  type="range"
  label="Columns:"
  labelFor="columns"
  bind:value={$currentChartList[currentIndex].albumCollageOptions.columns}
/>
<ChartOption
  type="text"
  label="Font:"
  labelFor="font"
  bind:value={$currentChartList[currentIndex].albumCollageOptions.font}
/>
<ChartOption
  type="text"
  label="Background Color / URL:"
  labelFor="bg-color"
  bind:value={$currentChartList[currentIndex].albumCollageOptions.background}
/>
<ChartOption
  type="text"
  label="Font Color:"
  labelFor="font-color"
  bind:value={$currentChartList[currentIndex].albumCollageOptions.fontColor}
/>
<ChartOption
  type="range"
  label="Padding:"
  labelFor="padding"
  bind:value={$currentChartList[currentIndex].albumCollageOptions.padding}
/>
<ChartOption
  type="range"
  label="Gap Between Items:"
  labelFor="gap"
  min="0"
  bind:value={$currentChartList[currentIndex].albumCollageOptions.gap}
/>
