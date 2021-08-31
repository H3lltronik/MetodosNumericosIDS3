const MAX_ITERATIONS_LIMIT = 100;

export const enum MethodStopType {
    Error = 1,
    Iterations = 2
}

export const enum MethodStopCondition {
    Greater = 1,
    Equal = 2,
    Less = 3
}

export const enum AproxMethodType {
    Biseccion = 1,
    ReglaFalsa = 2,
    NewtonRaphson = 3,
}

export const enum ErrorMethodType {
    Absolute = 1,
    Relative = 2,
}

class Calculator {
    private mathParser: MathParserInterface;
    private aproxMethod: AproxExecutable;
    private startPoint: ApproximationPayload;

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
            if (i >= MAX_ITERATIONS_LIMIT) break;
        }

        return results;
    }

    beginExecution = (): ResultsTable => {
        if (!this.startPoint) { console.error("startPoint not defined"); return null; }
        if (!this.aproxMethod) { console.error("aproxMethod not defined"); return null; }

        this.execution();

        // Format results
        const result: any = this.iterationsStory.map(
            (it, index): any => {
                return {...it.result, error: this.errorValues[index]}
            }
        )
        const tableFormatted = this.aproxMethod.formatResultsTotTable(result);
        this.clear()

        return tableFormatted;
    }

    private execution = () => {
        this.currIteration = 0;
        let firstRes = this.aproxMethod.executeMethod(this.startPoint);
        this.iterationsStory.push({...firstRes, ...this.startPoint});
        this.calculateError();
        this.currIteration++;
        
        let lastRes: AproxIterationResult = {...firstRes};
        let currRes: AproxIterationResult = {};

        while(true) {
            currRes = this.aproxMethod.executeMethod(lastRes.iterationData);
            
            lastRes = {...currRes};

            this.iterationsStory.push(currRes);
            this.calculateError();

            if (this.doStop()) break;
            this.currIteration++;
        }
    }

    clear () {
        this.iterationsStory = [];
        this.errorValues = [];
    }

    setStartPoint (values: ApproximationPayload) {
        this.startPoint = values;
    }

    private calculateError = () => {
        if (!this.errorMethod) { console.error("errorMethod not defined"); return false }

        const payload: ErrorValType = {
            currentVal: 0,
            previousVal: 0,
        };

        if (this.currIteration <= 0) {
            this.errorValues.push(0);
            return;
        }
        
        const itResultCurr = this.iterationsStory[this.currIteration].result ?? null;
        const itResultBef = this.iterationsStory[this.currIteration-1].result ?? null;

        if ("aproxResult" in itResultCurr && "aproxResult" in itResultBef) {
            payload.currentVal = itResultCurr.aproxResult, 
            payload.previousVal = itResultBef.aproxResult
        }
        console.log("wat error payload", payload);
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