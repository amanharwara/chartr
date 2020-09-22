<script>
  import { afterUpdate } from "svelte/internal";
  export let row_index;
  export let column_index;
  export let current_list;
  export let gap;
  export let onDrop;
  export let onDragOver;
  export let onDragStart;

  afterUpdate(() => {
    let column = document.getElementById(`column-${row_index}-${column_index}`);
    if (column.children.length > 1) {
      column.lastChild.remove();
    }
  });
</script>

<style lang="scss">
  .column {
    --item-size: 12vw;
    background: #fff;
    width: var(--item-size);
    height: var(--item-size);
    min-width: var(--item-size);
    min-height: var(--item-size);
    max-width: var(--item-size);
    max-height: var(--item-size);
    margin-right: 5px;
    user-select: none;

    &:last-child {
      margin-right: 0 !important;
    }
  }
</style>

<div
  class="column"
  id="column-{row_index}-{column_index}"
  style="margin-right: {gap}px;"
  on:drop={onDrop}
  on:dragover={onDragOver}
  on:dragstart={onDragStart}
  draggable="true">
  {#if current_list[row_index] && current_list[row_index][column_index]}
    <img
      src={current_list[row_index][column_index].img_url}
      alt={current_list[row_index][column_index].title}
      data-artist={current_list[row_index][column_index].artist}
      data-album={current_list[row_index][column_index].album}
      id={current_list[row_index][column_index].id}
      draggable="true"
      on:dragstart={onDragStart} />
  {/if}
</div>
