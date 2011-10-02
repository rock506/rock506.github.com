Backbone.sync = function(method, model) {
    //"create"   model.set
    //"read"      model.fetch
    //"update"  model.set
    //"delete     model.destroy
    console.log(method);
};
//Model
var RssModel = Backbone.Model.extend({});
//Collection
var RssCollection = Backbone.Collection.extend({
    model: RssModel
});
    //View
var RssItemView = Backbone.View.extend({
    tagName:  "li",
    className: "rss-item",
    template: _.template($('#rss-item-template').html()),
    initialize: function() {
    },
    events: {
      "click a" : "load",
    },
    render: function() {
        $(this.el).html(this.template(this.model.toJSON()));
        return this.el;
    },
    load: function(e){
        var url = $(e.target).attr("rss-url");

    }
});
    //View
var RssArticleView = Backbone.View.extend({
    tagName:  "div",
    className: "rss-content",
    template: _.template($('#rss-content-template').html()),
    events: {
      "click" : "showOrHide",
    },
    showOrHide: function(){
        alert("a");
    },
    render: function() {
        return this.template(this.model);
    }
});
//View
var RssView = Backbone.View.extend({
    el: $("body"),
    initialize: function() {
        this.render();
        this.collection.bind("add",this.addItem,this);
    },
    template: _.template($('#rss-template').html()),
    events: {
      "click" : "load",
      "click .btn" : "showOrHide",
    },
    showOrHide: function(e){
      console.log(e);
    },
    render: function(model) {
        $("body").append(this.template());
    },
    addItem: function(model) {
        var item = new RssItemView({model:model});
        $("#list_rss").append(item.render());
    },
    load: function(e){
        var url = $(e.target).attr("rss-url");
        if(url){
            var feed = new google.feeds.Feed(url);
            feed.load(function(result){
                if (!result.error) {
                    console.log(result);
                    var tpl = result.feed.entries.map(function(item){
                        var title = item.title;
                        var contentSnippet = item.contentSnippet;
                        var content = item.content;
                        var img = /src *= *('|")?(\w|\\|\/|\.|\:)+(((p|P)(n|N)(g|G))|((j|J)(p|P)(g|G))|((g|G)(i|I)(f|F)))('|"| *|>)?/.exec(content);
                        var article = new RssArticleView({model:{'img':img?img[0]:"",'title':title,'contentSnippet':contentSnippet,'content':content}});
                        return article.render();
                    });
                    $("#article_rss").append(tpl.join(""));
                }
            });
        }
    }
});
var model = new RssModel();
var collection = new RssCollection();
var view = new RssView({model:model,collection:collection});