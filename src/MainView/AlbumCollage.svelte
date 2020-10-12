<script>
  import {
    addAlbumModalOptions,
    showAddAlbumModal,
    currentChartList,
    currentChartId,
  } from "../store";
  import Column from "./Column.svelte";

  const allowDrop = (e) => e.preventDefault();

  $: {
    let temp_list = $currentChartList.find(
      (chart) => chart.id === $currentChartId
    ).albumCollageList;
    for (
      let row_index = 0;
      row_index <
      $currentChartList.find((chart) => chart.id === $currentChartId)
        .albumCollageOptions.rows;
      row_index++
    ) {
      if (
        !$currentChartList.find((chart) => chart.id === $currentChartId)
          .albumCollageList[row_index]
      ) {
        let row = [];
        for (
          let column_index = 0;
          column_index <
          $currentChartList.find((chart) => chart.id === $currentChartId)
            .albumCollageOptions.columns;
          column_index++
        ) {
          let column = undefined;
          row.push(column);
        }
        temp_list.push(row);
      } else {
        for (
          let column_index = 0;
          column_index <
          $currentChartList.find((chart) => chart.id === $currentChartId)
            .albumCollageOptions.columns;
          column_index++
        ) {
          if (!temp_list[row_index][column_index]) {
            temp_list[row_index][column_index] = undefined;
          }
        }
      }
    }
    $currentChartList[
      $currentChartList.findIndex((chart) => chart.id === $currentChartId)
    ].albumCollageList = temp_list;
    localStorage.setItem("currentChartList", JSON.stringify($currentChartList));
  }

  const dropCover = (e) => {
    e.preventDefault();
    let data = e.dataTransfer.getData("text");

    let dragged_element = document.getElementById(data);

    let dragged = {
      row_index: undefined,
      column_index: undefined,
      img: undefined,
      element: dragged_element,
    };
    let target = {
      row_index: undefined,
      column_index: undefined,
      img: undefined,
      element: e.target,
    };

    if (
      !dragged_element.classList.contains("empty") &&
      dragged_element.querySelector("img")
    ) {
      dragged_element = dragged_element.querySelector("img");
    }

    if (
      dragged_element &&
      dragged_element.tagName === "IMG" &&
      dragged_element.src.length > 0
    ) {
      dragged.img = {
        artist: dragged_element.dataset.artist,
        album: dragged_element.dataset.album,
        title: dragged_element.alt,
        id: dragged_element.id,
        img_url: dragged_element.src,
      };
    }

    if (dragged_element.closest(".column")) {
      dragged.row_index = dragged_element.closest(".column").dataset.row_index;
      dragged.column_index = dragged_element.closest(
        ".column"
      ).dataset.column_index;
    }

    if (e.target.tagName === "IMG") {
      target.img = {
        artist: e.target.dataset.artist,
        album: e.target.dataset.album,
        title: e.target.alt,
        id: e.target.id,
        img_url: e.target.src,
      };

      if (e.target.closest(".column")) {
        target.row_index = e.target.closest(".column").dataset.row_index;
        target.column_index = e.target.closest(".column").dataset.column_index;
      }
    } else {
      if (e.target.matches(".column")) {
        target.row_index = e.target.dataset.row_index;
        target.column_index = e.target.dataset.column_index;
      }
    }

    console.log({ dragged, target });

    updateCurrentListAfterDrag(dragged, target);
  };

  const updateCurrentListAfterDrag = (dragged, target) => {
    let temp_list = $currentChartList.find(
      (chart) => chart.id === $currentChartId
    ).albumCollageList;

    if (!dragged.row_index && dragged.img) {
      console.log("Dragging search result");
      dragged.img.id = "cloned-" + Math.random() * 10 + dragged.img.id;

      if (target.row_index && !target.img) {
        console.log("Onto empty chart item");
        temp_list[target.row_index][target.column_index] = dragged.img;
      }

      if (target.row_index && target.img) {
        console.log("Onto chart image");
        temp_list[target.row_index][target.column_index] = dragged.img;
      }
    }

    if (!dragged.row_index && !dragged.img) {
      console.log("Dragging empty search result");

      if (target.row_index && target.img) {
        console.log("Onto chart image");
        temp_list[target.row_index][target.column_index] = undefined;
      }
    }

    if (dragged.row_index && !dragged.img) {
      console.log("Dragging empty chart item");

      if (target.row_index && target.img) {
        console.log("Onto chart image");
        temp_list[target.row_index][target.column_index] = undefined;
        temp_list[dragged.row_index][dragged.column_index] = target.img;
      }
    }

    if (dragged.row_index && dragged.img) {
      console.log("Dragging chart image");

      if (target.row_index && !target.img) {
        console.log("Onto empty chart item");
        temp_list[target.row_index][target.column_index] = dragged.img;
        temp_list[dragged.row_index][dragged.column_index] = undefined;
      }

      if (target.row_index && target.img) {
        console.log("Onto chart image");
        temp_list[target.row_index][target.column_index] = dragged.img;
        temp_list[dragged.row_index][dragged.column_index] = target.img;
      }
    }

    $currentChartList[
      $currentChartList.findIndex((chart) => chart.id === $currentChartId)
    ].albumCollageList = temp_list;
  };

  const dragCover = (e) => {
    e.dataTransfer.setData("text", e.target.id);
  };

  const deleteColumn = (e) => {
    let temp_list = $currentChartList.find(
      (chart) => chart.id === $currentChartId
    ).albumCollageList;
    let { row_index, column_index } = e.detail;
    temp_list[row_index][column_index] = undefined;
    $currentChartList[
      $currentChartList.findIndex((chart) => chart.id === $currentChartId)
    ].albumCollageList = temp_list;
  };

  const moveColumn = (e, direction) => {
    let temp_list = $currentChartList.find(
      (chart) => chart.id === $currentChartId
    ).albumCollageList;

    let { row_index, column_index } = e.detail;

    let destination_row;
    let destination_column;

    switch (direction) {
      case "up":
        destination_row = row_index - 1;
        destination_column = column_index;
        break;
      case "down":
        destination_row = row_index + 1;
        destination_column = column_index;
        break;
      case "left":
        destination_row = row_index;
        destination_column = column_index - 1;
        break;
      case "right":
        destination_row = row_index;
        destination_column = column_index + 1;
        break;
      default:
        break;
    }

    let current_item = temp_list[row_index][column_index];
    let destination_item = temp_list[destination_row][destination_column];

    temp_list[destination_row][destination_column] = current_item;
    temp_list[row_index][column_index] = destination_item;

    $currentChartList[
      $currentChartList.findIndex((chart) => chart.id === $currentChartId)
    ].albumCollageList = temp_list;

    setTimeout(() => {
      document.getElementById("album-collage").click();
      document
        .getElementById(`column-${destination_row}-${destination_column}`)
        .focus();
    }, 1);
  };

  let currentList = $currentChartList.find(
    (chart) => chart.id === $currentChartId
  ).albumCollageList;

  let albumCollageOptions = $currentChartList.find(
    (chart) => chart.id === $currentChartId
  ).albumCollageOptions;

  $: {
    currentList = $currentChartList.find(
      (chart) => chart.id === $currentChartId
    ).albumCollageList;
  }

  $: {
    albumCollageOptions = $currentChartList.find(
      (chart) => chart.id === $currentChartId
    ).albumCollageOptions;
  }
