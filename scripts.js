var interval;
var currentTime;
var firstCardClick = null;
var accurateClicks = 0;
var clickAttempts = 0;
var accuracy = 0;

function tick() {
	console.log(tick);
	currentTime++;
	('#time').innerHTML(currentTime);


};

$(function () {
	var parent = $('#game');
	var divs = parent.children();
	while(divs.length){
		parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
	}
});

function accuracyScore() {
		
	var accuracy = (accurateClicks / clickAttempts) * 100;
		
	accuracy = accuracy.toFixed(2);
		
	return accuracy + '%';		
};


$('#reset').on('click', function(){

	$('.front').removeClass('card-hidden');

	$('.back').removeClass('card-hidden');

	accurateClicks = 0;

	clickAttempts = 0;
});



function cardClick(cardNumber){
	
	var backId = "#cb" + cardNumber;

	var frontId =  '#cf' + cardNumber;

	var currentSrc = $(frontId).attr('src');
	

	$(backId).addClass('card-hidden');

	clickAttempts++;

	$('#tries').html(' ' + clickAttempts);

	if (firstCardClick == null){

		firstCardClick = currentSrc;
	

	} else {

		if(firstCardClick === currentSrc){

			accurateClicks += 2;
			
			setTimeout(function() {

				$("[src='" + currentSrc + "']").parent().children().addClass('card-hidden');

				$("[src='" + firstCardClick + "']").parent().children().addClass('card-hidden');

			}, 400);

			if (accurateClicks == 18) {
				alert('You saved time and space!!!!!!');
			
			}
	
			firstCardClick = null;
		
		} else {

			setTimeout(function(){

				$("[src='" + firstCardClick + "']").parent().children().removeClass('card-hidden');

				$("[src='" + currentSrc + "']").parent().children().removeClass('card-hidden');

				firstCardClick = null;

			}, 800);
		
		}


		$("#accuracy").html(' ' + accuracyScore());	

		
	}

};