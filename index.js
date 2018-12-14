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
	$('#step2 .question_no').html(problemIndex + '/' + numberOfProblemsToDisplay);

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
	$('.answers .button').removeClass('correctAnswer');
	$('.answers .btn-' + randomPosition).addClass('correctAnswer');


	var randomImageIndex = generateRandom(10);
	$('.funnyImage img').attr('src', './images/problems/' + randomImageIndex + '.jpg');
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
	$('#step2').hide();
	$('#step3').show();
	$('#step3 .score span').html(countOfCorrectAnswers + '/' + numberOfProblemsToDisplay);
	if (countOfCorrectAnswers == numberOfProblemsToDisplay) {
		 $('#step3 .grade').html('Excellent!');
		 $('#step3 .super').show();
	} else if (countOfCorrectAnswers > (numberOfProblemsToDisplay / 2)) {
		 $('#step3 .grade').html('Félicitation!');
		 $('#step3 .bravo').show();
	} else {
		 $('#step3 .grade').html('Pas tres bien!');
		 $('#step3 .failed').show();
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
			$('#step1').hide();
			$('#step2').show();
            $('#step3').hide();
			maxNumber = $( "#select_no" ).slider("value");
			generateAdditionProblem();
		} else { 
			alert('SVP sélecte au mois une opération!');
		}
	});
});