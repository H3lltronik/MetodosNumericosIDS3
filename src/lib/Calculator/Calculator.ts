class Calculator {
    private mathParser: MathParserInterface;

    constructor(mathParser: MathParserInterface) {
        this.mathParser = mathParser;
    }

    test () {
        return true;
    }

    setExpression = (expression: string) => {
        this.mathParser.setExpression(expression);
    }

    iterate = (lowLimit: number, highLimit: number, step: number, variable: string): IterationResult[] => {
        const results: IterationResult[] = [];
        
        for (let i = lowLimit; i <= highLimit; i+= step) {
            this.mathParser.setVariableValues([
                {
                    variable,
                    value: i,
                }
            ])
            results.push({
                input: i,
                result: this.mathParser.execute()
            });
        }

        return results;
    }
}

export default Calculator;