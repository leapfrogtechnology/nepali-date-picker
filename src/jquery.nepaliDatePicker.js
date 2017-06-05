/*
 * @fileOverview NepaliDatePicker - jQuery Plugin
 * @version 1.0.2
 *
 * @author Sanish Maharjan https://github.com/sanishmaharjan
 * @see https://github.com/sanishmaharjan/
 */
var calenderFunctions = {};
(function ($) {
    var calenderData = {
        bsMonths: ["बैशाख", "जेठ", "असार", "सावन", "भदौ", "असोज", "कार्तिक", "मंसिर", "पौष", "माघ", "फागुन", "चैत"],
        bsDays: ["आईत", "सोम", "मंगल", "बुध", "बिही", "शुक्र", "शनि"],
        nepaliNumbers: ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"],
        bsMonthUpperDays: [
            [30, 31],
            [31, 32],
            [31, 32],
            [31, 32],
            [31, 32],
            [30, 31],
            [29, 30],
            [29, 30],
            [29, 30],
            [29, 30],
            [29, 30],
            [30, 31]
        ],
        extractedBsMonthData: [
            [1, 3, 1, 22, 1, 3, 1, 3, 1, 22, 1, 3, 1, 19, 1, 3, 1, 1, 3],
            [0, 1, 2, 2, 2, 1, 3, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 3, 1, 1, 1, 1, 2, 2, 2, 2],
            [0, 1, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 2, 2, 2, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 2, 2, 2, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 2, 2, 1, 3],
            [29, 1, 26, 1, 28, 1, 2, 1, 2], [1, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 1, 1, 2, 2],
            [0, 8, 1, 3, 1, 3, 1, 18, 1, 3, 1, 3, 1, 18, 1, 3, 1, 3, 1, 20],
            [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 11],
            [1, 2, 2, 2, 1, 3, 1, 3, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 3, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 3, 1, 2, 2, 2, 11],
            [0, 1, 3, 1, 14, 1, 3, 1, 3, 1, 3, 1, 18, 1, 3, 1, 3, 1, 3, 1, 14, 1, 3, 10],
            [1, 3, 1, 3, 1, 10, 1, 3, 1, 3, 1, 3, 1, 3, 1, 14, 1, 3, 1, 3, 1, 3, 1, 3, 1, 10, 1, 13],
            [0, 1, 2, 2, 2, 2, 2, 1, 3, 1, 3, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 3, 1, 3, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 3, 1, 13]
        ],
        minBsYear: 2000,
        maxBsYear: 2090,
        minAdDateEqBsDate: {
            "ad": {
                "year": 1943, "month": 3, "date": 14
            },
            "bs": {
                "year": 2000, "month": 1, "date": 1
            }
        }
    };

    var validationFunctions = {
        validateRequiredParameters: function (requiredParameters) {
            $.each(requiredParameters, function (key, value) {
                if (typeof value === "undefined" || value === null) {
                    throw new ReferenceError("Missing required parameters: " + Object.keys(requiredParameters).join(", "));
                }
            });
        },
        validateBsYear: function (bsYear) {
            if (typeof bsYear !== "number" || bsYear === null) {
                throw new TypeError("Invalid parameter bsYear value");
            } else if (bsYear < calenderData.minBsYear || bsYear > calenderData.maxBsYear) {
                throw new RangeError("Parameter bsYear value should be in range of " + calenderData.minBsYear + " to " + calenderData.maxBsYear);
            }
        },
        validateBsMonth: function (bsMonth) {
            if (typeof bsMonth !== "number" || bsMonth === null) {
                throw new TypeError("Invalid parameter bsMonth value");
            } else if (bsMonth < 0 || bsMonth > 11) {
                throw new RangeError("Parameter bsMonth value should be in range of 0 to 11");
            }
        },
        validateBsDate: function (bsDate) {
            if (typeof bsDate !== "number" || bsDate === null) {
                throw new TypeError("Invalid parameter bsDate value");
            } else if (bsDate < 1 || bsDate > 32) {
                throw new RangeError("Parameter bsDate value should be in range of 1 to 32");
            }
        },
        validatePositiveNumber: function (numberParameters) {
            $.each(numberParameters, function (key, value) {
                if (typeof value !== "number" || value === null || value < 0) {
                    throw new ReferenceError("Invalid parameters: " + Object.keys(numberParameters).join(", "));
                } else if (key === "yearDiff" && value > (calenderData.maxBsYear - calenderData.minBsYear + 1)) {
                    throw new RangeError("Parameter yearDiff value should be in range of 0 to " + (calenderData.maxBsYear - calenderData.minBsYear + 1));
                }
            });
        }
    };

    $.extend(calenderFunctions, {
        /**
         * Return equivalent number in nepaliNumber
         * @param {Integer} number
         * @returns {String} nepaliNumber
         */
        getNepaliNumber: function (number) {
            if (typeof number === "undefined") {
                throw new Error("Parameter number is required");
            } else if (typeof number != "number" || number < 0) {
                throw new Error("Number should be positive integer");
            }

            var prefixNum = Math.floor(number / 10);
            var suffixNum = number % 10;
            if (prefixNum !== 0) {
                return calenderFunctions.getNepaliNumber(prefixNum) + calenderData.nepaliNumbers[suffixNum];
            } else {
                return calenderData.nepaliNumbers[suffixNum];
            }
        },
        /**
         * Return equivalent number from nepaliNumber
         * @param {String} nepaliNumber
         * @returns {Integer} number
         */
        getNumberByNepaliNumber: function (nepaliNumber) {
            if (typeof nepaliNumber === "undefined") {
                throw new Error("Parameter nepaliNumber is required");
            } else if (typeof nepaliNumber !== "string") {
                throw new Error("Parameter nepaliNumber should be in string");
            }

            var number = 0;
            for (var i = 0; i < nepaliNumber.length; i++) {
                var numIndex = calenderData.nepaliNumbers.indexOf(nepaliNumber.charAt(i));
                if (numIndex === -1) {
                    throw new Error("Invalid nepali number");
                }
                number = number * 10 + numIndex;
            }

            return number;
        },
        getBsMonthInfoByBsDate: function (bsYear, bsMonth, bsDate, dateFormatPattern) {
            validationFunctions.validateRequiredParameters({"bsYear": bsYear, "bsMonth": bsMonth, "bsDate": bsDate});
            validationFunctions.validateBsYear(bsYear);
            validationFunctions.validateBsMonth(bsMonth);
            validationFunctions.validateBsDate(bsDate);
            if (dateFormatPattern === null) {
                dateFormatPattern = "%D, %M %d, %y";
            } else if (typeof dateFormatPattern != "string") {
                throw new TypeError("Invalid parameter dateFormatPattern value");
            }

            var daysNumFromMinBsYear = calenderFunctions.getTotalDaysNumFromMinBsYear(bsYear, bsMonth, bsDate);
            var adDate = new Date(calenderData.minAdDateEqBsDate.ad.year, calenderData.minAdDateEqBsDate.ad.month, calenderData.minAdDateEqBsDate.ad.date - 1);
            adDate.setDate(adDate.getDate() + daysNumFromMinBsYear);

            var bsMonthFirstAdDate = calenderFunctions.getAdDateByBsDate(bsYear, bsMonth, 1);
            var bsMonthDays = calenderFunctions.getBsMonthDays(bsYear, bsMonth);
            bsDate = (bsDate > bsMonthDays) ? bsMonthDays : bsDate;
            var eqAdDate = calenderFunctions.getAdDateByBsDate(bsYear, bsMonth, bsDate);
            var weekDay = eqAdDate.getDay();
            var formattedDate = calenderFunctions.bsDateFormat(dateFormatPattern, bsYear, bsMonth, bsDate, weekDay);
            return {
                bsYear: bsYear,
                bsMonth: bsMonth,
                bsDate: bsDate,
                weekDay: weekDay,
                formattedDate: formattedDate,
                adDate: eqAdDate,
                bsMonthFirstAdDate: bsMonthFirstAdDate,
                bsMonthDays: bsMonthDays
            };
        },
        getAdDateByBsDate: function (bsYear, bsMonth, BsDate) {
            var daysNumFromMinBsYear = calenderFunctions.getTotalDaysNumFromMinBsYear(bsYear, bsMonth, BsDate);
            var adDate = new Date(calenderData.minAdDateEqBsDate.ad.year, calenderData.minAdDateEqBsDate.ad.month, calenderData.minAdDateEqBsDate.ad.date - 1);
            adDate.setDate(adDate.getDate() + daysNumFromMinBsYear);
            return adDate;
        },
        getTotalDaysNumFromMinBsYear: function (bsYear, bsMonth, bsDate) {
            if (bsYear < calenderData.minBsYear || bsYear > calenderData.maxBsYear) {
                return null;
            }

            var daysNumFromMinBsYear = 0;
            var diffYears = bsYear - calenderData.minBsYear;
            for (var monthIndex = 0; monthIndex < 12; monthIndex++) {
                if (monthIndex < bsMonth) {
                    daysNumFromMinBsYear += calenderFunctions.getMonthDaysNumFormMinBsYear(monthIndex, diffYears + 1);
                } else {
                    daysNumFromMinBsYear += calenderFunctions.getMonthDaysNumFormMinBsYear(monthIndex, diffYears);
                }
            }

            if (bsYear > 2085 && bsYear < 2088) {
                daysNumFromMinBsYear += bsDate - 2;
            } else if (bsYear > 2088 && bsMonth > 4) {
                daysNumFromMinBsYear += bsDate - 4;
            } else {
                daysNumFromMinBsYear += bsDate;
            }

            return daysNumFromMinBsYear;
        },
        /**
         * Return total number of bsMonth days from minYear
         * @param {Integer} bsMonth
         * @param {integer} yearDiff
         * @returns {number}
         */
        getMonthDaysNumFormMinBsYear: function (bsMonth, yearDiff) {
            validationFunctions.validateRequiredParameters({"bsMonth": bsMonth, "yearDiff": yearDiff});
            validationFunctions.validateBsMonth(bsMonth);
            validationFunctions.validatePositiveNumber({"yearDiff": yearDiff});

            var yearCount = 0;
            var monthDaysFromMinBsYear = 0;
            if (yearDiff === 0) {
                return 0;
            }

            var bsMonthData = calenderData.extractedBsMonthData[bsMonth];
            for (var i = 0; i < bsMonthData.length; i++) {
                if (bsMonthData[i] === 0) {
                    continue;
                }

                var bsMonthUpperDaysIndex = i % 2;
                if (yearDiff > yearCount + bsMonthData[i]) {
                    yearCount += bsMonthData[i];
                    monthDaysFromMinBsYear += calenderData.bsMonthUpperDays[bsMonth][bsMonthUpperDaysIndex] * bsMonthData[i];
                } else {
                    monthDaysFromMinBsYear += calenderData.bsMonthUpperDays[bsMonth][bsMonthUpperDaysIndex] * (yearDiff - yearCount);
                    yearCount = yearDiff - yearCount;
                    break;
                }
            }

            return monthDaysFromMinBsYear;
        },
        /**
         * Return number of bsMonth days
         * @param {Integer} bsYear
         * @param {Integer} bsMonth
         * @returns {int} days
         */
        getBsMonthDays: function (bsYear, bsMonth) {
            validationFunctions.validateRequiredParameters({"bsYear": bsYear, "bsMonth": bsMonth});
            validationFunctions.validateBsYear(bsYear);
            validationFunctions.validateBsMonth(bsMonth);

            var yearCount = 0;
            var totalYears = (bsYear + 1) - calenderData.minBsYear;
            var bsMonthData = calenderData.extractedBsMonthData[bsMonth];
            for (var i = 0; i < bsMonthData.length; i++) {
                if (bsMonthData[i] === 0) {
                    continue;
                }

                var bsMonthUpperDaysIndex = i % 2;
                yearCount += bsMonthData[i];
                if (totalYears <= yearCount) {
                    if ((bsYear == 2085 && bsMonth == 4) || (bsYear == 2088 && bsMonth == 4)) {
                        return calenderData.bsMonthUpperDays[bsMonth][bsMonthUpperDaysIndex] - 2;
                    } else {
                        return calenderData.bsMonthUpperDays[bsMonth][bsMonthUpperDaysIndex];
                    }
                }
            }

            return null;
        },
        getBsDateByAdDate: function (adYear, adMonth, adDate) {
            var bsYear = adYear + 57;
            var bsMonth = (adMonth + 9 ) % 12;
            var bsDate = 1;

            if (adMonth < 3) {
                bsYear -= 1;
            } else if (adMonth == 3) {
                var bsYearFirstAdDate = calenderFunctions.getAdDateByBsDate(bsYear, 0, 1);
                if (adDate < bsYearFirstAdDate.getDate()) {
                    bsYear -= 1;
                }
            }

            var bsMonthFirstAdDate = calenderFunctions.getAdDateByBsDate(bsYear, bsMonth, 1);
            if (adDate >= 1 && adDate < bsMonthFirstAdDate.getDate()) {
                bsMonth = (bsMonth !== 0) ? bsMonth - 1 : 11;
                var bsMonthDays = calenderFunctions.getBsMonthDays(bsYear, bsMonth);
                bsDate = bsMonthDays - (bsMonthFirstAdDate.getDate() - adDate) + 1;
            } else {
                bsDate = adDate - bsMonthFirstAdDate.getDate() + 1;
            }

            return {
                bsYear: bsYear,
                bsMonth: bsMonth,
                bsDate: bsDate
            };
        },
        getBsYearByAdDate: function (adYear, adMonth, adDate) {
            var bsDate = calenderFunctions.getBsDateByAdDate(adYear, adMonth, adDate);
            return bsDate.bsYear;
        },
        getBsMonthByAdDate: function (adYear, adMonth, adDate) {
            var bsDate = calenderFunctions.getBsDateByAdDate(adYear, adMonth, adDate);
            return bsDate.bsMonth;
        },
        bsDateFormat: function (dateFormatPattern, bsYear, bsMonth, bsDate, day) {
            var formattedDate = dateFormatPattern;
            formattedDate = formattedDate.replace(/%d/g, calenderFunctions.getNepaliNumber(bsDate));
            formattedDate = formattedDate.replace(/%y/g, calenderFunctions.getNepaliNumber(bsYear));
            formattedDate = formattedDate.replace(/%m/g, calenderFunctions.getNepaliNumber(bsMonth+1));
            formattedDate = formattedDate.replace(/%M/g, calenderData.bsMonths[bsMonth]);
            formattedDate = formattedDate.replace(/%D/g, calenderData.bsDays[day]);
            return formattedDate;
        },
        parseFormattedBsDate: function (dateFormat, dateFormattedText) {
            var diffTextNum = 0;
            var extractedFormattedBsDate = {
                "bsYear": null,
                "bsMonth": null,
                "bsDate": null,
                "bsDay": null
            };

            for (var i = 0; i < dateFormat.length; i++) {
                if (dateFormat.charAt(i) == '%') {
                    var valueOf = dateFormat.substring(i, i + 2);
                    var endChar = dateFormat.charAt(i + 2);
                    var tempText = dateFormattedText.substring(i + diffTextNum);
                    var endIndex = (endChar !== '') ? tempText.indexOf(endChar) : tempText.length;
                    var value = tempText.substring(0, endIndex);

                    if (valueOf == "%y") {
                        extractedFormattedBsDate.bsYear = calenderFunctions.getNumberByNepaliNumber(value);
                        diffTextNum += value.length - 2;
                    } else if (valueOf == "%d") {
                        extractedFormattedBsDate.bsDate = calenderFunctions.getNumberByNepaliNumber(value);
                        diffTextNum += value.length - 2;
                    } else if (valueOf == "%D") {
                        extractedFormattedBsDate.bsDay = calenderData.bsDays.indexOf(value);
                        diffTextNum += value.length - 2;
                    } else if (valueOf == "%m") {
                        extractedFormattedBsDate.bsMonth = calenderFunctions.getNumberByNepaliNumber(value);
                        diffTextNum += value.length - 2;
                    } else if (valueOf == "%M") {
                        extractedFormattedBsDate.bsMonth = calenderData.bsMonths.indexOf(value);
                        diffTextNum += value.length - 2;
                    }
                }
            }

            return extractedFormattedBsDate;
        }
    });

    $.fn.nepaliDatePicker = function (options) {
        var datePickerPlugin = {
            options: $.extend({
                dateFormat: "%D, %M %d, %y",
                closeOnDateSelect: true,
                defaultDate: "",
                minDate: null,
                maxDate: null,
                yearStart: calenderData.minBsYear,
                yearEnd: calenderData.maxBsYear
            }, options),
            init: function ($element) {
                $element.prop("readonly", true);
                var $nepaliDatePicker = $('<div class="nepali-date-picker">');
                $('body').append($nepaliDatePicker);
                if ($element.val() !== '') {
                    datePickerPlugin.renderFormattedSpecificDateCalender($nepaliDatePicker, datePickerPlugin.options.dateFormat, $element.val());
                } else {
                    datePickerPlugin.renderCurrentMonthCalender($nepaliDatePicker);
                }
                datePickerPlugin.addEventHandler($element, $nepaliDatePicker);
            },
            addCommonEventHandler: function () {
                var $datePickerWrapper = $(".nepali-date-picker");
                $(document).click(function (event) {
                    var $targetElement = $(event.target);
                    if (!$targetElement.parents($(".nepali-date-picker")).length) {
                        $datePickerWrapper.hide();
                        $datePickerWrapper.find(".drop-down-content").hide();
                    }
                });
            },
            addEventHandler: function ($element, $nepaliDatePicker) {
                $element.focus(function () {
                    $(".nepali-date-picker").hide();
                    var inputFieldPosition = $(this).offset();
                    $nepaliDatePicker.css({
                        "top": inputFieldPosition.top + $(this).outerHeight(true),
                        "left": inputFieldPosition.left
                    });

                    $nepaliDatePicker.show();
                    datePickerPlugin.eventFire($element, $nepaliDatePicker, "show");
                });

                $element.click(function () {
                    $(".nepali-date-picker").hide();
                    var inputFieldPosition = $(this).offset();
                    $nepaliDatePicker.css({
                        "top": inputFieldPosition.top + $(this).outerHeight(true),
                        "left": inputFieldPosition.left
                    });

                    $nepaliDatePicker.show();
                    datePickerPlugin.eventFire($element, $nepaliDatePicker, "show");
                });

                $nepaliDatePicker.on("click", ".next-btn", function (event) {
                    event.preventDefault();
                    var preCalenderData = {
                        "bsYear": $nepaliDatePicker.data().bsYear,
                        "bsMonth": $nepaliDatePicker.data().bsMonth,
                        "bsDate": $nepaliDatePicker.data().bsDate
                    };
                    datePickerPlugin.renderNextMonthCalender($nepaliDatePicker);
                    datePickerPlugin.triggerChangeEvent($element, $nepaliDatePicker, preCalenderData);
                    $nepaliDatePicker.show();
                });

                $nepaliDatePicker.on("click", ".prev-btn", function (event) {
                    event.preventDefault();
                    var preCalenderData = {
                        "bsYear": $nepaliDatePicker.data().bsYear,
                        "bsMonth": $nepaliDatePicker.data().bsMonth,
                        "bsDate": $nepaliDatePicker.data().bsDate
                    };
                    datePickerPlugin.renderPreviousMonthCalender($nepaliDatePicker);
                    var calenderData = $nepaliDatePicker.data();
                    datePickerPlugin.triggerChangeEvent($element, $nepaliDatePicker, preCalenderData);
                    $nepaliDatePicker.show();
                });

                $nepaliDatePicker.on("click", ".today-btn", function (event) {
                    event.preventDefault();
                    var preCalenderData = {
                        "bsYear": $nepaliDatePicker.data().bsYear,
                        "bsMonth": $nepaliDatePicker.data().bsMonth,
                        "bsDate": $nepaliDatePicker.data().bsDate
                    };
                    datePickerPlugin.renderCurrentMonthCalender($nepaliDatePicker);
                    var calenderData = $nepaliDatePicker.data();
                    datePickerPlugin.triggerChangeEvent($element, $nepaliDatePicker, preCalenderData);
                    $nepaliDatePicker.show();
                });

                $nepaliDatePicker.on("click", ".current-year-txt, .current-month-txt", function () {
                    if (!$(this).find(".drop-down-content").is(":visible")) {
                        $nepaliDatePicker.find(".drop-down-content").hide();
                        $(this).find(".drop-down-content").show();
                        var $optionWrapper = $(this).find(".option-wrapper");
                        $optionWrapper.scrollTop(0);
                        var scrollTopTo = $optionWrapper.find(".active").position().top;
                        $optionWrapper.scrollTop(scrollTopTo);
                    } else {
                        $(this).find(".drop-down-content").hide();
                    }
                });

                $nepaliDatePicker.on("click", ".current-month-date", function () {
                    if ($(this).hasClass("disable")) {
                        return;
                    }

                    var datePickerData = $nepaliDatePicker.data();
                    var bsYear = datePickerData.bsYear;
                    var bsMonth = datePickerData.bsMonth;
                    var preDate = datePickerData.bsDate;
                    var bsDate = $(this).data("date");
                    var weekDay = $(this).data("weekday");
                    var dateText = calenderFunctions.bsDateFormat(datePickerPlugin.options.dateFormat, bsYear, bsMonth, bsDate, weekDay);
                    $element.val(dateText);
                    datePickerPlugin.setCalenderDate($nepaliDatePicker, bsYear, bsMonth, bsDate);
                    datePickerPlugin.renderMonthCalender($nepaliDatePicker);

                    datePickerPlugin.eventFire($element, $nepaliDatePicker, "select");
                    if (preDate != bsDate) {
                        datePickerPlugin.eventFire($element, $nepaliDatePicker, "dateChange");
                    }

                    if (datePickerPlugin.options.closeOnDateSelect) {
                        $nepaliDatePicker.hide();
                    } else {
                        $nepaliDatePicker.show();
                    }
                });

                $nepaliDatePicker.on("click", ".drop-down-content li", function () {
                    var $dropDown = $(this).parents(".drop-down-content");
                    $dropDown.data("value", $(this).data("value"));
                    $dropDown.attr("data-value", $(this).data("value"));

                    var preCalenderData = {
                        "bsYear": $nepaliDatePicker.data().bsYear,
                        "bsMonth": $nepaliDatePicker.data().bsMonth,
                        "bsDate": $nepaliDatePicker.data().bsDate
                    };
                    var bsMonth = $nepaliDatePicker.find(".month-drop-down").data("value");
                    var bsYear = $nepaliDatePicker.find(".year-drop-down").data("value");
                    var bsDate = preCalenderData.bsDate;
                    datePickerPlugin.setCalenderDate($nepaliDatePicker, bsYear, bsMonth, bsDate);
                    datePickerPlugin.renderMonthCalender($nepaliDatePicker);
                    var calenderData = $nepaliDatePicker.data();
                    datePickerPlugin.triggerChangeEvent($element, $nepaliDatePicker, preCalenderData);
                    $nepaliDatePicker.show();
                });
            },
            triggerChangeEvent: function ($element, $nepaliDatePicker, preCalenderData) {
                var calenderData = $nepaliDatePicker.data();
                if (preCalenderData.bsYear != calenderData.bsYear) {
                    datePickerPlugin.eventFire($element, $nepaliDatePicker, "yearChange");
                }

                if (preCalenderData.bsMonth != calenderData.bsMonth) {
                    datePickerPlugin.eventFire($element, $nepaliDatePicker, "monthChange");
                }

                if (preCalenderData.bsDate != calenderData.bsDate) {
                    datePickerPlugin.eventFire($element, $nepaliDatePicker, "dateChange");
                }
            },
            eventFire: function ($element, $nepaliDatePicker, eventType) {
                switch (eventType) {
                    case "generate":
                        $element.trigger({
                            type: eventType,
                            message: 'Nepali date picker initialize',
                            datePickerData: $nepaliDatePicker.data(),
                            time: new Date()
                        });
                        break;
                    case "show":
                        $element.trigger({
                            type: eventType,
                            message: 'Show nepali date picker',
                            datePickerData: $nepaliDatePicker.data(),
                            time: new Date()
                        });
                        break;
                    case "close":
                        $element.trigger({
                            type: eventType,
                            message: 'close nepali date picker',
                            datePickerData: $nepaliDatePicker.data(),
                            time: new Date()
                        });
                        break;
                    case "select" :
                        $element.trigger({
                            type: eventType,
                            message: 'Select date',
                            datePickerData: $nepaliDatePicker.data(),
                            time: new Date()
                        });
                        break;
                    case "dateChange" :
                        $element.trigger({
                            type: eventType,
                            message: 'Change date',
                            datePickerData: $nepaliDatePicker.data(),
                            time: new Date()
                        });
                        break;
                    case "monthChange" :
                        $element.trigger({
                            type: eventType,
                            message: 'Change month',
                            datePickerData: $nepaliDatePicker.data(),
                            time: new Date()
                        });
                        break;
                    case "yearChange":
                        $element.trigger({
                            type: eventType,
                            message: 'Change year',
                            datePickerData: $nepaliDatePicker.data(),
                            time: new Date()
                        });
                        break;
                    default :
                        break;
                }
            },
            setCalenderDate: function ($nepaliDatePicker, bsYear, bsMonth, BsDate) {
                $nepaliDatePicker.data(calenderFunctions.getBsMonthInfoByBsDate(bsYear, bsMonth, BsDate, datePickerPlugin.options.dateFormat));
            },
            renderMonthCalender: function ($nepaliDatePicker) {
                $nepaliDatePicker.find(".calender-wrapper").remove();
                $nepaliDatePicker.append(datePickerPlugin.getCalender($nepaliDatePicker)).hide();
            },
            getCalender: function ($nepaliDatePicker) {
                var calenderWrapper = $('<div class="calender-wrapper">');
                calenderWrapper.append(datePickerPlugin.getCalenderController($nepaliDatePicker));
                var calenderTable = $("<table>");
                calenderTable.append(datePickerPlugin.getCalenderHeader());
                calenderTable.append(datePickerPlugin.getCalenderBody($nepaliDatePicker));
                calenderWrapper.append(calenderTable);

                return calenderWrapper;
            },
            getCalenderController: function ($nepaliDatePicker) {
                var calenderController = $("<div class='calender-controller'>");
                calenderController.append('<a href="javascript:void(0);" class="prev-btn icon" title="prev"></a>');
                calenderController.append('<a href="javascript:void(0);" class="today-btn icon" title=""></a>');
                calenderController.append(datePickerPlugin.getMonthDropOption($nepaliDatePicker));
                calenderController.append(datePickerPlugin.getYearDropOption($nepaliDatePicker));
                calenderController.append('<a href="javascript:void(0);" class="next-btn icon" title="next"></a>');

                return calenderController;
            },
            getMonthDropOption: function ($nepaliDatePicker) {
                var datePickerData = $nepaliDatePicker.data();
                var $monthSpan = $('<div class="current-month-txt">');
                $monthSpan.text(calenderData.bsMonths[datePickerData.bsMonth]);
                $monthSpan.append('<i class="icon icon-drop-down">');

                var data = [];
                for (var i = 0; i < 12; i++) {
                    data.push({
                        "label": calenderData.bsMonths[i],
                        "value": i
                    });
                }

                var $monthDropOption = datePickerPlugin.getCustomSelectOption(data, datePickerData.bsMonth).addClass("month-drop-down");
                $monthSpan.append($monthDropOption);

                return $monthSpan;
            },
            getYearDropOption: function ($nepaliDatePicker) {
                var datePickerData = $nepaliDatePicker.data();
                var $yearSpan = $('<div class="current-year-txt">');
                $yearSpan.text(calenderFunctions.getNepaliNumber(datePickerData.bsYear));
                $yearSpan.append('<i class="icon icon-drop-down">');
                var data = [];
                for (var i = datePickerPlugin.options.yearStart; i <= datePickerPlugin.options.yearEnd; i++) {
                    data.push({
                        "label": calenderFunctions.getNepaliNumber(i),
                        "value": i
                    });
                }

                var $yearDropOption = datePickerPlugin.getCustomSelectOption(data, datePickerData.bsYear).addClass("year-drop-down");
                $yearSpan.append($yearDropOption);

                return $yearSpan;
            },
            getCustomSelectOption: function (datas, activeValue) {
                var $dropDown = $('<div class="drop-down-content" data-value="' + activeValue + '">');
                var $dropDownWrapper = $('<div class="option-wrapper">');
                var $ul = $('<ul>');
                $.each(datas, function (index, data) {
                    $ul.append('<li data-value="' + data.value + '">' + data.label + '</li>');
                });

                $dropDownWrapper.append($ul);
                $ul.find('li[data-value="' + activeValue + '"]').addClass("active");
                $dropDown.append($dropDownWrapper);

                return $dropDown;
            },
            getCalenderHeader: function () {
                var calenderHeader = $("<thead>");
                var tableRow = $("<tr>");
                for (var i = 0; i < 7; i++) {
                    tableRow.append("<td>" + calenderData.bsDays[i] + "</td>");
                }

                calenderHeader.append(tableRow);
                return calenderHeader;
            },
            getCalenderBody: function ($nepaliDatePicker) {
                var datePickerData = $nepaliDatePicker.data();
                var weekCoverInMonth = Math.ceil((datePickerData.bsMonthFirstAdDate.getDay() + datePickerData.bsMonthDays) / 7);
                var preMonth = (datePickerData.bsMonth - 1 != -1) ? datePickerData.bsMonth - 1 : 11;
                var preYear = preMonth == 11 ? datePickerData.bsYear - 1 : datePickerData.bsYear;
                var preMonthDays = calenderFunctions.getBsMonthDays(preYear, preMonth);
                var minBsDate = null;
                var maxBsDate = null;

                if (datePickerPlugin.options.minDate !== null) {
                    minBsDate = calenderFunctions.parseFormattedBsDate(datePickerPlugin.options.dateFormat, datePickerPlugin.options.minDate);
                }
                if (datePickerPlugin.options.maxDate !== null) {
                    maxBsDate = calenderFunctions.parseFormattedBsDate(datePickerPlugin.options.dateFormat, datePickerPlugin.options.maxDate);
                }
                var calenderBody = $("<tbody>");
                for (var i = 0; i < weekCoverInMonth; i++) {
                    var tableRow = $("<tr>");
                    for (var k = 1; k <= 7; k++) {
                        var calenderDate = (i * 7 ) + k - datePickerData.bsMonthFirstAdDate.getDay();
                        var isCurrentMonthDate = true;
                        if (calenderDate <= 0) {
                            calenderDate = preMonthDays + calenderDate;
                            isCurrentMonthDate = false;
                        } else if (calenderDate > datePickerData.bsMonthDays) {
                            calenderDate = calenderDate - datePickerData.bsMonthDays;
                            isCurrentMonthDate = false;
                        }

                        if (isCurrentMonthDate) {
                            var $td = $('<td class="current-month-date" data-date="' + calenderDate + '" data-weekDay="' + (k - 1) + '">' +
                                calenderFunctions.getNepaliNumber(calenderDate) + '</td>');
                            if (calenderDate == datePickerData.bsDate) {
                                $td.addClass("active");
                            }
                            datePickerPlugin.disableIfOutOfRange($td, datePickerData, minBsDate, maxBsDate, calenderDate);
                            tableRow.append($td);
                        } else {
                            tableRow.append('<td class="other-month-date">' + calenderFunctions.getNepaliNumber(calenderDate) + '</td>');
                        }
                    }


                    calenderBody.append(tableRow);
                }


                return calenderBody;
            },
            disableIfOutOfRange: function ($td, datePickerData, minBsDate, maxBsDate, calenderDate) {
                if (minBsDate !== null) {
                    if (datePickerData.bsYear < minBsDate.bsYear) {
                        $td.addClass("disable");
                    } else if (datePickerData.bsYear == minBsDate.bsYear && datePickerData.bsMonth < minBsDate.bsMonth) {
                        $td.addClass("disable");
                    } else if (datePickerData.bsYear == minBsDate.bsYear && datePickerData.bsMonth == minBsDate.bsMonth && calenderDate < minBsDate.bsDate) {
                        $td.addClass("disable");
                    }
                }

                if (maxBsDate !== null) {
                    if (datePickerData.bsYear > maxBsDate.bsYear) {
                        $td.addClass("disable");
                    } else if (datePickerData.bsYear == maxBsDate.bsYear && datePickerData.bsMonth > maxBsDate.bsMonth) {
                        $td.addClass("disable");
                    } else if (datePickerData.bsYear == maxBsDate.bsYear && datePickerData.bsMonth == maxBsDate.bsMonth && calenderDate > maxBsDate.bsDate) {
                        $td.addClass("disable");
                    }
                }

                return $td;
            },
            renderCurrentMonthCalender: function ($nepaliDatePicker) {
                var currentDate = new Date();
                var currentBsDate = calenderFunctions.getBsDateByAdDate(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
                var bsYear = currentBsDate.bsYear;
                var bsMonth = currentBsDate.bsMonth;
                var bsDate = currentBsDate.bsDate;
                datePickerPlugin.setCalenderDate($nepaliDatePicker, bsYear, bsMonth, bsDate);
                datePickerPlugin.renderMonthCalender($nepaliDatePicker);
            },
            renderPreviousMonthCalender: function ($nepaliDatePicker) {
                var datePickerData = $nepaliDatePicker.data();
                var prevMonth = (datePickerData.bsMonth - 1 >= 0) ? datePickerData.bsMonth - 1 : 11;
                var prevYear = (prevMonth != 11) ? datePickerData.bsYear : datePickerData.bsYear - 1;
                var prevDate = datePickerData.bsDate;
                if (prevYear < datePickerPlugin.options.yearStart || prevYear > datePickerPlugin.options.yearEnd) {
                    return null;
                }
                datePickerPlugin.setCalenderDate($nepaliDatePicker, prevYear, prevMonth, prevDate);
                datePickerPlugin.renderMonthCalender($nepaliDatePicker);
            },
            renderNextMonthCalender: function ($nepaliDatePicker) {
                var datePickerData = $nepaliDatePicker.data();
                var nextMonth = (datePickerData.bsMonth + 1 <= 11) ? datePickerData.bsMonth + 1 : 0;
                var nextYear = (nextMonth !== 0) ? datePickerData.bsYear : datePickerData.bsYear + 1;
                var nextDate = datePickerData.bsDate;
                if (nextYear < datePickerPlugin.options.yearStart || nextYear > datePickerPlugin.options.yearEnd) {
                    return null;
                }
                datePickerPlugin.setCalenderDate($nepaliDatePicker, nextYear, nextMonth, nextDate);
                datePickerPlugin.renderMonthCalender($nepaliDatePicker);
            },
            renderFormattedSpecificDateCalender: function ($nepaliDatePicker, dateFormat, dateFormattedText) {
                var datePickerDate = calenderFunctions.parseFormattedBsDate(dateFormat, dateFormattedText);
                datePickerPlugin.setCalenderDate($nepaliDatePicker, datePickerDate.bsYear, datePickerDate.bsMonth, datePickerDate.bsDate);
                datePickerPlugin.renderMonthCalender($nepaliDatePicker);
            }
        };

        this.each(function () {
            var $element = $(this);
            datePickerPlugin.init($element);
        });

        datePickerPlugin.addCommonEventHandler();
        return this;
    };
}(jQuery, calenderFunctions));
