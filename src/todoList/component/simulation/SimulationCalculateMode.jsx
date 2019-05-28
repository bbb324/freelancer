import React from 'react';
import Input from '../common/Input.jsx';
import FinalCalculate from '../common/FinalCalculate.jsx';
function get(ref) {
    return +ref.refs[Object.keys(ref.refs)[0]].value
}
var event = document.createEvent('HTMLEvents')

// 漏层承压能力计算公式
class Load extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            initDepthValue: 0
        }
    }
    calculate() {
        //重浆密度 = 堵漏浆密度*g*预计水泥塞长+堵漏时钻井液密度*g*（漏层垂深 - （（堵漏浆方量 - 挤水泥方量）/(1/4π井眼直径的平方）））
        let value = get(this.refs.a) * 9.8 * get(this.refs.b) + get(this.refs.c) * 9.8 * (get(this.refs.d) - ((get(this.refs.e) - get(this.refs.f)) / (1/4 * Math.PI * get(this.refs.g))))
        this.props.setValue(this.props.code, value.toFixed(2));

        this.setState({
            value: value.toFixed(2)
        });
    }


    render() {
        return <div className="math-params">

            <Input name={'堵漏浆密度'} code={'density'} ref={'a'} />
            <Input name={'预计水泥塞长'} code={'length'} ref={'b'} />
            <Input name={'堵漏时钻井液密度'} code={'liquid-density'} ref={'c'} />
            <Input name={'漏层垂深'} code={'depth'} ref={'d'} />
            <Input name={'堵漏浆方量'} code={'leaking-stop'} ref={'e'} />
            <Input name={'挤水泥方量'} code={'water'} ref={'f'} />
            <Input name={'井眼直径的平方'} code={'diameter'} ref={'g'} />
            <div>
                <span className='result'> 结果： {this.state.value} </span>
                <div className='cal-btn' onClick={this.calculate.bind(this)}>计算</div>
            </div>
        </div>
    }

}

// 预计水泥塞长计算公式
class Predict extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            initDensityValue: 0
        }
    }
    calculate() {
        //预计水泥塞长 = （堵漏浆方量 - 挤水泥方量）/(1/4π井眼直径的平方）-新环空静液面高度
        let value = (get(this.refs.a) - get(this.refs.b)) / (1/4 * Math.PI * get(this.refs.c))- get(this.refs.d)
        this.props.setValue(this.props.code, value.toFixed(2));

        this.setState({
            value: value.toFixed(2)
        });
    }

    render() {
        return <div className="math-params">

            <Input name={'堵漏浆方量'} code={'leaking-stop'} ref={'a'} />
            <Input name={'挤水泥方量'} code={'water'} ref={'b'} />
            <Input name={'井眼直径的平方'} code={'diameter'} ref={'c'}/>
            <Input name={'新环空静液面高度'} code={'height'} ref={'d'}/>
            <div>
                <span className='result'> 结果： {this.state.value} </span>
                <div className='cal-btn' onClick={this.calculate.bind(this)}>计算</div>
            </div>
        </div>
    }

}

