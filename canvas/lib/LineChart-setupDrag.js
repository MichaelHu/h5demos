LineChart.fn.setupDrag = function(){

    var me = this, 
        opt = me.opt,
        lastTouchX,
        _lastOffsetX,
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

            if(me.isBusy){
                return;
            }
            me.isBusy = true;
            setTimeout(function(){ me.isBusy = false; }, 40);

            
            offsetXToBe = opt._offsetX + opt.dragAccelerate * offsetX;
            w = opt.step * ( opt.data.length - 1 );

            _lastOffsetX = opt._offsetX;
            if(offsetXToBe < opt.initOffsetX 
                && offsetXToBe + w <= opt.step + opt.initOffsetX){
                opt._offsetX = - w + opt.step + opt.initOffsetX; 
                // console.log('rightmost');
            }
            else if(offsetXToBe >= opt.initOffsetX) {
                opt._offsetX = opt.initOffsetX;
                // console.log('leftmost');
            }
            else{
                opt._offsetX = offsetXToBe;
            }

            if(Math.abs ( (opt._offsetX - opt.initOffsetX) % opt.step ) 
                    < opt._currentPointThreshold){
                currentPoint 
                    = Math.abs( parseInt( ( opt._offsetX - opt.initOffsetX) / opt.step ) );

                // when swipe left, make sure current point is visible
                if(offsetX < 0){
                    opt._currentPoint = currentPoint + 1;

                }
                else{
                    opt._currentPoint = currentPoint;
                }

                // last point is not marked
                if(opt._currentPoint == opt.data.length - 1
                    && opt._currentPoint >= 0){
                    opt._currentPoint --;
                }

            }

            // ignore no-need redraw
            if(_lastOffsetX != opt._offsetX){
                me.draw();
            }
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
