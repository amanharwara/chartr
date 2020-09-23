<script>
  import { albumCollageOptions, current_list } from "../store";
  import Column from "./Column.svelte";

  const allowDrop = (e) => e.preventDefault();

  $: {
    let temp_list = $current_list;
    for (
      let row_index = 0;
      row_index < $albumCollageOptions.rows;
      row_index++
    ) {
      if (!$current_list[row_index]) {
        let row = [];
        for (
          let column_index = 0;
          column_index < $albumCollageOptions.columns;
          column_index++
        ) {
          let column = undefined;
          row.push(column);
        }
        temp_list.push(row);
      } else {
        for (
          let column_index = 0;
          column_index < $albumCollageOptions.columns;
          column_index++
        ) {
          if (!temp_list[row_index][column_index]) {
            temp_list[row_index][column_index] = undefined;
          }
        }
      }
    }
    current_list.set(temp_list);
  }

  const dropCover = (e) => {
    e.preventDefault();
    let data = e.dataTransfer.getData("text");

    let dragged_element = document.getElementById(data);

    let dragged = {
      row_index: undefined,
      column_index: undefined,
      img: undefined,
    };
    let target = {
      row_index: undefined,
      column_index: undefined,
      img: undefined,
    };

    if (dragged_element && dragged_element.tagName === "IMG") {
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

  const createImageElement = (image) => {
    let image_el = document.createElement("img");
    image_el.id = image.id;
    image_el.src = image.img_url;
    image_el.alt = image.title;
    image_el.dataset = {
      artist: image.artist,
      album: image.album,
    };
    image_el.draggable = true;
    image_el.ondragstart = dragCover;

    return image_el;
  };

  const updateCurrentListAfterDrag = (dragged, target) => {
    let temp_list = $current_list;

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

    $current_list = temp_list;
  };

  const dragCover = (e) => {
    e.dataTransfer.setData("text", e.target.id);
  };
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

  :global(.column img) {
    width: inherit !important;
    height: 100% !important;
    border-radius: 0 !important;
  }
</style>

<div id="album-collage" style="background: {$albumCollageOptions.background};">
  <div
    id="collage-container"
    style="background: {$albumCollageOptions.background}; padding: {$albumCollageOptions.padding}px">
    {#each { length: $albumCollageOptions.rows } as _, row_index}
      <div class="row" style="margin-bottom: {$albumCollageOptions.gap}px;">
        {#each { length: $albumCollageOptions.columns } as _, column_index}
          <Column
            {row_index}
            {column_index}
            current_list={$current_list}
            gap={$albumCollageOptions.gap}
            onDrop={dropCover}
            onDragOver={allowDrop}
            onDragStart={dragCover} />
        {/each}
      </div>
    {/each}
  </div>
  {#if $albumCollageOptions.showAlbumTitles === true}
    <div
      id="name-container"
      style="background: {$albumCollageOptions.background}; font-family: {$albumCollageOptions.font}; padding: {$albumCollageOptions.padding}px;">
      {#each { length: $albumCollageOptions.rows } as _, row_index}
        <div class="name-row">
          {#each { length: $albumCollageOptions.columns } as _, column_index}
            <div class="name">
              {#if $current_list[row_index] && $current_list[row_index][column_index]}
                {$current_list[row_index][column_index].title}
              {/if}
            </div>
          {/each}
        </div>
      {/each}
    </div>
  {/if}
</div>
