"use strict";
/*
 * MTD280 Online Multimedia
 * http://www.fh-ooe.at/mtd
 *
 * MTD280 Example
 *
 */

var mtd280 = mtd280 || {};

mtd280.module = (function($) {

  //------------------//    	
	function init() {
  //------------------//
		let appView = new mtd280.AppView();
  
		/*
		let entry = new mtd280.Entry();
		//console.log(entry);
		
		let view = new mtd280.EntryView({model: entry});
		view.render();
		console.log(view.el);
		*/
	};	

	$(document).ready(init);

		
}($));
