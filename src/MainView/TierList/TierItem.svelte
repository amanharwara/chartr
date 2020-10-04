<script>
  import Button from "../../shared/Button.svelte";
  import DeleteIcon from "../../icons/DeleteIcon.svelte";
  import CaretUp from "../../icons/CaretUp.svelte";
  import CaretDown from "../../icons/CaretDown.svelte";
  import { createEventDispatcher } from "svelte";

  let dispatch = createEventDispatcher();

  export let item = {};
  export let tier;

  let buttonsVisible = false;

  console.log(buttonsVisible);
</script>

<style lang="scss">
  .item {
    position: relative;
    display: flex;
  }

  img {
    max-width: 6rem;
  }

  .buttons {
    display: none;
  }

  .visible {
    display: block;
  }

  :global(.item button) {
    position: absolute;
    display: flex;
  }

  :global(.item .delete-button) {
    top: 5%;
    right: 5%;
  }

  :global(.item .move-up-button) {
    top: 5%;
    left: 5%;
  }

  :global(.item .move-down-button) {
    bottom: 5%;
    left: 5%;
  }

  @media screen and (min-width: 1367px) {
    img {
      max-width: 6vw;
    }
  }
</style>

<svelte:body
  on:click={(e) => {
    if (!e.target.closest('.item') || e.target.closest('.item').id !== 'item-' + item.id) {
      buttonsVisible = false;
    }
  }} />

<div
  class="item"
  id={'item-' + item.id}
  on:click={() => {
    buttonsVisible = true;
  }}>
  <img
    src={item.src || item.img_url}
    alt={item.title}
    title={item.title}
    id={item.id} />
  <div class="buttons" class:visible={buttonsVisible}>
    <Button
      iconOnly
      id="delete-{item.id}"
      className="delete-button"
      onClick={() => dispatch('remove-tier-item', { tier, id: item.id })}
      extraProps={{ 'data-id': item.id, 'data-tier': tier }}>
      <DeleteIcon />
    </Button>
    {#if tier !== 's'}
      <Button
        iconOnly
        id="move-up-{item.id}"
        className="move-up-button"
        onClick={() => dispatch('move-item', { id: item.id, dir: 'up', tier })}>
        <CaretUp />
      </Button>
    {/if}
    {#if tier !== 'f'}
      <Button
        iconOnly
        id="move-down-{item.id}"
        className="move-down-button"
        onClick={() => dispatch('move-item', {
            id: item.id,
            dir: 'down',
            tier,
          })}>
        <CaretDown />
      </Button>
    {/if}
  </div>
</div>
