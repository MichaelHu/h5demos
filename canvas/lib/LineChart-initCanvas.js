LineChart.fn.initCanvas = function(){
    var me = this, opt = me.opt; 

    opt.canvas
        .width(opt.canvasWidth)
        .height(opt.canvasHeight)
        .css({
            width: opt.canvasWidth / 2 + 'px'
            , height: opt.canvasHeight / 2 + 'px' 
        })
        ;
};
