<script>
  import Header from "../MainView/Header.svelte";
  import Content from "../MainView/Content.svelte";
  import LeftSidebar from "../MainView/LeftSidebar.svelte";
  import RightSidebar from "../MainView/RightSidebar.svelte";
  import {
    currentChartStyle,
    albumCollageOptions,
    currentChartTitle,
    spotifyOptions,
  } from "../store";

  const downloadChart = () => {
    console.log("downloading chart");
  };

  const resetChart = () => {
    document.querySelectorAll(".column img").forEach((img) => img.remove());
    currentChartStyle.set("album_collage");
    albumCollageOptions.set({
      showAlbumTitles: false,
      showShadows: false,
      rows: 3,
      columns: 3,
      background: "#000",
      font: "Courier",
      gap: 5,
      padding: 7,
    });
    currentChartTitle.set("Untitled Chart");
    spotifyOptions.set({
      background: "#0E161E",
      foreground: "#D4FC79",
    });
  };
</script>

<style lang="scss">
  .main-view {
    background: #3f4246;
    color: #fff;

    width: 100%;
    height: 100%;
    box-sizing: border-box;

    display: grid;
    grid-template-columns: 0.85fr 2fr 0.85fr;
    grid-template-rows: 0.25fr 3.25fr;
  }

  @media screen and (max-width: 450px) {
    .main-view {
      display: flex;
      flex-direction: column;
    }
  }
</style>

<div class="main-view">
  <Header on:download-chart={downloadChart} on:reset-chart={resetChart} />
  <Content />
  <LeftSidebar />
  <RightSidebar />
</div>
