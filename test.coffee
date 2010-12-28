assert = require 'assert'
err = (require './lib/err').instance 'errTest'

assert.throws (-> throw err 'This should throw an ordinary Error instance'), Error
assert.throws (-> throw err 'IllegalArgument', 'This should throw an err.IllegalArgument instance'), err.getClass('IllegalArgument')
assert.throws (-> throw err 'This message should be logged', true), Error
assert.throws (-> throw err 'IrrelevantType', 'This message should also be logged', true), err.getClass('IrrelevantType')

err.logByDefault = true
assert.throws (-> throw err 'And this should be the third logged error message'), Error
assert.throws (-> throw err 'But this one should not be logged', false), Error

console.log 'All tests passed.'