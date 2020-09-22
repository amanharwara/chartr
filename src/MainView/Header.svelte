<script>
  import { currentChartTitle, settingsVisible } from "../store";
  import Button from "../shared/Button.svelte";
  import DownloadIcon from "../icons/DownloadIcon.svelte";
  import ResetIcon from "../icons/ResetIcon.svelte";
  import { createEventDispatcher } from "svelte";
  import SettingsIcon from "../icons/SettingsIcon.svelte";
  import SupportIcon from "../icons/SupportIcon.svelte";

  let dispatch = createEventDispatcher();

  const handleClick = (e) => {
    if (e.target.closest("#download-chart")) {
      dispatch("download-chart", true);
    }
    if (e.target.closest("#reset-chart")) {
      dispatch("reset-chart", true);
    }
    if (e.target.closest("#toggle-settings")) {
      settingsVisible.update(() => !$settingsVisible);
    }
  };
</script>

<style lang="scss">
  header {
    background: #151c24;
    grid-row: 1 / 2;
    grid-column: 1 / 4;

    display: grid;
    grid-template-columns: 0.85fr 2fr 0.85fr;
    grid-template-rows: 1fr;
  }
  .left {
    display: flex;
    align-items: center;
    background: #11161c;
    padding: 0.5rem 0.75rem;
  }
  .logo {
    font-weight: 800;
    font-size: 1.55rem;
  }
  .center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  input {
    background: transparent;
    text-align: center;
  }
  .right {
    display: flex;
    align-items: center;
    padding: 0 0.75rem;
  }
  :global(.right > :first-child),
  :global(.buttons > :first-child) {
    margin-right: 0.5rem;
  }
  .buttons {
    display: flex;
    margin-left: 1rem;
  }

  @media screen and (max-width: 450px) {
    header {
      display: block;
    }

    input {
      text-align: left;
    }

    .left {
      width: 100%;
      padding: 1rem;
      color: #fff;
      font-size: 1.5rem;
      box-sizing: border-box;
    }

    .center,
    .right {
      display: inline-block;
      padding: 0.25rem;
      color: #fff;
    }

    .center {
      width: 60%;

      input {
        box-sizing: border-box;
      }
    }

    .right {
      width: auto;
    }

    :global(.right > .button) {
      display: inline-flex !important;
    }
  }

  @media screen and (min-width: 1367px) {
    .left {
      padding: 0.5vw 0.75vw;
    }

    .logo {
      font-size: 1.5vw;
    }
  }
</style>

<header on:click={handleClick}>
  <div class="left">
    <div class="logo">CHARTR.</div>
    <div class="buttons">
      <Button label="" iconOnly={true} outlined={true} id="toggle-settings">
        <SettingsIcon />
      </Button>
      <Button
        label=""
        iconOnly={true}
        outlined={true}
        id="toggle-support-modal">
        <SupportIcon />
      </Button>
    </div>
  </div>
  <div class="center">
    <input type="text" bind:value={$currentChartTitle} />
  </div>
  <div class="right">
    <Button label="Download" id="download-chart">
      <DownloadIcon />
    </Button>
    <Button label="Reset" outlined={true} id="reset-chart">
      <ResetIcon />
    </Button>
  </div>
</header>