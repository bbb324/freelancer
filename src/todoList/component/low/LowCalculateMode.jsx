import React from 'react';
import Input from '../common/Input.jsx';
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


module.exports = {
    Volumn
};