interface AproxExecutable {
    executeMethod: (values: ApproximationPayload) => AproxIterationResult;
    formatResultsTotTable: (values: CalculusIterationsResult) => ResultsTable;
    methodType: String;
}

type ClosedIntervalPayload = {
    negativeXValue: number,
    positiveXValue: number
}

type OpenIntervalPayload = {
    start: number,
}

type ApproximationPayload = ClosedIntervalPayload|OpenIntervalPayload

interface ErrorExecutable {
    executeMethod: (values: ErrorValType) => number;
}

type ErrorValType = { previousVal: number, currentVal: number}

interface MathParserInterface {
    clear: () => void,
    execute: (fixedDecimals?: number) => number,
    absoluteValue: (number: number) => number,
    setExpression: (expression: string) => void,
    derivative: (expression: string, variable: string) => string,
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

type TableIterations = {
    iterations: IterationResult[],
    expression: string,
}

type ClosedIntervalResult = {
    currNegativeXValue: number,
    currPositiveXValue: number,
    evaluatedCurrNeg: number,
    evaluatedCurrPos: number,
    expressionResult: number,
    aproxResult: number,
}

type NewtonRaphsonResult = {
    aproxResult?: number,
    evaluatedCurr?: number,
    evaluatedCurrDeriv?: number,
    currXi?: number,
}

type AproxIterationResult = {
    iterationData: ApproximationPayload,
    result: ClosedIntervalResult|NewtonRaphsonResult
}

type TwoNumberValues = {
    a: number,
    b: number
}

type CalculusIterationResult = {
    currNegativeXValue?: number,
    currPositiveXValue?: number,
    evaluatedCurrNeg?: number,
    evaluatedCurrPos?: number,
    expressionResult?: number,
    aproxResult?: number,
    evaluatedCurr?: number,
    evaluatedCurrDeriv?: number,
    currXi?: number,
    error: number,
}
type CalculusIterationsResult = CalculusIterationResult[]

type ResultRow = {column: string, value: any}[]

type ResultsTable = {
    headers: any[],
    rows: ResultRow[],
}

type AppAlert = {
    type: 'error'|'success',
    text: string,
    id: number,
}