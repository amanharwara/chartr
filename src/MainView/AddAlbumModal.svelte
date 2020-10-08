<script>
  import Modal from "../shared/Modal.svelte";
  import { showAddAlbumModal } from "../store";
  import AddAlbum from "./AddAlbum.svelte";
</script>

<style>
  @media screen and (max-width: 539px) {
    :global(#add-album-modal) {
      align-items: flex-start;
      padding-top: 10vh;
    }
  }
</style>

<Modal
  title="Add Album"
  id="add-album-modal"
  visible={$showAddAlbumModal}
  closeModal={() => ($showAddAlbumModal = false)}>
  <AddAlbum isInModal={true} />
</Modal>
