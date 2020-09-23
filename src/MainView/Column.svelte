<script>
  import { afterUpdate } from "svelte/internal";
  export let row_index;
  export let column_index;
  export let current_list;
  export let gap;
  export let onDrop;
  export let onDragOver;
  export let onDragStart;

  const getDataUrl = (img) => {
    // Create canvas
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    // Set width and height
    canvas.width = img.width;
    canvas.height = img.height;
    // Draw the image
    ctx.drawImage(img, 0, 0, img.width, img.height);
    return canvas.toDataURL("image/jpeg");
  };

  afterUpdate(() => {
    let column = document.getElementById(`column-${row_index}-${column_index}`);
    if (column.children.length === 1 && column.firstChild.tagName === "IMG") {
      let dataUrl = getDataUrl(column.firstChild);
      column.firstChild.src = dataUrl;
    }
  });
</script>

<style lang="scss">
  :root {
    --item-size: 12vw;
  }
  .column {
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
  @media screen and (max-width: 425px) {
    :root {
      --item-size: 30vw;
    }
  }
</style>

<div
  class="column"
  id="column-{row_index}-{column_index}"
  style="margin-right: {gap}px;"
  data-row_index={row_index}
  data-column_index={column_index}
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
