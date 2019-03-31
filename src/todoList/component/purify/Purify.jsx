import React from 'react';import Toolbar from './../common/ToolBar.jsx'import './purify.less'class Purify extends React.Component {    constructor(props) {        super(props);        this.state = {            showConfigPanel: false,            bottomHeight: 0,            upperHeight: 0,            left: [                {label: '表面粘度', code: 'surface-viscosity', value: 0},                {label: '塑性粘度', code: 'plastic-viscosity', value: 0},                {label: '动切力', code: 'yield-point', value: 0},                {label: '冻塑比', code: 'freeze-plastic', value: 0},                {label: '环空反速', code: 'loop', value: 0}            ],            right: [                {label: '岩屑滑落速度', code: 'slip-speed', value: 0},                {label: '岩屑净上升速度', code: 'rising-speed', value: 0},                {label: '流性指数', code: 'flow-index', value: 0},                {label: '稠度系数', code: 'consistency-coefficient', value: 0},                {label: '井眼净化能力', code: 'purify-ability', value: 0}            ]        };    }    leftConfig() {        let list = [];        this.state.left.forEach((item, key) => {            list.push(<li key={key} className="left-param">                    <span className="title"> {item.label} </span>                    <span className="value"> {item.value} </span>                </li>)        });        return list;    }    rightConfig() {        let list = [];        this.state.right.forEach((item, key) => {            list.push(<li key={key} className="right-param">                <span className="title"> {item.label} </span>                <span className="value"> {item.value} </span>            </li>)        });        return list;    }    showConfigPanel() {        this.setState({            showConfigPanel: true        });    }    getConfigs() {        let list = [];        let tabList = [...this.state.left, ...this.state.right];        tabList.forEach((item, key) => {            list.push(<li className='config-unit' key={key}>                <div className='config-title'>                    <span className='config-label'> {item.label} </span>                </div>                <div className='config-control'>                    <input className='config-input' data-code={item.code} defaultValue={item.value}/>                </div>            </li>)        });        return list;    }    configPanel() {        if(this.state.showConfigPanel === true) {            return <div className='configPanel'>                <div className='config' ref='configPanel'>                    {this.getConfigs()}                    <div className='btn-div'>                        <span className='confirm' onClick={this.confirm.bind(this)}>确定</span>                        <span onClick={this.cancel.bind(this)}>取消</span>                    </div>                </div>            </div>        }        return null;    }    getParams() {        let inputs = this.refs.configPanel.querySelectorAll('input');        const left = Object.assign(this.state.left, []);        const right = Object.assign(this.state.right, []);        const tabs = [...left, ...right];        tabs.forEach(item => {            item.value = this.refs.configPanel.querySelector(`input[data-code="${item.code}"]`).value        });        return tabs;    }    getPercent(params) {        if(params === undefined) return  0;        let bottom = 0;        let upper = 0;        let value = params[0].value;  //这里后面要改，这里只输入了一个值，需要一个公式        if(value > 43) {           upper = value - 43;            bottom = 43;        } else {            bottom = value;        }        if(upper >= 32) {            upper = 32        }        return {            bottom, upper        }    }    confirm() {        const params = this.getParams();        const percent = this.getPercent(params);        this.setState({            showConfigPanel: false,            tabs: params,            bottomHeight: percent.bottom,            upperHeight: percent.upper        })    }    cancel() {        this.setState({            showConfigPanel: false        })    }    render() {        return <div className="purify-bg">            {this.configPanel()}            <div className="open-config" onClick={this.showConfigPanel.bind(this)}>设置</div>            <div className="left-param-list">                <ul>                    {this.leftConfig()}                </ul>            </div>            <div className="pump-bg">                <div className="water-bg-upper" style={{height: `${this.state.upperHeight}%`}}>                    <img className="water" src={`./image/icon/water.png`}/>                </div>                <div className="water-bg-bottom" style={{height: `${this.state.bottomHeight}%`}}>                    <img className="water" src={`./image/icon/water.png`}/>                </div>            </div>            <div className="right-param-list">                <ul>                    {this.rightConfig()}                </ul>            </div>            <Toolbar navigate={this.props.navigate && this.props.navigate.bind(this)}/>        </div>    }}export default Purify;