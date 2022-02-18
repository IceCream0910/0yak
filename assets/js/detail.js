function getParameterByName(name) { name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"); var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search); return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " ")); }

var candidateNum = getParameterByName('num');
var promiseCategory = getParameterByName('category');
var promiseIndex = getParameterByName('index');
var candidateName = '';
var candidateParty = '';
var candidateColor = '';
var fullUrl = '';

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
  
document.documentElement.style.setProperty('--party-color', candidateColor);
$('#candidate-number').html(candidateNum);
$('#candidate-name').html(candidateName);


$.get('candidate/promises/'+candidateNum+'.json', function(data) {
    var promise = data[promiseCategory][promiseIndex];
    document.title = "0YAK - "+candidateName+" 공약 : "+promise.title;
    $('#promise-title').html(promise.title);
    $('#promise-content').html(promise.content);
    $('#promise-image').attr('src', promise.image);
    fullUrl = promise.url;
});

function openFullUrl() {
    window.open(fullUrl, '_blank');
}