LineChart.fn.redraw = function(options){
    var me = this,
        opt = me.opt;

    $.extend(opt, options);

    me.isFakeDraw = false;
    me.draw();
};

