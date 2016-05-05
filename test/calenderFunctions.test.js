describe("Test: calenderFunctions.getNepaliNumber(number)", function () {
    it("Should return equivalent nepali number", function () {
        expect(calenderFunctions.getNepaliNumber(2072)).toBe("२०७२");
    });

    it("Throw if parameter not equal number & negative number", function () {
        expect(calenderFunctions.getNepaliNumber).toThrowError(Error, "Number should be positive integer");
        expect(function () {
            calenderFunctions.getNepaliNumber('2072')
        }).toThrowError(Error, "Number should be positive integer");
        expect(function () {
            calenderFunctions.getNepaliNumber(-2072)
        }).toThrowError(Error, "Number should be positive integer");
        expect(function () {
            calenderFunctions.getNepaliNumber(2072)
        }).not.toThrow();
    });
});
