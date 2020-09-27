<script>
  import Searchbox from "../shared/Searchbox.svelte";
  import SearchResults from "./SearchResults.svelte";
  import Button from "../shared/Button.svelte";
  import { current_list, searchProvider } from "../store";
  import Loader from "../shared/Loader.svelte";
  import searchItunes from "../utils/searchItunes";
  import searchDiscogs from "../utils/searchDiscogs";

  let currentSearchResults = [];
  let showLoader = false;

  const clearSearchResults = () => {
    currentSearchResults = [];
  };

  const handleSearch = async (e) => {
    try {
      showLoader = true;
      switch ($searchProvider) {
        case "itunes":
          currentSearchResults = await searchItunes(e.detail);
          showLoader = false;
          break;
        case "discogs":
          currentSearchResults = await searchDiscogs(e.detail);
          showLoader = false;
          break;
        default:
          currentSearchResults = await searchItunes(e.detail);
          showLoader = false;
          break;
      }
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

  .center {
    display: flex;
    flex-direction: column;
  }
</style>

<div class="add-album" class:collapsed class:center={showLoader}>
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
