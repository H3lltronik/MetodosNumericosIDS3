import { writable } from 'svelte/store';

export const count = writable(0);
export const varToItOver = writable("x");

export const expression = writable( "x^3 - 5" );
export const fixedDecimals = writable( 3 );