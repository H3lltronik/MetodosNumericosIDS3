import { evaluate, parser } from 'mathjs'

class Calculator {
    constructor() {
        const parserObj = parser();
        parserObj.evaluate("x = 3");
        const res = parserObj.evaluate("x^2 + e^x");
        console.log("neta", res)
        // const result = evaluate("x^2 + e^x");
    }

    test () {
        return true;
    }
}

export default Calculator;