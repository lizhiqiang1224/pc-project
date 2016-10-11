function Banner(id,url) {
    this.oBox=document.getElementById(id);
    this.banImg=this.oBox.getElementsByTagName('div')[0];
    this.aDiv=this.banImg.getElementsByTagName('div');
    this.aImg=this.banImg.getElementsByTagName('img');
    this.oDl=this.oBox.getElementsByTagName('dl')[0];
    this.aDd=this.oBox.getElementsByTagName('dd');
    this.oBtnLeft=this.oBox.getElementsByTagName('i')[0];
    this.oBtnRight=this.oBox.getElementsByTagName('i')[1];
    this.data=null;
    this.step=0;
    this.timer=null;
    this.url=url;
    this.init();
}
Banner.prototype={
    constructor:Banner,
    init:function () {
        var _this=this;
        this.getData();
        this.bind();
        this.lazyImg();
        clearInterval(this.timer);
        this.timer=setInterval(function(){
            _this.autoMove();
        },3000);
        this.overOut();
        this.handleChange();
        this.leftRight();
    },
    getData:function () {
        var _this=this;
        var xhr=new XMLHttpRequest();
        xhr.open('get',this.url,false);
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4&&/^2\d{2}$/.test(xhr.status)){
                _this.data=utils.jsonParse(xhr.responseText);

            }
        };
        xhr.send();

    },
    bind:function () {
        var strDiv='',strDd='';
        for(var i=0;i<this.data[0].banner.length;i++){
            var cur=this.data[0].banner[i];
            console.log(this.data[0]);
            strDiv+='<div><img realImg="'+cur.imgSrc+'" alt=""></div>';
            strDd+=i==0?'<dd class="on"></dd>':'<dd></dd>';
        }
        this.banImg.innerHTML=strDiv;
        this.oDl.innerHTML+=strDd;
    },
    lazyImg:function () {
        var _this=this;
        for(var i=0;i<this.aImg.length;i++){
            (function(index){
                var tmpImg=new Image;
                tmpImg.src=_this.aImg[index].getAttribute('realImg');
                tmpImg.onload=function(){
                    _this.aImg[index].src=this.src;
                    var oDiv1=_this.aDiv[0];
                    utils.css(oDiv1,'zIndex',1);
                    animate(oDiv1,{opacity:1},1000)
                }
            })(i)
        }
    },
    autoMove:function(){
        if(this.step>=this.aDiv.length-1){
            this.step=-1;
        }
        this.step++;
        this.setBanner();
    },
    setBanner:function(){ //渐隐效果
        for(var i=0;i<this.aDiv.length;i++){
            if(i===this.step){
                utils.css(this.aDiv[i],'zIndex',1);
                animate(this.aDiv[i],{opacity:1},1000,function(){
                    var siblings=utils.siblings(this);
                    for(var i=0;i<siblings.length;i++){
                        animate(siblings[i],{opacity:0})
                    }
                });
                continue;
            }
            utils.css(this.aDiv[i],'zIndex',0);
        }
        this.bannerTip();
    },
    bannerTip:function (){
        for(var i=0;i<this.aDd.length;i++){
            this.aDd[i].className=i===this.step?'on':null;
        }
    },
    overOut:function(){
        var _this=this;
        this.oBox.onmouseover=function(){
            clearInterval(_this.timer);
        };
        this.oBox.onmouseout=function(){
            _this.timer=setInterval(function(){
                _this.autoMove();
            },3000);
        };
    },
    handleChange:function(){
        var _this=this;
        for(var i=0;i<this.aDd.length;i++){
            this.aDd[i].index=i;
            this.aDd[i].onclick=function(){
                _this.step=this.index;
                _this.setBanner();
            }
        }
    },
    leftRight:function(){
        var _this=this;
        this.oBtnRight.onclick=function(){
            _this.autoMove();
        };
        this.oBtnLeft.onclick=function(){
            if(_this.step<=0){
                _this.step=_this.aDiv.length;
            }
            _this.step--;
            _this.setBanner();
        }
    }
};

(function () {
    var starL=document.getElementById('starL');
    var starR=document.getElementById('starR');
    var starCon = document.getElementById('starCon');
    var flag=false,timer=null;
    function starLeft() {
        animate(starCon,{left:-1226},500);
        flag=true;
        starL.className='starL';
        starL.onclick=null;
        starR.className='starRon';
        starR.onclick=function () {
            starRright();
        };
    }
    function starRright() {
        animate(starCon,{left:0},500);
        flag=false;
        starL.className='starLon';
        starL.onclick=function () {
            starLeft();
        };
        starR.className='starR';
        starR.onclick=null;
    }
    starL.onmouseover=function () {
        clearInterval(timer);
    };
    starL.onclick=function () {
        starLeft();
    };
    starL.onmouseout=function () {
        time();
    };

    starR.onmouseover=function () {
        clearInterval(timer);
    };
    starR.onclick=function () {
        starRright();
    };
    starR.onmouseout=function () {
        time();
    };

    function time() {
        clearInterval(timer);
        timer=setInterval(function () {
            if(flag){
                starRright();
            }else{
                starLeft();
            }
        },2000);
    }
    time();
})();

(function () {
    var boxs= document.getElementById('boxs');
    var oTitle=boxs.getElementsByTagName('div')[0];
    var aSpan=oTitle.getElementsByTagName('span');
    var oCent=boxs.getElementsByTagName('div')[1];
    var aUl=oCent.getElementsByTagName('ul');
    for(var i=0; i<aSpan.length; i++){
        (function (index){
            aSpan[index].onmouseover=function(){
                for(var i=0; i<aSpan.length; i++){
                    aSpan[i].className='';
                    aUl[i].className='';
                }
                this.className='on';
                aUl[index].className='show';
            }
        })(i)
    }
})();
(function () {
    var boxs= document.getElementById('boxs2');
    var oTitle=boxs.getElementsByTagName('div')[0];
    var aSpan=oTitle.getElementsByTagName('span');
    var oCent=boxs.getElementsByTagName('div')[1];
    var aUl=oCent.getElementsByTagName('ul');
    for(var i=0; i<aSpan.length; i++){
        (function (index){
            aSpan[index].onmouseover=function(){
                for(var i=0; i<aSpan.length; i++){
                    aSpan[i].className='';
                    aUl[i].className='';
                }
                this.className='on';
                aUl[index].className='show';
            }
        })(i)
    }
})();
(function () {
    var boxs= document.getElementById('boxs3');
    var oTitle=boxs.getElementsByTagName('div')[0];
    var aSpan=oTitle.getElementsByTagName('span');
    var oCent=boxs.getElementsByTagName('div')[1];
    var aUl=oCent.getElementsByTagName('ul');
    for(var i=0; i<aSpan.length; i++){
        (function (index){
            aSpan[index].onmouseover=function(){
                for(var i=0; i<aSpan.length; i++){
                    aSpan[i].className='';
                    aUl[i].className='';
                }
                this.className='on';
                aUl[index].className='show';
            }
        })(i)
    }
})();






