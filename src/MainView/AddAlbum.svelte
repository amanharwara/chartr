<script>
  import Searchbox from "../shared/Searchbox.svelte";
  import SearchResults from "./SearchResults.svelte";
  import Button from "../shared/Button.svelte";
  import {
    addAlbumModalOptions,
    currentChartStyle,
    currentChartList,
    currentChartId,
    searchProvider,
    showAddAlbumModal,
  } from "../store";
  import Loader from "../shared/Loader.svelte";
  import searchItunes from "../utils/searchItunes";
  import searchDiscogs from "../utils/searchDiscogs";
  import searchLastFm from "../utils/searchLastFm";
  import isValidURL from "../utils/isValidURL";
  import { v4 as uuid } from 'uuid';

  export let isInModal = false;

  let currentSearchResults = [];
  let showLoader = false;

  const clearSearchResults = () => {
    currentSearchResults = [];
  };
  const handleSearch = async (e) => {
    currentSearchResults = [];
    if (isValidURL(e.detail)) {
      currentSearchResults = [
        {
          artist: "",
          album: "",
          title: e.detail,
          id: uuid(),
          img_url: e.detail,
        },
        undefined,
      ];
      return;
    };
    if (!isProd && $searchProvider === "test") {
      currentSearchResults = [
        {
          artist: "Brian Eno",
          album: "Ambient 1/Music For Airports",
          title: `Brian Eno - Ambient 1/Music For Airports`,
          id: "somtringe",
          img_url: "/favicon.png",
        },
        undefined,
      ];
    } else {
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
          case "lastfm":
            currentSearchResults = await searchLastFm(e.detail);
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

    if (isInModal) {
      let options = $addAlbumModalOptions;

      switch ($currentChartStyle) {
        case "album_collage":
          if (
            options.row_index !== undefined &&
            options.column_index !== undefined
          )
            $currentChartList[
              $currentChartList.findIndex(
                (chart) => chart.id === $currentChartId
              )
            ].albumCollageList[options.row_index][options.column_index] = img;
          break;
        case "tier_list":
          if (options.tier !== undefined) {
            let tier =
              $currentChartList[
                $currentChartList.findIndex(
                  (chart) => chart.id === $currentChartId
                )
              ].tierList[`tier_${options.tier}`];
            tier = [...tier, img];
            $currentChartList[
              $currentChartList.findIndex(
                (chart) => chart.id === $currentChartId
              )
            ].tierList[`tier_${options.tier}`] = tier;
          }
          break;
        default:
          break;
      }

      $addAlbumModalOptions = {};
      $showAddAlbumModal = false;
    } else if ($currentChartStyle === "album_collage") {
      addAlbumToEmptyCollageItem(img);
    }
  };

  const addAlbumToEmptyCollageItem = (img) => {
    let temp_list = $currentChartList.find(
      (chart) => chart.id === $currentChartId
    ).albumCollageList;

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

    $currentChartList[
      $currentChartList.findIndex((chart) => chart.id === $currentChartId)
    ].albumCollageList = temp_list;
  };
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

  .isInModal {
    .search-heading {
      display: none;
    }
  }

  .center {
    display: flex;
    flex-direction: column;
  }
</style>

<div class="add-album" class:center={showLoader} class:isInModal>
  <div class="search-heading">
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
    <SearchResults
      results={currentSearchResults}
      on:click={onClickResult}
      on:enter={(e) => onClickResult(e.detail)} />
  {/if}
</div>
