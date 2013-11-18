var ParserChain = (function() {

	var ParserChain = function() {
		this.reset();
	}

	var ParserChainPrototype = ParserChain.prototype;

	ParserChainPrototype.reset = function() {
		this.events = [];
		this.parsers = [];
	}

	ParserChainPrototype.add = function(event, parser) {
		this.events.push(event);
		this.parsers.push(parser);
	}

	ParserChainPrototype.parse = function(msg) {
		var events = this.events;
		var parsers = this.parsers;
		for (var i = 0, l = parsers.length; i < l; ++i) {
			var parser = parsers[i];
			var parsed = parser.parse(msg);
			if (parsed) {
				return {
					event: events[i],
					index: i,
					parsed: parsed,
					parser: parser
				};
			}
		}
		return false;
	}

	return ParserChain;
}());
