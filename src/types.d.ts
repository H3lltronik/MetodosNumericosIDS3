interface Method1 {
    executeMethod: (negativeXValue: number, positiveYValue: number) => {};
}

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