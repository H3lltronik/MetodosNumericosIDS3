const MAX_ITERATIONS_LIMIT = 10000;

export const enum MethodStopType {
    Error = 1,
    Iterations = 2
}

export const enum MethodStopCondition {
    Greater = 1,
    Equal = 2,
    Less = 3
}

class Calculator {
    private mathParser: MathParserInterface;
    private aproxMethod: AproxExecutable;
    private startPoint: AproxType;

    private errorValues: number[];
    private errorMethod: ErrorExecutable;

    private currIteration: number;
    private iterationsStory: AproxIterationResult[];

    private stopValue: number;
    private stopMethodType: MethodStopType;
    private stopMethodStopCondition: MethodStopCondition;


    constructor(mathParser: MathParserInterface) {
        this.mathParser = mathParser;
        this.iterationsStory = [];
        this.errorValues = [];
    }

    test () {
        return true;
    }

    setExpression = (expression: string) => {
        this.mathParser.setExpression(expression);
    }

    setAproxMethod = (method: AproxExecutable) => {
        this.aproxMethod = method;
    }

    setErrorMethod = (error: ErrorExecutable) => {
        this.errorMethod = error;
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

    beginExecution = () => {
        if (!this.startPoint) { console.error("startPoint not defined"); return false; }
        if (!this.aproxMethod) { console.error("aproxMethod not defined"); return false; }

        this.execution();
    }

    setStartPoint (values: AproxType) {
        this.startPoint = values;
    }

    private execution = () => {
        this.currIteration = 0;
        let firstRes = this.aproxMethod.executeMethod(this.startPoint);
        this.iterationsStory.push({...firstRes, ...this.startPoint});
        // console.log("first Result", firstRes)
        let lastRes: AproxIterationResult = {...firstRes};
        let currRes: AproxIterationResult = {aproxResult: 0, expressionResult: 0, negativeXValue: 0, positiveXValue: 0};
        while(true) {
            currRes = this.aproxMethod.executeMethod({
                negativeXValue: lastRes.negativeXValue, 
                positiveXValue: lastRes.positiveXValue
            });
            // console.log(`iteration #${this.currIteration} = `, currRes)
            
            lastRes = {...currRes};

            this.iterationsStory.push(currRes);
            this.calculateError();

            if (this.doStop()) break;
            this.currIteration++;
        }

        console.log("Loop execution finished with", this.iterationsStory, " and errors ", this.errorValues)
    }

    private calculateError = () => {
        if (!this.errorMethod) { console.error("errorMethod not defined"); return false }

        const payload: ErrorValType = {
            currentVal: 0,
            previousVal: 0,
        };
        if (this.currIteration > 0) {
            payload.currentVal = this.iterationsStory[this.currIteration].negativeXValue, 
            payload.previousVal = this.iterationsStory[this.currIteration].positiveXValue
        }
        const result = this.errorMethod.executeMethod(payload);
        this.errorValues.push(result);
    }

    setStopCondition (methodType: MethodStopType, methodStopCondition: MethodStopCondition, value: number) {
        this.stopMethodType = methodType
        this.stopMethodStopCondition = methodStopCondition
        this.stopValue = value
    }

    private doStop (): Boolean {
        if (!this.stopValue) { console.error("stopValue not defined"); return true }
        if (!this.stopMethodType) { console.error("stopMethodType not defined"); return true }
        if (!this.stopMethodStopCondition) { console.error("stopMethodStopCondition not defined"); return true }

        if (this.currIteration >= MAX_ITERATIONS_LIMIT) return true;

        let result: Boolean = false;
        switch (this.stopMethodType) {
            case MethodStopType.Error: {
                switch (this.stopMethodStopCondition) {
                    case MethodStopCondition.Equal: {
                        if (this.errorValues[this.currIteration] == this.stopValue) result = true;
                        break;
                    }
                    case MethodStopCondition.Greater: {
                        if (this.errorValues[this.currIteration] >= this.stopValue) result = true;
                        break;
                    }
                    case MethodStopCondition.Less: {
                        if (this.errorValues[this.currIteration] <= this.stopValue) result = true;
                        break;
                    }
                }
                break;
            }
            case MethodStopType.Iterations: {
                switch (this.stopMethodStopCondition) {
                    case MethodStopCondition.Equal: {
                        if (this.currIteration == this.stopValue) result = true;
                        break;
                    }
                    case MethodStopCondition.Greater: {
                        if (this.currIteration >= this.stopValue) result = true;
                        break;
                    }
                    case MethodStopCondition.Less: {
                        if (this.currIteration <= this.stopValue) result = true;
                        break;
                    }
                }
                break;
            }
        }
        return result;
    }
}

export default Calculator;