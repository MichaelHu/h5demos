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
            , enableCurrentLabel: true
            , enableLastLabel: true
            , enableFPS: true

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
            , labelTextAlign: 'center' 
            , labelTextBaseline: 'top'
            , labelFillStyle: '#e0e0e0'
            , labelPaddingTop: 8 

            // current label
            , currentLabelFont: 'normal normal 28px Arial'
            , currentLabelTextAlign: 'center'
            , currentLabelFillStyle: '#ffffff'
            , currentLabelOffsetY: -20 
            , currentLabelThreshold: 28 + 20

            // last label
            , lastLabelFont: 'normal normal 28px Arial'
            , lastLabelTextAlign: 'center'
            , lastLabelBackgroundColor: '#ffffff'
            , lastLabelFillStyle: 'rgba(0,0,0,0.4)'
            , lastLabelOffsetY: -30 
            , lastLabelThreshold: 28 + 30
            , lastLabelPaddingHorizontal: 6  
            , lastLabelPaddingVertical: 6  
            , lastLabelHeight: 40

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

        // make sure intersect is visible
        opt._offsetX = opt.initOffsetX;

        opt._currentPoint = 0;
        opt._currentPointThreshold = parseInt( opt.step / 2 );


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
