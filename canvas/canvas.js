$(function(){


function drawText(){

    var canvas = new Canvas($('<canvas id="c_text"></canvas>').appendTo('body'));

    canvas
        /*
        .width($(window).width() * 0.9)
        .height($(window).height() * 0.9)
        */
        .width(640)
        .height(200)

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

    var canvas = new Canvas($('<canvas id="c_lines"></canvas>').appendTo('body'));

    var randY = [];

    canvas
        .width(1280)
        .height(400);

    for(var i=0; i<canvas.getWidth(); i+=60){
        randY.push(20.5 + Math.floor(Math.random() * 300) );
    }


    // background
    canvas.save()
        .globalAlpha(1)
        .lineWidth(2)
        .fillStyle('#7ea4b8')
        .fillRect(0, 0, canvas.getWidth(), 320)
        .restore()
        ;



    // grids
    canvas.save()
        .globalAlpha(0.4)
        .lineWidth(1)
        .strokeStyle('#f8f8f8')
        ;
    for(var i=10, j=0; i<canvas.getWidth(); i+=60, j++){
        canvas
            .moveTo(i+0.5, randY[j] + 8)
            .lineTo(i+0.5, 20.5 + 320)
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

    for(var i=10, j=0; i<canvas.getWidth(); i+=60, j++){
        if(10 == i){
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

    for(var i=10, j=0; i<canvas.getWidth(); i+=60, j++){
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


    var initTouchX, initPos, isBusy = false;
    canvas.on('touchstart', function(e){
            console.log('touchstart');
            initTouchX 
                = e.targetTouches[0].clientX;
            initPos = $(e.target).offset();
        })
        .on('touchmove', function(e){
            var t = e.targetTouches[0],
                offsetX;

            e.preventDefault();

            offsetX = t.clientX - initTouchX;
            console.log(offsetX);

            if(isBusy){
                return;
            }
            isBusy = true;
            setTimeout(function(){ isBusy = false; }, 20);

            $(canvas.canvas).css({
                '-webkit-transform': 'translate(' + ( initPos.left - 0 + offsetX ) + 'px, 0px)',
            });
        })
        .on('touchend', function(e){
            console.log('touchend');
        });

        
}

setTimeout(function(){
    drawText();
    drawLine();
}, 300);


});
