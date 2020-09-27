const authorizeSpotify = () => {
  let client_id = "80f6b859de9647aebbc165b083249267";

  window.location =
    "https://accounts.spotify.com/authorize" +
    "?client_id=" +
    client_id +
    "&redirect_uri=" +
    encodeURIComponent(
      [
        location.protocol,
        "//",
        location.host,
        location.pathname,
        "?authorizeSpotify",
      ].join("")
    ) +
    "&scope=user-top-read" +
    "&response_type=token";
};

export default authorizeSpotify;
