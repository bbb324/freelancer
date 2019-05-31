webpackHotUpdate("pageOne",{

/***/ "./src/todoList/component/analysis/CalculatMode.jsx":
/*!**********************************************************!*\
  !*** ./src/todoList/component/analysis/CalculatMode.jsx ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _Input = __webpack_require__(/*! ../common/Input.jsx */ "./src/todoList/component/common/Input.jsx");

var _Input2 = _interopRequireDefault(_Input);

var _FinalCalculate = __webpack_require__(/*! ../common/FinalCalculate.jsx */ "./src/todoList/component/common/FinalCalculate.jsx");

var _FinalCalculate2 = _interopRequireDefault(_FinalCalculate);

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

function get(ref) {
  return +ref.refs[Object.keys(ref.refs)[0]].value;
}

var event = document.createEvent('HTMLEvents');

function getDefaultValue(label) {
  return +window.localStorage.getItem(label) || 0;
}

function getRound(v) {
  return Math.round(v * 100) / 100;
} // 如果算不出来，返回0


function getValidate(val) {
  if (isNaN(val) || val === Infinity) {
    return 0;
  }

  return (+val).toFixed(2);
} // 泵排量计算公式


var Pump =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Pump, _React$Component);

  function Pump(props) {
    var _this;

    _classCallCheck(this, Pump);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Pump).call(this, props));
    _this.state = {
      value: 0,
      diameter: 0,
      chongcheng: 0,
      taoshu: 0,
      chongshu: 0,
      xiaolv: 0,
      isShrink: true
    };
    _this.formula = ['泵排量 = π*（缸套直径/2）^2*活塞冲程*缸套数*冲数*上水效率(%)'];
    return _this;
  }

  _createClass(Pump, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.setState({
        value: getValidate(window.localStorage.getItem('泵排量')),
        diameter: window.localStorage.getItem('管套直径'),
        chongcheng: window.localStorage.getItem('活塞冲程'),
        taoshu: window.localStorage.getItem('缸套数'),
        chongshu: window.localStorage.getItem('冲数'),
        xiaolv: window.localStorage.getItem('上水效率')
      });
    }
  }, {
    key: "calculate",
    value: function calculate() {
      var value = Math.PI * Math.pow(get(this.refs.a) / 2, 2) * get(this.refs.b) * get(this.refs.c) * get(this.refs.d) * get(this.refs.e);
      this.props.setValue(getValidate(value), this.props.code);
      event.initEvent("triggerPump", true, true);
      event.pumpValue = getValidate(value);
      document.dispatchEvent(event);
      window.localStorage.setItem('管套直径', getValidate(get(this.refs.a)));
      window.localStorage.setItem('活塞冲程', getValidate(get(this.refs.b)));
      window.localStorage.setItem('缸套数', getValidate(get(this.refs.c)));
      window.localStorage.setItem('冲数', getValidate(get(this.refs.d)));
      window.localStorage.setItem('上水效率', 0.9);
      window.localStorage.setItem('泵排量', getValidate(value));
      this.setState({
        value: getValidate(value)
      });
    }
  }, {
    key: "renderFormula",
    value: function renderFormula() {
      var list = [];
      this.formula.forEach(function (item, key) {
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
        className: "math-params"
      }, _react2.default.createElement("div", {
        className: "IO"
      }, "\u8F93\u5165"), _react2.default.createElement(_Input2.default, {
        name: '管套直径',
        code: 'a',
        ref: 'a',
        defaultValue: this.state.diameter
      }), _react2.default.createElement(_Input2.default, {
        name: '活塞冲程',
        code: 'b',
        ref: 'b',
        defaultValue: this.state.chongcheng
      }), _react2.default.createElement(_Input2.default, {
        name: '缸套数',
        code: 'c',
        ref: 'c',
        defaultValue: this.state.taoshu
      }), _react2.default.createElement(_Input2.default, {
        name: '冲数',
        code: 'd',
        ref: 'd',
        defaultValue: this.state.chongshu
      }), _react2.default.createElement(_Input2.default, {
        name: '上水效率（%）',
        code: 'e',
        ref: 'e',
        defaultValue: 0.9,
        type: 'percent'
      }), _react2.default.createElement("div", null, _react2.default.createElement("span", {
        className: "result"
      }, " \u7ED3\u679C"), _react2.default.createElement("div", {
        className: "result-panel"
      }, "\u6CF5\u6392\u91CF\uFF1A", this.state.value), _react2.default.createElement("div", {
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
        className: "cal-btn",
        onClick: this.calculate.bind(this)
      }, "\u8BA1\u7B97")));
    }
  }]);

  return Pump;
}(_react2.default.Component); // 循环压耗


