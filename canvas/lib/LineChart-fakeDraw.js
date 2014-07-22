/**
 * An no side effects draw, only make the real draw be executed in another thread 
 * it can solve problem occur on android 4.3 ( maybe not only ) webview, which
 * the first frame will stay on screen, even though you call canvas.clearRect().
 */
LineChart.fn.fakeDraw = function(){
    var me = this,
        opt = me.opt;

    opt.canvas
        .clearRect(
            0
            , 0
            , opt.canvasWidth
            , opt.canvasHeight
        )
        ;

};

