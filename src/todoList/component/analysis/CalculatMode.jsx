import React from 'react';import Input from '../common/Input.jsx';import FinalCalculate from '../common/FinalCalculate.jsx';function get(ref) {   return +ref.refs[Object.keys(ref.refs)[0]].value}var event = document.createEvent('HTMLEvents');function getDefaultValue(label) {    return (+window.localStorage.getItem(label)) || 0;}function getRound(v) {    return Math.round(v*100) / 100;}// 如果算不出来，返回0function getValidate(val) {    if(isNaN(val) || val === Infinity) {        return 0;    }    return (+val).toFixed(2);}// 泵排量计算公式class Pump extends React.Component {    constructor(props) {        super(props);        this.state = {            value: 0,            diameter: 0,            chongcheng: 0,            taoshu: 0,            chongshu: 0,            xiaolv: 0,            isShrink: true        }        this.formula = ['泵排量 = π*（缸套直径/2）^2*活塞冲程*缸套数*冲数*上水效率(%)']    }    componentWillMount() {        this.setState({            value: getValidate(window.localStorage.getItem('泵排量')),            diameter: window.localStorage.getItem('管套直径'),            chongcheng:  window.localStorage.getItem('活塞冲程'),            taoshu: window.localStorage.getItem('缸套数'),            chongshu: window.localStorage.getItem('冲数'),            xiaolv: window.localStorage.getItem('上水效率')        })    }    calculate() {        let value = Math.PI * Math.pow((get(this.refs.a) / 2), 2) * get(this.refs.b) * get(this.refs.c) * get(this.refs.d)  * get(this.refs.e);        this.props.setValue(getValidate(value), this.props.code);        event.initEvent("triggerPump", true, true);        event.pumpValue = getValidate(value);        document.dispatchEvent(event);        window.localStorage.setItem('管套直径', getValidate(get(this.refs.a)));        window.localStorage.setItem('活塞冲程', getValidate(get(this.refs.b)));        window.localStorage.setItem('缸套数', getValidate(get(this.refs.c)));        window.localStorage.setItem('冲数', getValidate(get(this.refs.d)));        window.localStorage.setItem('上水效率', 0.9);        window.localStorage.setItem('泵排量', getValidate(value));        this.setState({           value: getValidate(value)       });    }    renderFormula() {        let list = [];        this.formula.forEach((item, key) => {            list.push(<p key={key}> {item} </p>)        });        return list;    }    toggleFormula() {        this.setState({            isShrink: !this.state.isShrink        })    }    render() {        return <div className="math-params">            <div className="IO">输入</div>            <Input name={'管套直径'} code={'a'} ref={'a'} defaultValue={this.state.diameter}/>            <Input name={'活塞冲程'} code={'b'} ref={'b'}  defaultValue={this.state.chongcheng}/>            <Input name={'缸套数'} code={'c'} ref={'c'}  defaultValue={this.state.taoshu}/>            <Input name={'冲数'} code={'d'} ref={'d'}  defaultValue={this.state.chongshu}/>            <Input name={'上水效率（%）'} code={'e'} ref={'e'}  defaultValue={0.9} type={'percent'}/>            <div>                <span className='result'> 结果</span>                <div className="result-panel">                    泵排量：{this.state.value}                </div>                <div className={`config-formula ${this.state.isShrink === true ? 'shrink' : 'isOpen'}`}>                    <div className={"expand-formula"} onClick={this.toggleFormula.bind(this)}>                        <div className={"expand-formula-text"}>计算公式</div>                        <div className={"triangle"}>                            {this.state.isShrink === true ?                                <img src='./image/icon/up.png' /> :                                <img src='./image/icon/down.png' />                            }                        </div>                    </div>                    {this.renderFormula()}                </div>                <div className='cal-btn' onClick={this.calculate.bind(this)}>计算</div>            </div>        </div>    }}// 循环压耗class Cycle extends React.Component {    constructor(props) {        super(props);        this.state = {            value: 0,            C2: 3117,            C3: 0.006193,            C4: 1.078,            initPumpValue: '',            unit: 'normal',            isShrink: true,            P_value: getDefaultValue('钻杆接箍长度'),            Q_value: getDefaultValue('加重钻杆接箍长度'),            output: [                {label: '地面管汇压耗', value: 0 },                {label: '钻杆内循环压耗', value: 0 },                {label: '加重钻杆内循环压耗', value: 0 },                {label: '钻铤内循环压耗', value: 0 },                {label: '钻杆环空压耗', value: 0 },                {label: '加重钻杆环空压耗', value: 0 },                {label: '钻铤环空压耗', value: 0 },                {label: '钻杆接箍环空压耗', value: 0 },                {label: '加重钻杆接箍环空压耗', value: 0 },                {label: '总循环压耗', value: 0 }            ]        }        this.formula = [            '钻具环空压耗 = 7628*塑性粘度^0.2*钻井液密度^0.8*泵排量^1.8*钻具长度/(井眼直径-钻具外径)^3/(井眼直径+钻具外径)^1.8',            '钻具内循环压耗 = 7628*塑性粘度^0.2*钻井液密度^0.8*泵排量^1.8*钻具长度/钻具内径^4.82',            '公式中钻具指的就是钻杆、加重钻杆、钻铤、钻杆接箍、加重钻杆接箍'        ]    }    // 环空压耗统一计算公式, param1: 钻具长度, param2: 钻具外径    getPressure(param1, param2) {        return 7628 * Math.pow(get(this.refs.c), 0.2) * Math.pow(get(this.refs.b), 0.8) * Math.pow(get(this.refs.a), 1.8) * param1 / Math.pow((get(this.refs.d) - param2), 3) / Math.pow((get(this.refs.d) + param2), 1.8)    }    // 内循环压耗统一计算公式, param1: 钻具长度, param2: 钻具内径    getRecycle(param1, param2) {        return 7628 * Math.pow(get(this.refs.c), 0.2) * Math.pow(get(this.refs.b), 0.8) * Math.pow(get(this.refs.a), 1.8) * param1 / Math.pow(param2, 4.82);    }    calcluate1() {        // Psur 地面管汇压耗 = 地面管汇摩阻系数*钻井液密度*（泵排量/100）^1.86*9.818        let Psur = get(this.refs.e) * get(this.refs.b) * Math.pow((get(this.refs.a) / 100), 1.86) * 9.818;        // v1: 钻杆内循环压耗        let v1 = this.getRecycle(get(this.refs.m), get(this.refs.f));        // v2: 加重钻杆内循环压耗        let v2 = this.getRecycle(get(this.refs.n), get(this.refs.g));        // v3: 钻铤内循环压耗        let v3 = this.getRecycle(get(this.refs.o), get(this.refs.h));        // v4: 钻杆环空压耗        let v4 = this.getPressure(get(this.refs.m),  get(this.refs.i));        // v5: 加重钻杆环空压耗        let v5 = this.getPressure(get(this.refs.n),  get(this.refs.j));        // v6: 钻铤环空压耗        let v6 = this.getPressure(get(this.refs.o),  get(this.refs.k));        // v7: 钻杆接箍环空压耗, lenP: 钻杆接箍长度，计算公式为 钻杆长度/9.5 * 0.5        let lenP = +this.state.P_value;        let v7 = this.getPressure(lenP,  get(this.refs.l));        // v8: 加重钻杆接箍环空压耗, lenQ: 加重钻杆接箍，计算公式为 加重钻杆长度/9.5 * 0.5        let lenQ = +this.state.Q_value;        let v8 = this.getPressure(lenQ,  get(this.refs.r));       // let value = Psur + v1 + v2 + v3 + v4 + v5 + v6 + v7 + v8;        let value = getRound(Psur) + getRound(v1) + getRound(v2) + getRound(v3) + getRound(v4) + getRound(v5) + getRound(v6) + getRound(v7) + getRound(v8);        this.props.setValue(getValidate(value), this.props.code);        event.initEvent("triggerCycle", true, true);        event.loopValue = getValidate(value);        document.dispatchEvent(event);        const outputs = Object.assign(this.state.output, []);        outputs[0].value = getValidate(Psur);        outputs[1].value = getValidate(v1); // 钻杆内循环压耗        outputs[2].value = getValidate(v2); // 加重钻杆内循环压耗        outputs[3].value = getValidate(v3); // 钻铤内循环压耗        outputs[4].value = getValidate(v4); // 钻杆环空压耗        outputs[5].value = getValidate(v5); // 加重钻杆环空压耗        outputs[6].value = getValidate(v6); // 钻铤环空压耗        outputs[7].value = getValidate(v7); // 钻杆接箍环空压耗        outputs[8].value = getValidate(v8); // 加重钻杆接箍环空压耗        outputs[9].value = getValidate(value);        outputs.forEach(item => {            window.localStorage.setItem(item.label, item.value);        });        this.setState({            output: outputs        })    }    renderResult() {        let list = [];        this.state.output.forEach(item => {            list.push(<div key={item.label}  className="output-option">                <label className='input-label'> {item.label}： </label>                <div className='input-div'>                    <span> {item.value} </span>                </div>            </div>)        });        return list;    }    componentWillMount() {        this.setState({            output: [                {label: '地面管汇压耗', value: window.localStorage.getItem('地面管汇压耗') },                {label: '钻杆内循环压耗', value: window.localStorage.getItem('钻杆内循环压耗') },                {label: '加重钻杆内循环压耗', value: window.localStorage.getItem('加重钻杆内循环压耗') },                {label: '钻铤内循环压耗', value: window.localStorage.getItem('钻铤内循环压耗') },                {label: '钻杆环空压耗', value: window.localStorage.getItem('钻杆环空压耗') },                {label: '加重钻杆环空压耗', value: window.localStorage.getItem('加重钻杆环空压耗') },                {label: '钻铤环空压耗', value: window.localStorage.getItem('钻铤环空压耗') },                {label: '钻杆接箍环空压耗', value: window.localStorage.getItem('钻杆接箍环空压耗') },                {label: '加重钻杆接箍环空压耗', value: window.localStorage.getItem('加重钻杆接箍环空压耗') },                {label: '总循环压耗', value:window.localStorage.getItem('总循环压耗') }            ]        })    }    renderFormula() {        let list = [];        this.formula.forEach((item, key) => {            list.push(<p key={key}> {item} </p>)        });        return list;    }    toggleFormula() {        this.setState({            isShrink: !this.state.isShrink        })    }    onChange(code, value) {        console.log(code)        if(code === 'm') {            this.setState({                P_value: getValidate(value / 9.5 * 0.5)            })        } else if(code === 'n') {            this.setState({                Q_value: getValidate(value / 9.5 * 0.5)            })        } else if(code === 'p') {            this.setState({                P_value: value            })        } else if(code === 'q') {            this.setState({                Q_value: value            })        }    }    render() {        console.log(this.state.P_value)        return <div className="math-params">            <div className="IO">输入</div>            <Input name="泵排量" code={'a'}  ref='a' defaultValue={this.state.initPumpValue}/>            <Input name="钻井液密度" code={'b'} ref='b' defaultValue={getDefaultValue('钻井液密度')}/>            <Input name="塑性粘度" code={'c'} ref='c' defaultValue={getDefaultValue('塑性粘度')}/>            <Input name="井眼直径" code={'d'} ref='d' defaultValue={getDefaultValue('井眼直径')}/>            <Input name="地面管汇摩阻系数" code={'e'} ref='e' defaultValue={getDefaultValue('地面管汇摩阻系数')}/>            <Input name="钻杆内径" code={'f'} ref='f' defaultValue={getDefaultValue('钻杆内径')}/>            <Input name="加重钻杆内径" code={'g'} ref='g' defaultValue={getDefaultValue('加重钻杆内径')}/>            <Input name="钻铤内径" code={'h'} ref='h' defaultValue={getDefaultValue('钻铤内径')}/>            <Input name="钻杆外径" code={'i'} ref='i' defaultValue={getDefaultValue('钻杆外径')}/>            <Input name="加重钻杆外径" code={'j'} ref='j' defaultValue={getDefaultValue('加重钻杆外径')}/>            <Input name="钻铤外径" code={'k'} ref='k' defaultValue={getDefaultValue('钻铤外径')}/>            <Input name="钻杆接箍外径" code={'l'} ref='l' defaultValue={getDefaultValue('钻杆接箍外径')}/>            <Input name="加重钻杆接箍外径" code={'r'} ref='r' defaultValue={getDefaultValue('加重钻杆接箍外径')}/>            <Input name="钻杆长度" code={'m'} ref='m' defaultValue={getDefaultValue('钻杆长度')} onChange={this.onChange.bind(this)} />            <Input name="加重钻杆长度" code={'n'} ref='n' defaultValue={getDefaultValue('加重钻杆长度')} onChange={this.onChange.bind(this)}/>            <Input name="钻铤长度" code={'o'} ref='o' defaultValue={getDefaultValue('钻铤长度')}/>            <Input name="钻杆接箍长度" code={'p'} ref='p' defaultValue={this.state.P_value} onChange={this.onChange.bind(this)} />            <Input name="加重钻杆接箍长度" code={'q'} ref='q' defaultValue={this.state.Q_value} onChange={this.onChange.bind(this)} />            <div>                <span className='result'> 结果</span>                <div className="result-panel">                    {this.renderResult()}                </div>                <div className={`config-formula ${this.state.isShrink === true ? 'shrink' : 'isOpen'}`}>                    <div className={"expand-formula"} onClick={this.toggleFormula.bind(this)}>                        <div className={"expand-formula-text"}>计算公式</div>                        <div className={"triangle"}>                            {this.state.isShrink === true ?                                <img src='./image/icon/up.png' /> :                                <img src='./image/icon/down.png' />                            }                        </div>                    </div>                    {this.renderFormula()}                </div>                <div className='cal-btn' onClick={this.calcluate1.bind(this)}>计算</div>            </div>        </div>    }    componentDidMount() {        if(this.props.isSolo === 'solo') {            const val = window.localStorage.getItem('泵排量');            this.setState({                initPumpValue: val            })        } else {            this.eventListener = document.addEventListener('triggerPump', event => {                this.setState({                    initPumpValue: event.pumpValue                })            }, false);        }    }    componentWillUnMount() {        document.removeEventListener(this.eventListener);    }}// 钻头压降class Drill extends React.Component {    constructor(props) {        super(props);        this.state = {            value: 0,            initCycleValue: '',            isShrink: true        };        this.formula = ['钻头压降 = 泵压 - 循环压耗'];    }    componentWillMount() {        this.setState({            value: getValidate(window.localStorage.getItem('钻头压降')),            initCycleValue: getValidate(window.localStorage.getItem('循环压耗'))        })    }    calculate() {        // 钻头压降 = 泵压 - 循环压耗        let value = get(this.refs.a) - get(this.refs.b);        this.props.setValue(getValidate(value), this.props.code);        window.localStorage.setItem('钻头压降', getValidate(value));        window.localStorage.setItem('泵压', getValidate(get(this.refs.a)));        window.localStorage.setItem('循环压耗', getValidate(get(this.refs.b)));        this.setState({            value: getValidate(value)        })    }    renderFormula() {        let list = [];        this.formula.forEach((item, key) => {            list.push(<p key={key}> {item} </p>)        });        return list;    }    toggleFormula() {        this.setState({            isShrink: !this.state.isShrink        })    }    render() {        return <div className="math-params">            <div className="IO">输入</div>            <Input name="泵压" code={'a'}  ref='a' defaultValue={getDefaultValue('泵压')}/>            <Input name="循环压耗" code={'b'}  ref='b' defaultValue={this.state.initCycleValue}/>            <div>                <span className='result'> 结果</span>                <div className="result-panel">                    钻头压降：{this.state.value}                </div>                <div className={`config-formula ${this.state.isShrink === true ? 'shrink' : 'isOpen'}`}>                    <div className={"expand-formula"} onClick={this.toggleFormula.bind(this)}>                        <div className={"expand-formula-text"}>计算公式</div>                        <div className={"triangle"}>                            {this.state.isShrink === true ?                                <img src='./image/icon/up.png' /> :                                <img src='./image/icon/down.png' />                            }                        </div>                    </div>                    {this.renderFormula()}                </div>                <div className='cal-btn' onClick={this.calculate.bind(this)}>计算</div>            </div>        </div>    }    componentDidMount() {        this.eventListener = document.addEventListener('triggerCycle', event => {            this.setState({                initCycleValue: event.loopValue            })        }, false);    }    componentWillUnMount() {        document.removeEventListener(this.eventListener);    }}// 流变参数class Params extends React.Component {    constructor(props) {        super(props);        this.state = {            output: [                {label: '流性指数', value: 0 },                {label: '稠度系数', value: 0 },                {label: '表观粘度', value: 0 },                {label: '塑性粘度', value: 0 },                {label: '动切力', value: 0 },                {label: '动塑比', value: 0 },            ],            isShrink: true,        };        this.formula = [            '流性指数 = 3.322 * Math.log10(Ф600 / Ф300)',            '稠度系数 = (0.511 * Ф300) / Math.pow(511, 3.322 * Math.log10(Ф600 / Ф300))',            '表观粘度 = Ф600 / 2',            '塑性粘度 = Ф600 -Ф300',            '动切力 = 0.479 * (2*Ф300-Ф600)',            '动塑比 = 动切力/塑性粘度'        ];    }    componentWillMount() {        this.setState({            value: getValidate(window.localStorage.getItem('液流变参数'))        })    }    calculate() {        // v0: 流性指数 = 3.322 * Math.log10(Ф600 / Ф300)        let v0 = 3.322 * Math.log10(get(this.refs.a) / get(this.refs.b));        // v1: 稠度系数        let v1 = (0.511 * get(this.refs.b)) / Math.pow(511, v0);        // v2: 表观粘度        let v2 = get(this.refs.a) / 2;        // v3: 塑性粘度        let v3 = get(this.refs.a) - get(this.refs.b);        // v4: 动切力        let v4 = 0.479 * (2 * get(this.refs.b) - get(this.refs.a));        // v5: 动塑比        let v5 = v4 / v3;        window.localStorage.setItem('Ф600', getValidate(get(this.refs.a)));        window.localStorage.setItem('Ф300', getValidate(get(this.refs.b)));        const outputs = Object.assign(this.state.output, []);        outputs[0].value = getValidate(v0);        outputs[1].value = getValidate(v1);        outputs[2].value = getValidate(v2);        outputs[3].value = getValidate(v3);        outputs[4].value = getValidate(v4);        outputs[5].value = getValidate(v5);        outputs.forEach(item => {            window.localStorage.setItem(item.label, item.value);        });        this.setState({            output: outputs        });        this.props.setValue(v3, this.props.code);    }    renderFormula() {        let list = [];        this.formula.forEach((item, key) => {            list.push(<p key={key}> {item} </p>)        });        return list;    }    toggleFormula() {        this.setState({            isShrink: !this.state.isShrink        })    }    renderResult() {        let list = [];        this.state.output.forEach((item, key) => {            list.push(<div className="result-panel" key={key}>                {item.label}：{item.value}            </div>)        });        return list;    }    render() {        return <div className="math-params">            <div className="IO">输入</div>            <Input name="Ф600" code={'a'}  ref='a' defaultValue={getDefaultValue('Ф600')}/>            <Input name="Ф300" code={'b'}  ref='b' defaultValue={getDefaultValue('Ф300')}/>            <div>                <span className='result'> 结果</span>                {this.renderResult()}                <div className={`config-formula ${this.state.isShrink === true ? 'shrink' : 'isOpen'}`}>                    <div className={"expand-formula"} onClick={this.toggleFormula.bind(this)}>                        <div className={"expand-formula-text"}>计算公式</div>                        <div className={"triangle"}>                            {this.state.isShrink === true ?                                <img src='./image/icon/up.png' /> :                                <img src='./image/icon/down.png' />                            }                        </div>                    </div>                    {this.renderFormula()}                </div>                <div className='cal-btn' onClick={this.calculate.bind(this)}>计算</div>            </div>        </div>    }}// 环空返速class Loop extends React.Component {    constructor(props) {        super(props);        this.state = {            value: 0,            initPumpValue: '',            isShrink: true        };        this.formula = ['环空返速 = 1.2732 * Math.pow(10, 3) *泵排量 / (Math.pow(井眼直径, 2) - Math.pow(钻具外径, 2))'];    }    componentWillMount() {        this.setState({            value: window.localStorage.getItem('环空返速')        })    }    calculate() {        // value 环空返速 = 1.2732 * Math.pow(10, 3) *泵排量 / (Math.pow(井眼直径, 2) - Math.pow(钻具外径, 2))        let value = 1.2732 * Math.pow(10, 3) * get(this.refs.a) / (Math.pow(get(this.refs.b), 2) - Math.pow(get(this.refs.c), 2));        this.props.setValue(getValidate(value), this.props.code);        event.initEvent("triggerLoop", true, true);        event.loopValue = value;        window.localStorage.setItem('环空返速', getValidate(value));        window.localStorage.setItem('井眼直径', getValidate(get(this.refs.b)));        window.localStorage.setItem('钻具外径', getValidate(get(this.refs.c)));        document.dispatchEvent(event);        this.setState({            value: getValidate(value)        })    }    renderFormula() {        let list = [];        this.formula.forEach((item, key) => {            list.push(<p key={key}> {item} </p>)        });        return list;    }    toggleFormula() {        this.setState({            isShrink: !this.state.isShrink        })    }    render() {        return <div className="math-params">            <div className="IO">输入</div>            <Input name="泵排量" code={'a'}  ref='a' defaultValue={this.state.initPumpValue}/>            <Input name="井眼直径" code={'b'}  ref='b' defaultValue={getDefaultValue('井眼直径')}/>            <Input name="钻具外径" code={'c'}  ref='c' defaultValue={getDefaultValue('钻具外径')}/>            <div>                <span className='result'> 结果</span>                <div className="result-panel">                    环空返速：{this.state.value}                </div>                <div className={`config-formula ${this.state.isShrink === true ? 'shrink' : 'isOpen'}`}>                    <div className={"expand-formula"} onClick={this.toggleFormula.bind(this)}>                        <div className={"expand-formula-text"}>计算公式</div>                        <div className={"triangle"}>                            {this.state.isShrink === true ?                                <img src='./image/icon/up.png' /> :                                <img src='./image/icon/down.png' />                            }                        </div>                    </div>                    {this.renderFormula()}                </div>                <div className='cal-btn' onClick={this.calculate.bind(this)}>计算</div>            </div>        </div>    }    componentDidMount() {        if(this.props.isSolo === 'solo') {            const val = window.localStorage.getItem('泵排量');            this.setState({                initPumpValue: val            })        } else {            this.eventListener = document.addEventListener('triggerPump', event => {                this.setState({                    initPumpValue: event.pumpValue                })            }, false);        }    }    componentWillUnMount() {        document.removeEventListener(this.eventListener);    }}// 流态class Flow extends React.Component {    constructor(props) {        super(props);        this.state = {            a: 0,            b: 0,            c: 0,            unit: 'normal',            C23: 1.0779,            initLoopValue: window.localStorage.getItem('环空返速'),            isShrink: true,            output: [                {label: '钻杆内雷诺数', value: 0 },                {label: '环空雷诺数', value: 0 },                {label: '环空流态', value: 0 },            ],        };       this.formula = [           '有效视粘度 = 塑性粘度 + 0.112 * ((井眼直径 - 钻杆外径) * 动切力 / 环空返速)',           '钻杆内雷诺数 = 928 * 钻具内液流平均流速 * 钻具内径 * 钻井液密度 * 1.0779 / 有效视粘度 * Math.pow(((3 * 流性指数+1) / (4 * 流性指数)), 钻具内流性指数)',           '环空雷诺数 = 928 * 环空液流的流速 * (井眼直径 - 钻杆外径) * 钻井液密度 * 1.0779 / 有效视粘度 * Math.pow(((2 * 环空流性指数 + 1) / (3 * 环空流性指数)), 环空流性指数)',           '流态用环空雷诺数和2100比较，小于2100层流，大于2100紊流'       ]    }    componentWillMount() {        this.setState({            value: window.localStorage.getItem('流态')        });    }    calculate() {        let viscosity = getDefaultValue('塑性粘度');        // 有效视粘度 = 塑性粘度 + 0.112 * ((井眼直径 - 钻杆外径) * 动切力 / 环空返速)        //let Ucp = viscosity + 0.112 *(get(this.refs.g) - get(this.refs.h)) * getDefaultValue('动切力') / get(this.refs.f);        let Ucp = get(this.refs.d);        // v2: 钻杆内雷诺数 = 928 * 钻具内液流平均流速 * 钻具内径 * 钻井液密度 * C23 / 有效视粘度 * Math.pow(((3 * 流性指数+1) / (4 * 流性指数)), 钻具内流性指数)        let tmp2 = Math.pow((3 / 4 + 1 / (4 * get(this.refs.e))), get(this.refs.e));        let v2 = 928 * get(this.refs.a) * get(this.refs.b) * get(this.refs.c) * this.state.C23 / Ucp * tmp2;        // 环空雷诺数 = 928 * 环空液流的流速 * (井眼直径 - 钻杆外径) * 钻井液密度 * C23 / 有效视粘度 * Math.pow(((2 * 环空流性指数 + 1) / (3 * 环空流性指数)), 环空流性指数)        let tmp3 = Math.pow((2 / 3 + 1 / (3 * get(this.refs.e))), get(this.refs.e));        let Rep = 928 * get(this.refs.a) * (get(this.refs.g) - get(this.refs.h)) * get(this.refs.c) * this.state.C23 / Ucp * tmp3;        // value: 流态        let value = '';        if(Rep < 2100) {            value = '层流';        } else {            value = '紊流'        }        this.props.setValue(value, this.props.code);        window.localStorage.setItem('流态', value);        window.localStorage.setItem('钻杆内雷诺数', v2);        window.localStorage.setItem('环空雷诺数', Rep);        window.localStorage.setItem('钻杆内钻井液平均流速', get(this.refs.a));        window.localStorage.setItem('钻杆内径', get(this.refs.b));        window.localStorage.setItem('钻井液密度', get(this.refs.c));        window.localStorage.setItem('有效视粘度', get(this.refs.d));        window.localStorage.setItem('流性指数', get(this.refs.e));        window.localStorage.setItem('环空返速', get(this.refs.f));        window.localStorage.setItem('井眼直径', get(this.refs.g));        window.localStorage.setItem('钻杆外径', get(this.refs.h));        const outputs = Object.assign(this.state.output, []);        outputs[0].value = getValidate(v2);        outputs[1].value = getValidate(Rep);        outputs[2].value = value;        outputs.forEach(item => {            window.localStorage.setItem(item.label, item.value);        });        this.setState({            output: outputs        });    }    renderFormula() {        let list = [];        this.formula.forEach((item, key) => {            list.push(<p key={key}> {item} </p>)        });        return list;    }    toggleFormula() {        this.setState({            isShrink: !this.state.isShrink        })    }    renderResult() {        let list = [];        this.state.output.forEach((item, key) => {            list.push(<div className="result-panel" key={key}>                {item.label}：{item.value}            </div>)        });        return list;    }    render() {        return <div className="math-params">            <div className="IO">输入</div>            {/*  <Input name="塑性粘度" code={'i'} ref={'i'} defaultValue={getDefaultValue('塑性粘度')}/>*/}            <Input name="钻杆内钻井液平均流速" code={'a'} ref={'a'} defaultValue={getDefaultValue('钻杆内钻井液平均流速')}/>            <Input name="钻杆内径" code={'b'} ref={'b'} defaultValue={getDefaultValue('钻杆内径')}/>            <Input name="钻井液密度" code={'c'} ref={'c'} defaultValue={getDefaultValue('钻井液密度')}/>            <Input name="有效视粘度" code={'d'} ref={'d'} defaultValue={getDefaultValue('有效视粘度')}/>            <Input name="流性指数" code={'e'} ref={'e'} defaultValue={getDefaultValue('流性指数')}/>            <Input name="环空返速" code={'f'} ref={'f'} defaultValue={this.state.initLoopValue}/>            <Input name="井眼直径" code={'g'} ref={'g'} defaultValue={getDefaultValue('井眼直径')}/>            <Input name="钻杆外径" code={'h'} ref={'h'} defaultValue={getDefaultValue('钻杆外径')}/>            <div>                <span className='result'> 结果</span>                {this.renderResult()}                <div className={`config-formula ${this.state.isShrink === true ? 'shrink' : 'isOpen'}`}>                    <div className={"expand-formula"} onClick={this.toggleFormula.bind(this)}>                        <div className={"expand-formula-text"}>计算公式</div>                        <div className={"triangle"}>                            {this.state.isShrink === true ?                                <img src='./image/icon/up.png' /> :                                <img src='./image/icon/down.png' />                            }                        </div>                    </div>                    {this.renderFormula()}                </div>                <div className='cal-btn' onClick={this.calculate.bind(this)}>计算</div>            </div>        </div>    }    componentDidMount() {        this.eventListener = document.addEventListener('triggerLoop', event => {            this.setState({                initLoopValue: event.loopValue            })        }, false);    }    componentWillUnMount() {        document.removeEventListener(this.eventListener);    }}class Total extends React.Component {    constructor(props) {        super(props);        this.state = {            input: [                {label: '缸套直径', value: ''},                {label: '活塞冲程', value: ''},                {label: '缸套数', value: ''},                {label: '冲数', value: ''},                {label: '上水效率', value: ''},                {label: '泵排量', value: ''},                {label: '钻井液密度', value: ''},                {label: '塑性粘度', value: ''},                {label: '井眼直径', value: ''},                {label: '地面管汇摩阻系数', value: ''},                {label: '钻杆加重钻杆钻铤内径', value: ''},                {label: '钻杆加重钻杆钻铤外径', value: ''},                {label: '钻杆接箍外径', value: ''},                {label: '钻杆加重钻杆钻铤长度', value: ''},                {label: '泵压', value: ''},                {label: '动切力', value: ''},                {label: 'Ф600', value: ''},                {label: 'Ф300', value: ''},                {label: '钻杆内钻井液平均流速', value: ''},                {label: '有效视粘度', value: ''},                {label: '流性指数', value: ''},                {label: '环空返速', value: ''},            ],            output: [                {label: '泵排量', value: 0 },                {label: '循环压耗', value: 0 },                {label: '钻头压降', value: 0 },                {label: '液流变参数', value: 0 },                {label: '环空返速', value: 0 },                {label: '流态', value: 0 },            ]        };        this.formula = [            '泵排量 = π*（缸套直径/2）^2*活塞冲程*缸套数*冲数*上水效率',            '循环压耗 = 地面管汇压耗' + '钻杆内循环压耗' + '加重钻杆内循环压耗' + '钻铤内循环压耗' + '钻杆环空压耗' + '加重钻杆环空压耗' + '钻铤环空压耗' + '钻杆接箍环空压耗' + '加重钻杆接箍环空压耗',            '钻头压降 = 泵压 - 循环压耗',            '液流变参数 = Ф600 - Ф300',            '环空返速 = 1.2732 * Math.pow(10, 3) *泵排量 / (Math.pow(井眼直径, 2) - Math.pow(钻具外径, 2))',            '有效视粘度 = 塑性粘度 + 0.112 * ((井眼直径 - 钻杆外径) * 动切力 / 环空返速)',            '环空雷诺数 = 928 * 环空液流的流速 * (井眼直径 - 钻杆外径) * 钻井液密度 * 1.0779 / 有效视粘度 * Math.pow(((2 * 环空流性指数 + 1) / (3 * 环空流性指数)), 环空流性指数)',            '流态 = 环空雷诺数 < 2100 ? 层流 : 紊流'        ];    }    componentWillMount() {        let inputs = Object.assign(this.state.input, []);        let outputs = Object.assign(this.state.output, []);        inputs.forEach(item => {            item.value = window.localStorage.getItem(item.label);        })        outputs.forEach(item => {            item.value = window.localStorage.getItem(item.label);        });        this.setState({            input: inputs,            output: outputs        });    }    getValue(label) {       try {           let unit = this.totalParams.filter(item => {               return item.label === label;           });           return +unit[0].value       } catch(e) {           console.log(label)       }    }    setValue(inputParams) {        this.totalParams = inputParams;        const outputs = Object.assign(this.state.output, []);        // v1: 环空返速        let v1 = 1.2732 * Math.pow(10, 3) * this.getValue('泵排量') / (Math.pow(this.getValue('井眼直径'), 2) - Math.pow(this.getValue('钻杆加重钻杆钻铤外径'), 2));        outputs[0].value = Math.PI * Math.pow((this.getValue('缸套直径')/2), 2) * this.getValue('活塞冲程') * this.getValue('缸套数') * this.getValue('冲数') * this.getValue('上水效率');        outputs[1].value =  this.getRecycle();        outputs[2].value = this.getValue('泵压') - this.getRecycle();        outputs[3].value = this.getValue('Ф600') - this.getValue('Ф300');        outputs[4].value = v1;        // v2: 有效视粘度        let v2 = this.getValue('塑性粘度') + 0.112 * ((this.getValue('井眼直径') - this.getValue('钻杆加重钻杆钻铤外径')) * this.getValue('动切力') /v1);        // v3: 环空的雷诺数        let v3 = 928 * this.getValue('钻杆内钻井液平均流速') * (this.getValue('井眼直径') - this.getValue('钻杆加重钻杆钻铤外径')) * this.getValue('钻井液密度') * 1.0779 / v2 * Math.pow(((2 * this.getValue('流性指数') + 1) / (3 * this.getValue('流性指数'))), this.getValue('流性指数'))        outputs[5].value = v3 < 2100 ? '层流' : '紊流';        outputs.forEach(item => {            window.localStorage.setItem(item.label, item.value);        });        this.setState({            output: outputs        });        this.props.setBack(outputs);    }    // 循环压耗    getRecycle() {        // 地面管汇压耗' + '钻杆内循环压耗' + '加重钻杆内循环压耗' + '钻铤内循环压耗' + '钻杆环空压耗' + '加重钻杆环空压耗' + '钻铤环空压耗' + '钻杆接箍环空压耗' + '加重钻杆接箍环空压耗        // v1: 循环压耗        let v1 = 7628 *  Math.pow(this.getValue('塑性粘度'),0.2) * Math.pow(this.getValue('钻井液密度'),0.8) * Math.pow(this.getValue('泵排量'),1.8) * this.getValue('钻杆加重钻杆钻铤长度')/Math.pow(this.getValue('钻杆加重钻杆钻铤内径'),4.82);        // 地面管汇压耗        let a1 = this.getValue('地面管汇摩阻系数') * this.getValue('钻井液密度') * Math.pow((this.getValue('泵排量') / 100), 1.86)*9.818;        // 钻杆内循环压耗        let a2 =  v1;        // 加重钻杆内循环压耗        let a3 =  v1;        // 钻铤内循环压耗        let a4 =  v1;        let b1 = 7628 * Math.pow(this.getValue('塑性粘度'),0.2) * Math.pow(this.getValue('钻井液密度'),0.8) * Math.pow(this.getValue('泵排量'),1.8) * this.getValue('钻杆加重钻杆钻铤长度') / Math.pow((this.getValue('井眼直径')-this.getValue('钻杆加重钻杆钻铤外径')), 3) / Math.pow((this.getValue('井眼直径')+this.getValue('钻杆加重钻杆钻铤外径')), 1.8);        // 钻杆环空压耗        let a5 = b1;        // 加重钻杆环空压耗        let a6 = b1;        // 钻铤环空压耗        let a7 = b1;        // 钻杆接箍环空压耗        let a8 = b1;        // 加重钻杆接箍环空压耗        let a9 = b1;        return a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9;    }    render() {        return <FinalCalculate inputParams={this.state.input} outputParams={this.state.output} setValue={this.setValue.bind(this)} title={'综合分析'} formula={this.formula}/>    }}module.exports = {    Pump,    Cycle,    Drill,    Params,    Loop,    Flow,    Total};