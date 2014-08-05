function get_line_with_2points(p1, p2){

    var line = {};    

    if(p1.x - p2.x != 0){
        line.k = (p2.y - p1.y) / (p2.x - p1.x);
        line.b = p1.y - line.k * p1.x;
    }
    else{
        return null;
    }

    return line;

}

function get_line_with_point_and_gradient(p1, k){
    var line = {}; 
    
    line.k = k;
    line.b = p1.y - line.k * p1.x;
} 

function get_distance_between_2points(p1, p2){
    return Math.sqrt(
            Math.pow(p2.y - p1.y, 2)
            + Math.pow(p2.x - p1.x, 2)
        );
}

/**
 * |- line: y = kx + b
 * |- circle: (x - a)^2 + (y - c)^2 = r^2
 * 
 * (1 + k^2)x^2 + 2(bk - ck -a)x + a^2 + b^2 + c^2 - 2bc - r^2 = 0
 * 
 * A = 1 + k^2
 * B = 2(bk - ck -a)
 * C = a^2 + b^2 + c^2 - 2bc - r^2
 * 
 * if B^2 - 4AC > 0
 * x1 = ( -B + sqrt(B^2 - 4AC) ) / 2A 
 * x2 = ( -B - sqrt(B^2 - 4AC) ) / 2A 
 * y1 = kx1 + b
 * y2 = kx2 + b
 * 
 * if B^2 - 4AC = 0
 * x1 = x2 = -B / 2A
 * y1 = y2 = kx1 + b
 * 
 * if B^2 - 4AC < 0
 * no result
 */
function get_intersect_between_line_and_circle(line, circle){
    var points = [],
        k = line.k,
        b = line.b,
        a = circle.a,
        c = circle.c,
        r = circle.r, 

        A = 1 + k * k,
        B = 2 * ( b * k - c * k - a ),
        C = a * a + b * b + c * c - 2 * b * c - r * r,

        delta = B * B - 4 * A * C,
        x1, y1, x2, y2,

        sqrt = Math.sqrt,
        pow = Math.pow
        ;
         
    if( delta > 0 ){
        x1 = ( -B - sqrt( delta ) ) / ( 2 * A ); 
        y1 = k * x1 + b;

        x2 = ( -B + sqrt( delta ) ) / ( 2 * A ); 
        y2 = k * x2 + b;

        points.push({x: x1, y: y1});
        points.push({x: x2, y: y2});
    }
    else if( delta == 0 ){
        x1 = -B / ( 2 * A );
        y1 = k * x1 + b;
        points.push({x: x1, y: y1});
    }
    else{
        return null;
    }

    return points;
}


function get_data_range(data){
    var range = {}, min, max;
    
    for(var i=0; i<data.length; i++){
        if(0 == i){
            min = max = data[i];
        }
        else{
            if(data[i] < min){
                min = data[i];
            } 
            if(data[i] > max){
                max = data[i];
            }
        }
    }

    if(data.length){
        range.min = min;
        range.span = max - min;

        // especially when span is zero
        if(range.span == 0){
            range.min -= 50;
            range.max += 50;
            range.span = 100; 
        }
    }
    else{
        throw new Error('get_data_range: data can not be empty');
    }

    return range;
}

