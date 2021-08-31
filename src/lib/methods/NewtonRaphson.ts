class NewtonRaphson implements AproxExecutable {
    private expression: string;
    private variable: string;
    private mathParser: MathParserInterface;

    constructor(mathParser: MathParserInterface, expression: string, variable: string)  {
        this.variable = variable
        this.expression = expression
        this.mathParser = mathParser
    }

    executeMethod(values: OpenIntervalPayload): AproxIterationResult {
        const derivated = this.mathParser.derivative(this.expression, this.variable);

        // Eval derivative
        this.mathParser.setExpression(derivated);
        this.mathParser.setVariableValues([
            {
                variable: this.variable,
                value: values.start
            },
        ])
        const evalDerivated = this.mathParser.execute();
        this.mathParser.clear();

        // Eval function
        this.mathParser.setExpression(this.expression);
        this.mathParser.setVariableValues([
            {
                variable: this.variable,
                value: values.start
            },
        ])
        const evalFunction = this.mathParser.execute();
        this.mathParser.clear();
        
        // New xi
        this.mathParser.setExpression("currXi - (fCurrXi / fDerivativeCurrXi)");
        this.mathParser.setVariableValues([
            {
                variable: "currXi",
                value: values.start
            },
            {
                variable: "fCurrXi",
                value: evalFunction
            },
            {
                variable: "fDerivativeCurrXi",
                value: evalDerivated
            },
        ])
        const xi = this.mathParser.execute();
        this.mathParser.clear();

        
        const resultObj: AproxIterationResult = {
            iterationData: {
                start: xi,
            },
            result: {
                aproxResult: xi,
                evaluatedCurr: evalFunction,
                evaluatedCurrDeriv: evalDerivated,
                currXi: values.start,
            }
        }
        return resultObj;
    };

    formatResultsTotTable = (values: CalculusIterationsResult): ResultsTable => {
        const headers = ["N", "xi", "F(xi)", "F`(xi)", "x(i+1)", "Error"];
        const rows = [];

        values.forEach((element, index) => {
            const row: ResultRow = [];
            row.push({
                column: headers[0],
                value: index
            });
            row.push({
                column: headers[1],
                value: element.currXi
            });
            row.push({
                column: headers[2],
                value: element.evaluatedCurr
            });
            row.push({
                column: headers[3],
                value: element.evaluatedCurrDeriv
            });
            row.push({
                column: headers[4],
                value: element.aproxResult
            });
            row.push({
                column: headers[4],
                value: element.error
            });

            rows.push(row);
        });

        return {
            headers,
            rows,
        }
    };
}

export default NewtonRaphson;