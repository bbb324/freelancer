import React from 'react';
import Input from '../common/Input.jsx';
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


module.exports = {
    Drill,
    Pipe,
    InnerCycle,
    BodyCycle
};