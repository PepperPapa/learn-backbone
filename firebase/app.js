// A simple todo model
var Todo = Backbone.Model.extend({
  defaults: {
    title: "New Todo"
  }
});

// Create a Firebase.collection and set the 'firebase' property
// to the URL of our datebase
var TodoCollection = Backbone.Firebase.Collection.extend({
  model: Todo,
  url: "https://dazzling-torch-7797.firebaseio.com/"
});

// A view for an individual todo item
var TodoView = Backbone.View.extend({
  tagName: "li",
  template: _.template("<%= title %>"),
  initialize: function() {
    this.listenTo(this.model, "change", this.render);
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

// The view for the entire application
var AppView = Backbone.View.extend({
  el: $('#todoapp'),
  events: {
    "click #add-todo": "createTodo",
  },
  initialize: function() {
    this.list = this.$("#todo-list");  // the list to append to
    this.input = this.$("#new-todo"); // the textbox for new todos

    // by listening to when the collection changes we
    // can add new items in realtime
    this.listenTo(this.collection, 'add', this.addone);
  },
  addone: function(todo) {
    var view = new TodoView({model: todo});
    this.list.append(view.render().el);
  },
  createTodo: function(e) {
    if (!this.input.val()) {
      return;
    }

    // create a new location in firebase and save the model datebase
    // this will trigger the listenTo method above and a new todo view
    // will be created as well
    this.collection.create({title: this.input.val()});

    this.input.val('');
  }
});

// create a function to kick off our Backbonefire app
function init() {
  // The data we are syncing from our remote firebase database
  var collection = new TodoCollection();
  var app = new AppView({collection: collection});
}

// when the document is ready, call the init function
$(function() {
  init();
});
