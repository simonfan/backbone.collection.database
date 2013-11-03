define(['backbone.collection.database'], function(Database) {

return function() {

    module('Base');

    test('Base', function() {
        var database = new Database([], {
            url: 'http://nailonwall.com/cms/rest/artwork',
            limit: 6,
            xhrOptions: {
                dataType: 'jsonp'
            },
        });

        ok(database);
    });

}
});
