import React from 'react';
import '../common/common.less';
class FinalCalculate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showClear: false,
            inputParams: this.props.inputParams,
            isShrink: true
        }
    }

    setClear() {
        this.refs[this.props.code].value = '';
        this.setState({
            showClear: false
        })
    }

    hasNumber(label, specialControl, e) {
        const inputs = Object.assign(this.state.inputParams, []);
        let cur = inputs.filter(item => {
            return item.label === label
        });
        cur[0].value = this.getValidate(Number(e.target.value));
        this.setState({
            inputParams: inputs
        })
        let specialControlList = ['m', 'n', 'p', 'q'];
        if(specialControl && specialControlList.indexOf(specialControl) >= 0) {
            this.props && this.props.setControl(specialControl, e.target.value);
        }
    }

    // 如果算不出来，返回1
    getValidate(val) {
        if(isNaN(val) || val === Infinity) {
            return 1;
        }
        return val;
    }

    renderIn(item) {
        if(item.specialControl === 'p' ) {
            return <input className='input-value' onChange={this.hasNumber.bind(this, item.label, item.specialControl)} type="number" placeholder={`请输入${item.label}`} value={this.props.P_value}/>
        } else if(item.specialControl === 'q') {
            return <input className='input-value' onChange={this.hasNumber.bind(this, item.label, item.specialControl)} type="number" placeholder={`请输入${item.label}`} value={this.props.Q_value}/>
        }
        return <input className='input-value' onChange={this.hasNumber.bind(this, item.label, item.specialControl)} type="number" placeholder={`请输入${item.label}`} defaultValue={item.value}/>
    }

    setInput() {
        let list = [];
        this.state.inputParams.forEach(item => {
                list.push(<div key={item.label} className="input-option">
                    <label className='input-label'> {item.label}： </label>
                    <div className='input-div'>
                        {this.renderIn(item)}
                    </div>
                </div>)
        });
        return list;
    }

    setOutput() {
        let list = [];
        this.props.outputParams.forEach(item => {
            if(item.ext!== 'hide') {
                list.push(<div key={item.label}  className="output-option">
                    <label className='input-label'> {item.label}： </label>
                    <div className='input-div'>
                        <span> {item.value} </span>
                    </div>
                </div>)
            }
        });
        return list;
    }

    confirm() {
        this.state.inputParams.forEach(item => {
            window.localStorage.setItem(item.label, this.getValidate(item.value));
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

    toggleFormula() {
        this.setState({
            isShrink: !this.state.isShrink
        })
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
            <div className={`config-formula ${this.state.isShrink === true ? 'shrink' : 'isOpen'}`}>
                <div className={"expand-formula"} onClick={this.toggleFormula.bind(this)}>
                    <div className={"expand-formula-text"}>计算公式</div>
                    <div className={"triangle"}>
                        {this.state.isShrink === true ?
                         <img src='./image/icon/up.png' /> :
                          <img src='./image/icon/down.png' />
                        }
                    </div>
                </div>
                {this.renderFormula()}
            </div>
            <div className='btn-div'>
                <span className='confirm' onClick={this.confirm.bind(this)}>计算</span>
            </div>
        </div>
    }
}

export default FinalCalculate;