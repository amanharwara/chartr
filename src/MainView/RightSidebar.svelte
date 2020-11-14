<script>
  import AddAlbum from "./AddAlbum.svelte";
  import {
    currentChartStyle,
    settings,
    currentChartList,
    currentChartId,
  } from "../store";
  import Button from "../shared/Button.svelte";
  import ResetIcon from "../icons/ResetIcon.svelte";
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

  @media screen and (max-width: 539px) {
    .right-sidebar {
      grid-column: auto;
      grid-row: 4 / 5;
      display: none;
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
      grid-column: 2 / 4;
      max-height: 100%;
      overflow: hidden;
    }
  }
</style>

<aside class="right-sidebar">
  {#if $currentChartStyle === 'album_collage' || $currentChartStyle === 'tier_list'}
    <AddAlbum />
  {:else if $currentChartStyle === 'lastfm_collage' && $settings.lastFmUsername}
    <div class="heading">Update Chart:</div>
    <Button
      label="Update Chart"
      id="update-lastfm-chart"
      extraProps={{ title: 'Updates chart by fetching new data from Last.fm.' }}
      onClick={() => {
        $currentChartList[$currentChartList.findIndex((chart) => chart.id === $currentChartId)].lastfmCollageList = [];
      }}>
      <ResetIcon />
    </Button>
  {:else}
    <p>No extra options available for this chart.</p>
  {/if}
</aside>
