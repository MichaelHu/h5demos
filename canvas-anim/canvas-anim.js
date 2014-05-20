$(function(){

var canvas = $('canvas')[0],
    context = null,
    h, w;

if(canvas.getContext){
    context = canvas.getContext('2d');
}

if(!context){
    return;
}

h = canvas.height = $(window).height();
w = canvas.width = $(window).width();

function draw(){

    var upy = h / 2 - 20,
        downy = h - upy; 

    // 贝塞尔曲线
    var param = {
        startx: 0
        , starty: upy 
        , cpx1: 100 
        , cpy1: upy - 100 
        , cpx2: w - 100 
        , cpy2: upy - 100 
        , endx: w 
        , endy: upy 
    };

    context.beginPath();
    context.moveTo(param.startx, param.starty);
    context.bezierCurveTo(
        param.cpx1
        , param.cpy1
        , param.cpx2
        , param.cpy2
        , param.endx
        , param.endy
    );

    context.lineTo(param.endx, 0);
    context.lineTo(param.startx, 0);
    context.closePath();

    context.fillStyle = 'rgba(0, 0, 0, 1)';
    context.fill();


    var param = {
        startx: 0
        , starty: downy 
        , cpx1: 100 
        , cpy1: downy + 100 
        , cpx2: w - 100 
        , cpy2: downy + 100 
        , endx: w 
        , endy: downy 
    };
    context.beginPath();
    context.moveTo(param.startx, param.starty);
    context.bezierCurveTo(
        param.cpx1
        , param.cpy1
        , param.cpx2
        , param.cpy2
        , param.endx
        , param.endy
    );

    context.lineTo(param.endx, h);
    context.lineTo(param.startx, h);
    context.closePath();

    context.fillStyle = 'rgba(0, 0, 0, 1)';
    context.fill();



    /*
    // 清除指定区域
    var param = {
        left: 0 
        , top: 40 
        , width: 320 
        , height: 15 
    };
    context.clearRect(
        param.left
        , param.top
        , param.width
        , param.height
    );
    */

}

draw();


});

