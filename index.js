var maxNumber;
var problemIndex = 0;
var countOfCorrectAnswers = 0;
var numberOfProblemsToDisplay = 10;

function generateRandom(maximumNumber) {
	return Math.ceil(Math.random() * maximumNumber);
}

function generateAdditionProblem() {
	problemIndex++;
	var nr1 = generateRandom(maxNumber);
	var nr2 = generateRandom(maxNumber);
	var correctAnswer = nr1 + nr2;
	$(".question" ).html(nr1 + ' + ' + nr2 + ' = ?');

	var randomAnswer = 0;
	var generatedAnswers = [];
	do {
		randomAnswer = generateRandom(maxNumber * 2);
		if (generatedAnswers.indexOf(randomAnswer) == -1 && randomAnswer != correctAnswer) {
			generatedAnswers.push(randomAnswer);
		}
	} while (generatedAnswers.length < 3);

	$('.answers .btn-1').html(generatedAnswers[0]);
	$('.answers .btn-2').html(generatedAnswers[1]);
	$('.answers .btn-3').html(generatedAnswers[2]);

	var randomPosition = generateRandom(3);
	$('.answers .btn-' + randomPosition).html(correctAnswer);
	$('.answers .btn-' + randomPosition).addClass('correctAnswer');


	var randomImageIndex = generateRandom(18);
	$('.funnyImage img').attr('src', './images/' + randomImageIndex + '.jpg');
}

function onSelectAnswer(element) {
	if ($(element).hasClass('correctAnswer') == true) {
		countOfCorrectAnswers++
	}

	if (problemIndex < numberOfProblemsToDisplay) {
		generateAdditionProblem();	
	} else {
		displayQuizResults();
	}
}

function displayQuizResults() {
	$('#etape2').hide();
	$('#etape3').show();
	
	if (countOfCorrectAnswers == numberOfProblemsToDisplay) {
		// $('#etape3 .grade').html('bravo!');
		// $('#etape3 .bravo').show();
	}
	else if (countOfCorrectAnswers > numberOfProblemsToDisplay / 2) {
		// $('#etape3 .grade').html('congrats!');
		// $('#etape3 .super').show();
	} else {
		// $('#etape3 .grade').html('try again!');
	}
}


$(document).ready(function(){
	$( "#select_no" ).slider({
		range: "max",
		min: 2,
		max: 10,
		value: 1,
		create: function() {
			$( "#custom-handle" ).text( $( this ).slider( "value" ) );
		},
		slide: function( event, ui ) {
			$( "#custom-handle" ).text( ui.value );
		}
	});

	$('.buttons_op .button').on('click', function() {
		$(this).toggleClass('pressed');
	});

	$('.begin .button').on('click', function() {
		if ($(".button.pressed").length > 0) {
			$('#etape1').hide();
			$('#etape2').show();
			maxNumber = $( "#select_no" ).slider("value");
			generateAdditionProblem();
		} else { 
			alert('SVP sélecte au mois une opération!');
		}
	});
});