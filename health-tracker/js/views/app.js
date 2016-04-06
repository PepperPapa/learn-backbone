// js/views/app.js

var app = app || {};

// The Application
app.AppView = Backbone.View.extend({
  el: 'body',

  events: {
    'keydown #search-input': 'searchFood'
  },

  initialize: function () {
    this.$search = this.$('#search-input');

    this.listenTo(app.IntakeFoods, 'add', this.addOne);
    this.listenTo(app.IntakeFoods, 'remove', this.updateTotalCalories);

    app.IntakeFoods.fetch();
  },

  render: function() {

  },

  searchFood: function(e) {
    if (e.keyCode == 13) {
      var food = this.$search.val();
      var url = "https://api.nutritionix.com/v1_1/search/"+ food + "?" +
      "results=0:20&fields=item_name,brand_name,item_id,nf_calories&" +
      "appId=f767f108&appKey=991b372b32829b474a801ea008000bcb";

      $.getJSON(url, function(data) {
        // clear app.SearchFoods and li elements
        app.SearchFoods.reset();
        $('#search-list').html('');

        var results = data.hits;
        for (var i in results) {
          var food = new app.SearchFood({
            name: results[i].fields.item_name,
            calories: results[i].fields.nf_calories
          });
          app.SearchFoods.add(food);
        }
        app.SearchFoods.forEach(function(food) {
            var view = new app.SearchView({model: food});
            $('#search-list').append(view.render().el);
        });

      });
    }
  },

  addOne: function(intakefood) {
    var view = new app.IntakeView({model: intakefood});
    $('#food-list').append(view.render().el);
    this.updateTotalCalories();
    view.model.save();
  },

  updateTotalCalories: function() {
    $('#totals-calories').html(app.IntakeFoods.getTotalCalories());
  }
});
