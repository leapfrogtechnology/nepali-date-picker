describe("Test: calendarFunctions.getNepaliNumber(number)", function () {
    it("Should return equivalent nepali number", function () {
        expect(calendarFunctions.getNepaliNumber(2072)).toBe("२०७२");
        expect(calendarFunctions.getNepaliNumber(1234567890)).toBe("१२३४५६७८९०");
    });

    it("Throw error if parameter is not number OR negative number", function () {
        expect(function () {
            calendarFunctions.getNepaliNumber();
        }).toThrowError(Error, "Parameter number is required");

        expect(function () {
            calendarFunctions.getNepaliNumber('2072');
        }).toThrowError(Error, "Number should be positive integer");

        expect(function () {
            calendarFunctions.getNepaliNumber(-2072);
        }).toThrowError(Error, "Number should be positive integer");

        expect(function () {
            calendarFunctions.getNepaliNumber(2072);
        }).not.toThrow();
    });
});

describe("Test: calendarFunctions.getNumberByNepaliNumber(nepaliNumber)", function () {
    it("Should return equivalent number form NepaliNumber", function () {
        expect(calendarFunctions.getNumberByNepaliNumber("२०७२")).toEqual(2072);
        expect(calendarFunctions.getNumberByNepaliNumber("१२३४५६७८९०")).toEqual(1234567890);
    });

    it("Throw error if parameter not nepaliNumber in string", function () {
        expect(function () {
            calendarFunctions.getNumberByNepaliNumber();
        }).toThrowError(Error, "Parameter nepaliNumber is required");
        expect(function () {
            calendarFunctions.getNumberByNepaliNumber(1256);
        }).toThrowError(Error, "Parameter nepaliNumber should be in string");
        expect(function () {
            calendarFunctions.getNumberByNepaliNumber("२३D71");
        }).toThrowError(Error, "Invalid nepali number");
        expect(function () {
            calendarFunctions.getNumberByNepaliNumber("२०७२");
        }).not.toThrow();
    });
});

describe("Test: calendarFunctions.getBsMonthInfoByBsDate(bsYear, bsMonth, bsDate, dateFormatPattern)", function () {
    it("Should throw ReferenceError on not pass required parameters", function () {
        expect(
            function () {
                calendarFunctions.getBsMonthInfoByBsDate()
            }).toThrowError(ReferenceError, "Missing required parameters: bsYear, bsMonth, bsDate");
    });

    it("Should throw TypeError if bsYear not number", function () {
        expect(function () {
            calendarFunctions.getBsMonthInfoByBsDate("2569", 2, 10, "y%, %M %D");
        }).toThrowError(TypeError, "Invalid parameter bsYear value");
        expect(function () {
            calendarFunctions.getBsMonthInfoByBsDate(2072, 2, 10, "y%, %M %D");
        }).not.toThrow(TypeError, "Invalid parameter bsYear value");
    });

    it("Should throw TypeError if bsMonth not number", function () {
        expect(function () {
            calendarFunctions.getBsMonthInfoByBsDate(2017, '2', 10, "y%, %M %D");
        }).toThrowError(TypeError, "Invalid parameter bsMonth value");
    });

    it("Should throw TypeError if bsDate not number", function () {
        expect(function () {
            calendarFunctions.getBsMonthInfoByBsDate(2017, 2, '10', "y%, %M %D");
        }).toThrowError(TypeError, "Invalid parameter bsDate value");
    });

    it("Should throw TypeError if dateFormatPattern not string", function () {
        expect(function () {
            calendarFunctions.getBsMonthInfoByBsDate(2017, 2, 10, 2000);
        }).toThrowError(TypeError, "Invalid parameter dateFormatPattern value");
    });

    it("Should throw RangeError if bsYear value out the supported range", function () {
        expect(function () {
            calendarFunctions.getBsMonthInfoByBsDate(9000, 2, 10, "y%, %M %D");
        }).toThrowError(RangeError, "Parameter bsYear value should be in range of 1970 to 2100");
    });

    it("Should throw RangeError if bsMonth value not in range 1-12", function () {
        expect(function () {
            calendarFunctions.getBsMonthInfoByBsDate(2072, 20, 10, "y%, %M %D");
        }).toThrowError(RangeError, "Parameter bsMonth value should be in range of 1 to 12");
    });

    it("Should throw RangeError if bsDate value not in range 1-32", function () {
        expect(function () {
            calendarFunctions.getBsMonthInfoByBsDate(2072, 10, 55, "y%, %M %D");
        }).toThrowError(RangeError, "Parameter bsDate value should be in range of 1 to 32");
    });

    it("Should return not empty object", function () {
        expect(calendarFunctions.getBsMonthInfoByBsDate(2072, 2, 10, "y%, %M %D")).toBeNonEmptyObject();
    });

    it("Should have key members [bsYear, bsMonth...]", function () {
        var bsMonthInfoByBsDate = calendarFunctions.getBsMonthInfoByBsDate(2072, 2, 10, "y%, %M %D");
        var availableKeys = Object.keys(bsMonthInfoByBsDate).sort();
        var expectedKeys = [
            'bsYear',
            'bsMonth',
            'bsDate',
            'weekDay',
            'formattedDate',
            'adDate',
            'bsMonthFirstAdDate',
            'bsMonthDays'
        ].sort();

        expect(bsMonthInfoByBsDate).toHaveMember("bsYear");
        expect(availableKeys).toEqual(expectedKeys);
    });

    it("Return value should equal", function () {
        expect(calendarFunctions.getBsMonthInfoByBsDate(2000, 2, 1, "%y, %M %D")).toEqual({
            bsYear: 2000,
            bsMonth: 2,
            bsDate: 1,
            weekDay: 6,
            formattedDate: '२०००, जेठ शुक्र',
            adDate: new Date(1943, 4, 14),
            bsMonthFirstAdDate: new Date(1943, 4, 14),
            bsMonthDays: 32
        });

        expect(calendarFunctions.getBsMonthInfoByBsDate(2072, 3, 10, "%y, %M %D")).toEqual({
            bsYear: 2072,
            bsMonth: 3,
            bsDate: 10,
            weekDay: 5,
            formattedDate: '२०७२, असार बिही',
            adDate: new Date(2015, 5, 25),
            bsMonthFirstAdDate: new Date(2015, 5, 16),
            bsMonthDays: 31
        });

        expect(calendarFunctions.getBsMonthInfoByBsDate(2090, 12, 30, "%D, %M %d, %y")).toEqual({
            bsYear: 2090,
            bsMonth: 12,
            bsDate: 30,
            weekDay: 5,
            formattedDate: 'बिही, चैत ३०, २०९०',
            adDate: new Date(2034, 3, 13),
            bsMonthFirstAdDate: new Date(2034, 2, 15),
            bsMonthDays: 30
        });
    })
});

