<script>
  import { current_tier_list } from "../../store";
  import Tier from "./Tier.svelte";
</script>

<style lang="scss">
  #tier-list {
    background: #000;
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
