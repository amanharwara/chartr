<script>
  import Searchbox from "../shared/Searchbox.svelte";
  import SearchResults from "./SearchResults.svelte";
  import { settings } from "../store";
  import Button from "../shared/Button.svelte";

  let currentSearchResults = [];

  const clearSearchResults = () => {
    currentSearchResults = [];
  };

  const handleSearch = (e) => {
    try {
      fetch(
        `https://itunes.apple.com/search?entity=album&country=US&limit=25&term=${e.detail}`
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

            if ($settings.dataSaverMode) {
              search_result.img_url = result.artworkUrl100.replace(
                "source/100x100",
                "source/400x400"
              );
            } else {
              search_result.img_url = result.artworkUrl100.replace(
                "source/100x100",
                "source/1000x1000"
              );
            }

            search_results = [...search_results, search_result];
          });

          currentSearchResults = search_results;
        });
    } catch {
      console.error("Could not search.");
    }
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
  <SearchResults results={currentSearchResults} />
</div>
