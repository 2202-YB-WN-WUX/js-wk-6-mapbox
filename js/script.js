//jquery is going to run this whole function
// once the page has loaded
$(function() {
  // looks for the input with the name birthday and attaches the date range picker plugin
  $('input[name="birthday"]').daterangepicker({
    singleDatePicker: true,
    showDropdowns: true,
    minYear: 1901,
    maxYear: parseInt(moment().format('YYYY'),10)
  })
})
;

$(function() {
  $('input[name="daterange"]').daterangepicker({
    showDropdowns: true,
    minYear: 1901,
    maxYear: parseInt(moment().format('YYYY'),10)
  })
})
;
