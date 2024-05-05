const { expandCronField, cronParser } = require('./parsers');
describe.only("expandCronField function", () => {
    test("handles single input", () => {
        expect(expandCronField("12", 0, 60)).toEqual([12]);
    });
    test("handles all values with step", () => {
        expect(expandCronField("*/2", 0, 5)).toEqual([0, 2, 4]);
    });
    test("handles range", () => {
        expect(expandCronField("1-3", 0, 5)).toEqual([1, 2, 3]);
    });
    test("handles range with specified step", () => {
        expect(expandCronField("1-5/2", 0, 5)).toEqual([1, 3, 5]);
    });
    test("handles list of specific values", () => {
        expect(expandCronField("1,3,5", 0, 5)).toEqual([1, 3, 5]);
    });
    test("handles complex field with multiple types of expressions", () => {
        expect(expandCronField("1-5,*/10,20-30/5", 0, 30)).toEqual([
            0, 1, 2, 3, 4, 5, 10, 20, 25, 30,
        ]);
    });
});
describe("cronParser", () => {
    test("should correctly parse a valid cron expression", () => {
        const expression = "*/15 0 1,15 * 1-5 /usr/bin/find";
        const consoleSpy = jest.spyOn(console, "log");
        cronParser(expression);
        expect(consoleSpy).toHaveBeenCalledWith("minute        0 15 30 45");
        expect(consoleSpy).toHaveBeenCalledWith("hour          0");
        expect(consoleSpy).toHaveBeenCalledWith("day of month  1 15");
        expect(consoleSpy).toHaveBeenCalledWith("month         1 2 3 4 5 6 7 8 9 10 11 12");
        expect(consoleSpy).toHaveBeenCalledWith("day of week   1 2 3 4 5");
        expect(consoleSpy).toHaveBeenCalledWith("command       /usr/bin/find");
        consoleSpy.mockRestore();
    });
    test("should throw an error for an invalid cron expression", () => {
        const badExpression = "*/15 0 1,15 * 1-5"; // Missing the command part
        expect(() => {
            cronParser(badExpression);
        }).toThrow("Invalid cron expression");
    });
});
//# sourceMappingURL=parsers.test.js.map