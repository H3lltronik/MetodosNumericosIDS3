class ReglaFalsa implements AproxExecutable {
    private expression: string;
    private variable: string;
    private mathParser: MathParserInterface;

    constructor(mathParser: MathParserInterface, expression: string, variable: string)  {
        this.variable = variable
        this.expression = expression
        this.mathParser = mathParser
    }

    executeMethod(values: ClosedIntervalPayload): AproxIterationResult {
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
        const headers = ["N", "Negative X", "F(NegX)", "Positive X", "F(PosX)", "Approximation", "F(Approx)", "Error"];
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
                value: element.evaluatedCurrNeg
            });
            row.push({
                column: headers[3],
                value: element.currPositiveXValue
            });
            row.push({
                column: headers[4],
                value: element.evaluatedCurrPos
            });
            row.push({
                column: headers[5],
                value: element.aproxResult
            });
            row.push({
                column: headers[6],
                value: element.expressionResult
            });
            row.push({
                column: headers[7],
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

export default ReglaFalsa;