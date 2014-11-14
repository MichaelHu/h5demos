(function(){


$(function(){


window.scrollTo(0, 0);
// setTimeout(fullfill, 1000);
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

        $item.append([
            '<h3>'
            , 'lr-anim: ' + $item.data('lr-anim')
            , '<br>ub-anim: ' + $item.data('ub-anim')
            , '</h3>'
        ].join(''));

        if(index === 0){
            $item.show();
        }
    });

    $('body').on('touchmove', function(e){
        e.preventDefault();
    });

    $('.slide').on('swipeUp swipeLeft', function(e){

        e.stopPropagation();

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

            animType = ('swipeUp' == type ? 'ub' : 'lr');

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


    $('.slide').on('swipeDown swipeRight', function(e){

        e.stopPropagation();

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

        , 'scaledown-move-left-right': {
            '0': ['pt-page-scaleDown', 'pt-page-moveFromLeft pt-page-ontop']
            , '180': ['pt-page-scaleDown', 'pt-page-moveFromRight pt-page-ontop']
        }

        , 'move-left-right-scaleup': {
            '0': ['pt-page-moveToRight pt-page-ontop', 'pt-page-scaleUp']
            , '180': ['pt-page-moveToLeft pt-page-ontop', 'pt-page-scaleUp']
        }

        , 'rotate-move-left-right': {
            '0': ['pt-page-rotateLeftSideFirst', 'pt-page-moveFromLeft pt-page-delay200 pt-page-ontop']
            , '180': ['pt-page-rotateRightSideFirst', 'pt-page-moveFromRight pt-page-delay200 pt-page-ontop']
        }

        , 'flip-left-right': {
            '0': ['pt-page-flipOutRight', 'pt-page-flipInLeft pt-page-delay500']
            , '180': ['pt-page-flipOutLeft', 'pt-page-flipInRight pt-page-delay500']
        }

        , 'rotatepush-left-right': {
            '0': ['pt-page-rotatePushRight', 'pt-page-moveFromLeft']
            , '180': ['pt-page-rotatePushLeft', 'pt-page-moveFromRight']
        }

        , 'rotatepush-rotatepull': {
            '0': ['pt-page-rotatePushRight', 'pt-page-rotatePullLeft pt-page-delay180']
            , '90': ['pt-page-rotatePushTop', 'pt-page-rotatePullBottom pt-page-delay180']
            , '180': ['pt-page-rotatePushLeft', 'pt-page-rotatePullRight pt-page-delay180']
            , '270': ['pt-page-rotatePushBottom', 'pt-page-rotatePullTop pt-page-delay180']
        }








        , 'scaledown-scaleupdown': {
            '0': ['pt-page-scaleDown', 'pt-page-scaleUpDown pt-page-delay300']
            , '90': ['pt-page-scaleDown', 'pt-page-scaleUpDown pt-page-delay300']
            , '180': ['pt-page-scaleDown', 'pt-page-scaleUpDown pt-page-delay300']
            , '270': ['pt-page-scaleDown', 'pt-page-scaleUpDown pt-page-delay300']
            , '180': ['pt-page-scaleDownUp', 'pt-page-scaleUp pt-page-delay300']
        }

        , 'scaledownup-scaleup': {
            '0': ['pt-page-scaleDownUp', 'pt-page-scaleUp pt-page-delay300']
            , '90': ['pt-page-scaleDownUp', 'pt-page-scaleUp pt-page-delay300']
            , '180': ['pt-page-scaleDownUp', 'pt-page-scaleUp pt-page-delay300']
            , '270': ['pt-page-scaleDownUp', 'pt-page-scaleUp pt-page-delay300']
        }

        , 'scaledowncenter-scaleupcenter': {
            '0': ['pt-page-scaleDownCenter', 'pt-page-scaleUpCenter pt-page-delay400']
            , '90': ['pt-page-scaleDownCenter', 'pt-page-scaleUpCenter pt-page-delay400']
            , '180': ['pt-page-scaleDownCenter', 'pt-page-scaleUpCenter pt-page-delay400']
            , '270': ['pt-page-scaleDownCenter', 'pt-page-scaleUpCenter pt-page-delay400']
        }

        , 'rotatefall-scaleup': {
            '0': ['pt-page-rotateFall pt-page-ontop', 'pt-page-scaleUp']
            , '90': ['pt-page-rotateFall pt-page-ontop', 'pt-page-scaleUp']
            , '180': ['pt-page-rotateFall pt-page-ontop', 'pt-page-scaleUp']
            , '270': ['pt-page-rotateFall pt-page-ontop', 'pt-page-scaleUp']
        }

        , 'rotatenewspaper': {
            '0': ['pt-page-rotateOutNewspaper', 'pt-page-rotateInNewspaper pt-page-delay500']
            , '90': ['pt-page-rotateOutNewspaper', 'pt-page-rotateInNewspaper pt-page-delay500']
            , '180': ['pt-page-rotateOutNewspaper', 'pt-page-rotateInNewspaper pt-page-delay500']
            , '270': ['pt-page-rotateOutNewspaper', 'pt-page-rotateInNewspaper pt-page-delay500']
        }

        , 'rotatefold-movefade': {
            '0': ['pt-page-rotateFoldRight', 'pt-page-moveFromLeftFade']
            , '90': ['pt-page-rotateFoldTop', 'pt-page-moveFromBottomFade']
            , '180': ['pt-page-rotateFoldLeft', 'pt-page-moveFromRightFade']
            , '270': ['pt-page-rotateFoldBottom', 'pt-page-moveFromTopFade']
        }

        , 'movefade-rotateunfold': {
            '0': ['pt-page-moveToRightFade', 'pt-page-rotateUnfoldLeft']
            , '90': ['pt-page-moveToTopFade', 'pt-page-rotateUnfoldBottom']
            , '180': ['pt-page-moveToLeftFade', 'pt-page-rotateUnfoldRight']
            , '270': ['pt-page-moveToBottomFade', 'pt-page-rotateUnfoldTop']
        }

        , 'rotateroom': {
            '0': ['pt-page-rotateRoomRightOut pt-page-ontop', 'pt-page-rotateRoomRightIn']
            , '90': ['pt-page-rotateRoomTopOut pt-page-ontop', 'pt-page-rotateRoomTopIn']
            , '180': ['pt-page-rotateRoomLeftOut pt-page-ontop', 'pt-page-rotateRoomLeftIn']
            , '270': ['pt-page-rotateRoomBottomOut pt-page-ontop', 'pt-page-rotateRoomBottomIn']
        }

        , 'rotatecube': {
            '0': ['pt-page-rotateCubeRightOut pt-page-ontop', 'pt-page-rotateCubeRightIn']
            , '90': ['pt-page-rotateCubeTopOut pt-page-ontop', 'pt-page-rotateCubeTopIn']
            , '180': ['pt-page-rotateCubeLeftOut pt-page-ontop', 'pt-page-rotateCubeLeftIn']
            , '270': ['pt-page-rotateCubeBottomOut pt-page-ontop', 'pt-page-rotateCubeBottomIn']
        }

        , 'rotatecarousel': {
            '0': ['pt-page-rotateCarouselRightOut pt-page-ontop', 'pt-page-rotateCarouselRightIn']
            , '90': ['pt-page-rotateCarouselTopOut pt-page-ontop', 'pt-page-rotateCarouselTopIn']
            , '180': ['pt-page-rotateCarouselLeftOut pt-page-ontop', 'pt-page-rotateCarouselLeftIn']
            , '270': ['pt-page-rotateCarouselBottomOut pt-page-ontop', 'pt-page-rotateCarouselBottomIn']
        }

        , 'rotateslide': {
            '0': ['pt-page-rotateSlideOut', 'pt-page-rotateSlideIn']
            , '90': ['pt-page-rotateSlideOut', 'pt-page-rotateSlideIn']
            , '180': ['pt-page-rotateSlideOut', 'pt-page-rotateSlideIn']
            , '270': ['pt-page-rotateSlideOut', 'pt-page-rotateSlideIn']
        }

        , 'rotateslide-delay': {
            '0': ['pt-page-rotateSlideOut', 'pt-page-rotateSlideIn pt-page-delay200']
            , '90': ['pt-page-rotateSlideOut', 'pt-page-rotateSlideIn pt-page-delay200']
            , '180': ['pt-page-rotateSlideOut', 'pt-page-rotateSlideIn pt-page-delay200']
            , '270': ['pt-page-rotateSlideOut', 'pt-page-rotateSlideIn pt-page-delay200']
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

        , 'scaledown-move-top-bottom': {
            '90': ['pt-page-scaleDown', 'pt-page-moveFromBottom pt-page-ontop']
            , '270': ['pt-page-scaleDown', 'pt-page-moveFromTop pt-page-ontop']
        }

        , 'move-top-bottom-scaleup': {
            '90': ['pt-page-moveToTop pt-page-ontop', 'pt-page-scaleUp']
            , '270': ['pt-page-moveToBottom pt-page-ontop', 'pt-page-scaleUp']
        }

        , 'rotate-move-top-bottom': {
            '90': ['pt-page-rotateBottomSideFirst', 'pt-page-moveFromBottom pt-page-delay200 pt-page-ontop']
            , '270': ['pt-page-rotateTopSideFirst', 'pt-page-moveFromTop pt-page-delay200 pt-page-ontop']
        }

        , 'flip-top-bottom': {
            '90': ['pt-page-flipOutTop', 'pt-page-flipInBottom pt-page-delay500']
            , '270': ['pt-page-flipOutBottom', 'pt-page-flipInTop pt-page-delay500']
        }

        , 'rotatepush-top-bottom': {
            '90': ['pt-page-rotatePushTop', 'pt-page-moveFromBottom']
            , '270': ['pt-page-rotatePushBottom', 'pt-page-moveFromTop']
        }




    },
    isAnimating = false;





function switchPage($outPage, $inPage, animation, direction){

    var outClass = animations[animation][direction + ''][0],
        inClass = animations[animation][direction + ''][1],
        outPageEnd, inPageEnd,
        animationComplete;

    if(isAnimating ){
        return;
    }

    if(!$outPage.length || !$inPage.length){
        return;
    }
    
    isAnimating = true;
    animationComplete = false;
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


    // afterAnimation may not be called in case of fast swipe
    setTimeout(function(){
        if(!animationComplete){
            afterAnimation(1);
        }
    }, 2000);


    function beforeAnimation(){
    }


    function afterAnimation(isShowInfo){
        isAnimating = false;
        animationComplete = true;

        $outPage.hide()
            .attr('class', $outPage.data('original-classes'))
            .off('webkitAnimationEnd');

        $inPage
            .attr('class', $inPage.data('original-classes'))
            .off('webkitAnimationEnd');

        if(isShowInfo){
            // alert($outPage.index() + ', ' + $inPage.index());
        }

    }

}


});


})();
