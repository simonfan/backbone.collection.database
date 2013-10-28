require.config({
	urlArgs: "bust=0.05919920816086233",
	baseUrl: "/dev",
	paths: {
        "backbone.collection.database": "../backbone.collection.database",
        "backbone.collection.database.filtered": "../backbone.collection.database.filtered",

		requirejs: "bower_components/requirejs/require",
		text: "bower_components/requirejs-text/text",
		jquery: "bower_components/jquery/jquery",
		backbone: "bower_components/backbone/backbone",
		"requirejs-text": "bower_components/requirejs-text/text",
		underscore: "bower_components/underscore/underscore"
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
