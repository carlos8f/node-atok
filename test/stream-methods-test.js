/*
 * Stream methods tests
**/
var assert = require('assert')

var Tokenizer = require('..')
var options = {}

describe('Tokenizer Stream Methods', function () {
  describe('#write', function () {
    describe('single', function () {
      var p = new Tokenizer(options)
      it('should tokenize the input data', function (done) {
        p.addRule('', function (token, idx, type) {
          done()
        })
        p.write('abc')
      })
    })

    describe('double', function () {
      var p = new Tokenizer(options)
      it('should tokenize the input data', function (done) {
        p.addRule('a', function (token, idx, type) {
          p.write('b')
        })
        p.addRule('b', function (token, idx, type) {
          done()
        })
        p.write('a')
      })
    })
  })

  describe('#pause/resume', function () {
    var p = new Tokenizer(options)
    it('should pause a stream then resume it', function (done) {
      var paused = true
      p.addRule('', function (token, idx, type) {
        done(paused ? new Error('Stream did not pause') : null)
      })
      p.pause()
      p.write('abc')
      paused = false
      p.resume()
    })
  })

  describe('#pause/resume in handler', function () {
    var p = new Tokenizer(options)
    it('should pause a stream then resume it', function (done) {
      p.addRule(1, function (token, idx, type) {
        if (token == 'a') {
          p.pause()
          setTimeout(function () {
            p.resume()
          }, 20)
        } else if (token == 'b') {
          done()
        } else {
          done(new Error('unexpected type'))
        }
      })
      p.write('ab')
    })
  })

  describe('#end', function () {
    var p = new Tokenizer(options)
    it('should tokenize the input data and end the stream', function (done) {
      p.on('end', function () {
        assert.throws(
          function () {
            p.write('abc')
          }
        , function (err) {
            if (err instanceof Error) return true
          }
        )
        done()
      })
      p.addRule(1, 'first')
      p.end('abc')
    })
  })
})