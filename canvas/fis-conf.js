fis.config.merge({
    roadmap : {
        path : [
            {
                reg : /^\/.+-aio.*\.js$/i,
                release : "/static/canvas$&"
            },
            {
                reg : /index\.html$/i,
                release : '/template/canvas/canvas.html'
            }
        ]
    }
});

fis.config.merge({
    settings : { 
        optimizer : { 
            'uglify-js' : { 
                output : { 
                    /* inline js，单行过长，可能导致smarty解析失败，所以设置最大行大小 */
                    max_line_len : 500 
                }   
            }   

            , 'clean-css' : { 
                keepBreaks : true
            }   
        }   
    }   
});

fis.config.del('modules.optimizer.html');

