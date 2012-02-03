/*
 * General methods tests

grep "Tknzr.prototype.[^_]" ../lib/tokenizer.js
 
**/
var assert = require('assert')

var Tokenizer = require('..')
var options = {}

describe('Tokenizer General Methods', function () {
  describe('#length', function () {
    var p = new Tokenizer(options)
    it('should return the tokenizer buffer size', function (done) {
      var data = '123'
      p.write(data)
      assert.equal(p.length, data.length)
      done()
    })
  })

  describe('#flush', function () {
    var p = new Tokenizer(options)
    it('should return the tokenizer buffer size', function (done) {
      var data = '123'
      p.write(data)
      assert.deepEqual(p.flush(), data)
      done()
    })
  })

  describe('#clear', function () {
    describe('()', function () {
      var p = new Tokenizer(options)
      it('should clear and remove rules', function (done) {
        p.addRule('a', 'data')
        p.saveRuleSet('myRules')
        p.clear()
        assert.equal(p.length, 0)
        assert.deepEqual(p.saved, {})
        done()
      })
    })

    describe('(true)', function () {
      var p = new Tokenizer(options)
      it('should clear and keep rules', function (done) {
        p.addRule('a', 'data')
        p.saveRuleSet('myRules')
        p.clear(true)
        assert.equal(p.length, 0)
        assert.notDeepEqual(p.saved, {})
        done()
      })
    })
  })

  describe('#seek', function () {
    describe('(n)', function () {
      var p = new Tokenizer(options)
      it('should move the cursor forward by n', function (done) {
        p.addRule('a', function (token, idx, type) {
          p.seek(2)
        })
        p.addRule('c', function (token, idx, type) {
          done()
        })
        p.write('abbc')
      })
    })

    describe('(-n)', function () {
      var p = new Tokenizer(options)
      var passed = false
      var num = 0
      it('should move the cursor backward by n', function (done) {
        p.addRule('a', function (token, idx, type) {
          if (!passed && ++num == 2) {
            p.seek(-2)
            passed = true
          }
        })
        p.addRule('b', function (token, idx, type) {
          done()
        })
        p.write('aab')
      })
    })

    describe('(-N)', function () {
      var p = new Tokenizer(options)
      it('should throw an error', function (done) {
        p.addRule('a', function (token, idx, type) {
          assert.throws(
            function () {
              p.seek(-2)
            }
          , function (err) {
              if (err instanceof Error) return true
            }
          )
          done()
        })
        p.write('a')
      })
    })
  })
})