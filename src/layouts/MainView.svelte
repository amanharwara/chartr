<script>
  import Header from "../MainView/Header.svelte";
  import Content from "../MainView/Content.svelte";
  import LeftSidebar from "../MainView/LeftSidebar.svelte";
  import RightSidebar from "../MainView/RightSidebar.svelte";
  import {
    currentChartStyle,
    currentChartTitle,
    settings,
    searchProvider,
    current_list,
    current_tier_list,
    albumCollageOptions,
    spotifyOptions,
    screenWidth,
  } from "../store";
  import domtoimage from "dom-to-image-more";
  import { onMount } from "svelte";
  import SupportModal from "../shared/SupportModal.svelte";
  import { saveAs } from "file-saver";
  import defaults from "../defaults";
  import BackupRestoreModal from "../MainView/BackupRestoreModal.svelte";

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
      $currentChartStyle = localStorage
        .getItem("currentChartStyle")
        .toString()
        .replaceAll(/\W/g, "");
    } else {
      if ($currentChartStyle) {
        localStorage.setItem(
          "currentChartStyle",
          $currentChartStyle.toString()
        );
      }
    }
  };

  onMount(() => {
    $screenWidth = document.documentElement.clientWidth;
    loadSettings();
  });

  function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(",")[1]);
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab], { type: mimeString });
    return blob;
  }

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
        try {
          let isFileSaverSupported = !!new Blob();

          if (isFileSaverSupported) {
            let blob = dataURItoBlob(res);
            console.log("using saveAs");
            saveAs(blob, `${$currentChartTitle}.png`);
          }
        } catch (e) {
          console.log("using link");
          let link = document.createElement("a");
          link.download = `${$currentChartTitle}.png`;
          link.href = res;
          link.target = "_blank";
          link.click();
        }
      })
      .catch((err) => console.error(err));
  };

  const resetChart = () => {
    $current_list = defaults.current_list;
    $current_tier_list = defaults.current_tier_list;
    $albumCollageOptions = defaults.albumCollageOptions;
    $currentChartTitle = defaults.currentChartTitle;
    $spotifyOptions = defaults.spotifyOptions;
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
    $screenWidth = document.documentElement.clientWidth;
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
