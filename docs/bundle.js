/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// Enable .html reloading for dev
__webpack_require__(2)

// Get Styles
__webpack_require__(3)


// A-Frame Requried in Head, import components here
var DataParse = __webpack_require__(4)
__webpack_require__(6)


// A-Frame requires head script injection, wait until DOM is loaded to do vanilla JS
// https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded
document.addEventListener('DOMContentLoaded', readyToGo)


var loadedData = null;
// Loaded Wrapper
function readyToGo() {

	// Event listener on file load
	var input = document.querySelector('#upload-data');
 	input.addEventListener('change', (event)=>{

 		// Load input file 
 		DataParse.papaFile(input, (dataFile)=>{
 			
 			// async update once loaded parsed data
 			loadedData = DataParse.parseDatafile(dataFile)
 	

 		})
 	})
};



// class helpers
// https://plainjs.com/javascript/attributes/adding-removing-and-testing-for-classes-9/
function hasClass(el, className) {
    return el.classList ? el.classList.contains(className) : new RegExp('\\b'+ className+'\\b').test(el.className);
}

function addClass(el, className) {
    if (el.classList) el.classList.add(className);
    else if (!hasClass(el, className)) el.className += ' ' + className;
}

function removeClass(el, className) {
    if (el.classList) el.classList.remove(className);
    else el.className = el.className.replace(new RegExp('\\b'+ className+'\\b', 'g'), '');
}




/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = "<!DOCTYPE html>\n<html>\n\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n    <meta name=\"author\" content=\"exactly.allan@gmail.com\">\n    <meta name=\"description\" content=\"OBD2 Car Data Visualization\">\n    <script src=\"https://aframe.io/releases/0.6.1/aframe.min.js\"></script>\n</head>\n\n<body>\n    <!-- load button -->\n    <div class=\"load-button-wrap\" title=\"click to upload OBD2 csv data\">\n        <label for=\"upload-data\">Upload Data</label>\n        <input type=\"file\" id=\"upload-data\" accept=\".tsv, .csv, .txt\">\n    </div>\n\n    <!-- A-frame -->\n    <a-scene antialias=\"false\">\n        <a-entity camera position=\"0 20 40\" look-controls wasd-controls></a-entity>\n        <a-sky color=\"#3c3b3b\"></a-sky>\n        <!-- Loading Section -->\n        <a-icosahedron id=\"loading-ico\" position=\"0 20 0\" color=\"#FFF\" radius=\"5\" wireframe=\"true\" animation=\"property: rotation; dur:8000; to:180 360 0; easing:linear; loop:true\"></a-icosahedron>\n\n    </a-scene>\n</body>\n\n</html>";

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// Data parser
// For data generated by OBD fusion app
// https://www.obdsoftware.net/software/obdfusion


// Load Data file via http://papaparse.com/
var Papa = __webpack_require__(5)


// Papa parse file
var papaFile = function(input, callback) {
    // if file selected
    if (input.files.length > 0) {

    	//var status = document.querySelector('.chrom-stats')
		//status.innerHTML = "Loading Data..."

        Papa.parse(input.files[0], {
            delimiter: "", // auto-detect
            newline: "", // auto-detect
            quoteChar: '"',
            comments: "#",
            header: true,
            skipEmptyLines: true,
            error: function(err, file, inputElem, reason) {
                console.log("File loading error:", err, reason)
                callback( null )
            },
            complete: function(results) {
                console.log("File loaded: ", results);
               	callback( results )
            }
        })
    }


}

// Map parsed results to array useable for viz
var parseDatafile = function(rawData) {

	// if error 
	if(rawData === null){
		return (null)
	}


    return (rawData)

}


// export
module.exports = {
	papaFile: papaFile,
	parseDatafile: parseDatafile
}




/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Papa Parse
	v4.3.6
	https://github.com/mholt/PapaParse
	License: MIT
