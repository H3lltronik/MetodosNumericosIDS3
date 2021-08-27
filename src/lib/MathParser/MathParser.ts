import { evaluate, parser, abs } from 'mathjs'

class MathParser implements MathParserInterface {
    private expression: string;
    private parser: any;

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

    execute = (fixedDecimals?: number) => {
        const result = this.parser.evaluate( this.expression );
        const resultFixed = fixedDecimals? result.toFixed(fixedDecimals) : result;
        return Number(resultFixed);
    };

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