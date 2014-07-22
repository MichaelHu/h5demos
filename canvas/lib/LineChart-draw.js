LineChart.fn.draw = function(){
    var me = this,
        opt = me.opt;

    if(!me.isFakeDraw && !$.os.ios /* $.os.android is undefined on some Android devices */){
        me.isFakeDraw = true;
        /**
         * An no side effects draw, only make the real draw be executed in another thread 
         * it can solve problem occur on android 4.3 ( maybe not only ) webview, which
         * the first frame will stay on screen, even though you call canvas.clearRect().
         */
        me.fakeDraw();
        setTimeout(function(){
            me.draw();
        }, 10);
        return;
    }

    me.checkTime();
    
    if(me.isRedraw){
        opt.canvas
            .clearRect(
                0
                , 0
                , opt.canvasWidth
                , opt.canvasHeight
            )
            ;
    }

    me.initCoordinates()
        .drawBackground()
        .drawAxis()
        .drawGrids()
        .drawLastGrid()
        .drawLines()
        .drawIntersections()
        .drawLabels()
        .drawCurrentValue()
        .drawLastValue()
        .showFPS()

        .setupDrag()
        ;

    return;

    setTimeout(function(){
        opt._offsetX += 10;
        me.draw();
    }, 50);
};