var Canvas = (function($){



var fn = function(c){
    if( 'string' == typeof c){
        c = $(c);
    }

    c = $(c)[0];

    if (!c 
        || !c['tagName'] 
        || c['tagName'].toLowerCase() != 'canvas'){
        throw new Error("there not a canvas element");
    }

    this.canvas = c;
    this.ctx = this.canvas.getContext("2d");
};

fn.prototype = {


    /**
     * getter
     */
    getContext: function(){
        return this.ctx;
    }

    ,getTextWidth: function(text){
        return this.ctx.measureText(text).width;
    }

    ,getWidth: function(){
        return this.canvas.width;
    }

    ,getHeight: function(){
        return this.canvas.height;
    }





    /**
     * stroke style
     */
    , strokeStyle: function(s){
        if(s){
            this.ctx.strokeStyle = s;
        } 
        return this;
    }

    /**
     * fill style
     */
    , fillStyle: function(s){
        if(s){
            this.ctx.fillStyle = s;
        } 
        return this;
    }



    /**
     * line style
     */
    , lineCap: function(lc){
        /**
         * butt (default) , round, square
         */
        if(lc){
            this.ctx.lineCap = lc;
        }
        return this;
    }

    , lineJoin: function(lj){
        /**
         * milter (default) , bevel, round
         * 尖角，斜角，圆角
         */
        if(lj){
            this.ctx.lineJoin = lj;
        }
        return this;
    }

    , lineWidth: function(lw){
        if(typeof lw == 'number'){
            this.ctx.lineWidth = lw;
        }
        return this;
    }


    /**
     * rect
     */
    , rect: function(x, y, width, height){
        this.ctx.rect(x, y, width, height);
        return this;
    } 

    , fillRect: function(x, y, width, height){
        this.ctx.fillRect(x, y, width, height);
        return this;
    } 

    , strokeRect: function(x, y, width, height){
        this.ctx.strokeRect(x, y, width, height);
        return this;
    } 

    , clearRect: function(x, y, width, height){
        this.ctx.clearRect(x, y, width, height);
        return this;
    } 



    /**
     * path
     */
    , fill: function(){
        this.ctx.fill();
        return this;
    } 

    , stroke: function(){
        this.ctx.stroke();
        return this;
    } 

    , beginPath: function(){
        this.ctx.beginPath();
        return this;
    } 

    , closePath: function(){
        this.ctx.closePath();
        return this;
    } 

    ,moveTo: function(x, y){
        this.ctx.moveTo(x, y);
        return this;
    }

    ,lineTo: function(x, y){
        this.ctx.lineTo(x, y);
        return this;
    }

    ,clip: function(){
        this.ctx.clip();
        return this;
    }

    ,arc: function(x, y, r, sAngle, eAngle, counterclickwise){
        this.ctx.arc(x, y, r, sAngle, eAngle, counterclickwise);
        return this;
    }

    ,quadraticCurveTo: function(cpx, cpy, x, y){
        this.ctx.quadraticCurveTo(cpx, cpy, x, y);
        return this;
    }

    ,bezierCurveTo: function(cp1x, cp1y, cp2x, cp2y, x, y){
        this.ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
        return this;
    }

    ,arcTo: function(x1, y1, x2, y2, r){
        this.ctx.arcTo(x1, y1, x2, y2, r);
        return this;
    }

    ,isPointInPath: function(x, y){
        this.ctx.isPointInPath(x, y);
        return this;
    }




    /**
     * transform of axis
     */
    ,scale: function(scaleWidth, scaleHeight){
        this.ctx.scale(scaleWidth, scaleHeight);
        return this;
    }

    ,rotate: function(angle){
        this.ctx.rotate(angle); 
        return this;
    }

    ,translate: function(x, y){
        this.ctx.translate(x, y);
        return this;
    }

    ,transform: function(a, b, c, d, e, f){
        /** 
         * a c e   x   ax+cy+ez
         * b d f * y = bx+dy+fz
         * 0 0 1   z   z
         */ 
        this.ctx.transform(a, b, c, d, e, f);
        return this;
    }

    ,setTransform: function(a, b, c, d, e, f){
        this.ctx.setTransform(a, b, c, d, e, f);
        return this;
    }


    /**
     * text
     */
    ,font: function(cssFont){
        this.ctx.font = cssFont;
        return this;
    }
    
    ,textAlign: function(align){
        // start (default), end, center, left, right
        this.ctx.textAlign = align;
        return this;
    }

    ,textBaseline: function(align){
        // alphabetic (default), top, hanging, middle, ideographic, bottom 
        this.ctx.textBaseline = align;
        return this;
    }


    ,fillText: function(text, x, y, maxWidth){
        this.ctx.fillText(text, x, y, maxWidth || this.getTextWidth(text));
        return this;
    }

    ,strokeText: function(text, x, y, maxWidth){
        this.ctx.strokeText(text, x, y, maxWidth);
        return this;
    }




    /**
     * composite
     */
    ,globalAlpha: function(alpha){
        // 0.0 ~ 1.0
        this.ctx.globalAlpha = alpha;
        return this;
    }

    ,globalCompositeOperation: function(gco){
        // source-over (default), destination-over
        this.ctx.globalCompositeOperation = gco;
        return this;
    }




    /**
     * canvas state, includes: 
     * 1. The current transformation matrix.
     * 2. The current clipping region.
     * 3. The current values of the following attributes: strokeStyle, fillStyle, globalAlpha, lineWidth, lineCap, lineJoin, miterLimit, shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor, globalCompositeOperation, font, textAlign, textBaseline.
     */
    ,save: function(){
        this.ctx.save();
        return this;
    }

    ,restore: function(){
        this.ctx.restore();
        return this;
    }



    
    /**
     * size 
     * note: change width or height will clear canvas
     */
    ,width: function(w){
        if(w){
            this.canvas.width = w;
        }
        return this;
    }

    ,height: function(h){
        if(h){
            this.canvas.height = h;
        }
        return this;
    }

    ,css: function(){
        $.fn.css.apply($(this.canvas), arguments);
        return this;
    }


};


return fn; 


})(Zepto);

