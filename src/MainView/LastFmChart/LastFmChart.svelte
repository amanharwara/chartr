<script>
  import { settings, lastFmOptions, settingsVisible } from "../../store";
  import Loader from "../../shared/Loader.svelte";
  import Button from "../../shared/Button.svelte";
  import LastFmIcon from "../../icons/LastFmIcon.svelte";

  let items = [];

  let askForReAuth = false;

  let reAuthReason = null;

  let showLoader = false;

  let username = $settings.lastFmUsername;

  if (username === null || username.length === 0) {
    askForReAuth = true;
    reAuthReason = "Last.fm Username Not Added To Settings.";
  }

  const getResults = (time_range, type) => {
    if (username && username.length > 0) {
      showLoader = true;
      fetch(
        `https://ws.audioscrobbler.com/2.0/?method=user.gettop${type}&limit=5&period=${time_range}&user=${
          username ? username : ""
        }&api_key=LASTFM_KEY&format=json`
      )
        .then((res) => res.json())
        .then((results) => {
          if (results.error) {
            askForReAuth = true;
            reAuthReason = results.message + ".";
            showLoader = false;
          } else if (results[`top${type}`]) {
            items = results[`top${type}`][type.slice(0, type.length - 1)];
            showLoader = false;
          }
        })
        .catch((err) => {
          console.error(err);
          showLoader = false;
        });
    }
  };

  $: getResults($lastFmOptions.time_range, $lastFmOptions.type);
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

  .lastfm-top5 {
    background: #0e161e;
    color: #d4fc79;
    padding: 1.5vw;
    width: 32vw;
    min-height: 32vw;
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
    font-size: 1.75vw;
  }

  .empty-img {
    width: 5vw;
    height: 5vw;
    display: block;
    filter: brightness(1.75);
  }

  .items {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
  }

  .item {
    display: flex;
    align-items: center;
    margin-bottom: 1vw;
    max-width: 100%;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .img {
    margin-right: 1vw;
    position: relative;
    display: flex;
  }

  img {
    max-width: 5vw;
    max-height: 5vw;
  }

  .info {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    overflow: hidden;
  }

  .rank {
    font-weight: 400;
    font-size: 1.05vw;
  }

  .name {
    font-weight: 900;
    font-size: 1.65vw;
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .isNotArtist .name {
    font-size: 1.75vw;
  }

  .artist {
    font-weight: 500;
    font-size: 1.25vw;
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  @media screen and (max-width: 450px) {
    .lastfm-top5 {
      width: 100% !important;
      padding: 1.5rem;
      box-sizing: border-box;
    }

    .item {
      margin-bottom: 1rem;
    }

    .img {
      margin-right: 1rem;
    }

    img {
      max-width: 5rem;
      max-height: 5rem;
    }

    h1 {
      font-size: 2rem;
    }

    h4 {
      margin-top: 0.45rem;
      font-size: 1.5rem;
    }

    .rank {
      font-size: 1.05rem;
    }

    .name {
      font-size: 1.65rem;
    }

    .isNotArtist .name {
      font-size: 1.75rem;
    }

    .artist {
      font-size: 1.25rem;
    }
  }
</style>

<div
  class="lastfm-top5 {$lastFmOptions.type}"
  id="lastfm-top5"
  style="background: {$lastFmOptions.background}; color: {$lastFmOptions.foreground};">
  <div class="chart-heading">
    <h1>
      My Top 5
      {$lastFmOptions.type
        .charAt(0)
        .toLocaleUpperCase() + $lastFmOptions.type.slice(1)}
    </h1>
    <h4>
      {#if $lastFmOptions.time_range === 'overall'}
        Overall
      {:else if $lastFmOptions.time_range === '7day'}
        Last 7 days
      {:else if $lastFmOptions.time_range === '1month'}
        Last 1 month
      {:else if $lastFmOptions.time_range === '3month'}
        Last 3 months
      {:else if $lastFmOptions.time_range === '6month'}
        Last 6 months
      {:else if $lastFmOptions.time_range === '12month'}Last 12 months{/if}
    </h4>
  </div>
  {#if showLoader}
    <div class="overlay">
      <Loader />
    </div>
  {:else}
    <div class="items">
      {#if items.length > 1}
        {#each items as item, index}
          <div class="item" class:isNotArtist={item.artist}>
            <div class="img">
              {#if item.image[3]['#text'].length > 0}
                <img src={item.image[3]['#text']} alt={item.name} />
              {:else}
                <div
                  class="empty-img"
                  style="background: {$lastFmOptions.background}" />
              {/if}
            </div>
            <div class="info">
              <div class="rank">#{index + 1}</div>
              <div class="name">{item.name}</div>
              {#if item.artist}
                <div class="artist">{item.artist.name}</div>
              {/if}
            </div>
          </div>
        {/each}
      {/if}
    </div>
  {/if}
  {#if askForReAuth}
    <div class="overlay">
      <div class="reason">Error: {reAuthReason}</div>
      <Button
        label="Add LastFm Username"
        onClick={() => settingsVisible.set(true)}>
        <LastFmIcon />
      </Button>
    </div>
  {/if}
</div>
