import { readable, writable } from "svelte/store";

export const BASE_URL = readable('http://localhost:8080/api');

export const user = writable(null);