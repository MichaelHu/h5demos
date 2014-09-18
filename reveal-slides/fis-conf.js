fis.config.merge({
    roadmap : {
        path : [
            /*
            {
                reg : /^\/.+-aio.*\.css$/i,
                release : "/static/news/webapp$&"
            },
            {
                reg : /^\/.+-aio.*\.js$/i,
                release : "/static/news/webapp$&"
            },
            {
                reg : /^\/webappandroid\/.+\.(png|gif|jpg|jpeg)$/i,
                release : "/static/news/webapp$&"
            },
            {
                reg : /webappandroid\.html$/i,
                release : '/template/webapp-common/webapp-common.html'
            }
            */
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

