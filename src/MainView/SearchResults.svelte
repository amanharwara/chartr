<script>
  export let results = [];

  const dragCover = (e) => {
    e.dataTransfer.setData("text", e.target.id);
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
    <img
      class="search-result"
      src={result.img_url}
      alt={result.title}
      data-artist={result.artist}
      data-album={result.album}
      id={result.id}
      draggable="true"
      on:dragstart={dragCover} />
  {:else}
    <div class="fallback-message">
      Use the search box to search for albums to add.
    </div>
  {/each}
</div>
