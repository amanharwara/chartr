<script>
  import ChartrLogo from "../icons/ChartrLogoMark.svelte";
  import ChartrLogoText from "../icons/ChartrLogoText.svelte";
</script>

<style lang="scss">
  header {
    background: #151c24;
    display: flex;
    width: 100%;
    box-sizing: border-box;
    padding: 0.5rem 1rem;
  }

  .logo {
    font-weight: 800;
    font-size: 1.25rem;
    user-select: none;
    fill: #fff;
    display: flex;
    align-items: center;
  }
  :global(.logo :first-child) {
    margin-right: 0.5rem;
    font-size: 1.65rem;
  }

  @media screen and (min-width: 1367px) {
    header {
      padding: 0.5vw 1vw;
    }

    .logo {
      font-size: 1.5vw;
    }
  }
</style>

<header>
  <a class="logo" href="/">
    <ChartrLogo />
    <ChartrLogoText /></a>
</header>
