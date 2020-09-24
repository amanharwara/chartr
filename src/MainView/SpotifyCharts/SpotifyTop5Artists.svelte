<script>
  import { settings, spotifyOptions } from "../../store";
  import Button from "../../shared/Button.svelte";
  import SpotifyIcon from "../../icons/SpotifyIcon.svelte";
  import authorizeSpotify from "../../authorizeSpotify";
  import Artist from "./Artist.svelte";
  import Loader from "../../shared/Loader.svelte";

  let artists = [];

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
        `https://api.spotify.com/v1/me/top/artists?time_range=${time_range}&limit=5`,
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
            artists = results.items;
            showLoader = false;
          }
        })
        .catch((err) => {
          console.error(err);
          showLoader = false;
        });
    }
  };

  $: getResults($spotifyOptions.time_range);
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

  .spotify-top5-artists {
    background: #0e161e;
    color: #d4fc79;
    padding: 1.25vw 2vw;
    width: 28vw;
    min-height: 28vw;
    position: relative;
    overflow: hidden;
    z-index: 0;
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

  .circle {
    background: inherit;
    position: absolute;
    border-radius: 100%;
    filter: brightness(1.75);
    z-index: -1;
  }

  .artists {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
  }

  .circle-top {
    width: 11vw;
    height: 11vw;
    right: 15%;
    top: -15%;
  }

  .circle-bottom {
    width: 17vw;
    height: 17vw;
    left: -7%;
    bottom: -15%;
  }
</style>

<div
  class="spotify-top5-artists"
  id="spotify-top5-artists"
  style="background: {$spotifyOptions.background}; color: {$spotifyOptions.foreground};">
  <div class="chart-heading">
    <h1>My Top 5 Artists</h1>
    <h4>
      {#if $spotifyOptions.time_range === 'short_term'}
        Last 4 weeks
      {:else if $spotifyOptions.time_range === 'medium_term'}
        Last 6 months
      {:else if $spotifyOptions.time_range === 'long_term'}All Time{/if}
    </h4>
  </div>
  {#if showLoader}
    <div class="overlay">
      <Loader />
    </div>
  {:else}
    <div class="artists">
      {#each artists as artist, index}
        <Artist {artist} {index} />
      {/each}
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
  <div class="circle circle-top" />
  <div class="circle circle-bottom" />
</div>
