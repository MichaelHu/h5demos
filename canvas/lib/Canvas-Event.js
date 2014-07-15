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
