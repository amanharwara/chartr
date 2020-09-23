<script>
  import BackIcon from "../icons/BackIcon.svelte";
  import Button from "../shared/Button.svelte";
  import Toggle from "../shared/Toggle.svelte";
  import { settings, settingsVisible } from "../store";

  const closeSettings = () => settingsVisible.update(() => !$settingsVisible);
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

    .title {
      font-weight: 600;
      font-size: 1.4rem;
      margin-bottom: 0.25rem;
    }

    .desc {
      font-weight: 200;
    }

    .info {
      flex-grow: 2;
      margin-right: 1.5rem;
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
  <div class="settings">No settings available yet.</div>
</main>
