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
