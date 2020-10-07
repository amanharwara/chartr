<script>
  import ChartOption from "../../shared/ChartOption.svelte";
  import { lastFmOptions } from "../../store";
  import Select from "svelte-select";

  const chartTypeItems = [
    { value: "albums", label: "Albums" },
    { value: "tracks", label: "Tracks" },
    { value: "artists", label: "Artists" },
  ];

  let chartType = chartTypeItems.find(
    (item) => item.value === $lastFmOptions.type
  );

  $: $lastFmOptions.type = chartType.value ? chartType.value : chartType;

  const timeRangeItems = [
    { value: "overall", label: "Overall" },
    { value: "7day", label: "Last 7 Days" },
    { value: "1month", label: "Last 1 Month" },
    { value: "3month", label: "Last 3 Months" },
    { value: "6month", label: "Last 6 Months" },
    { value: "12month", label: "Last 12 Months" },
  ];

  let timeRange = timeRangeItems.find(
    (item) => item.value === $lastFmOptions.time_range
  );

  $: $lastFmOptions.time_range = timeRange.value ? timeRange.value : timeRange;
</script>

<style>
  .chart_type_select,
  .time_range_select {
    margin-bottom: 0.75rem;
  }
</style>

<div class="chart_type_select">
  <label for="chart_type">Type:</label>
  <Select
    bind:selectedValue={chartType}
    items={chartTypeItems}
    inputAttributes={{ id: 'chart_type' }}
    isClearable={false}
    isSearchable={false}
    showIndicator={true}
    listAutoWidth={false}
    listPlacement="bottom"
    showChevron={true} />
</div>
<div class="time_range_select">
  <label for="time_range">Time Range:</label>
  <Select
    bind:selectedValue={timeRange}
    items={timeRangeItems}
    inputAttributes={{ id: 'time_range' }}
    isClearable={false}
    isSearchable={false}
    showIndicator={true}
    listAutoWidth={false}
    listPlacement="bottom"
    showChevron={true} />
</div>
<ChartOption
  type="text"
  label="Background:"
  labelFor="bg-color"
  bind:value={$lastFmOptions.background} />
<ChartOption
  type="text"
  label="Foreground:"
  labelFor="fg-color"
  bind:value={$lastFmOptions.foreground} />
