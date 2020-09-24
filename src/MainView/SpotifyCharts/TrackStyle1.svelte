<script>
  export let track;
  export let index;

  const getDataUrl = (img) => {
    // Create canvas
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    // Set width and height
    canvas.width = img.width;
    canvas.height = img.height;
    // Draw the image
    ctx.drawImage(img, 0, 0, img.width, img.height);
    return canvas.toDataURL("image/jpeg");
  };

  const onImgLoad = (e) => {
    let img = e.target;
    if (img && img.tagName === "IMG") {
      let dataUrl = getDataUrl(img);
      e.target.src = dataUrl;
    }
  };
</script>

<style lang="scss">
  .track {
    display: flex;
    align-items: flex-end;
    margin-bottom: 1vw;

    &:last-child {
      margin-bottom: 0;
    }

    .name {
      padding-bottom: 0.35vw;
      max-width: 100%;
      overflow: hidden;
    }

    .artist,
    .track-name {
      max-width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .track-name {
      font-weight: 600;
      font-size: 2.15vw;
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
</style>

<div class="track">
  <div class="img">
    <img
      src={track.album.images[0].url}
      alt={track.name}
      id={track.name + index}
      on:load={onImgLoad} />
    <div class="overlay" />
    <div class="number">{index + 1}.</div>
  </div>
  <div class="name">
    <div class="artist">{track.album.artists[0].name}</div>
    <div class="track-name">{track.name}</div>
  </div>
</div>
