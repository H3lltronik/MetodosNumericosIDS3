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
        this.mathParser.setExpression("(negativeXValue + positiveXValue) / 2")
        this.mathParser.setVariableValues([
            {
                variable: "negativeXValue",
                value: values.negativeXValue
            },
            {
                variable: "positiveXValue",
                value: values.positiveXValue
            },
        ])
        const itResult = this.mathParser.execute();
        this.mathParser.clear();
        
        // Preparing mathParser to evaluate the expression 
        this.mathParser.setExpression(this.expression)
        this.mathParser.setVariableValues([
            {
                variable: this.variable,
                value: itResult
            }
        ])
        const expResult = this.mathParser.execute();
        
        this.mathParser.setVariableValues([{
            variable: this.variable,
            value: values.negativeXValue
        }])
        const evaluatedCurrNeg = this.mathParser.execute();
        
        this.mathParser.setVariableValues([{
            variable: this.variable,
            value: values.positiveXValue
        }])
        const evaluatedCurrPos = this.mathParser.execute();
        
        // console.log("biseccion before", values, expResult, itResult)
        const resultObj: AproxIterationResult = {
            nextNegativeXValue: (expResult < 0)? itResult : values.negativeXValue,
            nextPositiveXValue: (expResult > 0)? itResult : values.positiveXValue,
            currNegativeXValue: values.negativeXValue,
            currPositiveXValue: values.positiveXValue,
            evaluatedCurrNeg: evaluatedCurrNeg,
            evaluatedCurrPos: evaluatedCurrPos,
            expressionResult: expResult,
            aproxResult: itResult,
        }
        // console.log("biseccion result", resultObj)
        return resultObj;
    };
}

export default Biseccion;