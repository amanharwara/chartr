<script>
  export let type;
  export let value;
  export let label;
  export let labelFor;
  export let style = "";
</script>

<style lang="scss">
  .chart-option {
    display: flex;
    flex-direction: column;
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
  }

  .chart-option label {
    margin-bottom: 0.5rem;
  }

  .chart-option select {
    padding: 0.35rem;
  }

  .range-option .range {
    display: flex;

    input[type="range"] {
      flex-grow: 2;
      margin-right: 0.5rem;
    }

    input[type="number"] {
      max-width: 2.5rem;
    }
  }

  .checkbox-option {
    flex-direction: row;
    align-items: center;
    margin-bottom: 0.75rem;
    font-size: 1.1rem;
    user-select: none;

    label {
      margin-bottom: 0 !important;
    }

    input {
      margin: 0 0.35rem 0 0;
    }
  }

  @media screen and (min-width: 1367px) {
    .chart-option {
      margin-bottom: 1vw;
    }

    select {
      padding: 0.5vw;
      font-size: 1vw;
    }

    label {
      font-size: 1vw;
      margin-bottom: 0.75vw !important;
    }
  }
</style>

<div class="chart-option {type}-option" {style}>
  {#if type === 'checkbox'}
    <input type="checkbox" id={labelFor} bind:checked={value} />
    <label for={labelFor}>{label}</label>
  {:else}
    <label for={labelFor}>{label}</label>
    {#if type === 'range'}
      <div class="range">
        <input type="range" id={labelFor} min="1" max="10" bind:value />
        <input type="number" bind:value min="1" max="10" />
      </div>
    {:else if type === 'select'}
      <select id={labelFor} default={value} bind:value>
        <slot name="select" />
      </select>
    {:else if type === 'text'}
      <input type="text" id={labelFor} bind:value />
    {/if}
  {/if}
</div>
