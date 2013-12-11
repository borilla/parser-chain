var processor0 = { process: function(msg) { return undefined; } };
var processor1 = { process: function(msg) { return msg + ' processed by processor1'; } };
var processor2 = { process: function(msg) { return msg + ' processed by processor2'; } };
var chain;

module('ProcessorChain');

test('constructor', function() {
	equal(typeof ProcessorChain, 'function', 'constructor function exists');
	chain = new ProcessorChain();
	ok(chain instanceof ProcessorChain, 'can construct a processor-chain object');
	strictEqual(chain.processors.length, 0, 'starts off with empty array of processors');
	strictEqual(chain.callbacks.length, 0, 'starts off with empty array of callbacks');
});

module('ProcessorChain instance', {
	setup: function() {
		chain = new ProcessorChain();
	}
});

test('add', function() {
	var callback = function() {};
	chain.add(processor0, callback);
	strictEqual(chain.processors[0], processor0, 'adds processor to array of processors');
	strictEqual(chain.callbacks[0], callback, 'adds callback to array of callbacks');
});

test('add, without callback', function() {
	chain.add(processor0);
	strictEqual(chain.processors[0], processor0, 'adds processor to array of processors');
	strictEqual(chain.callbacks.length, 1, 'adds empty callback to array of callbacks');
});

test('process with no processors added', function() {
	var msg = 'message';
	strictEqual(chain.process(msg), undefined, 'returns undefined when fails to process message');
});

test('process with one processor, which successfully processes message, without callback', function() {
	chain.add(processor1);
	var result = chain.process('message');
	notEqual(result, undefined, 'returns value other than undefined');
	strictEqual(result, 'message processed by processor1', 'returns processed message');
});

test('process with one processor, which successfully processes message, with callback', function() {
	expect(2);
	var expectedResult = 'message processed by processor1';
	var callback1 = function(processed, index, processorChain) {
		ok(true, 'callback was called');
	};
	chain.add(processor1, callback1);
	var result = chain.process('message');
	strictEqual(result, expectedResult, 'returns processed result');
});

test('process with one processor, which fails to process message', function() {
	chain.add(processor0);
	var result = chain.process('message');
	strictEqual(result, undefined, 'expect process-chain to return undefined')
});

test('process with three processors', function() {
	expect(5);
	chain.add(processor0);
	var expectedResult = 'message processed by processor1';
	chain.add(processor1, function(processed, index, processorChain) {
		ok(true, 'callback for processor1 called');
		strictEqual(processed, expectedResult, 'processed result passed to callback');
		strictEqual(index, 1, 'index of successful processor passed to callback');
		strictEqual(processorChain, chain, 'processor-chain object passed to callback');
	});
	chain.add(processor2);
	var result = chain.process('message');
	equal(result, expectedResult, 'expect processor1 to be successful');
});
