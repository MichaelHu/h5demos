var startDrag = (function(){

    var touches,
        timer = 0,

        lastTouchPos = {x:0, y:0},
        touchOffset = {x:0, y:0},
        
        lastPos = {top:0, left:0},

        $placeholder = $('<li></li>'),
        lastPlaceholderIndex = 0;

    function startDrag(evt, handle, box){
        var $handle = $(handle),
            $box = box ? $(box) : $handle;

        initLastPos($box);
        initLastPlaceholderIndex($box);
        updateLastTouchPos(evt.targetTouches);

        addPlaceholder($box);
        updatePos($box, touchOffset);
        $box.addClass('moving');
        evt.preventDefault();

        $handle
        .on('touchmove', function(e){
            touches = e.targetTouches;
            updateTouchOffset(touches);

            updateLastTouchPos(touches);
            updatePos($box, touchOffset);
            movePlaceholder($box);

            scrollIntoView($box, touches);
            e.preventDefault();
        })
        .on('touchend', function(e){
            touches = e.changedTouches;
            e.preventDefault();
            $handle.off('touchmove touchend');
            removePlaceholder($box);
            $box.removeClass('moving');
        });
    }

    function addPlaceholder($box){
        $placeholder.insertBefore($box);
    }

    function movePlaceholder(){
        // $placeholder.remove();
        var index = 
                Math.floor(lastPos.top / 46 + 0.5);

        console.log(index + ' ' + lastPlaceholderIndex);
        if(index > lastPlaceholderIndex){
            console.log('move after');
            $next = $placeholder.next();
            if($next.hasClass('moving')){
                $next = $next.next();
            }
            $placeholder.insertAfter($next);
            lastPlaceholderIndex = index;
        }
        else if(index < lastPlaceholderIndex){
            $prev = $placeholder.prev();
            if($prev.hasClass('moving')){
                $prev = $prev.prev();
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

    function initLastPlaceholderIndex($box){
        lastPlaceholderIndex = $box.index();
    }

    function initLastPos($box){
        // lastPos.top = parseInt( $box.css('top') ) || 0;
        // lastPos.top = parseInt( $box.offset().top ) || 0;
        lastPos.top = parseInt( $box[0].offsetTop ) || 0;
        // lastPos.left = parseInt( $box.css('left') ) || 0;
    }

    function updatePos($box, touchOffset){
        lastPos.top += touchOffset.y;
        lastPos.left += touchOffset.x;

        if(lastPos.top < 0){
            lastPos.top = 0;
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

    function scrollIntoView($box, touches){
        var touch = touches[0];

        if(touch.clientY <= 5){
            if(window.scrollY > 0){
                window.scrollBy(0, -20);
                fixPos($box, 0, -20);
            }
        }
        else if(touch.clientY >= window.innerHeight - 5){
            window.scrollBy(0, 20);
            fixPos($box, 0, 20);
        }
    }

    function fixPos($box, x, y){
        lastPos.top += y;
        lastPos.left += x;

        if(lastPos.top < 0){
            lastPos.top = 0;
        }

        $box.css({
            top: lastPos.top + 'px'
            // , left: lastPos.left + 'px'
        });
    }

    return startDrag;

})();

$('#list').on('touchstart', '.handle', function(e){
    var $target = $(e.target),
        $box = $target.closest('li');

    startDrag(e, $target, $box);    
});

$(function(){
    setTimeout(function(){
        // window.scrollTo(0, 100);
    }, 1000);
});

