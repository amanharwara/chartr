<script>
  import { settings, currentChartList, currentChartId } from "../../store";
  import Button from "../../shared/Button.svelte";
  import Loader from "../../shared/Loader.svelte";
  import SpotifyIcon from "../../icons/SpotifyIcon.svelte";
  import authorizeSpotify from "../../utils/authorizeSpotify";
  import TrackStyle1 from "./TrackStyle1.svelte";
  import TrackStyle2 from "./TrackStyle2.svelte";

  let tracks = [];

  let askForReAuth = false;

  let reAuthReason = null;

  let showLoader = false;

  let token = $settings.spotifyToken;

  if (token === null || token.length === 0) {
    askForReAuth = true;
    reAuthReason = "Not logged into Spotify.";
  }

  const getResults = (time_range) => {
    if (token && token.length > 0) {
      showLoader = true;
      fetch(
        `https://api.spotify.com/v1/me/top/tracks?time_range=${time_range}&limit=${
          $currentChartList[
            $currentChartList.findIndex((chart) => chart.id === $currentChartId)
          ].spotifyOptions.tracks_style === "top_5"
            ? 5
            : 10
        }`,
        {
          headers: new Headers([
            ["Accept", "application/json"],
            ["Content-Type", "application/json"],
            ["Authorization", `Bearer ${token}`],
          ]),
        }
      )
        .then((res) => res.json())
        .then((results) => {
          if (results.error) {
            switch (results.error.message) {
              case "The access token expired":
                askForReAuth = true;
                reAuthReason = results.error.message + ".";
                break;
              default:
                break;
            }
            showLoader = false;
          } else if (results.items) {
            tracks = results.items;
            showLoader = false;
          }
        })
        .catch((err) => {
          console.error(err);
          showLoader = false;
        });
    }
  };

  $: getResults(
    $currentChartList[
      $currentChartList.findIndex((chart) => chart.id === $currentChartId)
    ].spotifyOptions.time_range
  );
</script>

<style lang="scss">
  .overlay {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: #fff;
    background: #303030e3;

    :not(:last-child) {
      margin-bottom: 0.5vw;
    }
  }

  .spotify-top-tracks {
    background: #0e161e;
    color: #d4fc79;
    padding: 1.25vw 2vw;
    width: 28vw;
    min-height: 28vw;
    position: relative;
    overflow: hidden;
    z-index: 0;

    &.top_10 {
      padding: 0;
      width: 33vw;

      .tracks {
        margin-top: 0;
      }

      .chart-heading {
        padding: 1rem;
      }
    }
  }

  h1 {
    margin: 0;
    font-size: 2.75vw;
    line-height: 1;
  }

  h4 {
    margin: 0;
    margin-top: 0.45vw;
    font-weight: 200;
    font-size: 1.5vw;
  }

  .tracks {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
  }

  @media screen and (max-width: 450px) {
    .spotify-top-tracks {
      width: 100% !important;
      padding: 1.25rem 2rem;
      box-sizing: border-box;
    }

    h1 {
      font-size: 2rem;
    }

    h4 {
      margin-top: 0.45rem;
      font-size: 1.5rem;
    }
  }
</style>

<div
  class="spotify-top-tracks {$currentChartList[$currentChartList.findIndex((chart) => chart.id === $currentChartId)].spotifyOptions.tracks_style}"
  id="spotify-top-tracks"
  style="background: {$currentChartList[$currentChartList.findIndex((chart) => chart.id === $currentChartId)].spotifyOptions.background}; color: {$currentChartList[$currentChartList.findIndex((chart) => chart.id === $currentChartId)].spotifyOptions.foreground};">
  <div class="chart-heading">
    <h1>
      My
      {#if $currentChartList[$currentChartList.findIndex((chart) => chart.id === $currentChartId)].spotifyOptions.tracks_style === 'top_5'}
        Top 5
      {:else}Top 10{/if}
      Tracks
    </h1>
    <h4>
      {#if $currentChartList[$currentChartList.findIndex((chart) => chart.id === $currentChartId)].spotifyOptions.time_range === 'short_term'}
        Last 4 weeks
      {:else if $currentChartList[$currentChartList.findIndex((chart) => chart.id === $currentChartId)].spotifyOptions.time_range === 'medium_term'}
        Last 6 months
      {:else if $currentChartList[$currentChartList.findIndex((chart) => chart.id === $currentChartId)].spotifyOptions.time_range === 'long_term'}
        All Time
      {/if}
    </h4>
  </div>
  {#if showLoader}
    <div class="overlay">
      <Loader />
    </div>
  {:else}
    <div class="tracks">
      {#if $currentChartList[$currentChartList.findIndex((chart) => chart.id === $currentChartId)].spotifyOptions.tracks_style === 'top_5'}
        {#each tracks as track, index}
          <TrackStyle1 {track} {index} />
        {/each}
      {:else}
        {#each tracks as track, index}
          <TrackStyle2 {track} {index} />
        {/each}
      {/if}
    </div>
  {/if}
  {#if askForReAuth}
    <div class="overlay">
      <div class="reason">Error: {reAuthReason}</div>
      <Button label="Login with Spotify" onClick={authorizeSpotify}>
        <SpotifyIcon />
      </Button>
    </div>
  {/if}
</div>
