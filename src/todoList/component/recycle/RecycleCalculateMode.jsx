import React from 'react';
import Input from '../common/Input.jsx';
import FinalCalculate from '../common/FinalCalculate.jsx';

function get(ref) {
    return +ref.refs[Object.keys(ref.refs)[0]].value
}

// 地面管汇压耗
class Pipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }
    calculate() {
        // 地面管汇摩阻系数*钻井液密度*（泵排量/100）^1.86*9.818
        let value = get(this.refs.a) * get(this.refs.b) * Math.pow((get(this.refs.c) / 100), 1.86) * 9.818;
        this.props.setValue(value, this.props.code);
        this.setState({
            value: value
        })
    }
    render() {
        return <div className="math-params">
            <Input name={'地面管汇摩阻系数'} code={'a'} ref={'a'}/>
            <Input name={'钻井液密度'} code={'b'} ref={'b'} />
            <Input name={'泵排量'} code={'c'} ref={'c'} />
            <div>
                <span className='result'> 结果： {this.state.value} </span>
                <div className='cal-btn' onClick={this.calculate.bind(this)}>计算</div>
            </div>
        </div>
    }
}

// 钻杆内循环压耗
class InnerCycle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }
    calculate() {
        // 7628*塑性粘度^0.2*钻井液密度^0.8*泵排量^1.8*钻具长度/钻具内径^4.82
        let value = 7628 * Math.pow(get(this.refs.a), 0.2) * Math.pow(get(this.refs.b), 0.8) *  Math.pow(get(this.refs.c), 1.8) * get(this.refs.d) / Math.pow(get(this.refs.e), 4.82);
        this.props.setValue(value, this.props.code);
        this.setState({
            value: value
        })
    }
    render() {
        return <div className="math-params">

            <Input name={'塑性粘度'} code={'a'} ref={'a'}/>
            <Input name={'钻井液密度'} code={'b'} ref={'b'} />
            <Input name={'泵排量'} code={'c'} ref={'c'} />
            <Input name={'钻具长度'} code={'d'} ref={'d'} />
            <Input name={'钻具内径'} code={'e'} ref={'e'} />
            <div>
                <span className='result'> 结果： {this.state.value} </span>
                <div className='cal-btn' onClick={this.calculate.bind(this)}>计算</div>
            </div>
        </div>
    }
}




// 钻头压降
class Drill extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }
    calculate() {
        // v1 地面管汇压耗 = 地面管汇摩阻系数*钻井液密度*（泵排量/100）^1.86*9.818
        let value = get(this.refs.a) - get(this.refs.b);
        this.props.setValue(value, this.props.code);
        this.setState({
            value: value
        })
    }
    render() {
        return <div className="math-params">
            <Input name={'泵压'} code={'a'} ref={'a'}/>
            <Input name={'循环压耗'} code={'b'} ref={'b'} />
            <div>
                <span className='result'> 结果： {this.state.value} </span>
                <div className='cal-btn' onClick={this.calculate.bind(this)}>计算</div>
            </div>
        </div>
    }
}

