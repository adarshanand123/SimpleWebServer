var objectInput = {q1:"q1b",q2:"q2a",q3:"q3d",q4:"q4b",q5:"q5d"};
var arrInput = Object.keys(objectInput);
var sizeInput = arrInput.length;

function showAnswer(event){
	var arrayOutput = $('input:checked');
	var sizeOutput = arrayOutput.length;
	if(sizeOutput != sizeInput) {
		$('#result').css("visibility","visible");
		$('#result').html("<h3>attempt all answers.</h3>");
		return;
	}
	var count =0;
	for(var i = 0; i < sizeInput; i++) {
		var tempObject = arrayOutput[i];
		if(tempObject.value == objectInput[arrInput[i]]) {
			count++;
		}
	}
	$('#result').css("visibility","visible");
	$('#result').html("<h3>" + count+ " out of "+sizeInput+" answers  	are correct.</h3>")
} 

$(document).ready(
	function() {
		$("#form").submit(
				showAnswer
		);
	}
);

