LineChart.fn.redraw = function(){
    var me = this,
        opt = me.opt;

    me.isFakeDraw = false;
    me.draw();
};