(function($){


$.extend(
    Canvas.prototype,
    {
        on: function(type, handler){
            $(this.canvas).on(type, handler); 
            return this;
        }

        ,off: function(type, handler){
            $(this.canvas).off(type, handler); 
            return this;
        }
    }
);


})(Zepto);

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
            , enableTrendDetect: false

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
            , lastValueMinWidth : 60 

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

LineChart.fn.initCanvas = function(){
    var me = this, opt = me.opt; 

    opt.canvas
        .width(opt.canvasWidth)
        .height(opt.canvasHeight)
        .css({
            width: opt.canvasWidth / 2 + 'px'
            , height: opt.canvasHeight / 2 + 'px' 
        })
        ;
};

LineChart.fn.initCoordinates = function(){
    var me = this, opt = me.opt,
        X = opt.X = [],
        Y = opt.Y = [];
     
    for(var i=0,j=0; j<opt.data.length; i+=opt.step, j++){
        X.push(opt.drawArea.x + opt.paddingLeft + i); 
        Y.push(
            opt.drawArea.y 
            + opt.drawArea.h 
            - opt.paddingBottom 
            - ( opt.data[j] - opt.range.min ) / opt.ratio 
        );

        // @note: console.log has strong impact on FPS 
        // console.log(X[j] + ',' + Y[j]);
    }

    for(var i=0; i<X.length; i++){
        X[i] += opt._offsetX;
    }

    return me;
};

LineChart.fn.draw = function(){
    var me = this,
        opt = me.opt;

    if(!me.isFakeDraw && !$.os.ios /* $.os.android is undefined on some Android devices */){
        me.isFakeDraw = true;
        /**
         * An no side effects draw, only make the real draw be executed in another thread 
         * it can solve problem occur on android 4.3 ( maybe not only ) webview, which
         * the first frame will stay on screen, even though you call canvas.clearRect().
         */
        me.fakeDraw();
        setTimeout(function(){
            me.draw();
        }, 10);
        return;
    }

    me.checkTime();
    
    if(me.isRedraw){
        opt.canvas
            .clearRect(
                0
                , 0
                , opt.canvasWidth
                , opt.canvasHeight
            )
            ;
    }

    me.initCoordinates()
        .drawBackground()
        .drawAxis()
        .drawGrids()
        .drawLastGrid()
        .drawLines()
        .drawIntersections()
        .drawLabels()
        .drawCurrentValue()
        .drawLastValue()
        .showFPS()

        .setupDrag()
        ;

    return;

    setTimeout(function(){
        opt._offsetX += 10;
        me.draw();
    }, 50);
};

/**
 * An no side effects draw, only make the real draw be executed in another thread 
 * it can solve problem occur on android 4.3 ( maybe not only ) webview, which
 * the first frame will stay on screen, even though you call canvas.clearRect().
 */
LineChart.fn.fakeDraw = function(){
    var me = this,
        opt = me.opt;

    opt.canvas
        .clearRect(
            0
            , 0
            , opt.canvasWidth
            , opt.canvasHeight
        )
        ;

};


LineChart.fn.redraw = function(options){
    var me = this,
        opt = me.opt;

    $.extend(opt, options);

    me.isFakeDraw = false;
    me.draw();
};


