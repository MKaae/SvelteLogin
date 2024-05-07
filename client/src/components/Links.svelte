<script>
    import { Link } from "svelte-navigator";

    export let svgText;
    export let nameText;
    export let pathText;
</script>

<li>
    <Link
      to={pathText}
      class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg 
          dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
    >
      <svg
        class="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400
              group-hover:text-gray-900 dark:group-hover:text-white"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d={svgText}></path>
      </svg>
      <span class="ml-3">{nameText}</span>
    </Link>
  </li>