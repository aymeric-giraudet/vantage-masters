<script lang="ts">
  const colors: Record<string, string> = {
    opponent: '--color: 255, 0, 0',
    player: '--color: 0, 0, 255',
    hover: '--color: 0, 200, 0',
  }

  export let state: 'opponent' | 'player' | 'hover'
</script>

<style>
  *,
  *:before,
  *:after {
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .hexagon:not(:last-child) {
    margin-right: 5rem;
  }

  .hexagon {
    opacity: 0.7;
    position: relative;
    width: 100px;
    height: 57.74px;
    background-color: #ffffff;
    margin: 28.87px 0;
    border-left: solid 2px rgb(var(--color));
    border-right: solid 2px rgb(var(--color));
  }

  .hexagon:before,
  .hexagon:after {
    content: '';
    position: absolute;
    z-index: 1;
    width: 70.71px;
    height: 70.71px;
    -webkit-transform: scaleY(0.5774) rotate(-45deg);
    -ms-transform: scaleY(0.5774) rotate(-45deg);
    transform: scaleY(0.5774) rotate(-45deg);
    background-color: inherit;
    left: 12.6447px;
  }

  .hexagon:before {
    top: -35.3553px;
    border-top: solid 2.8284px rgb(var(--color));
    border-right: solid 2.8284px rgb(var(--color));
  }

  .hexagon:after {
    bottom: -35.3553px;
    border-bottom: solid 2.8284px rgb(var(--color));
    border-left: solid 2.8284px rgb(var(--color));
  }

  .hexagon-small {
    top: -16%;
    left: 16%;
    z-index: 2;
    position: relative;
    width: 65px;
    height: 37.53px;
    background-color: #ffffff;
    margin: 18.76px 0;
    box-shadow: 0 0 10px rgba(var(--color), 0.9);
    border-left: solid 2px rgb(var(--color));
    border-right: solid 2px rgb(var(--color));
  }

  .hexagon-small:before,
  .hexagon-small:after {
    content: '';
    position: absolute;
    z-index: 1;
    width: 45.96px;
    height: 45.96px;
    -webkit-transform: scaleY(0.5774) rotate(-45deg);
    -ms-transform: scaleY(0.5774) rotate(-45deg);
    transform: scaleY(0.5774) rotate(-45deg);
    background-color: inherit;
    left: 7.519px;
    box-shadow: 0 0 10px rgba(var(--color), 0.9);
  }

  .hexagon-small:before {
    top: -22.981px;
    border-top: solid 2.8284px rgb(var(--color));
    border-right: solid 2.8284px rgb(var(--color));
  }

  .hexagon-small:after {
    bottom: -22.981px;
    border-bottom: solid 2.8284px rgb(var(--color));
    border-left: solid 2.8284px rgb(var(--color));
  }

  /*cover up extra shadows*/
  .hexagon-small span {
    display: block;
    position: absolute;
    top: 1.1547005383792515px;
    left: 0;
    width: 61px;
    height: 35.2184px;
    z-index: 2;
    background: inherit;
  }
</style>

<div style={colors[state]} class="hexagon">
  <div class="hexagon-small">
    <span />
  </div>
</div>
