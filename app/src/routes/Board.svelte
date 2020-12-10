<script lang="ts">
  import Card from './Card.svelte'
  import Hexagon from './Hexagon.svelte'
</script>

<style>
  .opponentCards {
    height: 140px;
  }
  .board {
    display: grid;
    place-items: center;
    align-self: center;
  }
  main {
    height: 100%;
    display: grid;
  }
  .row {
    display: flex;
  }
  hr {
    width: -webkit-fill-available;
  }
  .hand {
    display: flex;
    justify-content: center;
  }
  .player {
    align-self: end;
  }
  .opponent {
    align-self: start;
  }
</style>

<main>
  <div class="hand opponent">
    <Card />
    <Card />
  </div>
  <div class="board">
    <div class="row">
      <Hexagon state="opponent" />
      <Hexagon state="opponent" />
      <Hexagon state="opponent" />
    </div>
    <div class="row">
      <Hexagon state="opponent" />
      <Hexagon state="opponent" />
      <Hexagon state="opponent" />
      <Hexagon state="opponent" />
    </div>
    <hr />
    <div class="row">
      <Hexagon state="player" />
      <Hexagon state="player" />
      <Hexagon state="player" />
      <Hexagon state="player" />
    </div>
    <div class="row">
      <Hexagon state="player" />
      <Hexagon state="player" />
      <Hexagon state="player" />
    </div>
  </div>
  <div class="hand player">
    <Card />
    <Card />
  </div>
</main>
