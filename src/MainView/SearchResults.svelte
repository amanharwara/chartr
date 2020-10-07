<script>
  import { screenWidth } from "../store";
  import blobToDataUrl from "../utils/blobToDataUrl";

  export let results = [];

  const dragCover = (e) => {
    e.dataTransfer.setData("text", e.target.id);
  };

  const onImgLoad = async (e) => {
    let img = e.target;
    if (img.src.includes("data:") || img.src.includes("favicon.png")) {
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
  .search-results {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    margin-top: 1rem;
    gap: 0.5rem 0.4rem;
    box-sizing: border-box;
    max-height: 75vh;
    overflow: auto;
    scrollbar-width: thin;
    scrollbar-color: dark;
  }

  .fallback-message {
    grid-column: 1 / 4;
    text-align: center;
  }

  .search-result {
    width: 5.35rem;
    height: 5.35rem;
    border-radius: 3px;
    cursor: pointer;
  }

  .empty {
    background: #fff;
  }

  @media screen and (max-width: 425px) {
    .search-results {
      gap: 0.5rem;
      max-height: 65vh;
    }

    .search-result {
      display: block;
      box-sizing: border-box;
      width: 28vw;
      height: 28vw;
    }
  }

  @media screen and (min-width: 540px) and (max-width: 1024px) {
    .search-results {
      max-height: 46vh;
    }
    .search-result {
      --item-size: 10%;
      width: var(--item-size);
      height: var(--item-size);
    }
  }

  @media screen and (min-width: 1367px) {
    .search-results {
      gap: 0.5vw;
    }

    .search-result {
      width: 6.75vw;
      height: 6.75vw;
    }
  }
</style>

<div class="search-results">
  {#each results as result}
    {#if result}
      {#if result.img_url}
        <img
          class="search-result"
          src={result.img_url}
          alt={result.title}
          data-artist={result.artist}
          data-album={result.album}
          id={result.id}
          draggable="true"
          on:click
          on:dragstart={dragCover}
          on:load={onImgLoad} />
      {/if}
    {:else if $screenWidth > 539}
      <div
        class="search-result empty"
        draggable="true"
        on:dragstart={dragCover}
        title="Drag this over an existing item to clear it."
        id="clear-item" />
    {/if}
  {:else}
    <div class="fallback-message">
      Use the search box to search for albums to add.
    </div>
  {/each}
</div>
