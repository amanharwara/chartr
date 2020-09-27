<script>
  import BackIcon from "../icons/BackIcon.svelte";
  import SpotifyIcon from "../icons/SpotifyIcon.svelte";
  import LastFmIcon from "../icons/LastFmIcon.svelte";
  import Button from "../shared/Button.svelte";
  import Toggle from "../shared/Toggle.svelte";
  import { settings, settingsVisible, searchProvider } from "../store";
  import authorizeSpotify from "../utils/authorizeSpotify";
  import authorizeLastFm from "../utils/authorizeLastFm";

  const closeSettings = () => settingsVisible.update(() => !$settingsVisible);

  const logOutSpotify = () => {
    $settings.spotifyToken = "";
    saveToLocalStorage();
    window.location =
      location.protocol + "//" + location.host + location.pathname;
  };

  const logOutLastFm = () => {
    $settings.lastFmToken = "";
    saveToLocalStorage();
    window.location =
      location.protocol + "//" + location.host + location.pathname;
  };

  const saveToLocalStorage = () => {
    if (localStorage) {
      localStorage.setItem("settings", JSON.stringify($settings));
      localStorage.setItem("searchProvider", $searchProvider);
    }
  };

  $: {
    if ($searchProvider) {
      saveToLocalStorage();
    }
  }
</script>

<style lang="scss">
  main {
    background: #11161c;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    flex-grow: 2;
    box-sizing: border-box;
    padding-top: 3rem;
  }

  :global(#close-settings) {
    padding: 0.45rem;
    margin-left: -4.45rem;
    margin-right: 1.5rem;
  }
  :global(#close-settings svg) {
    font-size: 1.75rem;
  }

  h1 {
    color: #fff;
    font-weight: 800;
    font-size: 2.5rem;
  }

  .settings {
    width: 100%;
    max-width: 37vw;
    color: #fff;
  }

  a {
    color: #fff;
  }

  .title {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 37vw;
    margin-bottom: 1.5rem;

    h1 {
      margin: 0;
    }
  }

  .setting {
    display: flex;
    width: 100%;
    align-items: flex-start;
    justify-content: space-between;
    color: #fff;
    margin-bottom: 1.5rem;

    &.vertical {
      flex-direction: column;

      .info {
        margin-bottom: 0.85rem;
      }
    }

    .title {
      font-weight: 600;
      font-size: 1.4rem;
      margin-bottom: 0.5rem;
    }

    .desc {
      font-weight: 200;
      font-size: 1.05rem;
    }

    .info {
      flex-grow: 2;
      margin-right: 1.5rem;
    }
  }

  select {
    margin: 0;
    padding: 0.35rem;
    font-size: 1.05rem;
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  @media screen and (max-width: 550px) {
    main {
      padding: 3.5rem;
    }
    .settings {
      max-width: 100%;
    }
    .setting {
      .title {
        max-width: 100%;
      }
      .info {
        margin-right: 0;
      }
    }
  }

  @media screen and (min-width: 1367px) {
    main {
      padding-top: 3vw;
    }

    .title {
      margin-bottom: 1.5vw;

      h1 {
        font-size: 3vw;
      }
    }

    :global(#close-settings) {
      padding: 0.45vw;
      margin-left: -4.45vw;
      margin-right: 1.5vw;
    }
    :global(#close-settings svg) {
      font-size: 1.75vw !important;
    }

    .setting {
      .title {
        font-size: 1.9vw;
        margin-bottom: 0.25vw;
      }

      .desc {
        font-size: 1.2vw;
      }
    }
  }
</style>

<main>
  <div class="title">
    <Button id="close-settings" iconOnly onClick={closeSettings}>
      <BackIcon />
    </Button>
    <h1>Settings</h1>
  </div>
  <div class="settings">
    <div class="setting vertical">
      <div class="info">
        <div class="title">Search Provider:</div>
        <div class="desc">
          Select which search provider you want to use for getting the album
          art. Different search providers may show different results.
        </div>
      </div>
      <select
        id="search-provider-select"
        bind:value={$searchProvider}
        default="itunes">
        <option value="itunes">iTunes</option>
        <option value="discogs">Discogs</option>
        <option value="lastfm">Last.fm</option>
      </select>
    </div>
    <div class="setting vertical">
      <div class="info">
        <div class="title">Connect to Spotify:</div>
        <div class="desc">
          If you want to create charts from your Spotify you need to connect
          your Spotify account to Chartr. By logging into Spotify, you agree to
          their
          <a
            href="https://www.spotify.com/legal/privacy-policy/"
            target="_blank"
            rel="noreferrer noopener">privacy policy</a>.
        </div>
      </div>
      {#if $settings.spotifyToken.length === 0}
        <Button label="Login with Spotify" onClick={authorizeSpotify}>
          <SpotifyIcon />
        </Button>
      {:else}
        <div style="display: flex;">
          <input
            type="text"
            id="spotify_token"
            title="Your Spotify Token"
            disabled
            value={$settings.spotifyToken}
            style="margin-right: 0.5rem" />
          <Button label="Log Out" labelOnly outlined onClick={logOutSpotify} />
        </div>
      {/if}
    </div>
    <div class="setting vertical">
      <div class="info">
        <div class="title">Connect to Last.fm:</div>
        <div class="desc">
          If you want to use Last.fm for personalized charts (coming soon), you
          need to connect your Last.fm account to Chartr. By logging into
          Last.fm, you agree to their
          <a
            href="https://www.last.fm/legal/privacy"
            target="_blank"
            rel="noreferrer noopener">privacy policy</a>.
        </div>
      </div>
      {#if $settings.lastFmToken.length === 0}
        <Button label="Login with Last.fm" onClick={authorizeLastFm}>
          <LastFmIcon />
        </Button>
      {:else}
        <div style="display: flex;">
          <input
            type="text"
            id="lastfm_token"
            title="Your Last.fm Token"
            disabled
            value={$settings.lastFmToken}
            style="margin-right: 0.5rem" />
          <Button label="Log Out" labelOnly outlined onClick={logOutLastFm} />
        </div>
      {/if}
    </div>
  </div>
</main>
