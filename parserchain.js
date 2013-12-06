var ParserChain = (function() {

	var ParserChain = function() {
		this.reset();
	}

	var ParserChainPrototype = ParserChain.prototype;

	ParserChainPrototype.reset = function() {
		this.parsers = [];
		this.callbacks = [];
		return this;
	}

	ParserChainPrototype.add = function(parser, callback) {
		this.parsers.push(parser);
		this.callbacks.push(callback);
		return this;
	}

	ParserChainPrototype.parse = function(msg) {
		var parsers = this.parsers;
		for (var i = 0, l = parsers.length; i < l; ++i) {
			var parser = parsers[i];
			var parsed = parser.parse(msg);
			if (parsed) {
				var callback = this.callbacks[i];
				if (callback) {
					callback(parsed, i, this);
				}
				return parsed;
			}
		}
		return undefined;
	}

	return ParserChain;
}());