// 实际水泥塞长计算公式
class Real extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            initDensityValue: 0
        }
    }
    calculate() {
        //预计水泥塞长 = （堵漏浆方量 - 挤水泥方量）/(1/4π井眼直径的平方）-新环空静液面高度
        let value = (get(this.refs.a) - get(this.refs.b)) / (1/4 * Math.PI * get(this.refs.c))- get(this.refs.d)
        this.props.setValue(this.props.code, value.toFixed(2));

        this.setState({
            value: value.toFixed(2)
        });
    }

    render() {
        return <div className="math-params">

            <Input name={'堵漏浆方量'} code={'leaking-stop'} ref={'a'} />
            <Input name={'挤水泥方量'} code={'water'} ref={'b'} />
            <Input name={'井眼直径的平方'} code={'diameter'} ref={'c'} />
            <Input name={'新环空静液面高度'} code={'height'} ref={'d'} />
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
                {label: '井眼直径', value: ''},
                {label: '漏失时钻井液密度', value: ''},
                {label: '漏层垂深', value: ''},
                {label: '环空静液面高度', value: ''},
                {label: '堵漏浆密度', value: ''},
                {label: '堵漏浆方量', value: ''},
                {label: '堵漏时钻井液密度', value: ''},
                {label: '挤水泥方量', value: ''},
                {label: '漏层平均井斜角', value: ''},
                {label: '实际水泥塞长', value: ''},
            ],
            output: [
                {label: '漏层承压能力', value: 0 },
                {label: '直井段预计水泥塞长', value: 0 },
                {label: '斜井段预计水泥塞长', value: 0 },
                {label: '水平段预计水泥塞长', value: 0 },
                {label: '实际水泥塞长', value: 0 },

            ]
        };
        this.formula = [
            '漏层承压能力 = 漏失时钻井液密度*g*(漏层垂深 - 环空静液面高度)',
            '直井段： 预计水泥塞长 = (漏层承压能力 - 堵漏时钻井液密度 * g * (漏层垂深 - ((堵漏浆方量 - 挤水泥方量) / (1/4π井眼直径的平方))) / (堵漏浆密度 * g)',
            '斜井段： 预计水泥塞长 = (漏层承压能力 - 堵漏时钻井液密度 * g * (漏层垂深 - ((堵漏浆方量 - 挤水泥方量) / (1/4 *π *井眼直径的平方)) * cos漏层平均井斜角)) / (g * 堵漏浆密度 * cos漏层平均井斜角)',
            '水平段： 预计水泥塞长=（堵漏浆方量 - 挤水泥方量）/(1/4*π*井眼直径的平方）-新环空静液面高度',
            '实际水泥塞长 = 实际水泥塞长',

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

        // v: 漏层承压能力
        let v = this.getValue('漏失时钻井液密度') * 9.8 * (this.getValue('漏层垂深') - this.getValue('环空静液面高度'));

        // v2: 井眼直径的平方
        let v2 = this.getValue('井眼直径') * this.getValue('井眼直径');


        outputs[0].value = this.getValidate(v);

        //tmp1: 堵漏时钻井液密度*g*（漏层垂深 - （（堵漏浆方量 - 挤水泥方量）/(1/4π井眼直径的平方）））
        let tmp1 = this.getValue('堵漏时钻井液密度') * 9.8 * (this.getValue('漏层垂深') - ((this.getValue('堵漏浆方量') - this.getValue('挤水泥方量')) / (1/4 * Math.PI * v2)));
        outputs[1].value = this.getValidate((v - tmp1) / (9.8 * this.getValue('堵漏浆密度')));


        // tmp2: 堵漏时钻井液密度 * g * (漏层垂深 - ((堵漏浆方量 - 挤水泥方量) / (1/4 *π *井眼直径的平方)) * cos漏层平均井斜角))
        let tmp2 = this.getValue('堵漏时钻井液密度') * 9.8 * (this.getValue('漏层垂深') - ((this.getValue('堵漏浆方量') - this.getValue('挤水泥方量')) / (1/4 * Math.PI * v2)) * Math.cos(this.getValue('漏层平均井斜角')));
        outputs[2].value = this.getValidate((v - tmp2) / (9.8 * this.getValue('堵漏浆密度') * Math.cos(this.getValue('漏层平均井斜角'))));
        // tmp3: （堵漏浆方量 - 挤水泥方量）/(1/4π井眼直径的平方）
        let tmp3 =(this.getValue('堵漏浆方量') - this.getValue('挤水泥方量')) / (1/4 * Math.PI * v2);
        outputs[3].value = this.getValidate(tmp3 - this.getValue('环空静液面高度'));

        outputs[4].value = this.getValidate(this.getValue('实际水泥塞长'));



        outputs.forEach(item => {
            window.localStorage.setItem(item.label, item.value);
        });


        this.setState({
            output: outputs
        });
        this.props.setBack(outputs);
    }




    render() {
        return <FinalCalculate inputParams={this.state.input} outputParams={this.state.output} setValue={this.setValue.bind(this)} title={'堵漏效果模拟'} formula={this.formula}/>
    }
}
module.exports = {
    Load,
    Predict,
    Real,
    Total
};