import { writable } from 'svelte/store';
import {MethodStopType, MethodStopCondition, AproxMethodType, ErrorMethodType} from '../lib/Calculator/Calculator'

export const count = writable(0);
export const varToItOver = writable("x");

export const expression = writable( "x^3 - 10" );
export const fixedDecimals = writable( 3 );

export const errorMethod = writable( ErrorMethodType.Relative );
export const aproxMethod = writable( AproxMethodType.ReglaFalsa );
export const stopCriteria = writable( MethodStopCondition.Equal );
export const stopCriteriaVal = writable( 3 );
export const stopCriteriaMethod = writable( MethodStopType.Iterations );