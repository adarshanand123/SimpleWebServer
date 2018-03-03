$(document).ready(
	function(){
		renderDataContainer();
		bindEventListener();
	}
);
 
function bindEventListener() {
	$('#add').click(function(){add();});
	$('#home').click(function(){home();});
	$('#formAE').submit(function(){submitData();});
	$('#search').keyup(function(){renderDataOnFilter($(this).val());});
	$('#clearMileage').click(function(){clearMileage();});
}

function clearMileage(){
	setLocalStorageData("");
	renderDataContainer();
}

function home(){
	$('#section2').hide();
	$('#section1').show();
}

function add(){
	$('#section1').hide();
	$('#section2').show();
	$("#AE").html("Add");
	$("#submit").attr("data-index","")
}


function edit(index){
	$('#section1').hide();
	$('#section2').show();
	$("#AE").html("Edit");
	var data = getLocalStorageData()[index] || [];
	$('#addEditDate').val(data[0]);
	$('#addEditDistance').val(data[1]);
	$("#submit").attr("data-index",index)
}

function submitData(){
	var arr = [];
	arr[0] = $('#addEditDate').val();
	arr[1] = $('#addEditDistance').val();
	var tempArr = getLocalStorageData() || [];
	var index = $("#submit").attr("data-index");
	if(!index) {
		tempArr.push(arr);
	} else {
		tempArr[index] = arr;
	}
	sortArray(tempArr);
	setLocalStorageData(tempArr);
}

function sortArray(arr) {
	arr.sort(function(a,b){
		if(a[0]<b[0])
			return -1;
		else 
			return 1;
	});
}

function setLocalStorageData(data){
	data = JSON.stringify(data);
	localStorage.setItem("runData",data);
}

function getLocalStorageData(){
	var data = localStorage.getItem("runData");
	data = JSON.parse(data);
	return data;
}

function renderDataContainer(){
	var data = getLocalStorageData();
	if(data && data.length > 0) {
		var template = $('#allData').html();
		var templateFunction = doT.template(template);
		$('#dataContainer').html(templateFunction(data));
		$('.edit').click(function(){edit($(this).attr("data-index"));});
		$('.delete').click(function(){deleteR($(this).attr("data-index"));});
	} else {
		$('#dataContainer').html("<p style='color:red'>You have no logged run.</p>");
	}
}


function deleteR(index){
	if(confirm("Are you sure to delete it?")) {
		var arr = getLocalStorageData();
		arr.splice(index,1);
		setLocalStorageData(arr);
		renderDataContainer();
	}
}

function renderDataOnFilter(value){
	var regexObject = new RegExp(value);
	var tempArr = [];
	var arr = getLocalStorageData();
	for(var i=0;i<arr.length;i++) {
		  if(arr[i][0].match(regexObject)  || arr[i][1].match(regexObject)) {
		  	tempArr.push(arr[i]);
		  }
	}
	var template = $('#allData').html();
	var templateFunction = doT.template(template);
	$('#dataContainer').html(templateFunction(tempArr));
	$('.edit').click(function(){edit($(this).attr("data-index"));});
	$('.delete').click(function(){deleteR($(this).attr("data-index"));});
}