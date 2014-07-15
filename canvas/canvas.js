$(function(){

var canvas = new Canvas($('<canvas></canvas>').appendTo('body'));


function drawText(){

    canvas
        /*
        .width($(window).width() * 0.9)
        .height($(window).height() * 0.9)
        */
        .width(640)
        .height(1000)

        .font('italic bold 28px Arial')

        .save()
        .moveTo(0, 100)
        .lineTo(100, 100)
        .strokeStyle('red')
        .stroke()

        .font('40px monospace')
        .fillStyle('blue')
        .textBaseline('top')
        .fillText('TOP', 50, 100)
        .textBaseline('bottom')
        .fillText('HELLO, WORLD', 50, 100)
        .restore()
        .fillText('HELLO, Canvas', 50, 120)
        ;

    canvas
        .save()
        .globalAlpha(0.9)
        .fillStyle('#9033eb')
        .textBaseline('top')
        .fillText('hello, canvas', 10, 10)
        .restore()
        ;


}


function drawLine(){

    var randY = [];
    for(var i=0; i<canvas.getWidth(); i+=60){
        randY.push(320.5 + Math.floor(Math.random() * 200) );
    }


    // background
    canvas.save()
        .globalAlpha(1)
        .lineWidth(2)
        .fillStyle('#7ea4b8')
        .fillRect(0, 300, canvas.getWidth(), 220)
        .restore()
        ;



    // grids
    canvas.save()
        .globalAlpha(0.2)
        .lineWidth(1)
        .strokeStyle('#f8f8f8')
        ;
    for(var i=0, j=0; i<canvas.getWidth(); i+=60, j++){
        canvas
            .moveTo(i+0.5, randY[j] + 8)
            .lineTo(i+0.5, 300.5 + 220)
            ;
    }
    canvas
        .stroke()
        .restore()
        ;





    // lines
    canvas.save()
        .globalAlpha(1)
        .lineWidth(2)
        .strokeStyle('#ffffff')
        .beginPath()
        ;

    for(var i=0, j=0; i<canvas.getWidth(); i+=60, j++){
        if(0 == i){
            canvas
                .moveTo(i+0.5, randY[j])
                ;
        }
        else{
            canvas
                .lineTo(i+0.5, randY[j])
                ;
        }
    }
    canvas
        .stroke()
        .restore()
        ;



    // intersections
    canvas.save()
        .globalAlpha(1)
        .lineWidth(2)
        .strokeStyle('#ffffff')
        .fillStyle('#7ea4b8')
        ;

    for(var i=0, j=0; i<canvas.getWidth(); i+=60, j++){
        canvas
            .beginPath()
            .moveTo(i+0.5+4, randY[j])
            .arc(i+0.5, randY[j], 8, 0, 2 * Math.PI, false)
            .closePath()
            .stroke()

            .beginPath()
            .moveTo(i+0.5+3, randY[j])
            .arc(i+0.5, randY[j], 7, 0, 2 * Math.PI, false)
            .closePath()
            .fill()
            ;
    }
    canvas
        .restore()
        ;
}

setTimeout(function(){
    drawText();
    drawLine();
}, 300);


});
