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
    searchProvider,
  } from "../store";
  import domtoimage from "dom-to-image-more";
  import { onMount } from "svelte";
  import SupportModal from "../shared/SupportModal.svelte";
  import { saveAs } from "file-saver";
  import { polyfill } from "mobile-drag-drop";

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
    loadSettings();
    polyfill();
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
        console.log("render complete", res);
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

  @media screen and (max-width: 539px) {
    .main-view {
      /* grid-template-columns: 1fr;
      grid-template-rows: 0.25fr auto 1fr 1fr; */
      display: flex;
      flex-direction: column;
    }
  }

  @media screen and (min-width: 540px) and (max-width: 1024px) {
    .main-view {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 0.25fr auto auto;
    }
  }
</style>

<div class="main-view">
  <Header
    on:download-chart={downloadChart}
    on:reset-chart={resetChart}
    on:toggle-modal={toggleModal} />
  <Content />
  <LeftSidebar />
  <RightSidebar />
  {#if supportModalVisible}
    <SupportModal on:close-modal={() => (supportModalVisible = false)} />
  {/if}
</div>
