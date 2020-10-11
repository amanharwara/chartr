<script>
  import MainView from "./layouts/MainView.svelte";
  import SettingsView from "./layouts/SettingsView.svelte";
  import { settingsVisible, currentChartList, currentChartId } from "./store";
</script>

<style lang="scss">
</style>

<svelte:body
  on:keydown={(e) => {
    let activeElement = document.activeElement.closest('.column');
    if (activeElement) {
      let row_index = activeElement.dataset.row_index;
      let column_index = activeElement.dataset.column_index;

      if (e.key === 'Delete') {
        let temp_list = $currentChartList.find((chart) => chart.id === $currentChartId).albumCollageList;
        temp_list[row_index][column_index] = undefined;
        $currentChartList[$currentChartList.findIndex((chart) => chart.id === $currentChartId)].albumCollageList = temp_list;
      }
    }
  }} />

{#if $settingsVisible}
  <SettingsView />
{:else}
  <MainView />
{/if}
