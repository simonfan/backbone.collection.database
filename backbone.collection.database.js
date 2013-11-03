/**
Extension over Backbone.Collection
meant to provide database-like features.

@module backbone.collection.database
 */
define(['backbone.collection.queryable','backbone.collection.database.cursor','jquery','underscore','backbone.collection.multisort'],
function(Queryable                     , Cursor                              , $      , undef      , MultiSort                     ) {

    /**
    The Database constructor.

    @class Database
    @constructor
    @extends backbone.collection.queryable
    @extends backbone.collection.multisort
        NOTE: Extension order is essential. Queryable must be the last one.
    */
    var Database = MultiSort.extend(Queryable.prototype).extend({

        projection: void 0,
        /**
        The default projection.
        */

        limit: 10,
        /**
        The default quantity of items to be returned from a query.
        It is important for both remote and local operations.

        @property limit
        @type Number
        */

        xhrOptions: {},
        /**
        Options object to be passed to the $.ajax method
        Example: { dataType: 'jsonp' }

        @property xhrOptions
        @type Object
        */

        initialize: function(models, config) {
            config = config || {};

            _.bindAll(this,'request','load');


            this.url = config.url
            this.limit = config.limit || this.limit;
            this.xhrOptions = config.xhrOptions || config.ajaxOptions || this.xhrOptions;


            // cursor objects are stored here.
            this._cursors = {};

            // cache
            this._cache = {};
        },
        /**
        Binds other methods to instance,
        saves options and sets internal properties.

        @method initialize

        @param {Array} models
            Models to be added on
            initialization to the database.
        @param {Object} [config]
            Configuration object
         */

        requestOne: function(criteria) {

        },
        /**

        @method
        */




        load: function(requestData) {

            // map the requestData
            requestData = this._mapRequestData(requestData);

            // attempt to load from cache
            var cached = this.cache(requestData);

            if (cached) {
                return cached;

            } else {

                /**
                 * before, we implemented the request by ourselves,
                 * so we had to parse and add the response.
                 * The new implementation uses Bakcbone built-in fetch functionality, with some special options.
                 */
                console.log(this);

                    // fetch options: Backbone.set options, jqXHR options
                var fetchOptions = _.extend({
                        data: requestData,
                        remove: false
                    }, this.xhrOptions),
                    // run fetch
                    fetch = this.fetch(fetchOptions);


                // cache fetch and return it
                return this.cache(requestData, fetch);
            }

        },
        /**
        Coordinates the whole process of loading data from server.
        @method load
        */

        Cursor: Cursor,
        _cursors: {},
        cursor: function(criteria) {
            criteria = criteria || {};

            var cursorId = JSON.stringify(criteria);

            return this._cursors[ cursorId ] ? this._cursors[ cursorId ] : this._cursors[ cursorId ] = new this.Cursor({
                database: this,
                criteria: criteria,
                limit: this.limit,
            });
        },
        /**
        Returns a cursor that attends the criteria.
        Internalizes the creation of the cursor, so that the cursor is always
        available.

        @method cursor
        */


        dataMap: {},
        _mapRequestData: function(requestData) {

            _.each(this.dataMap, function(dest, src) {

                var value = requestData[ src ];

                // save
                requestData[ dest ] = _.isObject(value) ? _.clone(value) : value;

                // remove original
                delete requestData[ src ];
            });

            return requestData;
        },
        /**
        Receives a data object containing data about the request
        to be made to the database.
        Should return a data object with the mapped data names.

        @method _mapRequestData
        */


        // Cache system
        _cache: {},
        cache: function(requestData, requestPromise) {
                // the request identifier is a JSON string.
            var requestIdentifier = JSON.stringify(requestData);

            return (arguments.length < 2) ? this._cache[ requestIdentifier ] : this._cache[ requestIdentifier ] = requestPromise;
        },
    });


    // aliases
    Database.prototype.request = Database.prototype.cursor;


    return Database;
});
