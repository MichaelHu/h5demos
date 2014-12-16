LineChart.fn.drawLastValue = function(){
    var me = this, 
        opt = me.opt,
        canvas = opt.canvas,
        X = opt.X,
        Y = opt.Y,
        x,
        y,
        i = opt.data.length - 1,
        baseLine = 'top',
        offsetY = opt.lastValueOffsetY,
        valueHeight = opt.lastValueHeight,
        offset,
        arrowOffset,
        arrowTopOffset,
        value = parseInt(opt.data[i]),
        textWidth,
        w;
    
    if(!opt.enableLastValue){
        return me;
    }

    x = X[i];
    y = Y[i];

    // default on top of intersect
    offset = offsetY - valueHeight;
    arrowOffset = offset + valueHeight;
    arrowTopOffset = offset + valueHeight + 3.5 * opt.scale;

    if(y - opt.drawArea.y - opt.paddingTop < opt.lastValueThreshold){
        offset = -offsetY;
        arrowOffset = offset; 
        arrowTopOffset = offset - 3.5 * opt.scale; 
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

        .font(opt.lastValueFont)
        .textAlign(opt.lastValueTextAlign)
        .textBaseline(baseLine)
        .fillStyle(opt.lastValueBackgroundColor)
        .strokeStyle(opt.lastValueBackgroundColor)
        ;

    textWidth = canvas.getTextWidth(value);
    w = textWidth + opt.lastValuePaddingHorizontal * 2;
    if(w < opt.lastValueMinWidth){
        w = opt.lastValueMinWidth;
    }

    canvas
        .beginPath()
        .rect(
            x - w / 2
            , y + offset 
            , w 
            , valueHeight 
        )
        .fill()
        .beginPath()
        .moveTo(
            x - 5
            , y + arrowOffset
        )
        .lineTo(
            x
            , y + arrowTopOffset
        )
        .lineTo(
            x + 5
            , y + arrowOffset 
        )
        .closePath()
        .fill()

        .fillStyle(opt.lastValueFillStyle)
        .fillText(value, x, y + offset + opt.lastValuePaddingVertical)
        .restore();

    return me;
};

