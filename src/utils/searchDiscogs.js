const searchDiscogs = async (query) => {
  let fetch_results = await fetch(
    `https://api.discogs.com/database/search?q=${query}&type=release`,
    {
      headers: new Headers([
        ["Authorization", `Discogs key=DISCOGS_KEY, secret=DISCOGS_SECRET`],
      ]),
    }
  );
  let results_to_json = await fetch_results.json();
  let search_results = [];

  Array.from(results_to_json.results).forEach((result) => {
    let search_result = {
      artist: result.title.split("-")[0],
      album: result.title.split("-")[1],
      title: result.title,
      id: result.id,
      img_url: result.cover_image,
    };

    search_results = [...search_results, search_result];
  });

  let clear_item = undefined;

  return [...search_results, clear_item];
};

export default searchDiscogs;
