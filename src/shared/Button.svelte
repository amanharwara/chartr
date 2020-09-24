<script>
  export let outlined = false;
  export let label = "Button";
  export let id = "button";
  export let iconOnly = false;
  export let labelOnly = false;
  export let onClick = () => {};
  export let extraProps = {};
</script>

<style lang="scss">
  .button {
    background: #434a53;
    color: #fff;
    fill: #ced2d7;
    border: 1px solid transparent;
    border-radius: 3px;
    display: flex;
    align-items: center;
    padding: 0.45rem 0.75rem;
    font-size: 0.9rem;
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    cursor: pointer;
    transition: 0.1s background;

    .label {
      margin-left: 0.45rem;
    }

    &.iconOnly .label {
      display: none;
    }

    &.labelOnly .label {
      margin-left: 0 !important;
    }

    &:hover {
      background: #31363d;
    }

    &.outlined {
      background: transparent;
      border: 1px solid #434a53;

      &:hover {
        background: #434a53;
      }
    }
  }

  @media screen and (min-width: 1367px) {
    .button {
      font-size: 0.9vw;
      padding: 0.45vw 0.75vw;
    }

    .label {
      margin-left: 0.5vw !important;
    }

    :global(.button svg) {
      font-size: 1.2vw !important;
    }
  }

  :global(.button svg) {
    font-size: 1.2rem;
  }
</style>

<button
  class="button"
  type="button"
  class:iconOnly
  class:labelOnly
  class:outlined
  on:click={onClick}
  {...extraProps}
  {id}>
  <slot />
  <div class="label">{label}</div>
</button>
