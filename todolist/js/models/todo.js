// js/models/todo.js

var app = app || {};

// Todo model
// -----------
// Our basic **Todo** model has 'title' and 'completed' attributes.

app.Todo = Backbone.Model.extend({
  // Default attributes ensure that each todo created has 'title' and
  //'completed' kyes
  defaults: {
    title: '',
    completed: false
  },

  // Toggle the 'completed' state of this todo item.
  toggle: function() {
    this.save({
      completed: !this.get('completed')
    });
  }
});
