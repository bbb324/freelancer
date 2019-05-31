webpackHotUpdate("purify",{

/***/ "./src/todoList/component/common/FinalCalculate.jsx":
/*!**********************************************************!*\
  !*** ./src/todoList/component/common/FinalCalculate.jsx ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

__webpack_require__(/*! ../common/common.less */ "./src/todoList/component/common/common.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var FinalCalculate =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FinalCalculate, _React$Component);

  function FinalCalculate(props) {
    var _this;

    _classCallCheck(this, FinalCalculate);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FinalCalculate).call(this, props));
    _this.state = {
      showClear: false,
      inputParams: _this.props.inputParams,
      isShrink: true
    };
    return _this;
  }

  _createClass(FinalCalculate, [{
    key: "setClear",
    value: function setClear() {
      this.refs[this.props.code].value = '';
      this.setState({
        showClear: false
      });
    }
  }, {
    key: "hasNumber",
    value: function hasNumber(label, specialControl, e) {
      var inputs = Object.assign(this.state.inputParams, []);
      var cur = inputs.filter(function (item) {
        return item.label === label;
      });
      cur[0].value = this.getValidate(Number(e.target.value));

      if (specialControl === 'm') {
        var targetItem = inputs.filter(function (item) {
          return item.specialControl === 'p';
        });
        targetItem[0].value = Math.round(e.target.value / 9.5 * 0.5 * 100) / 100;
      }

      if (specialControl === 'n') {
        var _targetItem = inputs.filter(function (item) {
          return item.specialControl === 'q';
        });

        _targetItem[0].value = Math.round(e.target.value / 9.5 * 0.5 * 100) / 100;
      }

      this.setState({
        inputParams: inputs
      });
      var specialControlList = ['m', 'n', 'p', 'q'];

      if (specialControl && specialControlList.indexOf(specialControl) >= 0) {
        this.props && this.props.setControl(specialControl, e.target.value);
      }
    } // 如果算不出来，返回1

  }, {
    key: "getValidate",
    value: function getValidate(val) {
      if (isNaN(val) || val === Infinity) {
        return 1;
      }

      return val;
    }
  }, {
    key: "renderIn",
    value: function renderIn(item) {
      if (item.specialControl === 'p') {
        return _react2.default.createElement("input", {
          className: "input-value",
          onChange: this.hasNumber.bind(this, item.label, item.specialControl),
          type: "number",
          placeholder: "\u8BF7\u8F93\u5165".concat(item.label),
          value: this.props.P_value
        });
      } else if (item.specialControl === 'q') {
        return _react2.default.createElement("input", {
          className: "input-value",
          onChange: this.hasNumber.bind(this, item.label, item.specialControl),
          type: "number",
          placeholder: "\u8BF7\u8F93\u5165".concat(item.label),
          value: this.props.Q_value
        });
      }

      return _react2.default.createElement("input", {
        className: "input-value",
        onChange: this.hasNumber.bind(this, item.label, item.specialControl),
        type: "number",
        placeholder: "\u8BF7\u8F93\u5165".concat(item.label),
        defaultValue: item.value
      });
    }
  }, {
    key: "setInput",
    value: function setInput() {
      var _this2 = this;

      var list = [];
      this.state.inputParams.forEach(function (item) {
        list.push(_react2.default.createElement("div", {
          key: item.label,
          className: "input-option"
        }, _react2.default.createElement("label", {
          className: "input-label"
        }, " ", item.label, "\uFF1A "), _react2.default.createElement("div", {
          className: "input-div"
        }, _this2.renderIn(item))));
      });
      return list;
    }
  }, {
    key: "setOutput",
    value: function setOutput() {
      var list = [];
      this.props.outputParams.forEach(function (item) {
        if (item.ext !== 'hide') {
          list.push(_react2.default.createElement("div", {
            key: item.label,
            className: "output-option"
          }, _react2.default.createElement("label", {
            className: "input-label"
          }, " ", item.label, "\uFF1A "), _react2.default.createElement("div", {
            className: "input-div"
          }, _react2.default.createElement("span", null, " ", item.value, " "))));
        }
      });
      return list;
    }
  }, {
    key: "confirm",
    value: function confirm() {
      var _this3 = this;

      this.state.inputParams.forEach(function (item) {
        window.localStorage.setItem(item.label, _this3.getValidate(item.value));
      });
      this.props.setValue(this.state.inputParams);
    }
  }, {
    key: "renderFormula",
    value: function renderFormula() {
      var list = [];
      this.props.formula.forEach(function (item, key) {
        list.push(_react2.default.createElement("p", {
          key: key
        }, " ", item, " "));
      });
      return list;
    }
  }, {
    key: "toggleFormula",
    value: function toggleFormula() {
      this.setState({
        isShrink: !this.state.isShrink
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement("div", {
        className: "input-field"
      }, _react2.default.createElement("div", {
        className: "title"
      }, " ", this.props.title, " "), _react2.default.createElement("div", {
        className: "IO"
      }, "\u8F93\u5165"), _react2.default.createElement("div", {
        className: "result-panel"
      }, this.setInput()), _react2.default.createElement("div", {
        className: "result"
      }, "\u7ED3\u679C"), _react2.default.createElement("div", {
        className: "result-panel"
      }, this.setOutput()), _react2.default.createElement("div", {
        className: "config-formula ".concat(this.state.isShrink === true ? 'shrink' : 'isOpen')
      }, _react2.default.createElement("div", {
        className: "expand-formula",
        onClick: this.toggleFormula.bind(this)
      }, _react2.default.createElement("div", {
        className: "expand-formula-text"
      }, "\u8BA1\u7B97\u516C\u5F0F"), _react2.default.createElement("div", {
        className: "triangle"
      }, this.state.isShrink === true ? _react2.default.createElement("img", {
        src: "./image/icon/up.png"
      }) : _react2.default.createElement("img", {
        src: "./image/icon/down.png"
      }))), this.renderFormula()), _react2.default.createElement("div", {
        className: "btn-div"
      }, _react2.default.createElement("span", {
        className: "confirm",
        onClick: this.confirm.bind(this)
      }, "\u8BA1\u7B97")));
    }
  }]);

  return FinalCalculate;
}(_react2.default.Component);

exports.default = FinalCalculate;

/***/ })

})
//# sourceMappingURL=hot-update.js.map