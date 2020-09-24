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
    settings,
    current_list,
  } from "../store";
  import html2canvas from "html2canvas";
  import { onMount } from "svelte";

  const saveSettings = () => {
    if (localStorage) {
      localStorage.setItem("settings", JSON.stringify($settings));
    }
  };

  if (window.location.hash.length > 0) {
    let access_token = window.location.hash
      .substring(1)
      .split("&")
      .map((key) => key.split("="))[0][1];

    $settings = {
      ...$settings,
      spotifyToken: access_token,
    };

    saveSettings();
  }

  const loadSettings = () => {
    if (localStorage && localStorage.getItem("settings")) {
      $settings = JSON.parse(localStorage.getItem("settings"));
    } else {
      localStorage.setItem("settings", JSON.stringify($settings));
    }
  };

  onMount(() => {
    loadSettings();
  });

  const downloadChart = () => {
    let element;

    switch ($currentChartStyle) {
      case "album_collage":
        element = document.getElementById("album-collage");
        break;
      case "spotify_top5_artists":
        console.log("spotify top 5 artist");
        element = document.getElementById("spotify-top5-artists");
        break;
      case "spotify_top5_tracks":
        console.log("spotify top 5 track");
        element = document.getElementById("spotify-top5-tracks");
        break;
      default:
        element = document.getElementById("album-collage");
        break;
    }

    html2canvas(element, { foreignObjectRendering: true }).then((canvas) => {
      let link = document.createElement("a");
      link.download = `${$currentChartTitle}.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  const resetChart = () => {
    current_list.set([]);
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

<div class="main-view" loadSettings>
  <Header on:download-chart={downloadChart} on:reset-chart={resetChart} />
  <Content />
  <LeftSidebar />
  <RightSidebar />
</div>
