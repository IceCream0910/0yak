function getParameterByName(name) { name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"); var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search); return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " ")); }

var candidateNum = getParameterByName('num');
var currentCategory ;
var candidateName = '';
var candidateParty = '';
var candidateColor = '';



window.onload = function(){
  console.log(getParameterByName('category'));
   if(getParameterByName('category')) {
    if(getParameterByName('category') != 'all') {
      currentCategory=Number(getParameterByName('category'));
      $('.chips__choice .chip').removeClass('chip--active');
      var ele = $('.chips__choice .chip')[currentCategory+1];
      $(ele).addClass('chip--active');
      updatePromise(currentCategory+1);
    } else {
      currentCategory ='all';
    }
  } else {
    currentCategory ='all';
  }
}


switch(candidateNum) {
    case '1':
        candidateName = '이재명';
        candidateParty = '더불어민주당';
        candidateColor = '#0a529c';
        break;
    case '2':
        candidateName = '윤석열';
        candidateParty = '국민의힘';
        candidateColor = 'rgb(230, 30, 43)';
        break;
    case '3':
        candidateName = '심상정';
        candidateParty = '정의당';
        candidateColor = '#ff9d00';
        break;
    case '4':
        candidateName = '안철수';
        candidateParty = '국민의당';
        candidateColor = '#EA5504';
        break;
}

$.get('candidate/'+candidateNum+'.html', function(data) {
    $('.content').html(data);

  });
  
document.documentElement.style.setProperty('--party-color', candidateColor);
$('#candidate-number').html(candidateNum);
$('#candidate-name').html(candidateName);

let header = document.querySelector(".header");
let headerHeight = header.offsetHeight;

window.onscroll = function () {
  let windowTop = window.scrollY;
  	// 스크롤 세로값이 헤더높이보다 크거나 같으면 
	// 헤더에 클래스 'drop'을 추가한다
  if (windowTop >= headerHeight-50) {
    header.classList.add("drop");
    $('.back-btn').hide();
    $('.candidate-header').hide();
    $('.profile-image').fadeOut();
  } 
  // 아니면 클래스 'drop'을 제거
  else {
    header.classList.remove("drop");
    $('.back-btn').show();
    $('.candidate-header').show();
    $('.profile-image').fadeIn();
  }
};


$(document).scroll(function(){
  updatePos();
});


function updatePos(){
  var scrollPos = $(document).scrollTop()+100;
  if (0 <= scrollPos && $('#profile').position().top + $('#profile').height() > scrollPos) {
    document.getElementsByClassName('tab')[0].classList.add('active');
    document.getElementsByClassName('tab')[1].classList.remove('active');
    document.getElementsByClassName('tab')[2].classList.remove('active');
  } else if ($('#ten-promise').position().top <= scrollPos && $('#ten-promise').position().top + $('#ten-promise').height() > scrollPos) {
    document.getElementsByClassName('tab')[0].classList.remove('active');
    document.getElementsByClassName('tab')[1].classList.add('active');
    document.getElementsByClassName('tab')[2].classList.remove('active');
  } else if ($('#all-promise').position().top <= scrollPos && $('#all-promise').position().top + $('#all-promise').height() > scrollPos) {
    document.getElementsByClassName('tab')[0].classList.remove('active');
    document.getElementsByClassName('tab')[1].classList.remove('active');
    document.getElementsByClassName('tab')[2].classList.add('active');
  } else {
    document.getElementsByClassName('tab')[0].classList.remove('active');
    document.getElementsByClassName('tab')[1].classList.remove('active');
    document.getElementsByClassName('tab')[2].classList.remove('active');
  }
}


function moveTo(id) {
  $('html, body').animate({
    scrollTop: $("#" + id).offset().top-90
  }, 500);
}

function toggleTable() {
  if($('#hidden-table').css('display') == 'none') {
    $('#hidden-table').show();
    $('.expand-btn').html('<ion-icon name="chevron-up-outline"></ion-icon> 접기');
    moveTo('hidden-table');
  } else {
    $('#hidden-table').hide();
    $('.expand-btn').html('<ion-icon name="chevron-down-outline"></ion-icon> 더보기');
    moveTo('profile');
  }
}

//선택한 카테고리에 따라 공약 표시
function updatePromise(index) {
  index--;
  window.history.replaceState(null, null, "?num="+candidateNum+"&category="+index);

  $.get('candidate/promises/'+candidateNum+'.json', function(data) {
    $('#promises-container').html('')
    for (var i = 0; i < Object.keys(data[index]).length; i++) {
      $('#promises-container').append('<div class="cards group-cards" onclick="javascript:openDetail(' + index + ', ' + i + ');"><div class="card-item"><div class="card-info"><h3 class="card-title" style="font-size:18px;">' + data[index][i].title + '</h3> <p class="card-intro">' + data[index][i].content + '</p></div></div></div>')

    }

  });
}



function showAll() {
  // 전체 공약 표시
  $.get('candidate/promises/' + candidateNum + '.json', function(data) {
    $('#promises-container').html('')
    for (var i = 0; i < Object.keys(data).length; i++) {
        for (var j = 0; j < data[i].length; j++) {
            $('#promises-container').append('<div class="cards group-cards" onclick="javascript:openDetail(' + i + ', ' + j + ');"><div class="card-item"><div class="card-info"><h3 class="card-title" style="font-size:18px;">' + data[i][j].title + '</h3> <p class="card-intro">' + data[i][j].content + '</p></div></div></div>')
        }
    }
});
}

function openDetail(i, j) {
  location.href='detail.html?num='+candidateNum+'&category=' + i + '&index=' + j;
}