var Cycle =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(Cycle, _React$Component2);

  function Cycle(props) {
    var _this2;

    _classCallCheck(this, Cycle);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Cycle).call(this, props));
    _this2.state = {
      value: 0,
      C2: 3117,
      C3: 0.006193,
      C4: 1.078,
      initPumpValue: '',
      unit: 'normal',
      isShrink: true,
      P_value: getDefaultValue('钻杆接箍长度'),
      Q_value: getDefaultValue('加重钻杆接箍长度'),
      output: [{
        label: '地面管汇压耗',
        value: 0
      }, {
        label: '钻杆内循环压耗',
        value: 0
      }, {
        label: '加重钻杆内循环压耗',
        value: 0
      }, {
        label: '钻铤内循环压耗',
        value: 0
      }, {
        label: '钻杆环空压耗',
        value: 0
      }, {
        label: '加重钻杆环空压耗',
        value: 0
      }, {
        label: '钻铤环空压耗',
        value: 0
      }, {
        label: '钻杆接箍环空压耗',
        value: 0
      }, {
        label: '加重钻杆接箍环空压耗',
        value: 0
      }, {
        label: '总循环压耗',
        value: 0
      }]
    };
    _this2.formula = ['钻具环空压耗 = 7628*塑性粘度^0.2*钻井液密度^0.8*泵排量^1.8*钻具长度/(井眼直径-钻具外径)^3/(井眼直径+钻具外径)^1.8', '钻具内循环压耗 = 7628*塑性粘度^0.2*钻井液密度^0.8*泵排量^1.8*钻具长度/钻具内径^4.82', '公式中钻具指的就是钻杆、加重钻杆、钻铤、钻杆接箍、加重钻杆接箍'];
    return _this2;
  } // 环空压耗统一计算公式, param1: 钻具长度, param2: 钻具外径


  _createClass(Cycle, [{
    key: "getPressure",
    value: function getPressure(param1, param2) {
      return 7628 * Math.pow(get(this.refs.c), 0.2) * Math.pow(get(this.refs.b), 0.8) * Math.pow(get(this.refs.a), 1.8) * param1 / Math.pow(get(this.refs.d) - param2, 3) / Math.pow(get(this.refs.d) + param2, 1.8);
    } // 内循环压耗统一计算公式, param1: 钻具长度, param2: 钻具内径

  }, {
    key: "getRecycle",
    value: function getRecycle(param1, param2) {
      return 7628 * Math.pow(get(this.refs.c), 0.2) * Math.pow(get(this.refs.b), 0.8) * Math.pow(get(this.refs.a), 1.8) * param1 / Math.pow(param2, 4.82);
    }
  }, {
    key: "calcluate1",
    value: function calcluate1() {
      // Psur 地面管汇压耗 = 地面管汇摩阻系数*钻井液密度*（泵排量/100）^1.86*9.818
      var Psur = get(this.refs.e) * get(this.refs.b) * Math.pow(get(this.refs.a) / 100, 1.86) * 9.818; // v1: 钻杆内循环压耗

      var v1 = this.getRecycle(get(this.refs.m), get(this.refs.f)); // v2: 加重钻杆内循环压耗

      var v2 = this.getRecycle(get(this.refs.n), get(this.refs.g)); // v3: 钻铤内循环压耗

      var v3 = this.getRecycle(get(this.refs.o), get(this.refs.h)); // v4: 钻杆环空压耗

      var v4 = this.getPressure(get(this.refs.m), get(this.refs.i)); // v5: 加重钻杆环空压耗

      var v5 = this.getPressure(get(this.refs.n), get(this.refs.j)); // v6: 钻铤环空压耗

      var v6 = this.getPressure(get(this.refs.o), get(this.refs.k)); // v7: 钻杆接箍环空压耗, lenP: 钻杆接箍长度，计算公式为 钻杆长度/9.5 * 0.5

      var lenP = +this.state.P_value;
      var v7 = this.getPressure(lenP, get(this.refs.l)); // v8: 加重钻杆接箍环空压耗, lenQ: 加重钻杆接箍，计算公式为 加重钻杆长度/9.5 * 0.5

      var lenQ = +this.state.Q_value;
      var v8 = this.getPressure(lenQ, get(this.refs.r)); // let value = Psur + v1 + v2 + v3 + v4 + v5 + v6 + v7 + v8;

      var value = getRound(Psur) + getRound(v1) + getRound(v2) + getRound(v3) + getRound(v4) + getRound(v5) + getRound(v6) + getRound(v7) + getRound(v8);
      this.props.setValue(getValidate(value), this.props.code);
      event.initEvent("triggerCycle", true, true);
      event.loopValue = getValidate(value);
      document.dispatchEvent(event);
      var outputs = Object.assign(this.state.output, []);
      outputs[0].value = getValidate(Psur);
      outputs[1].value = getValidate(v1); // 钻杆内循环压耗

      outputs[2].value = getValidate(v2); // 加重钻杆内循环压耗

      outputs[3].value = getValidate(v3); // 钻铤内循环压耗

      outputs[4].value = getValidate(v4); // 钻杆环空压耗

      outputs[5].value = getValidate(v5); // 加重钻杆环空压耗

      outputs[6].value = getValidate(v6); // 钻铤环空压耗

      outputs[7].value = getValidate(v7); // 钻杆接箍环空压耗

      outputs[8].value = getValidate(v8); // 加重钻杆接箍环空压耗

      outputs[9].value = getValidate(value);
      outputs.forEach(function (item) {
        window.localStorage.setItem(item.label, item.value);
      }); //存入輸入值到localStorage

      window.localStorage.setItem('泵排量', getValidate(get(this.refs.a)));
      window.localStorage.setItem('钻井液密度', getValidate(get(this.refs.b)));
      window.localStorage.setItem('塑性粘度', getValidate(get(this.refs.c)));
      window.localStorage.setItem('井眼直径', getValidate(get(this.refs.d)));
      window.localStorage.setItem('地面管汇摩阻系数', getValidate(get(this.refs.e)));
      window.localStorage.setItem('钻杆内径', getValidate(get(this.refs.f)));
      window.localStorage.setItem('加重钻杆内径', getValidate(get(this.refs.g)));
      window.localStorage.setItem('钻铤内径', getValidate(get(this.refs.h)));
      window.localStorage.setItem('钻杆外径', getValidate(get(this.refs.i)));
      window.localStorage.setItem('加重钻杆外径', getValidate(get(this.refs.j)));
      window.localStorage.setItem('钻铤外径', getValidate(get(this.refs.k)));
      window.localStorage.setItem('钻杆接箍外径', getValidate(get(this.refs.l)));
      window.localStorage.setItem('加重钻杆接箍外径', getValidate(get(this.refs.r)));
      window.localStorage.setItem('钻杆长度', getValidate(get(this.refs.m)));
      window.localStorage.setItem('加重钻杆长度', getValidate(get(this.refs.n)));
      window.localStorage.setItem('钻铤长度', getValidate(get(this.refs.o)));
      window.localStorage.setItem('钻杆接箍长度', getValidate(get(this.refs.p)));
      window.localStorage.setItem('加重钻杆接箍长度', getValidate(get(this.refs.q)));
      this.setState({
        output: outputs
      });
    }
  }, {
    key: "renderResult",
    value: function renderResult() {
      var list = [];
      this.state.output.forEach(function (item) {
        list.push(_react2.default.createElement("div", {
          key: item.label,
          className: "output-option"
        }, _react2.default.createElement("label", {
          className: "input-label"
        }, " ", item.label, "\uFF1A "), _react2.default.createElement("div", {
          className: "input-div"
        }, _react2.default.createElement("span", null, " ", item.value, " "))));
      });
      return list;
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      this.setState({
        output: [{
          label: '地面管汇压耗',
          value: window.localStorage.getItem('地面管汇压耗')
        }, {
          label: '钻杆内循环压耗',
          value: window.localStorage.getItem('钻杆内循环压耗')
        }, {
          label: '加重钻杆内循环压耗',
          value: window.localStorage.getItem('加重钻杆内循环压耗')
        }, {
          label: '钻铤内循环压耗',
          value: window.localStorage.getItem('钻铤内循环压耗')
        }, {
          label: '钻杆环空压耗',
          value: window.localStorage.getItem('钻杆环空压耗')
        }, {
          label: '加重钻杆环空压耗',
          value: window.localStorage.getItem('加重钻杆环空压耗')
        }, {
          label: '钻铤环空压耗',
          value: window.localStorage.getItem('钻铤环空压耗')
        }, {
          label: '钻杆接箍环空压耗',
          value: window.localStorage.getItem('钻杆接箍环空压耗')
        }, {
          label: '加重钻杆接箍环空压耗',
          value: window.localStorage.getItem('加重钻杆接箍环空压耗')
        }, {
          label: '总循环压耗',
          value: window.localStorage.getItem('总循环压耗')
        }]
      });
    }
  }, {
    key: "renderFormula",
    value: function renderFormula() {
      var list = [];
      this.formula.forEach(function (item, key) {
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
    key: "onChange",
    value: function onChange(code, value) {
      if (code === 'm') {
        this.setState({
          P_value: getValidate(value / 9.5 * 0.5)
        });
      } else if (code === 'n') {
        this.setState({
          Q_value: getValidate(value / 9.5 * 0.5)
        });
      } else if (code === 'p') {
        this.setState({
          P_value: value
        });
      } else if (code === 'q') {
        this.setState({
          Q_value: value
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement("div", {
        className: "math-params"
      }, _react2.default.createElement("div", {
        className: "IO"
      }, "\u8F93\u5165"), _react2.default.createElement(_Input2.default, {
        name: "\u6CF5\u6392\u91CF",
        code: 'a',
        ref: "a",
        defaultValue: this.state.initPumpValue
      }), _react2.default.createElement(_Input2.default, {
        name: "\u94BB\u4E95\u6DB2\u5BC6\u5EA6",
        code: 'b',
        ref: "b",
        defaultValue: getDefaultValue('钻井液密度')
      }), _react2.default.createElement(_Input2.default, {
        name: "\u5851\u6027\u7C98\u5EA6",
        code: 'c',
        ref: "c",
        defaultValue: getDefaultValue('塑性粘度')
      }), _react2.default.createElement(_Input2.default, {
        name: "\u4E95\u773C\u76F4\u5F84",
        code: 'd',
        ref: "d",
        defaultValue: getDefaultValue('井眼直径')
      }), _react2.default.createElement(_Input2.default, {
        name: "\u5730\u9762\u7BA1\u6C47\u6469\u963B\u7CFB\u6570",
        code: 'e',
        ref: "e",
        defaultValue: getDefaultValue('地面管汇摩阻系数')
      }), _react2.default.createElement(_Input2.default, {
        name: "\u94BB\u6746\u5185\u5F84",
        code: 'f',
        ref: "f",
        defaultValue: getDefaultValue('钻杆内径')
      }), _react2.default.createElement(_Input2.default, {
        name: "\u52A0\u91CD\u94BB\u6746\u5185\u5F84",
        code: 'g',
        ref: "g",
        defaultValue: getDefaultValue('加重钻杆内径')
      }), _react2.default.createElement(_Input2.default, {
        name: "\u94BB\u94E4\u5185\u5F84",
        code: 'h',
        ref: "h",
        defaultValue: getDefaultValue('钻铤内径')
      }), _react2.default.createElement(_Input2.default, {
        name: "\u94BB\u6746\u5916\u5F84",
        code: 'i',
        ref: "i",
        defaultValue: getDefaultValue('钻杆外径')
      }), _react2.default.createElement(_Input2.default, {
        name: "\u52A0\u91CD\u94BB\u6746\u5916\u5F84",
        code: 'j',
        ref: "j",
        defaultValue: getDefaultValue('加重钻杆外径')
      }), _react2.default.createElement(_Input2.default, {
        name: "\u94BB\u94E4\u5916\u5F84",
        code: 'k',
        ref: "k",
        defaultValue: getDefaultValue('钻铤外径')
      }), _react2.default.createElement(_Input2.default, {
        name: "\u94BB\u6746\u63A5\u7B8D\u5916\u5F84",
        code: 'l',
        ref: "l",
        defaultValue: getDefaultValue('钻杆接箍外径')
      }), _react2.default.createElement(_Input2.default, {
        name: "\u52A0\u91CD\u94BB\u6746\u63A5\u7B8D\u5916\u5F84",
        code: 'r',
        ref: "r",
        defaultValue: getDefaultValue('加重钻杆接箍外径')
      }), _react2.default.createElement(_Input2.default, {
        name: "\u94BB\u6746\u957F\u5EA6",
        code: 'm',
        ref: "m",
        defaultValue: getDefaultValue('钻杆长度'),
        onChange: this.onChange.bind(this)
      }), _react2.default.createElement(_Input2.default, {
        name: "\u52A0\u91CD\u94BB\u6746\u957F\u5EA6",
        code: 'n',
        ref: "n",
        defaultValue: getDefaultValue('加重钻杆长度'),
        onChange: this.onChange.bind(this)
      }), _react2.default.createElement(_Input2.default, {
        name: "\u94BB\u94E4\u957F\u5EA6",
        code: 'o',
        ref: "o",
        defaultValue: getDefaultValue('钻铤长度')
      }), _react2.default.createElement(_Input2.default, {
        name: "\u94BB\u6746\u63A5\u7B8D\u957F\u5EA6",
        code: 'p',
        ref: "p",
        defaultValue: this.state.P_value,
        onChange: this.onChange.bind(this)
      }), _react2.default.createElement(_Input2.default, {
        name: "\u52A0\u91CD\u94BB\u6746\u63A5\u7B8D\u957F\u5EA6",
        code: 'q',
        ref: "q",
        defaultValue: this.state.Q_value,
        onChange: this.onChange.bind(this)
      }), _react2.default.createElement("div", null, _react2.default.createElement("span", {
        className: "result"
      }, " \u7ED3\u679C"), _react2.default.createElement("div", {
        className: "result-panel"
      }, this.renderResult()), _react2.default.createElement("div", {
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
        className: "cal-btn",
        onClick: this.calcluate1.bind(this)
      }, "\u8BA1\u7B97")));
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      if (this.props.isSolo === 'solo') {
        var val = window.localStorage.getItem('泵排量');
        this.setState({
          initPumpValue: val
        });
      } else {
        this.eventListener = document.addEventListener('triggerPump', function (event) {
          _this3.setState({
            initPumpValue: event.pumpValue
          });
        }, false);
      }
    }
  }, {
    key: "componentWillUnMount",
    value: function componentWillUnMount() {
      document.removeEventListener(this.eventListener);
    }
  }]);

  return Cycle;
}(_react2.default.Component); // 钻头压降


var Drill =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(Drill, _React$Component3);

  function Drill(props) {
    var _this4;

    _classCallCheck(this, Drill);

    _this4 = _possibleConstructorReturn(this, _getPrototypeOf(Drill).call(this, props));
    _this4.state = {
      value: 0,
      initCycleValue: '',
      isShrink: true
    };
    _this4.formula = ['钻头压降 = 泵压 - 循环压耗'];
    return _this4;
  }

  _createClass(Drill, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.setState({
        value: getValidate(window.localStorage.getItem('钻头压降')),
        initCycleValue: getValidate(window.localStorage.getItem('循环压耗'))
      });
    }
  }, {
    key: "calculate",
    value: function calculate() {
      // 钻头压降 = 泵压 - 循环压耗
      var value = get(this.refs.a) - get(this.refs.b);
      this.props.setValue(getValidate(value), this.props.code);
      window.localStorage.setItem('钻头压降', getValidate(value));
      window.localStorage.setItem('泵压', getValidate(get(this.refs.a)));
      window.localStorage.setItem('循环压耗', getValidate(get(this.refs.b)));
      this.setState({
        value: getValidate(value)
      });
    }
  }, {
    key: "renderFormula",
    value: function renderFormula() {
      var list = [];
      this.formula.forEach(function (item, key) {
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
        className: "math-params"
      }, _react2.default.createElement("div", {
        className: "IO"
      }, "\u8F93\u5165"), _react2.default.createElement(_Input2.default, {
        name: "\u6CF5\u538B",
        code: 'a',
        ref: "a",
        defaultValue: getDefaultValue('泵压')
      }), _react2.default.createElement(_Input2.default, {
        name: "\u5FAA\u73AF\u538B\u8017",
        code: 'b',
        ref: "b",
        defaultValue: this.state.initCycleValue
      }), _react2.default.createElement("div", null, _react2.default.createElement("span", {
        className: "result"
      }, " \u7ED3\u679C"), _react2.default.createElement("div", {
        className: "result-panel"
      }, "\u94BB\u5934\u538B\u964D\uFF1A", this.state.value), _react2.default.createElement("div", {
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
        className: "cal-btn",
        onClick: this.calculate.bind(this)
      }, "\u8BA1\u7B97")));
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this5 = this;

      this.eventListener = document.addEventListener('triggerCycle', function (event) {
        _this5.setState({
          initCycleValue: event.loopValue
        });
      }, false);
    }
  }, {
    key: "componentWillUnMount",
    value: function componentWillUnMount() {
      document.removeEventListener(this.eventListener);
    }
  }]);

  return Drill;
}(_react2.default.Component); // 流变参数


var Params =
/*#__PURE__*/
function (_React$Component4) {
  _inherits(Params, _React$Component4);

  function Params(props) {
    var _this6;

    _classCallCheck(this, Params);

    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(Params).call(this, props));
    _this6.state = {
      output: [{
        label: '流性指数',
        value: 0
      }, {
        label: '稠度系数',
        value: 0
      }, {
        label: '表观粘度',
        value: 0
      }, {
        label: '塑性粘度',
        value: 0
      }, {
        label: '动切力',
        value: 0
      }, {
        label: '动塑比',
        value: 0
      }],
      isShrink: true
    };
    _this6.formula = ['流性指数 = 3.322 * Math.log10(Ф600 / Ф300)', '稠度系数 = (0.511 * Ф300) / Math.pow(511, 3.322 * Math.log10(Ф600 / Ф300))', '表观粘度 = Ф600 / 2', '塑性粘度 = Ф600 -Ф300', '动切力 = 0.479 * (2*Ф300-Ф600)', '动塑比 = 动切力/塑性粘度'];
    return _this6;
  }

  _createClass(Params, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.setState({
        value: getValidate(window.localStorage.getItem('液流变参数'))
      });
    }
  }, {
    key: "calculate",
    value: function calculate() {
      // v0: 流性指数 = 3.322 * Math.log10(Ф600 / Ф300)
      var v0 = 3.322 * Math.log10(get(this.refs.a) / get(this.refs.b)); // v1: 稠度系数

      var v1 = 0.511 * get(this.refs.b) / Math.pow(511, v0); // v2: 表观粘度

      var v2 = get(this.refs.a) / 2; // v3: 塑性粘度

      var v3 = get(this.refs.a) - get(this.refs.b); // v4: 动切力

      var v4 = 0.479 * (2 * get(this.refs.b) - get(this.refs.a)); // v5: 动塑比

      var v5 = v4 / v3;
      window.localStorage.setItem('Ф600', getValidate(get(this.refs.a)));
      window.localStorage.setItem('Ф300', getValidate(get(this.refs.b)));
      var outputs = Object.assign(this.state.output, []);
      outputs[0].value = getValidate(v0);
      outputs[1].value = getValidate(v1);
      outputs[2].value = getValidate(v2);
      outputs[3].value = getValidate(v3);
      outputs[4].value = getValidate(v4);
      outputs[5].value = getValidate(v5);
      outputs.forEach(function (item) {
        window.localStorage.setItem(item.label, item.value);
      });
      this.setState({
        output: outputs
      });
      this.props.setValue(v3, this.props.code);
    }
  }, {
    key: "renderFormula",
    value: function renderFormula() {
      var list = [];
      this.formula.forEach(function (item, key) {
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
    key: "renderResult",
    value: function renderResult() {
      var list = [];
      this.state.output.forEach(function (item, key) {
        list.push(_react2.default.createElement("div", {
          className: "result-panel",
          key: key
        }, item.label, "\uFF1A", item.value));
      });
      return list;
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement("div", {
        className: "math-params"
      }, _react2.default.createElement("div", {
        className: "IO"
      }, "\u8F93\u5165"), _react2.default.createElement(_Input2.default, {
        name: "\u0424600",
        code: 'a',
        ref: "a",
        defaultValue: getDefaultValue('Ф600')
      }), _react2.default.createElement(_Input2.default, {
        name: "\u0424300",
        code: 'b',
        ref: "b",
        defaultValue: getDefaultValue('Ф300')
      }), _react2.default.createElement("div", null, _react2.default.createElement("span", {
        className: "result"
      }, " \u7ED3\u679C"), this.renderResult(), _react2.default.createElement("div", {
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
        className: "cal-btn",
        onClick: this.calculate.bind(this)
      }, "\u8BA1\u7B97")));
    }
  }]);

  return Params;
}(_react2.default.Component); // 环空返速


