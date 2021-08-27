import Calculator from "./Calculator";

test('should return true', () => {
    const calculator = new Calculator();
    expect( calculator.test() ).toBe( true );
})
