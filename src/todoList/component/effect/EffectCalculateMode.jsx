import React from 'react';
import Input from '../common/Input.jsx';
import FinalCalculate from '../common/FinalCalculate.jsx';
function get(ref) {
    return +ref.refs[Object.keys(ref.refs)[0]].value
}
var event = document.createEvent('HTMLEvents');

// 水力功率
class Power extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }
    calculate() {
        // 泵压*泵排量
        let value = get(this.refs.a) * get(this.refs.b);
        this.props.setValue(value, this.props.code);
        this.setState({
            value: value
        });
    }
    render() {
        return <div className="math-params">
            <Input name={'泵压'} code={'a'} ref={'a'}/>
            <Input name={'泵排量'} code={'b'} ref={'b'} />
            <div>
                <span className='result'> 结果： {this.state.value} </span>
                <div className='cal-btn' onClick={this.calculate.bind(this)}>计算</div>
            </div>

        </div>
    }
}

// 喷嘴水功率
class Nozzle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }
    calculate() {
        // 喷嘴压降*泵排量
        let value = get(this.refs.a) * get(this.refs.b);
        this.props.setValue(value, this.props.code);

        event.initEvent("triggerNozzle", true, true);
        event.nozzleValue = value;
        document.dispatchEvent(event);

        this.setState({
            value: value
        });
    }
    render() {
        return <div className="math-params">
            <Input name={'喷嘴压降'} code={'a'} ref={'a'}/>
            <Input name={'泵排量'} code={'b'} ref={'b'} />
            <div>
                <span className='result'> 结果： {this.state.value} </span>
                <div className='cal-btn' onClick={this.calculate.bind(this)}>计算</div>
            </div>
        </div>
    }
}

// 比水功率
class WaterPower extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            initNozzleValue: ''
        }
    }
    calculate() {
        // 喷嘴水功率*1000/(π*钻头直径*钻头直径/4)
        let value = get(this.refs.a) * 1000/ (Math.PI * get(this.refs.b) * get(this.refs.c)/4)
        this.props.setValue(value, this.props.code);
        this.setState({
            value: value,
        });
    }
    render() {
        return <div className="math-params">
            <Input name={'喷嘴水功率'} code={'a'} ref={'a'} defaultValue={this.state.initNozzleValue}/>
            <Input name={'钻头直径'} code={'b'} ref={'b'} />
            <div>
                <span className='result'> 结果： {this.state.value} </span>
                <div className='cal-btn' onClick={this.calculate.bind(this)}>计算</div>
            </div>

        </div>
    }

    componentDidMount() {
        this.eventListener = document.addEventListener('triggerNozzle', event => {
            this.setState({
                initNozzleValue: event.nozzleValue
            })
        }, false);
    }
    componentWillUnMount() {
        document.removeEventListener(this.eventListener);
    }
}
// 钻头压降
class Pressure extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }
    calculate() {
        //  泵压 - 循环压耗
        let value = get(this.refs.a) - get(this.refs.b);
        this.props.setValue(value, this.props.code);
        this.setState({
            value: value
        });
    }
    render() {
        return <div className="math-params">
            <Input name={'泵压'} code={'a'} ref={'a'} />
            <Input name={'循环压耗'} code={'b'} ref={'b'} />
            <div>
                <span className='result'> 结果： {this.state.value} </span>
                <div className='cal-btn' onClick={this.calculate.bind(this)}>计算</div>
            </div>
        </div>
    }
}

// 泵排量
class Pump extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }
    calculate() {
        let value = Math.PI * Math.pow(( get(this.refs.a) / 2), 2) * get(this.refs.b) * get(this.refs.c) * get(this.refs.d)  * get(this.refs.e) * 100;
        this.props.setValue(value, this.props.code);
        this.setState({
            value: value
        });
    }
    render() {
        return <div className="math-params">
            <Input name={'管套直径'} code={'a'} ref={'a'} />
            <Input name={'活塞冲程'} code={'b'} ref='b'/>
            <Input name={'缸套数'} code={'c'} ref='c'/>
            <Input name={'冲数'} code={'d'} ref='d'/>
            <Input name={'上水效率'} code={'e'} ref='e'/>
            <div>
                <span className='result'> 结果： {this.state.value} </span>
                <div className='cal-btn' onClick={this.calculate.bind(this)}>计算</div>
            </div>
        </div>
    }
}

