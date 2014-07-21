LineChart.fn.checkTime = function(){
    var me = this;

    me.timeRenderStart = new Date().getTime();
    return me;
};

LineChart.fn.showFPS = function(){
    var me = this,
        opt = me.opt,
        now = new Date().getTime(),
        fps = 1 / ( now + 1 - me.timeRenderStart ) * 1000,
        fpsArr;

    if(!opt.enableFPS){
        return me;
    }

    fpsArr = me.fpsArr = me.fpsArr || [];

    fpsArr.push(fps);

    me.$info = me.$info
        || $('<div class="__line-chart-fps"></div>')
                .appendTo('body')
                .css({
                    'position': 'absolute'
                    , 'display': 'none'
                    , 'top': '5px'
                    , 'right': '10px'
                    , 'padding': '0 5px'
                    , 'background-color': 'rgba(0,0,0,0.3)'
                    , 'height': '28px'
                    , 'color': '#fff'
                    , 'font': 'normal normal 14px/28px Arial'
                });

    setTimeout(function(){
        var total = 0, _fps = 0;
        for(var i=0; i<fpsArr.length; i++){
            total += fpsArr[i];
        }

        if(fpsArr.length){
            _fps = total / fpsArr.length;
        }

        me.$info.show().html('fps: ' + parseInt(_fps));
    }, 1000);

    return me;
};
