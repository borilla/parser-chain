var ProcessorChain = (function() {

	var ProcessorChain = function() {
		this.reset();
		this.processMethod = 'process';
	}

	var ProcessorChainPrototype = ProcessorChain.prototype;

	ProcessorChainPrototype.reset = function() {
		this.processors = [];
		this.callbacks = [];
		return this;
	}

	ProcessorChainPrototype.add = function(processor, callback) {
		this.processors.push(processor);
		this.callbacks.push(callback);
		return this;
	}

	ProcessorChainPrototype.process = function(msg) {
		var processors = this.processors;
		var processMethod = this.processMethod;
		for (var i = 0, l = processors.length; i < l; ++i) {
			var processor = processors[i];
			var processed = processor[processMethod](msg);
			if (processed !== undefined) {
				var callback = this.callbacks[i];
				if (callback) {
					callback(processed, i, this);
				}
				return processed;
			}
		}
		return undefined;
	}

	return ProcessorChain;
}());
