module('Parsers');

test('ContainsParser', function() {
	equal(typeof ContainsParser, 'function', 'constructor function exists');
	var parser = new ContainsParser('x');
	ok(parser instanceof ContainsParser, 'can construct a contains-parser object');
	strictEqual(parser.char, 'x', 'stores provided character');

	var parser = new ContainsParser('i');
	var msg = 'lorem ipsum';
	var expected = 'lorem ipsum contains i';
	strictEqual(parser.parse(msg), expected, 'returns parsed string if message contains character');

	var parser = new ContainsParser('y');
	var msg = 'lorem ipsum';
	var expected = undefined;
	strictEqual(parser.parse(msg), expected, 'returns undefined if message does not contain character');
});

test('BeginsWithParser', function() {
	equal(typeof BeginsWithParser, 'function', 'constructor function exists');
	var parser = new BeginsWithParser('x');
	ok(parser instanceof BeginsWithParser, 'can construct a begins-with-parser object');
	strictEqual(parser.char, 'x', 'stores provided character');

	var parser = new BeginsWithParser('l');
	var msg = 'lorem ipsum';
	var expected = 'lorem ipsum begins with l';
	strictEqual(parser.parse(msg), expected, 'returns parsed string if message begins with character');

	var parser = new BeginsWithParser('m');
	var msg = 'lorem ipsum';
	var expected = undefined;
	strictEqual(parser.parse(msg), expected, 'returns undefined is message does not begin with character');
});

test('EndsWithParser', function() {
	equal(typeof EndsWithParser, 'function', 'constructor function exists');
	var parser = new EndsWithParser('x');
	ok(parser instanceof EndsWithParser, 'can construct a ends-with-parser object');
	strictEqual(parser.char, 'x', 'stores provided character');

	var parser = new EndsWithParser('m');
	var msg = 'lorem ipsum';
	var expected = 'lorem ipsum ends with m';
	strictEqual(parser.parse(msg), expected, 'returns parsed string if message ends with character');

	var parser = new EndsWithParser('o');
	var msg = 'lorem ipsum';
	var expected = undefined;
	strictEqual(parser.parse(msg), expected, 'returns undefined is message does not end with character');
});