// 喷嘴压降
class Drop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }
    calculate() {
        //  810*钻井液密度*泵排量*泵排量/(0.98*0.98*(喷嘴1*喷嘴1+喷嘴2*喷嘴2+喷嘴3*喷嘴3+喷嘴4*喷嘴4+喷嘴5*喷嘴5+喷嘴6*喷嘴6+喷嘴7*喷嘴7+喷嘴8*喷嘴8)*(喷嘴1*喷嘴1+喷嘴2*喷嘴2+喷嘴3*喷嘴3+喷嘴4*喷嘴4+喷嘴5*喷嘴5+喷嘴6*喷嘴6+喷嘴7*喷嘴7+喷嘴8*喷嘴8)

        // 喷嘴 1至8 计算结果
        let val =  Math.pow(get(this.refs.c), 2) * Math.pow(get(this.refs.d), 2) * Math.pow(get(this.refs.e), 2) * Math.pow(get(this.refs.f), 2) * Math.pow(get(this.refs.g), 2) * Math.pow(get(this.refs.h), 2) * Math.pow(get(this.refs.i), 2) * Math.pow(get(this.refs.j), 2);
        let value = 810 * get(this.refs.a) * Math.pow(get(this.refs.b), 2) / (0.98 * 0.98 * val );
        this.props.setValue(value, this.props.code);
        this.setState({
            value: value
        });
    }
    render() {
        return <div className="math-params">

            <Input name={'钻井液密度'} code={'a'} ref={'a'}/>
            <Input name={'泵排量'} code={'b'} ref={'b'}/>
            <Input name={'喷嘴1'} code={'c'} ref={'c'}/>
            <Input name={'喷嘴2'} code={'d'} ref={'d'}/>
            <Input name={'喷嘴3'} code={'e'} ref={'e'}/>
            <Input name={'喷嘴4'} code={'f'} ref={'f'}/>
            <Input name={'喷嘴5'} code={'g'} ref={'g'}/>
            <Input name={'喷嘴6'} code={'h'} ref={'h'}/>
            <Input name={'喷嘴7'} code={'i'} ref={'i'}/>
            <Input name={'喷嘴8'} code={'j'} ref={'j'}/>
            <div>
                <span className='result'> 结果： {this.state.value} </span>
                <div className='cal-btn' onClick={this.calculate.bind(this)}>计算</div>
            </div>

        </div>
    }
}

// 射流冲击力
class Jet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }
    calculate() {

        // 喷嘴 1至8 计算结果
        let val =  Math.pow(get(this.refs.c), 2) * Math.pow(get(this.refs.d), 2) * Math.pow(get(this.refs.e), 2) * Math.pow(get(this.refs.f), 2) * Math.pow(get(this.refs.g), 2) * Math.pow(get(this.refs.h), 2) * Math.pow(get(this.refs.i), 2) * Math.pow(get(this.refs.j), 2);

        let value = 1273 * get(this.refs.a) * Math.pow(get(this.refs.b), 2) / val;

        this.props.setValue(value, this.props.code);
        this.setState({
            value: value
        });
    }
    render() {
        return <div className="math-params">

            <Input name={'钻井液密度'} code={'a'} ref={'a'}/>
            <Input name={'泵排量'} code={'b'} ref={'b'}/>
            <Input name={'喷嘴1'} code={'c'} ref={'c'}/>
            <Input name={'喷嘴2'} code={'d'} ref={'d'}/>
            <Input name={'喷嘴3'} code={'e'} ref={'e'}/>
            <Input name={'喷嘴4'} code={'f'} ref={'f'}/>
            <Input name={'喷嘴5'} code={'g'} ref={'g'}/>
            <Input name={'喷嘴6'} code={'h'} ref={'h'}/>
            <Input name={'喷嘴7'} code={'i'} ref={'i'}/>
            <Input name={'喷嘴8'} code={'j'} ref={'j'}/>
            <div>
                <span className='result'> 结果： {this.state.value} </span>
                <div className='cal-btn' onClick={this.calculate.bind(this)}>计算</div>
            </div>

        </div>
    }
}

