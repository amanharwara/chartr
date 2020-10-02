<script>
  import { createEventDispatcher } from "svelte";
  import Modal from "./Modal.svelte";

  const dispatch = createEventDispatcher();

  export let visible = false;
</script>

<style lang="scss">
  p {
    margin: 0 0 1rem 0;
    font-weight: 300;
  }
  p:last-child {
    margin-bottom: 0;
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

  @media screen and (min-width: 1367px) {
    p {
      margin: 0 0 1vw 0;
      font-size: 1.05vw;
    }
    .sub-header {
      font-size: 1.25vw;
      margin-bottom: 0.5vw;
    }
    .donate-links {
      margin-bottom: 1vw;
    }
  }

  @media screen and (min-width: 2000px) {
    img {
      height: 1.75vw;
    }
  }
</style>

<Modal
  title="Support the Project!"
  id="support-modal"
  {visible}
  closeModal={() => dispatch('close-modal')}>
  <p>
    Chartr is completely free of cost and open source without any ads or
    tracking. If Chartr has been useful to you, consider supporting the project
    in any way you can.
  </p>
  <div class="sub-header">Donate:</div>
  <div class="donate-links">
    <a
      href="https://ko-fi.com/U7U3114IH"
      target="_blank"
      rel="noreferrer noopener"><img
        src="kofi-button.svg"
        alt="Buy Me a Coffee at ko-fi.com" /></a>
    <a
      href="https://liberapay.com/aman_harwara/donate"
      target="_blank"
      rel="noreferrer noopener"><img
        alt="Donate using Liberapay"
        src="liberapay.svg" /></a>
  </div>
  <div class="sub-header">Contribute in other ways:</div>
  <p>
    If you cannot donate money, that’s not a problem! Since Chartr is open
    source, you can help Chartr in many other ways such as helping fix
    <a
      href="https://github.com/amanharwara/chartr/issues"
      target="_blank"
      rel="noopener noreferrer">bugs/issues</a>, contributing to the
    <a
      href="https://github.com/amanharwara/chartr/"
      target="_blank"
      rel="noopener noreferrer">code</a>, etc.
  </p>
</Modal>
