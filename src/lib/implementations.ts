import Calculator, { MethodStopCondition, MethodStopType } from '../lib/Calculator/Calculator';
import MathParser from '../lib/MathParser/MathParser';
import RelativeError from '../lib/Error/RelativeError/RelativeError';
import Biseccion from '../lib/methods/Biseccion';

import { expression as expressionStore, fixedDecimals as fixedDecimalsStore, varToItOver as varToItOverStore } from "../store";
import { get } from "svelte/store";

const mathParser = new MathParser();
const calculator = new Calculator(mathParser);

export const doTableIteration = (
    lowLimit: number, 
    highLimit: number, 
    step: number) :
    {
        iterations: IterationResult[],
        expression: string,
    } =>  {
    const expression = get (expressionStore);
    const fixedDecimals = get (fixedDecimalsStore);
    const varToItOver = get (varToItOverStore);

    calculator.setExpression(expression);
    mathParser.setFixedDecimals(fixedDecimals);
    // 

    const iterations = calculator.iterate(lowLimit, highLimit, step, varToItOver);
    return {
        iterations,
        expression
    };
}

export const doResultCalculus = (
    startPoint: AproxType
    ): CalculusIterationsResult => {
    const expression = get (expressionStore);
    const fixedDecimals = get (fixedDecimalsStore);
    const varToItOver = get (varToItOverStore);

    calculator.setExpression(expression);
    mathParser.setFixedDecimals(fixedDecimals);
    // 

    const relativeError = new RelativeError(mathParser);
    const biseccion = new Biseccion(mathParser, expression, varToItOver);

    calculator.setAproxMethod(biseccion);
    calculator.setErrorMethod(relativeError);

    calculator.setStartPoint(startPoint);
    calculator.setStopCondition(MethodStopType.Iterations, MethodStopCondition.Greater, 3);
    const result = calculator.beginExecution();

    if (result)
        console.log("Loop execution finished:", result);

    return result;
}