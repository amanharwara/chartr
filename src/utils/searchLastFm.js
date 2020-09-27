const searchLastFm = async (query) => {
  let fetch_results = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${query}&limit=25&api_key=LASTFM_KEY&format=json`
  );
  let results_to_json = await fetch_results.json();
  let search_results = [];

  Array.from(results_to_json.results.albummatches.album).forEach((result) => {
    let search_result = {
      artist: result.artist,
      album: result.name,
      title: `${result.artist} - ${result.name}`,
      id: result.mbid,
      img_url: result.image[3]["#text"],
    };

    search_results = [...search_results, search_result];
  });

  let clear_item = undefined;

  return [...search_results, clear_item];
};

export default searchLastFm;
