App.Views.Logo = Backbone.View.extend({
    template: _.template($('#logo-template').html())
    ,initialize: function(){
        this.render();
    }
    ,render: function(){
        $("body").append(this.template());
    }
});
//new App.Views.Logo();