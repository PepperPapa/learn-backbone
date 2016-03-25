// js/collections/todos.js

var app = app || {};

// Todo collections
// ----------------

// The collection of todos is backed *localStorage* instead of a remote server
var TodoList = Backbone.Collection.extend({
  // Reference to this collection's model.
  model: app.Todo,

  // Save all of the todo items under the '"todos-backbone"' namespace.
  localStorage: new Backbone.LocalStorage('todos-backbone'),

  // Filter down the list of all todo items that are finished.
  // this.filter is Underscore method.
  completed: function() {
    return this.filter(function(todo) {
      return todo.get('completed');
    });
  },

  // Filter down the list to only todo items that are still not finished.
  // this.without is Underscore method.
  remaining: function() {
    return this.without.apply(this, this.completed);
  },

  // We keep the Todos in sequential order, despite being saved by unordered
  // GUID in the datebase. This generates the next order number for new items.
  // this.last is Underscore method.
  nextOrder: function() {
    if (!this.length) {
      return 1;
    }
    return this.last().get('order') + 1;
  },

  // Todos are sorted by their original insertion order.
  comparator: function(todo) {
    return todo.get('order');
  }
});

// Create our global collection of **Todos**.
app.Todos = new TodoList();
