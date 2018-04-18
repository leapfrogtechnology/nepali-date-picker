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

describe("Test: calenderFunctions.getBsMonthInfoByBsDate(bsYear, bsMonth, bsDate, dateFormatPattern)", function () {
    it("Should throw ReferenceError on not pass required parameters", function () {
        expect(
            function () {
                calenderFunctions.getBsMonthInfoByBsDate()
            }).toThrowError(ReferenceError, "Missing required parameters: bsYear, bsMonth, bsDate");
    });

    it("Should throw TypeError if bsYear not number", function () {
        expect(function () {
            calenderFunctions.getBsMonthInfoByBsDate("2569", 2, 10, "y%, %M %D");
        }).toThrowError(TypeError, "Invalid parameter bsYear value");
        expect(function () {
            calenderFunctions.getBsMonthInfoByBsDate(2072, 2, 10, "y%, %M %D");
        }).not.toThrow(TypeError, "Invalid parameter bsYear value");
    });

    it("Should throw TypeError if bsMonth not number", function () {
        expect(function () {
            calenderFunctions.getBsMonthInfoByBsDate(2017, '2', 10, "y%, %M %D");
        }).toThrowError(TypeError, "Invalid parameter bsMonth value");
    });

    it("Should throw TypeError if bsDate not number", function () {
        expect(function () {
            calenderFunctions.getBsMonthInfoByBsDate(2017, 2, '10', "y%, %M %D");
        }).toThrowError(TypeError, "Invalid parameter bsDate value");
    });

    it("Should throw TypeError if dateFormatPattern not string", function () {
        expect(function () {
            calenderFunctions.getBsMonthInfoByBsDate(2017, 2, 10, 2000);
        }).toThrowError(TypeError, "Invalid parameter dateFormatPattern value");
    });

    it("Should throw RangeError if bsYear value out the supported range", function () {
        expect(function () {
            calenderFunctions.getBsMonthInfoByBsDate(9000, 2, 10, "y%, %M %D");
        }).toThrowError(RangeError, "Parameter bsYear value should be in range of 1970 to 2100");
    });

    it("Should throw RangeError if bsMonth value not in range 1-12", function () {
        expect(function () {
            calenderFunctions.getBsMonthInfoByBsDate(2072, 20, 10, "y%, %M %D");
        }).toThrowError(RangeError, "Parameter bsMonth value should be in range of 1 to 12");
    });

    it("Should throw RangeError if bsDate value not in range 1-32", function () {
        expect(function () {
            calenderFunctions.getBsMonthInfoByBsDate(2072, 10, 55, "y%, %M %D");
        }).toThrowError(RangeError, "Parameter bsDate value should be in range of 1 to 32");
    });

    it("Should return not empty object", function () {
        expect(calenderFunctions.getBsMonthInfoByBsDate(2072, 2, 10, "y%, %M %D")).toBeNonEmptyObject();
    });

    it("Should have key members [bsYear, bsMonth...]", function () {
        var bsMonthInfoByBsDate = calenderFunctions.getBsMonthInfoByBsDate(2072, 2, 10, "y%, %M %D");
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
        expect(calenderFunctions.getBsMonthInfoByBsDate(2000, 2, 1, "%y, %M %D")).toEqual({
            bsYear: 2000,
            bsMonth: 2,
            bsDate: 1,
            weekDay: 6,
            formattedDate: '२०००, जेठ शुक्र',
            adDate: new Date(1943, 4, 14),
            bsMonthFirstAdDate: new Date(1943, 4, 14),
            bsMonthDays: 32
        });

        expect(calenderFunctions.getBsMonthInfoByBsDate(2072, 3, 10, "%y, %M %D")).toEqual({
            bsYear: 2072,
            bsMonth: 3,
            bsDate: 10,
            weekDay: 5,
            formattedDate: '२०७२, असार बिही',
            adDate: new Date(2015, 5, 25),
            bsMonthFirstAdDate: new Date(2015, 5, 16),
            bsMonthDays: 31
        });

        expect(calenderFunctions.getBsMonthInfoByBsDate(2090, 12, 30, "%D, %M %d, %y")).toEqual({
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

describe("Test: calenderFunctions.getAdDateByBsDate(bsYear, bsMonth, BsDate)", function () {
    it("Should throw ReferenceError on not pass required parameters", function () {
        expect(
            function () {
                calenderFunctions.getAdDateByBsDate()
            }).toThrowError(ReferenceError, "Missing required parameters: bsYear, bsMonth, bsDate");
    });

    it("Return value should equal", function () {
        expect(calenderFunctions.getAdDateByBsDate(2075, 1, 4)).toEqual(new Date(2018, 3, 17));

        expect(calenderFunctions.getAdDateByBsDate(1990, 2, 20)).toEqual(new Date(1933, 5, 2));

        expect(calenderFunctions.getAdDateByBsDate(2095, 3, 1)).toEqual(new Date(2038, 5, 15));
    });
});

describe("Test: calenderFunctions.getTotalDaysNumFromMinBsYear(bsYear, bsMonth, BsDate)", function () {
    it("Should throw ReferenceError on not pass required parameters", function () {
        expect(
            function () {
                calenderFunctions.getTotalDaysNumFromMinBsYear()
            }).toThrowError(ReferenceError, "Missing required parameters: bsYear, bsMonth, bsDate");
    });

    it("Return value should equal", function () {
        expect(calenderFunctions.getTotalDaysNumFromMinBsYear(1970, 1, 5)).toEqual(5);

        expect(calenderFunctions.getTotalDaysNumFromMinBsYear(2075, 1, 4)).toEqual(38356);

        expect(calenderFunctions.getTotalDaysNumFromMinBsYear(1990, 2, 20)).toEqual(7356);

        expect(calenderFunctions.getTotalDaysNumFromMinBsYear(2095, 3, 1)).toEqual(45720);
    });
});

describe("Test: calenderFunctions.getMonthDaysNumFormMinBsYear(bsMonth, yearDiff)", function () {
    it("Should throw ReferenceError on not pass required parameters", function () {
        expect(
            function () {
                calenderFunctions.getMonthDaysNumFormMinBsYear()
            }).toThrowError(ReferenceError, "Missing required parameters: bsMonth, yearDiff");
    });

    it("Should throw TypeError if bsMonth not number", function () {
        expect(function () {
            calenderFunctions.getMonthDaysNumFormMinBsYear('baishak', 1);
        }).toThrowError(TypeError, "Invalid parameter bsMonth value");
        expect(function () {
            calenderFunctions.getMonthDaysNumFormMinBsYear(2, 2);
        }).not.toThrow(TypeError, "Invalid parameter bsMonth value");
    });

    it("Should throw TypeError if yearDiff not number", function () {
        expect(function () {
            calenderFunctions.getMonthDaysNumFormMinBsYear(2, '2');
        }).toThrowError(ReferenceError, "Invalid parameters: yearDiff");
        expect(function () {
            calenderFunctions.getMonthDaysNumFormMinBsYear(2, 200);
        }).toThrowError(RangeError, "Parameter yearDiff value should be in range of 0 to 131");
        expect(function () {
            calenderFunctions.getMonthDaysNumFormMinBsYear(2, 10);
        }).not.toThrow(TypeError, "Invalid parameter yearDiff value");
    });

    it("Return value should equal", function () {
        expect(calenderFunctions.getMonthDaysNumFormMinBsYear(2, 1)).toEqual(31);

        expect(calenderFunctions.getMonthDaysNumFormMinBsYear(5, 100)).toEqual(3102);

        expect(calenderFunctions.getMonthDaysNumFormMinBsYear(12, 130)).toEqual(3943);
    });
});

describe("Test: calenderFunctions.getBsMonthDays(bsYear, bsMonth)", function () {
    it("Should throw ReferenceError on not pass required parameters", function () {
        expect(
            function () {
                calenderFunctions.getBsMonthDays()
            }).toThrowError(ReferenceError, "Missing required parameters: bsYear, bsMonth");
    });

    it("Should throw TypeError if bsYear not number", function () {
        expect(function () {
            calenderFunctions.getBsMonthDays("2569", 2);
        }).toThrowError(TypeError, "Invalid parameter bsYear value");
        expect(function () {
            calenderFunctions.getBsMonthDays(2072, 2);
        }).not.toThrow(TypeError, "Invalid parameter bsYear value");
    });

    it("Should throw TypeError if bsMonth not number", function () {
        expect(function () {
            calenderFunctions.getBsMonthDays(2017, '2');
        }).toThrowError(TypeError, "Invalid parameter bsMonth value");
        expect(function () {
            calenderFunctions.getBsMonthDays(2072, 2);
        }).not.toThrow(TypeError, "Invalid parameter bsMonth value");
    });

    it("Should throw RangeError if bsYear value out the supported range", function () {
        expect(function () {
            calenderFunctions.getBsMonthInfoByBsDate(9000, 2, 10, "y%, %M %D");
        }).toThrowError(RangeError, "Parameter bsYear value should be in range of 1970 to 2100");
    });

    it("Should throw RangeError if bsMonth value not in range 0-11", function () {
        expect(function () {
            calenderFunctions.getBsMonthInfoByBsDate(2072, 20, 10, "y%, %M %D");
        }).toThrowError(RangeError, "Parameter bsMonth value should be in range of 1 to 12");
    });

    it("Should return valid number of BsMonth days", function () {
        expect(calenderFunctions.getBsMonthDays(1970, 1)).toEqual(31);
        expect(calenderFunctions.getBsMonthDays(1985, 6)).toEqual(31);
        expect(calenderFunctions.getBsMonthDays(2000, 1)).toEqual(30);
        expect(calenderFunctions.getBsMonthDays(2000, 6)).toEqual(30);
        expect(calenderFunctions.getBsMonthDays(2001, 1)).toEqual(31);
        expect(calenderFunctions.getBsMonthDays(2001, 5)).toEqual(31);
        expect(calenderFunctions.getBsMonthDays(2010, 10)).toEqual(29);
        expect(calenderFunctions.getBsMonthDays(2010, 12)).toEqual(30);
        expect(calenderFunctions.getBsMonthDays(2045, 2)).toEqual(32);
        expect(calenderFunctions.getBsMonthDays(2045, 5)).toEqual(31);
        expect(calenderFunctions.getBsMonthDays(2060, 3)).toEqual(32);
        expect(calenderFunctions.getBsMonthDays(2060, 7)).toEqual(30);
        expect(calenderFunctions.getBsMonthDays(2073, 1)).toEqual(31);
        expect(calenderFunctions.getBsMonthDays(2073, 9)).toEqual(29);
        expect(calenderFunctions.getBsMonthDays(2090, 1)).toEqual(30);
        expect(calenderFunctions.getBsMonthDays(2090, 7)).toEqual(30);
        expect(calenderFunctions.getBsMonthDays(2090, 12)).toEqual(30);
    });
});

describe("Test: calenderFunctions.getBsDateByAdDate(adYear, adMonth, adDate)", function () {
    it("Should throw ReferenceError on not pass required parameters", function () {
        expect(
            function () {
                calenderFunctions.getBsDateByAdDate()
            }).toThrowError(ReferenceError, "Missing required parameters: adYear, adMonth, adDate");
    });

    it("Should throw RangeError if adYear value out the supported range", function () {
        expect(function () {
            calenderFunctions.getBsDateByAdDate(9000, 2, 10);
        }).toThrowError(RangeError, "Parameter adYear value should be in range of 1913 to 2043");
    });

    it("Should throw RangeError if adMonth value not in range 1-12", function () {
        expect(function () {
            calenderFunctions.getBsDateByAdDate(2018, 20, 10);
        }).toThrowError(RangeError, "Parameter adMonth value should be in range of 1 to 12");
    });

    it("Should throw RangeError if bsDate value not in range 1-31", function () {
        expect(function () {
            calenderFunctions.getBsDateByAdDate(2018, 10, 55);
        }).toThrowError(RangeError, "Parameter adDate value should be in range of 1 to 31");
    });

    it("Return value should equal", function () {
        expect(calenderFunctions.getBsDateByAdDate(2018, 4, 1)).toEqual({ bsYear: 2074, bsMonth: 12, bsDate: 18 });
        expect(calenderFunctions.getBsDateByAdDate(2018, 4, 17)).toEqual({ bsYear: 2075, bsMonth: 1, bsDate: 4 });
        expect(calenderFunctions.getBsDateByAdDate(2018, 5, 1)).toEqual({ bsYear: 2075, bsMonth: 1, bsDate: 18 });

        expect(calenderFunctions.getBsDateByAdDate(1913, 5, 18)).toEqual({ bsYear: 1970, bsMonth: 2, bsDate: 5 });

        expect(calenderFunctions.getBsDateByAdDate(2018, 5, 1)).toEqual({ bsYear: 2075, bsMonth: 1, bsDate: 18 });

        expect(calenderFunctions.getBsDateByAdDate(1932, 1, 31)).toEqual({ bsYear: 1988, bsMonth: 10, bsDate: 17 });
    });
});

describe("Test: calenderFunctions.getBsYearByAdDate(adYear, adMonth, adDate)", function () {
    it("Should throw ReferenceError on not pass required parameters", function () {
        expect(
            function () {
                calenderFunctions.getBsYearByAdDate()
            }).toThrowError(ReferenceError, "Missing required parameters: adYear, adMonth, adDate");
    });

    it("Return value should equal", function () {
        expect(calenderFunctions.getBsYearByAdDate(2018, 4, 1)).toEqual(2074);

        expect(calenderFunctions.getBsYearByAdDate(2018, 4, 17)).toEqual(2075);

        expect(calenderFunctions.getBsYearByAdDate(1913, 5, 18)).toEqual(1970);

        expect(calenderFunctions.getBsYearByAdDate(1932, 1, 31)).toEqual(1988);
    });
});

describe("Test: calenderFunctions.getBsMonthByAdDate(adYear, adMonth, adDate)", function () {
    it("Should throw ReferenceError on not pass required parameters", function () {
        expect(
            function () {
                calenderFunctions.getBsMonthByAdDate()
            }).toThrowError(ReferenceError, "Missing required parameters: adYear, adMonth, adDate");
    });

    it("Return value should equal", function () {
        expect(calenderFunctions.getBsMonthByAdDate(2018, 4, 1)).toEqual(12);

        expect(calenderFunctions.getBsMonthByAdDate(2018, 4, 17)).toEqual(1);

        expect(calenderFunctions.getBsMonthByAdDate(1913, 5, 18)).toEqual(2);

        expect(calenderFunctions.getBsMonthByAdDate(1932, 1, 31)).toEqual(10);
    });
});

describe("Test: calenderFunctions.bsDateFormat(dateFormatPattern, bsYear, bsMonth, bsDate)", function () {
    it("Should throw ReferenceError on not pass required parameters", function () {
        expect(
            function () {
                calenderFunctions.bsDateFormat()
            }).toThrowError(ReferenceError, "Missing required parameters: dateFormatPattern, bsYear, bsMonth, bsDate");
    });

    it("Return value should equal", function () {
        expect(calenderFunctions.bsDateFormat('%d-%m-%y', 2074, 12, 18)).toEqual('१८-१२-२०७४');

        expect(calenderFunctions.bsDateFormat('%y %M, %d %D', 2075, 1, 4)).toEqual('२०७५ बैशाख, ४ मंगल');
    });
});


describe("Test: calenderFunctions.parseFormattedBsDate(dateFormat, dateFormattedText)", function () {
    it("Should throw ReferenceError on not pass required parameters", function () {
        expect(
            function () {
                calenderFunctions.parseFormattedBsDate()
            }).toThrowError(ReferenceError, "Missing required parameters: dateFormat, dateFormattedText");
    });

    it("Return value should equal", function () {
        expect(calenderFunctions.parseFormattedBsDate('%d-%m-%y', '१८-१२-२०७४')).toEqual({bsYear: 2074, bsMonth: 12, bsDate: 18, bsDay: 1});

        expect(calenderFunctions.parseFormattedBsDate('%y %M, %d %D', '२०७५ बैशाख, ४ मंगल')).toEqual({bsYear: 2075, bsMonth: 1, bsDate: 4, bsDay: 3});
    });
});

