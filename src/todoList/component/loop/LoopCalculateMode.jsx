import React from 'react';

function get(ref) {
    return ref.value;
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
            <input placeholder="泵排量" className='cal-input' ref='a'/>
            <input placeholder="井眼直径" className='cal-input' ref='b'/>
            <input placeholder="钻具外径" className='cal-input' ref='c'/>

            <div>
                <span className='cal-btn' onClick={this.calculate.bind(this)}>计算</span>
                <span> {this.state.value} </span>
            </div>
        </div>
    }
}


module.exports = {
    Loop
};