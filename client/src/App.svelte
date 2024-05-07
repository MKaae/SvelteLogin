<script>
  import { Router, Route } from "svelte-navigator";
  import SignupLogin from "./pages/SignupLogin/SignupLogin.svelte";
  import Chatroom from "./pages/Chatroom/Chatroom.svelte";
  import Home from "./pages/Home/Home.svelte";
  import Rules from "./pages/Rules/Rules.svelte";
  import PrivateRoute from "./util/PrivateRoute.svelte";
  import { onMount } from 'svelte';
  import SideBarToggle from "./components/SideBarToggle.svelte";
  import SideNav from "./components/SideNav.svelte";
  import Links from "./components/Links.svelte"

  //Components basic tailwind components from Flowbite.com, rewritten to work with svelte.

  //Documentation from https://svelte.dev/repl/33d2066858a44c6e800f2377105d8c38?version=4.2.15
  //Timer didn't look relevant, i suppose it happens a little fast but i think it works
  let windowWidth;
  let isSidebarOpen = true;

  function setWindowWidth() {
    windowWidth = window.innerWidth;
    isSidebarOpen = windowWidth >= 768;
  }

  onMount(() => {
    setWindowWidth();
    window.addEventListener('resize', setWindowWidth);

    return () => {
      window.removeEventListener('resize', setWindowWidth);
    };
  });

  function toggleSidebar() {
    isSidebarOpen = !isSidebarOpen;
  }
</script>

<Router>
  <SideBarToggle {toggleSidebar} />
  {#if isSidebarOpen}
    <SideNav {toggleSidebar} {isSidebarOpen}>
      <Links svgText={"M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"} nameText={"Home"} pathText={"/"}/>
      <Links svgText={"M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"} nameText={"Chatroom"} pathText={"/chatroom"}/>
      <Links svgText={"M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"} nameText={"Authentication"} pathText={"/auth"}/>
      <Links svgText={"M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"} nameText={"Rules"} pathText={"/rules"}/>
    </SideNav>
  {/if}
  <div class="p-5">
    <Route path="/"><Home /></Route>
    <PrivateRoute path="/chatroom"><Chatroom /></PrivateRoute>
    <Route path="/auth"><SignupLogin /></Route>
    <Route path="/rules"><Rules /></Route>
  </div>
</Router>
