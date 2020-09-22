<script>
  import { currentChartStyle } from "../store";
  import AlbumCollage from "./AlbumCollage.svelte";
</script>

<style lang="scss">
  .content {
    grid-column: 2 / 3;
    grid-row: 2 / 3;

    padding: 1rem;

    box-sizing: border-box;
    overflow: auto;
  }
</style>

<main class="content">
  {#if $currentChartStyle === 'album_collage'}
    <AlbumCollage />
  {:else if $currentChartStyle.includes('spotify')}
    Please connect your Spotify account in the settings.
  {/if}
</main>
