import { getClientWidth, itemSizeFromVw } from "./itemSizeCalc";

const searchItunes = async (query) => {
  let fetch_results = await fetch(
    `https://chartr-cors-proxy.herokuapp.com/itunes.apple.com:443/search?entity=album&country=US&limit=25&term=${query}`
  );
  let results_to_json = await fetch_results.json();

  let search_results = [];

  Array.from(results_to_json.results).forEach((result) => {
    let search_result = {
      artist: result.artistName,
      album: result.collectionName,
      title: `${result.artistName} - ${result.collectionName}`,
      id: result.collectionId,
    };

    let dimensions = 1000;

    if (getClientWidth() < 540) {
      dimensions = Math.round(itemSizeFromVw(50));
    }
    if (getClientWidth() > 540 && getClientWidth() < 1024) {
      dimensions = Math.round(itemSizeFromVw(25));
    }

    search_result.img_url = result.artworkUrl100.replace(
      "source/100x100",
      `source/${dimensions}x${dimensions}`
    );

    search_results = [...search_results, search_result];
  });

  let clear_item = undefined;

  return [...search_results, clear_item];
};

export default searchItunes;
