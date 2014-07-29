LineChart.fn.drawLines = function(){
    var me = this, 
        opt = me.opt,
        canvas = opt.canvas,
        X = opt.X,
        Y = opt.Y,
        // trend: 'dec', 'inc'
        T = opt.T = [];

    if(!opt.enableLines){
        return this;
    }

    canvas.save()
        .beginPath()
        .rect(
            opt.drawArea.x + opt.paddingLeft
            , opt.drawArea.y + opt.paddingTop
            , opt.drawArea.w - opt.paddingLeft - opt.paddingRight
            , opt.drawArea.h - opt.paddingTop - opt.paddingBottom
        )
        .clip()
        .globalAlpha(opt.linesOpacity)
        .lineWidth(opt.linesLineWidth)
        .strokeStyle(opt.linesStrokeStyle)
        ;

    var fromCircle, toCircle, line, intersects,
        fromPoint = {x:0, y:0}, 
        toPoint = {x:0, y:0};

    for(var i=1; i<X.length; i++){

        if(opt.noDrawHiddenArea
            && (X[i-1] < 0 && X[i-1] + opt.step < 0
                || X[i] > opt.canvasWidth && X[i] - opt.canvasWidth > opt.step ) ){
            continue;
        }

        fromCircle = {a: X[i-1], c: Y[i-1], r: opt.intersectRadius}; 
        toCircle = {a: X[i], c: Y[i], r: opt.intersectRadius}; 
        line = get_line_with_2points(
            {x: X[i-1], y: Y[i-1]}
            , {x: X[i], y: Y[i]}
        );
        T[i-1] = ( Y[i] - Y[i-1] >=0 ? 'dec' : 'inc' ); 

        intersects = get_intersect_between_line_and_circle(line, fromCircle); 

        if(intersects){
            fromPoint = intersects.length == 2
                ? intersects[1] : intersects[0];
        }

        intersects = get_intersect_between_line_and_circle(line, toCircle); 

        if(intersects){
            toPoint = intersects[0];
        }

        canvas.beginPath()
            .moveTo(fromPoint.x, fromPoint.y)
            .lineTo(toPoint.x, toPoint.y)
            .stroke()
            ;

    }
    T[i-1] = 'inc';

    canvas.restore();

    return me;
};
