<style>
  .top,
  .bottom {
    width: 0;
    border-left: calc(var(--width) / 2) solid transparent;
    border-right: calc(var(--width) / 2) solid transparent;
  }
  .top {
    border-bottom: calc(var(--width) / 3.464) solid #000;
  }
  .bottom {
    border-top: calc(var(--width) / 3.464) solid #000;
  }
  .rectangle {
    width: var(--width);
    height: calc(var(--width) / 1.732);
    background: #000;
  }
</style>

<div
  style="--width: 95px; padding-left: 2.6em; padding-right: 2.6em;
  padding-bottom: .5em; padding-top: .5em;">
  <div class="top" />
  <div class="rectangle" />
  <div class="bottom" />
</div>
