import MathParser from './MathParser'

test('should evaluate an expression between', () => {
    const mathParser = new MathParser();
    mathParser.setExpression("x^2");
    mathParser.setVariableValues([
        {
            variable: 'x',
            value: 5,
        }
    ])
    const result = mathParser.execute();

    expect( result ).toBe( 25 );
})

test('should return a number with a given number of decimals', () => {
    const mathParser = new MathParser();
    mathParser.setExpression("cos(45 deg)");
    const resultFull = mathParser.execute();
    const resultRounded = mathParser.execute(6);

    expect(resultFull).toBe(0.7071067811865476);
    expect(resultRounded).toBe(0.707107);
})