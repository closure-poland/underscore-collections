/*
*	Underscore-collections 0.0.1
*	https://github.com/akkenoth/underscore-collections
*	(C) 2014 Akkenoth, MIT License
*/

(function() {

	// Baseline setup
	// --------------
	// Yes, it's copy-pasted from underscore

	// Establish the root object, `window` in the browser, or `exports` on the server.
	var root = this;

	// Save the previous value of the `_` variable.
	var previousUnderscore = root._;

	// Save bytes in the minified (but not gzipped) version:
	var ArrayProto = Array.prototype,
		ObjProto = Object.prototype,
		FuncProto = Function.prototype;

	// Create quick reference variables for speed access to core prototypes.
	var	push			= ArrayProto.push,
		slice			= ArrayProto.slice,
		concat			= ArrayProto.concat,
		toString		= ObjProto.toString,
		hasOwnProperty	= ObjProto.hasOwnProperty;

	// All **ECMAScript 5** native function implementations that we hope to use
	// are declared here.
	var
		nativeIsArray	= Array.isArray,
		nativeKeys		= Object.keys,
		nativeBind		= FuncProto.bind;

	// Create a safe reference to the Underscore-collections object for use below.
	var _ = function(obj) {
		if (obj instanceof _)
			return obj;
		if (!(this instanceof _))
			return new _(obj);
		this._wrapped = obj;
	};

	// Export the Underscore-collections object for **Node.js**, with
	// backwards-compatibility for the old `require()` API. If we're in
	// the browser, add `_` as a global object.
	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = _;
		}
		exports._ = _;
	} else {
		root._ = _;
	}

	// Current version.
	_.VERSION = '0.1.1';

	// Require underscore for obvious reasons
	var Us = require('underscore');

	// Return the position of the first occurrence of an item OR OBJECT in an array,
	// or -1 if the item is not included in the array.
	// If the array is large and already in sort order, pass `true`
	// for **isSorted** to use binary search.
	// Uses isEqual instead of '==='.
	_.indexOfDeep = function(array, item, isSorted) {
		if (array == null)
			return -1;
		var i = 0, length = array.length;
		if (isSorted) {
			if (typeof isSorted == 'number') {
				i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
			} else {
				i = Us.sortedIndex(array, item);
				return Us.isEqual(array[i], item) ? i : -1;
			}
		}
		for (; i < length; i++)
			if (Us.isEqual(array[i], item))
				return i;
	}

	// Determine if the array or object contains a given value (using `isEqual`).
	// Aliased as `includeDeep`.
	_.containsDeep = _.includeDeep = function(obj, target) {
		if (obj == null)
			return false;
		if (obj.length !== +obj.length)
			obj = Us.values(obj);
		return _.indexOfDeep(obj, target) >= 0;
	}

	// Produce an array that contains every item OR OBJECT shared between all the
	// passed-in arrays.
	_.intersectionDeep = _.intersectDeep = function(array) {
		if (array == null)
			return [];
		var result = [];
		var argsLength = arguments.length;
		for (var i = 0, length = array.length; i < length; i++) {
			var item = array[i];
			if (_.containsDeep(result, item))
				continue;
			for (var j = 1; j < argsLength; j++) {
				if (!_.containsDeep(arguments[j], item))
					break;
			}
			if (j === argsLength)
				result.push(item);
		}
		return result;
	}

	// Internal implementation of a recursive `flatten` function.
	//From base UnderscoreJS.
	var flatten = function(input, shallow, strict, output) {
		if (shallow && Us.every(input, Us.isArray)) {
			return concat.apply(output, input);
		}
		for (var i = 0, length = input.length; i < length; i++) {
			var value = input[i];
			if (!Us.isArray(value) && !Us.isArguments(value)) {
				if (!strict)
					output.push(value);
			} else if (shallow) {
				push.apply(output, value);
			} else {
				flatten(value, shallow, strict, output);
			}
		}
	return output;
	};

	// Take the difference between one array and a number of other arrays.
	// Only the elements present in just the first array will remain.
	// Uses 'isEqual' instead of '===' to work for nested objects/arrays.
	_.differenceDeep = function(array) {
		var rest = flatten(slice.call(arguments,1),
							true,
							true,
							[]);
		return Us.filter(array, function(value) {
			return !_.containsDeep(rest, value);
		});
	}

}.call(this));
