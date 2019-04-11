import React from 'react';
import Input from '../common/Input.jsx';
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


module.exports = {
    Loop
};