*/
(function(root, factory)
{
	if (true)
	{
		// AMD. Register as an anonymous module.
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	else if (typeof module === 'object' && typeof exports !== 'undefined')
	{
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory();
	}
	else
	{
		// Browser globals (root is window)
		root.Papa = factory();
	}
}(this, function()
{
	'use strict';

	var global = (function () {
		// alternative method, similar to `Function('return this')()`
		// but without using `eval` (which is disabled when
		// using Content Security Policy).

		if (typeof self !== 'undefined') { return self; }
		if (typeof window !== 'undefined') { return window; }
		if (typeof global !== 'undefined') { return global; }

		// When running tests none of the above have been defined
		return {};
	})();


	var IS_WORKER = !global.document && !!global.postMessage,
		IS_PAPA_WORKER = IS_WORKER && /(\?|&)papaworker(=|&|$)/.test(global.location.search),
		LOADED_SYNC = false, AUTO_SCRIPT_PATH;
	var workers = {}, workerIdCounter = 0;

	var Papa = {};

	Papa.parse = CsvToJson;
	Papa.unparse = JsonToCsv;

	Papa.RECORD_SEP = String.fromCharCode(30);
	Papa.UNIT_SEP = String.fromCharCode(31);
	Papa.BYTE_ORDER_MARK = '\ufeff';
	Papa.BAD_DELIMITERS = ['\r', '\n', '"', Papa.BYTE_ORDER_MARK];
	Papa.WORKERS_SUPPORTED = !IS_WORKER && !!global.Worker;
	Papa.SCRIPT_PATH = null;	// Must be set by your code if you use workers and this lib is loaded asynchronously

	// Configurable chunk sizes for local and remote files, respectively
	Papa.LocalChunkSize = 1024 * 1024 * 10;	// 10 MB
	Papa.RemoteChunkSize = 1024 * 1024 * 5;	// 5 MB
	Papa.DefaultDelimiter = ',';			// Used if not specified and detection fails

	// Exposed for testing and development only
	Papa.Parser = Parser;
	Papa.ParserHandle = ParserHandle;
	Papa.NetworkStreamer = NetworkStreamer;
	Papa.FileStreamer = FileStreamer;
	Papa.StringStreamer = StringStreamer;
	Papa.ReadableStreamStreamer = ReadableStreamStreamer;

	if (global.jQuery)
	{
		var $ = global.jQuery;
		$.fn.parse = function(options)
		{
			var config = options.config || {};
			var queue = [];

			this.each(function(idx)
			{
				var supported = $(this).prop('tagName').toUpperCase() === 'INPUT'
								&& $(this).attr('type').toLowerCase() === 'file'
								&& global.FileReader;

				if (!supported || !this.files || this.files.length === 0)
					return true;	// continue to next input element

				for (var i = 0; i < this.files.length; i++)
				{
					queue.push({
						file: this.files[i],
						inputElem: this,
						instanceConfig: $.extend({}, config)
					});
				}
			});

			parseNextFile();	// begin parsing
			return this;		// maintains chainability


			function parseNextFile()
			{
				if (queue.length === 0)
				{
					if (isFunction(options.complete))
						options.complete();
					return;
				}

				var f = queue[0];

				if (isFunction(options.before))
				{
					var returned = options.before(f.file, f.inputElem);

					if (typeof returned === 'object')
					{
						if (returned.action === 'abort')
						{
							error('AbortError', f.file, f.inputElem, returned.reason);
							return;	// Aborts all queued files immediately
						}
						else if (returned.action === 'skip')
						{
							fileComplete();	// parse the next file in the queue, if any
							return;
						}
						else if (typeof returned.config === 'object')
							f.instanceConfig = $.extend(f.instanceConfig, returned.config);
					}
					else if (returned === 'skip')
					{
						fileComplete();	// parse the next file in the queue, if any
						return;
					}
				}

				// Wrap up the user's complete callback, if any, so that ours also gets executed
				var userCompleteFunc = f.instanceConfig.complete;
				f.instanceConfig.complete = function(results)
				{
					if (isFunction(userCompleteFunc))
						userCompleteFunc(results, f.file, f.inputElem);
					fileComplete();
				};

				Papa.parse(f.file, f.instanceConfig);
			}

			function error(name, file, elem, reason)
			{
				if (isFunction(options.error))
					options.error({name: name}, file, elem, reason);
			}

			function fileComplete()
			{
				queue.splice(0, 1);
				parseNextFile();
			}
		}
	}


	if (IS_PAPA_WORKER)
	{
		global.onmessage = workerThreadReceivedMessage;
	}
	else if (Papa.WORKERS_SUPPORTED)
	{
		AUTO_SCRIPT_PATH = getScriptPath();

		// Check if the script was loaded synchronously
		if (!document.body)
		{
			// Body doesn't exist yet, must be synchronous
			LOADED_SYNC = true;
		}
		else
		{
			document.addEventListener('DOMContentLoaded', function () {
				LOADED_SYNC = true;
			}, true);
		}
	}




	function CsvToJson(_input, _config)
	{
		_config = _config || {};
		var dynamicTyping = _config.dynamicTyping || false;
		if (isFunction(dynamicTyping)) {
			_config.dynamicTypingFunction = dynamicTyping;
			// Will be filled on first row call
			dynamicTyping = {};
		}
		_config.dynamicTyping = dynamicTyping;

		if (_config.worker && Papa.WORKERS_SUPPORTED)
		{
			var w = newWorker();

			w.userStep = _config.step;
			w.userChunk = _config.chunk;
			w.userComplete = _config.complete;
			w.userError = _config.error;

			_config.step = isFunction(_config.step);
			_config.chunk = isFunction(_config.chunk);
			_config.complete = isFunction(_config.complete);
			_config.error = isFunction(_config.error);
			delete _config.worker;	// prevent infinite loop

			w.postMessage({
				input: _input,
				config: _config,
				workerId: w.id
			});

			return;
		}

		var streamer = null;
		if (typeof _input === 'string')
		{
			if (_config.download)
				streamer = new NetworkStreamer(_config);
			else
				streamer = new StringStreamer(_config);
		}
		else if (_input.readable === true && isFunction(_input.read) && isFunction(_input.on))
		{
			streamer = new ReadableStreamStreamer(_config);
		}
		else if ((global.File && _input instanceof File) || _input instanceof Object)	// ...Safari. (see issue #106)
			streamer = new FileStreamer(_config);

		return streamer.stream(_input);
	}






	function JsonToCsv(_input, _config)
	{
		var _output = '';
		var _fields = [];

		// Default configuration

		/** whether to surround every datum with quotes */
		var _quotes = false;

		/** whether to write headers */
		var _writeHeader = true;

		/** delimiting character */
		var _delimiter = ',';

		/** newline character(s) */
		var _newline = '\r\n';

		/** quote character */
		var _quoteChar = '"';

		unpackConfig();

		var quoteCharRegex = new RegExp(_quoteChar, 'g');

		if (typeof _input === 'string')
			_input = JSON.parse(_input);

		if (_input instanceof Array)
		{
			if (!_input.length || _input[0] instanceof Array)
				return serialize(null, _input);
			else if (typeof _input[0] === 'object')
				return serialize(objectKeys(_input[0]), _input);
		}
		else if (typeof _input === 'object')
		{
			if (typeof _input.data === 'string')
				_input.data = JSON.parse(_input.data);

			if (_input.data instanceof Array)
			{
				if (!_input.fields)
					_input.fields =  _input.meta && _input.meta.fields;

				if (!_input.fields)
					_input.fields =  _input.data[0] instanceof Array
									? _input.fields
									: objectKeys(_input.data[0]);

				if (!(_input.data[0] instanceof Array) && typeof _input.data[0] !== 'object')
					_input.data = [_input.data];	// handles input like [1,2,3] or ['asdf']
			}

			return serialize(_input.fields || [], _input.data || []);
		}

		// Default (any valid paths should return before this)
		throw 'exception: Unable to serialize unrecognized input';


		function unpackConfig()
		{
			if (typeof _config !== 'object')
				return;

			if (typeof _config.delimiter === 'string'
				&& _config.delimiter.length === 1
				&& Papa.BAD_DELIMITERS.indexOf(_config.delimiter) === -1)
			{
				_delimiter = _config.delimiter;
			}

			if (typeof _config.quotes === 'boolean'
				|| _config.quotes instanceof Array)
				_quotes = _config.quotes;

			if (typeof _config.newline === 'string')
				_newline = _config.newline;

			if (typeof _config.quoteChar === 'string')
				_quoteChar = _config.quoteChar;

			if (typeof _config.header === 'boolean')
				_writeHeader = _config.header;
		}


		/** Turns an object's keys into an array */
		function objectKeys(obj)
		{
			if (typeof obj !== 'object')
				return [];
			var keys = [];
			for (var key in obj)
				keys.push(key);
			return keys;
		}

		/** The double for loop that iterates the data and writes out a CSV string including header row */
		function serialize(fields, data)
		{
			var csv = '';

			if (typeof fields === 'string')
				fields = JSON.parse(fields);
			if (typeof data === 'string')
				data = JSON.parse(data);

			var hasHeader = fields instanceof Array && fields.length > 0;
			var dataKeyedByField = !(data[0] instanceof Array);

			// If there a header row, write it first
			if (hasHeader && _writeHeader)
			{
				for (var i = 0; i < fields.length; i++)
				{
					if (i > 0)
						csv += _delimiter;
					csv += safe(fields[i], i);
				}
				if (data.length > 0)
					csv += _newline;
			}

			// Then write out the data
			for (var row = 0; row < data.length; row++)
			{
				var maxCol = hasHeader ? fields.length : data[row].length;

				for (var col = 0; col < maxCol; col++)
				{
					if (col > 0)
						csv += _delimiter;
					var colIdx = hasHeader && dataKeyedByField ? fields[col] : col;
					csv += safe(data[row][colIdx], col);
				}

				if (row < data.length - 1)
					csv += _newline;
			}

			return csv;
		}

		/** Encloses a value around quotes if needed (makes a value safe for CSV insertion) */
		function safe(str, col)
		{
			if (typeof str === 'undefined' || str === null)
				return '';

			str = str.toString().replace(quoteCharRegex, _quoteChar+_quoteChar);

			var needsQuotes = (typeof _quotes === 'boolean' && _quotes)
							|| (_quotes instanceof Array && _quotes[col])
							|| hasAny(str, Papa.BAD_DELIMITERS)
							|| str.indexOf(_delimiter) > -1
							|| str.charAt(0) === ' '
							|| str.charAt(str.length - 1) === ' ';

			return needsQuotes ? _quoteChar + str + _quoteChar : str;
		}

		function hasAny(str, substrings)
		{
			for (var i = 0; i < substrings.length; i++)
				if (str.indexOf(substrings[i]) > -1)
					return true;
			return false;
		}
	}

	/** ChunkStreamer is the base prototype for various streamer implementations. */
	function ChunkStreamer(config)
	{
		this._handle = null;
		this._paused = false;
		this._finished = false;
		this._input = null;
		this._baseIndex = 0;
		this._partialLine = '';
		this._rowCount = 0;
		this._start = 0;
		this._nextChunk = null;
		this.isFirstChunk = true;
		this._completeResults = {
			data: [],
			errors: [],
			meta: {}
		};
		replaceConfig.call(this, config);

		this.parseChunk = function(chunk)
		{
			// First chunk pre-processing
			if (this.isFirstChunk && isFunction(this._config.beforeFirstChunk))
			{
				var modifiedChunk = this._config.beforeFirstChunk(chunk);
				if (modifiedChunk !== undefined)
					chunk = modifiedChunk;
			}
			this.isFirstChunk = false;

			// Rejoin the line we likely just split in two by chunking the file
			var aggregate = this._partialLine + chunk;
			this._partialLine = '';

			var results = this._handle.parse(aggregate, this._baseIndex, !this._finished);

			if (this._handle.paused() || this._handle.aborted())
				return;

			var lastIndex = results.meta.cursor;

			if (!this._finished)
			{
				this._partialLine = aggregate.substring(lastIndex - this._baseIndex);
				this._baseIndex = lastIndex;
			}

			if (results && results.data)
				this._rowCount += results.data.length;

			var finishedIncludingPreview = this._finished || (this._config.preview && this._rowCount >= this._config.preview);

			if (IS_PAPA_WORKER)
			{
				global.postMessage({
					results: results,
					workerId: Papa.WORKER_ID,
					finished: finishedIncludingPreview
				});
			}
			else if (isFunction(this._config.chunk))
			{
				this._config.chunk(results, this._handle);
				if (this._paused)
					return;
				results = undefined;
				this._completeResults = undefined;
			}

			if (!this._config.step && !this._config.chunk) {
				this._completeResults.data = this._completeResults.data.concat(results.data);
				this._completeResults.errors = this._completeResults.errors.concat(results.errors);
				this._completeResults.meta = results.meta;
			}

			if (finishedIncludingPreview && isFunction(this._config.complete) && (!results || !results.meta.aborted))
				this._config.complete(this._completeResults, this._input);

			if (!finishedIncludingPreview && (!results || !results.meta.paused))
				this._nextChunk();

			return results;
		};

		this._sendError = function(error)
		{
			if (isFunction(this._config.error))
				this._config.error(error);
			else if (IS_PAPA_WORKER && this._config.error)
			{
				global.postMessage({
					workerId: Papa.WORKER_ID,
					error: error,
					finished: false
				});
			}
		};

		function replaceConfig(config)
		{
			// Deep-copy the config so we can edit it
			var configCopy = copy(config);
			configCopy.chunkSize = parseInt(configCopy.chunkSize);	// parseInt VERY important so we don't concatenate strings!
			if (!config.step && !config.chunk)
				configCopy.chunkSize = null;  // disable Range header if not streaming; bad values break IIS - see issue #196
			this._handle = new ParserHandle(configCopy);
			this._handle.streamer = this;
			this._config = configCopy;	// persist the copy to the caller
		}
	}


	function NetworkStreamer(config)
	{
		config = config || {};
		if (!config.chunkSize)
			config.chunkSize = Papa.RemoteChunkSize;
		ChunkStreamer.call(this, config);

		var xhr;

		if (IS_WORKER)
		{
			this._nextChunk = function()
			{
				this._readChunk();
				this._chunkLoaded();
			};
		}
		else
		{
			this._nextChunk = function()
			{
				this._readChunk();
			};
		}

		this.stream = function(url)
		{
			this._input = url;
			this._nextChunk();	// Starts streaming
		};

		this._readChunk = function()
		{
			if (this._finished)
			{
				this._chunkLoaded();
				return;
			}

			xhr = new XMLHttpRequest();

			if (this._config.withCredentials)
			{
				xhr.withCredentials = this._config.withCredentials;
			}

			if (!IS_WORKER)
			{
				xhr.onload = bindFunction(this._chunkLoaded, this);
				xhr.onerror = bindFunction(this._chunkError, this);
			}

			xhr.open('GET', this._input, !IS_WORKER);
			// Headers can only be set when once the request state is OPENED
			if (this._config.downloadRequestHeaders)
			{
				var headers = this._config.downloadRequestHeaders;

				for (var headerName in headers)
				{
					xhr.setRequestHeader(headerName, headers[headerName]);
				}
			}

			if (this._config.chunkSize)
			{
				var end = this._start + this._config.chunkSize - 1;	// minus one because byte range is inclusive
				xhr.setRequestHeader('Range', 'bytes='+this._start+'-'+end);
				xhr.setRequestHeader('If-None-Match', 'webkit-no-cache'); // https://bugs.webkit.org/show_bug.cgi?id=82672
			}

			try {
				xhr.send();
			}
			catch (err) {
				this._chunkError(err.message);
			}

			if (IS_WORKER && xhr.status === 0)
				this._chunkError();
			else
				this._start += this._config.chunkSize;
		}

		this._chunkLoaded = function()
		{
			if (xhr.readyState != 4)
				return;

			if (xhr.status < 200 || xhr.status >= 400)
			{
				this._chunkError();
				return;
			}

			this._finished = !this._config.chunkSize || this._start > getFileSize(xhr);
			this.parseChunk(xhr.responseText);
		}

		this._chunkError = function(errorMessage)
		{
			var errorText = xhr.statusText || errorMessage;
			this._sendError(errorText);
		}

		function getFileSize(xhr)
		{
			var contentRange = xhr.getResponseHeader('Content-Range');
			if (contentRange === null) { // no content range, then finish!
					return -1;
					}
			return parseInt(contentRange.substr(contentRange.lastIndexOf('/') + 1));
		}
	}
	NetworkStreamer.prototype = Object.create(ChunkStreamer.prototype);
	NetworkStreamer.prototype.constructor = NetworkStreamer;


	function FileStreamer(config)
	{
		config = config || {};
		if (!config.chunkSize)
			config.chunkSize = Papa.LocalChunkSize;
		ChunkStreamer.call(this, config);

		var reader, slice;

		// FileReader is better than FileReaderSync (even in worker) - see http://stackoverflow.com/q/24708649/1048862
		// But Firefox is a pill, too - see issue #76: https://github.com/mholt/PapaParse/issues/76
		var usingAsyncReader = typeof FileReader !== 'undefined';	// Safari doesn't consider it a function - see issue #105

		this.stream = function(file)
		{
			this._input = file;
			slice = file.slice || file.webkitSlice || file.mozSlice;

			if (usingAsyncReader)
			{
				reader = new FileReader();		// Preferred method of reading files, even in workers
				reader.onload = bindFunction(this._chunkLoaded, this);
				reader.onerror = bindFunction(this._chunkError, this);
			}
			else
				reader = new FileReaderSync();	// Hack for running in a web worker in Firefox

			this._nextChunk();	// Starts streaming
		};

		this._nextChunk = function()
		{
			if (!this._finished && (!this._config.preview || this._rowCount < this._config.preview))
				this._readChunk();
		}

		this._readChunk = function()
		{
			var input = this._input;
			if (this._config.chunkSize)
			{
				var end = Math.min(this._start + this._config.chunkSize, this._input.size);
				input = slice.call(input, this._start, end);
			}
			var txt = reader.readAsText(input, this._config.encoding);
			if (!usingAsyncReader)
				this._chunkLoaded({ target: { result: txt } });	// mimic the async signature
		}

		this._chunkLoaded = function(event)
		{
			// Very important to increment start each time before handling results
			this._start += this._config.chunkSize;
			this._finished = !this._config.chunkSize || this._start >= this._input.size;
			this.parseChunk(event.target.result);
		}

		this._chunkError = function()
		{
			this._sendError(reader.error);
		}

	}
	FileStreamer.prototype = Object.create(ChunkStreamer.prototype);
	FileStreamer.prototype.constructor = FileStreamer;


	function StringStreamer(config)
	{
		config = config || {};
		ChunkStreamer.call(this, config);

		var string;
		var remaining;
		this.stream = function(s)
		{
			string = s;
			remaining = s;
			return this._nextChunk();
		}
		this._nextChunk = function()
		{
			if (this._finished) return;
			var size = this._config.chunkSize;
			var chunk = size ? remaining.substr(0, size) : remaining;
			remaining = size ? remaining.substr(size) : '';
			this._finished = !remaining;
			return this.parseChunk(chunk);
		}
	}
	StringStreamer.prototype = Object.create(StringStreamer.prototype);
	StringStreamer.prototype.constructor = StringStreamer;


	function ReadableStreamStreamer(config)
	{
		config = config || {};

		ChunkStreamer.call(this, config);

		var queue = [];
		var parseOnData = true;

		this.stream = function(stream)
		{
			this._input = stream;

			this._input.on('data', this._streamData);
			this._input.on('end', this._streamEnd);
			this._input.on('error', this._streamError);
		}

		this._nextChunk = function()
		{
			if (queue.length)
			{
				this.parseChunk(queue.shift());
			}
			else
			{
				parseOnData = true;
			}
		}

		this._streamData = bindFunction(function(chunk)
		{
			try
			{
				queue.push(typeof chunk === 'string' ? chunk : chunk.toString(this._config.encoding));

				if (parseOnData)
				{
					parseOnData = false;
					this.parseChunk(queue.shift());
				}
			}
			catch (error)
			{
				this._streamError(error);
			}
		}, this);

		this._streamError = bindFunction(function(error)
		{
			this._streamCleanUp();
			this._sendError(error.message);
		}, this);

		this._streamEnd = bindFunction(function()
		{
			this._streamCleanUp();
			this._finished = true;
			this._streamData('');
		}, this);

		this._streamCleanUp = bindFunction(function()
		{
			this._input.removeListener('data', this._streamData);
			this._input.removeListener('end', this._streamEnd);
			this._input.removeListener('error', this._streamError);
		}, this);
	}
	ReadableStreamStreamer.prototype = Object.create(ChunkStreamer.prototype);
	ReadableStreamStreamer.prototype.constructor = ReadableStreamStreamer;


	// Use one ParserHandle per entire CSV file or string
	function ParserHandle(_config)
	{
		// One goal is to minimize the use of regular expressions...
		var FLOAT = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i;

		var self = this;
		var _stepCounter = 0;	// Number of times step was called (number of rows parsed)
		var _input;				// The input being parsed
		var _parser;			// The core parser being used
		var _paused = false;	// Whether we are paused or not
		var _aborted = false;	// Whether the parser has aborted or not
		var _delimiterError;	// Temporary state between delimiter detection and processing results
		var _fields = [];		// Fields are from the header row of the input, if there is one
		var _results = {		// The last results returned from the parser
			data: [],
			errors: [],
			meta: {}
		};

		if (isFunction(_config.step))
		{
			var userStep = _config.step;
			_config.step = function(results)
			{
				_results = results;

				if (needsHeaderRow())
					processResults();
				else	// only call user's step function after header row
				{
					processResults();

					// It's possbile that this line was empty and there's no row here after all
					if (_results.data.length === 0)
						return;

					_stepCounter += results.data.length;
					if (_config.preview && _stepCounter > _config.preview)
						_parser.abort();
					else
						userStep(_results, self);
				}
			};
		}

		/**
		 * Parses input. Most users won't need, and shouldn't mess with, the baseIndex
		 * and ignoreLastRow parameters. They are used by streamers (wrapper functions)
		 * when an input comes in multiple chunks, like from a file.
		 */
		this.parse = function(input, baseIndex, ignoreLastRow)
		{
			if (!_config.newline)
				_config.newline = guessLineEndings(input);

			_delimiterError = false;
			if (!_config.delimiter)
			{
				var delimGuess = guessDelimiter(input, _config.newline, _config.skipEmptyLines);
				if (delimGuess.successful)
					_config.delimiter = delimGuess.bestDelimiter;
				else
				{
					_delimiterError = true;	// add error after parsing (otherwise it would be overwritten)
					_config.delimiter = Papa.DefaultDelimiter;
				}
				_results.meta.delimiter = _config.delimiter;
			}
			else if(isFunction(_config.delimiter))
			{
				_config.delimiter = _config.delimiter(input);
				_results.meta.delimiter = _config.delimiter;
			}

			var parserConfig = copy(_config);
			if (_config.preview && _config.header)
				parserConfig.preview++;	// to compensate for header row

			_input = input;
			_parser = new Parser(parserConfig);
			_results = _parser.parse(_input, baseIndex, ignoreLastRow);
			processResults();
			return _paused ? { meta: { paused: true } } : (_results || { meta: { paused: false } });
		};

		this.paused = function()
		{
			return _paused;
		};

		this.pause = function()
		{
			_paused = true;
			_parser.abort();
			_input = _input.substr(_parser.getCharIndex());
		};

		this.resume = function()
		{
			_paused = false;
			self.streamer.parseChunk(_input);
		};

		this.aborted = function ()
		{
			return _aborted;
		};

		this.abort = function()
		{
			_aborted = true;
			_parser.abort();
			_results.meta.aborted = true;
			if (isFunction(_config.complete))
				_config.complete(_results);
			_input = '';
		};

		function processResults()
		{
			if (_results && _delimiterError)
			{
				addError('Delimiter', 'UndetectableDelimiter', 'Unable to auto-detect delimiting character; defaulted to \''+Papa.DefaultDelimiter+'\'');
				_delimiterError = false;
			}

			if (_config.skipEmptyLines)
			{
				for (var i = 0; i < _results.data.length; i++)
					if (_results.data[i].length === 1 && _results.data[i][0] === '')
						_results.data.splice(i--, 1);
			}

			if (needsHeaderRow())
				fillHeaderFields();

			return applyHeaderAndDynamicTyping();
		}

		function needsHeaderRow()
		{
			return _config.header && _fields.length === 0;
		}

		function fillHeaderFields()
		{
			if (!_results)
				return;
			for (var i = 0; needsHeaderRow() && i < _results.data.length; i++)
				for (var j = 0; j < _results.data[i].length; j++)
					_fields.push(_results.data[i][j]);
			_results.data.splice(0, 1);
		}

		function shouldApplyDynamicTyping(field) {
			// Cache function values to avoid calling it for each row
			if (_config.dynamicTypingFunction && _config.dynamicTyping[field] === undefined) {
				_config.dynamicTyping[field] = _config.dynamicTypingFunction(field);
			}
			return (_config.dynamicTyping[field] || _config.dynamicTyping) === true
		}

		function parseDynamic(field, value)
		{
			if (shouldApplyDynamicTyping(field))
			{
				if (value === 'true' || value === 'TRUE')
					return true;
				else if (value === 'false' || value === 'FALSE')
					return false;
				else
					return tryParseFloat(value);
			}
			return value;
		}

		function applyHeaderAndDynamicTyping()
		{
			if (!_results || (!_config.header && !_config.dynamicTyping))
				return _results;

			for (var i = 0; i < _results.data.length; i++)
			{
				var row = _config.header ? {} : [];

				for (var j = 0; j < _results.data[i].length; j++)
				{
					var field = j;
					var value = _results.data[i][j];

					if (_config.header)
						field = j >= _fields.length ? '__parsed_extra' : _fields[j];

					value = parseDynamic(field, value);

					if (field === '__parsed_extra')
					{
						row[field] = row[field] || [];
						row[field].push(value);
					}
					else
						row[field] = value;
				}

				_results.data[i] = row;

				if (_config.header)
				{
					if (j > _fields.length)
						addError('FieldMismatch', 'TooManyFields', 'Too many fields: expected ' + _fields.length + ' fields but parsed ' + j, i);
					else if (j < _fields.length)
						addError('FieldMismatch', 'TooFewFields', 'Too few fields: expected ' + _fields.length + ' fields but parsed ' + j, i);
				}
			}

			if (_config.header && _results.meta)
				_results.meta.fields = _fields;
			return _results;
		}

		function guessDelimiter(input, newline, skipEmptyLines)
		{
			var delimChoices = [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP];
			var bestDelim, bestDelta, fieldCountPrevRow;

			for (var i = 0; i < delimChoices.length; i++)
			{
				var delim = delimChoices[i];
				var delta = 0, avgFieldCount = 0, emptyLinesCount = 0;
				fieldCountPrevRow = undefined;

				var preview = new Parser({
					delimiter: delim,
					newline: newline,
					preview: 10
				}).parse(input);

				for (var j = 0; j < preview.data.length; j++)
				{
					if (skipEmptyLines && preview.data[j].length === 1 && preview.data[j][0].length === 0) {
						emptyLinesCount++
						continue
					}
					var fieldCount = preview.data[j].length;
					avgFieldCount += fieldCount;

					if (typeof fieldCountPrevRow === 'undefined')
					{
						fieldCountPrevRow = fieldCount;
						continue;
					}
					else if (fieldCount > 1)
					{
						delta += Math.abs(fieldCount - fieldCountPrevRow);
						fieldCountPrevRow = fieldCount;
					}
				}

				if (preview.data.length > 0)
					avgFieldCount /= (preview.data.length - emptyLinesCount);

				if ((typeof bestDelta === 'undefined' || delta < bestDelta)
					&& avgFieldCount > 1.99)
				{
					bestDelta = delta;
					bestDelim = delim;
				}
			}

			_config.delimiter = bestDelim;

			return {
				successful: !!bestDelim,
				bestDelimiter: bestDelim
			}
		}

		function guessLineEndings(input)
		{
			input = input.substr(0, 1024*1024);	// max length 1 MB

			var r = input.split('\r');

			var n = input.split('\n');

			var nAppearsFirst = (n.length > 1 && n[0].length < r[0].length);

			if (r.length === 1 || nAppearsFirst)
				return '\n';

			var numWithN = 0;
			for (var i = 0; i < r.length; i++)
			{
				if (r[i][0] === '\n')
					numWithN++;
			}

			return numWithN >= r.length / 2 ? '\r\n' : '\r';
		}

		function tryParseFloat(val)
		{
			var isNumber = FLOAT.test(val);
			return isNumber ? parseFloat(val) : val;
		}

		function addError(type, code, msg, row)
		{
			_results.errors.push({
				type: type,
				code: code,
				message: msg,
				row: row
			});
		}
	}





	/** The core parser implements speedy and correct CSV parsing */
	function Parser(config)
	{
		// Unpack the config object
		config = config || {};
		var delim = config.delimiter;
		var newline = config.newline;
		var comments = config.comments;
		var step = config.step;
		var preview = config.preview;
		var fastMode = config.fastMode;
		var quoteChar = config.quoteChar || '"';

		// Delimiter must be valid
		if (typeof delim !== 'string'
			|| Papa.BAD_DELIMITERS.indexOf(delim) > -1)
			delim = ',';

		// Comment character must be valid
		if (comments === delim)
			throw 'Comment character same as delimiter';
		else if (comments === true)
			comments = '#';
		else if (typeof comments !== 'string'
			|| Papa.BAD_DELIMITERS.indexOf(comments) > -1)
			comments = false;

		// Newline must be valid: \r, \n, or \r\n
		if (newline != '\n' && newline != '\r' && newline != '\r\n')
			newline = '\n';

		// We're gonna need these at the Parser scope
		var cursor = 0;
		var aborted = false;

		this.parse = function(input, baseIndex, ignoreLastRow)
		{
			// For some reason, in Chrome, this speeds things up (!?)
			if (typeof input !== 'string')
				throw 'Input must be a string';

			// We don't need to compute some of these every time parse() is called,
			// but having them in a more local scope seems to perform better
			var inputLen = input.length,
				delimLen = delim.length,
				newlineLen = newline.length,
				commentsLen = comments.length;
			var stepIsFunction = isFunction(step);

			// Establish starting state
			cursor = 0;
			var data = [], errors = [], row = [], lastCursor = 0;

			if (!input)
				return returnable();

			if (fastMode || (fastMode !== false && input.indexOf(quoteChar) === -1))
			{
				var rows = input.split(newline);
				for (var i = 0; i < rows.length; i++)
				{
					var row = rows[i];
					cursor += row.length;
					if (i !== rows.length - 1)
						cursor += newline.length;
					else if (ignoreLastRow)
						return returnable();
					if (comments && row.substr(0, commentsLen) === comments)
						continue;
					if (stepIsFunction)
					{
						data = [];
						pushRow(row.split(delim));
						doStep();
						if (aborted)
							return returnable();
					}
					else
						pushRow(row.split(delim));
					if (preview && i >= preview)
					{
						data = data.slice(0, preview);
						return returnable(true);
					}
				}
				return returnable();
			}

			var nextDelim = input.indexOf(delim, cursor);
			var nextNewline = input.indexOf(newline, cursor);
			var quoteCharRegex = new RegExp(quoteChar+quoteChar, 'g');

			// Parser loop
			for (;;)
			{
				// Field has opening quote
				if (input[cursor] === quoteChar)
				{
					// Start our search for the closing quote where the cursor is
					var quoteSearch = cursor;

					// Skip the opening quote
					cursor++;

					for (;;)
					{
						// Find closing quote
						var quoteSearch = input.indexOf(quoteChar, quoteSearch+1);

						//No other quotes are found - no other delimiters
						if (quoteSearch === -1)
						{
							if (!ignoreLastRow) {
								// No closing quote... what a pity
								errors.push({
									type: 'Quotes',
									code: 'MissingQuotes',
									message: 'Quoted field unterminated',
									row: data.length,	// row has yet to be inserted
									index: cursor
								});
							}
							return finish();
						}

						// Closing quote at EOF
						if (quoteSearch === inputLen-1)
						{
							var value = input.substring(cursor, quoteSearch).replace(quoteCharRegex, quoteChar);
							return finish(value);
						}

						// If this quote is escaped, it's part of the data; skip it
						if (input[quoteSearch+1] === quoteChar)
						{
							quoteSearch++;
							continue;
						}

						// Closing quote followed by delimiter
						if (input[quoteSearch+1] === delim)
						{
							row.push(input.substring(cursor, quoteSearch).replace(quoteCharRegex, quoteChar));
							cursor = quoteSearch + 1 + delimLen;
							nextDelim = input.indexOf(delim, cursor);
							nextNewline = input.indexOf(newline, cursor);
							break;
						}

						// Closing quote followed by newline
						if (input.substr(quoteSearch+1, newlineLen) === newline)
						{
							row.push(input.substring(cursor, quoteSearch).replace(quoteCharRegex, quoteChar));
							saveRow(quoteSearch + 1 + newlineLen);
							nextDelim = input.indexOf(delim, cursor);	// because we may have skipped the nextDelim in the quoted field

							if (stepIsFunction)
							{
								doStep();
								if (aborted)
									return returnable();
							}

							if (preview && data.length >= preview)
								return returnable(true);

							break;
						}


						// Checks for valid closing quotes are complete (escaped quotes or quote followed by EOF/delimiter/newline) -- assume these quotes are part of an invalid text string
						errors.push({
							type: 'Quotes',
							code: 'InvalidQuotes',
							message: 'Trailing quote on quoted field is malformed',
							row: data.length,	// row has yet to be inserted
							index: cursor
						});

						quoteSearch++;
						continue;

					}

					continue;
				}

				// Comment found at start of new line
				if (comments && row.length === 0 && input.substr(cursor, commentsLen) === comments)
				{
					if (nextNewline === -1)	// Comment ends at EOF
						return returnable();
					cursor = nextNewline + newlineLen;
					nextNewline = input.indexOf(newline, cursor);
					nextDelim = input.indexOf(delim, cursor);
					continue;
				}

				// Next delimiter comes before next newline, so we've reached end of field
				if (nextDelim !== -1 && (nextDelim < nextNewline || nextNewline === -1))
				{
					row.push(input.substring(cursor, nextDelim));
					cursor = nextDelim + delimLen;
					nextDelim = input.indexOf(delim, cursor);
					continue;
				}

				// End of row
				if (nextNewline !== -1)
				{
					row.push(input.substring(cursor, nextNewline));
					saveRow(nextNewline + newlineLen);

					if (stepIsFunction)
					{
						doStep();
						if (aborted)
							return returnable();
					}

					if (preview && data.length >= preview)
						return returnable(true);

					continue;
				}

				break;
			}


			return finish();


			function pushRow(row)
			{
				data.push(row);
				lastCursor = cursor;
			}

			/**
			 * Appends the remaining input from cursor to the end into
			 * row, saves the row, calls step, and returns the results.
			 */
			function finish(value)
			{
				if (ignoreLastRow)
					return returnable();
				if (typeof value === 'undefined')
					value = input.substr(cursor);
				row.push(value);
				cursor = inputLen;	// important in case parsing is paused
				pushRow(row);
				if (stepIsFunction)
					doStep();
				return returnable();
			}

			/**
			 * Appends the current row to the results. It sets the cursor
			 * to newCursor and finds the nextNewline. The caller should
			 * take care to execute user's step function and check for
			 * preview and end parsing if necessary.
			 */
			function saveRow(newCursor)
			{
				cursor = newCursor;
				pushRow(row);
				row = [];
				nextNewline = input.indexOf(newline, cursor);
			}

			/** Returns an object with the results, errors, and meta. */
			function returnable(stopped)
			{
				return {
					data: data,
					errors: errors,
					meta: {
						delimiter: delim,
						linebreak: newline,
						aborted: aborted,
						truncated: !!stopped,
						cursor: lastCursor + (baseIndex || 0)
					}
				};
			}

			/** Executes the user's step function and resets data & errors. */
			function doStep()
			{
				step(returnable());
				data = [], errors = [];
			}
		};

		/** Sets the abort flag */
		this.abort = function()
		{
			aborted = true;
		};

		/** Gets the cursor position */
		this.getCharIndex = function()
		{
			return cursor;
		};
	}


	// If you need to load Papa Parse asynchronously and you also need worker threads, hard-code
	// the script path here. See: https://github.com/mholt/PapaParse/issues/87#issuecomment-57885358
	function getScriptPath()
	{
		var scripts = document.getElementsByTagName('script');
		return scripts.length ? scripts[scripts.length - 1].src : '';
	}

	function newWorker()
	{
		if (!Papa.WORKERS_SUPPORTED)
			return false;
		if (!LOADED_SYNC && Papa.SCRIPT_PATH === null)
			throw new Error(
				'Script path cannot be determined automatically when Papa Parse is loaded asynchronously. ' +
				'You need to set Papa.SCRIPT_PATH manually.'
			);
		var workerUrl = Papa.SCRIPT_PATH || AUTO_SCRIPT_PATH;
		// Append 'papaworker' to the search string to tell papaparse that this is our worker.
		workerUrl += (workerUrl.indexOf('?') !== -1 ? '&' : '?') + 'papaworker';
		var w = new global.Worker(workerUrl);
		w.onmessage = mainThreadReceivedMessage;
		w.id = workerIdCounter++;
		workers[w.id] = w;
		return w;
	}

	/** Callback when main thread receives a message */
	function mainThreadReceivedMessage(e)
	{
		var msg = e.data;
		var worker = workers[msg.workerId];
		var aborted = false;

		if (msg.error)
			worker.userError(msg.error, msg.file);
		else if (msg.results && msg.results.data)
		{
			var abort = function() {
				aborted = true;
				completeWorker(msg.workerId, { data: [], errors: [], meta: { aborted: true } });
			};

			var handle = {
				abort: abort,
				pause: notImplemented,
				resume: notImplemented
			};

			if (isFunction(worker.userStep))
			{
				for (var i = 0; i < msg.results.data.length; i++)
				{
					worker.userStep({
						data: [msg.results.data[i]],
						errors: msg.results.errors,
						meta: msg.results.meta
					}, handle);
					if (aborted)
						break;
				}
				delete msg.results;	// free memory ASAP
			}
			else if (isFunction(worker.userChunk))
			{
				worker.userChunk(msg.results, handle, msg.file);
				delete msg.results;
			}
		}

		if (msg.finished && !aborted)
			completeWorker(msg.workerId, msg.results);
	}

	function completeWorker(workerId, results) {
		var worker = workers[workerId];
		if (isFunction(worker.userComplete))
			worker.userComplete(results);
		worker.terminate();
		delete workers[workerId];
	}

	function notImplemented() {
		throw 'Not implemented.';
	}

	/** Callback when worker thread receives a message */
	function workerThreadReceivedMessage(e)
	{
		var msg = e.data;

		if (typeof Papa.WORKER_ID === 'undefined' && msg)
			Papa.WORKER_ID = msg.workerId;

		if (typeof msg.input === 'string')
		{
			global.postMessage({
				workerId: Papa.WORKER_ID,
				results: Papa.parse(msg.input, msg.config),
				finished: true
			});
		}
		else if ((global.File && msg.input instanceof File) || msg.input instanceof Object)	// thank you, Safari (see issue #106)
		{
			var results = Papa.parse(msg.input, msg.config);
			if (results)
				global.postMessage({
					workerId: Papa.WORKER_ID,
					results: results,
					finished: true
				});
		}
	}

	/** Makes a deep copy of an array or object (mostly) */
	function copy(obj)
	{
		if (typeof obj !== 'object')
			return obj;
		var cpy = obj instanceof Array ? [] : {};
		for (var key in obj)
			cpy[key] = copy(obj[key]);
		return cpy;
	}

	function bindFunction(f, self)
	{
		return function() { f.apply(self, arguments); };
	}

	function isFunction(func)
	{
		return typeof func === 'function';
	}

	return Papa;
}));


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* global AFRAME */

var anime = __webpack_require__(7);

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

var utils = AFRAME.utils;
var getComponentProperty = utils.entity.getComponentProperty;
var setComponentProperty = utils.entity.setComponentProperty;
var styleParser = utils.styleParser.parse;

/**
 * Animation component for A-Frame.
 *
 * @member {boolean} animationIsPlaying - Used during initialization and scene resume to see
 *  if animation should be playing.
 */
AFRAME.registerComponent('animation', {
  schema: {
    delay: {default: 0},
    dir: {default: ''},
    dur: {default: 1000},
    easing: {default: 'easeInQuad'},
    elasticity: {default: 400},
    from: {default: ''},
    loop: {default: false},
    property: {default: ''},
    repeat: {default: 0},
    startEvents: {type: 'array'},
    pauseEvents: {type: 'array'},
    resumeEvents: {type: 'array'},
    restartEvents: {type: 'array'},
    to: {default: ''}
  },

  multiple: true,

  init: function () {
    this.animation = null;
    this.animationIsPlaying = false;
    this.config = null;
    this.playAnimationBound = this.playAnimation.bind(this);
    this.pauseAnimationBound = this.pauseAnimation.bind(this);
    this.resumeAnimationBound = this.resumeAnimation.bind(this);
    this.restartAnimationBound = this.restartAnimation.bind(this);
    this.repeat = 0;
  },

  update: function () {
    var attrName = this.attrName;
    var data = this.data;
    var el = this.el;
    var propType = getPropertyType(el, data.property);
    var self = this;

    if (!data.property) { return; }

    // Base config.
    this.repeat = data.repeat;
    var config = {
      autoplay: false,
      begin: function () {
        el.emit('animationbegin');
        el.emit(attrName + '-begin');
      },
      complete: function () {
        el.emit('animationcomplete');
        el.emit(attrName + '-complete');
        // Repeat.
        if (--self.repeat > 0) { self.animation.play(); }
      },
      direction: data.dir,
      duration: data.dur,
      easing: data.easing,
      elasticity: data.elasticity,
      loop: data.loop
    };

    // Customize config based on property type.
    var updateConfig = configDefault;
    if (propType === 'vec2' || propType === 'vec3' || propType === 'vec4') {
      updateConfig = configVector;
    }

    // Config.
    this.config = updateConfig(el, data, config);
    this.animation = anime(this.config);

    // Stop previous animation.
    this.pauseAnimation();

    if (!this.data.startEvents.length) { this.animationIsPlaying = true; }

    // Play animation if no holding event.
    this.removeEventListeners();
    this.addEventListeners();
  },

  /**
   * `remove` handler.
   */
  remove: function () {
    this.pauseAnimation();
    this.removeEventListeners();
  },

  /**
   * `pause` handler.
   */
  pause: function () {
    this.pauseAnimation();
    this.removeEventListeners();
  },

  /**
   * `play` handler.
   */
  play: function () {
    var data = this.data;
    var self = this;

    if (!this.animation || !this.animationIsPlaying) { return; }

    // Delay.
    if (data.delay) {
      setTimeout(play, data.delay);
    } else {
      play();
    }

    function play () {
      self.playAnimation();
      self.addEventListeners();
    }
  },

  addEventListeners: function () {
    var self = this;
    var data = this.data;
    var el = this.el;
    data.startEvents.map(function (eventName) {
      el.addEventListener(eventName, self.playAnimationBound);
    });
    data.pauseEvents.map(function (eventName) {
      el.addEventListener(eventName, self.pauseAnimationBound);
    });
    data.resumeEvents.map(function (eventName) {
      el.addEventListener(eventName, self.resumeAnimationBound);
    });
    data.restartEvents.map(function (eventName) {
      el.addEventListener(eventName, self.restartAnimationBound);
    });
  },

  removeEventListeners: function () {
    var self = this;
    var data = this.data;
    var el = this.el;
    data.startEvents.map(function (eventName) {
      el.removeEventListener(eventName, self.playAnimationBound);
    });
    data.pauseEvents.map(function (eventName) {
      el.removeEventListener(eventName, self.pauseAnimationBound);
    });
    data.resumeEvents.map(function (eventName) {
      el.removeEventListener(eventName, self.resumeAnimationBound);
    });
    data.restartEvents.map(function (eventName) {
      el.removeEventListener(eventName, self.restartAnimationBound);
    });
  },

  playAnimation: function () {
    this.animation = anime(this.config);
    this.animation.play();
  },

  pauseAnimation: function () {
    this.animation.pause();
  },

  resumeAnimation: function () {
    this.animation.play();
  },

  restartAnimation: function () {
    this.animation.restart();
  }
});

/**
 * Stuff property into generic `property` key.
 */
function configDefault (el, data, config) {
  var from = data.from || getComponentProperty(el, data.property);
  return AFRAME.utils.extend({}, config, {
    targets: [{aframeProperty: from}],
    aframeProperty: data.to,
    update: function () {
      setComponentProperty(el, data.property, this.targets[0].aframeProperty);
    }
  });
}

/**
 * Extend x/y/z/w onto the config.
 */
function configVector (el, data, config) {
  var from = getComponentProperty(el, data.property);
  if (data.from) { from = AFRAME.utils.coordinates.parse(data.from); }
  var to = AFRAME.utils.coordinates.parse(data.to);
  return AFRAME.utils.extend({}, config, {
    targets: [from],
    update: function () {
      setComponentProperty(el, data.property, this.targets[0]);
    }
  }, to);
}

function getPropertyType (el, property) {
  var split = property.split('.');
  var componentName = split[0];
  var propertyName = split[1];
  var component = el.components[componentName] || AFRAME.components[componentName];

  // Primitives.
  if (!component) { return null; }

  if (propertyName) {
    return component.schema[propertyName].type;
  }
  return component.schema.type;
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 * Anime v1.1.3
 * http://anime-js.com
 * JavaScript animation engine
 * Copyright (c) 2016 Julian Garnier
 * http://juliangarnier.com
 * Released under the MIT license
 */

(function (root, factory) {
  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.anime = factory();
  }
}(this, function () {

  var version = '1.1.3';

  // Defaults

  var defaultSettings = {
    duration: 1000,
    delay: 0,
    loop: false,
    autoplay: true,
    direction: 'normal',
    easing: 'easeOutElastic',
    elasticity: 400,
    round: false,
    begin: undefined,
    update: undefined,
    complete: undefined
  }

  // Transforms

  var validTransforms = ['translateX', 'translateY', 'translateZ', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'skewX', 'skewY'];
  var transform, transformStr = 'transform';

  // Utils

  var is = {
    arr: function(a) { return Array.isArray(a) },
    obj: function(a) { return Object.prototype.toString.call(a).indexOf('Object') > -1 },
    svg: function(a) { return a instanceof SVGElement },
    dom: function(a) { return a.nodeType || is.svg(a) },
    num: function(a) { return !isNaN(parseInt(a)) },
    str: function(a) { return typeof a === 'string' },
    fnc: function(a) { return typeof a === 'function' },
    und: function(a) { return typeof a === 'undefined' },
    nul: function(a) { return typeof a === 'null' },
    hex: function(a) { return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a) },
    rgb: function(a) { return /^rgb/.test(a) },
    hsl: function(a) { return /^hsl/.test(a) },
    col: function(a) { return (is.hex(a) || is.rgb(a) || is.hsl(a)) }
  }

  // Easings functions adapted from http://jqueryui.com/

  var easings = (function() {
    var eases = {};
    var names = ['Quad', 'Cubic', 'Quart', 'Quint', 'Expo'];
    var functions = {
      Sine: function(t) { return 1 + Math.sin(Math.PI / 2 * t - Math.PI / 2); },
      Circ: function(t) { return 1 - Math.sqrt( 1 - t * t ); },
      Elastic: function(t, m) {
        if( t === 0 || t === 1 ) return t;
        var p = (1 - Math.min(m, 998) / 1000), st = t / 1, st1 = st - 1, s = p / ( 2 * Math.PI ) * Math.asin( 1 );
        return -( Math.pow( 2, 10 * st1 ) * Math.sin( ( st1 - s ) * ( 2 * Math.PI ) / p ) );
      },
      Back: function(t) { return t * t * ( 3 * t - 2 ); },
      Bounce: function(t) {
        var pow2, bounce = 4;
        while ( t < ( ( pow2 = Math.pow( 2, --bounce ) ) - 1 ) / 11 ) {}
        return 1 / Math.pow( 4, 3 - bounce ) - 7.5625 * Math.pow( ( pow2 * 3 - 2 ) / 22 - t, 2 );
      }
    }
    names.forEach(function(name, i) {
      functions[name] = function(t) {
        return Math.pow( t, i + 2 );
      }
    });
    Object.keys(functions).forEach(function(name) {
      var easeIn = functions[name];
      eases['easeIn' + name] = easeIn;
      eases['easeOut' + name] = function(t, m) { return 1 - easeIn(1 - t, m); };
      eases['easeInOut' + name] = function(t, m) { return t < 0.5 ? easeIn(t * 2, m) / 2 : 1 - easeIn(t * -2 + 2, m) / 2; };
      eases['easeOutIn' + name] = function(t, m) { return t < 0.5 ? (1 - easeIn(1 - 2 * t, m)) / 2 : (easeIn(t * 2 - 1, m) + 1) / 2; };
    });
    eases.linear = function(t) { return t; };
    return eases;
  })();

  // Strings

  var numberToString = function(val) {
    return (is.str(val)) ? val : val + '';
  }

  var stringToHyphens = function(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }

  var selectString = function(str) {
    if (is.col(str)) return false;
    try {
      var nodes = document.querySelectorAll(str);
      return nodes;
    } catch(e) {
      return false;
    }
  }

  // Numbers

  var random = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Arrays

  var flattenArray = function(arr) {
    return arr.reduce(function(a, b) {
      return a.concat(is.arr(b) ? flattenArray(b) : b);
    }, []);
  }

  var toArray = function(o) {
    if (is.arr(o)) return o;
    if (is.str(o)) o = selectString(o) || o;
    if (o instanceof NodeList || o instanceof HTMLCollection) return [].slice.call(o);
    return [o];
  }

  var arrayContains = function(arr, val) {
    return arr.some(function(a) { return a === val; });
  }

  var groupArrayByProps = function(arr, propsArr) {
    var groups = {};
    arr.forEach(function(o) {
      var group = JSON.stringify(propsArr.map(function(p) { return o[p]; }));
      groups[group] = groups[group] || [];
      groups[group].push(o);
    });
    return Object.keys(groups).map(function(group) {
      return groups[group];
    });
  }

  var removeArrayDuplicates = function(arr) {
    return arr.filter(function(item, pos, self) {
      return self.indexOf(item) === pos;
    });
  }

  // Objects

  var cloneObject = function(o) {
    var newObject = {};
    for (var p in o) newObject[p] = o[p];
    return newObject;
  }

  var mergeObjects = function(o1, o2) {
    for (var p in o2) o1[p] = !is.und(o1[p]) ? o1[p] : o2[p];
    return o1;
  }

  // Colors

  var hexToRgb = function(hex) {
    var rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    var hex = hex.replace(rgx, function(m, r, g, b) { return r + r + g + g + b + b; });
    var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var r = parseInt(rgb[1], 16);
    var g = parseInt(rgb[2], 16);
    var b = parseInt(rgb[3], 16);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  var hslToRgb = function(hsl) {
    var hsl = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(hsl);
    var h = parseInt(hsl[1]) / 360;
    var s = parseInt(hsl[2]) / 100;
    var l = parseInt(hsl[3]) / 100;
    var hue2rgb = function(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }
    var r, g, b;
    if (s == 0) {
      r = g = b = l;
    } else {
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    return 'rgb(' + r * 255 + ',' + g * 255 + ',' + b * 255 + ')';
  }

  var colorToRgb = function(val) {
    if (is.rgb(val)) return val;
    if (is.hex(val)) return hexToRgb(val);
    if (is.hsl(val)) return hslToRgb(val);
  }

  // Units

  var getUnit = function(val) {
    return /([\+\-]?[0-9|auto\.]+)(%|px|pt|em|rem|in|cm|mm|ex|pc|vw|vh|deg)?/.exec(val)[2];
  }

  var addDefaultTransformUnit = function(prop, val, intialVal) {
    if (getUnit(val)) return val;
    if (prop.indexOf('translate') > -1) return getUnit(intialVal) ? val + getUnit(intialVal) : val + 'px';
    if (prop.indexOf('rotate') > -1 || prop.indexOf('skew') > -1) return val + 'deg';
    return val;
  }

  // Values

  var getCSSValue = function(el, prop) {
    // First check if prop is a valid CSS property
    if (prop in el.style) {
      // Then return the property value or fallback to '0' when getPropertyValue fails
      return getComputedStyle(el).getPropertyValue(stringToHyphens(prop)) || '0';
    }
  }

  var getTransformValue = function(el, prop) {
    var defaultVal = prop.indexOf('scale') > -1 ? 1 : 0;
    var str = el.style.transform;
    if (!str) return defaultVal;
    var rgx = /(\w+)\((.+?)\)/g;
    var match = [];
    var props = [];
    var values = [];
    while (match = rgx.exec(str)) {
      props.push(match[1]);
      values.push(match[2]);
    }
    var val = values.filter(function(f, i) { return props[i] === prop; });
    return val.length ? val[0] : defaultVal;
  }

  var getAnimationType = function(el, prop) {
    if ( is.dom(el) && arrayContains(validTransforms, prop)) return 'transform';
    if ( is.dom(el) && (el.getAttribute(prop) || (is.svg(el) && el[prop]))) return 'attribute';
    if ( is.dom(el) && (prop !== 'transform' && getCSSValue(el, prop))) return 'css';
    if (!is.nul(el[prop]) && !is.und(el[prop])) return 'object';
  }

  var getInitialTargetValue = function(target, prop) {
    switch (getAnimationType(target, prop)) {
      case 'transform': return getTransformValue(target, prop);
      case 'css': return getCSSValue(target, prop);
      case 'attribute': return target.getAttribute(prop);
    }
    return target[prop] || 0;
  }

  var getValidValue = function(values, val, originalCSS) {
    if (is.col(val)) return colorToRgb(val);
    if (getUnit(val)) return val;
    var unit = getUnit(values.to) ? getUnit(values.to) : getUnit(values.from);
    if (!unit && originalCSS) unit = getUnit(originalCSS);
    return unit ? val + unit : val;
  }

  var decomposeValue = function(val) {
    var rgx = /-?\d*\.?\d+/g;
    return {
      original: val,
      numbers: numberToString(val).match(rgx) ? numberToString(val).match(rgx).map(Number) : [0],
      strings: numberToString(val).split(rgx)
    }
  }

  var recomposeValue = function(numbers, strings, initialStrings) {
    return strings.reduce(function(a, b, i) {
      var b = (b ? b : initialStrings[i - 1]);
      return a + numbers[i - 1] + b;
    });
  }

  // Animatables

  var getAnimatables = function(targets) {
    var targets = targets ? (flattenArray(is.arr(targets) ? targets.map(toArray) : toArray(targets))) : [];
    return targets.map(function(t, i) {
      return { target: t, id: i };
    });
  }

  // Properties

  var getProperties = function(params, settings) {
    var props = [];
    for (var p in params) {
      if (!defaultSettings.hasOwnProperty(p) && p !== 'targets') {
        var prop = is.obj(params[p]) ? cloneObject(params[p]) : {value: params[p]};
        prop.name = p;
        props.push(mergeObjects(prop, settings));
      }
    }
    return props;
  }

  var getPropertiesValues = function(target, prop, value, i) {
    var values = toArray( is.fnc(value) ? value(target, i) : value);
    return {
      from: (values.length > 1) ? values[0] : getInitialTargetValue(target, prop),
      to: (values.length > 1) ? values[1] : values[0]
    }
  }

  // Tweens

  var getTweenValues = function(prop, values, type, target) {
    var valid = {};
    if (type === 'transform') {
      valid.from = prop + '(' + addDefaultTransformUnit(prop, values.from, values.to) + ')';
      valid.to = prop + '(' + addDefaultTransformUnit(prop, values.to) + ')';
    } else {
      var originalCSS = (type === 'css') ? getCSSValue(target, prop) : undefined;
      valid.from = getValidValue(values, values.from, originalCSS);
      valid.to = getValidValue(values, values.to, originalCSS);
    }
    return { from: decomposeValue(valid.from), to: decomposeValue(valid.to) };
  }

  var getTweensProps = function(animatables, props) {
    var tweensProps = [];
    animatables.forEach(function(animatable, i) {
      var target = animatable.target;
      return props.forEach(function(prop) {
        var animType = getAnimationType(target, prop.name);
        if (animType) {
          var values = getPropertiesValues(target, prop.name, prop.value, i);
          var tween = cloneObject(prop);
          tween.animatables = animatable;
          tween.type = animType;
          tween.from = getTweenValues(prop.name, values, tween.type, target).from;
          tween.to = getTweenValues(prop.name, values, tween.type, target).to;
          tween.round = (is.col(values.from) || tween.round) ? 1 : 0;
          tween.delay = (is.fnc(tween.delay) ? tween.delay(target, i, animatables.length) : tween.delay) / animation.speed;
          tween.duration = (is.fnc(tween.duration) ? tween.duration(target, i, animatables.length) : tween.duration) / animation.speed;
          tweensProps.push(tween);
        }
      });
    });
    return tweensProps;
  }

  var getTweens = function(animatables, props) {
    var tweensProps = getTweensProps(animatables, props);
    var splittedProps = groupArrayByProps(tweensProps, ['name', 'from', 'to', 'delay', 'duration']);
    return splittedProps.map(function(tweenProps) {
      var tween = cloneObject(tweenProps[0]);
      tween.animatables = tweenProps.map(function(p) { return p.animatables });
      tween.totalDuration = tween.delay + tween.duration;
      return tween;
    });
  }

  var reverseTweens = function(anim, delays) {
    anim.tweens.forEach(function(tween) {
      var toVal = tween.to;
      var fromVal = tween.from;
      var delayVal = anim.duration - (tween.delay + tween.duration);
      tween.from = toVal;
      tween.to = fromVal;
      if (delays) tween.delay = delayVal;
    });
    anim.reversed = anim.reversed ? false : true;
  }

  var getTweensDuration = function(tweens) {
    return Math.max.apply(Math, tweens.map(function(tween){ return tween.totalDuration; }));
  }

  var getTweensDelay = function(tweens) {
    return Math.min.apply(Math, tweens.map(function(tween){ return tween.delay; }));
  }

  // will-change

  var getWillChange = function(anim) {
    var props = [];
    var els = [];
    anim.tweens.forEach(function(tween) {
      if (tween.type === 'css' || tween.type === 'transform' ) {
        props.push(tween.type === 'css' ? stringToHyphens(tween.name) : 'transform');
        tween.animatables.forEach(function(animatable) { els.push(animatable.target); });
      }
    });
    return {
      properties: removeArrayDuplicates(props).join(', '),
      elements: removeArrayDuplicates(els)
    }
  }

  var setWillChange = function(anim) {
    var willChange = getWillChange(anim);
    willChange.elements.forEach(function(element) {
      element.style.willChange = willChange.properties;
    });
  }

  var removeWillChange = function(anim) {
    var willChange = getWillChange(anim);
    willChange.elements.forEach(function(element) {
      element.style.removeProperty('will-change');
    });
  }

  /* Svg path */

  var getPathProps = function(path) {
    var el = is.str(path) ? selectString(path)[0] : path;
    return {
      path: el,
      value: el.getTotalLength()
    }
  }

  var snapProgressToPath = function(tween, progress) {
    var pathEl = tween.path;
    var pathProgress = tween.value * progress;
    var point = function(offset) {
      var o = offset || 0;
      var p = progress > 1 ? tween.value + o : pathProgress + o;
      return pathEl.getPointAtLength(p);
    }
    var p = point();
    var p0 = point(-1);
    var p1 = point(+1);
    switch (tween.name) {
      case 'translateX': return p.x;
      case 'translateY': return p.y;
      case 'rotate': return Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI;
    }
  }

  // Progress

  var getTweenProgress = function(tween, time) {
    var elapsed = Math.min(Math.max(time - tween.delay, 0), tween.duration);
    var percent = elapsed / tween.duration;
    var progress = tween.to.numbers.map(function(number, p) {
      var start = tween.from.numbers[p];
      var eased = easings[tween.easing](percent, tween.elasticity);
      var val = tween.path ? snapProgressToPath(tween, eased) : start + eased * (number - start);
      val = tween.round ? Math.round(val * tween.round) / tween.round : val;
      return val;
    });
    return recomposeValue(progress, tween.to.strings, tween.from.strings);
  }

  var setAnimationProgress = function(anim, time) {
    var transforms;
    anim.currentTime = time;
    anim.progress = (time / anim.duration) * 100;
    for (var t = 0; t < anim.tweens.length; t++) {
      var tween = anim.tweens[t];
      tween.currentValue = getTweenProgress(tween, time);
      var progress = tween.currentValue;
      for (var a = 0; a < tween.animatables.length; a++) {
        var animatable = tween.animatables[a];
        var id = animatable.id;
        var target = animatable.target;
        var name = tween.name;
        switch (tween.type) {
          case 'css': target.style[name] = progress; break;
          case 'attribute': target.setAttribute(name, progress); break;
          case 'object': target[name] = progress; break;
          case 'transform':
          if (!transforms) transforms = {};
          if (!transforms[id]) transforms[id] = [];
          transforms[id].push(progress);
          break;
        }
      }
    }
    if (transforms) {
      if (!transform) transform = (getCSSValue(document.body, transformStr) ? '' : '-webkit-') + transformStr;
      for (var t in transforms) {
        anim.animatables[t].target.style[transform] = transforms[t].join(' ');
      }
    }
  }

  // Animation

  var createAnimation = function(params) {
    var anim = {};
    anim.animatables = getAnimatables(params.targets);
    anim.settings = mergeObjects(params, defaultSettings);
    anim.properties = getProperties(params, anim.settings);
    anim.tweens = getTweens(anim.animatables, anim.properties);
    anim.duration = anim.tweens.length ? getTweensDuration(anim.tweens) : params.duration;
    anim.delay = anim.tweens.length ? getTweensDelay(anim.tweens) : params.delay;
    anim.currentTime = 0;
    anim.progress = 0;
    anim.ended = false;
    return anim;
  }

  // Public

  var animations = [];
  var raf = 0;

  var engine = (function() {
    var play = function() { raf = requestAnimationFrame(step); };
    var step = function(t) {
      if (animations.length) {
        for (var i = 0; i < animations.length; i++) animations[i].tick(t);
        play();
      } else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    }
    return play;
  })();

  var animation = function(params) {

    var anim = createAnimation(params);
    var time = {};

    anim.tick = function(now) {
      anim.ended = false;
      if (!time.start) time.start = now;
      time.current = Math.min(Math.max(time.last + now - time.start, 0), anim.duration);
      setAnimationProgress(anim, time.current);
      var s = anim.settings;
      if (time.current >= anim.delay) {
        if (s.begin) s.begin(anim); s.begin = undefined;
        if (s.update) s.update(anim);
      }
      if (time.current >= anim.duration) {
        if (s.loop) {
          time.start = now;
          if (s.direction === 'alternate') reverseTweens(anim, true);
          if (is.num(s.loop)) s.loop--;
        } else {
          anim.ended = true;
          anim.pause();
          if (s.complete) s.complete(anim);
        }
        time.last = 0;
      }
    }

    anim.seek = function(progress) {
      setAnimationProgress(anim, (progress / 100) * anim.duration);
    }

    anim.pause = function() {
      removeWillChange(anim);
      var i = animations.indexOf(anim);
      if (i > -1) animations.splice(i, 1);
    }

    anim.play = function(params) {
      anim.pause();
      if (params) anim = mergeObjects(createAnimation(mergeObjects(params, anim.settings)), anim);
      time.start = 0;
      time.last = anim.ended ? 0 : anim.currentTime;
      var s = anim.settings;
      if (s.direction === 'reverse') reverseTweens(anim);
      if (s.direction === 'alternate' && !s.loop) s.loop = 1;
      setWillChange(anim);
      animations.push(anim);
      if (!raf) engine();
    }

    anim.restart = function() {
      if (anim.reversed) reverseTweens(anim);
      anim.pause();
      anim.seek(0);
      anim.play();
    }

    if (anim.settings.autoplay) anim.play();

    return anim;

  }

  // Remove one or multiple targets from all active animations.

  var remove = function(elements) {
    var targets = flattenArray(is.arr(elements) ? elements.map(toArray) : toArray(elements));
    for (var i = animations.length-1; i >= 0; i--) {
      var animation = animations[i];
      var tweens = animation.tweens;
      for (var t = tweens.length-1; t >= 0; t--) {
        var animatables = tweens[t].animatables;
        for (var a = animatables.length-1; a >= 0; a--) {
          if (arrayContains(targets, animatables[a].target)) {
            animatables.splice(a, 1);
            if (!animatables.length) tweens.splice(t, 1);
            if (!tweens.length) animation.pause();
          }
        }
      }
    }
  }

  animation.version = version;
  animation.speed = 1;
  animation.list = animations;
  animation.remove = remove;
  animation.easings = easings;
  animation.getValue = getInitialTargetValue;
  animation.path = getPathProps;
  animation.random = random;

  return animation;

}));


/***/ })
/******/ ]);