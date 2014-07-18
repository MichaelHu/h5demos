LineChart.fn.initCoordinates = function(){
    var me = this, opt = me.opt,
        X = opt.X = [],
        Y = opt.Y = [];
     
    for(var i=0,j=0; j<opt.data.length; i+=opt.step, j++){
        X.push(opt.drawArea.x + opt.paddingLeft + i); 
        Y.push(
            opt.drawArea.y 
            + opt.drawArea.h 
            - opt.paddingBottom 
            - ( opt.data[j] - opt.range.min ) / opt.ratio 
        );
    }

    for(var i=0; i<X.length; i++){
        X[i] += opt._offsetX;
    }

    return me;
};
