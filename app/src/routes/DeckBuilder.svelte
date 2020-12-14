<script>
  import Card from "../components/Card.svelte";
  import { cards } from "../cards";

  let master;
  let deck = [];

  const savedDeck = localStorage.getItem("deck");
  if (savedDeck) {
    const [savedMaster, savedCards] = JSON.parse(savedDeck);
    master = { ...cards[savedMaster], name: savedMaster };
    deck = savedCards.map((name) => ({ ...cards[name], name }));
  }

  const orders = {
    earth: 1,
    water: 2,
    fire: 3,
    heaven: 4,
  };

  const sortCards = (a, b) => {
    if (a.type === "master") {
      return 1;
    }
    if (b.type === "master") {
      return -1;
    }
    if ((a.type === "magic" && b.type === "magic") || a.element === b.element) {
      return a.mana - b.mana;
    }
    if (a.type === "magic" && b.type === "natial") {
      return 1;
    }
    if (a.type === "natial" && b.type === "magic") {
      return -1;
    }
    return orders[a.element] - orders[b.element];
  };

  function addCard(card) {
    if (card.type === "master") {
      master = card;
    } else if (deck.length < 20) {
      deck = [...deck, card].sort(sortCards);
    }
  }

  function removeCard(card) {
    const index = deck.indexOf(card);
    deck = [...deck.slice(0, index), ...deck.slice(index + 1, deck.length)];
  }

  function save() {
    localStorage.setItem(
      "deck",
      JSON.stringify([master.name, deck.map((card) => card.name)])
    );
  }

  let filter = "earth";

  $: availableCards = Object.entries(cards)
    .map(([name, value]) => ({
      ...value,
      name,
    }))
    .filter((card) =>
      filter === "magic" || filter === "master"
        ? card.type === filter
        : card.element === filter
    )
    .sort(sortCards);
</script>

<style>
  .tab {
    overflow: hidden;
    border: 1px solid #ccc;
    background-color: #f1f1f1;
  }

  /* Style the buttons that are used to open the tab content */
  .tab button {
    background-color: inherit;
    float: left;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 14px 16px;
    transition: 0.3s;
  }

  /* Change background color of buttons on hover */
  .tab button:hover {
    background-color: #ddd;
  }

  /* Create an active/current tablink class */
  .tab button.active {
    background-color: #ccc;
  }

  /* Style the tab content */
  .tabcontent {
    display: none;
    padding: 6px 12px;
    border: 1px solid #ccc;
    border-top: none;
  }
  .grid-container {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 5px 5px;
    grid-template-areas:
      "Master . . . . . . . . . ."
      "Master . . . . . . . . . .";
  }

  .Master {
    grid-area: Master;
  }

  .cards {
    display: inline-flex;
  }
</style>

<main>
  <div class="grid-container">
    <div class="Master">
      {#if master}
        <Card {...master} scale={2} />
      {/if}
    </div>
    {#each deck as card}
      <div on:click={removeCard(card)}>
        <Card {...card} />
      </div>
    {/each}
  </div>
  <div class="tab">
    <button
      class="tablinks"
      on:click={() => (filter = 'earth')}
      class:active={filter === 'earth'}>Earth</button>
    <button
      class="tablinks"
      on:click={() => (filter = 'water')}
      class:active={filter === 'water'}>Water</button>
    <button
      class="tablinks"
      on:click={() => (filter = 'fire')}
      class:active={filter === 'fire'}>Fire</button>
    <button
      class="tablinks"
      on:click={() => (filter = 'heaven')}
      class:active={filter === 'heaven'}>Heaven</button>
    <button
      class="tablinks"
      on:click={() => (filter = 'magic')}
      class:active={filter === 'magic'}>Magic</button>
    <button
      class="tablinks"
      on:click={() => (filter = 'master')}
      class:active={filter === 'master'}>Master</button>
  </div>
  <div class="tabcontent cards">
    {#each availableCards as card}
      <div on:click={addCard(card)} style="margin-right: 5px">
        <Card {...card} />
      </div>
    {/each}
  </div>
</main>
<button on:click={save}>Save deck</button>
