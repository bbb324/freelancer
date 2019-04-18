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

    hasNumber(label, e) {
        const inputs = Object.assign(this.state.inputParams, []);
        let cur = inputs.filter(item => {
            return item.label === label
        });
        cur[0].value = Number(e.target.value);
        this.setState({
            inputParams: inputs
        })
    }

    setInput() {
        let list = [];
        this.state.inputParams.forEach(item => {
            list.push(<div key={item.label} className="input-option">
                <label className='input-label'> {item.label}： </label>
                <div className='input-div'>
                    <input className='input-value' onChange={this.hasNumber.bind(this, item.label)} type="number" placeholder={`请输入${item.label}`} defaultValue={item.value}/>
                </div>
            </div>)
        });
        return list;
    }

    setOutput() {
        let list = [];
        this.props.outputParams.forEach(item => {
            list.push(<div key={item.label}  className="output-option">
                <label className='input-label'> {item.label}： </label>
                <div className='input-div'>
                    <span> {item.value} </span>
                </div>
            </div>)
        });
        return list;
    }

    confirm() {
        this.state.inputParams.forEach(item => {
            window.localStorage.setItem(item.label, item.value);
        });
        this.props.setValue(this.state.inputParams);
    }

    renderFormula() {
        let list = [];
        this.props.formula.forEach((item, key) => {
            list.push(<p key={key}> {item} </p>)
        });
        return list;
    }

    render() {
        return <div className='input-field'>
            <div className="title"> {this.props.title} </div>
            <div className="IO">输入</div>

            <div className="result-panel">
                {this.setInput()}
            </div>
            <div className="result">结果</div>
            <div className="result-panel">
                {this.setOutput()}
            </div>
            <div className="config-formula">
                {this.renderFormula()}
            </div>
            <div className='btn-div'>
                <span className='confirm' onClick={this.confirm.bind(this)}>计算</span>
            </div>
        </div>
    }
}

export default FinalCalculate;