<script>
  import Tier from "./Tier.svelte";
</script>

<style lang="scss">
  #tier-list {
    background: #000;
  }

  @media screen and (max-width: 539px) {
    #tier-list {
      display: flex;
      box-sizing: border-box;
      flex-direction: column;
      width: max-content;
      min-width: 100%;
    }
  }
</style>

<div id="tier-list">
  <Tier tier="s" />
  <Tier tier="a" />
  <Tier tier="b" />
  <Tier tier="c" />
  <Tier tier="d" />
  <Tier tier="e" />
  <Tier tier="f" />
</div>