LineChart.fn.drawAxis = function(){
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

        .beginPath()
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
};


LineChart.fn.drawBackground = function(){
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
};

LineChart.fn.drawCurrentValue = function(){
    var me = this, 
        opt = me.opt,
        canvas = opt.canvas,
        X = opt.X,
        Y = opt.Y,
        T = opt.T,
        x,
        y,
        trend,
        i = opt._currentPoint,
        baseLine = 'bottom',
        offsetY = opt.currentValueOffsetY;
    
    if(!opt.enableCurrentValue
        || i == opt.data.length - 1){
        return me;
    }

    x = X[i];
    // x = opt.drawArea.x + opt.paddingLeft + 60;
    y = Y[i];
    if(T){
        trend = T[i]; 
    }

    if(opt.enableTrendDetect){
        if('inc' == trend){
            baseLine = 'top';
            offsetY *= -1;
        }
    }
    else{
        if(y - opt.drawArea.y - opt.paddingTop < opt.currentValueThreshold){
            baseLine = 'top';
            offsetY *= -1;
        } 
    }

    canvas
        .save()
        .beginPath()
        .rect(
            opt.drawArea.x + opt.paddingLeft
            , opt.drawArea.y + opt.paddingTop
            , opt.drawArea.w - opt.paddingLeft - opt.paddingRight
            , opt.drawArea.h - opt.paddingTop - opt.paddingBottom
        )
        .clip()
        .font(opt.currentValueFont)
        .textAlign(opt.currentValueTextAlign)
        .textBaseline(baseLine)
        .fillStyle(opt.currentValueFillStyle)
        .fillText(parseInt(opt.data[i]), x, y + offsetY)
        .restore();

    return me;
};


LineChart.fn.drawGrids = function(){
    var me = this, 
        opt = me.opt,
        canvas = opt.canvas,
        X = opt.X,
        Y = opt.Y;

    if(!opt.enableGrids){
        return this;
    }

    canvas.save()
        .beginPath()
        .rect(
            opt.drawArea.x + opt.paddingLeft
            , opt.drawArea.y + opt.paddingTop
            , opt.drawArea.w - opt.paddingLeft - opt.paddingRight
            , opt.drawArea.h - opt.paddingTop - opt.paddingBottom
        )
        .clip()
        .globalAlpha(opt.gridOpacity)
        .lineWidth(opt.gridLineWidth)
        .strokeStyle(opt.gridStrokeStyle)
        ;

    for(var i=0; i<X.length; i++){

        if(opt.noDrawHiddenArea
            && ( X[i] < 0 && X[i] + opt.step < 0
                || X[i] > opt.canvasWidth && X[i] - opt.canvasWidth > opt.step) ){
            continue;
        }

        canvas
            .beginPath()
            .moveTo(X[i] + 0.5, Y[i] + opt.intersectRadius + 0.5)
            .lineTo(
                X[i] + 0.5
                , opt.drawArea.y + opt.drawArea.h - opt.paddingBottom + 0.5
            )
            .stroke()
            ;
    }

    canvas
        .restore()
        ;

    return this;
};


LineChart.fn.drawIntersections = function(){
    var me = this, 
        opt = me.opt,
        canvas = opt.canvas,
        X = opt.X,
        Y = opt.Y;

    if(!opt.enableIntersect){
        return this;
    }

    canvas.save()
        .beginPath()
        .rect(
            opt.drawArea.x + opt.paddingLeft
            , opt.drawArea.y + opt.paddingTop
            , opt.drawArea.w - opt.paddingLeft - opt.paddingRight
            , opt.drawArea.h - opt.paddingTop - opt.paddingBottom
        )
        .clip()
        .globalAlpha(opt.intersectOpacity)
        .lineWidth(opt.intersectLineWidth)
        .strokeStyle(opt.intersectStrokeStyle)
        .fillStyle(opt.intersectStrokeStyle)
        ;

    for(var i=0; i<X.length; i++){

        if(opt.noDrawHiddenArea
            && (X[i] < 0 && X[i] + opt.step < 0
                || X[i] > opt.canvasWidth && X[i] - opt.canvasWidth > opt.step)){
            continue;
        }

        canvas
            .beginPath()
            .moveTo(X[i]+opt.intersectRadius, Y[i])
            .arc(X[i], Y[i], opt.intersectRadius, 0, 2 * Math.PI, false)
            .closePath()
            .stroke()
            ;

        if(i == X.length - 1){
            canvas
                .fill()
                ;
        }

    }

    i = opt._currentPoint;
    canvas
        .globalAlpha(opt.currentPointOpacity)
        .lineWidth(opt.currentPointtLineWidth)
        .strokeStyle(opt.currentPointStrokeStyle)
        .beginPath()
        .moveTo(X[i]+opt.currentPointRadius, Y[i])
        .arc(X[i], Y[i], opt.currentPointRadius, 0, 2 * Math.PI, false)
        .closePath()
        .stroke()
        ;

    canvas
        .restore()
        ;

    return this;
};

