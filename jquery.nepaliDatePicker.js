/*
 * @fileOverview NepaliDatePicker - jQuery Plugin
 * @version 1.0.0
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

    $.extend(calenderFunctions, {
        getNepaliNumber: function (number) {
            var prefixNum = Math.floor(number / 10);
            var suffixNum = number % 10;
            if (prefixNum != 0) {
                return calenderFunctions.getNepaliNumber(prefixNum) + calenderData.nepaliNumbers[suffixNum];
            } else {
                return calenderData.nepaliNumbers[suffixNum];
            }
        },
        getBsMonthInfoByBsDate: function (bsYear, bsMonth, bsDate, dateFormatPattern) {
            if (bsYear < calenderData.minBsYear || bsYear > calenderData.maxBsYear) {
                return null;
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
                if (monthIndex <= bsMonth) {
                    daysNumFromMinBsYear += calenderFunctions.getMonthDaysNumFormMinBsYear(monthIndex, diffYears);
                } else if (diffYears > 0) {
                    daysNumFromMinBsYear += calenderFunctions.getMonthDaysNumFormMinBsYear(monthIndex, diffYears - 1);
                }
            }

            return daysNumFromMinBsYear += bsDate;
        },
        getMonthDaysNumFormMinBsYear: function (bsMonth, diffYears) {
            var yearCount = 0;
            var monthDaysFromMinBsYear = 0;
            var preBsMonth = (bsMonth - 1 != -1) ? bsMonth - 1 : 11;
            if (diffYears == 0 && preBsMonth == 11) {
                return 0;
            }

            if (preBsMonth == 11) {
                diffYears -= 1;
            }

            var bsMonthData = calenderData.extractedBsMonthData[preBsMonth];
            for (var i = 0; i < bsMonthData.length; i++) {
                if (bsMonthData[i] == 0) {
                    continue;
                }

                var bsMonthUpperDaysIndex = i % 2;
                if (diffYears >= yearCount + bsMonthData[i]) {
                    yearCount += bsMonthData[i];
                    monthDaysFromMinBsYear += calenderData.bsMonthUpperDays[preBsMonth][bsMonthUpperDaysIndex] * bsMonthData[i];
                } else {
                    monthDaysFromMinBsYear += calenderData.bsMonthUpperDays[preBsMonth][bsMonthUpperDaysIndex] * (diffYears - yearCount + 1);
                    yearCount = diffYears;
                    break;
                }
            }

            return monthDaysFromMinBsYear;
        },
        getBsMonthDays: function (bsYear, bsMonth) {
            var yearCount = 0;
            var diffYears = bsYear - calenderData.minBsYear;
            var bsMonthData = calenderData.extractedBsMonthData[bsMonth];
            for (var i = 0; i < bsMonthData.length; i++) {
                if (bsMonthData[i] == 0) {
                    continue;
                }

                var bsMonthUpperDaysIndex = i % 2;
                yearCount += bsMonthData[i];
                if (diffYears <= yearCount) {
                    return calenderData.bsMonthUpperDays[bsMonth][bsMonthUpperDaysIndex];
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
                bsMonth = (bsMonth != 0) ? bsMonth - 1 : 11;
                var bsMonthDays = calenderFunctions.getBsMonthDays(bsYear, bsMonth);
                bsDate = bsMonthDays - (bsMonthFirstAdDate.getDate() - adDate) + 1;
            } else {
                bsDate = adDate - bsMonthFirstAdDate.getDate() + 1;
            }

            return {
                bsYear: bsYear,
                bsMonth: bsMonth,
                bsDate: bsDate
            }
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
            formattedDate = formattedDate.replace(/%m/g, bsMonth);
            formattedDate = formattedDate.replace(/%M/g, calenderData.bsMonths[bsMonth]);
            formattedDate = formattedDate.replace(/%D/g, calenderData.bsDays[day]);
            return formattedDate;
        }
    });

    $.fn.nepaliDatePicker = function (options) {
        var datePickerPlugin = {
            options: $.extend({
                dateFormat: "%D, %M %d, %y",
                closeOnDateSelect: true,
                defaultDate: "",
                minDate: "%D, %M %d, %y",
                maxDate: "%D, %M %d, %y",
                yearStart: calenderData.minBsYear,
                yearEnd: calenderData.maxBsYear
            }, options),
            init: function ($element) {
                $element.prop("readonly", true);
                var $nepaliDatePicker = $('<div class="nepali-date-picker">');
                $('body').append($nepaliDatePicker);
                datePickerPlugin.renderCurrentMonthCalender($nepaliDatePicker);
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
                    var inputFieldPosition = $(this).position();
                    $nepaliDatePicker.css({
                        "top": inputFieldPosition.top + $(this).outerHeight,
                        "left": inputFieldPosition.left
                    });

                    $nepaliDatePicker.show();
                    datePickerPlugin.eventFire($element, $nepaliDatePicker, "show");
                });

                $element.click(function () {
                    $(".nepali-date-picker").hide();
                    var inputFieldPosition = $(this).position();
                    $nepaliDatePicker.css({
                        "top": inputFieldPosition.top + $(this).outerHeight,
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
                            tableRow.append('<td class="current-month-date ' + (calenderDate == datePickerData.bsDate ? 'active' : '') + '" data-date="' + calenderDate + '" data-weekDay="' + (k - 1) + '">' + calenderFunctions.getNepaliNumber(calenderDate) + '</td>');
                        } else {
                            tableRow.append('<td class="other-month-date">' + calenderFunctions.getNepaliNumber(calenderDate) + '</td>');
                        }
                    }
                    calenderBody.append(tableRow);
                }


                return calenderBody;
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
                var nextYear = (nextMonth != 0) ? datePickerData.bsYear : datePickerData.bsYear + 1;
                var nextDate = datePickerData.bsDate;
                if (nextYear < datePickerPlugin.options.yearStart || nextYear > datePickerPlugin.options.yearEnd) {
                    return null;
                }
                datePickerPlugin.setCalenderDate($nepaliDatePicker, nextYear, nextMonth, nextDate);
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