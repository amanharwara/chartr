<script>
  import { albumCollageOptions } from "../store";
  import ChartOption from "../shared/ChartOption.svelte";
</script>

<ChartOption
  type="checkbox"
  label="Show Album Titles"
  labelFor="show-album-titles"
  bind:value={$albumCollageOptions.showAlbumTitles} />
<ChartOption
  type="range"
  label="Rows:"
  labelFor="rows"
  bind:value={$albumCollageOptions.rows} />
<ChartOption
  type="range"
  label="Columns:"
  labelFor="columns"
  bind:value={$albumCollageOptions.columns} />
<ChartOption
  type="text"
  label="Font:"
  labelFor="font"
  bind:value={$albumCollageOptions.font} />
<ChartOption
  type="text"
  label="Background Color:"
  labelFor="bg-color"
  bind:value={$albumCollageOptions.background} />
<ChartOption
  type="text"
  label="Font Color:"
  labelFor="font-color"
  bind:value={$albumCollageOptions.fontColor} />
<ChartOption
  type="range"
  label="Padding:"
  labelFor="padding"
  bind:value={$albumCollageOptions.padding} />
<ChartOption
  type="range"
  label="Gap Between Items:"
  labelFor="gap"
  bind:value={$albumCollageOptions.gap} />
