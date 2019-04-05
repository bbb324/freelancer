import React from 'react';

function get(ref) {
    return ref.value;
}

// 泵排量计算公式
class Viscosity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }
    calculate() {
        let value = Math.pow(Math.PI * ( get(this.refs.a) / 2), 2) * get(this.refs.b) * get(this.refs.c) * get(this.refs.d)  * get(this.refs.e)
        this.setState({
            value: value
        });
    }
    render() {
        return <div className="math-params">
            <input placeholder="管套直径" className='cal-input' ref='a'/>
            <input placeholder="活塞冲程" className='cal-input' ref='b'/>
            <input placeholder="缸套数" className='cal-input' ref='c'/>
            <input placeholder="冲数" className='cal-input' ref='d'/>
            <input placeholder="上水效率" className='cal-input' ref='e'/>
            <div>
                <span className='cal-btn' onClick={this.calculate.bind(this)}>计算</span>
                <span> {this.state.value} </span>
            </div>
        </div>
    }
}

module.exports = {
    Viscosity,

};