describe("Test: calendarFunctions.getAdDateByBsDate(bsYear, bsMonth, BsDate)", function () {
    it("Should throw ReferenceError on not pass required parameters", function () {
        expect(
            function () {
                calendarFunctions.getAdDateByBsDate()
            }).toThrowError(ReferenceError, "Missing required parameters: bsYear, bsMonth, bsDate");
    });

    it("Return value should equal", function () {
        expect(calendarFunctions.getAdDateByBsDate(2075, 1, 4)).toEqual(new Date(2018, 3, 17));

        expect(calendarFunctions.getAdDateByBsDate(1990, 2, 20)).toEqual(new Date(1933, 5, 2));

        expect(calendarFunctions.getAdDateByBsDate(2095, 3, 1)).toEqual(new Date(2038, 5, 15));
    });
});

describe("Test: calendarFunctions.getTotalDaysNumFromMinBsYear(bsYear, bsMonth, BsDate)", function () {
    it("Should throw ReferenceError on not pass required parameters", function () {
        expect(
            function () {
                calendarFunctions.getTotalDaysNumFromMinBsYear()
            }).toThrowError(ReferenceError, "Missing required parameters: bsYear, bsMonth, bsDate");
    });

    it("Return value should equal", function () {
        expect(calendarFunctions.getTotalDaysNumFromMinBsYear(1970, 1, 5)).toEqual(5);

        expect(calendarFunctions.getTotalDaysNumFromMinBsYear(2075, 1, 4)).toEqual(38356);

        expect(calendarFunctions.getTotalDaysNumFromMinBsYear(1990, 2, 20)).toEqual(7356);

        expect(calendarFunctions.getTotalDaysNumFromMinBsYear(2095, 3, 1)).toEqual(45720);
    });
});

describe("Test: calendarFunctions.getMonthDaysNumFormMinBsYear(bsMonth, yearDiff)", function () {
    it("Should throw ReferenceError on not pass required parameters", function () {
        expect(
            function () {
                calendarFunctions.getMonthDaysNumFormMinBsYear()
            }).toThrowError(ReferenceError, "Missing required parameters: bsMonth, yearDiff");
    });

    it("Should throw TypeError if bsMonth not number", function () {
        expect(function () {
            calendarFunctions.getMonthDaysNumFormMinBsYear('baishak', 1);
        }).toThrowError(TypeError, "Invalid parameter bsMonth value");
        expect(function () {
            calendarFunctions.getMonthDaysNumFormMinBsYear(2, 2);
        }).not.toThrow(TypeError, "Invalid parameter bsMonth value");
    });

    it("Should throw TypeError if yearDiff not number", function () {
        expect(function () {
            calendarFunctions.getMonthDaysNumFormMinBsYear(2, '2');
        }).toThrowError(ReferenceError, "Invalid parameters: yearDiff");
        expect(function () {
            calendarFunctions.getMonthDaysNumFormMinBsYear(2, 200);
        }).toThrowError(RangeError, "Parameter yearDiff value should be in range of 0 to 131");
        expect(function () {
            calendarFunctions.getMonthDaysNumFormMinBsYear(2, 10);
        }).not.toThrow(TypeError, "Invalid parameter yearDiff value");
    });

    it("Return value should equal", function () {
        expect(calendarFunctions.getMonthDaysNumFormMinBsYear(2, 1)).toEqual(31);

        expect(calendarFunctions.getMonthDaysNumFormMinBsYear(5, 100)).toEqual(3102);

        expect(calendarFunctions.getMonthDaysNumFormMinBsYear(12, 130)).toEqual(3943);
    });
});

