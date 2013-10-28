/**
Extension over Backbone.Collection
meant to provide database-like features.

@module backbone.collection.database
 */
define(['backbone','jquery','underscore','backbone.collection.database.filtered','underscore'],
function(Backbone , $      , undef      , Filtered                              , undef      ) {

    /**
    The Database constructor.

    @class Database
    @constructor
    @extends Backbone.Collection
    */
    var Database = Backbone.Collection.extend({

        pageLength: 10,
        /**
        The default quantity of items to be returned from a query.
        It is important for both remote and local operations.

        @property pageLength
        @type Number
        */

        ajaxOptions: {},
        /**
        Options object to be passed to the $.ajax method
        Example: { dataType: 'jsonp' }

        @property ajaxOptions
        @type Object
        */

        uniqueAttr: ['id'],
        /**
        Array of model attribute names that are unique.
        Unique attributes help accelerate data fetching by
        letting the Backbone DB instance know that if it can find one
        model with the uniqueAttr corresponding to the request params
        it can securely return the result without cheking with the server if there are
        other possible results.

        @property uniqueAttr
        @type Array
        */

        filters: {
            in: function(model, ids) {
                return _.isUndefined(model.id) ? false : _.contains(ids, model.id);
            },

            notIn: function(model, ids) {
                return _.isUndefined(model.id) ? false : !_.contains(ids, model.id);
            },
        },
        /**
        Object where the filters are stored.

        Filters are functions that receive two arguments:
        - the a model to which the filter is currently being applied to
        - the value the request received in the queryParameters hash

        @property attrFilters
        @type Object
        */

        initialize: function(models, config) {
            config = config || {};

            _.bindAll(this,'request','_requestByParams','_asynchRequest');

            this.pageLength = config.pageLength || this.pageLength;
            this.ajaxOptions = config.ajaxOptions || this.ajaxOptions;

            this.uniqueAttr = _.isString(config.uniqueAttr) ? this.uniqueAttr.push(config.uniqueAttr) : this
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

        cacheInit: function() {
            this._cache = {};
        }
    });


    return Database;
});
