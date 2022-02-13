<script>
  export let type;
  export let value;
  export let label;
  export let labelFor;
  export let style = "";
  export let onInput = undefined;
  export let onBlur = undefined;
  export let bindValue = true;
  export let min = 1;
  export let max = 10;
  export let step = 1;

  const decrement = () => {
    let decrementedValue = value - step;
    if (decrementedValue < min) {
      value = min;
    } else {
      value = decrementedValue;
    }
  };

  const increment = () => {
    let incrementedValue = value + step;
    if (incrementedValue > max) {
      value = max;
    } else {
      value = incrementedValue;
    }
  };

  const forceMinMax = (e) => {
    e.preventDefault();
    let newValue = e.target.value;
    if (newValue > max) {
      newValue = max;
    } else if (newValue < min) {
      newValue = min;
    }
    value = newValue;
  };
</script>

<div class="chart-option {type}-option" {style}>
  {#if type === "checkbox"}
    <input type="checkbox" id={labelFor} bind:checked={value} />
    <label for={labelFor}>{label}</label>
  {:else}
    <label for={labelFor}>{label}</label>
    {#if type === "range"}
      <div class="range">
        <input type="range" id={labelFor} {min} {max} bind:value />
        <input type="number" bind:value {min} {max} />
      </div>
    {:else if type === "select"}
      <select id={labelFor} default={value} bind:value>
        <slot name="select" />
      </select>
    {:else if type === "text-range"}
      <div class="control">
        <input type="number" on:change={forceMinMax} {value} {min} {max} />
        <button type="button" on:click={decrement}>-</button>
        <button type="button" on:click={increment}>+</button>
      </div>
    {:else if type === "text"}
      {#if bindValue}
        <input
          type="text"
          id={labelFor}
          bind:value
          on:input={onInput}
          on:blur={onBlur}
        />
      {:else}
        <input
          type="text"
          id={labelFor}
          value
          on:input={onInput}
          on:blur={onBlur}
        />
      {/if}
    {/if}
  {/if}
</div>

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

  .text-range-option .control {
    display: flex;

    & > * + * {
      margin-left: 0.5rem;
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
