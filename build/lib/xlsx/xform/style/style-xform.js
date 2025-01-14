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

var BaseXform = require('../base-xform');

var AlignmentXform = require('./alignment-xform'); // <xf numFmtId="[numFmtId]" fontId="[fontId]" fillId="[fillId]" borderId="[xf.borderId]" xfId="[xfId]">
//   Optional <alignment>
// </xf>
// Style assists translation from style model to/from xlsx


var StyleXform =
/*#__PURE__*/
function (_BaseXform) {
  _inherits(StyleXform, _BaseXform);

  function StyleXform(options) {
    var _this;

    _classCallCheck(this, StyleXform);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(StyleXform).call(this));
    _this.xfId = !!(options && options.xfId);
    _this.map = {
      alignment: new AlignmentXform()
    };
    return _this;
  }

  _createClass(StyleXform, [{
    key: "render",
    value: function render(xmlStream, model) {
      xmlStream.openNode('xf', {
        numFmtId: model.numFmtId || 0,
        fontId: model.fontId || 0,
        fillId: model.fillId || 0,
        borderId: model.borderId || 0
      });

      if (this.xfId) {
        xmlStream.addAttribute('xfId', model.xfId || 0);
      }

      if (model.numFmtId) {
        xmlStream.addAttribute('applyNumberFormat', '1');
      }

      if (model.fontId) {
        xmlStream.addAttribute('applyFont', '1');
      }

      if (model.fillId) {
        xmlStream.addAttribute('applyFill', '1');
      }

      if (model.borderId) {
        xmlStream.addAttribute('applyBorder', '1');
      }

      if (model.alignment) {
        xmlStream.addAttribute('applyAlignment', '1');
        this.map.alignment.render(xmlStream, model.alignment);
      }

      xmlStream.closeNode();
    }
  }, {
    key: "parseOpen",
    value: function parseOpen(node) {
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      } // used during sax parsing of xml to build font object


      switch (node.name) {
        case 'xf':
          this.model = {
            numFmtId: parseInt(node.attributes.numFmtId, 10),
            fontId: parseInt(node.attributes.fontId, 10),
            fillId: parseInt(node.attributes.fillId, 10),
            borderId: parseInt(node.attributes.borderId, 10)
          };

          if (this.xfId) {
            this.model.xfId = parseInt(node.attributes.xfId, 10);
          }

          return true;

        case 'alignment':
          this.parser = this.map.alignment;
          this.parser.parseOpen(node);
          return true;

        default:
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
          this.model.alignment = this.parser.model;
          this.parser = undefined;
        }

        return true;
      }

      return name !== 'xf';
    }
  }, {
    key: "tag",
    get: function get() {
      return 'xf';
    }
  }]);

  return StyleXform;
}(BaseXform);

module.exports = StyleXform;
//# sourceMappingURL=style-xform.js.map
