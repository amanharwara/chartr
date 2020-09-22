<script>
  import AddAlbum from "./AddAlbum.svelte";
  import { currentChartStyle } from "../store";
</script>

<style lang="scss">
  .right-sidebar {
    background: #11161c;

    grid-row: 2 / 3;
    grid-column: 3 / 4;
    padding: 0.5rem 0.75rem;
  }
  p {
    text-align: center;
  }

  @media screen and (min-width: 1367px) {
    .right-sidebar {
      padding: 0.5vw 0.75vw;
    }
  }
</style>

<aside class="right-sidebar">
  {#if $currentChartStyle === 'album_collage' || $currentChartStyle === 'album_top5'}
    <AddAlbum />
  {:else}
    <p>No extra options available for this chart.</p>
  {/if}
</aside>
