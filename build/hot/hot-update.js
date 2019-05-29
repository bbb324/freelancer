webpackHotUpdate("pageOne",{

/***/ "./src/todoList/component/simulation/SimulationCalculateMode.jsx":
/*!***********************************************************************!*\
  !*** ./src/todoList/component/simulation/SimulationCalculateMode.jsx ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _Input = __webpack_require__(/*! ../common/Input.jsx */ \"./src/todoList/component/common/Input.jsx\");\n\nvar _Input2 = _interopRequireDefault(_Input);\n\nvar _FinalCalculate = __webpack_require__(/*! ../common/FinalCalculate.jsx */ \"./src/todoList/component/common/FinalCalculate.jsx\");\n\nvar _FinalCalculate2 = _interopRequireDefault(_FinalCalculate);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction get(ref) {\n  return +ref.refs[Object.keys(ref.refs)[0]].value;\n}\n\nvar event = document.createEvent('HTMLEvents'); // 漏层承压能力计算公式\n\nvar Load =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(Load, _React$Component);\n\n  function Load(props) {\n    var _this;\n\n    _classCallCheck(this, Load);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(Load).call(this, props));\n    _this.state = {\n      value: 0,\n      initDepthValue: 0\n    };\n    return _this;\n  }\n\n  _createClass(Load, [{\n    key: \"calculate\",\n    value: function calculate() {\n      //重浆密度 = 堵漏浆密度*g*预计水泥塞长+堵漏时钻井液密度*g*（漏层垂深 - （（堵漏浆方量 - 挤水泥方量）/(1/4π井眼直径的平方）））\n      var value = get(this.refs.a) * 9.8 * get(this.refs.b) + get(this.refs.c) * 9.8 * (get(this.refs.d) - (get(this.refs.e) - get(this.refs.f)) / (1 / 4 * Math.PI * get(this.refs.g)));\n      this.props.setValue(this.props.code, value.toFixed(2));\n      this.setState({\n        value: value.toFixed(2)\n      });\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      return _react2.default.createElement(\"div\", {\n        className: \"math-params\"\n      }, _react2.default.createElement(_Input2.default, {\n        name: '堵漏浆密度',\n        code: 'density',\n        ref: 'a'\n      }), _react2.default.createElement(_Input2.default, {\n        name: '预计水泥塞长',\n        code: 'length',\n        ref: 'b'\n      }), _react2.default.createElement(_Input2.default, {\n        name: '堵漏时钻井液密度',\n        code: 'liquid-density',\n        ref: 'c'\n      }), _react2.default.createElement(_Input2.default, {\n        name: '漏层垂深',\n        code: 'depth',\n        ref: 'd'\n      }), _react2.default.createElement(_Input2.default, {\n        name: '堵漏浆方量',\n        code: 'leaking-stop',\n        ref: 'e'\n      }), _react2.default.createElement(_Input2.default, {\n        name: '挤水泥方量',\n        code: 'water',\n        ref: 'f'\n      }), _react2.default.createElement(_Input2.default, {\n        name: '井眼直径的平方',\n        code: 'diameter',\n        ref: 'g'\n      }), _react2.default.createElement(\"div\", null, _react2.default.createElement(\"span\", {\n        className: \"result\"\n      }, \" \\u7ED3\\u679C\\uFF1A \", this.state.value, \" \"), _react2.default.createElement(\"div\", {\n        className: \"cal-btn\",\n        onClick: this.calculate.bind(this)\n      }, \"\\u8BA1\\u7B97\")));\n    }\n  }]);\n\n  return Load;\n}(_react2.default.Component); // 预计水泥塞长计算公式\n\n\nvar Predict =\n/*#__PURE__*/\nfunction (_React$Component2) {\n  _inherits(Predict, _React$Component2);\n\n  function Predict(props) {\n    var _this2;\n\n    _classCallCheck(this, Predict);\n\n    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Predict).call(this, props));\n    _this2.state = {\n      value: 0,\n      initDensityValue: 0\n    };\n    return _this2;\n  }\n\n  _createClass(Predict, [{\n    key: \"calculate\",\n    value: function calculate() {\n      //预计水泥塞长 = （堵漏浆方量 - 挤水泥方量）/(1/4π井眼直径的平方）-新环空静液面高度\n      var value = (get(this.refs.a) - get(this.refs.b)) / (1 / 4 * Math.PI * get(this.refs.c)) - get(this.refs.d);\n      this.props.setValue(this.props.code, value.toFixed(2));\n      this.setState({\n        value: value.toFixed(2)\n      });\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      return _react2.default.createElement(\"div\", {\n        className: \"math-params\"\n      }, _react2.default.createElement(_Input2.default, {\n        name: '堵漏浆方量',\n        code: 'leaking-stop',\n        ref: 'a'\n      }), _react2.default.createElement(_Input2.default, {\n        name: '挤水泥方量',\n        code: 'water',\n        ref: 'b'\n      }), _react2.default.createElement(_Input2.default, {\n        name: '井眼直径的平方',\n        code: 'diameter',\n        ref: 'c'\n      }), _react2.default.createElement(_Input2.default, {\n        name: '新环空静液面高度',\n        code: 'height',\n        ref: 'd'\n      }), _react2.default.createElement(\"div\", null, _react2.default.createElement(\"span\", {\n        className: \"result\"\n      }, \" \\u7ED3\\u679C\\uFF1A \", this.state.value, \" \"), _react2.default.createElement(\"div\", {\n        className: \"cal-btn\",\n        onClick: this.calculate.bind(this)\n      }, \"\\u8BA1\\u7B97\")));\n    }\n  }]);\n\n  return Predict;\n}(_react2.default.Component); // 实际水泥塞长计算公式\n\n\nvar Real =\n/*#__PURE__*/\nfunction (_React$Component3) {\n  _inherits(Real, _React$Component3);\n\n  function Real(props) {\n    var _this3;\n\n    _classCallCheck(this, Real);\n\n    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(Real).call(this, props));\n    _this3.state = {\n      value: 0,\n      initDensityValue: 0\n    };\n    return _this3;\n  }\n\n  _createClass(Real, [{\n    key: \"calculate\",\n    value: function calculate() {\n      //预计水泥塞长 = （堵漏浆方量 - 挤水泥方量）/(1/4π井眼直径的平方）-新环空静液面高度\n      var value = (get(this.refs.a) - get(this.refs.b)) / (1 / 4 * Math.PI * get(this.refs.c)) - get(this.refs.d);\n      this.props.setValue(this.props.code, value.toFixed(2));\n      this.setState({\n        value: value.toFixed(2)\n      });\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      return _react2.default.createElement(\"div\", {\n        className: \"math-params\"\n      }, _react2.default.createElement(_Input2.default, {\n        name: '堵漏浆方量',\n        code: 'leaking-stop',\n        ref: 'a'\n      }), _react2.default.createElement(_Input2.default, {\n        name: '挤水泥方量',\n        code: 'water',\n        ref: 'b'\n      }), _react2.default.createElement(_Input2.default, {\n        name: '井眼直径的平方',\n        code: 'diameter',\n        ref: 'c'\n      }), _react2.default.createElement(_Input2.default, {\n        name: '新环空静液面高度',\n        code: 'height',\n        ref: 'd'\n      }), _react2.default.createElement(\"div\", null, _react2.default.createElement(\"span\", {\n        className: \"result\"\n      }, \" \\u7ED3\\u679C\\uFF1A \", this.state.value, \" \"), _react2.default.createElement(\"div\", {\n        className: \"cal-btn\",\n        onClick: this.calculate.bind(this)\n      }, \"\\u8BA1\\u7B97\")));\n    }\n  }]);\n\n  return Real;\n}(_react2.default.Component);\n\nvar Total =\n/*#__PURE__*/\nfunction (_React$Component4) {\n  _inherits(Total, _React$Component4);\n\n  function Total(props) {\n    var _this4;\n\n    _classCallCheck(this, Total);\n\n    _this4 = _possibleConstructorReturn(this, _getPrototypeOf(Total).call(this, props));\n    _this4.state = {\n      input: [{\n        label: '井眼直径',\n        value: ''\n      }, {\n        label: '漏失时钻井液密度',\n        value: ''\n      }, {\n        label: '漏层垂深',\n        value: ''\n      }, {\n        label: '环空静液面高度',\n        value: ''\n      }, {\n        label: '堵漏浆密度',\n        value: ''\n      }, {\n        label: '堵漏浆方量',\n        value: ''\n      }, {\n        label: '堵漏时钻井液密度',\n        value: ''\n      }, {\n        label: '挤水泥方量',\n        value: ''\n      }, {\n        label: '漏层平均井斜角',\n        value: ''\n      }, {\n        label: '实际水泥塞长',\n        value: ''\n      }],\n      output: [{\n        label: '漏层承压能力',\n        value: 0\n      }, {\n        label: '直井段预计水泥塞长',\n        value: 0\n      }, {\n        label: '斜井段预计水泥塞长',\n        value: 0\n      }, {\n        label: '水平段预计水泥塞长',\n        value: 0\n      }, {\n        label: '实际水泥塞长',\n        value: 0\n      }]\n    };\n    _this4.formula = ['漏层承压能力 = 漏失时钻井液密度*g*(漏层垂深 - 环空静液面高度)', '直井段： 预计水泥塞长 = (漏层承压能力 - 堵漏时钻井液密度 * g * (漏层垂深 - ((堵漏浆方量 - 挤水泥方量) / (1/4π井眼直径的平方))) / (堵漏浆密度 * g)', '斜井段： 预计水泥塞长 = (漏层承压能力 - 堵漏时钻井液密度 * g * (漏层垂深 - ((堵漏浆方量 - 挤水泥方量) / (1/4 *π *井眼直径的平方)) * cos漏层平均井斜角)) / (g * 堵漏浆密度 * cos漏层平均井斜角)', '水平段： 预计水泥塞长=（堵漏浆方量 - 挤水泥方量）/(1/4*π*井眼直径的平方）-新环空静液面高度', '实际水泥塞长 = 实际水泥塞长'];\n    return _this4;\n  }\n\n  _createClass(Total, [{\n    key: \"componentWillMount\",\n    value: function componentWillMount() {\n      var inputs = Object.assign(this.state.input, []);\n      var outputs = Object.assign(this.state.output, []);\n      inputs.forEach(function (item) {\n        item.value = window.localStorage.getItem(item.label);\n      });\n      outputs.forEach(function (item) {\n        item.value = window.localStorage.getItem(item.label);\n      });\n      this.setState({\n        input: inputs,\n        output: outputs\n      });\n    }\n  }, {\n    key: \"getValue\",\n    value: function getValue(label) {\n      var unit = this.totalParams.filter(function (item) {\n        return item.label === label;\n      });\n      return +unit[0].value;\n    } // 如果算不出来，返回0\n\n  }, {\n    key: \"getValidate\",\n    value: function getValidate(val) {\n      if (isNaN(val) || val === Infinity) {\n        return 0;\n      }\n\n      return (+val).toFixed(2);\n    }\n  }, {\n    key: \"setValue\",\n    value: function setValue(inputParams) {\n      this.totalParams = inputParams;\n      var outputs = Object.assign(this.state.output, []); // v: 漏层承压能力\n\n      var v = this.getValue('漏失时钻井液密度') * 9.8 * (this.getValue('漏层垂深') - this.getValue('环空静液面高度')); // v2: 井眼直径的平方\n\n      var v2 = this.getValue('井眼直径') * this.getValue('井眼直径');\n      outputs[0].value = this.getValidate(v); //tmp1: 堵漏时钻井液密度*g*（漏层垂深 - （（堵漏浆方量 - 挤水泥方量）/(1/4π井眼直径的平方）））\n\n      var tmp1 = this.getValue('堵漏时钻井液密度') * 9.8 * (this.getValue('漏层垂深') - (this.getValue('堵漏浆方量') - this.getValue('挤水泥方量')) / (1 / 4 * Math.PI * v2));\n      outputs[1].value = this.getValidate((v - tmp1) / (9.8 * this.getValue('堵漏浆密度'))); // tmp2: 堵漏时钻井液密度 * g * (漏层垂深 - ((堵漏浆方量 - 挤水泥方量) / (1/4 *π *井眼直径的平方)) * cos漏层平均井斜角))\n\n      var tmp2 = this.getValue('堵漏时钻井液密度') * 9.8 * (this.getValue('漏层垂深') - (this.getValue('堵漏浆方量') - this.getValue('挤水泥方量')) / (1 / 4 * Math.PI * v2) * Math.cos(2 * Math.PI / 360 * this.getValue('漏层平均井斜角')));\n      outputs[2].value = this.getValidate((v - tmp2) / (9.8 * this.getValue('堵漏浆密度') * Math.cos(2 * Math.PI / 360 * this.getValue('漏层平均井斜角')))); // tmp3: （堵漏浆方量 - 挤水泥方量）/(1/4π井眼直径的平方）\n\n      var tmp3 = (this.getValue('堵漏浆方量') - this.getValue('挤水泥方量')) / (1 / 4 * Math.PI * v2); // tmp4: 新环空静液面高度 = 漏层承压能力 / (堵漏时钻井液密度*g*) - 漏层垂深\n\n      var tmp4 = this.getValue('漏层垂深') - v / (this.getValue('堵漏时钻井液密度') * 9.8);\n      outputs[3].value = this.getValidate(tmp3 - tmp4);\n      outputs[4].value = this.getValidate(this.getValue('实际水泥塞长'));\n      outputs.forEach(function (item) {\n        window.localStorage.setItem(item.label, item.value);\n      });\n      this.setState({\n        output: outputs\n      });\n      this.props.setBack(outputs);\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      return _react2.default.createElement(_FinalCalculate2.default, {\n        inputParams: this.state.input,\n        outputParams: this.state.output,\n        setValue: this.setValue.bind(this),\n        title: '堵漏效果模拟',\n        formula: this.formula\n      });\n    }\n  }]);\n\n  return Total;\n}(_react2.default.Component);\n\nmodule.exports = {\n  Load: Load,\n  Predict: Predict,\n  Real: Real,\n  Total: Total\n};\n\n//# sourceURL=webpack:///./src/todoList/component/simulation/SimulationCalculateMode.jsx?");

/***/ })

})