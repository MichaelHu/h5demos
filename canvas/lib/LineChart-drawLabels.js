LineChart.fn.drawLabels = function(){
    var me = this, 
        opt = me.opt,
        canvas = opt.canvas,
        labels = opt.labels,
        labelStep,
        x,
        y = opt.drawArea.y + opt.drawArea.h - opt.paddingBottom;
    
    if(!opt.enableLabels){
        return this;
    }

    labelStep = ( opt.step * ( opt.data.length - 1 ) ) 
        / ( labels.length - 1 );

    canvas
        .save()
        .beginPath()
        .rect(
            opt.drawArea.x + opt.paddingLeft
            , opt.drawArea.y + opt.drawArea.h - opt.paddingBottom 
            , opt.drawArea.w - opt.paddingLeft - opt.paddingRight
            , opt.paddingBottom
        )
        .clip()
        .font(opt.labelFont)
        .textAlign(opt.labelTextAlign)
        .textBaseline(opt.labelTextBaseline)
        .fillStyle(opt.labelFillStyle)
        ;

    for(var i=0, x=opt.drawArea.x + opt.paddingLeft + opt._offsetX; 
        i<labels.length; i++, x+=labelStep){
            if(opt.noDrawHiddenArea
                && ( x < 0 && x + labelStep < 0
                    || x > opt.canvasWidth && x - opt.canvasWidth > labelStep ) ){
                continue;
            }
            canvas.fillText(labels[i], x, y + opt.labelPaddingTop);
    }

    canvas
        .restore();

    return this;
};
