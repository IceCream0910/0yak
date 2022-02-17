//선거일 디데이
var today = new Date();
var dday = new Date(2022, 2, 9);
var gap = dday.getTime() - today.getTime();
var result = Math.ceil(gap / (1000 * 60 * 60 * 24));
$('#d-day').html(result);