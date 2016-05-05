describe("Test: calenderFunctions.getNepaliNumber(number)", function () {
    it("Should return equivalent nepali number", function () {
        expect(calenderFunctions.getNepaliNumber(2072)).toBe("२०७२");
        expect(calenderFunctions.getNepaliNumber(1234567890)).toBe("१२३४५६७८९०");
    });

    it("Throw error if parameter is not number OR negative number", function () {
        expect(function () {
            calenderFunctions.getNepaliNumber();
        }).toThrowError(Error, "Parameter number is required");

        expect(function () {
            calenderFunctions.getNepaliNumber('2072');
        }).toThrowError(Error, "Number should be positive integer");

        expect(function () {
            calenderFunctions.getNepaliNumber(-2072);
        }).toThrowError(Error, "Number should be positive integer");

        expect(function () {
            calenderFunctions.getNepaliNumber(2072);
        }).not.toThrow();
    });
});

describe("Test: calenderFunctions.getNumberByNepaliNumber(nepaliNumber)", function () {
    it("Should return equivalent number form NepaliNumber", function () {
        expect(calenderFunctions.getNumberByNepaliNumber("२०७२")).toEqual(2072);
        expect(calenderFunctions.getNumberByNepaliNumber("१२३४५६७८९०")).toEqual(1234567890);
    });

    it("Throw error if parameter not nepaliNumber in string", function () {
        expect(function () {
            calenderFunctions.getNumberByNepaliNumber();
        }).toThrowError(Error, "Parameter nepaliNumber is required");
        expect(function () {
            calenderFunctions.getNumberByNepaliNumber(1256);
        }).toThrowError(Error, "Parameter nepaliNumber should be in string");
        expect(function () {
            calenderFunctions.getNumberByNepaliNumber("२३D71");
        }).toThrowError(Error, "Invalid nepali number");
        expect(function () {
            calenderFunctions.getNumberByNepaliNumber("२०७२");
        }).not.toThrow();
    });
});
