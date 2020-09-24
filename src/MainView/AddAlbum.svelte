<script>
  import Searchbox from "../shared/Searchbox.svelte";
  import SearchResults from "./SearchResults.svelte";
  import Button from "../shared/Button.svelte";
  import { current_list } from "../store";
  import Loader from "../shared/Loader.svelte";

  let currentSearchResults = [];
  let showLoader = false;

  const clearSearchResults = () => {
    currentSearchResults = [];
  };

  const getClientWidth = () => {
    const w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName("body")[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth;

    return x;
  };

  const vwToPx = (value) => {
    const result = (getClientWidth() * value) / 100;
    return result;
  };

  const handleSearch = (e) => {
    try {
      showLoader = true;
      fetch(
        `https://chartr-cors-proxy.herokuapp.com/itunes.apple.com:443/search?entity=album&country=US&limit=25&term=${e.detail}`
      )
        .then((res) => res.json())
        .then((results) => {
          let search_results = [];

          Array.from(results.results).forEach((result) => {
            let search_result = {
              artist: result.artistName,
              album: result.collectionName,
              title: `${result.artistName} - ${result.collectionName}`,
              id: result.collectionId,
            };

            let dimensions = Math.round(vwToPx(16));

            if (getClientWidth() < 540) {
              dimensions = Math.round(vwToPx(40));
            }

            if (getClientWidth() > 540 && getClientWidth() < 1024) {
              dimensions = Math.round(vwToPx(25));
            }

            search_result.img_url = result.artworkUrl100.replace(
              "source/100x100",
              `source/${dimensions}x${dimensions}`
            );

            search_results = [...search_results, search_result];
          });

          currentSearchResults = search_results;
          showLoader = false;
        });
    } catch {
      console.error("Could not search.");
      showLoader = false;
    }
  };

  const onClickResult = (e) => {
    let img = {
      img_url: e.target.src,
      artist: e.target.dataset.artist,
      album: e.target.dataset.album,
      title: e.target.alt,
      id: "cloned" + Math.random() * 10 + e.target.id,
    };

    addAlbum(img);
  };

  const addAlbum = (img) => {
    let temp_list = $current_list;

    let empty_spot = {
      rowIndex: -1,
      columnIndex: -1,
    };

    temp_list.forEach((row, rowIndex) => {
      if (empty_spot.rowIndex === -1) {
        let columnIndex = row.indexOf(undefined);
        if (columnIndex !== -1) {
          empty_spot = {
            rowIndex,
            columnIndex,
          };
        }
      } else {
        return;
      }
    });

    if (temp_list[empty_spot.rowIndex]) {
      temp_list[empty_spot.rowIndex][empty_spot.columnIndex] = img;
    }

    $current_list = temp_list;
  };

  let collapsed = false;

  const collapseIfMobile = (e) => {
    if (document.documentElement.clientWidth < 539) {
      if (!e) {
        collapsed = !collapsed;
      } else if (e.target && e.target.id !== "clear-search-results") {
        collapsed = !collapsed;
      }
    } else {
      collapsed = false;
    }
  };

  collapseIfMobile();
</script>

<style lang="scss">
  .search-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;

    .heading {
      margin-bottom: 0;
    }
  }
</style>

<div class="add-album" class:collapsed>
  <div class="search-heading" on:click={collapseIfMobile}>
    <div class="heading">Add Album:</div>
    <Button
      label="Clear"
      id="clear-search-results"
      outlined
      labelOnly
      onClick={clearSearchResults} />
  </div>
  <Searchbox on:search={handleSearch} />
  {#if showLoader}
    <Loader />
  {:else}
    <SearchResults results={currentSearchResults} on:click={onClickResult} />
  {/if}
</div>
