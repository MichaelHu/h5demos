LineChart.fn.setupDrag = function(){

    var me = this, 
        opt = me.opt,
        lastTouchX
        isBusy = false,
        canvas = opt.canvas;

    if(!opt.enableDrag || me.isRedraw){
        return;
    }
    me.isRedraw = true;

    canvas.on('touchstart', function(e){
            lastTouchX 
                = e.targetTouches[0].clientX;
        })
        .on('touchmove', function(e){
            var t = e.targetTouches[0],
                offsetX, offsetXToBe, w,
                currentPoint = 0;

            e.preventDefault();

            if(!opt.enableTouchTrace){
                return;
            }

            offsetX = t.clientX - lastTouchX;
            lastTouchX = t.clientX;

            if(isBusy){
                return;
            }
            isBusy = true;
            setTimeout(function(){ isBusy = false; }, 40);

            
            offsetXToBe = opt._offsetX + opt.dragAccelerate * offsetX;
            w = opt.step * ( opt.data.length - 1 );

            if(offsetXToBe < opt.initOffsetX 
                && offsetXToBe + w <= opt.step + opt.initOffsetX){
                opt._offsetX = - w + opt.step + opt.initOffsetX; 
                console.log('rightmost');
            }
            else if(offsetXToBe >= opt.initOffsetX) {
                opt._offsetX = opt.initOffsetX;
                console.log('leftmost');
            }
            else{
                opt._offsetX = offsetXToBe;
            }

            if(Math.abs ( (opt._offsetX - opt.initOffsetX) % opt.step ) 
                    < opt.currentPointThreshold){
                currentPoint 
                    = Math.abs( parseInt( ( opt._offsetX - opt.initOffsetX) / opt.step ) );
                console.log('current ' + currentPoint); 
                opt._currentPoint = currentPoint;
            }

            me.draw();
        })
        .on('touchend', function(e){
            var t = e.changedTouches[0],
                offsetX;

            if(opt.enableTouchTrace){
                return;
            }

            offsetX = t.clientX - lastTouchX;
            opt._offsetX += offsetX;
            me.draw();
        });

    return this;

};
