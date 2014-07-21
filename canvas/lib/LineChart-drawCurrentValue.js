LineChart.fn.drawCurrentValue = function(){
    var me = this, 
        opt = me.opt,
        canvas = opt.canvas,
        X = opt.X,
        Y = opt.Y,
        x,
        y,
        i = opt._currentPoint,
        baseLine = 'bottom',
        offsetY = opt.currentValueOffsetY;
    
    if(!opt.enableCurrentValue
        || i == opt.data.length - 1){
        return me;
    }

    x = X[i];
    // x = opt.drawArea.x + opt.paddingLeft + 60;
    y = Y[i];

    if(y - opt.drawArea.y - opt.paddingTop < opt.currentValueThreshold){
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
        .font(opt.currentValueFont)
        .textAlign(opt.currentValueTextAlign)
        .textBaseline(baseLine)
        .fillStyle(opt.currentValueFillStyle)
        .fillText(parseInt(opt.data[i]), x, y + offsetY)
        .restore();

    return me;
};

