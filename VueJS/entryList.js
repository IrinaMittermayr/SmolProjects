"use strict";

var mtd280 = mtd280 || {};

mtd280.EntryList = Backbone.Collection.extend({
	model: mtd280.Entry,
	localStorage: new Backbone.LocalStorage('mtd280-entries-g1')
});