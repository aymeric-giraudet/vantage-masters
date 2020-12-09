<script lang="ts">
  import { started, startGame } from '../gameStore'

  export let location
  export let id

  if (!location.state) {
    startGame({ roomId: id })
  }
</script>

<main>
  {#if $started}
    Start
  {:else}
    <p>Waiting for player...</p>
  {/if}
</main>
