class Biseccion implements AproxExecutable {
    private expression: string;
    private variable: string;
    private mathParser: MathParserInterface;

    constructor(mathParser: MathParserInterface, expression: string, variable: string)  {
        this.variable = variable
        this.expression = expression
        this.mathParser = mathParser
    }

    executeMethod(values: AproxType): AproxIterationResult {
        const itResult = (values.negativeXValue + values.positiveXValue) / 2;
        
        this.mathParser.setExpression(this.expression)
        this.mathParser.setVariableValues([
            {
                variable: this.variable,
                value: itResult
            }
        ])
        const expResult = this.mathParser.execute();
        

        const resultObj: AproxIterationResult = {
            negativeXValue: (expResult < 0)? itResult : values.negativeXValue,
            positiveXValue: (expResult >= 0)? itResult : values.positiveXValue,
            expressionResult: expResult,
            aproxResult: itResult,
        }
        return resultObj;
    };
}

export default Biseccion;