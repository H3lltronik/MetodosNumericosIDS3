import Biseccion from '../lib/methods/Biseccion';
import MathParser from '../lib/MathParser/MathParser';
import RelativeError from '../lib/Error/RelativeError/RelativeError';
import Calculator, { ErrorMethodType, MethodStopCondition, MethodStopType } from '../lib/Calculator/Calculator';

import { get } from "svelte/store";
import AbsoluteError from './Error/AbsoluteError/AbsoluteError';
import { 
    expression as expressionStore, 
    fixedDecimals as fixedDecimalsStore, 
    varToItOver as varToItOverStore,
    errorMethod as errorMethodStore,
    aproxMethod as aproxMethodStore,
    stopCriteria as stopCriteriaStore,
    stopCriteriaVal as stopCriteriaValStore,
    stopCriteriaMethod as stopCriteriaMethodStore,
    stopCriteriaMethod,
} from "../store";

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

    const errorMethod = get(errorMethodStore);
    switch (errorMethod) {
        case ErrorMethodType.Relative: {
            const relativeError = new RelativeError(mathParser);
            calculator.setErrorMethod(relativeError);
            break;
        }
        case ErrorMethodType.Absolute: {
            const absoluteError = new AbsoluteError(mathParser);
            calculator.setErrorMethod(absoluteError);
            break;
        }
    }
    const biseccion = new Biseccion(mathParser, expression, varToItOver);

    calculator.setAproxMethod(biseccion);

    calculator.setStartPoint(startPoint);
    calculator.setStopCondition(
        get(stopCriteriaMethodStore), 
        get(stopCriteriaStore), 
        get(stopCriteriaValStore)
    );
    const result = calculator.beginExecution();

    if (result)
        console.log("Loop execution finished:", result);

    return result;
}