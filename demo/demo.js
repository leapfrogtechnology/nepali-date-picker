$(document).ready(function () {
    $(".bod-picker").nepaliDatePicker({
        dateFormat: "%D, %M %d, %y",
        closeOnDateSelect: true
    });

    var currentDate = new Date();
    var currentNepaliDate = calendarFunctions.getBsDateByAdDate(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
    var formatedNepaliDate = calendarFunctions.bsDateFormat("%y-%m-%d", currentNepaliDate.bsYear, currentNepaliDate.bsMonth, currentNepaliDate.bsDate);

    $("#from-picker").nepaliDatePicker({
        dateFormat: "%y-%m-%d",
        closeOnDateSelect: true,
        minDate: "२०७०-१-२०",
        maxDate: formatedNepaliDate
    });

    $("#to-picker").val(formatedNepaliDate);
    $("#to-picker").nepaliDatePicker({
        dateFormat: "%y-%m-%d",
        closeOnDateSelect: true,
        minDate: "२०७०-१-२०",
        maxDate: formatedNepaliDate
    });

    $("#date-picker").nepaliDatePicker({
        dateFormat: "%y-%m-%d",
        closeOnDateSelect: true
    });

    function eventLog(event) {
        var datePickerData = event.datePickerData;
        var outputData = {
            "type": event.type,
            "message": event.message,
            "datePickerData": datePickerData
        };

        var output = '<p><code>&blacktriangleright; ' + JSON.stringify(outputData) + '</code></p>';
        $('.output').append(output);
        $('.output').scrollTop($('.output').prop("scrollHeight"));
    }

    $("#date-picker").on("show", function (event) {
        var output = '<p><code>&blacktriangleright; Show event trigger</code></p>';
        $('.output').append(output);
    });

    $("#date-picker").on("yearChange", function (event) {
        eventLog(event);
    });

    $("#date-picker").on("monthChange", function (event) {
        eventLog(event);
    });

    $("#date-picker").on("dateChange", function (event) {
        eventLog(event);
    });

    $("#date-picker").on("dateSelect", function (event) {
        eventLog(event);
    });

    $("#clear-bth").on("click", function (event) {
        $(".bod-picker").val('');
    });

    function log(text, isOutput) {
        var output = '<p><code class="' + (isOutput ? 'command-result' : 'command-text') + '">&blacktriangleright; ' + (isOutput ? JSON.stringify(text) : text) + '</code></p>';
        $('.preview').append(output);
    }

    function preview() {
        log('calendarFunctions.getNepaliNumber(125);', false);
        log(calendarFunctions.getNepaliNumber(125), true);

        log('calendarFunctions.getNumberByNepaliNumber("१२५");', false);
        log(calendarFunctions.getNumberByNepaliNumber("१२५"), true);

        log('calendarFunctions.getAdDateByBsDate(2074,10, 15);', false);
        log(calendarFunctions.getAdDateByBsDate(2074, 10, 15), true);

        log('calendarFunctions.getBsMonthDays(2074, 10);', false);
        log(calendarFunctions.getBsMonthDays(2074, 10), true);

        log('calendarFunctions.getBsDateByAdDate(2017, 2, 15);', false);
        log(calendarFunctions.getBsDateByAdDate(2017, 2, 15), true);

        log('calendarFunctions.getBsYearByAdDate(2017, 2, 15);', false);
        log(calendarFunctions.getBsYearByAdDate(2017, 2, 15), true);

        log('calendarFunctions.getBsMonthByAdDate(2017, 2, 15);', false);
        log(calendarFunctions.getBsMonthByAdDate(2017, 2, 15), true);

        log('calendarFunctions.bsDateFormat("%y %M, %d %D", 2074, 11, 9);', false);
        log(calendarFunctions.bsDateFormat("%y %M, %d %D", 2074, 11, 9), true);

        log('calendarFunctions.parseFormattedBsDate("%y %M, %d %D", "२०७४ चैत, ९ बुध");', false);
        log(calendarFunctions.parseFormattedBsDate("%y %M, %d %D", "२०७४ चैत, ९ बुध"), true);
    }

    preview();
});
