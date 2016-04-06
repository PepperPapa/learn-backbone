// js/models/calories.js

var app = app || {};

// food Model:  has name, calories, added attributes.
app.SearchFood = Backbone.Model.extend({
  defaults: {
    name: '',
    calories: 0,
    added: false
  }
});

app.IntakeFood = Backbone.Model.extend({
  defaults: {
    name: '',
    calories: 0,
    date: '',
    removed: false
  }
});
