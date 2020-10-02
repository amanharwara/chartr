<script>
  import AddAlbum from "./AddAlbum.svelte";
  import { currentChartStyle, screenWidth } from "../store";
  import AddAlbumModal from "./AddAlbumModal.svelte";

  let hidden = false;

  $: {
    if ($screenWidth < 539) {
      hidden = true;
    } else {
      hidden = false;
    }
  }
</script>

<style lang="scss">
  .right-sidebar {
    background: #11161c;

    grid-row: 1 / 3;
    grid-column: 3 / 4;
    padding: 0.5rem 0.75rem;
  }
  p {
    text-align: center;
  }

  .hidden {
    display: none;
  }

  @media screen and (max-width: 539px) {
    .right-sidebar {
      grid-column: auto;
      grid-row: 4 / 5;
    }
  }

  @media screen and (min-width: 1367px) {
    .right-sidebar {
      padding: 0.5vw 0.75vw;
    }
  }

  @media screen and (min-width: 540px) and (max-width: 1024px) {
    .right-sidebar {
      grid-row: 3 / 4;
      grid-column: 2 / 3;
      max-height: 100%;
      overflow: hidden;
    }
  }
</style>

<aside class="right-sidebar" class:hidden>
  {#if $currentChartStyle === 'album_collage' || $currentChartStyle === 'tier_list'}
    <AddAlbum />
  {:else}
    <p>No extra options available for this chart.</p>
  {/if}
</aside>
