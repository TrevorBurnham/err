_ = require 'underscore'

class NamedError extends Error
  constructor: (@name, @message) ->

classes = {}

module.exports = err = (name, message, log = false) ->
  unless _.isString arguments[1]
    [name, message, log] = ['Error', name, message]
  sup = new Error(message)
  sup.name = name
  e = new (err.getClass(name))(name, message)
  e.stack = sup.stack  # needed because stack is a magical property
  _.extend e,
    isLogged: false
    log: (message = @message) ->
      console.error message
      @isLogged = true
  
  if log then e.log()
  e

err.getClass = (name) ->
  return classes[name] if classes[name]
  classes[name] = class NamedErrorSubclass extends NamedError