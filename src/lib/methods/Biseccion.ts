class Biseccion implements AproxExecutable {
    private expression: string;
    private variable: string;
    private mathParser: MathParserInterface;

    constructor(mathParser: MathParserInterface, expression: string, variable: string)  {
        this.variable = variable
        this.expression = expression
        this.mathParser = mathParser
    }

    executeMethod(values: ClosedIntervalPayload): AproxIterationResult {
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
        
        const resultObj: AproxIterationResult = {
            iterationData: {
                negativeXValue: (expResult < 0)? itResult : values.negativeXValue,
                positiveXValue: (expResult > 0)? itResult : values.positiveXValue,
            },
            result: {
                currNegativeXValue: values.negativeXValue,
                currPositiveXValue: values.positiveXValue,
                evaluatedCurrNeg: evaluatedCurrNeg,
                evaluatedCurrPos: evaluatedCurrPos,
                expressionResult: expResult,
                aproxResult: itResult,
            }
        }
        return resultObj;
    };

    formatResultsTotTable = (values: CalculusIterationsResult): ResultsTable => {
        const headers = ["N", "Negative X", "Positive X", "Approximation", "F(Approx)", "Error"];
        const rows = [];

        values.forEach((element, index) => {
            const row: ResultRow = [];
            row.push({
                column: headers[0],
                value: index
            });
            row.push({
                column: headers[1],
                value: element.currNegativeXValue
            });
            row.push({
                column: headers[2],
                value: element.currPositiveXValue
            });
            row.push({
                column: headers[3],
                value: element.aproxResult
            });
            row.push({
                column: headers[4],
                value: element.expressionResult
            });
            row.push({
                column: headers[5],
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

export default Biseccion;