</script>

<style lang="scss">
  #album-collage {
    display: inline-flex;
    width: max-content;
    max-width: 70vw;
  }
  #name-container {
    background: #000;
    padding-left: 0 !important;
    display: block;

    .name-row {
      margin-bottom: 1.5rem;
    }
  }
  #collage-container {
    background: #000;
    display: inline-block;
    padding: 7px;
    box-sizing: border-box;

    .row {
      display: flex;
      width: 100%;
      margin-bottom: 5px;

      &:last-child {
        margin-bottom: 0 !important;
      }
    }
  }

  :root {
    --item-size: 12vw;
  }

  .inline-name-row {
    display: flex;
    width: 100%;
  }

  .inline-name-row:last-child {
    margin-bottom: 0 !important;
  }

  .inline-name-row .name {
    min-width: var(--item-size);
    max-width: var(--item-size);
    text-align: center;
    white-space: normal;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;

    &:last-child {
      margin-right: 0 !important;
    }
  }

  :global(.column img) {
    width: inherit !important;
    height: 100% !important;
    border-radius: 0 !important;
  }

  @media screen and (max-width: 1024px) {
    #album-collage {
      max-width: none;
      box-sizing: border-box;
    }
  }
</style>

<svelte:body
  on:keydown={(e) => {
    let activeElement = document.activeElement;
    console.log(activeElement.tagName);
    if (document.getElementById('album-collage') && activeElement.tagName !== 'INPUT' && !document.querySelector('.listContainer')) {
      if (e.key.includes('Arrow') && !e.ctrlKey && !activeElement.classList.contains('column')) {
        if (document.querySelector('.column')) document
            .querySelector('.column')
            .focus();
        activeElement = document.activeElement;
      }
    }
  }} />

