<script>
  import { albumCollageOptions } from "../store";
  import Column from "./Column.svelte";

  let current_list = [];

  const allowDrop = (e) => e.preventDefault();

  const dropCover = (e) => {
    e.preventDefault();
    let data = e.dataTransfer.getData("text");

    let dragged = document.getElementById(data);
    let cloned = dragged.cloneNode();
    cloned.id = "cloned-" + Math.random() * 100 + cloned.id;

    if (!dragged.closest(".column")) {
      console.log("Dragging search result");
      if (e.target.tagName === "IMG") {
        console.log("Dragging onto image");
        e.target.parentNode.replaceChild(cloned, e.target);
      } else {
        console.log("Dragging onto empty");
        e.target.appendChild(cloned);
      }
    } else {
      console.log("Dragging chart element");
      if (dragged.tagName === "IMG") {
        console.log("Dragging chart image");
        if (e.target.tagName === "IMG") {
          console.log("Dragging onto image");
          let cloned_target = e.target.cloneNode();
          dragged.parentNode.replaceChild(cloned_target, dragged);
          e.target.parentNode.replaceChild(cloned, e.target);
        } else {
          console.log("Dragging onto empty");
          dragged.remove();
          e.target.appendChild(cloned);
        }
      } else {
        console.log("Dragging empty");
        if (e.target.tagName === "IMG") {
          console.log("Dragging onto image");
          dragged.appendChild(e.target.cloneNode());
          e.target.remove();
        }
      }
    }

    updateCurrentList();
  };

  const updateCurrentList = () => {
    let new_list = [];
    document.querySelectorAll(".row").forEach((row) => {
      let row_array = [];
      row.childNodes.forEach((column, index) => {
        if (column.nodeType !== 3) {
          let img = column.firstChild;

          if (img) {
            row_array[index] = {
              img_url: img.getAttribute("src"),
              title: img.getAttribute("alt"),
              artist: img.getAttribute("data-artist"),
              album: img.getAttribute("data-album"),
              id: img.id,
            };
          } else {
            row_array[index] = "";
          }
        }
      });
      new_list.push(row_array);
    });
    current_list = new_list;
  };

  $: {
    let _ = current_list;
    document.querySelectorAll(".column").forEach((column) => {
      if (column.children.length > 1) {
        column.lastChild.remove();
      }
    });
  }

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
            {current_list}
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
              {#if current_list[row_index] && current_list[row_index][column_index]}
                {current_list[row_index][column_index].title}
              {/if}
            </div>
          {/each}
        </div>
      {/each}
    </div>
  {/if}
</div>
