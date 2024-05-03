<script>
  import { onMount } from "svelte";
  import { fetchGet } from "../../util/api";
  import { BASE_URL } from "../../stores/generalStore";

  let roomId;
  let welcomeMessage = "Welcome to Chatroom";
  let messages = [];

  onMount(async () => {
    roomId = await fetchGet($BASE_URL + "/room");
    welcomeMessage = `Welcome to Chatroom ${roomId}`;
  });
</script>

<div class="flex justify-center items-center text-center md:ml-[200px]">
  <section
    class="bg-white dark:bg-gray-700 py-8 lg:py-16 antialiased min-w-full min-h-full"
  >
    <div class="max-w-2xl mx-auto px-4">
      <div class="flex justify-center text-center items-center mb-6">
        <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
          {welcomeMessage}
        </h2>
      </div>
      <div
        class="flex justify-between items-center rounded-lg rounded-t-lg border-gray-200 dark:bg-gray-800 border border-gray-200 p-4"
      >
      <div class="text-white text-center">
        {#if messages.length === 0}
          <p>No messages</p>
        {/if}
      </div>
      </div>
      <br>
      <form class="mb-6">
        <div
          class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
        >
          <label for="chatpost" class="sr-only">Your post</label>
          <textarea
            id="chatpost"
            rows="6"
            class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
            placeholder="Write a chat post..."
            required
          ></textarea>
        </div>
        <!-- <button
          type="submit"
          class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
        >
          Enter chat post
        </button> -->
      </form>
    </div>
  </section>
</div>
