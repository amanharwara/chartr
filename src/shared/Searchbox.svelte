<script>
  import { createEventDispatcher } from "svelte";
  import SearchIcon from "../icons/SearchIcon.svelte";
  let search_value;
  let dispatch = createEventDispatcher();

  const searchOnEnter = (e) => {
    if (e.key === "Enter") {
      dispatch("search", search_value);
      search_value = "";
    }
  };
</script>

<style lang="scss">
  .search-box {
    display: block;
    width: 100%;
    position: relative;
  }
  input {
    width: 100%;
    box-sizing: border-box;
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    fill: #ced2d7;
    border: 0;
    font-size: 1.25rem;
    cursor: pointer;
    position: absolute;
    padding: 0.25rem 0.75rem;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  @media screen and (min-width: 1367px) {
    .search-box {
      margin: 0.5vw 0;
    }
    input,
    button {
      font-size: 1vw;
    }
  }
</style>

<div class="search-box">
  <input type="text" bind:value={search_value} on:keydown={searchOnEnter} />
  <button
    type="button"
    on:click={() => {
      dispatch('search', search_value);
      search_value = '';
    }}><SearchIcon /></button>
</div>
