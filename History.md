0.1.5 / 2012-02-09
==================

  * new property: Atok.ending (Boolean): indicates if `end()` was called
  * new events:
    * match (replaces matchEventHandler): rule match (current offset, matched size, matched rule object)
    * empty: empty buffer (ending flag)
    cf. TODO about the performance impact when listeners are attached
  * `addRule([rules], 0)` fixed
  * `addRule('', handler)` now honors `quiet()`
  * handlers triggered in `quiet()` mode gives the non extracted token size as the first argument (actually introduced in the previous release)
  * emptyHandler now triggered on a per rule set basis

0.1.4 / 2012-02-06
==================

  * New matchEventHandler property (Function): triggered upon a rule match with
    arguments: <offset>, <matched length>, <rule object>
  * `continue()` accepts negative input
  * `addRule(-1, handler)` triggers [handler] when tokenizer has ended

0.1.3 / 2012-02-05
==================

  * When `quiet()`, the token is set to the would be token length
  * `seek()` decreases bytes on negative seek
  * Added `existsRule()`
  * Added `deleteRuleSet()`
  * Added `getRuleSet()`
  * Added `getAllRuleSet()`

0.1.2 / 2012-02-03
==================

  * Changed `length()` to be a property
  * Added `addRuleFirst()`
  * Added `continue()`
  * If any remaining data, `end()` signature set to (token, -1, ruleSetName)
  * `setEncoding()` default value is UTF-8, utf-8 and utf8 are also accepted
  * `removeRule()` fixed processing Function

0.1.1 / 2012-01-31
==================

  * Fixed utf8 handling in `write()`
  * Fixed return flag in `write()`, resolving `pipe()` freeze

0.1.0 / 2012-01-30
==================

  * First release