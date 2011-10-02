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
var RssView = Backbone.View.extend({
    el: $("#list_rss"),
    initialize: function() {
      google.load('feeds','1');
      this.collection.bind('add', this.render, this);
    },
    events: {
      "click" : "load",
    },
    render: function(model) {
        var item = new RssItemView({model:model});
        $(this.el).append(item.render());
    },
    load: function(e){
        var url = $(e.target).attr("rss-url");
        if(url){console.log(e.target);
            google.setOnLoadCallback(function(){
            var feed = new google.feeds.Feed(url);
            console.log(feed);
            feed.load(function(result) {
                if (!result.error) {
                    console.log(result);
                }
            });
            });
        }
    }
});
var model = new RssModel();
var collection = new RssCollection();
var view = new RssView({model:model,collection:collection});
collection.add([
    {name:'JKisJK',url:'http://www.cnblogs.com/jkisjk/rss.aspx'},
    {name:'rock506',url:'http://www.cnblogs.com/rock506/rss.aspx'}
]);