var Loop =
/*#__PURE__*/
function (_React$Component5) {
  _inherits(Loop, _React$Component5);

  function Loop(props) {
    var _this7;

    _classCallCheck(this, Loop);

    _this7 = _possibleConstructorReturn(this, _getPrototypeOf(Loop).call(this, props));
    _this7.state = {
      value: 0,
      initPumpValue: '',
      isShrink: true
    };
    _this7.formula = ['环空返速 = 1.2732 * Math.pow(10, 3) *泵排量 / (Math.pow(井眼直径, 2) - Math.pow(钻具外径, 2))'];
    return _this7;
  }

  _createClass(Loop, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.setState({
        value: window.localStorage.getItem('环空返速')
      });
    }
  }, {
    key: "calculate",
    value: function calculate() {
      // value 环空返速 = 1.2732 * Math.pow(10, 3) *泵排量 / (Math.pow(井眼直径, 2) - Math.pow(钻具外径, 2))
      var value = 1.2732 * Math.pow(10, 3) * get(this.refs.a) / (Math.pow(get(this.refs.b), 2) - Math.pow(get(this.refs.c), 2));
      this.props.setValue(getValidate(value), this.props.code);
      event.initEvent("triggerLoop", true, true);
      event.loopValue = value;
      window.localStorage.setItem('环空返速', getValidate(value));
      window.localStorage.setItem('井眼直径', getValidate(get(this.refs.b)));
      window.localStorage.setItem('钻具外径', getValidate(get(this.refs.c)));
      document.dispatchEvent(event);
      this.setState({
        value: getValidate(value)
      });
    }
  }, {
    key: "renderFormula",
    value: function renderFormula() {
      var list = [];
      this.formula.forEach(function (item, key) {
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
        className: "math-params"
      }, _react2.default.createElement("div", {
        className: "IO"
      }, "\u8F93\u5165"), _react2.default.createElement(_Input2.default, {
        name: "\u6CF5\u6392\u91CF",
        code: 'a',
        ref: "a",
        defaultValue: this.state.initPumpValue
      }), _react2.default.createElement(_Input2.default, {
        name: "\u4E95\u773C\u76F4\u5F84",
        code: 'b',
        ref: "b",
        defaultValue: getDefaultValue('井眼直径')
      }), _react2.default.createElement(_Input2.default, {
        name: "\u94BB\u5177\u5916\u5F84",
        code: 'c',
        ref: "c",
        defaultValue: getDefaultValue('钻具外径')
      }), _react2.default.createElement("div", null, _react2.default.createElement("span", {
        className: "result"
      }, " \u7ED3\u679C"), _react2.default.createElement("div", {
        className: "result-panel"
      }, "\u73AF\u7A7A\u8FD4\u901F\uFF1A", this.state.value), _react2.default.createElement("div", {
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
        className: "cal-btn",
        onClick: this.calculate.bind(this)
      }, "\u8BA1\u7B97")));
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this8 = this;

      if (this.props.isSolo === 'solo') {
        var val = window.localStorage.getItem('泵排量');
        this.setState({
          initPumpValue: val
        });
      } else {
        this.eventListener = document.addEventListener('triggerPump', function (event) {
          _this8.setState({
            initPumpValue: event.pumpValue
          });
        }, false);
      }
    }
  }, {
    key: "componentWillUnMount",
    value: function componentWillUnMount() {
      document.removeEventListener(this.eventListener);
    }
  }]);

  return Loop;
}(_react2.default.Component); // 流态


