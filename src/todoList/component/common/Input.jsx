import React from 'react';
import '../common/common.less';
class Input extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showClear: false
        }
    }
    
    setClear() {
        this.refs[this.props.code].value = '';
        this.setState({
            showClear: false
        })
    }

    hasNumber(e) {
        this.setState({
            showClear: e.target.value !== ''
        });
        this.props.onChange && this.props.onChange(this.props.code, e.target.value);
    }

    setInput() {

        if(this.props.code === 'p' || this.props.code === 'q') {
            return <input className='input-value' onChange={this.hasNumber.bind(this)} type="number" placeholder={`请输入${this.props.name}`} ref={this.props.code} value={this.props.defaultValue || ''}/>
        }
        return <input className='input-value' onChange={this.hasNumber.bind(this)} type="number" placeholder={`请输入${this.props.name}`} ref={this.props.code} defaultValue={this.props.defaultValue || ''}/>

    }

    render() {
        return <div className='input-field-option'>
            <label className='input-label'> {this.props.name}： </label>
            <div className='input-div'>
                {this.setInput()}
            </div>
        </div>
    }
}

export default Input;
