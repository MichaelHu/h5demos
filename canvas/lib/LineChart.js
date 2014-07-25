var LineChart = (function($){




function _LineChart(options){
    this.init(options);
}


var fn = _LineChart.fn
       = _LineChart.prototype;

$.extend(fn, {

    init: function(options){

        var me = this, opt;

        me.opt = {

            // component config
            enableGrids: true 
            , enableAxis: true
            , enableBackground: true
            , enableLines: true
            , enableIntersect: true
            , enableLabels: true
            , enableLastGrid: true
            , enableCurrentValue: true
            , enableLastValue: true
            , enableFPS: true
            , enableShowTail: false

            // drag
            , enableDrag: true
            , enableTouchTrace: true
            , dragAccelerate: 3
            
            // cavas size
            , canvasWidth: 640
            , canvasHeight: 480

            , step: 100

            // draw area margin
            , marginTop: 20 
            , marginRight: 20
            , marginBottom: 20 
            , marginLeft: 20

            // draw area padding
            , paddingTop: 20
            , paddingRight: 20
            , paddingBottom: 20 
            , paddingLeft: 20

            // range
            , rangeExpand: 0.2

            // background
            , backgroundOpacity: 0.5
            , backgroundColor: '#7ea4b8'

            // axis
            , axisOpacity: 1
            , axisLineWidth: 2 // no less than 2, hide while redraw otherwise
            , axisStrokeStyle: '#7591ac'

            // grid
            , gridOpacity: 0.4
            , gridLineWidth: 2
            , gridStrokeStyle: '#f8f8f8'

            // last-grid
            , lastGridOpacity: 1 
            , lastGridLineWidth: 2 
            , lastGridStrokeStyle: '#b2c4d5'
            , lastGridFootSize: 10

            // intersect
            , intersectRadius: 8
            , intersectOpacity: 1
            , intersectLineWidth: 2
            , intersectStrokeStyle: '#ffffff'

            // current point
            , currentPointOpacity: 0.5 
            , currentPointtLineWidth: 6 
            , currentPointStrokeStyle: '#ffffff' 
            , currentPointRadius: 10 
            , currentLabelOffsetY: -10

            // lines
            , linesOpacity: 1
            , linesLineWidth: 2
            , linesStrokeStyle: '#ffffff'

            // labels
            , labelFont: 'normal normal 28px Serif' 
            , labelOpacity: 0.4 
            , labelLastLableOpacity: 1
            , labelTextAlign: 'center' 
            , labelTextBaseline: 'top'
            , labelFillStyle: '#fffff'
            , labelPaddingTop: 8 

            // current value
            , currentValueFont: 'normal normal 28px Arial'
            , currentValueTextAlign: 'center'
            , currentValueFillStyle: '#ffffff'
            , currentValueOffsetY: -20 
            , currentValueThreshold: 28 + 20

            // last value
            , lastValueFont: 'normal normal 28px Arial'
            , lastValueTextAlign: 'center'
            , lastValueBackgroundColor: '#ffffff'
            , lastValueFillStyle: 'rgba(0,0,0,0.4)'
            , lastValueOffsetY: -30 
            , lastValueThreshold: 28 + 30
            , lastValuePaddingHorizontal: 6  
            , lastValuePaddingVertical: 6  
            , lastValueHeight: 40

            , data: []
            , labels: []
            
            // Canvas Object
            , canvas: null 

            // offset between line chart start point and canvas start point
            , initOffsetX: 0 

            // do not draw on hidden area, it's a speedup config item
            , noDrawHiddenArea: true
        };

        opt = me.opt;

        $.extend(opt, options);

        // check error
        if(!opt.data
            || !opt.data.length ){
            throw new Error('opt.data should be supplied');
        }

        if(!opt.canvas){
            opt.canvas = new Canvas(
                    $('<canvas/>').appendTo('body')
                );
        }
        else if(!opt.canvas instanceof Canvas){
            throw new Error('opt.canvas should be an instance of Canvas');
        }


        // chart background
        opt.drawArea = {
            x: opt.marginLeft
            , y: opt.marginTop
            , w: opt.canvasWidth - opt.marginLeft - opt.marginRight
            , h: opt.canvasHeight - opt.marginTop - opt.marginBottom
        };

        if(opt.enableShowTail){
            opt._offsetX = opt.drawArea.w - opt.step * opt.data.length;
            opt._currentPoint 
                = 1 + Math.abs( parseInt( ( opt._offsetX - opt.initOffsetX) / opt.step ) );
        }
        else{
            // make sure intersect is visible
            opt._offsetX = opt.initOffsetX;
            opt._currentPoint = 0;
        }

        opt._currentPointThreshold = parseInt( opt.step / 2 );


        // data range
        opt.range = get_data_range(opt.data);
        me.fixRange();

        opt.ratio = opt.range.span 
            / ( opt.drawArea.h - opt.paddingTop - opt.paddingBottom ); 

        /*
        opt.step = ( opt.drawArea.w - opt.paddingLeft - opt.paddingRight ) 
            / ( opt.data.length - 1 );
        */

        me.initCanvas();
    }         

    , fixRange: function(){
        var me = this,
            opt = me.opt,
            span = opt.range.span;
        
        opt.range.span += span * opt.rangeExpand;
        opt.range.min -= span * opt.rangeExpand / 2;
    }


});


return _LineChart;


})(Zepto);
