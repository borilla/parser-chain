module('ParserChain');

test('constructor', function() {
	equal(typeof ParserChain, 'function', 'constructor function exists');
	var chain = new ParserChain();
	ok(chain instanceof ParserChain, 'can construct a parser-chain object');
	strictEqual(chain.events.length, 0, 'starts off with empty array of events');
	strictEqual(chain.parsers.length, 0, 'starts off with empty array of parsers');
});

test('add', function() {
	var chain = new ParserChain();
	var event = 'event';
	var parser = {};
	chain.add(event, parser);
	strictEqual(chain.events[0], event, 'adds event to array of events');
	strictEqual(chain.parsers[0], parser, 'adds parser to array of parsers');
});

test('parse with no parsers added', function() {
	var chain = new ParserChain();
	var msg = 'messgae';
	strictEqual(chain.parse(msg), false, 'returns false when fails to parse message');
});

test('parse with one parser, which successfully parses message', function() {
	var chain = new ParserChain();
	var msg = 'message';
	var event1 = 'parser1';
	var parser1 = { parse: function(msg) { return msg + ' parsed by parser1'; } };
	chain.add(event1, parser1);

	var result = chain.parse(msg);
	notEqual(result, false, 'parse-chain returns non-false result');
	equal(result.event, 'parser1', 'expect event corresponding to first parser');
	equal(result.parsed, 'message parsed by parser1', 'expect correctly parsed message');
});

test('parse with one parser, which fails to parse message', function() {
	var chain = new ParserChain();
	var msg = 'message';
	var event1 = 'parser1';
	var parser1 = { parse: function(msg) { return false; } };
	chain.add(event1, parser1);

	var result = chain.parse(msg);
	strictEqual(result, false, 'expect parse-chain to return false')
});

test('parse with three parsers', function() {
	var chain = new ParserChain();
	var msg = 'message';
	var event1 = 'parser1';
	var parser1 = { parse: function(msg) { return false; } };
	var event2 = 'parser2';
	var parser2 = { parse: function(msg) { return msg + ' parsed by parser2'; } };
	var event3 = 'parser3';
	var parser3 = { parse: function(msg) { return msg + ' parsed by parser3'; } };
	chain.add(event1, parser1);
	chain.add(event2, parser2);
	chain.add(event3, parser3);

	// expect parser2 to parse message
	var result = chain.parse(msg);
	notEqual(result, false, 'parse-chain returns non-false result');
	equal(result.event, 'parser2', 'expect parser2 to be successful');
	equal(result.parsed, 'message parsed by parser2', 'expect correctly parsed message');
});
