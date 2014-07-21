LineChart.fn.draw = function(){
    var me = this,
        opt = me.opt;

    me.checkTime();
    
    opt.canvas
        .clearRect(
            opt.drawArea.x
            , opt.drawArea.y
            , opt.drawArea.w
            , opt.drawArea.h
        )
        ;

    me.initCoordinates()
        .drawBackground()
        .drawAxis()
        .drawGrids()
        .drawLastGrid()
        .drawLines()
        .drawIntersections()
        .drawLabels()
        .drawCurrentLabel()
        .drawLastLabel()
        .showFPS()

        .setupDrag()
        ;

    return;

    setTimeout(function(){
        opt._offsetX += 10;
        me.draw();
    }, 50);
};
