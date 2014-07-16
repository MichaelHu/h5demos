var LineChart = (function($){




function _LineChart(options){
    this.init(options);
}


var fn = _LineChart.prototype;

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
            
            // cavas size
            , canvasWidth: 640
            , canvasHeight: 480

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
            , axisOpacity: 0.4
            , axisLineWidth: 1
            , axisStrokeStyle: '#f8f8f8'

            // grid
            , gridOpacity: 0.4
            , gridLineWidth: 1
            , gridStrokeStyle: '#f8f8f8'

            // intersect
            , intersectRadius: 8
            , intersectOpacity: 1
            , intersectLineWidth: 2
            , intersectStrokeStyle: '#ffffff'

            // lines
            , linesOpacity: 1
            , linesLineWidth: 2
            , linesStrokeStyle: '#ffffff'

            , data: []
            
            // Canvas Object
            , canvas: null 
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

        // data range
        opt.range = get_data_range(opt.data);
        me.fixRange();

        opt.ratio = opt.range.span 
            / ( opt.drawArea.h - opt.paddingTop - opt.paddingBottom ); 
        opt.step = ( opt.drawArea.w - opt.paddingLeft - opt.paddingRight ) 
            / ( opt.data.length - 1 );

        // init coordinates
        me.initCoordinates();

        me.initCanvas();
    }         

    , fixRange: function(){
        var me = this,
            opt = me.opt,
            span = opt.range.span;
        
        opt.range.span += span * opt.rangeExpand;
        opt.range.min -= span * opt.rangeExpand / 2;
    }

    , initCoordinates: function(){
        var me = this, opt = me.opt,
            X = opt.X = [],
            Y = opt.Y = [];
         
        for(var i=0,j=0; j<opt.data.length; i+=opt.step, j++){
            X.push(opt.drawArea.x + opt.paddingLeft + i + 0.5); 
            Y.push(
                opt.drawArea.y 
                + opt.drawArea.h 
                - opt.paddingBottom 
                - ( opt.data[j] - opt.range.min ) / opt.ratio 
            );
        }
    }

    , initCanvas: function(){
        var me = this, opt = me.opt; 

        opt.canvas
            .width(opt.canvasWidth)
            .height(opt.canvasHeight)
            .css({
                width: opt.canvasWidth / 2 + 'px'
                , height: opt.canvasHeight / 2 + 'px' 
            })
            ;
    }

    , drawBackground: function(){
        var me = this, opt = me.opt;

        if(!opt.enableBackground){
            return this;
        }

        opt.canvas.save()
            .globalAlpha(opt.backgroundOpacity)
            .fillStyle(opt.backgroundColor)
            .fillRect(
                opt.drawArea.x
                , opt.drawArea.y
                , opt.drawArea.w
                , opt.drawArea.h
            )
            .restore()
            ;

        return this;
    }

    , drawGrids: function(){
        var me = this, 
            opt = me.opt,
            canvas = opt.canvas,
            X = opt.X,
            Y = opt.Y;

        if(!opt.enableGrids){
            return this;
        }

        canvas.save()
            .globalAlpha(opt.gridOpacity)
            .lineWidth(opt.gridLineWidth)
            .strokeStyle(opt.gridStrokeStyle)
            ;

        for(var i=0; i<X.length; i++){
            canvas
                .moveTo(X[i] + 0.5, Y[i] + opt.intersectRadius + 0.5)
                .lineTo(
                    X[i] + 0.5
                    , opt.drawArea.y + opt.drawArea.h - opt.paddingBottom + 0.5
                )
                ;
        }

        canvas
            .stroke()
            .restore()
            ;

        return this;
    }

    , drawAxis: function(){
        var me = this, 
            opt = me.opt,
            canvas = opt.canvas,
            X = opt.X,
            Y = opt.Y;

        if(!opt.enableAxis){
            return this;
        }

        canvas.save()

            .globalAlpha(opt.axisOpacity)
            .lineWidth(opt.axisLineWidth)
            .strokeStyle(opt.axisStrokeStyle)

            .moveTo(
                opt.drawArea.x + opt.paddingLeft + 0.5
                , opt.drawArea.y + opt.paddingTop + 0.5
            )
            .lineTo(
                opt.drawArea.x + opt.paddingLeft + 0.5
                , opt.drawArea.y + opt.drawArea.h - opt.paddingBottom + 0.5
            )
            .lineTo(
                opt.drawArea.x + opt.drawArea.w - opt.paddingRight - 0.5
                , opt.drawArea.y + opt.drawArea.h - opt.paddingBottom + 0.5
            )

            .stroke()
            .restore()
            ;

        return this;
    }

    , drawIntersections: function(){
        var me = this, 
            opt = me.opt,
            canvas = opt.canvas,
            X = opt.X,
            Y = opt.Y;

        if(!opt.enableIntersect){
            return this;
        }

        canvas.save()
            .globalAlpha(opt.intersectOpacity)
            .lineWidth(opt.intersectLineWidth)
            .strokeStyle(opt.intersectStrokeStyle)
            ;

        for(var i=0; i<X.length; i++){
            canvas
                .beginPath()
                .moveTo(X[i]+opt.intersectRadius, Y[i])
                .arc(X[i], Y[i], opt.intersectRadius, 0, 2 * Math.PI, false)
                .closePath()
                .stroke()
                ;
        }
        canvas
            .restore()
            ;

        return this;
    }

    , drawLines: function(){
        var me = this, 
            opt = me.opt,
            canvas = opt.canvas,
            X = opt.X,
            Y = opt.Y;

        if(!opt.enableLines){
            return this;
        }

        canvas.save()
            .globalAlpha(opt.linesOpacity)
            .lineWidth(opt.linesLineWidth)
            .strokeStyle(opt.linesStrokeStyle)
            ;

        var fromCircle, toCircle, line, intersects,
            fromPoint = {x:0, y:0}, 
            toPoint = {x:0, y:0};

        for(var i=1; i<X.length; i++){
            fromCircle = {a: X[i-1], c: Y[i-1], r: opt.intersectRadius}; 
            toCircle = {a: X[i], c: Y[i], r: opt.intersectRadius}; 
            line = get_line_with_2points(
                {x: X[i-1], y: Y[i-1]}
                , {x: X[i], y: Y[i]}
            );

            intersects = get_intersect_between_line_and_circle(line, fromCircle); 

            if(intersects){
                fromPoint = intersects.length == 2
                    ? intersects[1] : intersects[0];
            }

            intersects = get_intersect_between_line_and_circle(line, toCircle); 

            if(intersects){
                toPoint = intersects[0];
            }

            canvas.beginPath()
                .moveTo(fromPoint.x, fromPoint.y)
                .lineTo(toPoint.x, toPoint.y)
                .stroke()
                ;

        }

        canvas.restore();
    
        return me;
    }

    , draw: function(){
        var me = this;
        
        me.drawBackground()
            .drawAxis()
            .drawGrids()
            .drawIntersections()
            .drawLines()
            ;
    } 

});


return _LineChart;


})(Zepto);
