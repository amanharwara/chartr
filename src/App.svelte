<script>
  import MainView from "./layouts/MainView.svelte";
  import SettingsView from "./layouts/SettingsView.svelte";
  import { settingsVisible } from "./store";
</script>

{#if $settingsVisible}
  <SettingsView />
{:else}
  <MainView />
{/if}
