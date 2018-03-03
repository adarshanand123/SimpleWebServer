//Glitches: 1.Sticker is not properly dragged and,its starting point get placed at mouse pointer position.//
//			2.When you place sticker out of browser window,it gets lost.
//			3.When you increase size of sticker,then on dragging,it is losing opacity.
//			4.It cannot be increased in size from anydirection.
//			5.It is not working properly on cellphone.
var container;
function getCordinates(){
	var arrCor = [];
	arrCor[0] = event.clientX;
	arrCor[1] = event.clientY;
	return arrCor;
}

function updateLocation(){
	var arr = [],corX,corY;
	arr =getCordinates();
	corX = arr[0];
	corY = arr[1];
	$(container).css({"left": corX,"top":corY});
}

function dragging(event) {
	$(event.target.id).hide();	
	container = "#"+event.target.id;		//Instead of dragging event,I thought  of using ondragstart event,but I found problem that container 
}									//became hidden,once I start dragging,and I lost even the copy of dragging.If I had not used drag(dragging function) event
									//I would not have done this project.Thanks to God.

function allowDrop(event) {
	event.preventDefault();				//it must be done,else by default,you cannot drop anywhere.This event is fired when that 								
}										//'anywhere'is a valid drop point and I think,every place is valid drop point.But this will not 
										//be fired for drop point,else it will be fired only if ondrop listener is binded to that area.

function drop(event) {
	updateLocation();				//I thought that if I would write event.preventDefault(); then,drop would not take place,but 
	$(container).show();			//this is not the case.Writing event.preventDefault(); has no effect here.
}

var index = 1;
var color = ['pink','DeepSkyBlue','BurlyWood'];
var top = ['100px','120px','140px'];
var left = ['100px','120px','140px'];

$(document).ready(function(){
	$('#addNotes').click(function(){
		var text = 	`<textarea  draggable="true"   id="index${index}"  ondrag="dragging(event)"  style = "height:200px;width:200px;border:solid;position:absolute;"></textarea>`;
		$('body').append(text);
		var selector = `#index${index}`;
		$(selector).css({'background-color':color[index%3],top:top[index%3],left:left[index%3]});
		index++;
	});
});

