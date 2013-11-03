require.config({
	urlArgs: "bust=0.05919920816086233",
	baseUrl: "/dev",
	paths: {
		"backbone.collection.database": "../backbone.collection.database",
		"backbone.collection.database.cursor": "../backbone.collection.database.cursor",
		requirejs: "bower_components/requirejs/require",
		text: "bower_components/requirejs-text/text",
		jquery: "bower_components/jquery/jquery",
		backbone: "bower_components/backbone/backbone",
		"requirejs-text": "bower_components/requirejs-text/text",
		underscore: "bower_components/underscore/underscore",
		"backbone.collection.lazy": "bower_components/backbone.collection.lazy/backbone.collection.lazy",
		"backbone.collection.queryable": "bower_components/backbone.collection.queryable/backbone.collection.queryable",
		"underscore.containers": "bower_components/underscore.containers/underscore.containers",
		"underscore.deep": "bower_components/underscore.deep/underscore.deep",
		lazy: "bower_components/lazy.js/lazy",
		"ordered-object": "bower_components/ordered-object/ordered-object",
		"underscore.between": "bower_components/underscore.between/underscore.between",
		"underscore.comparator": "bower_components/underscore.comparator/underscore.comparator",
		"backbone.collection.multisort": "bower_components/backbone.collection.multisort/backbone.collection.multisort"
	},
	shim: {
		backbone: {
			exports: "Backbone",
			deps: [
				"jquery",
				"underscore"
			]
		},
		underscore: {
			exports: "_"
		}
	}
});

(function() {
    var load = window.__load || 'amd-test-runner';
    require([load], function(mod) {
        console.log('Main loading finished.');
    });
})();
