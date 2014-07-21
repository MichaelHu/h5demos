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
        .globalAlpha(0.5)
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
        ;

    for(var i=10, j=0; i<canvas.getWidth(); i+=60, j++){
        canvas
            .beginPath()
            .moveTo(i+0.5+4, randY[j])
            .arc(i+0.5, randY[j], 8, 0, 2 * Math.PI, false)
            .closePath()
            .stroke()

            .save()
            .beginPath()
            .globalAlpha(0.5)
            .fillStyle('#7ea4b8')
            .moveTo(i+0.5+3, randY[j])
            .arc(i+0.5, randY[j], 7, 0, 2 * Math.PI, false)
            .closePath()
            .fill()
            .restore()
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


function randomData(min, max, count){
    var ret = [], 
        _min = Math.min(min, max),
        _max = Math.max(min, max);

    for(var i=0; i<count; i++){
        ret.push(
            _min + ( _max - _min ) * Math.random()
        );
    }

    return ret;
}




function drawLine2(){

    var canvas = new Canvas($('<canvas id="c_lines2"></canvas>').appendTo('body'));



    var option = {
        data: randomData(10, 3000, 100)
    };




    var canvasWidth = 5120, canvasHeight = 300;
    var margin = {top:20, right:20, bottom:20, left:20};
    var padding = {top:20, right:20, bottom:20, left:20};



    // background area
    var drawArea = {
            x: margin.left
            , y: margin.top
            , w: canvasWidth - margin.left - margin.right
            , h: canvasHeight - margin.top - margin.bottom
        }; 
    var range = get_data_range(option.data);
    var ratio = range.span / ( drawArea.h - padding.top - padding.bottom ); 
    var step = ( drawArea.w - padding.left - padding.right ) / ( option.data.length - 1 );
    var X = [], Y = [];


    canvas
        .width(canvasWidth)
        .height(canvasHeight)
        .css({
            width: canvasWidth / 2 + 'px'
            , height: canvasHeight / 2 + 'px' 
        })
        ;

    

    for(var i=0,j=0; j<option.data.length; i+=step, j++){
        X.push(drawArea.x + padding.left + i + 0.5); 
        Y.push(
            drawArea.y 
            + drawArea.h 
            - padding.bottom 
            - ( option.data[j] - range.min ) / ratio 
        );
    }


    // background
    canvas.save()
        .globalAlpha(0.5)
        .lineWidth(2)
        .fillStyle('#7ea4b8')
        .fillRect(drawArea.x, drawArea.y, drawArea.w, drawArea.h)
        .restore()
        ;



    // grids
    canvas.save()
        .globalAlpha(0.4)
        .lineWidth(1)
        .strokeStyle('#f8f8f8')
        ;
    for(var i=0; i<X.length; i++){
        canvas
            .moveTo(X[i], Y[i] + 8)
            .lineTo(X[i], drawArea.y + drawArea.h)
            ;
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

    for(var i=0; i<X.length; i++){
        canvas
            .beginPath()
            .moveTo(X[i]+8, Y[i])
            .arc(X[i], Y[i], 8, 0, 2 * Math.PI, false)
            .closePath()
            .stroke()
            ;
    }
    canvas
        .restore()
        ;




    // lines
    canvas.save()
        .globalAlpha(1)
        .lineWidth(2)
        .strokeStyle('#ffffff')
        ;

    var fromCircle, toCircle, line, intersects,
        fromPoint = {x:0, y:0}, 
        toPoint = {x:0, y:0};

    for(var i=1; i<X.length; i++){
        fromCircle = {a: X[i-1], c: Y[i-1], r: 8}; 
        toCircle = {a: X[i], c: Y[i], r: 8}; 
        line = get_line_with_2points(
            {x: X[i-1], y: Y[i-1]}
            , {x: X[i], y: Y[i]}
        );

        intersects = get_intersect_between_line_and_circle(line, fromCircle); 

        if(intersects){
            fromPoint = intersects.length == 2
                ? intersects[1] : intersects[0];
        }

        intersects = get_intersect_between_line_and_circle(line, toCircle); 

        if(intersects){
            toPoint = intersects[0];
        }

        /*
        console.log([
                '[' + X[i-1] + ',' + Y[i-1] + ']'        
                , '[' + fromPoint.x + ',' + fromPoint.y + ']'        
                , '[' + toPoint.x + ',' + toPoint.y + ']'        
                , '[' + X[i] + ',' + Y[i] + ']'        
            ].join(' ')
        );
        */

        canvas.beginPath()
            .moveTo(fromPoint.x, fromPoint.y)
            .lineTo(toPoint.x, toPoint.y)
            .stroke()
            ;

    }

    canvas.restore()
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


function drawLine3(){
    var lineChart = new LineChart({
            data: randomData(3, 9000, 31) 
            , labels: [
                '7.1', '7.2', '7.3', '7.4', '7.5', '7.6', '7.7', '7.8', '7.9', '7.10', '7.11', 
                '7.12', '7.13', '7.14', '7.15', '7.16', '7.17', '7.18', '7.19', '7.20', '7.21', 
                '7.22', '7.23', '7.24', '7.25', '7.26', '7.27', '7.28', '7.29', '7.30', '7.31' 
            ]

            , canvas: new Canvas($('<canvas/>').appendTo('#chart_cont'))
            , canvasWidth: 640
            , canvasHeight: 400

            , enableGrids: true
            , enableLines: true
            , enableIntersect: true
            , enableBackground: true
            , enableAxis: true

            , enableTouchTrace: true

            , currentLabelOffsetY: -20

            , marginLeft: 0
            , marginRight: 0
                
            , paddingRight: 40 

            , intersectLineWidth: 5
            , intersectRadius: 6

            , initOffsetX: 6 + 5 + 44

            , linesLineWidth: 4

            , paddingTop: 60
            , paddingLeft: 40
            , paddingBottom: 40

            , step: 100
        });

    // lineChart.opt.canvas.css('background-color', 'rgba(100, 100, 100, 0.5)');
    lineChart.draw();






    var lineChart2 = new LineChart({
            data: randomData(2, 10000, 20) 
            , labels: [
                '7.2', '7.3', '7.4', '7.5', '7.6', '7.7', '7.8', '7.9', '7.10', '7.11', 
                '7.12', '7.13', '7.14', '7.15', '7.16', '7.17', '7.18', '7.19', '7.20', '7.21' 
            ]

            , canvas: new Canvas($('<canvas/>').appendTo('#chart_cont'))
            , canvasWidth: 640
            , canvasHeight: 400

            , enableGrids: true
            , enableLines: true
            , enableIntersect: true
            , enableBackground: false
            , enableAxis: true

            , enableTouchTrace: true
            , enableFPS: false

            , currentLabelOffsetY: -20

            , marginLeft: 0
            , marginRight: 0
                
            , paddingRight: 40 

            , intersectLineWidth: 5
            , intersectRadius: 6

            , initOffsetX: 6 + 5 + 44

            , linesLineWidth: 4

            , paddingTop: 60
            , paddingLeft: 40
            , paddingBottom: 40

            , step: 100
        });

    // lineChart.opt.canvas.css('background-color', 'rgba(100, 100, 100, 0.5)');
    lineChart2.draw();
}




setTimeout(function(){
    /*
    drawText();
    drawLine();
    drawLine2();
    */
    
    drawLine3();
}, 300);


});
