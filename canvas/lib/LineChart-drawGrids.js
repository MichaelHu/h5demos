LineChart.fn.drawGrids = function(){
    var me = this, 
        opt = me.opt,
        canvas = opt.canvas,
        X = opt.X,
        Y = opt.Y;

    if(!opt.enableGrids){
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
        .globalAlpha(opt.gridOpacity)
        .lineWidth(opt.gridLineWidth)
        .strokeStyle(opt.gridStrokeStyle)
        ;

    for(var i=0; i<X.length; i++){

        if(opt.noDrawHiddenArea
            && ( X[i] < 0 && X[i] + opt.step < 0
                || X[i] > opt.canvasWidth && X[i] - opt.canvasWidth > opt.step) ){
            continue;
        }

        canvas
            .beginPath()
            .moveTo(X[i] + 0.5, Y[i] + opt.intersectRadius + 0.5)
            .lineTo(
                X[i] + 0.5
                , opt.drawArea.y + opt.drawArea.h - opt.paddingBottom + 0.5
            )
            .stroke()
            ;
    }

    canvas
        .restore()
        ;

    return this;
};

