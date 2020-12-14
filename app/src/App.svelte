<script>
  import { Router, Route } from "svelte-routing";
  import Home from "./routes/Home.svelte";
  import Room from "./routes/Room.svelte";
  import Board from "./components/Board.svelte";
  import DeckBuilder from "./routes/DeckBuilder.svelte";
</script>

<Router>
  <Route path="/" component={Home} />
  <Route path="deckBuilder" component={DeckBuilder} />
  <Route path="board" component={Board} />
  <Route path="room/:id" component={Room} />
  <Route>Not found !</Route>
</Router>
