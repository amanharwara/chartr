<script>
  export let value = false;
  export let id = "toggle";
</script>

<style lang="scss">
  .toggle-bg,
  .toggle {
    background: #7a828b;
    width: 3.5rem;
    height: 1.75rem;
    border-radius: 1rem;
    cursor: pointer;
    position: relative;
  }

  .toggle {
    background: none;
  }

  .toggle-bg::after {
    content: "";
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 100%;
    background: #1b242e;
    position: absolute;
    top: 50%;
    left: 6%;
    transform: translateY(-50%);
    z-index: 0;
  }

  input {
    cursor: pointer;
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
  }

  input:checked + .toggle-bg::after {
    transition: 0.15s;
    background: #fff;
    left: auto;
    right: 7%;
  }

  input:checked + .toggle-bg {
    background: #222e3d;
  }

  @media screen and (min-width: 1367px) {
    .toggle-bg,
    .toggle {
      width: 3.75vw;
      height: 1.95vw;
      border-radius: 1vw;
    }

    .toggle-bg::after {
      width: 1.45vw;
      height: 1.45vw;
    }
  }
</style>

<div class="toggle">
  <input type="checkbox" {id} bind:checked={value} />
  <div class="toggle-bg" />
</div>
