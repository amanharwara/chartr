<script>
  export let row_index;
  export let column_index;
  export let current_list;
  export let gap;
  export let onDrop;
  export let onDragOver;
  export let onDragStart;

  const blobToDataUrl = (blob, callback) => {
    let a = new FileReader();
    a.onload = function (e) {
      callback(e.target.result);
    };
    a.readAsDataURL(blob);
  };

  const onImgLoad = async (e) => {
    let img = e.target;
    if (img.src.includes("data:")) {
      return;
    } else {
      if (img && img.tagName === "IMG") {
        let img_blob = await fetch(
          "https://chartr-cors-proxy.herokuapp.com/" +
            e.target.src.replace("https://", "").replace(".com/", ".com:443/")
        );
        img_blob = await img_blob.blob();
        blobToDataUrl(img_blob, (data_url) => {
          if (e.target) {
            e.target.src = data_url;
          } else if (e.path) {
            e.path[0].src = data_url;
          }
        });
      }
    }
  };
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
  @media screen and (max-width: 540px) {
    :root {
      --item-size: 35vw;
    }
  }
  @media screen and (min-width: 540px) and (max-width: 1024px) {
    :root {
      --item-size: 20vw;
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
      on:dragstart={onDragStart}
      on:load={onImgLoad} />
  {/if}
</div>
