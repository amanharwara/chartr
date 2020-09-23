<script>
  import Header from "../SettingsView/Header.svelte";
  import SettingsBody from "../SettingsView/SettingsBody.svelte";
</script>

<style>
  .settings-view {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
</style>

<div class="settings-view">
  <Header />
  <SettingsBody />
</div>
