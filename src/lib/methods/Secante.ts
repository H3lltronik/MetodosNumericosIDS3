class Secante implements AproxExecutable {
    private expression: string;
    private variable: string;
    private mathParser: MathParserInterface;
    methodType = "opened";

    constructor(mathParser: MathParserInterface, expression: string, variable: string)  {
        this.variable = variable
        this.expression = expression
        this.mathParser = mathParser
    }

    executeMethod(values: ClosedIntervalPayload): AproxIterationResult {
        // fX0
        this.mathParser.setExpression(this.expression);
        this.mathParser.setVariableValues([
            {
                variable: this.variable,
                value: values.negativeXValue
            },
        ])
        const fX0 = this.mathParser.execute();
        this.mathParser.clear();

        // fX1
        this.mathParser.setExpression(this.expression);
        this.mathParser.setVariableValues([
            {
                variable: this.variable,
                value: values.positiveXValue
            },
        ])
        const fX1 = this.mathParser.execute();
        this.mathParser.clear();

        this.mathParser.setExpression("x1 - ( fX1 * (x1 - x0) ) / ( fX1 - fX0 )");
        this.mathParser.setVariableValues([
            {
                variable: "x0",
                value: values.negativeXValue
            },
            {
                variable: "x1",
                value: values.positiveXValue
            },
            {
                variable: "fX0",
                value: fX0
            },
            {
                variable: "fX1",
                value: fX1
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
        this.mathParser.clear();

        const resultObj: AproxIterationResult = {
            iterationData: {
                negativeXValue: values.positiveXValue,
                positiveXValue: itResult,
            },
            result: {
                currNegativeXValue: values.negativeXValue,
                currPositiveXValue: values.positiveXValue,
                evaluatedCurrNeg: fX0,
                evaluatedCurrPos: fX1,
                expressionResult: expResult,
                aproxResult: itResult,
            }
        }

        return resultObj;
    };

    formatResultsTotTable = (values: CalculusIterationsResult): ResultsTable => {
        const headers = ["N", "x0", "F(x0)", "x1", "f(x1)", "x2", "f(x2)", "Error"];
        const rows = [];

        values.forEach((element, index) => {
            const row: ResultRow = [];
            row.push({ // N
                column: headers[0],
                value: index
            });
            row.push({ // x0
                column: headers[1],
                value: element.currNegativeXValue
            });
            row.push({ // f(x0)
                column: headers[2],
                value: element.evaluatedCurrNeg
            });
            row.push({ // x1
                column: headers[3],
                value: element.currPositiveXValue
            });
            row.push({ // f(x1)
                column: headers[4],
                value: element.evaluatedCurrPos
            });
            row.push({ // x2
                column: headers[4],
                value: element.aproxResult
            });
            row.push({ // f(x2)
                column: headers[4],
                value: element.expressionResult
            });
            row.push({ // error
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

export default Secante;