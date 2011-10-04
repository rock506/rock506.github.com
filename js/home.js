var SiteModel = Backbone.Model.extend({
    view: $(".main")
    ,view2: $(".main .inner")
    ,status:0
    ,isLock: false
    ,iframe: $("#demo-container")
    ,initialize: function(){
        this.setPageSize();
        this.bind("openInIframe",this.openInIframe,this);
        $(window).resize.call(this,this.setPageSize);
    }
    ,setPageSize: function(){
        var w = this.getPageWidth();
        $(".index").css("width",w);
        $(".demo").css("width",w);
        $(".demo").css("display","block");
        $(".loading").css("width",w);
        $(".loading").css("display","block");
    }
    ,goHome: function(){
        var me = this;
        if(!this.isLock){
            this.isLock = true;
            this.view2.animate({marginLeft: -20}, 500,'swing',function(){
                me.isLock = false;
                me.iframe.attr("src","");
                me.status=0;
            });
        }
    }
    ,openInIframe: function(url){
        var me = this;
        if(!this.isLock){
            this.isLock = true;
            var offest = -parseInt(this.getPageWidth())-40;
            if(this.status==0){
                this.view2.animate({marginLeft: offest}, 500,'swing',function(){
                    me.isLock = false;
                    me.iframe.attr("src",url);
                    me.status=1;
                });
            }else{
                this.view2.animate({marginLeft: offest*2+20}, 500,'swing',function(){
                    me.iframe.attr("src",url);
                    me.status=1;
                    setTimeout(function(){
                        me.view2.animate({marginLeft: offest}, 500,'swing',function(){
                            me.isLock = false;
                        });
                    },500);
                });
            }
        }
    }
    ,getPageWidth: function(){
        return this.view.css("width");
    }
});
var Site = new SiteModel();
var Nav = {
    Model:{}
    ,Collection:{}
    ,View:{}
};
//Base
Nav.Model.Base = Backbone.Model.extend({});
Nav.Collection.Base = Backbone.Collection.extend({model:Nav.Model.Base});
Nav.View.Base = Backbone.View.extend({
    template: _.template($("#nav-item-template").html())
    ,events: {
        "click .openInIframe":"openInIframe"
    }
    ,initialize: function(){
        this.collection.bind("add",this.render,this);
    }
    ,render: function(model){
        $(".dropdown-menu",this.el).append(this.template(model.toJSON()));
    }
    ,openInIframe: function(e){
        e.preventDefault();
        var url = $(e.target).attr("href");
        Site.trigger("openInIframe",url);
    }
});
//Demos
Nav.Model.Demos = Nav.Model.Base;
Nav.Collection.Demos = Nav.Collection.Base;
Nav.View.Demos = Nav.View.Base.extend({
    el:$("#demos-container")
});
//Blogs
Nav.Model.Blogs = Nav.Model.Base;
Nav.Collection.Blogs = Nav.Collection.Base;
Nav.View.Blogs = Nav.View.Base.extend({
    el:$("#blogs-container")
});
var demosCollection = new Nav.Collection.Demos();
var blogsCollection = new Nav.Collection.Blogs();
var demosView = new Nav.View.Demos({'collection':demosCollection});
var blogsView = new Nav.View.Blogs({'collection':blogsCollection});
demosCollection.add([
    {name:'RSS',url:'demos/rss.html'},
    {name:'demo2',url:'demos/rss.html'},
    {name:'demo3',url:'demos/rss.html'},
]);
blogsCollection.add([
    {name:'淘宝UED',url:'http://ued.taobao.com/blog/'},
    {name:'腾讯CDC',url:'http://cdc.tencent.com/'},
    {name:'腾讯ISD',url:'http://isd.tencent.com/'},
    {name:'百度UFO',url:'http://www.baiduux.com/'},
    {name:'jQuery',url:'http://jquery.com/'},
    {name:'Backbone.js',url:'http://documentcloud.github.com/backbone/'},
    {name:'Bootstrap',url:'http://twitter.github.com/bootstrap/'}
]);
