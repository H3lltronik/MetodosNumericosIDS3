class ReglaFalsa implements AproxExecutable {
    private expression: string;
    private variable: string;
    private mathParser: MathParserInterface;

    constructor(mathParser: MathParserInterface, expression: string, variable: string)  {
        this.variable = variable
        this.expression = expression
        this.mathParser = mathParser
    }

    executeMethod(values: AproxType): AproxIterationResult {
        // Getting fa y fb
        this.mathParser.setExpression(this.expression)
        this.mathParser.setVariableValues([
            {
                variable: this.variable,
                value: values.negativeXValue
            },
        ])
        const fa = this.mathParser.execute();
        this.mathParser.clear();
        
        this.mathParser.setExpression(this.expression)
        this.mathParser.setVariableValues([
            {
                variable: this.variable,
                value: values.positiveXValue
            },
        ])
        const fb = this.mathParser.execute();
        this.mathParser.clear();

        this.mathParser.setExpression("(a*fb - b*fa)/(fb - fa)")
        this.mathParser.setVariableValues([
            {
                variable: "a",
                value: values.negativeXValue
            },
            {
                variable: "b",
                value: values.positiveXValue
            },
            {
                variable: "fa",
                value: fa
            },
            {
                variable: "fb",
                value: fb
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
        return resultObj;
    };
}

export default ReglaFalsa;