// 钻杆环空压耗
class BodyCycle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }

    calculate() {
        // 7628*塑性粘度^0.2*钻井液密度^0.8*泵排量^1.8*钻具长度/(井眼直径-钻具外径)^3/(井眼直径+钻具外径)^1.8
        let value = 7628 * Math.pow(get(this.refs.a), 0.2) * Math.pow(get(this.refs.b), 0.8) *  Math.pow(get(this.refs.c), 1.8) * get(this.refs.d) / Math.pow((get(this.refs.e) - get(this.refs.f)), 3) / Math.pow((get(this.refs.e) + get(this.refs.f)), 1.8)
        this.props.setValue(value, this.props.code);
        this.setState({
            value: value
        })
    }


    render() {
        return <div className="math-params">

            <Input name={'塑性粘度'} code={'a'} ref={'a'}/>
            <Input name={'钻井液密度'} code={'b'} ref={'b'} />
            <Input name={'泵排量'} code={'c'} ref={'c'} />
            <Input name={'钻具长度'} code={'d'} ref={'d'} />
            <Input name={'井眼直径'} code={'e'} ref={'e'} />
            <Input name={'钻具外径'} code={'f'} ref={'f'} />
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
                {label: '泵排量', value: ''},
                {label: '钻井液密度', value: ''},
                {label: '塑性粘度', value: ''},
                {label: '井眼直径', value: ''},
                {label: '地面管汇摩阻系数', value: ''},
                {label: '钻杆加重钻杆钻铤内径', value: ''},
                {label: '钻杆加重钻杆钻铤外径', value: ''},
                {label: '钻杆接箍外径', value: ''},
                {label: '钻杆加重钻杆钻铤长度', value: ''},
                {label: '泵压', value: ''}
            ],
            output: [
                {label: '地面管汇压耗', value: 0 },
                {label: '钻杆内循环压耗', value: 0 },
                {label: '加重钻杆内循环压耗', value: 0 },
                {label: '钻铤内循环压耗', value: 0 },
                {label: '钻头压降', value: 0 },
                {label: '钻杆环空压耗', value: 0 },
                {label: '加重钻杆环空压耗', value: 0 },
                {label: '钻铤环空压耗', value: 0 },
                {label: '钻杆接箍环空压耗', value: 0 },
                {label: '加重钻杆接箍环空压耗', value: 0 }
            ]
        };
        this.formula = [
            '地面管汇压耗 = 地面管汇摩阻系数*钻井液密度*（泵排量/100）^1.86*9.818',
            '钻具循环压耗 = 7628 * 塑性粘度^0.2*钻井液密度^0.8 * 泵排量^1.8 * 钻具长度/钻具内径^4.82',
            '钻具环空压耗 = 7628 * 塑性粘度^0.2*钻井液密度^0.8 * 泵排量^1.8 * 钻具长度/(井眼直径-钻具外径)^3/(井眼直径+钻具外径)^1.8',
            '钻头压降 = 泵压 - 循环压耗',
            '公式中钻具指的就是钻杆、加重钻杆、钻铤、钻杆接箍、加重钻杆接箍'
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
        return unit[0].value
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

        // v1: 循环压耗
        let v1 = 7628 *  Math.pow(this.getValue('塑性粘度'),0.2) * Math.pow(this.getValue('钻井液密度'),0.8) * Math.pow(this.getValue('泵排量'),1.8) * this.getValue('钻杆加重钻杆钻铤长度')/Math.pow(this.getValue('钻杆加重钻杆钻铤内径'),4.82);

        // 地面管汇压耗
        outputs[0].value = this.getValue('地面管汇摩阻系数') * this.getValue('钻井液密度') * Math.pow((this.getValue('泵排量') / 100), 1.86)*9.818;
        // 钻杆加重钻杆钻铤内循环压耗
        outputs[1].value =  this.getValidate(v1);
        outputs[2].value =  this.getValidate(v1);
        outputs[3].value =  this.getValidate(v1);
        outputs[4].value = this.getValidate(this.getValue('泵压') - v1);

        outputs[5].value =  this.getValidate(7628 * Math.pow(this.getValue('塑性粘度'),0.2) * Math.pow(this.getValue('钻井液密度'),0.8) * Math.pow(this.getValue('泵排量'),1.8) * this.getValue('钻杆加重钻杆钻铤长度') / Math.pow((this.getValue('井眼直径')-this.getValue('钻杆加重钻杆钻铤外径')), 3) / Math.pow((this.getValue('井眼直径')+this.getValue('钻杆加重钻杆钻铤外径')), 1.8));
        outputs[6].value =  this.getValidate(7628 * Math.pow(this.getValue('塑性粘度'),0.2) * Math.pow(this.getValue('钻井液密度'),0.8) * Math.pow(this.getValue('泵排量'),1.8) * this.getValue('钻杆加重钻杆钻铤长度') / Math.pow((this.getValue('井眼直径')-this.getValue('钻杆加重钻杆钻铤外径')), 3) / Math.pow((this.getValue('井眼直径')+this.getValue('钻杆加重钻杆钻铤外径')), 1.8));
        outputs[7].value =  this.getValidate(7628 * Math.pow(this.getValue('塑性粘度'),0.2) * Math.pow(this.getValue('钻井液密度'),0.8) * Math.pow(this.getValue('泵排量'),1.8) * this.getValue('钻杆加重钻杆钻铤长度') / Math.pow((this.getValue('井眼直径')-this.getValue('钻杆加重钻杆钻铤外径')), 3) / Math.pow((this.getValue('井眼直径')+this.getValue('钻杆加重钻杆钻铤外径')), 1.8));
        outputs[8].value =  this.getValidate(7628 * Math.pow(this.getValue('塑性粘度'),0.2) * Math.pow(this.getValue('钻井液密度'),0.8) * Math.pow(this.getValue('泵排量'),1.8) * this.getValue('钻杆加重钻杆钻铤长度') / Math.pow((this.getValue('井眼直径')-this.getValue('钻杆加重钻杆钻铤外径')), 3) / Math.pow((this.getValue('井眼直径')+this.getValue('钻杆加重钻杆钻铤外径')), 1.8));
        outputs[9].value =  this.getValidate(7628 * Math.pow(this.getValue('塑性粘度'),0.2) * Math.pow(this.getValue('钻井液密度'),0.8) * Math.pow(this.getValue('泵排量'),1.8) * this.getValue('钻杆加重钻杆钻铤长度') / Math.pow((this.getValue('井眼直径')-this.getValue('钻杆加重钻杆钻铤外径')), 3) / Math.pow((this.getValue('井眼直径')+this.getValue('钻杆加重钻杆钻铤外径')), 1.8));



        outputs.forEach(item => {
            window.localStorage.setItem(item.label, item.value);
        });


        this.setState({
            output: outputs
        });
        this.props.setBack(outputs);
    }




    render() {
        return <FinalCalculate inputParams={this.state.input} outputParams={this.state.output} setValue={this.setValue.bind(this)} title={'循环压耗'} formula={this.formula}/>
    }
}

module.exports = {
    Drill,
    Pipe,
    InnerCycle,
    BodyCycle,
    Total

};