var Flow =
/*#__PURE__*/
function (_React$Component6) {
  _inherits(Flow, _React$Component6);

  function Flow(props) {
    var _this9;

    _classCallCheck(this, Flow);

    _this9 = _possibleConstructorReturn(this, _getPrototypeOf(Flow).call(this, props));
    _this9.state = {
      a: 0,
      b: 0,
      c: 0,
      unit: 'normal',
      C23: 1.0779,
      initLoopValue: window.localStorage.getItem('环空返速'),
      isShrink: true,
      output: [{
        label: '钻杆内雷诺数',
        value: 0
      }, {
        label: '环空雷诺数',
        value: 0
      }, {
        label: '环空流态',
        value: 0
      }]
    };
    _this9.formula = ['有效视粘度 = 塑性粘度 + 0.112 * ((井眼直径 - 钻杆外径) * 动切力 / 环空返速)', '钻杆内雷诺数 = 928 * 钻具内液流平均流速 * 钻具内径 * 钻井液密度 * 1.0779 / 有效视粘度 * Math.pow(((3 * 流性指数+1) / (4 * 流性指数)), 钻具内流性指数)', '环空雷诺数 = 928 * 环空液流的流速 * (井眼直径 - 钻杆外径) * 钻井液密度 * 1.0779 / 有效视粘度 * Math.pow(((2 * 环空流性指数 + 1) / (3 * 环空流性指数)), 环空流性指数)', '流态用环空雷诺数和2100比较，小于2100层流，大于2100紊流'];
    return _this9;
  }

  _createClass(Flow, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.setState({
        value: window.localStorage.getItem('流态')
      });
    }
  }, {
    key: "calculate",
    value: function calculate() {
      var viscosity = getDefaultValue('塑性粘度'); // 有效视粘度 = 塑性粘度 + 0.112 * ((井眼直径 - 钻杆外径) * 动切力 / 环空返速)
      //let Ucp = viscosity + 0.112 *(get(this.refs.g) - get(this.refs.h)) * getDefaultValue('动切力') / get(this.refs.f);

      var Ucp = get(this.refs.d); // v2: 钻杆内雷诺数 = 928 * 钻具内液流平均流速 * 钻具内径 * 钻井液密度 * C23 / 有效视粘度 * Math.pow(((3 * 流性指数+1) / (4 * 流性指数)), 钻具内流性指数)

      var tmp2 = Math.pow(3 / 4 + 1 / (4 * get(this.refs.e)), get(this.refs.e));
      var v2 = 928 * get(this.refs.a) * get(this.refs.b) * get(this.refs.c) * this.state.C23 / Ucp * tmp2; // 环空雷诺数 = 928 * 环空液流的流速 * (井眼直径 - 钻杆外径) * 钻井液密度 * C23 / 有效视粘度 * Math.pow(((2 * 环空流性指数 + 1) / (3 * 环空流性指数)), 环空流性指数)

      var tmp3 = Math.pow(2 / 3 + 1 / (3 * get(this.refs.e)), get(this.refs.e));
      var Rep = 928 * get(this.refs.a) * (get(this.refs.g) - get(this.refs.h)) * get(this.refs.c) * this.state.C23 / Ucp * tmp3; // value: 流态

      var value = '';

      if (Rep < 2100) {
        value = '层流';
      } else {
        value = '紊流';
      }

      this.props.setValue(value, this.props.code);
      window.localStorage.setItem('流态', value);
      window.localStorage.setItem('钻杆内雷诺数', v2);
      window.localStorage.setItem('环空雷诺数', Rep);
      window.localStorage.setItem('钻杆内钻井液平均流速', get(this.refs.a));
      window.localStorage.setItem('钻杆内径', get(this.refs.b));
      window.localStorage.setItem('钻井液密度', get(this.refs.c));
      window.localStorage.setItem('有效视粘度', get(this.refs.d));
      window.localStorage.setItem('流性指数', get(this.refs.e));
      window.localStorage.setItem('环空返速', get(this.refs.f));
      window.localStorage.setItem('井眼直径', get(this.refs.g));
      window.localStorage.setItem('钻杆外径', get(this.refs.h));
      var outputs = Object.assign(this.state.output, []);
      outputs[0].value = getValidate(v2);
      outputs[1].value = getValidate(Rep);
      outputs[2].value = value;
      outputs.forEach(function (item) {
        window.localStorage.setItem(item.label, item.value);
      });
      this.setState({
        output: outputs
      });
    }
  }, {
    key: "renderFormula",
    value: function renderFormula() {
      var list = [];
      this.formula.forEach(function (item, key) {
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
    key: "renderResult",
    value: function renderResult() {
      var list = [];
      this.state.output.forEach(function (item, key) {
        list.push(_react2.default.createElement("div", {
          className: "result-panel",
          key: key
        }, item.label, "\uFF1A", item.value));
      });
      return list;
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement("div", {
        className: "math-params"
      }, _react2.default.createElement("div", {
        className: "IO"
      }, "\u8F93\u5165"), _react2.default.createElement(_Input2.default, {
        name: "\u94BB\u6746\u5185\u94BB\u4E95\u6DB2\u5E73\u5747\u6D41\u901F",
        code: 'a',
        ref: 'a',
        defaultValue: getDefaultValue('钻杆内钻井液平均流速')
      }), _react2.default.createElement(_Input2.default, {
        name: "\u94BB\u6746\u5185\u5F84",
        code: 'b',
        ref: 'b',
        defaultValue: getDefaultValue('钻杆内径')
      }), _react2.default.createElement(_Input2.default, {
        name: "\u94BB\u4E95\u6DB2\u5BC6\u5EA6",
        code: 'c',
        ref: 'c',
        defaultValue: getDefaultValue('钻井液密度')
      }), _react2.default.createElement(_Input2.default, {
        name: "\u6709\u6548\u89C6\u7C98\u5EA6",
        code: 'd',
        ref: 'd',
        defaultValue: getDefaultValue('有效视粘度')
      }), _react2.default.createElement(_Input2.default, {
        name: "\u6D41\u6027\u6307\u6570",
        code: 'e',
        ref: 'e',
        defaultValue: getDefaultValue('流性指数')
      }), _react2.default.createElement(_Input2.default, {
        name: "\u73AF\u7A7A\u8FD4\u901F",
        code: 'f',
        ref: 'f',
        defaultValue: this.state.initLoopValue
      }), _react2.default.createElement(_Input2.default, {
        name: "\u4E95\u773C\u76F4\u5F84",
        code: 'g',
        ref: 'g',
        defaultValue: getDefaultValue('井眼直径')
      }), _react2.default.createElement(_Input2.default, {
        name: "\u94BB\u6746\u5916\u5F84",
        code: 'h',
        ref: 'h',
        defaultValue: getDefaultValue('钻杆外径')
      }), _react2.default.createElement("div", null, _react2.default.createElement("span", {
        className: "result"
      }, " \u7ED3\u679C"), this.renderResult(), _react2.default.createElement("div", {
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
        className: "cal-btn",
        onClick: this.calculate.bind(this)
      }, "\u8BA1\u7B97")));
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this10 = this;

      this.eventListener = document.addEventListener('triggerLoop', function (event) {
        _this10.setState({
          initLoopValue: event.loopValue
        });
      }, false);
    }
  }, {
    key: "componentWillUnMount",
    value: function componentWillUnMount() {
      document.removeEventListener(this.eventListener);
    }
  }]);

  return Flow;
}(_react2.default.Component);

