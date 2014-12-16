LineChart.fn.initCanvas = function(){
    var me = this, opt = me.opt; 

    opt.canvas
        .width(opt.canvasWidth)
        .height(opt.canvasHeight)
        .css({
            width: opt.canvasWidth / opt.scale + 'px'
            , height: opt.canvasHeight / opt.scale + 'px' 
        })
        ;
};
