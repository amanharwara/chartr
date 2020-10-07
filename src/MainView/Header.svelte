<script>
  import {
    currentChartTitle,
    screenWidth,
    settingsVisible,
    showBackupRestoreModal,
  } from "../store";
  import Button from "../shared/Button.svelte";
  import DownloadIcon from "../icons/DownloadIcon.svelte";
  import ResetIcon from "../icons/ResetIcon.svelte";
  import { createEventDispatcher } from "svelte";
  import SettingsIcon from "../icons/SettingsIcon.svelte";
  import SupportIcon from "../icons/SupportIcon.svelte";
  import BugIcon from "../icons/BugIcon.svelte";
  import ChartrLogo from "../icons/ChartrLogoMark.svelte";
  import ChartrLogoText from "../icons/ChartrLogoText.svelte";
  import RestoreIcon from "../icons/RestoreIcon.svelte";

  let dispatch = createEventDispatcher();

  let iconOnly = false;

  $: {
    if ($screenWidth < 500) {
      iconOnly = true;
    } else {
      iconOnly = false;
    }
  }
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
    justify-content: space-between;
  }
  .logo {
    font-weight: 800;
    font-size: 1.25rem;
    user-select: none;
    fill: #fff;
    display: flex;
    align-items: center;
  }
  :global(.logo :first-child) {
    margin-right: 0.5rem;
    font-size: 1.65rem;
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
  :global(.right > :not(:last-child)),
  :global(.buttons > :not(:last-child)) {
    margin-right: 0.5rem;
  }
  .buttons {
    display: flex;
    margin-left: 1rem;
  }

  @media screen and (max-width: 800px) {
    header {
      grid-template-columns: 1fr 0.25fr;
      grid-template-rows: 1fr 1fr;
      box-sizing: border-box;
    }
    .left {
      grid-column: 1 / 3;
    }
    .center {
      padding: 0 1rem;
      padding-left: 0.5rem;
    }
    input {
      text-align: left;
      width: 100%;
    }
  }

  @media screen and (min-width: 1367px) {
    .left {
      padding: 0.5vw 0.75vw;
    }

    .logo {
      font-size: 1.5vw;
    }

    :global(.logo :first-child) {
      font-size: 1.65vw;
      margin-right: 0.5vw;
    }
  }
</style>

<header>
  <div class="left">
    <div class="logo">
      <ChartrLogo />
      <ChartrLogoText />
    </div>
    <div class="buttons">
      <Button
        iconOnly={true}
        outlined={true}
        id="toggle-settings"
        onClick={() => {
          settingsVisible.set(!$settingsVisible);
        }}>
        <SettingsIcon />
      </Button>
      <Button
        iconOnly={true}
        outlined={true}
        id="toggle-support-modal"
        onClick={() => {
          dispatch('toggle-modal', true);
        }}>
        <SupportIcon />
      </Button>
      <Button
        iconOnly={true}
        outlined={true}
        id="go-to-issues"
        label="Report Bug/Issue"
        onClick={() => window.open('https://github.com/amanharwara/chartr/issues', '_blank', 'noopener,noreferrer')}>
        <BugIcon />
      </Button>
    </div>
  </div>
  <div class="center">
    <input type="text" bind:value={$currentChartTitle} />
  </div>
  <div class="right">
    <Button
      label="Download"
      {iconOnly}
      id="download-chart"
      onClick={() => {
        dispatch('download-chart', true);
      }}>
      <DownloadIcon />
    </Button>
    <Button
      label="Reset"
      {iconOnly}
      outlined={true}
      id="reset-chart"
      onClick={() => {
        dispatch('reset-chart', true);
      }}>
      <ResetIcon />
    </Button>
    <Button
      label="Backup/Restore Chart"
      iconOnly={true}
      outlined={true}
      id="backup-restore-chart"
      onClick={() => {
        $showBackupRestoreModal = true;
      }}>
      <RestoreIcon />
    </Button>
  </div>
</header>
