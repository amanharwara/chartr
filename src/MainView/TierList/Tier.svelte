<script>
  import Button from "../../shared/Button.svelte";
  import DeleteIcon from "../../icons/DeleteIcon.svelte";
  import {
    addAlbumModalOptions,
    current_tier_list,
    showAddAlbumModal,
  } from "../../store";
  export let tier;

  import CaretUp from "../../icons/CaretUp.svelte";
  import CaretDown from "../../icons/CaretDown.svelte";

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

  const removeTierItem = (tier, id) => {
    let temp_tier_list = $current_tier_list;
    temp_tier_list[`tier_${tier}`] = temp_tier_list[`tier_${tier}`].filter(
      (item) => item.id !== id
    );
    $current_tier_list = temp_tier_list;
  };

  const move = (id, direction, tier) => {
    let tier_keys = Object.keys($current_tier_list);
    let current_tier_index = tier_keys.indexOf(`tier_${tier}`);
    let destination_index;
    if (direction === "up") {
      destination_index = current_tier_index - 1;
    } else {
      destination_index = current_tier_index + 1;
    }
    let destination_tier = tier_keys[destination_index];
    $current_tier_list[destination_tier] = [
      ...$current_tier_list[destination_tier],
      $current_tier_list[`tier_${tier}`].find((item) => item.id === id),
    ];
    removeTierItem(tier, id);
  };

  let buttonsHidden = true;

  const showButtons = (e) => {
    buttonsHidden = false;
  };

  const hideButtons = () => {
    buttonsHidden = true;
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

  .item {
    position: relative;
    display: flex;
  }

  :global(.item button) {
    position: absolute;
    display: flex;
  }

  :global(.item .delete-button) {
    top: 5%;
    right: 5%;
  }

  :global(.item .move-up-button) {
    top: 5%;
    left: 5%;
  }

  :global(.item .move-down-button) {
    bottom: 5%;
    left: 5%;
  }

  @media screen and (min-width: 1367px) {
    img {
      max-width: 6vw;
    }
  }
</style>

<svelte:body
  on:click={(e) => {
    if (!e.target.closest('.item')) {
      hideButtons();
    }
  }} />

<div
  class="tier"
  id="tier_{tier}"
  on:drop={onDrop}
  on:dragover={preventDefault}
  on:dragstart={onDragStart}
  on:dragenter={preventDefault}>
  <div class="tier-label label-{tier}">{tier.toUpperCase()}</div>
  <div
    class="tier-content"
    on:click={(e) => {
      console.log(e.target);
      if (!e.target.classList.contains('tier-content')) {
        e.preventDefault();
      } else {
        $showAddAlbumModal = true;
        $addAlbumModalOptions = { tier };
      }
    }}>
    {#each $current_tier_list[`tier_${tier}`] as item}
      <div class="item" on:click={showButtons}>
        <img
          src={item.src || item.img_url}
          alt={item.title}
          title={item.title}
          id={item.id} />
        <div style="display: {buttonsHidden ? 'none' : 'block'}">
          <Button
            iconOnly
            id="delete-{item.id}"
            className="delete-button"
            onClick={() => {
              removeTierItem(tier, item.id);
            }}
            extraProps={{ 'data-id': item.id, 'data-tier': tier }}>
            <DeleteIcon />
          </Button>
          {#if tier !== 's'}
            <Button
              iconOnly
              id="move-up-{item.id}"
              className="move-up-button"
              onClick={() => move(item.id, 'up', tier)}>
              <CaretUp />
            </Button>
          {/if}
          {#if tier !== 'f'}
            <Button
              iconOnly
              id="move-down-{item.id}"
              className="move-down-button"
              onClick={() => move(item.id, 'down', tier)}>
              <CaretDown />
            </Button>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>
