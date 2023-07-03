// writable store
import type { IUser } from '$lib/types';
import { writable } from 'svelte/store';
export default writable<IUser>();
