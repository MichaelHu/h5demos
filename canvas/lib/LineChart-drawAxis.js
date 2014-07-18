LineChart.fn.drawAxis = function(){
    var me = this, 
        opt = me.opt,
        canvas = opt.canvas,
        X = opt.X,
        Y = opt.Y;

    if(!opt.enableAxis){
        return this;
    }

    canvas.save()

        .globalAlpha(opt.axisOpacity)
        .lineWidth(opt.axisLineWidth)
        .strokeStyle(opt.axisStrokeStyle)

        .beginPath()
        .moveTo(
            opt.drawArea.x + opt.paddingLeft + 0.5
            , opt.drawArea.y + opt.paddingTop + 0.5
        )
        .lineTo(
            opt.drawArea.x + opt.paddingLeft + 0.5
            , opt.drawArea.y + opt.drawArea.h - opt.paddingBottom + 0.5
        )
        .lineTo(
            opt.drawArea.x + opt.drawArea.w - opt.paddingRight - 0.5
            , opt.drawArea.y + opt.drawArea.h - opt.paddingBottom + 0.5
        )

        .stroke()
        .restore()
        ;

    return this;
};