LineChart.fn.drawLabels = function(){
    var me = this, 
        opt = me.opt,
        canvas = opt.canvas,
        labels = opt.labels,
        labelStep,
        x,
        y = opt.drawArea.y + opt.drawArea.h - opt.paddingBottom;
    
    if(!opt.enableLabels){
        return this;
    }

    labelStep = ( opt.step * ( opt.data.length - 1 ) ) 
        / ( labels.length - 1 );

    canvas
        .save()
        .beginPath()
        .rect(
            opt.drawArea.x + opt.paddingLeft
            , opt.drawArea.y + opt.drawArea.h - opt.paddingBottom 
            , opt.drawArea.w - opt.paddingLeft - opt.paddingRight
            , opt.paddingBottom
        )
        .clip()
        .globalAlpha(opt.labelOpacity)
        .font(opt.labelFont)
        .textAlign(opt.labelTextAlign)
        .textBaseline(opt.labelTextBaseline)
        .fillStyle(opt.labelFillStyle)
        ;

    for(var i=0, x=opt.drawArea.x + opt.paddingLeft + opt._offsetX; 
        i<labels.length-1; i++, x+=labelStep){
            if(opt.noDrawHiddenArea
                && ( x < 0 && x + labelStep < 0
                    || x > opt.canvasWidth && x - opt.canvasWidth > labelStep ) ){
                continue;
            }
            canvas.fillText(labels[i], x, y + opt.labelPaddingTop);
    }

    if(opt.noDrawHiddenArea
        && ( x < 0 && x + labelStep < 0
            || x > opt.canvasWidth && x - opt.canvasWidth > labelStep ) ){
        // nop
    }
    else{
        canvas
            .globalAlpha(opt.labelLastLabelOpacity)
            .fillText(labels[i], x, y + opt.labelPaddingTop);
    }

    canvas
        .restore();

    return this;
};

LineChart.fn.drawLastGrid = function(){
    var me = this, 
        opt = me.opt,
        canvas = opt.canvas,
        X = opt.X,
        Y = opt.Y,
        index = X.length - 1;

    if(!opt.enableLastGrid || index < 0){
        return me;
    }

    if(opt.noDrawHiddenArea
        && ( X[index] < 0 && X[index] + opt.step < 0
            || X[index] > opt.canvasWidth && X[index] - opt.canvasWidth > opt.step) ){
        return me;
    }

    canvas.save()
        .beginPath()
        .rect(
            opt.drawArea.x + opt.paddingLeft
            , opt.drawArea.y + opt.paddingTop
            , opt.drawArea.w - opt.paddingLeft - opt.paddingRight
            , opt.drawArea.h - opt.paddingTop - opt.paddingBottom + opt.lastGridLineWidth
        )
        .clip()
        .globalAlpha(opt.lastGridOpacity)
        .lineWidth(opt.lastGridLineWidth)
        .strokeStyle(opt.lastGridStrokeStyle)

        .beginPath()
        .moveTo(X[index] + 0.5, Y[index] + opt.intersectRadius + 0.5)
        .lineTo(
            X[index] + 0.5
            , opt.drawArea.y + opt.drawArea.h - opt.paddingBottom + 0.5
        )
        .moveTo(
            X[index] + 0.5 - opt.lastGridFootSize
            , opt.drawArea.y + opt.drawArea.h - opt.paddingBottom + 0.5
        )
        .lineTo(
            X[index] + 0.5 + opt.lastGridFootSize
            , opt.drawArea.y + opt.drawArea.h - opt.paddingBottom + 0.5
        )
        .stroke()
        .restore()
        ;

    return this;
};

