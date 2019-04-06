import React from 'react';

function get(ref) {
    return ref.value;
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
        this.props.setValue(value, this.props.code);
        this.setState({
            value: value
        });
    }

    onInputChange(code, e) {
        this.props.setValue(e.target.value, code)
    }
    render() {
        return <div className="math-params">
            <input type="number" placeholder="泵入堵漏浆量" className='cal-input' ref='a' onChange={this.onInputChange.bind(this, 'plasma-volume')} />
            <input type="number" placeholder="井眼直径" className='cal-input' ref='b' onChange={this.onInputChange.bind(this, 'diameter')} />
            <input type="number" placeholder="钻杆1外径" className='cal-input' ref='c' onChange={this.onInputChange.bind(this, 'external-diameter-1')} />
            <input type="number" placeholder="钻杆1内径" className='cal-input' ref='d' onChange={this.onInputChange.bind(this, 'inner-diameter-1')} />
            <input type="number" placeholder="钻杆1长度" className='cal-input' ref='e' onChange={this.onInputChange.bind(this, 'length-1')} />
            <input type="number" placeholder="钻杆2外径" className='cal-input' ref='f' onChange={this.onInputChange.bind(this, 'external-diameter-2')} />
            <input type="number" placeholder="钻杆2内径" className='cal-input' ref='g' onChange={this.onInputChange.bind(this, 'inner-diameter-2')} />
            <input type="number" placeholder="钻杆2长度" className='cal-input' ref='h' onChange={this.onInputChange.bind(this, 'length-2')} />
            <input type="number" placeholder="光钻杆下深" className='cal-input' ref='i' onChange={this.onInputChange.bind(this, 'depth')} />
            <input type="number" placeholder="堵漏浆内外高差" className='cal-input' ref='j' onChange={this.onInputChange.bind(this, 'difference')} />
            <div>
                <span className='cal-btn' onClick={this.calculate.bind(this)}>计算</span>
                <span> {this.state.value} </span>
            </div>
        </div>
    }
}


module.exports = {
    Volumn
};