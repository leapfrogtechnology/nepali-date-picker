describe('Nepali Date Picker disabled input', function () {
  it('ignores a day click when its input is disabled while open', function () {
    var $input = $('<input>').val('२०८३-०१-०५').appendTo('body');
    var onDateSelect = jasmine.createSpy('dateSelect');
    $input.nepaliDatePicker({ dateFormat: '%y-%m-%d' }).on('dateSelect', onDateSelect);
    var $picker = $('.nepali-date-picker').last();

    try {
      $input.trigger('click');
      var $day = $picker.find('.current-month-date[data-date="12"]');
      expect($day.length).toBe(1);

      $input.prop('disabled', true);
      $day.trigger('click');
      expect($input.val()).toBe('२०८३-०१-०५');
      expect(onDateSelect).not.toHaveBeenCalled();

      $input.prop('disabled', false);
      $day.trigger('click');
      expect($input.val()).toBe('२०८३-१-१२');
      expect(onDateSelect.calls.count()).toBe(1);
    } finally {
      $picker.remove();
      $input.remove();
    }
  });
});
