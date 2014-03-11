var startDrag = (function(){

    var touches,
        isBusy = false,

        scrollThreshold = 46,

        lastTouchPos = {x:0, y:0},
        touchOffset = {x:0, y:0},
        
        lastPos = {top:0, left:0},
        limitPos = {minTop: 0, maxTop: 0},

        $placeholder = $('<li></li>'),
        lastPlaceholderIndex = 0;

    function startDrag(evt, handle, box){
        var $handle = $(handle),
            $box = box ? $(box) : $handle;

        initLastPos($box);
        initLimitPos($box);
        initLastPlaceholderIndex($box);
        initScrollThreshold($box);
        initTouchOffset();

        updateLastTouchPos(evt.targetTouches);

        addPlaceholder($box);
        updatePos($box, touchOffset);
        $box.addClass('moving');
        evt.preventDefault();

        $handle
        .on('touchmove', function(e){
            if(!isBusy){
                isBusy = true;
                touches = e.targetTouches;
                updateTouchOffset(touches);

                updateLastTouchPos(touches);
                updatePos($box, touchOffset);
                movePlaceholder();

                scrollIntoView($box, touches);

                // throttle processing
                setTimeout(function(){
                    isBusy = false;
                }, 40);
            }
            e.preventDefault();
        })
        .on('touchend', function(e){
            touches = e.changedTouches;
            $handle.off('touchmove touchend');
            removePlaceholder($box);
            $box.removeClass('moving');
            e.preventDefault();
        });
    }

    function addPlaceholder($box){
        $placeholder.insertBefore($box);
    }

    function movePlaceholder(){
        var index 
                = Math.floor(lastPos.top / scrollThreshold + 0.5),
            i;

        // console.log(index + ' ' + lastPlaceholderIndex);
        if(index > lastPlaceholderIndex){
            i = index - lastPlaceholderIndex;
            $next = $placeholder.next();
            if($next.hasClass('moving')){
                $next = $next.next();
            }

            while(--i > 0){
                $next = $next.next();
                if($next.hasClass('moving')){
                    $next = $next.next();
                }
            }
            $placeholder.insertAfter($next);
            lastPlaceholderIndex = index;
        }
        else if(index < lastPlaceholderIndex){
            i = lastPlaceholderIndex - index;
            $prev = $placeholder.prev();
            if($prev.hasClass('moving')){
                $prev = $prev.prev();
            }
            while(--i > 0){
                $prev = $prev.prev();
                if($prev.hasClass('moving')){
                    $prev = $prev.prev();
                }
            }
            $placeholder.insertBefore($prev);
            lastPlaceholderIndex = index;
        }
    }

    function removePlaceholder($box){
        $box.insertBefore($placeholder);
        $placeholder.remove();
        $box.css({
            position: 'relative'
            , top: '0px'
        });

    }

    function initScrollThreshold($box){
        scrollThreshold = $box.height();
    }

    function initLastPlaceholderIndex($box){
        lastPlaceholderIndex = $box.index();
    }

    function initLimitPos($box){
        limitPos.minTop = 0; 
        limitPos.maxTop 
            = $box.parent().children().last()[0].offsetTop; 
    }

    function initLastPos($box){
        // lastPos.top = parseInt( $box.css('top') ) || 0;
        // lastPos.top = parseInt( $box.offset().top ) || 0;
        lastPos.top = parseInt( $box[0].offsetTop ) || 0;

        // lastPos.left = parseInt( $box.css('left') ) || 0;
    }

    function initTouchOffset(){
        touchOffset.x = 0;
        touchOffset.y = 0;
    }

    function updatePos($box, touchOffset){
        lastPos.top += touchOffset.y;
        lastPos.left += touchOffset.x;

        if(lastPos.top < limitPos.minTop){
            lastPos.top = limitPos.minTop;
        }

        if(lastPos.top > limitPos.maxTop){
            lastPos.top = limitPos.maxTop;
        }

        $box.css({
            top: lastPos.top + 'px'
            // , left: lastPos.left + 'px'

            , left: '0px'
            , right: '0px'
            , position: 'absolute'
        });
    }

    function updateLastTouchPos(touches){
        var touch = touches[0];

        lastTouchPos.x = touch.clientX;
        lastTouchPos.y = touch.clientY;
    }

    function updateTouchOffset(touches){
        var touch = touches[0];

        touchOffset.x = touch.clientX - lastTouchPos.x;
        touchOffset.y = touch.clientY - lastTouchPos.y;
    }

    /**
     * @note: 使用实时计算scrollY的变化来决定fixPos的值的方式
     *   在iOS下可行，但由于在Android下不能实时计算，故放弃
     */
    function scrollIntoView($box, touches){
        var touch = touches[0];
            // oldScrollY = window.scrollY,
            // newScrollY = oldScrollY;

        if(touch.clientY <= scrollThreshold){
            window.scrollBy(0, -scrollThreshold);
            // newScrollY = window.scrollY;
            // fixPos($box, 0, newScrollY - oldScrollY);
            fixPos($box, 0, -scrollThreshold);
        }
        else if(touch.clientY >= window.innerHeight - scrollThreshold){
            window.scrollBy(0, scrollThreshold);
            // newScrollY = window.scrollY;
            // fixPos($box, 0, newScrollY - oldScrollY);
            fixPos($box, 0, scrollThreshold);
        }
    }

    function fixPos($box, x, y){
        lastPos.top += y;
        lastPos.left += x;

        if(lastPos.top < limitPos.minTop){
            lastPos.top = limitPos.minTop;
        }

        if(lastPos.top > limitPos.maxTop){
            lastPos.top = limitPos.maxTop;
        }

        $box.css({
            top: lastPos.top + 'px'
            // , left: lastPos.left + 'px'
        });
        movePlaceholder();
    }

    return startDrag;

})();

var isLongTap = false,
    $list = $('#list');

    $list
    .on('touchstart', '.handle', function(e){
        var $target = $(e.target),
            $box = $target.closest('li');

        isLongTap = true;
        setTimeout(function(){
            if(isLongTap){
                startDrag(e, $target, $box);    
            }
        }, 500);

        e.preventDefault();
    })
    .on('touchend', '.handle', function(e){
        isLongTap = false;
    });

$(function(){
    setTimeout(function(){
        // window.scrollTo(0, 100);
    }, 1000);
});

