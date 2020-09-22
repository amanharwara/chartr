<script>
  import { spotifyOptions } from "../store";
  import ChartOption from "../shared/ChartOption.svelte";
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
