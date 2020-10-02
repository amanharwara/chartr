<script>
  import { each } from "svelte/internal";
  import { current_tier_list } from "../../store";
  export let tier;

  const onDragStart = (e) => {
    e.dataTransfer.setData("text", e.target.id);
  };

  const onDrop = (e) => {
    e.preventDefault();
    let data = e.dataTransfer.getData("text");

    let dragged_element = document.getElementById(data);

    let tier = e.target.closest(".tier").id;

    let temp_tier_list = $current_tier_list;

    if (dragged_element && dragged_element.src) {
      temp_tier_list[tier] = [
        ...temp_tier_list[tier],
        {
          src: dragged_element.src,
          title: dragged_element.alt || "",
          id: data + Math.random() * 10 + "item",
        },
      ];
    }

    if (dragged_element && dragged_element.closest(".tier")) {
      temp_tier_list[dragged_element.closest(".tier").id] = temp_tier_list[
        dragged_element.closest(".tier").id
      ].filter((item) => item.id !== dragged_element.id);
    }

    $current_tier_list = temp_tier_list;
  };

  const preventDefault = (e) => {
    e.preventDefault();
  };
</script>

<style lang="scss">
  .tier {
    display: flex;
  }
  .tier-label {
    font-size: 1.35rem;
    padding: 1rem 1.35rem;
    color: #000;
    font-weight: 700;
    min-width: 1rem;
    text-align: center;
  }
  .tier-content {
    flex-grow: 2;
    display: flex;
    flex-wrap: wrap;

    img {
      max-width: 6rem;
    }
  }
  .label-s {
    background: #f86e6e;
  }
  .label-a {
    background: #eba667;
  }
  .label-b {
    background: #ebe967;
  }
  .label-c {
    background: #a2eb67;
  }
  .label-d {
    background: #67b0eb;
  }
  .label-e {
    background: #6769eb;
  }
  .label-f {
    background: #c167eb;
  }

  @media screen and (min-width: 1367px) {
    img {
      max-width: 6vw;
    }
  }
</style>

<div
  class="tier"
  id="tier_{tier}"
  on:drop={onDrop}
  on:dragover={preventDefault}
  on:dragstart={onDragStart}
  on:dragenter={preventDefault}>
  <div class="tier-label label-{tier}">{tier.toUpperCase()}</div>
  <div class="tier-content">
    {#each $current_tier_list[`tier_${tier}`] as item}
      <img src={item.src} alt={item.title} title={item.title} id={item.id} />
    {/each}
  </div>
</div>
