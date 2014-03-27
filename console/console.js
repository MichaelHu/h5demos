(function(){


/**
 * http://getfirebug.com/wiki/index.php/Console.log
 * console格式化字符串
 * 
 * Pattern  Type
 * %s       String
 * %d, %i   Integer (numeric formatting is not yet supported)
 * %f/%.xf  Floating point number; x denotes the number of decimal places the number should be rounded to (if ommitted, the number won't be rounded)
 * %o       Object hyperlink
 * %c       Style formatting 
 */

if(!window.console){
    return;
}

console.info(
    '%c' + [
        ''
        , '一张网页，要经历怎样的过程，才能抵达用户面前？'
        , '一位新人，要经历怎样的成长，才能站在技术之巅？'
        , '探寻这里的秘密；'
        , '体验这里的挑战；'
        , '成为这里的主人；'
        , '加入百度，加入百度新闻，你，可以影响世界。'
        , ''
        , '如果console前的你热爱前端技术，相信技术改变世界的力量，那么————'
    ].join("\n")
    , [
        'font-size:14px'
        , 'line-height:28px'
        , 'color: #0064b0'
    ].join(';')
);

console.log(
    [
        '%c请将简历发送至以下邮箱：\n'
        , '%o'
    ].join("")
    , [
        'font-size:14px'
        , 'line-height:28px'
        , 'color: #000'
    ].join(';')
    , [
        [
            [
                {'Email': 'hudamin@baidu.com'}
            ]
        ]
    ]
);

console.log(
    '%c邮件标题请以“姓名-应聘Web前端研发工程师-来自console”命名'
    , [
        'font-size:14px'
        , 'line-height:28px'
        , 'color: #f00'
    ].join(';')
);

console.log(
    '%c职位介绍：%o'
    , [
        'font-size:18px'
        , 'font-weight:bold'
        , 'line-height:30px'
        , 'color: #0064b0'
    ].join(';')
    , 'http://www.dwz.cn/fx7w1'
);



})();
