import React from 'react';
import Input from '../common/Input.jsx';
import FinalCalculate from '../common/FinalCalculate.jsx';
function get(ref) {
    return +ref.refs[Object.keys(ref.refs)[0]].value
}

// 钻井液替量计算公式
class Volumn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }
    calculate() {
        let h = ( 4 / Math.PI * get(this.refs.a) - (Math.pow(get(this.refs.g), 2))) / Math.pow(get(this.refs.b), 2);
        let value = Math.PI / 4 * Math.pow(get(this.refs.d), 2) * get(this.refs.e) + Math.PI / 4 * Math.pow(get(this.refs.g), 2) * (get(this.refs.h) - get(this.refs.j) - h);
        this.props.setValue(this.props.code, value);
        this.setState({
            value: value
        });
    }

    onInputChange(code, value) {
        this.props.setValue(code, value)
    }
    render() {
        return <div className="math-params">

            <Input name={'泵入堵漏浆量'} code={'plasma-volume'} ref={'a'} onChange={this.onInputChange.bind(this)}/>
            <Input name={'井眼直径'} code={'diameter'} ref={'b'} onChange={this.onInputChange.bind(this)}/>
            <Input name={'钻杆1外径'} code={'external-diameter-1'} ref={'c'} onChange={this.onInputChange.bind(this)}/>
            <Input name={'钻杆1内径'} code={'inner-diameter-1'} ref={'d'} onChange={this.onInputChange.bind(this)}/>
            <Input name={'钻杆1长度'} code={'length-1'} ref={'e'} onChange={this.onInputChange.bind(this)}/>
            <Input name={'钻杆2外径'} code={'external-diameter-2'} ref={'f'} onChange={this.onInputChange.bind(this)}/>
            <Input name={'钻杆2内径'} code={'inner-diameter-2'} ref={'g'} onChange={this.onInputChange.bind(this)}/>
            <Input name={'钻杆2长度'} code={'length-2'} ref={'h'} onChange={this.onInputChange.bind(this)}/>
            <Input name={'光钻杆下深'} code={'depth'} ref={'i'} onChange={this.onInputChange.bind(this)}/>
            <Input name={'堵漏浆内外高差'} code={'difference'} ref={'j'} onChange={this.onInputChange.bind(this)}/>
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
                {label: '泵入堵漏浆量', value: ''},
                {label: '井眼直径', value: ''},
                {label: '钻杆1外径', value: ''},
                {label: '钻杆1内径', value: ''},
                {label: '钻杆1长度', value: ''},
                {label: '钻杆2外径', value: ''},
                {label: '钻杆2内径', value: ''},
                {label: '钻杆2长度', value: ''},
                {label: '光钻杆下深', value: ''},
                {label: '堵漏浆内外高差', value: ''}
            ],
            output: [
                {label: '泵入堵漏浆量', value: 0, ext: 'hide' },
                {label: '井眼直径', value: 0, ext: 'hide' },
                {label: '光钻杆下深', value: 0, ext: 'hide' },
                {label: '堵漏浆内外高差', value: 0, ext: 'hide' },
                {label: '钻井液替量', value: 0 }
            ]
        };
        this.formula = [

            '环空返高 = (泵入堵漏浆量 - π/4*钻杆2内径平方*内外高差)/ (π/4*井眼直径平方)',
            '钻井液替量 = π / 4 * 钻杆1内径平方 * 钻杆1长度 + π / 4 * 钻杆2内径平方 * (钻杆2长度 - 堵漏浆内外高差 - 环空返高)',
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

        outputs[0].value = this.getValidate(this.getValue('泵入堵漏浆量'));
        outputs[1].value = this.getValidate(this.getValue('井眼直径'));
        outputs[2].value = this.getValidate(this.getValue('光钻杆下深'));
        outputs[3].value = this.getValidate(this.getValue('堵漏浆内外高差'));

        // v0: 井眼直径平方
        let v0 =  this.getValue('井眼直径') * this.getValue('井眼直径');

        // v1： 钻杆1内径平方
        let v1 = this.getValue('钻杆1内径') * this.getValue('钻杆1内径');

        // v2： 钻杆2内径平方
        let v2 = this.getValue('钻杆2内径') * this.getValue('钻杆2内径');

        // v3：环空返高 = (泵入堵漏浆量 - π/4*钻杆2内径*钻杆2内径*内外高差)/ (π/4*井眼直径*井眼直径)
        let v3 = (this.getValue('泵入堵漏浆量') - Math.PI /4 * v2 * this.getValue('堵漏浆内外高差')) / (Math.PI /4 * v0);

        outputs[4].value = this.getValidate(Math.PI / 4 * v1 * this.getValue('钻杆1长度') + Math.PI / 4 * v2 * (this.getValue('钻杆2长度') - this.getValue('堵漏浆内外高差') - v3));

        outputs.forEach(item => {
            window.localStorage.setItem(item.label, item.value);
        });

        this.setState({
            output: outputs
        });
        this.props.setBack(outputs);
    }
    render() {
        return <FinalCalculate inputParams={this.state.input} outputParams={this.state.output} setValue={this.setValue.bind(this)} title={'堵漏替量'} formula={this.formula}/>
    }
}
module.exports = {
    Volumn,
    Total
};