// js/collections/foods.js

var app = app || {};

var SearchFoodList = Backbone.Collection.extend({
  model: app.SearchFood
});
app.SearchFoods = new SearchFoodList();

var IntakeFoodList = Backbone.Collection.extend({
  model: app.IntakeFood,

  localStorage: new Backbone.LocalStorage('health-tracker'),

  getTotalCalories: function() {
      return this.models.map(function(intakefood){
        return intakefood.get('calories');
      }).reduce(function(a, b) {
        return a + b;
      }, 0);
  }
});
app.IntakeFoods = new IntakeFoodList();
