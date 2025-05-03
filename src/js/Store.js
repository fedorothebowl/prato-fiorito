// src/stores.js
import { writable } from 'svelte/store';

// Timer (in secondi)
export const time = writable(0);

// Punteggio del giocatore
export const score = writable(0);

// Contatore di celle contrassegnate
export const terrorism = writable(0);

// Conteggio delle persone
export const people = writable(0);

export const mines = writable(10);

export const reset = writable(false);

export const gameWin = writable(false);

export const rules = writable(true);