/**
Define a cursor constructor that implements
MongoDB cursor's methods.

@submodule backbone.collection.database.cursor
*/
define(['jquery','lazy','underscore','underscore.between'],
function($      , undef, undef2     , undef3             ) {

    'use strict';

	var Cursor = function(options) {
		this._limit = options.limit;

		this.database = options.database;
		this.criteria = options.criteria;

		this.projection = options.projection;

        this._meta = _.extend({
            skip: 0,
            limit: undefined,
            'sort-attributes': [],
            'sort-directions': {},
        }, options.meta);

        this._syncedIntervals = [];
	};

	Cursor.prototype.query = function(projection) {
        // get default projection
        projection = projection || this.projection;

        // load metadata
        var sortAttributes = this.meta('sort-attributes'),
            sortDirections = this.meta('sort-directions'),
            skip = this.meta('skip'),
            limit = this.meta('limit');

        // sort the database befeore anything else.
        this.database.multisort(sortAttributes, sortDirections);

        // run the query over the sorted collection
		var q = this.database.query(this.criteria, projection);

        console.log(q);

        q = skip ? q.rest(skip) : q;
        q = limit ? q.take(limit) : q;

        return q;
	};
    /**
    Runs 'backbone.collection.database.query',
    checks for query meta attributes.

    If a sort is required, calls the database 'multisort' method.
    Runs database.query using the cursor's criteria hash and a projection object.

    If a skip is defined, use the Lazy object's rest() method.
    If a limit is defined, use Lazy object's take() method.

    @method query
    @param [projection] {Object}
    @return Lazy(models)
    */

	Cursor.prototype.skip = function(amount) {
		return this.meta('skip', amount);
	};

	Cursor.prototype.limit = function(amount) {
		return this.meta('limit', amount);
	};

    Cursor.prototype.sort = function(attributes, directions) {
        return {
            attributes: this.meta('sort-attributes', attributes),
            directions: this.meta('sort-directions', directions),
        };
    };

    Cursor.prototype.page = function(page, pageLength) {

        if (arguments.length === 0) {
            // read
            return this.skip() / this.limit();

        } else {
            if (pageLength) { this.limit( ageLength); }

            return this.skip(page * this.meta('limit'));
        }
    };
    /**

    @method
    */

    Cursor.prototype.nextPage = function() {
        return this.page(this.page() + 1);
    };

	Cursor.prototype.fetch = function(projection, options) {
        var _this = this,
            defer = $.Deferred(),
            sync = this.sync();

        sync.then(function() {
            var res = _this.query(projection).toArray();

            defer.resolve(res);
        })

		return defer;
	};
    /**

    @method fetch
    */

	Cursor.prototype.meta = function(key, value) {
        if (_.isUndefined(key)) {
            // no arguments, return full object
            return this._meta;

        } else if (_.isUndefined(value)) {
            // no value, simple get
            return this._meta[ key ];

        } else {
            this._meta[ key ] = value;
            return this;
        }
	};
    /**
    Sets and retrieves meta options.

    @method meta
    @param [key] {String}
    @param [value] {String}
    */

    Cursor.prototype._syncedIntervals = [];
    /**
    Contains intervals that indicate
    @property _syncedIntervals {Array}
    */

	Cursor.prototype.sync = function() {
        var _this = this,
            defer = $.Deferred(),
            meta = this.meta(),
            loaded = this.query('id').toArray(),

            // build the requestData:
            // merge criteria and metadata.
            requestData = _.extend({ loaded: loaded }, this.criteria, meta);


        this.database
            .load(requestData)
            .then(function() {
                var syncedInterval = [meta.skip, meta.skip + meta.limit];

                _this._syncedIntervals.push(syncedInterval)
                defer.resolve(_this);
            });

        return defer;
	};
	/**
	@method sync
	*/

	Cursor.prototype.isSynced = function(interval) {
        return _.any(this._syncedIntervals, function(syncedInterval) {
            return _.between(syncedInterval, interval);
        });
	};
	/**
	Check if the database has enough models in sync
	to supply the amount of models required.

	If no amount is provided..

	Checks if the database is consistent
	@method isSynced
	@param amount {Number}
	*/

	return Cursor;
});
