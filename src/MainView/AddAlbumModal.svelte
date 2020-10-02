<script>
  import Modal from "../shared/Modal.svelte";
  import { showAddAlbumModal } from "../store";
  import AddAlbum from "./AddAlbum.svelte";
</script>

<Modal
  title="Add Album"
  id="add-album-modal"
  visible={$showAddAlbumModal}
  closeModal={() => ($showAddAlbumModal = false)}>
  <AddAlbum isInModal={true} />
</Modal>
