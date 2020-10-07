<script>
  import blobToDataUrl from "../../utils/blobToDataUrl";

  export let artist;
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
  .artist {
    display: flex;
    align-items: flex-end;
    margin-bottom: 1vw;

    &:last-child {
      margin-bottom: 0;
    }

    .name {
      font-weight: 600;
      font-size: 2.15vw;
      padding-bottom: 0.35vw;
      max-width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .overlay {
      background: rgba(0, 0, 0, 0.5);
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }

    .img {
      margin-right: 1vw;
      position: relative;
      display: flex;
    }

    .number {
      position: absolute;
      font-size: 2vw;
      font-weight: 600;
      right: 0.75vw;
      bottom: 0.35vw;
    }

    img {
      max-width: 5vw;
      max-height: 5vw;
    }
  }

  @media screen and (max-width: 450px) {
    .artist {
      margin-bottom: 1rem;

      .name {
        font-size: 1.85rem;
        padding-bottom: 0.35rem;
      }

      .img {
        margin-right: 1rem;
      }

      .number {
        font-size: 1.5rem;
        right: 0.75rem;
        bottom: 0.35rem;
      }

      img {
        max-width: 4rem;
        max-height: 4rem;
      }
    }
  }
</style>

<div class="artist">
  <div class="img">
    <img
      src={artist.images[0].url}
      alt={artist.name}
      id={artist.name + index}
      on:load={onImgLoad} />
    <div class="overlay" />
    <div class="number">{index + 1}.</div>
  </div>
  <div class="name">{artist.name}</div>
</div>
