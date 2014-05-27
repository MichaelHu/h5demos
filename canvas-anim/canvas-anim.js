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

var frames = [
{
    delay: 300
    , handler: frame0
}

,{
    delay: 100
    , handler: frame1
}

,{
    delay: 100
    , handler: frame2
}

,{
    delay: 300
    , handler: frame0
}

,{
    delay: 300
    , handler: frame1
}

,{
    delay: 120
    , handler: frame2
}

,{
    delay: 60
    , handler: frame3
}

,{
    delay: 60
    , handler: frame4
}

,{
    delay: 60
    , handler: frame5
}

,{
    delay: 60
    , handler: frame6
}

,{
    delay: 60
    , handler: frame7
}

,{
    delay: 60
    , handler: frame8
}

,{
    delay: 60
    , handler: frame9
}

,{
    delay: 60
    , handler: frame10
}

];

play(frames, false);




function eye_frame(gap, p1){

    // 清除指定区域
    var param = {
        left: 0 
        , top: 0 
        , width: w 
        , height: h 
    };
    context.clearRect(
        param.left
        , param.top
        , param.width
        , param.height
    );

    var upy = h / 2 - gap,
        downy = h - upy,
        p1 = p1 || 0; 

    // 贝塞尔曲线
    var param = {
        startx: 0
        , starty: upy 
        , cpx1: 100 
        , cpy1: upy - 50 - p1 
        , cpx2: w - 100 
        , cpy2: upy - 50 - p1 
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
        , cpy1: downy + 50 + p1 
        , cpx2: w - 100 
        , cpy2: downy + 50 + p1 
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




function frame0(){
    eye_frame(-100);
}

function frame1(){
    eye_frame(-30);
}

function frame2(){
    eye_frame(-20, 15);
}

function frame3(){
    eye_frame(-10, 30);
}

function frame4(){
    eye_frame(30, 45);
}

function frame5(){
    eye_frame(80, 60);
}

function frame6(){
    eye_frame(120, 75);
}

function frame7(){
    eye_frame(160, 75);
}

function frame8(){
    eye_frame(200, 75);
}

function frame9(){
    eye_frame(240, 75);
}

function frame10(){
    eye_frame(300, 75);
}




});

