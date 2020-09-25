<script>
  import CloseIcon from "../icons/CloseIcon.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
</script>

<style lang="scss">
  .support-modal {
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
    background: #1b242e;
    padding: 1rem;
    border-radius: 3px;
    max-width: 37vw;
  }
  .overlay {
    width: 100%;
    height: 100%;
    background: rgba(7, 11, 15, 0.9);
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
  .title {
    font-size: 1.75rem;
    font-weight: 700;
  }
  p {
    margin: 0 0 1rem 0;
    font-weight: 300;
  }
  p:last-child {
    margin-bottom: 0;
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
  a {
    color: #fff;
  }
  .sub-header {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  .donate-links {
    margin-bottom: 1rem;
  }
</style>

<div class="support-modal">
  <div class="content">
    <div class="modal-header">
      <div class="title">Support the Project!</div>
      <div class="close-icon" on:click={() => dispatch('close-modal')}>
        <CloseIcon />
      </div>
    </div>
    <p>
      Chartr is completely free of cost and open source without any ads or
      tracking. If Chartr has been useful to you, consider supporting the
      project in any way you can.
    </p>
    <div class="sub-header">Donate:</div>
    <div class="donate-links">
      <a
        href="https://ko-fi.com/U7U3114IH"
        target="_blank"
        rel="noreferrer noopener"><img
          src="https://www.ko-fi.com/img/githubbutton_sm.svg"
          alt="Buy Me a Coffee at ko-fi.com" /></a>
      <a
        href="https://liberapay.com/aman_harwara/donate"
        target="_blank"
        rel="noreferrer noopener"><img
          alt="Donate using Liberapay"
          src="https://liberapay.com/assets/widgets/donate.svg" /></a>
    </div>
    <div class="sub-header">Contribute in other ways:</div>
    <p>
      If you cannot donate money, that’s not a problem! Since Chartr is open
      source, you can help Chartr in many other ways such as helping fix <a
        href="https://github.com/amanharwara/chartr/issues"
        target="_blank"
        rel="noopener noreferrer">bugs/issues</a>, contributing to the <a
        href="https://github.com/amanharwara/chartr/"
        target="_blank"
        rel="noopener noreferrer">code</a>, etc.
    </p>
  </div>
  <div class="overlay" on:click={() => dispatch('close-modal')} />
</div>
