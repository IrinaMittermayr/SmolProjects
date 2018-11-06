/**
 * Created by Irina on 29/03/2018.
 */
"use strict";


mtd280.module = (function($) {




    let canvas, ctx, width, height, colSize, rowSize, colorswitch, imageButton, videoButton;


    let stoneSwitch = "color";
    var stonesPlaced = [];

    for(var k = 0; k<10; k++){ //filling array
        stonesPlaced[k] = [];
        for(var j = 0; j<10; j++){
            stonesPlaced[k][j] = false;
        }
    }

    colorswitch = true;
    const DIMENSION = 9;



    function drawBoard(){

        let i, offsetX, offsetY;

        offsetY = rowSize/2;
        offsetX = colSize/2;

        ctx.beginPath();

        for(i = 0; i< DIMENSION; i++){ //every distannce of colsize a line is drawn
            ctx.moveTo(offsetX + colSize*i, offsetY);
            ctx.lineTo(offsetY + colSize*i, height-offsetY);
        }

        for(i = 0; i<DIMENSION; i++){ //horizontal lines
            ctx.moveTo(offsetX,  colSize*i + offsetY);
            ctx.lineTo(width-offsetX , offsetY + colSize*i);
        }

        ctx.stroke();
        ctx.closePath();
    }


    function stwitchToVideo(){

        if(stoneSwitch == "image" || stoneSwitch =="color"){
            stoneSwitch = "video";
        }else{
            stoneSwitch = "color";
        }
        drawBoard();
    }


    function switchToImages(){

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle="red";
        ctx.fillRect(0,0,canvas.width, canvas.height);

        if(stoneSwitch == "image"){
            stoneSwitch = "color";
        }else{
            stoneSwitch = "image";
        }
        drawBoard();
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
                ctx.fillStyle="#FF0000";
                colorswitch = false;
            }else{
                ctx.fillStyle="#FFFF45";
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
        } else if(stoneSwitch == "video"){

            if(colorswitch){
                drawVideo("tenor.gif");
                colorswitch = false;
            }else if(colorswitch){
                drawVideo("duckduck.gif");
                colorswitch = true;
            }
        }
    }


    function drawVideo(source, stoneX, stoneY){

        var video = document.createElement('video');
        video.src = source;

        video.onload = function () {
            ctx.save();
            ctx.beginPath();
            ctx.arc(stoneX + colSize * stoneX + colSize / 2, stoneY + stoneY * colSize + colSize / 2, colSize / 2, 0, 2 * Math.PI, true);
            ctx.closePath();
            ctx.clip();

            ctx.drawImage(video,  stoneX + colSize*stoneX  , stoneY + stoneY*colSize , colSize, rowSize);
            ctx.beginPath();
            ctx.arc(stoneX + colSize * stoneX + colSize / 2, stoneY + stoneY * colSize + colSize / 2, colSize / 2, 0, 2 * Math.PI, true);
            ctx.clip();
            ctx.closePath();
            ctx.restore();
        }

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

        drawBoard();
    };



    $(document).ready(function () {


    });

    $(document).ready(init);

    // public
    return {};





}($));