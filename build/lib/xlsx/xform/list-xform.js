"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var BaseXform = require('./base-xform');

var ListXform =
/*#__PURE__*/
function (_BaseXform) {
  _inherits(ListXform, _BaseXform);

  function ListXform(options) {
    var _this;

    _classCallCheck(this, ListXform);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ListXform).call(this));
    _this.tag = options.tag;
    _this.count = options.count;
    _this.empty = options.empty;
    _this.$count = options.$count || 'count';
    _this.$ = options.$;
    _this.childXform = options.childXform;
    _this.maxItems = options.maxItems;
    return _this;
  }

  _createClass(ListXform, [{
    key: "prepare",
    value: function prepare(model, options) {
      var childXform = this.childXform;

      if (model) {
        model.forEach(function (childModel) {
          childXform.prepare(childModel, options);
        });
      }
    }
  }, {
    key: "render",
    value: function render(xmlStream, model) {
      if (model && model.length) {
        xmlStream.openNode(this.tag, this.$);

        if (this.count) {
          xmlStream.addAttribute(this.$count, model.length);
        }

        var childXform = this.childXform;
        model.forEach(function (childModel) {
          childXform.render(xmlStream, childModel);
        });
        xmlStream.closeNode();
      } else if (this.empty) {
        xmlStream.leafNode(this.tag);
      }
    }
  }, {
    key: "parseOpen",
    value: function parseOpen(node) {
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }

      switch (node.name) {
        case this.tag:
          this.model = [];
          return true;

        default:
          if (this.childXform.parseOpen(node)) {
            this.parser = this.childXform;
            return true;
          }

          return false;
      }
    }
  }, {
    key: "parseText",
    value: function parseText(text) {
      if (this.parser) {
        this.parser.parseText(text);
      }
    }
  }, {
    key: "parseClose",
    value: function parseClose(name) {
      if (this.parser) {
        if (!this.parser.parseClose(name)) {
          this.model.push(this.parser.model);
          this.parser = undefined;

          if (this.maxItems && this.model.length > this.maxItems) {
            throw new Error("Max ".concat(this.childXform.tag, " count exceeded"));
          }
        }

        return true;
      }

      return false;
    }
  }, {
    key: "reconcile",
    value: function reconcile(model, options) {
      if (model) {
        var childXform = this.childXform;
        model.forEach(function (childModel) {
          childXform.reconcile(childModel, options);
        });
      }
    }
  }]);

  return ListXform;
}(BaseXform);

module.exports = ListXform;
//# sourceMappingURL=list-xform.js.map