var Total =
/*#__PURE__*/
function (_React$Component7) {
  _inherits(Total, _React$Component7);

  function Total(props) {
    var _this11;

    _classCallCheck(this, Total);

    _this11 = _possibleConstructorReturn(this, _getPrototypeOf(Total).call(this, props));
    _this11.state = {
      input: [{
        label: '缸套直径',
        value: ''
      }, {
        label: '活塞冲程',
        value: ''
      }, {
        label: '缸套数',
        value: ''
      }, {
        label: '冲数',
        value: ''
      }, {
        label: '上水效率',
        value: ''
      }, {
        label: '泵排量',
        value: ''
      }, {
        label: '钻井液密度',
        value: ''
      }, {
        label: '塑性粘度',
        value: ''
      }, {
        label: '井眼直径',
        value: ''
      }, {
        label: '地面管汇摩阻系数',
        value: ''
      }, {
        label: '钻杆加重钻杆钻铤内径',
        value: ''
      }, {
        label: '钻杆加重钻杆钻铤外径',
        value: ''
      }, {
        label: '钻杆接箍外径',
        value: ''
      }, {
        label: '钻杆加重钻杆钻铤长度',
        value: ''
      }, {
        label: '泵压',
        value: ''
      }, {
        label: '动切力',
        value: ''
      }, {
        label: 'Ф600',
        value: ''
      }, {
        label: 'Ф300',
        value: ''
      }, {
        label: '钻杆内钻井液平均流速',
        value: ''
      }, {
        label: '有效视粘度',
        value: ''
      }, {
        label: '流性指数',
        value: ''
      }, {
        label: '环空返速',
        value: ''
      }],
      output: [{
        label: '泵排量',
        value: 0
      }, {
        label: '循环压耗',
        value: 0
      }, {
        label: '钻头压降',
        value: 0
      }, {
        label: '液流变参数',
        value: 0
      }, {
        label: '环空返速',
        value: 0
      }, {
        label: '流态',
        value: 0
      }]
    };
    _this11.formula = ['泵排量 = π*（缸套直径/2）^2*活塞冲程*缸套数*冲数*上水效率', '循环压耗 = 地面管汇压耗' + '钻杆内循环压耗' + '加重钻杆内循环压耗' + '钻铤内循环压耗' + '钻杆环空压耗' + '加重钻杆环空压耗' + '钻铤环空压耗' + '钻杆接箍环空压耗' + '加重钻杆接箍环空压耗', '钻头压降 = 泵压 - 循环压耗', '液流变参数 = Ф600 - Ф300', '环空返速 = 1.2732 * Math.pow(10, 3) *泵排量 / (Math.pow(井眼直径, 2) - Math.pow(钻具外径, 2))', '有效视粘度 = 塑性粘度 + 0.112 * ((井眼直径 - 钻杆外径) * 动切力 / 环空返速)', '环空雷诺数 = 928 * 环空液流的流速 * (井眼直径 - 钻杆外径) * 钻井液密度 * 1.0779 / 有效视粘度 * Math.pow(((2 * 环空流性指数 + 1) / (3 * 环空流性指数)), 环空流性指数)', '流态 = 环空雷诺数 < 2100 ? 层流 : 紊流'];
    return _this11;
  }

  _createClass(Total, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var inputs = Object.assign(this.state.input, []);
      var outputs = Object.assign(this.state.output, []);
      inputs.forEach(function (item) {
        item.value = window.localStorage.getItem(item.label);
      });
      outputs.forEach(function (item) {
        item.value = window.localStorage.getItem(item.label);
      });
      this.setState({
        input: inputs,
        output: outputs
      });
    }
  }, {
    key: "getValue",
    value: function getValue(label) {
      try {
        var unit = this.totalParams.filter(function (item) {
          return item.label === label;
        });
        return +unit[0].value;
      } catch (e) {
        console.log(label);
      }
    }
  }, {
    key: "setValue",
    value: function setValue(inputParams) {
      this.totalParams = inputParams;
      var outputs = Object.assign(this.state.output, []); // v1: 环空返速

      var v1 = 1.2732 * Math.pow(10, 3) * this.getValue('泵排量') / (Math.pow(this.getValue('井眼直径'), 2) - Math.pow(this.getValue('钻杆加重钻杆钻铤外径'), 2));
      outputs[0].value = Math.PI * Math.pow(this.getValue('缸套直径') / 2, 2) * this.getValue('活塞冲程') * this.getValue('缸套数') * this.getValue('冲数') * this.getValue('上水效率');
      outputs[1].value = this.getRecycle();
      outputs[2].value = this.getValue('泵压') - this.getRecycle();
      outputs[3].value = this.getValue('Ф600') - this.getValue('Ф300');
      outputs[4].value = v1; // v2: 有效视粘度

      var v2 = this.getValue('塑性粘度') + 0.112 * ((this.getValue('井眼直径') - this.getValue('钻杆加重钻杆钻铤外径')) * this.getValue('动切力') / v1); // v3: 环空的雷诺数

      var v3 = 928 * this.getValue('钻杆内钻井液平均流速') * (this.getValue('井眼直径') - this.getValue('钻杆加重钻杆钻铤外径')) * this.getValue('钻井液密度') * 1.0779 / v2 * Math.pow((2 * this.getValue('流性指数') + 1) / (3 * this.getValue('流性指数')), this.getValue('流性指数'));
      outputs[5].value = v3 < 2100 ? '层流' : '紊流';
      outputs.forEach(function (item) {
        window.localStorage.setItem(item.label, item.value);
      });
      this.setState({
        output: outputs
      });
      this.props.setBack(outputs);
    } // 循环压耗

  }, {
    key: "getRecycle",
    value: function getRecycle() {
      // 地面管汇压耗' + '钻杆内循环压耗' + '加重钻杆内循环压耗' + '钻铤内循环压耗' + '钻杆环空压耗' + '加重钻杆环空压耗' + '钻铤环空压耗' + '钻杆接箍环空压耗' + '加重钻杆接箍环空压耗
      // v1: 循环压耗
      var v1 = 7628 * Math.pow(this.getValue('塑性粘度'), 0.2) * Math.pow(this.getValue('钻井液密度'), 0.8) * Math.pow(this.getValue('泵排量'), 1.8) * this.getValue('钻杆加重钻杆钻铤长度') / Math.pow(this.getValue('钻杆加重钻杆钻铤内径'), 4.82); // 地面管汇压耗

      var a1 = this.getValue('地面管汇摩阻系数') * this.getValue('钻井液密度') * Math.pow(this.getValue('泵排量') / 100, 1.86) * 9.818; // 钻杆内循环压耗

      var a2 = v1; // 加重钻杆内循环压耗

      var a3 = v1; // 钻铤内循环压耗

      var a4 = v1;
      var b1 = 7628 * Math.pow(this.getValue('塑性粘度'), 0.2) * Math.pow(this.getValue('钻井液密度'), 0.8) * Math.pow(this.getValue('泵排量'), 1.8) * this.getValue('钻杆加重钻杆钻铤长度') / Math.pow(this.getValue('井眼直径') - this.getValue('钻杆加重钻杆钻铤外径'), 3) / Math.pow(this.getValue('井眼直径') + this.getValue('钻杆加重钻杆钻铤外径'), 1.8); // 钻杆环空压耗

      var a5 = b1; // 加重钻杆环空压耗

      var a6 = b1; // 钻铤环空压耗

      var a7 = b1; // 钻杆接箍环空压耗

      var a8 = b1; // 加重钻杆接箍环空压耗

      var a9 = b1;
      return a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9;
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(_FinalCalculate2.default, {
        inputParams: this.state.input,
        outputParams: this.state.output,
        setValue: this.setValue.bind(this),
        title: '综合分析',
        formula: this.formula
      });
    }
  }]);

  return Total;
}(_react2.default.Component);

module.exports = {
  Pump: Pump,
  Cycle: Cycle,
  Drill: Drill,
  Params: Params,
  Loop: Loop,
  Flow: Flow,
  Total: Total
};

/***/ })

})
//# sourceMappingURL=hot-update.js.map