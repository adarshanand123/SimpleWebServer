var content = [
	"this is nothing but lion the king of Jungle",
	"this is somethig,I dont know",
	"this is beautiful saturn",
	"this is a vivid grassland",
	"And final one is night scene"
];
var imageArray = ["image1","image2","image3","image4","image5"];

var currentIndex = 0;
var imgSource = "Sliderimage/";
var currentSliderImage,
	nextSliderImage,
	caption;
$(document).ready(
	function(){
		currentSliderImage = $("#img1");
		nextSliderImage = $('#img4');
		caption = $("#caption");
		setInterval(function(){setnextImage("right");},2000);
		$("#img2").click(function() {setnextImage("left");})
	
		$("#img3").click(function() {setnextImage("right");})
		
	}
);

function setnextImage(direction) {

	var tempSliderImage,
		tempCaption;
	var temp = getnextImage(direction);
		tempSliderImage = temp[0];
		tempCaption = temp[1];
	var finalImageSurce = `${imgSource}${tempSliderImage}.jpg`;
	nextSliderImage.attr("src",finalImageSurce);
	currentSliderImage.fadeOut();
	nextSliderImage.fadeIn();
	tempCaption = `<h2>Slide${currentIndex}</h2><p>${tempCaption}</p>`
	caption.html(tempCaption);
	tempSliderImage = nextSliderImage;
	nextSliderImage = currentSliderImage;
	currentSliderImage = tempSliderImage;
}

function getnextImage(direction){
	
	if(direction == "right"){ currentIndex = currentIndex<4?currentIndex+1:0;} else {currentIndex = currentIndex>0?currentIndex-1:4;}
	return [imageArray[currentIndex],content[currentIndex]];
}