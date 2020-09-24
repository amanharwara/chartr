<script>
  import Searchbox from "../shared/Searchbox.svelte";
  import SearchResults from "./SearchResults.svelte";
  import Button from "../shared/Button.svelte";
  import { current_list } from "../store";

  let currentSearchResults = [];

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

  const blobToDataUrl = (blob, callback) => {
    let a = new FileReader();
    a.onload = function (e) {
      callback(e.target.result);
    };
    a.readAsDataURL(blob);
  };

  const handleSearch = (e) => {
    fetch(
      `https://chartr-cors-proxy.herokuapp.com/itunes.apple.com:443/search?entity=album&country=US&limit=25&term=${e.detail}`
    )
      .then((res) => res.json())
      .then(async (results) => {
        let search_results = [];

        Array.from(results.results).forEach(async (result) => {
          let search_result = {
            artist: result.artistName,
            album: result.collectionName,
            title: `${result.artistName} - ${result.collectionName}`,
            id: result.collectionId,
          };

          let dimensions = Math.round(vwToPx(24));

          if (getClientWidth() < 500) {
            dimensions = Math.round(vwToPx(40));
          }

          let img_blob = await fetch(
            result.artworkUrl100
              .replace(".com/image", ".com:443/image")
              .replace("https://", "https://chartr-cors-proxy.herokuapp.com/")
              .replace("source/100x100", `source/${dimensions}x${dimensions}`)
          );

          img_blob = await img_blob.blob();

          blobToDataUrl(img_blob, (data_url) => {
            search_result.img_url = data_url;

            search_results = [...search_results, search_result];
          });
        });

        currentSearchResults = search_results;
      });
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

<div class="add-album">
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
  <SearchResults results={currentSearchResults} on:click={onClickResult} />
</div>
