(function(){


$(function(){


window.scrollTo(0, 0);
setTimeout(fullfill, 1000);
init();
// $(window).on('scroll', fullfill);

function fullfill(){
    $('.slide').height($(window).height());
}

function init(){
    $('.slide').each(function(index, item){
        var $item = $(item);
        $item.data(
            'original-classes'
            , $item.attr('class')
        );

        if(index === 0){
            $item.show();
        }
    });

    $('body').on('swipeUp swipeLeft', function(e){
        var $target = $(e.target),
            $slides = $('.slide'),
            $cur = $target.closest('.slide'),
            $next = null,
            curPos = $cur.index(),
            total = $slides.size(),
            type = e.type,
            curAnimations,
            nextAnimations,
            animType
            ;

        if(curPos < total - 1){
            $next = $slides.eq(curPos + 1); 
        }

        if($next){

            curAnimations = {
                'lr': $cur.data('lr-anim')
                , 'ub': $cur.data('ub-anim')
            };

            nextAnimations = {
                'lr': $next.data('lr-anim')
                , 'ub': $next.data('ub-anim')
            };

            console.log(curAnimations);
            animType = ('swipeUp' == type ? 'ub' : 'lr');
            console.log(animType);

            switchPage(
                $cur
                , $next
                , curAnimations[animType] 
                    || nextAnimations[animType] 
                , 'swipeUp' == type 
                    ? 90 
                    : 180 
            );
        }
    });


    $('body').on('swipeDown swipeRight', function(e){

        var $target = $(e.target),
            $slides = $('.slide'),
            $cur = $target.closest('.slide'),
            $next = null,
            curPos = $cur.index(),
            total = $slides.size(),
            type = e.type,
            curAnimations,
            nextAnimations,
            animType
            ;

        if(curPos > 0){
            $next = $slides.eq(curPos - 1); 
        }

        if($next){

            curAnimations = {
                'lr': $cur.data('lr-anim')
                , 'ub': $cur.data('ub-anim')
            };

            nextAnimations = {
                'lr': $next.data('lr-anim')
                , 'ub': $next.data('ub-anim')
            };

            console.log(curAnimations);

            animType = ('swipeDown' == type ? 'ub' : 'lr');

            switchPage(
                $cur
                , $next
                , curAnimations[animType] 
                    || nextAnimations[animType] 
                , 'swipeDown' == type 
                    ? 270 
                    : 0 
            );

        }
    });


}



var animations = {

        'move-left-right': {
            '0': ['pt-page-moveToRight', 'pt-page-moveFromLeft']
            , '180': ['pt-page-moveToLeft', 'pt-page-moveFromRight']
        }

        , 'fade-move-left-right': {
            '0': ['pt-page-fade', 'pt-page-moveFromLeft pt-page-ontop']
            , '180': ['pt-page-fade', 'pt-page-moveFromRight pt-page-ontop']
        }

        , 'move-left-right-fade': {
            '0': ['pt-page-moveToRightFade', 'pt-page-moveFromLeftFade']
            , '180': ['pt-page-moveToLeftFade', 'pt-page-moveFromRightFade']
        }

        , 'move-left-right-easing': {
            '0': ['pt-page-moveToRightEasing pt-page-ontop', 'pt-page-moveFromLeft']
            , '180': ['pt-page-moveToLeftEasing pt-page-ontop', 'pt-page-moveFromRight']
        }









        , 'move-top-bottom': {
            '90': ['pt-page-moveToTop', 'pt-page-moveFromBottom']
            , '270': ['pt-page-moveToBottom', 'pt-page-moveFromTop']
        }

        , 'fade-move-top-bottom': {
            '90': ['pt-page-fade', 'pt-page-moveFromBottom pt-page-ontop']
            , '270': ['pt-page-fade', 'pt-page-moveFromTop pt-page-ontop']
        }

        , 'move-top-bottom-fade': {
            '90': ['pt-page-moveToTopFade', 'pt-page-moveFromBottomFade']
            , '270': ['pt-page-moveToBottomFade', 'pt-page-moveFromTopFade']
        }

        , 'move-top-bottom-easing': {
            '90': ['pt-page-moveToTopEasing pt-page-ontop', 'pt-page-moveFromBottom']
            , '270': ['pt-page-moveToBottomEasing pt-page-ontop', 'pt-page-moveFromTop']
        }

    },
    isAnimating = false;





function switchPage($outPage, $inPage, animation, direction){

    console.log(animation);
    console.log(direction);

    var outClass = animations[animation][direction + ''][0],
        inClass = animations[animation][direction + ''][1],
        outPageEnd, inPageEnd;

    if(isAnimating){
        return;
    }
    
    isAnimating = true;
    outPageEnd = inPageEnd = false;

    $outPage.addClass(outClass)
        .on('webkitAnimationEnd', function(e){
            outPageEnd = true;
            if(inPageEnd){
                afterAnimation();
            } 
        });

    $inPage.addClass(inClass)
        .show()
        .on('webkitAnimationEnd', function(e){
            inPageEnd = true;
            if(outPageEnd){
                afterAnimation();
            } 
        });

    function beforeAnimation(){
    }

    function afterAnimation(){
        $outPage.hide()
            .attr('class', $outPage.data('original-classes'))
            .off('webkitAnimationEnd');

        $inPage
            .attr('class', $inPage.data('original-classes'))
            .off('webkitAnimationEnd');

        isAnimating = false;
    }

}


});


})();
