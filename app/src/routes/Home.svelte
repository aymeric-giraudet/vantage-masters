<script lang="ts">
  import { startGame } from '../gameStore'

  function matchmaking() {
    startGame({})
  }

  function createRoom() {
    startGame({ isProtected: true })
  }
</script>

<style>
  main {
    height: 100%;
    display: flex;
    place-content: center;
    align-items: center;
  }
  @media only screen and (max-width: 600px) {
    main {
      flex-direction: column;
    }
  }
  section {
    background-color: gainsboro;
    margin: 2em;
    width: 250px;
    padding: 1rem;
    border-radius: 0.5rem;
    height: 200px;
  }
</style>

<main>
  <section>
    <button on:click|once={matchmaking}>Matchmaking</button>
  </section>
  <section>
    <button on:click|once={createRoom}>
      I want to create a room for my friend to join
    </button>
  </section>
</main>
