<script>
  import BackupIcon from "../icons/BackupIcon.svelte";
  import RestoreIcon from "../icons/RestoreIcon.svelte";
  import Button from "../shared/Button.svelte";
  import Modal from "../shared/Modal.svelte";
  import {
    currentChartStyle,
    showBackupRestoreModal,
    currentChartList,
    currentChartId,
  } from "../store";

  // @TODO: Backup/restore the whole current chart and not specific chart type

  const backupChart = () => {
    let currentIndex = $currentChartList.findIndex(
      (chart) => chart.id === $currentChartId
    );

    let backupJSON = $currentChartList[currentIndex];

    backupJSON = JSON.stringify(backupJSON);

    saveAs(
      new Blob([backupJSON], { type: "application/json" }),
      `${$currentChartList[currentIndex].name
        .toLowerCase()
        .replaceAll(/\W/g, "-")}-backup.json`
    );
  };

  const restoreChart = () => {
    let fileInput = document.getElementById("restore-file");
    fileInput.click();
  };

  const restoreFromFile = async (e) => {
    for (const file of e.target.files) {
      let fileText = await file.text();
      let parsedChart = JSON.parse(fileText);
      let parsedChartIndex = $currentChartList.findIndex(
        (chart) => chart.id === parsedChart.id
      );

      if (parsedChartIndex !== -1) {
        $currentChartList[parsedChartIndex] = parsedChart;
      } else {
        $currentChartList = [...$currentChartList, parsedChart];
        $currentChartId = parsedChart.id;
      }

      $showBackupRestoreModal = false;
    }
    e.target.value = "";
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
    on:input={restoreFromFile} />
</Modal>