// 喷射速度
class Speed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }
    calculate() {

        // 喷嘴 1至8 计算结果
        let val =  Math.pow(get(this.refs.c), 2) * Math.pow(get(this.refs.d), 2) * Math.pow(get(this.refs.e), 2) * Math.pow(get(this.refs.f), 2) * Math.pow(get(this.refs.g), 2) * Math.pow(get(this.refs.h), 2) * Math.pow(get(this.refs.i), 2) * Math.pow(get(this.refs.j), 2);

        let value = 1273 * get(this.refs.a) * get(this.refs.b) / val;

        this.props.setValue(value, this.props.code);
        this.setState({
            value: value
        });
    }
    render() {
        return <div className="math-params">
            <Input name={'钻井液密度'} code={'a'} ref={'a'}/>
            <Input name={'泵排量'} code={'b'} ref={'b'}/>
            <Input name={'喷嘴1'} code={'c'} ref={'c'}/>
            <Input name={'喷嘴2'} code={'d'} ref={'d'}/>
            <Input name={'喷嘴3'} code={'e'} ref={'e'}/>
            <Input name={'喷嘴4'} code={'f'} ref={'f'}/>
            <Input name={'喷嘴5'} code={'g'} ref={'g'}/>
            <Input name={'喷嘴6'} code={'h'} ref={'h'}/>
            <Input name={'喷嘴7'} code={'i'} ref={'i'}/>
            <Input name={'喷嘴8'} code={'j'} ref={'j'}/>
            <div>
                <span className='result'> 结果： {this.state.value} </span>
                <div className='cal-btn' onClick={this.calculate.bind(this)}>计算</div>
            </div>
        </div>
    }
}

// 环空返速
class Loop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }
    calculate() {
        // value 环空返速 = 1.2732 * Math.pow(10, 3) *泵排量 / (Math.pow(井眼直径, 2) - Math.pow(钻具外径, 2))
        let value = 1.2732 * Math.pow(10, 3) * get(this.refs.a) / (Math.pow(get(this.refs.b), 2) - Math.pow(get(this.refs.c), 2));
        this.props.setValue(value, this.props.code);
        this.setState({
            value: value
        })
    }
    render() {
        return <div className="math-params">
            <Input name={'泵排量'} code={'a'} ref={'a'}/>
            <Input name={'井眼直径'} code={'b'} ref={'b'}/>
            <Input name={'钻具外径'} code={'c'} ref={'c'}/>
            <div>
                <span className='result'> 结果： {this.state.value} </span>
                <div className='cal-btn' onClick={this.calculate.bind(this)}>计算</div>
            </div>
        </div>
    }
}

