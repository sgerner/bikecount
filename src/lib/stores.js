import { localStorageStore } from '@skeletonlabs/skeleton';
import { writable } from 'svelte/store';

// Stores to hold trips queued for the database and successfully added to the database
export const tripsQueued = localStorageStore('tripsQueued', []);
export const tripsProcessed = localStorageStore('tripsProcessed', []);
