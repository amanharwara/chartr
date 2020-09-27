const authorizeLastFm = () => {
  let api_key = "LASTFM_KEY";
  let callback_url = encodeURIComponent(
    [
      location.protocol,
      "//",
      location.host,
      location.pathname,
      "?authorizeLastFm",
    ].join("")
  );

  window.location =
    "http://www.last.fm/api/auth/?api_key=" + api_key + "&cb=" + callback_url;
};

export default authorizeLastFm;
