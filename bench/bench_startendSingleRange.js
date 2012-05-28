var assert = require('assert')

var Atok = require('atok')
var newAtok = require('..')

var atok = new Atok
var natok = new newAtok

function handler (token, idx, type) {
	assert.equal(token, 0)
}

var options = { start: 'aA', end: 'zZ' }

atok.addRule(options, handler)
natok.addRule(options, handler)

var s = 'ABC'

var compare = exports.compare = {}
compare[Atok.version] = function () {
	atok.clear(true).write(s)
}
compare[newAtok.version] = function () {
	natok.clear(true).write(s)
}
require("bench").runMain()