describe("Test: calendarFunctions.getBsMonthDays(bsYear, bsMonth)", function () {
    it("Should throw ReferenceError on not pass required parameters", function () {
        expect(
            function () {
                calendarFunctions.getBsMonthDays()
            }).toThrowError(ReferenceError, "Missing required parameters: bsYear, bsMonth");
    });

    it("Should throw TypeError if bsYear not number", function () {
        expect(function () {
            calendarFunctions.getBsMonthDays("2569", 2);
        }).toThrowError(TypeError, "Invalid parameter bsYear value");
        expect(function () {
            calendarFunctions.getBsMonthDays(2072, 2);
        }).not.toThrow(TypeError, "Invalid parameter bsYear value");
    });

    it("Should throw TypeError if bsMonth not number", function () {
        expect(function () {
            calendarFunctions.getBsMonthDays(2017, '2');
        }).toThrowError(TypeError, "Invalid parameter bsMonth value");
        expect(function () {
            calendarFunctions.getBsMonthDays(2072, 2);
        }).not.toThrow(TypeError, "Invalid parameter bsMonth value");
    });

    it("Should throw RangeError if bsYear value out the supported range", function () {
        expect(function () {
            calendarFunctions.getBsMonthInfoByBsDate(9000, 2, 10, "y%, %M %D");
        }).toThrowError(RangeError, "Parameter bsYear value should be in range of 1970 to 2100");
    });

    it("Should throw RangeError if bsMonth value not in range 0-11", function () {
        expect(function () {
            calendarFunctions.getBsMonthInfoByBsDate(2072, 20, 10, "y%, %M %D");
        }).toThrowError(RangeError, "Parameter bsMonth value should be in range of 1 to 12");
    });

    it("Should return valid number of BsMonth days", function () {
        expect(calendarFunctions.getBsMonthDays(1970, 1)).toEqual(31);
        expect(calendarFunctions.getBsMonthDays(1985, 6)).toEqual(31);
        expect(calendarFunctions.getBsMonthDays(2000, 1)).toEqual(30);
        expect(calendarFunctions.getBsMonthDays(2000, 6)).toEqual(30);
        expect(calendarFunctions.getBsMonthDays(2001, 1)).toEqual(31);
        expect(calendarFunctions.getBsMonthDays(2001, 5)).toEqual(31);
        expect(calendarFunctions.getBsMonthDays(2010, 10)).toEqual(29);
        expect(calendarFunctions.getBsMonthDays(2010, 12)).toEqual(30);
        expect(calendarFunctions.getBsMonthDays(2045, 2)).toEqual(32);
        expect(calendarFunctions.getBsMonthDays(2045, 5)).toEqual(31);
        expect(calendarFunctions.getBsMonthDays(2060, 3)).toEqual(32);
        expect(calendarFunctions.getBsMonthDays(2060, 7)).toEqual(30);
        expect(calendarFunctions.getBsMonthDays(2073, 1)).toEqual(31);
        expect(calendarFunctions.getBsMonthDays(2073, 9)).toEqual(29);
        expect(calendarFunctions.getBsMonthDays(2090, 1)).toEqual(30);
        expect(calendarFunctions.getBsMonthDays(2090, 7)).toEqual(30);
        expect(calendarFunctions.getBsMonthDays(2090, 12)).toEqual(30);
    });
});

