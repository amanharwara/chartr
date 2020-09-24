<script>
  import BackIcon from "../icons/BackIcon.svelte";
  import SpotifyIcon from "../icons/SpotifyIcon.svelte";
  import Button from "../shared/Button.svelte";
  import Toggle from "../shared/Toggle.svelte";
  import { settings, settingsVisible } from "../store";
  import authorizeSpotify from "../authorizeSpotify";

  const closeSettings = () => settingsVisible.update(() => !$settingsVisible);

  const logOutSpotify = () => {
    $settings.spotifyToken = "";
    saveToLocalStorage();
    window.location =
      location.protocol + "//" + location.host + location.pathname;
  };

  const saveToLocalStorage = () => {
    if (localStorage) {
      localStorage.setItem("settings", JSON.stringify($settings));
    }
  };
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
        <div class="title">Connect to Spotify:</div>
        <div class="desc">
          If you want to create charts from your Spotify you need to connect
          your Spotify account to Chartr. By logging into Spotify, you agree to
          their <a
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
  </div>
</main>
