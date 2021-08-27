import MathParser from "../MathParser/MathParser";
import Calculator from "./Calculator";

test('should evaluate an expression between two given limits and increment by a given step', () => {
    const calculator = new Calculator(new MathParser());
    calculator.setExpression("x^3-5");
    const results = calculator.iterate(-3, 3, 1, 'x');

    expect( results ).toStrictEqual([
        {
            input: -3,
            result: -32,
        },
        {
            input: -2,
            result: -13,
        },
        {
            input: -1,
            result: -6,
        },
        {
            input: 0,
            result: -5,
        },
        {
            input: 1,
            result: -4,
        },
        {
            input: 2,
            result: 3,
        },
        {
            input: 3,
            result: 22,
        },
    ])
})