describe("Test: calendarFunctions.getBsDateByAdDate(adYear, adMonth, adDate)", function () {
    it("Should throw ReferenceError on not pass required parameters", function () {
        expect(
            function () {
                calendarFunctions.getBsDateByAdDate()
            }).toThrowError(ReferenceError, "Missing required parameters: adYear, adMonth, adDate");
    });

    it("Should throw RangeError if adYear value out the supported range", function () {
        expect(function () {
            calendarFunctions.getBsDateByAdDate(9000, 2, 10);
        }).toThrowError(RangeError, "Parameter adYear value should be in range of 1913 to 2043");
    });

    it("Should throw RangeError if adMonth value not in range 1-12", function () {
        expect(function () {
            calendarFunctions.getBsDateByAdDate(2018, 20, 10);
        }).toThrowError(RangeError, "Parameter adMonth value should be in range of 1 to 12");
    });

    it("Should throw RangeError if bsDate value not in range 1-31", function () {
        expect(function () {
            calendarFunctions.getBsDateByAdDate(2018, 10, 55);
        }).toThrowError(RangeError, "Parameter adDate value should be in range of 1 to 31");
    });

    it("Return value should equal", function () {
        expect(calendarFunctions.getBsDateByAdDate(2018, 4, 1)).toEqual({ bsYear: 2074, bsMonth: 12, bsDate: 18 });
        expect(calendarFunctions.getBsDateByAdDate(2018, 4, 17)).toEqual({ bsYear: 2075, bsMonth: 1, bsDate: 4 });
        expect(calendarFunctions.getBsDateByAdDate(2018, 5, 1)).toEqual({ bsYear: 2075, bsMonth: 1, bsDate: 18 });

        expect(calendarFunctions.getBsDateByAdDate(1913, 5, 18)).toEqual({ bsYear: 1970, bsMonth: 2, bsDate: 5 });

        expect(calendarFunctions.getBsDateByAdDate(2018, 5, 1)).toEqual({ bsYear: 2075, bsMonth: 1, bsDate: 18 });

        expect(calendarFunctions.getBsDateByAdDate(1932, 1, 31)).toEqual({ bsYear: 1988, bsMonth: 10, bsDate: 17 });
    });
});

describe("Test: calendarFunctions.getBsYearByAdDate(adYear, adMonth, adDate)", function () {
    it("Should throw ReferenceError on not pass required parameters", function () {
        expect(
            function () {
                calendarFunctions.getBsYearByAdDate()
            }).toThrowError(ReferenceError, "Missing required parameters: adYear, adMonth, adDate");
    });

    it("Return value should equal", function () {
        expect(calendarFunctions.getBsYearByAdDate(2018, 4, 1)).toEqual(2074);

        expect(calendarFunctions.getBsYearByAdDate(2018, 4, 17)).toEqual(2075);

        expect(calendarFunctions.getBsYearByAdDate(1913, 5, 18)).toEqual(1970);

        expect(calendarFunctions.getBsYearByAdDate(1932, 1, 31)).toEqual(1988);
    });
});

describe("Test: calendarFunctions.getBsMonthByAdDate(adYear, adMonth, adDate)", function () {
    it("Should throw ReferenceError on not pass required parameters", function () {
        expect(
            function () {
                calendarFunctions.getBsMonthByAdDate()
            }).toThrowError(ReferenceError, "Missing required parameters: adYear, adMonth, adDate");
    });

    it("Return value should equal", function () {
        expect(calendarFunctions.getBsMonthByAdDate(2018, 4, 1)).toEqual(12);

        expect(calendarFunctions.getBsMonthByAdDate(2018, 4, 17)).toEqual(1);

        expect(calendarFunctions.getBsMonthByAdDate(1913, 5, 18)).toEqual(2);

        expect(calendarFunctions.getBsMonthByAdDate(1932, 1, 31)).toEqual(10);
    });
});

describe("Test: calendarFunctions.bsDateFormat(dateFormatPattern, bsYear, bsMonth, bsDate)", function () {
    it("Should throw ReferenceError on not pass required parameters", function () {
        expect(
            function () {
                calendarFunctions.bsDateFormat()
            }).toThrowError(ReferenceError, "Missing required parameters: dateFormatPattern, bsYear, bsMonth, bsDate");
    });

    it("Return value should equal", function () {
        expect(calendarFunctions.bsDateFormat('%d-%m-%y', 2074, 12, 18)).toEqual('१८-१२-२०७४');

        expect(calendarFunctions.bsDateFormat('%y %M, %d %D', 2075, 1, 4)).toEqual('२०७५ बैशाख, ४ मंगल');
    });
});


describe("Test: calendarFunctions.parseFormattedBsDate(dateFormat, dateFormattedText)", function () {
    it("Should throw ReferenceError on not pass required parameters", function () {
        expect(
            function () {
                calendarFunctions.parseFormattedBsDate()
            }).toThrowError(ReferenceError, "Missing required parameters: dateFormat, dateFormattedText");
    });

    it("Return value should equal", function () {
        expect(calendarFunctions.parseFormattedBsDate('%d-%m-%y', '१८-१२-२०७४')).toEqual({bsYear: 2074, bsMonth: 12, bsDate: 18, bsDay: 1});

        expect(calendarFunctions.parseFormattedBsDate('%y %M, %d %D', '२०७५ बैशाख, ४ मंगल')).toEqual({bsYear: 2075, bsMonth: 1, bsDate: 4, bsDay: 3});
    });
});
