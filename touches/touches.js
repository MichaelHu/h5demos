var enableTouchDrag = (function(){

var touches,
    timer = 0,

    lastTouchPos = {x:0, y:0},
    touchOffset = {x:0, y:0},
    
    isStartDrag = false,
    lastPos = {top:0, left:0};

function enableTouchDrag(handle, box){
    var $handle = $(handle);

    $handle
    .on('touchstart', function(e){
        // console.log(e.touches);
        // console.log(e.targetTouches);
        // console.log(e.changedTouches);
        touches = e.targetTouches;

        initLastPos($handle);
        updateLastTouchPos(touches);
        isStartDrag = true;
        e.preventDefault();
    })
    .on('touchmove', function(e){
        touches = e.targetTouches;
        updateTouchOffset(touches);

        updateLastTouchPos(touches);
        updatePos($handle, touchOffset);
        e.preventDefault();
    })
    .on('touchend', function(e){
        touches = e.changedTouches;
        isStartDrag = false;
        e.preventDefault();
    });

    timer && clearInterval(timer);
    timer = setInterval(function(){
        if(touches != undefined 
            && isStartDrag){
            showTouchInfo(touches);
        }
    }, 20);

}


function showTouchInfo(touches){
    var tmp = [],
        touch = touches[0];

    tmp.push('<table>');
    tmp.push(getInfoLine('screenX', touch.screenX));
    tmp.push(getInfoLine('screenY', touch.screenY));
    tmp.push(getInfoLine('clientX', touch.clientX));
    tmp.push(getInfoLine('clientY', touch.clientY));
    tmp.push(getInfoLine('pageX', touch.pageX));
    tmp.push(getInfoLine('pageY', touch.pageY));
    tmp.push(getInfoLine('identifier', touch.identifier));
    tmp.push('</table>');

    $('#info').html(tmp.join(''));
}

function getInfoLine(key, value){
    return [
        '<tr>'
            , '<td>' + key + '</td>'
            , '<td>' + value + '</td>'
        , '</tr>'
    ].join('');
}

function initLastPos($handle){
    lastPos.top = parseInt( $handle.css('top') ) || 0;
    lastPos.left = parseInt( $handle.css('left') ) || 0;
}

function updatePos($handle, touchOffset){
    lastPos.top += touchOffset.y;
    lastPos.left += touchOffset.x;

    $handle.css({
        top: lastPos.top + 'px'
        , left: lastPos.left + 'px'
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

return enableTouchDrag;

})();

enableTouchDrag('.point1');
enableTouchDrag('.point2');
enableTouchDrag('.point3');

$(function(){
    setTimeout(function(){
        window.scrollTo(0, 100);
    }, 1000);
});
