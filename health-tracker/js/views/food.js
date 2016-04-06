// js/views/food.js

var app = app || {};

// Search food item view
app.SearchView = Backbone.View.extend({
    tagName: 'li',

    template: _.template($('#item-template').html()),

    events: {
      'click .add': 'addToIntake'
    },

    initialize: function() {

    },

    render: function() {
      this.$el.html(this.template(this.model.attributes));
      return this;
    },


    addToIntake: function() {
      var addItem = this.model.attributes;
      var date = new Date();
      var food = new app.IntakeFood({
        name: addItem.name,
        calories: addItem.calories,
        date: date.toLocaleDateString()
      });
      app.IntakeFoods.add(food);
    }
});

// intake food item view
app.IntakeView = Backbone.View.extend({
  tagName: 'li',

  template: _.template($('#intake-template').html()),

  events: {
    'click .remove': 'removeOneFood'
  },

  initialize: function() {

  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  },

  removeOneFood: function() {
    // this.model.destroy 会使app.IntakeFoods也remove该model选项，
    // 同时也会保存到localStorage中，不需要另外的语句去处理
    this.model.destroy();
    this.remove();
  }
});
