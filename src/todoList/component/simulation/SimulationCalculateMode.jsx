import React from 'react';
import Input from '../common/Input.jsx';
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
module.exports = {
    Load,
    Predict,
    Real
};