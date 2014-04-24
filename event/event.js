(function(){



var events = 'touchstart touchend mousedown mouseup keydown keyup click';
// var events = 'touchstart click';


$('#desktop')
    .on(events, function(e){
        var me = this, 
            $me = $(this),
            oldBackgroundColor = $me.css('background-color'),
            $info = $me.children('b'),
            $span = $me.children('span');

        processEvent(e, $span, $info);
        processState($me, 'red', oldBackgroundColor);

    });

$('#box')
    .on(events, function(e){
        var me = this, 
            $me = $(this),
            oldBackgroundColor = $me.css('background-color'),
            $info = $me.children('b'),
            $span = $me.children('span');

        processEvent(e, $span, $info);
        processState($me, 'yellow', oldBackgroundColor);
    });


$('#book')
    .on(events, function(e){
        var me = this, 
            $me = $(this),
            oldBackgroundColor = $me.css('background-color'),
            $info = $me.children('b'),
            $span = $me.children('span');

        processEvent(e, $span, $info);
        processState($me, 'blue', oldBackgroundColor);
    });

$('#pen')
    .on(events, function(e){
        var me = this, 
            $me = $(this),
            oldBackgroundColor = $me.css('background-color'),
            $info = $me.children('b'),
            $span = $me.children('span');

        processEvent(e, $span, $info);
        processState($me, 'orange', oldBackgroundColor);
    });

$('#hidden_pen')
    .on(events, function(e){
        var me = this, 
            $me = $(this),
            oldBackgroundColor = $me.css('background-color'),
            $info = $me.children('b'),
            $span = $me.children('span'),
            $delay = $span.children('input[name=delay]');

        setTimeout(
            function(){
                $me.hide();
            }
            , $delay[0].checked ? 300 : 0
        );

        processEvent(e, $span, $info);
        processState($me, 'purple', oldBackgroundColor);
    });


$('span').on(events, function(e){
    e.stopPropagation();
});

$('input[name=pierce]').on('click', function(){
    $('#hidden_pen').toggle();
});




function processEvent(e, $span, $info){
    if($span.find('input[name=prevent]').length
        && $span.find('input[name=prevent]')[0].checked){
        e.preventDefault();
    }

    if($span.find('input[name=stop]').length
        && $span.find('input[name=stop]')[0].checked){
        e.stopPropagation();
    }

    $info.html(
        $info.html() 
        + ' ' 
        + e.type
        + '_'
        + e.timeStamp % 10000
    );
}

function processState($cont, color, oldColor){
    if($cont.data('active')){
        return;
    }
    $cont.data('active', 1);

    $cont.css('background-color', color);
    setTimeout(function(){
        $cont.css('background-color', oldColor);
        $cont.data('active', null);
    }, 200);
}


})();
