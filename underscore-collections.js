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
	var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

	// Create quick reference variables for speed access to core prototypes.
	var
		push			= ArrayProto.push,
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
		if (obj instanceof _) return obj;
		if (!(this instanceof _)) return new _(obj);
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
	_.VERSION = '0.0.1';

	// Require underscore for obvious reasons
	var Us = require('underscore');

}.call(this));