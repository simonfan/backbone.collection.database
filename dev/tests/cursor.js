define(['backbone.collection.database'], function(Database) {

return function() {

    module('Cursor', {
        setup: function() {
            var NailArtworkDatabase = Database.extend({
                dataMap: {
                    limit: 'pageLength',
                    skip: 'initial'
                }
            })


            window.database = new NailArtworkDatabase([], {
                url: 'http://nailonwall.com/cms/rest/artwork',
                limit: 6,
                xhrOptions: {
                    dataType: 'jsonp'
                },
            });
        },
        teardown: function() {
     //       delete window.database;
        }
    });

    test('limit, skip, page, nextPage', function() {

        var cursor = database.request({ medium: 'Pintura' });

        ok(cursor);

        // set limit
        cursor.limit(15);
        cursor.skip(23);

        equal(cursor.meta().limit, 15);
        equal(cursor.meta().skip, 23);

        equal(cursor.limit(), 15, 'limit() as reader');
        equal(cursor.skip(), 23, 'skip() as reader');


        cursor.page(10);

        equal(cursor.meta().skip, 150);
        equal(cursor.page(), 10, 'page() as reader');

        cursor.nextPage();
        equal(cursor.page(), 11, 'moved to next page');
        equal(cursor.limit(), 15);
        equal(cursor.skip(), 165);
    });

    test('sort', function() {
        var cursor = database.request({ medium: 'Pintura' });

        cursor.sort(['created'], -1);

        deepEqual(cursor.meta('sort-attributes'),['created']);
        deepEqual(cursor.meta('sort-directions'), -1);
    });

    asyncTest('fetch', function() {
        var cursor = database.request({ medium: 'Pintura' });

        cursor
            .limit(15)
            .sort('created', 1);

        cursor.fetch().then(function(res) {
            equal(res.length, 15);

            ok(cursor.isSynced([3, 9]));

            start();
        });
    })

}
});
