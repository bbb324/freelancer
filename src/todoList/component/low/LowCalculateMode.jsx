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

            <Input name={'泵入堵漏浆量'} code={'a'} ref={'a'} />
            <Input name={'井眼直径'} code={'b'} ref={'b'} />
            <Input name={'钻杆1外径'} code={'c'} ref={'c'} />
            <Input name={'钻杆1内径'} code={'d'} ref={'d'} />
            <Input name={'钻杆1长度'} code={'e'} ref={'e'} />
            <Input name={'钻杆2外径'} code={'f'} ref={'f'} />
            <Input name={'钻杆2内径'} code={'g'} ref={'g'} />
            <Input name={'钻杆2长度'} code={'h'} ref={'h'} />
            <Input name={'光钻杆下深'} code={'i'} ref={'i'} />
            <Input name={'堵漏浆内外高差'} code={'j'} ref={'j'} />
            <div>
                <span className='result'> 结果： {this.state.value}% </span>
                <div className='cal-btn' onClick={this.calculate.bind(this)}>计算</div>
            </div>
        </div>
    }
}


module.exports = {
    Volumn
};