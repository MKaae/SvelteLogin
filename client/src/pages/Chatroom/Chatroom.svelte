<script>
  import { onMount } from "svelte";
  import { fetchGet } from "../../util/api";
  import { BASE_URL } from "../../stores/generalStore";
  
    let chatroom;  

    onMount(async () => {
        chatroom = await fetchGet($BASE_URL + "/room")
    });
</script>

<div class="flex justify-center items-center text-center md:ml-[200px]">
    <h1>CHATROOM</h1>
</div>