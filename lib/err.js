(function() {
  var NamedError, classes, err, _;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  _ = require('underscore');
  NamedError = (function() {
    __extends(NamedError, Error);
    function NamedError(name, message) {
      this.name = name;
      this.message = message;
    }
    return NamedError;
  })();
  classes = {};
  module.exports = err = function(name, message, log) {
    var e, sup, _ref;
    if (log == null) {
      log = false;
    }
    if (!_.isString(arguments[1])) {
      _ref = ['Error', name, message], name = _ref[0], message = _ref[1], log = _ref[2];
    }
    sup = new Error(message);
    sup.name = name;
    e = new (err.getClass(name))(name, message);
    e.stack = sup.stack;
    _.extend(e, {
      isLogged: false,
      log: function(message) {
        if (message == null) {
          message = this.message;
        }
        console.error(message);
        return this.isLogged = true;
      }
    });
    if (log) {
      e.log();
    }
    return e;
  };
  err.getClass = function(name) {
    var NamedErrorSubclass;
    if (classes[name]) {
      return classes[name];
    }
    return classes[name] = NamedErrorSubclass = (function() {
      function NamedErrorSubclass() {
        NamedErrorSubclass.__super__.constructor.apply(this, arguments);
      }
      __extends(NamedErrorSubclass, NamedError);
      return NamedErrorSubclass;
    })();
  };
}).call(this);
