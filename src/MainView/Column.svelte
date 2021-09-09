<script>
  import DeleteIcon from "../icons/DeleteIcon.svelte";
  import Button from "../shared/Button.svelte";
  import { beforeUpdate, createEventDispatcher } from "svelte";
  import AddIcon from "../icons/AddIcon.svelte";
  import {
    screenWidth,
    currentChartList,
    currentChartId,
    currentChartStyle,
  } from "../store";
  import CaretUp from "../icons/CaretUp.svelte";
  import CaretDown from "../icons/CaretDown.svelte";
  import CaretLeft from "../icons/CaretLeft.svelte";
  import CaretRight from "../icons/CaretRight.svelte";
  import blobToDataUrl from "../utils/blobToDataUrl";

  export let row_index;
  export let column_index;
  export let current_list;
  export let gap;
  export let onDrop;
  export let onDragOver;
  export let onDragStart;

  let onDragEnter = (e) => {
    e.preventDefault();
  };

  let onDropFunc = onDrop;
  let onDragOverFunc = onDragOver;
  let onDragStartFunc = onDragStart;
  let onDragEnterFunc = onDragEnter;

  let draggable = true;

  let dispatch = createEventDispatcher();

  $: {
    if ($currentChartStyle === "lastfm_collage") {
      onDragEnter = undefined;
      onDrop = undefined;
      onDragOver = undefined;
      onDragStart = undefined;
      draggable = false;
    } else {
      onDragEnter = onDragEnterFunc;
      onDrop = onDropFunc;
      onDragOver = onDragOverFunc;
      onDragStart = onDragStartFunc;
      draggable = true;
    }
  }

  let buttonsVisible = false;
</script>

<style lang="scss">
  .column {
    background: transparent;
    width: var(--item-size);
    height: var(--item-size);
    min-width: var(--item-size);
    min-height: var(--item-size);
    max-width: var(--item-size);
    max-height: var(--item-size);
    margin-right: 5px;
    user-select: none;
    position: relative;

    &:last-child {
      margin-right: 0 !important;
    }

    &:focus {
      outline: 2px solid #155ab6;
    }
  }
  .empty {
    background: #fff;
  }
  .buttons {
    display: none;
  }
  .visible {
    display: block;
  }
  :global(.column button) {
    position: absolute;
    display: flex;
  }
  :global(.column .delete-item-button) {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  :global(.column .move-up-button) {
    top: 5%;
    left: 50%;
    transform: translateX(-50%);
  }
  :global(.column .move-down-button) {
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
  }
  :global(.column .move-left-button) {
    left: 3%;
    top: 50%;
    transform: translateY(-50%);
    padding: 0.45rem !important;
  }
  :global(.column .move-right-button) {
    right: 3%;
    top: 50%;
    transform: translateY(-50%);
    padding: 0.45rem !important;
  }
  :global(.empty button) {
    position: relative !important;
    top: auto !important;
    right: auto !important;
    display: flex !important;
    background: transparent !important;
    fill: #000 !important;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
  :global(.empty button svg) {
    font-size: 2.5rem !important;
  }
  @media screen and (max-width: 540px) {
    :root {
      --item-size: 38vw;
    }
  }
  @media screen and (max-width: 380px) {
    :root {
      --item-size: 35vw;
    }
  }
  @media screen and (min-width: 540px) and (max-width: 1024px) {
    :root {
      --item-size: 20vw;
    }
  }
  @media screen and (min-width: 1024px) {
    .column:hover .buttons {
      display: block;
    }
  }
</style>

<svelte:body
  on:click={(e) => {
    if (!e.target.closest('.column') || e.target.closest('.column').id !== `column-${row_index}-${column_index}`) {
      buttonsVisible = false;
    }
  }} />

<div
  class="column"
  id="column-{row_index}-{column_index}"
  style="margin-right: {gap}px;"
  data-row_index={row_index}
  data-column_index={column_index}
  on:drop={onDrop}
  on:dragover={onDragOver}
  on:dragstart={onDragStart}
  on:dragenter={onDragEnter}
  class:empty={current_list[row_index][column_index] === undefined}
  on:click={() => {
    buttonsVisible = true;
  }}
  on:keydown={(e) => {
    if (e.key === 'Delete') {
      dispatch('delete-column', { row_index, column_index });
    }

    if (e.ctrlKey && e.key === 'ArrowUp' && row_index !== 0) {
      dispatch('move-up', { row_index, column_index });
    }

    if (e.ctrlKey && e.key === 'ArrowDown' && row_index !== current_list.length - 1) {
      dispatch('move-down', { row_index, column_index });
    }

    if (e.ctrlKey && e.key === 'ArrowLeft' && column_index !== 0) {
      dispatch('move-left', { row_index, column_index });
    }

    if (e.ctrlKey && e.key === 'ArrowRight' && column_index !== current_list[0].length - 1) {
      dispatch('move-right', { row_index, column_index });
    }
  }}
  tabindex="0"
  {draggable}>
  {#if current_list[row_index] && current_list[row_index][column_index]}
    <img
      src={current_list[row_index][column_index].img_url}
      alt={current_list[row_index][column_index].title}
      data-artist={current_list[row_index][column_index].artist}
      data-album={current_list[row_index][column_index].album}
      id={current_list[row_index][column_index].id}
      {draggable}
      on:dragstart={onDragStart} />
    <div class="buttons" class:visible={buttonsVisible}>
      <Button
        iconOnly
        className="delete-item-button"
        id="delete-{row_index}-{column_index}"
        label="Delete Item"
        onClick={() => {
          if (document.getElementById(`delete-${row_index}-${column_index}`).style.display !== 'none') {
            dispatch('delete-column', { row_index, column_index });
          }
        }}
        extraProps={{ 'data-row_index': row_index, 'data-column_index': column_index }}>
        <DeleteIcon />
      </Button>
      {#if row_index !== 0}
        <Button
          iconOnly
          id="move-up-{row_index}-{column_index}"
          className="move-up-button"
          label="Move Up"
          onClick={() => dispatch('move-up', { row_index, column_index })}>
          <CaretUp />
        </Button>
      {/if}
      {#if row_index !== $currentChartList[$currentChartList.findIndex((chart) => chart.id === $currentChartId)].albumCollageOptions.rows - 1}
        <Button
          iconOnly
          id="move-down-{row_index}-{column_index}"
          className="move-down-button"
          label="Move Down"
          onClick={() => dispatch('move-down', { row_index, column_index })}>
          <CaretDown />
        </Button>
      {/if}
      {#if column_index !== 0}
        <Button
          iconOnly
          id="move-left-{row_index}-{column_index}"
          className="move-left-button"
          label="Move Left"
          onClick={() => dispatch('move-left', { row_index, column_index })}>
          <CaretLeft />
        </Button>
      {/if}
      {#if column_index !== $currentChartList[$currentChartList.findIndex((chart) => chart.id === $currentChartId)].albumCollageOptions.columns - 1}
        <Button
          iconOnly
          id="move-right-{row_index}-{column_index}"
          className="move-right-button"
          label="Move Right"
          onClick={() => dispatch('move-right', { row_index, column_index })}>
          <CaretRight />
        </Button>
      {/if}
    </div>
  {/if}
  {#if current_list[row_index][column_index] === undefined && $screenWidth < 539}
    <Button
      iconOnly
      id="add-{row_index}-{column_index}"
      className="add-album-button"
      onClick={() => dispatch('add-album', { row_index, column_index })}
      extraProps={{ 'data-row_index': row_index, 'data-column_index': column_index }}>
      <AddIcon />
    </Button>
  {/if}
</div>