<div
  id="album-collage"
  style="background: {albumCollageOptions.background}; font-family: {albumCollageOptions.font};"
  tabindex="0"
  on:keydown={(e) => {
    let activeElement = document.activeElement;

    if (document.getElementById('album-collage')) {
      if (e.key.includes('Arrow') && !activeElement.classList.contains('column')) {
        if (document.querySelector('.column')) document
            .querySelector('.column')
            .focus();
        activeElement = document.activeElement;
      }

      if (activeElement.classList.contains('column')) {
        let row_index = parseInt(activeElement.dataset.row_index);
        let column_index = parseInt(activeElement.dataset.column_index);

        if (e.key === 'ArrowUp' && row_index !== 0) {
          document.getElementById('album-collage').click();
          document
            .getElementById(`column-${row_index - 1}-${column_index}`)
            .focus();
        }
        if (e.key === 'ArrowDown' && row_index !== currentList.length - 1) {
          document.getElementById('album-collage').click();
          console.log(row_index + 1, column_index);
          document
            .getElementById(`column-${row_index + 1}-${column_index}`)
            .focus();
        }
        if (e.key === 'ArrowLeft' && column_index !== 0) {
          document.getElementById('album-collage').click();
          document
            .getElementById(`column-${row_index}-${column_index - 1}`)
            .focus();
        }
        if (e.key === 'ArrowRight' && column_index !== currentList[0].length - 1) {
          document.getElementById('album-collage').click();
          document
            .getElementById(`column-${row_index}-${column_index + 1}`)
            .focus();
        }
      }
    }
  }}>
  <div
    id="collage-container"
    style="background: {albumCollageOptions.background}; padding: {albumCollageOptions.padding}px">
    {#each { length: albumCollageOptions.rows } as _, row_index}
      <div
        class="row"
        style="margin-bottom: {albumCollageOptions.gap}px;"
        class:addExtraMargin={albumCollageOptions.titlesBelowCover}>
        {#each { length: albumCollageOptions.columns } as _, column_index}
          <Column
            {row_index}
            {column_index}
            current_list={currentList}
            gap={albumCollageOptions.gap}
            onDrop={dropCover}
            onDragOver={allowDrop}
            onDragStart={dragCover}
            on:add-album={(e) => {
              $showAddAlbumModal = true;
              $addAlbumModalOptions = { row_index: e.detail.row_index, column_index: e.detail.column_index };
            }}
            on:move-up={(e) => {
              moveColumn(e, 'up');
            }}
            on:move-down={(e) => {
              moveColumn(e, 'down');
            }}
            on:move-left={(e) => {
              moveColumn(e, 'left');
            }}
            on:move-right={(e) => {
              moveColumn(e, 'right');
            }}
            on:delete-column={deleteColumn} />
        {/each}
      </div>
      {#if albumCollageOptions.showAlbumTitles && albumCollageOptions.titlesBelowCover}
        <div
          class="inline-name-row"
          style="margin-bottom: {albumCollageOptions.gap}px;">
          {#each { length: albumCollageOptions.columns } as _, column_index}
            <div
              class="name"
              contenteditable={albumCollageOptions.allowEditTitles}
              on:input={(e) => {
                currentList[row_index][column_index].title = e.target.textContent;
              }}
              style="margin-right: {albumCollageOptions.gap}px;">
              {#if currentList[row_index][column_index]}
                {currentList[row_index][column_index].title}
              {/if}
            </div>
          {/each}
        </div>
      {/if}
    {/each}
  </div>
  {#if albumCollageOptions.showAlbumTitles && !albumCollageOptions.titlesBelowCover}
    <div
      id="name-container"
      style="background: {albumCollageOptions.background}; color: {albumCollageOptions.fontColor};  padding: {albumCollageOptions.padding}px;">
      {#each { length: albumCollageOptions.rows } as _, row_index}
        <div class="name-row">
          {#each { length: albumCollageOptions.columns } as _, column_index}
            <div
              class="name"
              contenteditable={albumCollageOptions.allowEditTitles}
              on:input={(e) => {
                currentList[row_index][column_index].title = e.target.textContent;
              }}>
              {#if currentList[row_index] && currentList[row_index][column_index]}
                {currentList[row_index][column_index].title}
              {/if}
            </div>
          {/each}
        </div>
      {/each}
    </div>
  {/if}
</div>
