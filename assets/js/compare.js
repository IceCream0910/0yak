function getParameterByName(name) { name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"); var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search); return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " ")); }


window.onload = function(){
    console.log(getParameterByName('category'));
     if(getParameterByName('category')) {
      if(getParameterByName('category') != 'all') {
        currentCategory=Number(getParameterByName('category'));
        $('.selector-h1').removeClass('active');
        $('.chips__choice .chip').removeClass('chip--active');
        var ele = $('.chips__choice .chip')[currentCategory];
        $(ele).addClass('chip--active');
        var ele_h1 = $('.selector-h1')[currentCategory];
        $(ele_h1).addClass('active');
      } else {
        currentCategory = 0;
      }
    } else {
      currentCategory = 0;
    }
    updatePromise(currentCategory)
  }

  
$(function() {
    //초기 로딩
    $.get('assets/compare.json', function(data) {
        $('#lee-msg').html(data[0][0].msg);
        $('#yun-msg').html(data[0][1].msg);
        $('#sim-msg').html(data[0][2].msg);
        $('#ahn-msg').html(data[0][3].msg);
    });
    //

    $('.selector-h1').on("click", function() {
        moveTo($(this).index());
        updatePromise($(this).index());
        $('.selector-h1').removeClass('active');
    });
    $('.selector-h1').on("click", function() {
        $(this).toggleClass("active");
    });

    $('.chips__choice .chip').on("click", function() {
        moveTo($(this).index());
        updatePromise($(this).index());
        $('.chips__choice .chip').removeClass('chip--active');
        $(this).addClass("chip--active");
    });
    $('.chips__filter .chip').on("click", function() {
        $(this).toggleClass("chip--active");
    });
});

function moveTo(index) {
    $('.selector-container-slider').animate({
        scrollTop: $($('.selector-h1')[index]).offset().top - $('.selector-container-slider').offset().top + 
        $('.selector-container-slider').scrollTop()-90
     })

     $('#chip-mobile').animate({
        scrollLeft: $($('.chip')[index]).offset().left - $('#chip-mobile').offset().left + 
        $('#chip-mobile').scrollLeft()-20
     })
  }

  var dt;
//선택한 카테고리에 따라 후보별 공약 표시
function updatePromise(index) {
    window.history.replaceState(null, null, "?category="+index);
  
    $.get('assets/compare.json', function(data) {
        $('#lee-msg').html(data[index][0].msg);
        $('#yun-msg').html(data[index][1].msg);
        $('#sim-msg').html(data[index][2].msg);
        $('#ahn-msg').html(data[index][3].msg);
    });
  }
  