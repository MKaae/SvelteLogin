<script>
  export let isSidebarOpen = false;
  export let toggleSidebar;

  function handleToggle() {
    toggleSidebar();
  }
</script>

<aside
  id="default-sidebar"
  class="fixed top-0 left-0 z-40 w-[200px] h-screen transition-transform md:translate-x-0"
  style="transform: translateX({isSidebarOpen ? '0' : '-100%'})"
  aria-label="Sidenav"
  on:resize={toggleSidebar}
>
  <button
    aria-label="Close sidebar"
    class="md:hidden absolute top-2 right-2 text-gray-500 hover:text-gray-700"
    on:click={toggleSidebar}
  >
    <svg
      class="w-6 h-6"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13.4142 10l4.2929-4.2929c.3905-.3905.3905-1.0237 0-1.4142s-1.0237-.3905-1.4142 0L12 8.5858 7.7071 4.2929c-.3905-.3905-1.0237-.3905-1.4142 0s-.3905 1.0237 0 1.4142L10.5858 10l-4.2929 4.2929c-.3905.3905-.3905 1.0237 0 1.4142s1.0237.3905 1.4142 0L12 11.4142l4.2929 4.2929c.3905.3905 1.0237.3905 1.4142 0s.3905-1.0237 0-1.4142L13.4142 10z"
        fill="lightgrey"
      />
    </svg>
  </button>
  <div
    class="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700"
  >
    <ul class="space-y-2">
      <slot></slot>
    </ul>
  </div>
</aside>
