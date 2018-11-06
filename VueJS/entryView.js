"use strict";

var mtd280 = mtd280 || {};

mtd280.EntryView = Backbone.View.extend({
	
	tagName: 'li',
	
	initialize: function() {
		this.listenTo(this.model, 'remove', this.remove);
		this.listenTo(this.model, 'change:lastname', this.render);
		this.listenTo(this.model, 'change:firstname', this.render);


		/*if($('#firstname').val() != 0){
			alert("firstname != 0");
			this.listenTo((this.model, 'change:lastname'), this.render);
			this.render();
		}*/

	},
	
	events: {
		"click .delete": "deleteEntry",
		"dblclick .viewfirst": "editEntry",
		"dblclick .viewlast": "editEntry2",

		"blur .firstnameEdit": "saveEntry",
		"blur .lastnameEdit": "saveEntry"


	},
	
	template: _.template($('#entryTemplate').html()),
	
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));

		this.firstname = this.$(".firstnameEdit");
		this.lastname = this.$(".lastnameEdit");

		return this;
	},
	
	deleteEntry: function() {
		this.model.destroy();
	},
	
	editEntry: function() {
		this.$el.addClass("editing");

		this.firstname.focus();
	},

	editEntry2: function() {
		this.$el.addClass("editing");

		this.lastname.focus();
	},
	
	saveEntry: function() {
		this.$el.removeClass("editing");
		this.model.set("firstname", this.firstname.val());
		this.model.set("lastname", this.lastname.val());

		this.model.save();
	}
	
});