LineChart.fn.drawLastValue = function(){
    var me = this, 
        opt = me.opt,
        canvas = opt.canvas,
        X = opt.X,
        Y = opt.Y,
        x,
        y,
        i = opt.data.length - 1,
        baseLine = 'top',
        offsetY = opt.lastValueOffsetY,
        valueHeight = opt.lastValueHeight,
        offset,
        arrowOffset,
        arrowTopOffset,
        value = parseInt(opt.data[i]),
        textWidth,
        w;
    
    if(!opt.enableLastValue){
        return me;
    }

    x = X[i];
    y = Y[i];

    // default on top of intersect
    offset = offsetY - valueHeight;
    arrowOffset = offset + valueHeight;
    arrowTopOffset = offset + valueHeight + 7;

    if(y - opt.drawArea.y - opt.paddingTop < opt.lastValueThreshold){
        offset = -offsetY;
        arrowOffset = offset; 
        arrowTopOffset = offset - 7; 
    } 

    canvas
        .save()
        .beginPath()
        .rect(
            opt.drawArea.x + opt.paddingLeft
            , opt.drawArea.y + opt.paddingTop
            , opt.drawArea.w - opt.paddingLeft - opt.paddingRight
            , opt.drawArea.h - opt.paddingTop - opt.paddingBottom
        )
        .clip()

        .font(opt.lastValueFont)
        .textAlign(opt.lastValueTextAlign)
        .textBaseline(baseLine)
        .fillStyle(opt.lastValueBackgroundColor)
        .strokeStyle(opt.lastValueBackgroundColor)
        ;

    textWidth = canvas.getTextWidth(value);
    w = textWidth + opt.lastValuePaddingHorizontal * 2;
    if(w < opt.lastValueMinWidth){
        w = opt.lastValueMinWidth;
    }

    canvas
        .beginPath()
        .rect(
            x - w / 2
            , y + offset 
            , w 
            , valueHeight 
        )
        .fill()
        .beginPath()
        .moveTo(
            x - 5
            , y + arrowOffset
        )
        .lineTo(
            x
            , y + arrowTopOffset
        )
        .lineTo(
            x + 5
            , y + arrowOffset 
        )
        .closePath()
        .fill()

        .fillStyle(opt.lastValueFillStyle)
        .fillText(value, x, y + offset + opt.lastValuePaddingVertical)
        .restore();

    return me;
};


