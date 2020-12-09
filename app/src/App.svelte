<script>
  import { Router, Route } from 'svelte-routing'
  import Home from './routes/Home.svelte'
  import Room from './routes/Room.svelte'
  import Board from './routes/Board.svelte'
</script>

<Router>
  <Route path="/">
    <Home />
  </Route>
  <Route path="board" component={Board} />
  <Route path="room/:id" component={Room} />
  <Route>Not found !</Route>
</Router>
