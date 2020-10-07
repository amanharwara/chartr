<script>
  import BackupIcon from "../icons/BackupIcon.svelte";
  import RestoreIcon from "../icons/RestoreIcon.svelte";
  import Button from "../shared/Button.svelte";
  import Modal from "../shared/Modal.svelte";
  import {
    currentChartStyle,
    current_list,
    current_tier_list,
    showBackupRestoreModal,
    currentChartTitle,
    albumCollageOptions,
  } from "../store";

  const backupChart = () => {
    let backupJSON = {
      chart_style: $currentChartStyle,
      chart_title: $currentChartTitle,
    };

    switch ($currentChartStyle) {
      case "album_collage":
        backupJSON.chart_data = $current_list;
        backupJSON.chart_options = $albumCollageOptions;
        break;

      case "tier_list":
        backupJSON.chart_data = $current_tier_list;
        break;

      default:
        break;
    }

    backupJSON = JSON.stringify(backupJSON);

    saveAs(
      new Blob([backupJSON], { type: "application/json" }),
      `${$currentChartTitle.toLowerCase().replaceAll(/\W/g, "-")}-backup.json`
    );
  };

  const restoreChart = () => {
    let fileInput = document.getElementById("restore-file");
    fileInput.click();
  };

  const restoreFromFile = async (e) => {
    for (const file of e.target.files) {
      let file_text = await file.text();
      let { chart_style, chart_title, chart_data, chart_options } = JSON.parse(
        file_text
      );

      $currentChartTitle = chart_title || "Untitled Chart";
      $currentChartStyle = chart_style;

      switch ($currentChartStyle) {
        case "album_collage":
          $current_list = chart_data;

          if (chart_options) {
            $albumCollageOptions = chart_options;
          }

          break;

        case "tier_list":
          $current_tier_list = chart_data;
          break;

        default:
          break;
      }

      $showBackupRestoreModal = false;
    }
  };
</script>

<style lang="scss">
  .buttons {
    display: flex;
  }
</style>

<Modal
  title="Backup / Restore"
  id="add-album-modal"
  visible={$showBackupRestoreModal}
  closeModal={() => ($showBackupRestoreModal = false)}>
  <div class="buttons">
    <Button label="Backup Chart" id="backup-chart" onClick={backupChart}>
      <BackupIcon />
    </Button>
    <Button label="Restore Chart" id="restore-chart" onClick={restoreChart}>
      <RestoreIcon />
    </Button>
  </div>
  <input
    type="file"
    id="restore-file"
    style="display: none;"
    accept="application/json"
    on:change={restoreFromFile} />
</Modal>
