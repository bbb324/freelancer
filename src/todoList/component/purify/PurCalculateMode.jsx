import React from 'react';import Input from '../common/Input.jsx';import FinalCalculate from '../common/FinalCalculate.jsx';function get(ref) {    return +ref.refs[Object.keys(ref.refs)[0]].value}// 表面粘度计算公式class Viscosity extends React.Component {    constructor(props) {        super(props);        this.state = {            value: 0        }    }    calculate() {        // Ф600 / 2        let value = get(this.refs.a) / 2;        this.props.setValue(value, this.props.code, this.props.side);        this.setState({            value: value        });    }    render() {        return <div className="math-params">            <Input name={'Ф600'} code={'a'} ref={'a'} />            <div>                <span className='result'> 结果： {this.state.value} </span>                <div className='cal-btn' onClick={this.calculate.bind(this)}>计算</div>            </div>        </div>    }}// 塑性粘度计算公式class PlasticViscosity extends React.Component {    constructor(props) {        super(props);        this.state = {            value: 0        }    }    calculate() {        // Ф600 / 2        let value = get(this.refs.a) - get(this.refs.b);        this.props.setValue(value, this.props.code, this.props.side);        event.initEvent("triggerPlasticViscosity", true, true);        event.PvValue = value;        document.dispatchEvent(event);        this.setState({            value: value        });    }    render() {        return <div className="math-params">            <Input name={'Ф600'} code={'a'} ref={'a'} />            <Input name={'Ф300'} code={'b'} ref={'b'} />            <div>                <span className='result'> 结果： {this.state.value} </span>                <div className='cal-btn' onClick={this.calculate.bind(this)}>计算</div>            </div>        </div>    }}// 动切力class YieldPoint extends React.Component {    constructor(props) {        super(props);        this.state = {            value: 0        }    }    calculate() {        // 0.479 * (2*Ф300-Ф600)        let value = 0.479 * (2 * get(this.refs.b) - get(this.refs.a));        this.props.setValue(value, this.props.code, this.props.side);        event.initEvent("triggerYieldPoint", true, true);        event.yieldPointValue = value;        document.dispatchEvent(event);        this.setState({            value: value        });    }    render() {        return <div className="math-params">            <Input name={'Ф600'} code={'a'} ref={'a'} />            <Input name={'Ф300'} code={'b'} ref={'b'} />            <div>                <span className='result'> 结果： {this.state.value} </span>                <div className='cal-btn' onClick={this.calculate.bind(this)}>计算</div>            </div>        </div>    }}// 动塑比class FreezePlastic extends React.Component {    constructor(props) {        super(props);        this.state = {            value: 0,            initYieldPointValue: '',            initPvValue: ''        }    }    calculate() {        //  动切力 / 动塑比        let value = get(this.refs.a) / get(this.refs.b);        this.props.setValue(value, this.props.code, this.props.side);        this.setState({            value: value        });    }    render() {        return <div className="math-params">            <Input name={'动切力(YP)'} code={'a'} ref={'a'} defaultValue={this.state.initYieldPointValue}/>            <Input name={'塑性粘度(VP)'} code={'b'} ref={'b'}  defaultValue={this.state.initPvValue} />            <div>                <span className='result'> 结果： {this.state.value} </span>                <div className='cal-btn' onClick={this.calculate.bind(this)}>计算</div>            </div>        </div>    }    componentDidMount() {        this.eventListener1 = document.addEventListener('triggerYieldPoint', event => {            this.setState({                initYieldPointValue: event.yieldPointValue            })        }, false);        this.eventListener2 = document.addEventListener('triggerPlasticViscosity', event => {            this.setState({                initPvValue: event.PvValue            })        }, false);    }    componentWillUnMount() {        document.removeEventListener(this.eventListener1);        document.removeEventListener(this.eventListener2);    }}// 环空返速class Loop extends React.Component {    constructor(props) {        super(props);        this.state = {            value: 0        }    }    calculate() {        //  1.2732 * Math.pow(10, 3) *泵排量 / (Math.pow(井眼直径, 2) - Math.pow(钻具外径, 2))        let value =1.2732 * Math.pow(10, 3) * get(this.refs.a) / (Math.pow(get(this.refs.b), 2) - Math.pow(get(this.refs.c), 2));        this.props.setValue(value, this.props.code, this.props.side);        event.initEvent("triggerLoop", true, true);        event.loopValue = value;        document.dispatchEvent(event);        this.setState({            value: value        });    }    render() {        return <div className="math-params">            <Input name={'泵排量'} code={'a'} ref={'a'} />            <Input name={'井眼直径'} code={'b'} ref={'b'} />            <Input name={'钻具外径'} code={'c'} ref={'c'} />            <div>                <span className='result'> 结果： {this.state.value} </span>                <div className='cal-btn' onClick={this.calculate.bind(this)}>计算</div>            </div>        </div>    }}// 岩屑滑落速度class SlipSpeed extends React.Component {    constructor(props) {        super(props);        this.state = {            value: 0        }    }    calculate() {        //  0.071*岩屑直径*(岩屑密度-钻井液密度)^0.667/(钻井液密度*有效视粘度)^0.333        let value = 0.071 * get(this.refs.a) * Math.pow((get(this.refs.b) - get(this.refs.c)), 0.667) / Math.pow(( get(this.refs.c) * get(this.refs.d)), 0.333);        this.props.setValue(value, this.props.code, this.props.side);        this.setState({            value: value        });    }    render() {        return <div className="math-params">            <Input name={'岩屑直径'} code={'a'} ref={'a'} />            <Input name={'岩屑密度'} code={'b'} ref={'b'} />            <Input name={'钻井液密度'} code={'c'} ref={'c'} />            <Input name={'有效视粘度'} code={'d'} ref={'d'} />            <div>                <span className='result'> 结果： {this.state.value} </span>                <div className='cal-btn' onClick={this.calculate.bind(this)}>计算</div>            </div>        </div>    }}// 岩屑净上升速度class RisingSpeed extends React.Component {    constructor(props) {        super(props);        this.state = {            value: 0        }    }    calculate() {        //  环空返速-岩屑滑落速度        let value = get(this.refs.a) - get(this.refs.b);        this.props.setValue(value, this.props.code, this.props.side);        this.setState({            value: value,            initLoopValue: ''        });    }    render() {        return <div className="math-params">            <Input name={'环空返速'} code={'a'} ref={'a'} defaultValue={this.state.initLoopValue}/>            <Input name={'岩屑滑落速度'} code={'b'} ref={'b'} />            <div>                <span className='result'> 结果： {this.state.value} </span>                <div className='cal-btn' onClick={this.calculate.bind(this)}>计算</div>            </div>        </div>    }    componentDidMount() {        this.eventListener = document.addEventListener('triggerLoop', event => {            this.setState({                initLoopValue: event.loopValue            })        }, false);    }    componentWillUnMount() {        document.removeEventListener(this.eventListener);    }}// 流性指数class FlowIndex extends React.Component {    constructor(props) {        super(props);        this.state = {            value: 0        }    }    calculate() {        //  3.322 * Math.log10(Ф600 / Ф300)        let value = 3.322 * Math.log10(get(this.refs.a) / get(this.refs.b));        this.props.setValue(value, this.props.code, this.props.side);        this.setState({            value: value        });    }    render() {        return <div className="math-params">            <Input name={'Ф600'} code={'a'} ref={'a'} />            <Input name={'Ф300'} code={'b'} ref={'b'} />            <div>                <span className='result'> 结果： {this.state.value} </span>                <div className='cal-btn' onClick={this.calculate.bind(this)}>计算</div>            </div>        </div>    }}// 稠度系数class Coefficient extends React.Component {    constructor(props) {        super(props);        this.state = {            value: 0        }    }    calculate() {        //  (0.511 * Ф300) / Math.pow(511, 3.322 * Math.log10(Ф600 / Ф300))        let value =(0.511 * get(this.refs.b)) / Math.pow(511, 3.322 * Math.log10( get(this.refs.a) / get(this.refs.b)));        this.props.setValue(value, this.props.code, this.props.side);        this.setState({            value: value        });    }    render() {        return <div className="math-params">            <Input name={'Ф600'} code={'a'} ref={'a'} />            <Input name={'Ф300'} code={'b'} ref={'b'} />            <div>                <span className='result'> 结果： {this.state.value} </span>                <div className='cal-btn' onClick={this.calculate.bind(this)}>计算</div>            </div>        </div>    }}// 井眼净化能力class Ability extends React.Component {    constructor(props) {        super(props);        this.state = {            value: 0,            initLoopValue: ''        }    }    calculate() {        //  岩屑净上升速度/环空返速*100%        let value =get(this.refs.a) / get(this.refs.b) * 100;        this.props.setValue(value, this.props.code, this.props.side);        this.setState({            value: value        });    }    render() {        return <div className="math-params">            <Input name={'岩屑净上升速度'} code={'a'} ref={'a'} />            <Input name={'环空返速'} code={'b'} ref={'b'}  defaultValue={this.state.initLoopValue}/>            <div>                <span className='result'> 结果： {this.state.value} </span>                <div className='cal-btn' onClick={this.calculate.bind(this)}>计算</div>            </div>        </div>    }    componentDidMount() {        this.eventListener = document.addEventListener('triggerLoop', event => {            this.setState({                initLoopValue: event.loopValue            })        }, false);    }    componentWillUnMount() {        document.removeEventListener(this.eventListener);    }}class Total extends React.Component {    constructor(props) {        super(props);        this.state = {            input: [                {label: '泵排量', value: ''},                {label: '钻井液密度', value: ''},                {label: '井眼直径', value: ''},                {label: '钻具外径', value: ''},                {label: 'Ф600', value: ''},                {label: 'Ф300', value: ''},                {label: '岩屑直径', value: ''},                {label: '有效视粘度',value: ''},                {label: '岩屑密度', value: 2.5}            ],            output: [                {label: '流性指数', value: 0 },                {label: '稠度系数', value: 0 },                {label: '表现粘度', value: 0 },                {label: '塑性粘度', value: 0 },                {label: '动切力', value: 0 },                {label: '动塑比', value: 0 },                {label: '环空返速', value: 0 },                {label: '岩屑滑落速度', value: 0 },                {label: '岩屑净上升速度', value: 0 },                {label: '井眼净化能力', value: 0 }            ]        };        this.formula = [            '流性指数 = 3.322 * Math.log10(Ф600 / Ф300)',            '稠度系数 = (0.511 * Ф300) / Math.pow(511, 3.322 * Math.log10(Ф600 / Ф300))',            '表现粘度 = Ф600 / 2',            '塑性粘度 = Ф600 -Ф300',            '动切力 = 0.479 * (2*Ф300-Ф600)',            '动塑比 = 动切力/塑性粘度',            '环空返速 = 1.2732 * Math.pow(10, 3) *泵排量 / (Math.pow(井眼直径, 2) - Math.pow(钻具外径, 2))',            '有效视粘度=塑性粘度+0.112*((井眼直径-钻具外径)*动切力/环空返速)',            '岩屑滑落速度 = 0.071*岩屑直径*(岩屑密度-钻井液密度)^0.667/(钻井液密度*有效视粘度)^0.333',            '岩屑净上升速度 = 环空返速-岩屑滑落速度',            '井眼净化能力 = 岩屑净上升速度/环空返速*100%',        ];    }    // 如果算不出来，返回0    getValidate(val) {        if(isNaN(val) || val === Infinity) {            return 0;        }        return (+val).toFixed(2);    }    componentWillMount() {        let inputs = Object.assign(this.state.input, []);        let outputs = Object.assign(this.state.output, []);        inputs.forEach(item => {            if(item.label !== '岩屑密度') {                item.value = window.localStorage.getItem(item.label);            }        });        outputs.forEach(item => {            item.value = window.localStorage.getItem(item.label);        });        this.setState({            input: inputs,            output: outputs        })    }    getValue(label) {        let unit = this.totalParams.filter(item => {            return item.label === label;        });        return Number(this.getValidate(unit[0].value))    }    setValue(inputParams) {        this.totalParams = inputParams;        // v: 环空返速        let v = 1.2732 * Math.pow(10, 3) * this.getValue('泵排量') / (Math.pow(this.getValue('井眼直径'), 2) - Math.pow(this.getValue('钻具外径'), 2));        // v5: 动切力        let v5 =  0.479 * (2 * this.getValue('Ф300') - this.getValue('Ф600'));        // v4: 塑性粘度        let v4 = this.getValue('Ф600')  - this.getValue('Ф300');        // v6: 有效视粘度        let v6 =  v4 + 0.112 * (this.getValue('井眼直径') - this.getValue('钻具外径')) * v5 / v;        // v2: 岩屑滑落速度        let tmp1 = Math.pow((this.getValue('岩屑密度') - this.getValue('钻井液密度')), 0.667);        let tmp2 = Math.pow((this.getValue('钻井液密度') * this.getValue('有效视粘度')), 0.333);        let v2 = 0.071 * this.getValue('岩屑直径') * tmp1 / tmp2;        // v3: 岩屑净上升速度        let v3 = v - v2;        const outputs = Object.assign(this.state.output, []);        // 流性指数        outputs[0].value =  this.getValidate((3.322 * Math.log10(this.getValue('Ф600') / this.getValue('Ф300'))));        // 稠度系数        outputs[1].value = this.getValidate((0.511 * this.getValue('Ф300')) / Math.pow(511, (3.322 * Math.log10(this.getValue('Ф600') / this.getValue('Ф300')))));        // 表观粘度        outputs[2].value = this.getValidate(this.getValue('Ф600') / 2);        // 塑性粘度        outputs[3].value = this.getValidate(v4);        // 动切力        outputs[4].value = this.getValidate(v5);        // 动塑比        outputs[5].value = this.getValidate(v5 / v4);        // 环空返速        outputs[6].value = this.getValidate(v);        // 岩屑滑落速度        outputs[7].value = this.getValidate(v2);        // 岩屑净上升速度        outputs[8].value = this.getValidate(v3);        // 井眼净化能力        outputs[9].value = this.getValidate(v3 / v * 100);        outputs.forEach(item => {            window.localStorage.setItem(item.label, item.value);        });        this.setState({            output: outputs        });        this.props.setBack(outputs);    }    render() {        return <FinalCalculate inputParams={this.state.input} outputParams={this.state.output} setValue={this.setValue.bind(this)} title={'净化能力'} formula={this.formula}/>    }}module.exports = {    Viscosity,    PlasticViscosity,    YieldPoint,    FreezePlastic,    Loop,    SlipSpeed,    RisingSpeed,    FlowIndex,    Coefficient,    Ability,    Total};