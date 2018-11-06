"use strict";

var mtd280 = mtd280 || {};

mtd280.module = (function($) {

    // private  
	let canvas, ctx, width, height, colSize, rowSize, colorswitch, imageButton, videoButton;
	let stoneSwitch = "color";
	var stonesPlaced = [];
	let clear = false;

	for(var k = 0; k<10; k++){ //filling array
		stonesPlaced[k] = [];
		for(var j = 0; j<10; j++){
			stonesPlaced[k][j] = false;
		}
	}
	colorswitch = true;
	const DIMENSION = 9;

	function drawBoard(){

		if(clear == true){
			clearBoard();
		}
		//createBackground();
		ctx.strokeStyle="#000000";

		let i, offsetX, offsetY;
		offsetY = rowSize/2;
		offsetX = colSize/2;

		ctx.beginPath();

		for(i = 0; i< DIMENSION; i++){ //every distance of colsize a line is drawn
			ctx.moveTo(offsetX + colSize*i, offsetY);
			ctx.lineTo(offsetY + colSize*i, height-offsetY);
		}

		for(i = 0; i<DIMENSION; i++){ //horizontal lines
			ctx.moveTo(offsetX,  colSize*i + offsetY);
			ctx.lineTo(width-offsetX , offsetY + colSize*i);
		}

		ctx.strokeStyle="#000000";
		ctx.stroke();
		ctx.closePath();
	}


	function clearBoard(){
		ctx.fillStyle = "#FCD0AB";
		ctx.fillRect(0,0,500,500);

		for(var g = 0; g<10;g++){
			for(var j = 0; j<10; j++){
				stonesPlaced[g][j] = false;
			}
		}
		clear = false;
	}

	function stwitchToVideo(){

		if(stoneSwitch == "image" || stoneSwitch =="color"){
			stoneSwitch = "video";
		}else{
			stoneSwitch = "color";
		}
		clear = true;
		drawBoard();
	}


	function switchToImages(){

		if(stoneSwitch == "image"){
			stoneSwitch = "color";
		}else{
			stoneSwitch = "image";
		}
		clear = true;
		drawBoard();
	}


	function createBackground(){

		var tile = document.createElement('img');
		tile.src = "kermit.jpeg";

		tile.onload = function () {
			var pat = ctx.createPattern(tile,"repeat");
			ctx.fillStyle = pat;
			ctx.rect(0,0,500, 500);
			ctx.fill();
			ctx.fillStyle = 'rgb(0,0,0)';
		};
	}
	function clickHandler(e){ //event provides the coordinates where the click has happened from where we can calc the position

		let x, y;
		x = e.clientX - canvas[0].offsetLeft; //absolute position of mouseclick  -   posistion of the canvas, so we get the position
		y = e.clientY - canvas[0].offsetTop;

		//alert(Math.floor(x/colSize) + ", " + Math.floor(y/rowSize) + stonesPlaced[Math.floor(x/colSize)][ Math.floor(y/rowSize)]);

		if( (stonesPlaced[Math.floor(x/colSize)][ Math.floor(y/rowSize)] == false)){ // if there is no stone where you clicked, then place one
			placeStone(x, y);
		}
	}



	function placeStone(x, y){
		let stoneX, stoneY;

		stoneX = Math.floor((x/colSize)  );
		stoneY =  Math.floor((y/rowSize) );

		if(stoneSwitch == "color"){

			if(colorswitch){
				ctx.fillStyle="#FFFFFF";
				colorswitch = false;
			}else{
				ctx.fillStyle="#000000";
				colorswitch = true;
			}
			//ctx.fillRect(stoneX + colSize*stoneX, stoneY + stoneY*colSize, colSize,rowSize);
			ctx.beginPath();
			ctx.arc(stoneX + colSize*stoneX + colSize/2, stoneY + stoneY*colSize + colSize/2,colSize/2, 0,2*Math.PI);
			ctx.fill();
			stonesPlaced[Math.floor(x/colSize)][ Math.floor(y/rowSize)] = true;


		}else if(stoneSwitch == "image") {

			if(colorswitch){
				drawImage("catcat.png", stoneX, stoneY);
				colorswitch = false;
			}else{
				drawImage("kermit.jpeg", stoneX, stoneY);
				colorswitch = true;
			}
			stonesPlaced[Math.floor(x/colSize)][ Math.floor(y/rowSize)] = true;

		} else if(stoneSwitch == "video"){

			if(colorswitch){
				drawVideo("tenor.gif");
				colorswitch = false;
			}else if(colorswitch){
				drawVideo("duckduck.gif");
				colorswitch = true;
			}
			stonesPlaced[Math.floor(x/colSize)][ Math.floor(y/rowSize)] = true;

		}
	}


	function drawVideo(source, stoneX, stoneY){

		var video = document.createElement('video');
		video.src = source;
		ctx.drawImage(video,  stoneX + colSize*stoneX  , stoneY + stoneY*colSize , colSize, rowSize);

		video.onloadstart = function () {

			alert("we're in");
			ctx.save();
			ctx.beginPath();
			ctx.arc(stoneX + colSize * stoneX + colSize / 2, stoneY + stoneY * colSize + colSize / 2, colSize / 2, 0, 2 * Math.PI, true);
			ctx.closePath();
			ctx.clip();

			update(video, stoneX, stoneY);

			ctx.beginPath();
			ctx.arc(stoneX + colSize * stoneX + colSize / 2, stoneY + stoneY * colSize + colSize / 2, colSize / 2, 0, 2 * Math.PI, true);
			ctx.clip();
			ctx.closePath();
			ctx.restore();
		}
	}

	function update(video, stoneX, stoneY){
		ctx.drawImage(video,  stoneX + colSize*stoneX  , stoneY + stoneY*colSize , colSize, rowSize);
		requestAnimationFrame(update); // wait for the browser to be ready to present another animation fram.
	}

	function drawImage(source, stoneX, stoneY){

		var thumbImg = document.createElement('img');
		thumbImg.src = source;

		thumbImg.onload = function() {
			ctx.save();
			ctx.beginPath();
			ctx.arc(stoneX + colSize * stoneX + colSize / 2, stoneY + stoneY * colSize + colSize / 2, colSize / 2, 0, 2 * Math.PI, true);
			ctx.closePath();
			ctx.clip();
			//ctx.scale(colSize, rowSize);
			ctx.drawImage(thumbImg, stoneX + colSize*stoneX  , stoneY + stoneY*colSize , colSize, rowSize);

			ctx.beginPath();
			ctx.arc(stoneX + colSize * stoneX + colSize / 2, stoneY + stoneY * colSize + colSize / 2, colSize / 2, 0, 2 * Math.PI, true);
			ctx.clip();
			ctx.closePath();
			ctx.restore();
		}
		thumbImg.src = source;
	}


  //------------------//    	
	function init() {
  //------------------//

		//initializing variables
		canvas = $('#canvas');
		ctx = canvas[0].getContext('2d');
		width = canvas.prop('width'); //alternative to [0]
		height = canvas.prop('height'); //alternative to [0]
		imageButton = $('#imageButton');
		videoButton = $('#videoButton');

		colSize = width/DIMENSION;
		rowSize = width/DIMENSION;

		canvas.click(clickHandler);
		clearBoard();
		drawBoard();

	};


	$(document).ready(function () {

		$("#imageButton").on('click', function () {
			switchToImages();
		});

		$("#videoButton").on('click', function () {
			stwitchToVideo();
		});
	});

	$(document).ready(init);
	return {};

}($));

