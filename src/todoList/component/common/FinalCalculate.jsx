import React from 'react';
import '../common/common.less';
class FinalCalculate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showClear: false,
            inputParams: this.props.inputParams,
        }
    }

    setClear() {
        this.refs[this.props.code].value = '';
        this.setState({
            showClear: false
        })
    }

    hasNumber(code, e) {
        const inputs = Object.assign(this.state.inputParams, []);
        let cur = inputs.filter(item => {
            return item.code === code
        });
        cur[0].value = Number(e.target.value);
        this.setState({
            inputParams: inputs
        })
    }

    setInput() {
        let list = [];
        this.state.inputParams.forEach(item => {
            list.push(<div key={item.label} >
                <label className='input-label'> {item.label}： </label>
                <div className='input-div'>
                    <input className='input-value' onChange={this.hasNumber.bind(this, item.code)} type="number" />
                </div>
            </div>)
        });
        return list;
    }

    setOutput() {
        let list = [];
        this.props.outputParams.forEach(item => {
            list.push(<div key={item.label}>
                <label className='input-label'> {item.label}： </label>
                <div className='input-div'>
                    <span> {item.value} </span>
                </div>
            </div>)
        });
        return list;
    }

    confirm() {
        this.props.setValue(this.state.inputParams);
    }

    render() {
        return <div className='input-field'>
            <div className="result">输入</div>

            <div className="result-panel">
                {this.setInput()}
            </div>
            <div className="result">结果</div>
            <div className="result-panel">
                {this.setOutput()}
            </div>
            <div className='btn-div'>
                <span className='confirm' onClick={this.confirm.bind(this)}>计算</span>
            </div>
        </div>
    }
}

export default FinalCalculate;