<script>
  import MainView from "./layouts/MainView.svelte";
  import SettingsView from "./layouts/SettingsView.svelte";
  import { settingsVisible } from "./store";
</script>

<style lang="scss">
</style>

{#if $settingsVisible}
  <SettingsView />
{:else}
  <MainView />
{/if}
