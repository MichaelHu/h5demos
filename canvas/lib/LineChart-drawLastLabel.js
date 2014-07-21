LineChart.fn.drawLastLabel = function(){
    var me = this, 
        opt = me.opt,
        canvas = opt.canvas,
        X = opt.X,
        Y = opt.Y,
        x,
        y,
        i = opt.data.length - 1,
        baseLine = 'top',
        offsetY = opt.lastLabelOffsetY,
        labelHeight = opt.lastLabelHeight,
        offset,
        arrowOffset,
        arrowTopOffset,
        label = parseInt(opt.data[i]),
        textWidth;
    
    if(!opt.enableLastLabel){
        return me;
    }

    x = X[i];
    y = Y[i];

    offset = offsetY - labelHeight;
    arrowOffset = offset + labelHeight;
    arrowTopOffset = offset + labelHeight + 7;

    if(y - opt.drawArea.y - opt.paddingTop < opt.lastLabelThreshold){
        offset = -offsetY;
        arrowOffset = offset; 
        arrowTopOffset = offset - 7; 
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

        .font(opt.lastLabelFont)
        .textAlign(opt.lastLabelTextAlign)
        .textBaseline(baseLine)
        .fillStyle(opt.lastLabelBackgroundColor)
        ;

    textWidth = canvas.getTextWidth(label);

    canvas
        .beginPath()
        .rect(
            x - textWidth / 2 - opt.lastLabelPaddingHorizontal  
            , y + offset 
            , textWidth + opt.lastLabelPaddingHorizontal * 2 
            , labelHeight 
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

        .fillStyle(opt.lastLabelFillStyle)
        .fillText(label, x, y + offset + opt.lastLabelPaddingVertical)
        .restore();

    return me;
};

