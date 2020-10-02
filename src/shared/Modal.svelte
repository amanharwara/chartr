<script>
  import CloseIcon from "../icons/CloseIcon.svelte";

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let title;
  export let id = "modal";
  export let closeModal = () => {
    dispatch("close-modal");
  };
  export let visible;
</script>

<style lang="scss">
  .hidden {
    display: none !important;
  }
  .modal {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
  .content {
    z-index: 1;
    background: #222a33;
    padding: 1.05rem;
    border-radius: 3px;
    max-width: 37vw;
  }
  .overlay {
    width: 100%;
    height: 100%;
    background: rgba(3, 4, 6, 0.9);
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
  .title {
    font-size: 1.75rem;
    font-weight: 700;
  }
  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.75rem;
  }
  .close-icon {
    font-size: 2.5rem;
    fill: #fff;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media screen and (max-width: 539px) {
    .content {
      max-width: 80vw;
    }
  }

  @media screen and (min-width: 1367px) {
    .content {
      padding: 1.05vw;
    }
    .title {
      font-size: 1.75vw;
    }
    .modal-header {
      margin-bottom: 0.75vw;
    }
    .close-icon {
      font-size: 2.5vw;
    }
  }
</style>

<div class="modal" {id} class:hidden={!visible}>
  <div class="content">
    <div class="modal-header">
      <div class="title">{title}</div>
      <div class="close-icon" on:click={closeModal}>
        <CloseIcon />
      </div>
    </div>
    <slot />
  </div>
  <div class="overlay" on:click={closeModal} />
</div>
