"use strict";

var mtd280 = mtd280 || {};

mtd280.AppView = Backbone.View.extend({
	
	el: $('#appDiv'),
	
	initialize: function() {
		this.entries = new mtd280.EntryList();
		
		this.listenTo(this.entries, 'add', this.printEntry);
		
		this.entries.fetch();
		
		this.firstname = this.$('#firstname');

		this.lastname = this.$('#lastname')
	},
	
	events: {
		"click #save": "saveEntry",
		"click #clear": "clearEntry"
	},
	
	saveEntry: function()  {
		this.entries.create({firstname: this.firstname.val(), lastname: this.lastname.val()});
		this.firstname.val('');
		this.lastname.val('');
	},
	
	printEntry: function(entry) {
		let entryView;
		entryView = new mtd280.EntryView({model: entry});
		this.$('#entries').append(entryView.render().el);
	},


	clearEntry: function() {
		let model;
		while (model = this.entries.at(0)) {
			model.destroy();
		}
	}
	
});