LineChart.fn.drawLines = function(){
    var me = this, 
        opt = me.opt,
        canvas = opt.canvas,
        X = opt.X,
        Y = opt.Y,
        // trend: 'dec', 'inc'
        T = opt.T = [];

    if(!opt.enableLines){
        return this;
    }

    canvas.save()
        .beginPath()
        .rect(
            opt.drawArea.x + opt.paddingLeft
            , opt.drawArea.y + opt.paddingTop
            , opt.drawArea.w - opt.paddingLeft - opt.paddingRight
            , opt.drawArea.h - opt.paddingTop - opt.paddingBottom
        )
        .clip()
        .globalAlpha(opt.linesOpacity)
        .lineWidth(opt.linesLineWidth)
        .strokeStyle(opt.linesStrokeStyle)
        ;

    var fromCircle, toCircle, line, intersects,
        fromPoint = {x:0, y:0}, 
        toPoint = {x:0, y:0};

    for(var i=1; i<X.length; i++){

        if(opt.noDrawHiddenArea
            && (X[i-1] < 0 && X[i-1] + opt.step < 0
                || X[i] > opt.canvasWidth && X[i] - opt.canvasWidth > opt.step ) ){
            continue;
        }

        fromCircle = {a: X[i-1], c: Y[i-1], r: opt.intersectRadius}; 
        toCircle = {a: X[i], c: Y[i], r: opt.intersectRadius}; 
        line = get_line_with_2points(
            {x: X[i-1], y: Y[i-1]}
            , {x: X[i], y: Y[i]}
        );
        T[i-1] = ( Y[i] - Y[i-1] >=0 ? 'dec' : 'inc' ); 

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
    T[i-1] = 'inc';

    canvas.restore();

    return me;
};

LineChart.fn.checkTime = function(){
    var me = this;

    me.timeRenderStart = new Date().getTime();
    return me;
};

LineChart.fn.showFPS = function(){
    var me = this,
        opt = me.opt,
        now = new Date().getTime(),
        fps = 1 / ( now + 1 - me.timeRenderStart ) * 1000,
        fpsArr;

    if(!opt.enableFPS){
        return me;
    }

    fpsArr = me.fpsArr = me.fpsArr || [];

    fpsArr.push(fps);

    me.$info = me.$info
        || $('<div class="__line-chart-fps"></div>')
                .appendTo('body')
                .css({
                    'position': 'absolute'
                    , 'display': 'none'
                    , 'top': '5px'
                    , 'right': '10px'
                    , 'padding': '0 5px'
                    , 'background-color': 'rgba(0,0,0,0.3)'
                    , 'height': '28px'
                    , 'color': '#fff'
                    , 'font': 'normal normal 14px/28px Arial'
                });

    setTimeout(function(){
        var total = 0, _fps = 0;
        for(var i=0; i<fpsArr.length; i++){
            total += fpsArr[i];
        }

        if(fpsArr.length){
            _fps = total / fpsArr.length;
        }

        me.$info.show().html('fps: ' + parseInt(_fps));
    }, 1000);

    return me;
};

LineChart.fn.setupDrag = function(){

    var me = this, 
        opt = me.opt,
        lastTouchX,
        _lastOffsetX,
        _isDraged,
        canvas = opt.canvas;

    if(!opt.enableDrag || me.isRedraw || opt.data.length <= 1){
        return;
    }
    me.isRedraw = true;

    canvas.on('touchstart', function(e){
            lastTouchX 
                = e.targetTouches[0].clientX;
            _isDraged = false;
        })
        .on('touchmove', function(e){
            var t = e.targetTouches[0],
                offsetX, offsetXToBe, w,
                currentPoint = 0;

            e.preventDefault();

            if(!opt.enableTouchTrace){
                return;
            }

            offsetX = t.clientX - lastTouchX;
            lastTouchX = t.clientX;

            if(me.isBusy){
                return;
            }
            me.isBusy = true;
            setTimeout(function(){ me.isBusy = false; }, 40);

            
            offsetXToBe = opt._offsetX + opt.dragAccelerate * offsetX;
            w = opt.step * ( opt.data.length - 1 );

            _lastOffsetX = opt._offsetX;
            if(offsetXToBe < opt.initOffsetX 
                && offsetXToBe + w <= opt.step + opt.initOffsetX){
                opt._offsetX = - w + opt.step + opt.initOffsetX; 
                // console.log('rightmost');
            }
            else if(offsetXToBe >= opt.initOffsetX) {
                opt._offsetX = opt.initOffsetX;
                // console.log('leftmost');
            }
            else{
                opt._offsetX = offsetXToBe;
            }

            if(Math.abs ( (opt._offsetX - opt.initOffsetX) % opt.step ) 
                    < opt._currentPointThreshold){
                currentPoint 
                    = Math.abs( parseInt( ( opt._offsetX - opt.initOffsetX) / opt.step ) );

                // when swipe left, make sure current point is visible
                if(offsetX < 0){
                    opt._currentPoint = currentPoint + 1;

                }
                else{
                    opt._currentPoint = currentPoint;
                }

                // last point is not marked
                if(opt._currentPoint == opt.data.length - 1
                    && opt._currentPoint >= 0){
                    opt._currentPoint --;
                }

            }

            // ignore no-need redraw
            if(_lastOffsetX != opt._offsetX){
                me.draw();
                _isDraged = true;
            }
        })
        .on('touchend', function(e){
            var t = e.changedTouches[0],
                offsetX;

            if('function' == typeof opt.onafterdrag){
                setTimeout(function(){
                    opt.onafterdrag();
                }, 0);
            }

            if(opt.enableTouchTrace){
                return;
            }

            offsetX = t.clientX - lastTouchX;
            opt._offsetX += offsetX;
            me.draw();
        });

    return this;

};

