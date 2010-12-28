(function() {
  var ErrorExtras, NamedError, errInstanceMixin, instances, newErrInstance, out, _;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  out = (require('styout')).instance('err');
  _ = require('underscore');
  NamedError = (function() {
    __extends(NamedError, Error);
    function NamedError(name, message) {
      this.name = name;
      this.message = message;
    }
    return NamedError;
  })();
  ErrorExtras = {
    isLogged: false,
    log: function(message) {
      if (message == null) {
        message = this.message;
      }
      out.error(message);
      return this.isLogged = true;
    }
  };
  newErrInstance = function() {
    var instance;
    return instance = function(name, message, log) {
      var e, _ref, _ref2;
      if (log == null) {
        log = instance.logByDefault;
      }
      if (arguments.length === 1) {
        _ref = [null, name, log], name = _ref[0], message = _ref[1], log = _ref[2];
      }
      if (arguments.length === 2 && typeof message === 'boolean') {
        _ref2 = [null, name, message], name = _ref2[0], message = _ref2[1], log = _ref2[2];
      }
      if (name) {
        e = new (instance.getClass(name))(name, message);
      } else {
        e = new Error(message);
      }
      _.extend(e, ErrorExtras);
      if (log) {
        e.log();
      }
      return e;
    };
  };
  errInstanceMixin = {
    logByDefault: false,
    classes: {},
    getClass: function(name) {
      var NamedErrorSubclass;
      if (this.classes[name]) {
        return this.classes[name];
      }
      return this.classes[name] = NamedErrorSubclass = (function() {
        function NamedErrorSubclass() {
          NamedErrorSubclass.__super__.constructor.apply(this, arguments);
        }
        __extends(NamedErrorSubclass, NamedError);
        return NamedErrorSubclass;
      })();
    }
  };
  instances = {};
  exports.instance = function(id) {
    if (instances[id]) {
      return instances[id];
    }
    return instances[id] = _.extend(newErrInstance(), errInstanceMixin, {
      id: id
    });
  };
}).call(this);
