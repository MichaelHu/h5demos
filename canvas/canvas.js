$(function(){

var canvas = $('canvas')[0],
    context = null;;

if(canvas.getContext){
    context = canvas.getContext('2d');
}

if(!context){
    return;
}

function draw(){

    // 圆弧
    var param = {
        ox: 50
        , oy: 20
        , radius: 30
        , startAngle: 0
        , endAngle: Math.PI * 1 
        , anticlockwise: false
    };

    context.beginPath();
    context.moveTo(0, 10);
    context.lineTo(100, 10);
    context.arc(
        param.ox
        , param.oy
        , param.radius
        , param.startAngle
        , param.endAngle
        , param.anticlockwise
    );
    context.closePath();
    context.stroke();





    // 相切弧
    var param = {
        lastx: 260
        , lasty: 10
        , cpx: 300 
        , cpy: 10 
        , endx: 300 
        , endy: 50 
        , radius: 40
    };
    context.beginPath();
    context.moveTo(150, 10);
    context.lineTo(param.lastx, param.lasty);
    context.arcTo(
        param.cpx
        , param.cpy
        , param.endx
        , param.endy
        , param.radius
    );
    context.lineTo(param.endx, param.endy + 50);
    context.strokeStyle = '#00f';
    context.stroke();




    // 贝塞尔曲线
    var param = {
        startx: 0
        , starty: 300
        , cpx1: 100 
        , cpy1: 200 
        , cpx2: 220 
        , cpy2: 200 
        , endx: 320 
        , endy: 300 
    };

    context.save();
    context.rotate(Math.PI * 0.08);
    context.translate(75, -30);

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

    context.lineTo(param.endx, param.endy - 100);
    context.lineTo(param.startx, param.starty - 100);
    context.closePath();

    context.fillStyle = 'rgba(0, 0, 0, 0.3)';
    context.fill();
    context.restore();


    context.save();
    context.rotate(Math.PI * 0.08);
    context.translate(75, -30);

    context.beginPath();
    context.moveTo(param.startx, param.starty);
    context.bezierCurveTo(
        param.cpx1
        , param.cpy1 + 200
        , param.cpx2
        , param.cpy2 + 200
        , param.endx
        , param.endy
    );

    context.lineTo(param.endx, param.endy + 100);
    context.lineTo(param.startx, param.starty + 100);
    context.closePath();

    context.fillStyle = 'rgba(0, 0, 0, 0.3)';
    context.fill();
    context.restore();



    // 直接绘制
    context.fillRect(100, 30, 50, 60);





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


    console.log(context);
}

draw();


});