class Total extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: [
                {label: '泵压', value: ''},
                {label: '泵排量', value: ''},
                {label: '钻头直径', value: ''},
                {label: '钻铤外径', value: ''},
                {label: '钻杆外径', value: ''},
                {label: '钻井液密度', value: ''},
                {label: '井眼直径', value: ''},
                {label: '喷嘴1', value: ''},
                {label: '喷嘴2', value: ''},
                {label: '喷嘴3', value: ''},
                {label: '喷嘴4', value: ''},
                {label: '喷嘴5', value: ''},
                {label: '喷嘴6', value: ''},
                {label: '喷嘴7', value: ''},
                {label: '喷嘴8', value: ''},
            ],
            output: [
                {label: '水力功率', value: 0 },
                {label: '喷嘴压降', value: 0 },
                {label: '喷嘴水功率', value: 0 },
                {label: '比水功率', value: 0 },
                {label: '射流冲击力', value: 0 },
                {label: '喷射速度', value: 0 },
                {label: '钻杆环空返速', value: 0 },
                {label: '钻铤环空返速', value: 0 },
            ]
        };
        this.formula = [
            '水力功率 = 泵压*泵排量',
            '喷嘴压降 = 810*钻井液密度*泵排量*泵排量/(0.98*0.98*(喷嘴1*喷嘴1+喷嘴2*喷嘴2+喷嘴3*喷嘴3+喷嘴4*喷嘴4+喷嘴5*喷嘴5+喷嘴6*喷嘴6+喷嘴7*喷嘴7+喷嘴8*喷嘴8)*(喷嘴1*喷嘴1+喷嘴2*喷嘴2+喷嘴3*喷嘴3+喷嘴4*喷嘴4+喷嘴5*喷嘴5+喷嘴6*喷嘴6+喷嘴7*喷嘴7+喷嘴8*喷嘴8)',
            '喷嘴水功率 = 喷嘴压降*泵排量',
            '比水功率 = 喷嘴水功率*1000/(π*钻头直径*钻头直径/4)',
            '射流冲击力 = 1273*钻井液密度*泵排量*泵排量/(喷嘴1*喷嘴1+喷嘴2*喷嘴2+喷嘴3*喷嘴3+喷嘴4*喷嘴4+喷嘴5*喷嘴5+喷嘴6*喷嘴6+喷嘴7*喷嘴7+喷嘴8*喷嘴8)',
            '喷射速度 = 1273*泵排量/(喷嘴1*喷嘴1+喷嘴2*喷嘴2+喷嘴3*喷嘴3+喷嘴4*喷嘴4+喷嘴5*喷嘴5+喷嘴6*喷嘴6+喷嘴7*喷嘴7+喷嘴8*喷嘴8)',
            '钻杆环空返速 = 1.2732 * Math.pow(10, 3) *泵排量 / (Math.pow(井眼直径, 2) - Math.pow(钻杆外径, 2))',
            '钻铤环空返速 = 1.2732 * Math.pow(10, 3) *泵排量 / (Math.pow(井眼直径, 2) - Math.pow(钻铤外径, 2))'
        ];

    }

    componentWillMount() {
        let inputs = Object.assign(this.state.input, []);
        let outputs = Object.assign(this.state.output, []);
        inputs.forEach(item => {
            item.value = window.localStorage.getItem(item.label);
        })
        outputs.forEach(item => {
            item.value = window.localStorage.getItem(item.label);
        });
        this.setState({
            input: inputs,
            output: outputs
        });
    }


    getValue(label) {
        let unit = this.totalParams.filter(item => {
            return item.label === label;
        });
        return +unit[0].value
    }

    // 如果算不出来，返回1
    getValidate(val) {
        if(isNaN(val) || val === Infinity) {
            return 1;
        }
        return val;
    }

    setValue(inputParams) {
        this.totalParams = inputParams;
        const outputs = Object.assign(this.state.output, []);

        // v: 7628 * 塑性粘度^0.2*钻井液密度^0.8 * 泵排量^1.8 * 钻具长度/钻具内径^4.82
        let v = '';

        // v2: 喷嘴1*喷嘴1+喷嘴2*喷嘴2+喷嘴3*喷嘴3+喷嘴4*喷嘴4+喷嘴5*喷嘴5+喷嘴6*喷嘴6+喷嘴7*喷嘴7+喷嘴8*喷嘴8)*(喷嘴1*喷嘴1+喷嘴2*喷嘴2+喷嘴3*喷嘴3+喷嘴4*喷嘴4+喷嘴5*喷嘴5+喷嘴6*喷嘴6+喷嘴7*喷嘴7+喷嘴8*喷嘴8
        let v2 = this.getValue('喷嘴1') * this.getValue('喷嘴1') +
            this.getValue('喷嘴2') * this.getValue('喷嘴2') +
            this.getValue('喷嘴3') * this.getValue('喷嘴3') +
            this.getValue('喷嘴4') * this.getValue('喷嘴4') +
            this.getValue('喷嘴5') * this.getValue('喷嘴5') +
            this.getValue('喷嘴6') * this.getValue('喷嘴6') +
            this.getValue('喷嘴7') * this.getValue('喷嘴7') +
            this.getValue('喷嘴8') * this.getValue('喷嘴8');

        // v3: 喷嘴压降
        let v3 = 810 * this.getValue('钻井液密度') * this.getValue('泵排量') * this.getValue('泵排量') / (0.98 * 0.98 * v2);

        // v4: 喷嘴水功率
        let v4 = v3 * this.getValue('泵排量');



        outputs[0].value = this.getValidate(this.getValue('泵压') * this.getValue('泵排量'));
        outputs[1].value = this.getValidate(v3);
        outputs[2].value = this.getValidate(v4);
        outputs[3].value = this.getValidate(v4 * 1000 / (Math.PI * this.getValue('钻头直径') * this.getValue('钻头直径')/4));
        outputs[4].value = this.getValidate(1273 * this.getValue('钻井液密度') * this.getValue('泵排量') * this.getValue('泵排量')/ v2);
        outputs[5].value = this.getValidate(1273 * this.getValue('泵排量') / v2);
        outputs[6].value = this.getValidate(1.2732 * Math.pow(10, 3) * this.getValue('泵排量') / (Math.pow(this.getValue('井眼直径'), 2) - Math.pow(this.getValue('钻杆外径'), 2)));
        outputs[7].value = this.getValidate(1.2732 * Math.pow(10, 3) * this.getValue('泵排量') / (Math.pow(this.getValue('井眼直径'), 2) - Math.pow(this.getValue('钻铤外径'), 2)));



        outputs.forEach(item => {
            window.localStorage.setItem(item.label, item.value);
        });

        this.setState({
            output: outputs
        });
        this.props.setBack(outputs);
    }
    render() {
        return <FinalCalculate inputParams={this.state.input} outputParams={this.state.output} setValue={this.setValue.bind(this)} title={'钻头水功率'} formula={this.formula}/>
    }
}


module.exports = {
    Power,
    Nozzle,
    WaterPower,
    Pressure,
    Pump,
    Drop,
    Jet,
    Speed,
    Loop,
    Total

};