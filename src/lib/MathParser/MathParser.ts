import { evaluate, parser, abs } from 'mathjs'

class MathParser implements MathParserInterface {
    private expression: string;
    private parser: any;
    private fixedDecimals: number;

    constructor() {
        this.expression = "";
        this.parser = parser();
    }

    absoluteValue = (number: number) => {
        return abs(number);
    };

    clear = () => {
        this.parser.clear();
    };

    execute = () => {
        const result = this.parser.evaluate( this.expression );
        const resultFixed = this.fixedDecimals? result.toFixed(this.fixedDecimals) : result;
        return Number(resultFixed);
    };

    setFixedDecimals = (fixedDecimals) => {
        this.fixedDecimals = fixedDecimals;
    }

    setExpression = (expression: string) => {
        this.expression = expression;
    };

    setVariableValues = (variableValues: VariableSetter[]) => {
        variableValues.forEach(varValue => {
            this.parser.set(varValue.variable, varValue.value);
        });
    };

    
}

export default MathParser;