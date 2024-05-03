<script>
  import { Router, Link, Route } from "svelte-navigator";
  import SignupLogin from "./pages/SignupLogin/SignupLogin.svelte";
  import Chatroom from "./pages/Chatroom/Chatroom.svelte";
  import Home from "./pages/Home/Home.svelte";
  import Rules from "./pages/Rules/Rules.svelte";
  import PrivateRoute from "./util/PrivateRoute.svelte";

  import { onMount } from "svelte";

  let drawerTarget;

  onMount(() => {
    const drawerToggleButton = document.querySelector("[data-drawer-toggle]");
    drawerTarget = document.getElementById("default-sidebar");

    drawerToggleButton.addEventListener("click", toggleDrawer);
    drawerTarget.addEventListener("click", closeSidebarOnClickInside);
  });

  function toggleDrawer(event) {
    drawerTarget.classList.toggle("translate-x-0");
  }

  function closeSidebarOnClickInside(event) {
    if (drawerTarget.contains(event.target)) {
      drawerTarget.classList.remove("translate-x-0");
    }
  }
</script>

<Router>
  <button
    data-drawer-target="default-sidebar"
    data-drawer-toggle="default-sidebar"
    aria-controls="default-sidebar"
    type="button"
    class=" inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 z-50"
  >
    <span class="sr-only">Open sidebar</span>
    <svg
      class="w-6 h-6"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clip-rule="evenodd"
        fill-rule="evenodd"
        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
      ></path>
    </svg>
  </button>

  <aside
    id="default-sidebar"
    class="fixed top-0 left-0 z-40 w-[200px] h-screen transition-transform -translate-x-full md:translate-x-0"
    aria-label="Sidenav"
  >
    <div
      class="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700"
    >
      <ul class="space-y-2">
        <li>
          <Link
            to="/"
            class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg 
              dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <svg
              aria-hidden="true"
              class="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400
                  group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path
                d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"
              ></path></svg
            >
            <span class="ml-3">Home</span>
          </Link>
        </li>
        <li>
          <Link
            to="/chatroom"
            class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg 
              dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <svg
              aria-hidden="true"
              class="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400
                  group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"
              ></path>
              <path
                d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
              ></path></svg
            >
            <span class="flex-1 ml-3 whitespace-nowrap">Chatroom</span>
          </Link>
        </li>
        <li>
          <Link
            to="/auth"
            class="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg 
              transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            aria-controls="dropdown-authentication"
            data-collapse-toggle="dropdown-authentication"
          >
            <svg
              aria-hidden="true"
              class="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75
                  group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clip-rule="evenodd"
              ></path></svg
            >
            <span class="flex-1 ml-3 text-left whitespace-nowrap"
              >Authentication</span
            >
          </Link>
        </li>
        <li>
          <Link
            to="/rules"
            data-tooltip-target="tooltip-settings"
            class="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg 
            transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
          >
            <svg
              aria-hidden="true"
              class="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75
              group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 
              2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 
              1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 
              1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clip-rule="evenodd"
              ></path></svg
            >
            <span class="flex-1 ml-3 text-left whitespace-nowrap">Rules</span>
          </Link>
        </li>
      </ul>
    </div>
  </aside>

  <div>
    <Route path="/"><Home /></Route>
    <PrivateRoute path="/chatroom"><Chatroom /></PrivateRoute>
    <Route path="/auth"><SignupLogin /></Route>
    <Route path="/rules"><Rules /></Route>
  </div>
</Router>
