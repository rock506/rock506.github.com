(function(){
    var _dataObj = {
        "UE":["张三","李四","王小五"]
        ,"FE":["码农","苦逼","闷骚男","北漂男"]
        }
        ,_dataObjTmp = T.object.clone(_dataObj)
        ,_data = []
        ,_luckGuy = ""
        ,_luckNumPos = [0,0,0]
        ,_frame = 5
        ,_delay = 300
        ,_offset = 50
        ,_state = 0
        ,_flag = true
        ,_h =81
        ,_pasueEaseCount = [1,1,1]
        ,_easing = 0.05
        ,_s1 = null
        ,_s2 = null
        ,_s3 = null
        ,_LNameWrapper1 = T.g('luck-name-wrapper-1')
        ,_LNameWrapper2 = T.g('luck-name-wrapper-2')
        ,_LNameWrapper3 = T.g('luck-name-wrapper-3')
        ,_LName1 = T.g('luck-name-1')
        ,_LName2 = T.g('luck-name-2')
        ,_LName3 = T.g('luck-name-3')
        ,_LNameTmp1 = T.g('luck-name-tmp-1')
        ,_LNameTmp2 = T.g('luck-name-tmp-2')
        ,_LNameTmp3 = T.g('luck-name-tmp-3')
        ,_listContainer = T.g('people')
        ,_luckGuysContainer = T.g('luck-guys')
        ,_btnStart = T.g('btn-start')
        ,_btnStop = T.g('btn-stop')
        ,_btnReStart = T.g('btn-restart');
        
    var LuckDraw = T.lang.createClass(function(){
        this.renderData();
        for(var unit in _dataObj){
            if(_dataObj.hasOwnProperty(unit)){
                var tmp = _dataObj[unit];
                this.random(tmp);
                //console.log("tmp:"+tmp);
                _data = _data.concat(tmp);
                this.random(_data);
                //console.log("data:"+_data);
            }
        }
        T.g('peopleCount').innerHTML = _data.length;
        T.array.each(_data,function(item,i){
            if(item.length==2){
                _data[i] = item.charAt(0)+" "+item.charAt(1);
            }
        });
        if(!window.localStorage){
            alert('您的浏览器太挫了，换Chrome吧！');
        }
        this.init();
    }).extend({
        init: function(){
            console.log("init");
            _state = 0;
            _flag = true;
            _pasueEaseCount = [1,1,1];
            this.unique();
            var data1 = T.array.map(_data,function(item,i){return item.charAt(0);})
            ,data2 = T.array.map(_data,function(item,i){return item.charAt(1);})
            ,data3 = T.array.map(_data,function(item,i){return item.charAt(2);})
            ,dataFilter1 = T.array.unique(data1)
            ,dataFilter2 = T.array.unique(data2)
            ,dataFilter3 = T.array.unique(data3)
            ,li1 = T.array.map(dataFilter1,function(item,i){var tpl = '';tpl += '<li>'+item+'</li>';return tpl;})
            ,li2 = T.array.map(dataFilter2,function(item,i){var tpl = '';tpl += '<li>'+item+'</li>';return tpl;})
            ,li3 = T.array.map(dataFilter3,function(item,i){var tpl = '';tpl += '<li>'+item+'</li>';return tpl;});
            _LName1.innerHTML = li1.join('');
            _LName2.innerHTML = li2.join('');
            _LName3.innerHTML = li3.join('');
            _LNameTmp1.innerHTML = li1.join('');
            _LNameTmp2.innerHTML = li2.join('');
            _LNameTmp3.innerHTML = li3.join('');
            _LNameWrapper1.scrollTop = _h * Math.ceil(li1.length*Math.random());
            _LNameWrapper2.scrollTop = _h * Math.ceil(li2.length*Math.random());
            _LNameWrapper3.scrollTop = _h * Math.ceil(li3.length*Math.random());
        }
        ,start: function(){
            this.init();
            this.run();
        }
        ,run: function(){
            console.log("start");
            _btnStart.className = "btn disabled";
            _btnStop.className = "btn pause";
            var This = this;
            //1
            _s1=setInterval(function(){
                This.marquee(_LNameWrapper1,_LName1,_LNameTmp1,0);
            },_frame);
            //2
            setTimeout(function(){
                _s2=setInterval(function(){
                    This.marquee(_LNameWrapper2,_LName2,_LNameTmp2,1);
                },_frame);
            },_delay);
            //3
            setTimeout(function(){
                _s3=setInterval(function(){
                    This.marquee(_LNameWrapper3,_LName3,_LNameTmp3,2);
                },_frame);
            },_delay*2);
        }
        ,pause: function(){
            console.log("pause");
            _btnStop.className = "btn disabled";
            //console.log("random scrollTop:",_LNameWrapper1.scrollTop,_LName1.offsetHeight,_LNameWrapper1.scrollTop/_LName1.offsetHeight);
            var luckNum = Math.floor(_LNameWrapper1.scrollTop/_LName1.offsetHeight*_data.length);
            luckNum = luckNum>=_data.length?(_data.length-1):luckNum;
            console.log("luckNum:"+luckNum);
            setTimeout(function(){
                T.array.each(T.dom.query('.luck-name-wrapper'),function(item,i){
                    T.array.each(T.dom.query('.luck-name li',item),function(tmp,j){
                         if(tmp.innerHTML==_data[luckNum].charAt(i)){
                            _luckNumPos[i] = (j-1) * _h;
                            //T.dom.addClass(tmp,'cur');
                            if(i==2){
                                _luckGuy = _data[luckNum];
                            }
                        }
                    });
                });
                _state = 1;
            },2000);
        }
        ,stop: function(){
            if(_s1&&_s2&&_s3){
                console.log("stop");
                clearInterval(_s1);
                clearInterval(_s2);
                clearInterval(_s3);
            }
            console.log("Luck Guy: "+_luckGuy);
            _btnStart.className = "btn start";
            //this.restart();
            var _tmp = localStorage.getItem("LuckGuys");//T.cookie.get("LuckGuys");
            console.log(_tmp);
            if(_tmp){
                if(_tmp.indexOf(_luckGuy)==-1){
                    localStorage.setItem("LuckGuys",_tmp+","+_luckGuy);//T.cookie.set("LuckGuys",_tmp+","+_luckGuy);
                }
            }else{
                localStorage.setItem("LuckGuys",_luckGuy);//T.cookie.set("LuckGuys",_luckGuy);
            }
            this.loadData();
            this.renderData();
        }
        /*,restart: function(){
            console.log("restart");
            _state = 0;
            _flag = true;
            _pasueEaseCount = [1,1,1];
            this.random(_data);
        }*/
        ,clearData: function(){
            localStorage.clear();//T.cookie.set("LuckGuys","");
            location.reload(true);
        }
        ,marquee: function(wrapper,content1,content2,i){
            var This = this;
            if(content2.offsetTop-wrapper.scrollTop<=0){
                wrapper.scrollTop-=content1.offsetHeight
                if(_state==1){
                    _pasueEaseCount[i]--;
                }
            }else{
                if(_state==1){
                    wrapper.scrollTop += Math.ceil((_pasueEaseCount[i]*content1.offsetHeight+_luckNumPos[i] - wrapper.scrollTop)*_easing);
                    if(_pasueEaseCount[2]==0&&_flag){
                        setTimeout(function(){This.stop();},3000);
                        _flag = false;
                    }
                }else{
                    wrapper.scrollTop += _offset;
                }
            }
        }
        ,random: function(data){
            for(var i=0;i<10;i++){
                data.sort(function(){ return Math.random()>0.5?1:-1 });
            }
        }
        ,loadData: function(){
            var tmp = localStorage.getItem("LuckGuys");;//T.cookie.get("LuckGuys");
            var list = [];
            if(tmp){
                list = tmp.split(",");
                var _list = T.array.map(list,function(item,i){
                    return '<li>'+item+'</li>';
                });
                _luckGuysContainer.innerHTML = _list.join('');
            }
            return list;
        }
        ,unique: function(){
            var luckguys = this.loadData();
            console.log("before remove:"+_data.length);
            T.array.each(luckguys,function(item,i){
                T.array.remove(_data,item);
                console.log("remove form data: "+item);
            });
            console.log("after remove:"+_data.length);
        }
        ,renderData: function(){
            var tpl = [];
            var luckGuys = this.loadData();
            for(var unit in _dataObjTmp){
                if(_dataObjTmp.hasOwnProperty(unit)){
                    tpl.push("<dt>"+unit+"（"+_dataObjTmp[unit].length+"人）</dt>");
                    var tmp = T.array.map(_dataObjTmp[unit],function(item,i){
                        item = item.length==2?(item.charAt(0)+" "+item.charAt(1)):item;
                        var isLuck = T.array.contains(luckGuys,item);
                        return (isLuck?'<dd class="luckguy">':'<dd>')+item+'</dd>';
                    });
                    tpl = tpl.concat(tmp);
                }
            }
            _listContainer.innerHTML = tpl.join('');
        }
    });
    T.lang.module("LuckDraw", LuckDraw);
})();