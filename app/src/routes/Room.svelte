<script lang="ts">
  import { onDestroy } from "svelte";
  import { started, startGame, closeSocket } from "../gameStore";

  export let location;
  export let id;

  if (!location.state) {
    startGame({ roomId: id });
  }

  onDestroy(closeSocket);
</script>

<main>
  {#if $started}
    Start
  {:else}
    <p>Waiting for player...</p>
  {/if}
</main>
