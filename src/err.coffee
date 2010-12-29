out = (require 'styout').instance 'err'
_ = require 'underscore'

class NamedError extends Error
  constructor: (@name, @message) ->

ErrorExtras =
  isLogged: false
  log: (message = @message) ->
    out.error message
    @isLogged = true

newErrInstance = ->
  instance = (name, message, log = instance.logByDefault) ->
    if arguments.length is 1 then [name, message, log] = [null, name, log]
    if arguments.length is 2 and typeof message is 'boolean'
      [name, message, log] = [null, name, message]
    
    if name
      sup = new Error(message)
      sup.name = name
      e = new (instance.getClass(name))(name, message)
      e.stack = sup.stack  # needed because stack is a magical property
    else
      e = new Error(message)
    _.extend e, ErrorExtras
    
    if log
      e.log()
    
    e

errInstanceMixin =
  logByDefault: false
  classes: {}
  getClass: (name) ->
    return @classes[name] if @classes[name]
    @classes[name] = class NamedErrorSubclass extends NamedError

instances = {}
exports.instance = (id) ->
  return instances[id] if instances[id]
  instances[id] = _.extend newErrInstance(), errInstanceMixin, {id}