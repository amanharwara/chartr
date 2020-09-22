<script>
  import { spotifyOptions } from "../store";
  import ChartOption from "../shared/ChartOption.svelte";
</script>

<ChartOption
  type="color"
  label="Background:"
  labelFor="bg-color"
  bind:value={$spotifyOptions.background} />
<ChartOption
  type="color"
  label="Foreground:"
  labelFor="fg-color"
  bind:value={$spotifyOptions.foreground} />
