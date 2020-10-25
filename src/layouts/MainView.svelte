<script>
  import Header from "../MainView/Header.svelte";
  import Content from "../MainView/Content.svelte";
  import LeftSidebar from "../MainView/LeftSidebar.svelte";
  import RightSidebar from "../MainView/RightSidebar.svelte";
  import {
    currentChartStyle,
    settings,
    searchProvider,
    screenWidth,
    currentChartList,
    currentChartId,
  } from "../store";
  import domtoimage from "dom-to-image-more";
  import { onMount } from "svelte";
  import SupportModal from "../shared/SupportModal.svelte";
  import { saveAs } from "file-saver";
  import defaults from "../defaults";
  import BackupRestoreModal from "../MainView/BackupRestoreModal.svelte";
  import dataURItoBlob from "../utils/dataURItoBlob";

  if (window.location.toString().includes("authorizeSpotify")) {
    if (window.location.hash.length > 0) {
      let access_token = window.location.hash
        .substring(1)
        .split("&")
        .map((key) => key.split("="))[0][1];

      let _settings = [];

      if (localStorage.getItem("settings")) {
        _settings = JSON.parse(localStorage.getItem("settings"));
      }

      if (_settings.length === 0) {
        _settings = $settings;
      }

      $settings = {
        ..._settings,
        spotifyToken: access_token,
      };

      localStorage.setItem("settings", JSON.stringify($settings));
    }
  }

  const loadSettings = () => {
    if (!chart.lastfmCollageOptions) {
      $currentChartList[index].lastfmCollageOptions =
        defaults.lastfmCollageOptions;
    }

    if (localStorage && localStorage.getItem("settings")) {
      let _settings = JSON.parse(localStorage.getItem("settings"));
      Object.keys($settings).forEach((key) => {
        if (!_settings[key]) {
          _settings[key] = $settings[key];
        }
      });
      $settings = _settings;
    } else {
      localStorage.setItem("settings", JSON.stringify($settings));
    }

    if (localStorage && localStorage.getItem("searchProvider")) {
      $searchProvider = localStorage
        .getItem("searchProvider")
        .toString()
        .replaceAll(/\W/g, "");
    } else {
      if ($searchProvider) {
        localStorage.setItem("searchProvider", $searchProvider.toString());
      }
    }

    if (localStorage && localStorage.getItem("currentChartStyle")) {
      $currentChartStyle = localStorage.getItem("currentChartStyle");
    } else {
      if ($currentChartStyle) {
        localStorage.setItem(
          "currentChartStyle",
          $currentChartStyle.toString()
        );
      }
    }

    if (localStorage && localStorage.getItem("currentChartList")) {
      let chartList = JSON.parse(localStorage.getItem("currentChartList"));
      chartList.forEach((chart, index) => {
        // Custom Album Collage Options
        let albumCollageOptions = chart.albumCollageOptions;
        Object.keys(defaults.albumCollageOptions).forEach((option) => {
          if (!albumCollageOptions[option]) {
            if ($currentChartList[index].albumCollageOptions[option]) {
              albumCollageOptions[option] =
                $currentChartList[index].albumCollageOptions[option];
            } else {
              albumCollageOptions[option] =
                defaults.albumCollageOptions[option];
            }
          }
        });
        $currentChartList[index].albumCollageOptions = albumCollageOptions;

        // Last.fm Collage Options
        let lastfmCollageOptions = chart.lastfmCollageOptions || {};
        Object.keys(defaults.lastfmCollageOptions).forEach((option) => {
          if (!lastfmCollageOptions[option]) {
            if ($currentChartList[index].lastfmCollageOptions[option]) {
              lastfmCollageOptions[option] =
                $currentChartList[index].lastfmCollageOptions[option];
            } else {
              lastfmCollageOptions[option] =
                defaults.lastfmCollageOptions[option];
            }
          }
        });
        $currentChartList[index].lastfmCollageOptions = lastfmCollageOptions;

        if (!chart.lastfmCollageList) {
          $currentChartList[index].lastfmCollageList = [];
        }
      });
    } else {
      localStorage.setItem("currentChartList", $currentChartList);
    }
  };

  onMount(() => {
    $screenWidth = document.documentElement.clientWidth;
    loadSettings();
  });

  const downloadChart = () => {
    console.log(
      "start render",
      document.getElementById(`${$currentChartStyle.replaceAll("_", "-")}`)
    );
    domtoimage
      .toPng(
        document.getElementById(`${$currentChartStyle.replaceAll("_", "-")}`)
      )
      .then((res) => {
        let blob = dataURItoBlob(res);
        console.log("using saveAs");
        saveAs(
          blob,
          `${
            $currentChartList.find((chart) => chart.id === $currentChartId).name
          }.png`
        );
      })
      .catch((err) => console.error(err));
  };

  const resetChart = () => {
    let currentIndex = $currentChartList.findIndex(
      (chart) => chart.id === $currentChartId
    );
    switch ($currentChartStyle) {
      case "album_collage":
        $currentChartList[currentIndex].albumCollageList =
          defaults.currentAlbumCollageList;
        $currentChartList[currentIndex].albumCollageOptions =
          defaults.albumCollageOptions;
        break;
      case "lastfm_collage":
        $currentChartList[currentIndex].lastfmCollageList = [];
        $currentChartList[currentIndex].lastfmCollageOptions =
          defaults.lastfmCollageOptions;
        break;
      case "tier_list":
        $currentChartList[currentIndex].tierList = defaults.currentTierList;
        break;
      case "lastfm_top5":
        $currentChartList[currentIndex].lastFmOptions = defaults.lastFmOptions;
        break;
      default:
        $currentChartList[currentIndex].spotifyOptions =
          defaults.spotifyOptions;
        break;
    }
  };

  let supportModalVisible = false;

  const toggleModal = () => (supportModalVisible = !supportModalVisible);
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

  .main-content {
    display: grid;
    grid-template-columns: 0.85fr 2fr 0.85fr;
    grid-column: 1 / 4;
    grid-row: 2 / 3;
    overflow: hidden;
  }

  @media screen and (max-width: 539px) {
    .main-view {
      display: flex;
      flex-direction: column;
    }

    .main-content {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  }

  @media screen and (min-width: 540px) and (max-width: 1024px) {
    .main-view {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 0.25fr auto auto;
    }
  }
</style>

<svelte:window
  on:resize={() => {
    let width = document.documentElement.clientWidth;
    if (width < 539) {
      $screenWidth = width;
    } else if (width < 1280) {
      $screenWidth = width;
    }
  }} />

<div class="main-view">
  <Header
    on:download-chart={downloadChart}
    on:reset-chart={resetChart}
    on:toggle-modal={toggleModal} />
  <div class="main-content">
    <Content />
    <LeftSidebar />
    <RightSidebar />
  </div>
  <SupportModal
    on:close-modal={() => (supportModalVisible = false)}
    visible={supportModalVisible} />
  <BackupRestoreModal />
</div>
