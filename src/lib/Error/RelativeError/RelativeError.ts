class RelativeError implements ErrorExecutable {
    private mathParser: MathParserInterface;

    constructor(mathParser: MathParserInterface)  {
        this.mathParser = mathParser
    }

    executeMethod(values: ErrorValType) {
        if (values.currentVal == 0) return 0

        this.mathParser.setExpression("(abs(currentVal - previousVal)) / (currentVal)")
        this.mathParser.setVariableValues([
            {
                variable: "currentVal",
                value: values.currentVal
            },
            {
                variable: "previousVal",
                value: values.previousVal
            },
        ])
        const result = this.mathParser.execute();
        this.mathParser.clear()

        return result;
    };
}

export default RelativeError;