<script>
  import blobToDataUrl from "../../utils/blobToDataUrl";

  export let track;
  export let index;

  const onImgLoad = async (e) => {
    let img = e.target;
    if (img.src.includes("data:")) {
      return;
    } else {
      if (img && img.tagName === "IMG") {
        let img_blob = await fetch(
          "https://chartr-cors-proxy.herokuapp.com/" +
            e.target.src.replace("https://", "").replace(".co/", ".co:443/")
        );
        img_blob = await img_blob.blob();
        blobToDataUrl(img_blob, (data_url) => {
          if (e.target) {
            e.target.src = data_url;
          } else if (e.path) {
            e.path[0].src = data_url;
          }
        });
      }
    }
  };
</script>

<style lang="scss">
  .track {
    display: flex;
    width: 100%;
    height: 7vh;
    overflow: hidden;
    position: relative;
    z-index: 0;
    padding: 0.5rem 1rem;
    box-sizing: border-box;
    align-items: center;
  }

  .info {
    display: flex;
    box-sizing: border-box;
    align-items: flex-end;
    width: 100%;
  }

  img {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    transform: translateY(-50%);
    opacity: 0.1;
  }

  .number,
  .track-name {
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1;
  }

  .by {
    margin: 0 0.35rem;
    font-weight: 300;
  }

  .number {
    margin-right: 0.5rem;
  }

  .artist {
    max-width: 45%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 500;
  }

  .track-name {
    max-width: 55%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media screen and (max-width: 450px) {
    .number,
    .track-name {
      line-height: 0.9;
    }
  }
</style>

<div class="track">
  <img
    src={track.album.images[0].url}
    alt={track.name}
    id={track.name + index}
    on:load={onImgLoad} />
  <div class="info">
    <div class="number">{index + 1}.</div>
    <div class="track-name">{track.name}</div>
    <div class="by">by</div>
    <div class="artist">{track.album.artists[0].name}</div>
  </div>
</div>
