"use strict";

var mtd280 = mtd280 || {};

mtd280.Entry = Backbone.Model.extend({
	defaults: function() {
		return {
			firstname : '',
			lastname : ''
		}
	},
	validate: function(attributes) {
		if (attributes.firstname.trim().length == 0) {
			return "Content cannot be 0";
		}if (attributes.lastname.trim().length == 0) {
			return "Content cannot be 0";
		}
		
	}
});