LineChart.fn.drawIntersections = function(){
    var me = this, 
        opt = me.opt,
        canvas = opt.canvas,
        X = opt.X,
        Y = opt.Y;

    if(!opt.enableIntersect){
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
        .globalAlpha(opt.intersectOpacity)
        .lineWidth(opt.intersectLineWidth)
        .strokeStyle(opt.intersectStrokeStyle)
        .fillStyle(opt.intersectStrokeStyle)
        ;

    for(var i=0; i<X.length; i++){

        if(opt.noDrawHiddenArea
            && (X[i] < 0 && X[i] + opt.step < 0
                || X[i] > opt.canvasWidth && X[i] - opt.canvasWidth > opt.step)){
            continue;
        }

        canvas
            .beginPath()
            .moveTo(X[i]+opt.intersectRadius, Y[i])
            .arc(X[i], Y[i], opt.intersectRadius, 0, 2 * Math.PI, false)
            .closePath()
            .stroke()
            ;

        if(i == X.length - 1){
            canvas
                .fill()
                ;
        }

    }

    i = opt._currentPoint;
    canvas
        .globalAlpha(opt.currentPointOpacity)
        .lineWidth(opt.currentPointtLineWidth)
        .strokeStyle(opt.currentPointStrokeStyle)
        .beginPath()
        .moveTo(X[i]+opt.currentPointRadius, Y[i])
        .arc(X[i], Y[i], opt.currentPointRadius, 0, 2 * Math.PI, false)
        .closePath()
        .stroke()
        ;

    canvas
        .restore()
        ;

    return this;
};
