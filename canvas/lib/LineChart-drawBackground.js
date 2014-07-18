LineChart.fn.drawBackground = function(){
    var me = this, opt = me.opt;

    if(!opt.enableBackground){
        return this;
    }

    opt.canvas.save()
        .globalAlpha(opt.backgroundOpacity)
        .fillStyle(opt.backgroundColor)
        .fillRect(
            opt.drawArea.x
            , opt.drawArea.y
            , opt.drawArea.w
            , opt.drawArea.h
        )
        .restore()
        ;

    return this;
};
