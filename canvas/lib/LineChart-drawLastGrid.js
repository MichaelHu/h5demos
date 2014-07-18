LineChart.fn.drawLastGrid = function(){
    var me = this, 
        opt = me.opt,
        canvas = opt.canvas,
        X = opt.X,
        Y = opt.Y,
        index = X.length - 1;

    if(!opt.enableLastGrid || index < 0){
        return me;
    }

    if(opt.noDrawHiddenArea
        && ( X[index] < 0 && X[index] + opt.step < 0
            || X[index] > opt.canvasWidth && X[index] - opt.canvasWidth > opt.step) ){
        return me;
    }

    canvas.save()
        .beginPath()
        .rect(
            opt.drawArea.x + opt.paddingLeft
            , opt.drawArea.y + opt.paddingTop
            , opt.drawArea.w - opt.paddingLeft - opt.paddingRight
            , opt.drawArea.h - opt.paddingTop - opt.paddingBottom + opt.lastGridLineWidth
        )
        .clip()
        .globalAlpha(opt.lastGridOpacity)
        .lineWidth(opt.lastGridLineWidth)
        .strokeStyle(opt.lastGridStrokeStyle)

        .beginPath()
        .moveTo(X[index] + 0.5, Y[index] + opt.intersectRadius + 0.5)
        .lineTo(
            X[index] + 0.5
            , opt.drawArea.y + opt.drawArea.h - opt.paddingBottom + 0.5
        )
        .moveTo(
            X[index] + 0.5 - opt.lastGridFootSize
            , opt.drawArea.y + opt.drawArea.h - opt.paddingBottom + 0.5
        )
        .lineTo(
            X[index] + 0.5 + opt.lastGridFootSize
            , opt.drawArea.y + opt.drawArea.h - opt.paddingBottom + 0.5
        )
        .stroke()
        .restore()
        ;

    return this;
};
