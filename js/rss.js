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
    el: $("body"),
    feedControl = new google.feeds.FeedControl();

  // Add two feeds.
  feedControl.addFeed("http://www.digg.com/rss/index.xml", "Digg");
  feedControl.addFeed("http://feeds.feedburner.com/Techcrunch", "TechCrunch");

  // Draw it.
  feedControl.draw(document.getElementById("content"));
    initialize: function() {
        this.render();
        this.collection.bind("add",this.addItem,this);
    },
    template: _.template($('#rss-template').html()),
    events: {
      "click" : "load",
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
            this.feedControl.addFeed(url);
            this.feedControl.draw($("#article_rss"));
        }
    }
});
var model = new RssModel();
var collection = new RssCollection();
var view = new RssView({model:model,collection:collection});