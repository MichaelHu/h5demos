var LineChart = (function($){




function _LineChart(options){
    this.init(options);
}


var fn = _LineChart.fn
       = _LineChart.prototype;

$.extend(fn, {

    init: function(options){

        var me = this, opt,
            scale = window.devicePixelRatio || 1;

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
            , enableTrendDetect: false

            // drag
            , enableDrag: true
            , enableTouchTrace: true
            , dragAccelerate: 3
            
            // cavas size
            , scale: scale
            , canvasWidth: 320 * scale
            , canvasHeight: 240 * scale

            , step: 50 * scale

            // draw area margin
            , marginTop: 10 * scale 
            , marginRight: 10 * scale
            , marginBottom: 10 * scale
            , marginLeft: 10 * scale

            // draw area padding
            , paddingTop: 10 * scale
            , paddingRight: 10 * scale
            , paddingBottom: 10 * scale 
            , paddingLeft: 10 * scale

            // range
            , rangeExpand: 0.2

            // background
            , backgroundOpacity: 0.5
            , backgroundColor: '#7ea4b8'

            // axis
            , axisOpacity: 1
            , axisLineWidth: 1 * scale // no less than 2, hide while redraw otherwise
            , axisStrokeStyle: '#7591ac'

            // grid
            , gridOpacity: 0.4
            , gridLineWidth: 1 * scale
            , gridStrokeStyle: '#f8f8f8'

            // last-grid
            , lastGridOpacity: 1 
            , lastGridLineWidth: 1 * scale 
            , lastGridStrokeStyle: '#b2c4d5'
            , lastGridFootSize: 5 * scale

            // intersect
            , intersectRadius: 4 * scale
            , intersectOpacity: 1
            , intersectLineWidth: 1 * scale
            , intersectStrokeStyle: '#ffffff'

            // current point
            , currentPointOpacity: 0.5 
            , currentPointtLineWidth: 3 * scale 
            , currentPointStrokeStyle: '#ffffff' 
            , currentPointRadius: 5 * scale 
            , currentLabelOffsetY: -5 * scale

            // lines
            , linesOpacity: 1
            , linesLineWidth: 1 * scale
            , linesStrokeStyle: '#ffffff'

            // labels
            , labelFont: 'normal normal ' + ( 14 * scale ) + 'px Serif' 
            , labelOpacity: 0.4 
            , labelLastLableOpacity: 1
            , labelTextAlign: 'center' 
            , labelTextBaseline: 'top'
            , labelFillStyle: '#fffff'
            , labelPaddingTop: 4 * scale 

            // current value
            , currentValueFont: 'normal normal ' + ( 14 * scale ) + 'px Arial'
            , currentValueTextAlign: 'center'
            , currentValueFillStyle: '#ffffff'
            , currentValueOffsetY: -10 * scale 
            , currentValueThreshold: ( 14 + 10 ) * scale

            // last value
            , lastValueFont: 'normal normal ' + ( 14 * scale ) + 'px Arial'
            , lastValueTextAlign: 'center'
            , lastValueBackgroundColor: '#ffffff'
            , lastValueFillStyle: 'rgba(0,0,0,0.4)'
            , lastValueOffsetY: -15 * scale 
            , lastValueThreshold: ( 14 + 15 ) * scale
            , lastValuePaddingHorizontal: 3 * scale 
            , lastValuePaddingVertical: 3 * scale 
            , lastValueHeight: 20 * scale
            , lastValueMinWidth : 30 * scale

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

        if(opt.enableShowTail && opt.data.length > 1){
            opt._offsetX = opt.drawArea.w - opt.paddingLeft
                - opt.paddingRight - opt.step * ( opt.data.length - 1 ) - opt.step / 2;
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
