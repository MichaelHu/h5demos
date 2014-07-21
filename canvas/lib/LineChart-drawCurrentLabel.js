LineChart.fn.drawCurrentLabel = function(){
    var me = this, 
        opt = me.opt,
        canvas = opt.canvas,
        X = opt.X,
        Y = opt.Y,
        x,
        y,
        i = opt._currentPoint,
        baseLine = 'bottom',
        offsetY = opt.currentLabelOffsetY;
    
    if(!opt.enableCurrentLabel){
        return me;
    }

    x = X[i];
    // x = opt.drawArea.x + opt.paddingLeft + 60;
    y = Y[i];

    if(y - opt.drawArea.y - opt.paddingTop < opt.currentLabelThreshold){
        baseLine = 'top';
        offsetY *= -1;
    } 

    canvas
        .save()
        .beginPath()
        .rect(
            opt.drawArea.x + opt.paddingLeft
            , opt.drawArea.y + opt.paddingTop
            , opt.drawArea.w - opt.paddingLeft - opt.paddingRight
            , opt.drawArea.h - opt.paddingTop - opt.paddingBottom
        )
        .clip()
        .font(opt.currentLabelFont)
        .textAlign(opt.currentLabelTextAlign)
        .textBaseline(baseLine)
        .fillStyle(opt.currentLabelFillStyle)
        .fillText(parseInt(opt.data[i]), x, y + offsetY)
        .restore();

    return me;
};

