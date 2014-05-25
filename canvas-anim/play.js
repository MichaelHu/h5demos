/**
 * @param frames Array
 *    [
 *        {
 *            delay: 100
 *            , handler: function(){...} 
 *        }
 *    ]
 */
function play(frames, isLoop){

(function(){

    var currentIndex = 0;

    play_frame();

    function play_frame(){
        var frame = frames[currentIndex]; 

        if(!frame){
            return;
        }

        if(frame.delay){
            setTimeout(function(){
                execute();
            }, frame.delay);
        }
        else{
            execute();
        }

        function execute(){
            frame.handler
                && frame.handler();
            if(increase_index()){
                play_frame();
            }
        }

    }

    function increase_index(){
        var len = frames.length;

        if(isLoop){
            if(len){
                currentIndex = ( currentIndex + 1 ) % len;
                return true;
            }
            return false;
        }

        if(currentIndex < frames.length - 1
            && currentIndex >= -1){
            currentIndex++;
            return true;
        }
        return false;
    }

})(); 

}
