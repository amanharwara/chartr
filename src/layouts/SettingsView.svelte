<script>
  import { settingsVisible } from "../store";
</script>

<button on:click={() => settingsVisible.update(() => !$settingsVisible)}>Close
  Settings</button>
