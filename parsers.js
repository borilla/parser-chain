function ContainsParser(char) {
	this.char = char;
}

ContainsParser.prototype.parse = function(msg) {
	var char = this.char;
	if (msg && msg.indexOf(char) != -1)
		return msg + ' contains ' + char;
	// else
	return undefined;
}

function BeginsWithParser(char) {
	this.char = char;
}

BeginsWithParser.prototype.parse = function(msg) {
	var char = this.char;
	if (msg && msg[0] === char)
		return msg + ' begins with ' + char;
	// else
	return undefined;
}

function EndsWithParser(char) {
	this.char = char;
}

EndsWithParser.prototype.parse = function(msg) {
	var char = this.char;
	if (msg && msg[msg.length - 1] === char)
		return msg + ' ends with ' + char;
	// else
	return undefined;
}
