var $cont_1 = $('#cont_1');
var $title_1 = $('#title_1');
var $cont_inner_1 = $('#cont_inner_1');
var $title_inner_1 = $('#title_inner_1');

var $cont_2 = $('#cont_2');
var $title_2 = $('#title_2');
var $cont_inner_2 = $('#cont_inner_2');
var $title_inner_2 = $('#title_inner_2');

var els = [
        $cont_1
        , $title_1
        , $cont_inner_1
        , $title_inner_1
        , $cont_2
        , $title_2
        , $cont_inner_2
        , $title_inner_2
    ];

function getInfo($el){
    return [
        '<div style="display:inline-block; width: 160px;">' + $el.selector + '</div>'
        , $el.css('display')
        , getRealDisplayInfo($el.get(0))
    ].join(' : ');
}

function displayInfo(){
    var info = [];
    $.each(els, function(index, item){
        info.push(getInfo(item)); 
    });
    $('#output').html(info.join('<br>'));
}

function getRealDisplayInfo(el){
    var $el = $(el), el = $el.get(0);
    if($el.css('display') == 'none'){
        return 'none';
    }

    var p, c;
    c = el, p = c.parentNode;
    while(p && p.nodeType == 1){
        if(p.style.display == 'none'){
            return 'none';
        }
        c = p;
        p = c.parentNode;
    }
    return $el.css('display');
}

displayInfo();

$('#control_panel').on('click', function(e){
    var target = e.target;
    if(target && target.tagName == 'INPUT'){
        var $el = $('#' + target.id.match(/for_(.+)/)[1]);
        $el.toggle(target.checked);
        displayInfo();
    }
});


