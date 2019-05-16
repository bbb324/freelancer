import React from 'react';
import Input from '../common/Input.jsx';
import FinalCalculate from '../common/FinalCalculate.jsx';
function get(ref) {
    return +ref.refs[Object.keys(ref.refs)[0]].value
}
var event = document.createEvent('HTMLEvents')

// 重浆密度计算公式
class Density extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            initDepthValue: 0
        }
    }
    calculate() {
        //重浆密度 = 环空压耗/（9.8*垂深高度）+钻井液密度
        let value = get(this.refs.a) / (9.8 * get(this.refs.b)) + get(this.refs.c);
        this.props.setValue(this.props.code, value.toFixed(2));

        event.initEvent("triggerDensity", true, true);
        event.densityValue = value.toFixed(2);
        document.dispatchEvent(event);

        this.setState({
            value: value.toFixed(2)
        });
    }

    onInputChange(code, value) {
        this.props.setValue(code, value)
    }
    render() {
        return <div className="math-params">

            <Input name={'环空压耗'} code={'loop'} ref={'a'} onChange={this.onInputChange.bind(this)}/>
            <Input name={'垂深高度'} code={'depth'} ref={'b'} onChange={this.onInputChange.bind(this)} defaultValue={this.state.initDepthValue}/>
            <Input name={'钻井液密度'} code={'liquid-density'} ref={'c'} onChange={this.onInputChange.bind(this)}/>
            <div>
                <span className='result'> 结果： {this.state.value} </span>
                <div className='cal-btn' onClick={this.calculate.bind(this)}>计算</div>
            </div>
        </div>
    }

    componentDidMount() {
        this.eventListener = document.addEventListener('triggerDepth', event => {
            console.log(event.depthValue)
            this.setState({
                initDepthValue: event.depthValue
            })
        }, false);
    }
}

// 垂深高度计算公式
class Depth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            initDensityValue: 0
        }
    }
    calculate() {
        //垂深高度 = 环空压耗/(9.8*(重浆密度 - 钻井液密度))
        let value = get(this.refs.a) / 9.8 * (get(this.refs.b) - get(this.refs.c));
        this.props.setValue(this.props.code, value.toFixed(2));

        event.initEvent("triggerDepth", true, true);
        event.depthValue = value.toFixed(2);
        document.dispatchEvent(event);

        this.setState({
            value: value.toFixed(2)
        });
    }

    onInputChange(code, value) {
        this.props.setValue(code, value)

    }
    render() {
        return <div className="math-params">

            <Input name={'环空压耗'} code={'loop'} ref={'a'} onChange={this.onInputChange.bind(this)}/>
            <Input name={'重浆密度'} code={'heavy-pulp-density'} ref={'b'} onChange={this.onInputChange.bind(this)} defaultValue={this.state.initDensityValue}/>
            <Input name={'钻井液密度'} code={'liquid-density'} ref={'c'} onChange={this.onInputChange.bind(this)}/>
            <div>
                <span className='result'> 结果： {this.state.value} </span>
                <div className='cal-btn' onClick={this.calculate.bind(this)}>计算</div>
            </div>
        </div>
    }

    componentDidMount() {
        this.eventListener = document.addEventListener('triggerDensity', event => {
            this.setState({
                initDensityValue: event.densityValue
            })
        }, false);
    }
}

class Total extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: [
                {label: '环空压耗', value: ''},
                {label: '钻井液密度', value: ''},
                {label: '垂深高度', value: ''},
                {label: '重浆密度', value: ''},
            ],
            output: [
                {label: '重浆密度', value: 0 },
                {label: '垂深高度', value: 0 },
                {label: '环空压耗', value: 0, ext: 'hide' },
                {label: '钻井液密度', value: 0, ext: 'hide' },
            ]
        };
        this.formula = [
            '重浆密度 = 环空压耗/（9.8*垂深高度）+钻井液密度',
            '垂深高度 = 环空压耗/(9.8*(重浆密度 - 钻井液密度))',
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

    // 如果算不出来，返回1
    getValidate(val) {
        if(isNaN(val) || val === Infinity) {
            return 1;
        }
        return (+val).toFixed(2);
    }

    getValue(label) {
        let unit = this.totalParams.filter(item => {
            return item.label === label;
        });
        return +unit[0].value
    }

    setValue(inputParams) {
        this.totalParams = inputParams;
        const outputs = Object.assign(this.state.output, []);
        if (this.getValue('重浆密度') === 0) {
            outputs[1].value = 0;
        } else {
            outputs[1].value = this.getValidate(this.getValue('环空压耗')/(9.8*(this.getValue('重浆密度') - this.getValue('钻井液密度'))));
        }

        if (this.getValue('垂深高度') === 0) {
            outputs[0].value = 0;
        } else {
            outputs[0].value = this.getValidate(this.getValue('环空压耗')/(9.8 * this.getValue('垂深高度'))+ this.getValue('钻井液密度'));
        }

        outputs[2].value = this.getValidate(this.getValue('环空压耗'));
        outputs[3].value = this.getValidate(this.getValue('钻井液密度'));

        outputs.forEach(item => {
            window.localStorage.setItem(item.label, item.value);
        });

        this.setState({
            output: outputs
        });
        this.props.setBack(outputs);
    }
    render() {
        return <FinalCalculate inputParams={this.state.input} outputParams={this.state.output} setValue={this.setValue.bind(this)} title={'起钻重浆'} formula={this.formula}/>
    }
}
module.exports = {
    Density,
    Depth,
    Total
};