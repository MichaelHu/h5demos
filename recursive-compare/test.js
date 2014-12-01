function isEQ(a, b){
    if(eq(a, b, [], [])){
        return true;
    } 
    return false;
}

function testEQ(a, b, msg){
    if(isEQ(a, b)){
        $('body').append('<h3 class="pass">Pass <code>' + ( msg || '' ) + '</code></h3>');
    }
    else{
        $('body').append('<h3 class="fail">Fail <code>' + ( msg || '' ) + '</code></h3>');
    }
}

function testNEQ(a, b, msg){
    if(!isEQ(a, b)){
        $('body').append('<h3 class="pass">Pass <code>' + ( msg || '' ) + '</code></h3>');
    }
    else{
        $('body').append('<h3 class="fail">Fail <code>' + ( msg || '' ) + '</code></h3>');
    }
}

testEQ(
    NaN 
    , NaN 
    , 'NaN === NaN'
);

testEQ(
    0 
    , new Number(0) 
    , '0 === new Number(0)'
);


testEQ(
    [] 
    , [] 
    , '[] === []'
);

testEQ(
    void 0 
    , undefined 
    , 'void 0 === undefined'
);

testEQ(
    [1, 2, 3]
    , [1, 2, 3]
    , '[1, 2, 3] === [1, 2, 3]'
);

testEQ(
    {"ab": 1, "cd": "12345"}
    , {"ab": 1, "cd": "12345"}
    , '{"ab": 1, "cd": "12345"} === {"ab": 1, "cd": "12345"}'
);

testEQ(
    {"ab": 1, "cd": [1, 2, 3]}
    , {"ab": 1, "cd": [1, 2, 3]}
    , '{"ab": 1, "cd": [1, 2, 3]} === {"ab": 1, "cd": [1, 2, 3]}'
);

testEQ(
    {"cd": [1, 2, 3], "ab": 1}
    , {"ab": 1, "cd": [1, 2, 3]}
    , '{"cd": [1, 2, 3], "ab": 1} === {"ab": 1, "cd": [1, 2, 3]}'
);


var date1 = new Date(), 
    date2 = new Date();

date1.setTime(Date.parse("2014/12/01 19:15:00"));
date2.setTime(Date.parse("2014/12/01 19:15:00"));

testEQ(
    date1
    , date2
    , 'Date "2014/12/01 19:15:00" === Date "2014/12/01 19:15:00"'
);



var funcA = function(a,b){return a==b;};
var funcB = function(a,b){return a==b;};
var funcC = funcA;


testEQ(
    funcA
    , funcC 
    , 'funcA === funcC'
);



testEQ(
    /abc/g
    , /abc/g 
    , '/abc/g === /abc/g'
);

testEQ(
    new RegExp("abc", "g") 
    , new RegExp("abc", "g") 
    , 'new RegExp("abc", "g") === new RegExp("abc", "g")'
);












testNEQ(
    NaN 
    , 'abc' 
    , 'NaN !== "abc"'
);

testNEQ(
    ''
    , undefined 
    , '"" !== undefined'
);

testNEQ(
    0 
    , null 
    , '0 !== null'
);

testNEQ(
    0 
    , false 
    , '0 !== false'
);

testNEQ(
    null 
    , false 
    , 'null !== false'
);

testNEQ(
    0 
    , '' 
    , '0 !== ""'
);

testNEQ(
    0 
    , '0' 
    , '0 !== "0"'
);

testNEQ(
    [] 
    , {} 
    , '[] !== {}'
);

testNEQ(
    [1, 2, 3]
    , [1, 0, 3]
    , '[1, 2, 3] !== [1, 0, 3]'
);

testNEQ(
    [1, 2, 3]
    , [1, 3, 2]
    , '[1, 2, 3] !== [1, 3, 2]'
);

testNEQ(
    {"ab": 1, "cd": "12345"}
    , {"ab": 1, "cd": "12345", "ef": 0}
    , '{"ab": 1, "cd": "12345"} !== {"ab": 1, "cd": "12345", "ef": 0}'
);

testNEQ(
    {"ab": 1, "cd": "12345", "ef": null}
    , {"ab": 1, "cd": "12345", "ef": 0}
    , '{"ab": 1, "cd": "12345", "ef": null} !== {"ab": 1, "cd": "12345", "ef": 0}'
);







testNEQ(
    function(a, b){return a==b;}
    , function(a, b){return a==b;}
    , 'function(a, b){return a==b;} !== function(a, b){return a==b;}'
);

testNEQ(
    funcA
    , funcB
    , 'funcA !== funcB'
);

