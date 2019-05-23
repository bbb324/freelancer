import React from 'react';
import Input from '../common/Input.jsx';
import FinalCalculate from '../common/FinalCalculate.jsx';
function get(ref) {
    return +ref.refs[Object.keys(ref.refs)[0]].value
}

// 环空返速计算公式
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
        this.props.setValue(Math.round(value));
        this.setState({
            value: Math.round(value)
        })
    }
    render() {
        return <div className="math-params">

            <Input name={'泵排量'} code={'a'} ref={'a'}/>
            <Input name={'井眼直径'} code={'b'} ref={'b'} />
            <Input name={'钻具外径'} code={'c'} ref={'c'} />
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
                {label: '井眼直径', value: ''},
                {label: '钻具外径', value: ''}
            ],
            output: [
                {label: '环空返速', value: 0 }
            ]
        };
        this.formula = [
            '1.2732 * Math.pow(10, 3) *泵排量 / (Math.pow(井眼直径, 2) - Math.pow(钻具外径, 2))',
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

    // 如果算不出来，返回0
    getValidate(val) {
        if(isNaN(val) || val === Infinity) {
            return 0;
        }
        return (+val).toFixed(2);
    }

    setValue(inputParams) {
        this.totalParams = inputParams;
        const outputs = Object.assign(this.state.output, []);
        outputs[0].value = this.getValidate(1.2732 * Math.pow(10, 3) * this.getValue('泵排量') / (Math.pow(this.getValue('井眼直径'), 2) - Math.pow(this.getValue('钻具外径'), 2)));

        outputs.forEach(item => {
            window.localStorage.setItem(item.label, item.value);
        });


        this.setState({
            output: outputs
        });
        this.props.setBack(outputs);
    }
    render() {
        return <FinalCalculate inputParams={this.state.input} outputParams={this.state.output} setValue={this.setValue.bind(this)} title={'环空返速'} formula={this.formula}/>
    }
}


module.exports = {
    Loop,
    Total
};