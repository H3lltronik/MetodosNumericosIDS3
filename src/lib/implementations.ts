import Biseccion from '../lib/methods/Biseccion';
import MathParser from '../lib/MathParser/MathParser';
import RelativeError from '../lib/Error/RelativeError/RelativeError';
import Calculator, { AproxMethodType, ErrorMethodType, MethodStopCondition, MethodStopType } from '../lib/Calculator/Calculator';

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
    appAlerts as appAlertsStore,
} from "../store/index";
import ReglaFalsa from './methods/ReglaFalsa';
import NewtonRaphson from './methods/NewtonRaphson';
import Secante from './methods/Secante';

const mathParser = new MathParser();
const calculator = new Calculator(mathParser);

export const doTableIteration = (
    lowLimit: number, 
    highLimit: number, 
    step: number) : TableIterations|undefined =>  {
    const expression = get (expressionStore);
    const fixedDecimals = get (fixedDecimalsStore);
    const varToItOver = get (varToItOverStore);

    calculator.setExpression(expression);
    mathParser.setFixedDecimals(fixedDecimals);
    // 

    try {
        const iterations = calculator.iterate(lowLimit, highLimit, step, varToItOver);
        return {
            iterations,
            expression
        };
    } catch (error) {
        addAlert({
            id: Date.now(),
            text: "Could not evaluate. Verify your expression and values and try again",
            type: 'error',
        })
        console.error("Error when trying to iterate values");
        console.error(error);
    }
}

export const doResultCalculus = (
    startPoint: ApproximationPayload
    ): ResultsTable|undefined => {
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

    const aproxMethod = get(aproxMethodStore);
    switch (aproxMethod) {
        case AproxMethodType.Biseccion: {
            const biseccion = new Biseccion(mathParser, expression, varToItOver);
            calculator.setAproxMethod(biseccion);
            break;
        }
        case AproxMethodType.ReglaFalsa: {
            const reglaFalsa = new ReglaFalsa(mathParser, expression, varToItOver);
            calculator.setAproxMethod(reglaFalsa);
            break;
        }
        case AproxMethodType.NewtonRaphson: {
            const newtonRaphson = new NewtonRaphson(mathParser, expression, varToItOver);
            calculator.setAproxMethod(newtonRaphson);
            break;
        }
        case AproxMethodType.Secante: {
            const secante = new Secante(mathParser, expression, varToItOver);
            calculator.setAproxMethod(secante);
            break;
        }
    }

    calculator.setStartPoint(startPoint);
    calculator.setStopCondition(
        get(stopCriteriaMethodStore), 
        get(stopCriteriaStore), 
        get(stopCriteriaValStore)
    );
    
    try {
        const result = calculator.beginExecution();

        if (result)
            console.log("Loop execution finished:", result);

        return result;

    } catch (error) {
        addAlert({
            id: Date.now(),
            text: "Could not evaluate. Verify your expression and values and try again",
            type: 'error',
        })
        console.error("Error when trying to approximate to root");
        console.error(error);
    }
}

export const addAlert = (appAlert: AppAlert) => {
    window.scrollTo({top: 0, behavior: 'smooth'})
    const currAlerts = get(appAlertsStore)
    currAlerts.push(appAlert);
    appAlertsStore.set(currAlerts);
}