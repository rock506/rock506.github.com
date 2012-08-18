/**
 * 缓动因子
 * @type {Object}
 */
var Easing = {
    /**
     * Linear：线性变化
     * @type {Object}
     * @param  {number} t 当前时间
     * @param  {number} b 初始值
     * @param  {number} c 变化值
     * @param  {number} d 持续时间
     */
    Linear:{
        easeIn:function(t,b,c,d){
            return c*t/d + b;
        }
        ,easeOut:function(t,b,c,d){
            return c*t/d + b;
        }
        ,easeInOut:function(t,b,c,d){
            return c*t/d + b;
        }
    }
    /**
     * Quad：二次方缓动
     * @type {Object}
     * @param  {number} t 当前时间
     * @param  {number} b 初始值
     * @param  {number} c 变化值
     * @param  {number} d 持续时间
     */
    ,Quad:{
        easeIn:function(t,b,c,d){
            return c*(t/=d)*t + b;
        }
        ,easeOut:function(t,b,c,d){
            return -c *(t/=d)*(t-2) + b;
        }
        ,easeInOut:function(t,b,c,d){
            if ((t/=d*0.5) < 1) return c*0.5*t*t + b;
            return -c*0.5 * ((--t)*(t-2) - 1) + b;
        }
    }
    /**
     * Cubic：三次方的缓动
     * @type {Object}
     * @param  {number} t 当前时间
     * @param  {number} b 初始值
     * @param  {number} c 变化值
     * @param  {number} d 持续时间
     */
    ,Cubic:{
        easeIn:function(t,b,c,d){
            return c*(t/=d)*t*t + b;
        }
        ,easeOut:function(t,b,c,d){
            return c*((t=t/d-1)*t*t + 1) + b;
        }
        ,easeInOut:function(t,b,c,d){
            if ((t/=d*0.5) < 1) return c*0.5*t*t*t + b;
            return c*0.5*((t-=2)*t*t + 2) + b;
        }
    }
    /**
     * Quart：四次方缓动
     * @type {Object}
     * @param  {number} t 当前时间
     * @param  {number} b 初始值
     * @param  {number} c 变化值
     * @param  {number} d 持续时间
     */
    ,Quart:{
        easeIn:function(t,b,c,d){
            return c*(t/=d)*t*t*t + b;
        }
        ,easeOut:function(t,b,c,d){
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        }
        ,easeInOut:function(t,b,c,d){
            if ((t/=d*0.5) < 1) return c*0.5*t*t*t*t + b;
            return -c*0.5 * ((t-=2)*t*t*t - 2) + b;
        }
    }
    /**
     * Quint：五次方缓动
     * @type {Object}
     * @param  {number} t 当前时间
     * @param  {number} b 初始值
     * @param  {number} c 变化值
     * @param  {number} d 持续时间
     */
    ,Quint:{
        easeIn:function(t,b,c,d){
            return c*(t/=d)*t*t*t*t + b;
        }
        ,easeOut:function(t,b,c,d){
            return c*((t=t/d-1)*t*t*t*t + 1) + b;
        }
        ,easeInOut:function(t,b,c,d){
            if ((t/=d*0.5) < 1) return c*0.5*t*t*t*t*t + b;
            return c*0.5*((t-=2)*t*t*t*t + 2) + b;
        }
    }
    /**
     * Back：超过范围的三次方缓动
     * @type {Object}
     * @param  {number} t 当前时间
     * @param  {number} b 初始值
     * @param  {number} c 变化值
     * @param  {number} d 持续时间
     */
    ,Back:{
        easeIn:function(t,b,c,d){
            var s = 1.70158;
            return c*(t/=d)*t*((s+1)*t - s) + b;
        }
        ,easeOut:function(t,b,c,d){
            var s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        }
        ,easeInOut:function(t,b,c,d){
            var s = 1.70158;
            if ((t/=d*0.5) < 1) return c*0.5*(t*t*(((s*=(1.525))+1)*t - s)) + b;
            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
        }
    }
    /**
     * Bounce：指数衰减的反弹缓动
     * @type {Object}
     * @param  {number} t 当前时间
     * @param  {number} b 初始值
     * @param  {number} c 变化值
     * @param  {number} d 持续时间
     */
    /*,Bounce:{
        easeIn:function(t,b,c,d){
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
            } else {
                return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
            }
        }
        ,easeOut:function(t,b,c,d){
            return c - Easing.Bounce.easeOut(d-t, 0, c, d) + b;
        }
        ,easeInOut:function(t,b,c,d){
            if (t < d*0.5) return easeIn (t*2, 0, c, d) * .5 + b;
            else return Easing.Bounce.easeOut (t*2-d, 0, c, d) * .5 + c*.5 + b;
        }
    }*/
    /**
     * Circ：圆形曲线的缓动
     * @type {Object}
     * @param  {number} t 当前时间
     * @param  {number} b 初始值
     * @param  {number} c 变化值
     * @param  {number} d 持续时间
     */
    ,Circ:{
        easeIn:function(t,b,c,d){
            return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
        }
        ,easeOut:function(t,b,c,d){
            return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
        }
        ,easeInOut:function(t,b,c,d){
            if ((t/=d*0.5) < 1) return -c*0.5 * (Math.sqrt(1 - t*t) - 1) + b;
            return c*0.5 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
        }
    }
    
    /**
     * Elastic：指数衰减的正弦曲线缓动
     * @type {Object}
     * @param  {number} t 当前时间
     * @param  {number} b 初始值
     * @param  {number} c 变化值
     * @param  {number} d 持续时间
     */
    ,Elastic:{
        easeIn:function(t,b,c,d){
            var _2PI = Math.PI * 2
            ,a = 0
            ,p = 0
            ,s = 0;
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (!a || (c > 0 && a < c) || (c < 0 && a < -c)) { a=c; s = p/4; }
            else s = p/_2PI * Math.asin (c/a);
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*_2PI/p )) + b;
        }
        ,easeOut:function(t,b,c,d){
            var _2PI = Math.PI * 2
            ,a = 0
            ,p = 0
            ,s = 0;
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (!a || (c > 0 && a < c) || (c < 0 && a < -c)) { a=c; s = p/4; }
            else s = p/_2PI * Math.asin (c/a);
            return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*_2PI/p ) + c + b);
        }
        ,easeInOut:function(t,b,c,d){
            var _2PI = Math.PI * 2
            ,a = 0
            ,p = 0
            ,s = 0;
            if (t==0) return b;  if ((t/=d*0.5)==2) return b+c;  if (!p) p=d*(.3*1.5);
            if (!a || (c > 0 && a < c) || (c < 0 && a < -c)) { a=c; s = p/4; }
            else s = p/_2PI * Math.asin (c/a);
            if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*_2PI/p )) + b;
            return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*_2PI/p )*.5 + c + b;
        }
    }
    /**
     * Expo：
     * @type {Object}
     * @param  {number} t 当前时间
     * @param  {number} b 初始值
     * @param  {number} c 变化值
     * @param  {number} d 持续时间
     */
    ,Expo:{
        easeIn:function(t,b,c,d){
            return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b - c * 0.001;
        }
        ,easeOut:function(t,b,c,d){
            return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        }
        ,easeInOut:function(t,b,c,d){
            if (t==0) return b;
            if (t==d) return b+c;
            if ((t/=d*0.5) < 1) return c*0.5 * Math.pow(2, 10 * (t - 1)) + b;
            return c*0.5 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    }
    /**
     * [Sine description]
     * @type {Object}
     * @param  {number} t 当前时间
     * @param  {number} b 初始值
     * @param  {number} c 变化值
     * @param  {number} d 持续时间
     */
    ,Sine:{
        easeIn:function(t,b,c,d){
            var _HALF_PI = Math.PI * 0.5;
            return -c * Math.cos(t/d * _HALF_PI) + c + b;
        }
        ,easeOut:function(t,b,c,d){
            var _HALF_PI = Math.PI * 0.5;
            return c * Math.sin(t/d * _HALF_PI) + b;
        }
        ,easeInOut:function(t,b,c,d){
            return -c*0.5 * (Math.cos(Math.PI*t/d) - 1) + b;
        }
    }
    /**
     * [Strong description]
     * @type {Object}
     * @param  {number} t 当前时间
     * @param  {number} b 初始值
     * @param  {number} c 变化值
     * @param  {number} d 持续时间
     */
    ,Strong:{
        easeIn:function(t,b,c,d){
            return c*(t/=d)*t*t*t*t + b;
        }
        ,easeOut:function(t,b,c,d){
            return c*((t=t/d-1)*t*t*t*t + 1) + b;
        }
        ,easeInOut:function(t,b,c,d){
            if ((t/=d*0.5) < 1) return c*0.5*t*t*t*t*t + b;
            return c*0.5*((t-=2)*t*t*t*t + 2) + b;
        }
    }
};