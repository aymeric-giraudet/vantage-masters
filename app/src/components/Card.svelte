<script lang="ts">
  const colors: Record<string, string> = {
    master: "--color: 148, 0, 211",
    earth: "--color: 139, 69, 19",
    water: "--color: 0, 0, 255",
    fire: "--color: 255, 0, 0",
    heaven: "--color: 200, 200, 200",
    magic: "--color: 10, 10, 10",
  };

  let color;

  $: if (type === "natial") {
    color = colors[element];
  } else {
    color = colors[type];
  }

  export let scale: number = 1;
  export let type: "master" | "natial" | "magic";
  export let name: string;
  export let element: "fire" | "water" | "heaven" | "earth" | "" = "";
  export let subType: "bow" | "wing" | "" = "";
  export let mana: number;
  export let attack: number = 0;
  export let hp: number = 0;
</script>

<style>
  .card {
    transform-origin: left top;
    height: 120px;
    width: 80px;
    border: solid 5px black;
    border-radius: 0.5rem;
    padding: 3px;
    text-align: center;
    display: flex;
    flex-direction: column;
  }
  .name {
    font-size: x-small;
    background-color: rgba(var(--color), 0.3);
    padding: 2px;
  }
  .element {
    color: white;
    float: left;
    background-color: rgb(var(--color));
    line-height: 20px;
    height: 20px;
    width: 20px;
    border: 2px solid black;
    border-radius: 50%;
    padding: 3px;
  }
  .mana {
    background-color: green;
    color: white;
    line-height: 15px;
    height: 15px;
    width: 15px;
    float: right;
    border: 2px solid black;
    border-radius: 50%;
    padding: 3px;
  }
  .subType {
    margin-left: 4px;
    float: left;
    background-color: black;
    line-height: 10px;
    height: 10px;
    width: 10px;
    color: white;
    border: 2px solid black;
    border-radius: 50%;
    padding: 3px;
  }
  .attack {
    background-color: black;
    color: white;
    line-height: 15px;
    height: 15px;
    width: 20px;
    float: left;
    border: 2px solid black;
    padding: 3px;
  }
  .hp {
    background-color: black;
    color: white;
    line-height: 15px;
    height: 15px;
    width: 20px;
    float: right;
    border: 2px solid black;
    border-bottom-left-radius: 50%;
    border-bottom-right-radius: 50%;
    padding: 3px;
  }
</style>

<div style={`${color}; transform: scale(${scale});`} class="card">
  <div class="name">{name}</div>

  <div style="display: flow-root">
    {#if element}
      <div class="element">{element.charAt(0).toUpperCase()}</div>
    {/if}
    <div class="mana">{mana}</div>
  </div>

  {#if subType}
    <div class="subType">{subType.charAt(0)}</div>
  {/if}

  {#if type !== 'magic'}
    <div style="margin-top: auto">
      <div class="attack">{attack}</div>
      <div class="hp">{hp}</div>
    </div>
  {/if}
</div>
