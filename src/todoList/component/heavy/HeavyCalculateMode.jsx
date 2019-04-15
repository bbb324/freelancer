import React from 'react';
import Input from '../common/Input.jsx';
function get(ref) {
    return +ref.refs[Object.keys(ref.refs)[0]].value
}
var event = document.createEvent('HTMLEvents')

// 重浆密度计算公式
class Density extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            initDepthValue: 0
        }
    }
    calculate() {
        //重浆密度 = 环空压耗/（9.8*垂深高度）+钻井液密度
        let value = get(this.refs.a) / (9.8 * get(this.refs.b)) + get(this.refs.c);
        this.props.setValue(this.props.code, value.toFixed(2));

        event.initEvent("triggerDensity", true, true);
        event.densityValue = value.toFixed(2);
        document.dispatchEvent(event);

        this.setState({
            value: value.toFixed(2)
        });
    }

    onInputChange(code, value) {
        this.props.setValue(code, value)
    }
    render() {
        return <div className="math-params">

            <Input name={'环空压耗'} code={'loop'} ref={'a'} onChange={this.onInputChange.bind(this)}/>
            <Input name={'垂深高度'} code={'depth'} ref={'b'} onChange={this.onInputChange.bind(this)} defaultValue={this.state.initDepthValue}/>
            <Input name={'钻井液密度'} code={'liquid-density'} ref={'c'} onChange={this.onInputChange.bind(this)}/>
            <div>
                <span className='result'> 结果： {this.state.value} </span>
                <div className='cal-btn' onClick={this.calculate.bind(this)}>计算</div>
            </div>
        </div>
    }

    componentDidMount() {
        this.eventListener = document.addEventListener('triggerDepth', event => {
            console.log(event.depthValue)
            this.setState({
                initDepthValue: event.depthValue
            })
        }, false);
    }
}

// 垂深高度计算公式
class Depth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            initDensityValue: 0
        }
    }
    calculate() {
        //垂深高度 = 环空压耗/(9.8*(重浆密度 - 钻井液密度))
        let value = get(this.refs.a) / 9.8 * (get(this.refs.b) - get(this.refs.c));
        this.props.setValue(this.props.code, value.toFixed(2));

        event.initEvent("triggerDepth", true, true);
        event.depthValue = value.toFixed(2);
        document.dispatchEvent(event);

        this.setState({
            value: value.toFixed(2)
        });
    }

    onInputChange(code, value) {
        this.props.setValue(code, value)

    }
    render() {
        return <div className="math-params">

            <Input name={'环空压耗'} code={'loop'} ref={'a'} onChange={this.onInputChange.bind(this)}/>
            <Input name={'重浆密度'} code={'heavy-pulp-density'} ref={'b'} onChange={this.onInputChange.bind(this)} defaultValue={this.state.initDensityValue}/>
            <Input name={'钻井液密度'} code={'liquid-density'} ref={'c'} onChange={this.onInputChange.bind(this)}/>
            <div>
                <span className='result'> 结果： {this.state.value} </span>
                <div className='cal-btn' onClick={this.calculate.bind(this)}>计算</div>
            </div>
        </div>
    }

    componentDidMount() {
        this.eventListener = document.addEventListener('triggerDensity', event => {
            this.setState({
                initDensityValue: event.densityValue
            })
        }, false);
    }
}
module.exports = {
    Density,
    Depth
};