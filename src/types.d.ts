interface AproxExecutable {
    executeMethod: (values: AproxType) => AproxIterationResult;
}

type AproxType = {negativeXValue: number, positiveXValue: number}

interface ErrorExecutable {
    executeMethod: (values: ErrorValType) => number;
}

type ErrorValType = { previousVal: number, currentVal: number}

interface MathParserInterface {
    clear: () => void,
    execute: (fixedDecimals?: number) => number,
    absoluteValue: (number: number) => number,
    setExpression: (expression: string) => void,
    setVariableValues: (variableVlues: VariableSetter[]) => void,
}

type VariableSetter = {
    variable: string,
    value: number|string
}

type IterationResult = {
    input: number,
    result: number,
}

type AproxIterationResult = {
    currNegativeXValue: number,
    currPositiveXValue: number,
    nextNegativeXValue: number,
    nextPositiveXValue: number,
    expressionResult: number,
    aproxResult: number,
}

type TwoNumberValues = {
    a: number,
    b: number
}