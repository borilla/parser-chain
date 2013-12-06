var parser0 = { parse: function(msg) { return undefined; } };
var parser1 = { parse: function(msg) { return msg + ' parsed by parser1'; } };
var parser2 = { parse: function(msg) { return msg + ' parsed by parser2'; } };
var chain;

module('ParserChain');

test('constructor', function() {
	equal(typeof ParserChain, 'function', 'constructor function exists');
	chain = new ParserChain();
	ok(chain instanceof ParserChain, 'can construct a parser-chain object');
	strictEqual(chain.parsers.length, 0, 'starts off with empty array of parsers');
	strictEqual(chain.callbacks.length, 0, 'starts off with empty array of callbacks');
});

module('ParserChain instance', {
	setup: function() {
		chain = new ParserChain();
	}
});

test('add', function() {
	var callback = function() {};
	chain.add(parser0, callback);
	strictEqual(chain.parsers[0], parser0, 'adds parser to array of parsers');
	strictEqual(chain.callbacks[0], callback, 'adds callback to array of callbacks');
});

test('add, without callback', function() {
	chain.add(parser0);
	strictEqual(chain.parsers[0], parser0, 'adds parser to array of parsers');
	strictEqual(chain.callbacks.length, 1, 'adds empty callback to array of callbacks');
});

test('parse with no parsers added', function() {
	var msg = 'message';
	strictEqual(chain.parse(msg), undefined, 'returns undefined when fails to parse message');
});

test('parse with one parser, which successfully parses message, without callback', function() {
	chain.add(parser1);
	var result = chain.parse('message');
	notEqual(result, undefined, 'returns value other than undefined');
	strictEqual(result, 'message parsed by parser1', 'returns parsed message');
});

test('parse with one parser, which successfully parses message, with callback', function() {
	expect(2);
	var expectedResult = 'message parsed by parser1';
	var callback1 = function(parsed, index, parserChain) {
		ok(true, 'callback was called');
	};
	chain.add(parser1, callback1);
	var result = chain.parse('message');
	strictEqual(result, expectedResult, 'returns parsed result');
});

test('parse with one parser, which fails to parse message', function() {
	chain.add(parser0);
	var result = chain.parse('message');
	strictEqual(result, undefined, 'expect parse-chain to return undefined')
});

test('parse with three parsers', function() {
	expect(5);
	chain.add(parser0);
	var expectedResult = 'message parsed by parser1';
	chain.add(parser1, function(parsed, index, parserChain) {
		ok(true, 'callback for parser1 called');
		strictEqual(parsed, expectedResult, 'parsed result passed to callback');
		strictEqual(index, 1, 'index of successful parser passed to callback');
		strictEqual(parserChain, chain, 'parser-chain object passed to callback');
	});
	chain.add(parser2);
	var result = chain.parse('message');
	equal(result, expectedResult, 'expect parser1 to be successful');
});
