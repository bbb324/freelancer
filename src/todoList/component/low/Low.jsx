import React from 'react';import Toolbar from './../common/ToolBar.jsx'import Mode from './LowCalculateMode.jsx'import './low.less'class Low extends React.Component {    constructor(props) {        super(props);        this.state = {            percent: 0,            showConfigPanel: false,            tabs: [                {label: '泵入堵漏浆量', code: 'plasma-volume', value: 0},                {label: '井眼直径', code: 'diameter', value: 0},                {label: '钻杆1外径', code: 'external-diameter-1', value: 0},                {label: '钻杆1内径', code: 'inner-diameter-1', value:0},                {label: '钻杆1长度', code: 'length-1', value: 0},                {label: '钻杆2外径', code: 'external-diameter-2', value: 0},                {label: '钻杆2内径', code: 'inner-diameter-2', value: 0},                {label: '钻杆2长度', code: 'length-2', value: 0},                {label: '光钻杆下深', code: 'depth', value: 0},                {label: '堵漏浆内外高差', code: 'difference', value: 0},                {label: '钻井液替量', code: 'displacement', value: 0,                    formula: ['公式说明：环空返高 = (泵入堵漏浆量 * 4 / π - 钻杆2内径平方 * 堵漏浆内外高差) / 井眼直径平方。',                        '钻井液替量 = π / 4 * 钻杆1内径平方 * 钻杆1长度 + π / 4 * 钻杆2内径平方 * (钻杆2长度 - 堵漏浆内外高差 - 环空返高)']                }            ]        };    }    setValue(code, v) {        console.log(code, v)        const tabs = Object.assign(this.state.tabs, []);        let tab = tabs.filter(i => {return i.code === code})[0];        tab.value = v;        this.setState({            tabs: tabs        })    }    getCalculator(code) {        switch (code) {            case 'displacement':                return <Mode.Volumn setValue={this.setValue.bind(this)} code={code}/>;            default:                return null;        }    }    showConfigPanel() {        this.setState({            showConfigPanel: true        });    }    setFormula(formula) {        if(formula === undefined) return null;        if(typeof formula === 'string') {            return <p> {formula} </p>        } else {            let list = [];            formula.forEach((item, key) => {                list.push(<p key={key}> {item} </p>)            })            return list;        }    }    getConfigs() {        let list = [];        let item = this.state.tabs[10]       list.push(<li className='config-unit' key={item.label} >           <div className='config-title'>               <span className='config-label'> {item.label} </span>               <span className='config-formula'> {this.setFormula(item.formula)} </span>           </div>           <div className='config-control'>               {this.getCalculator(item.code)}           </div>       </li>)        return list;    }    configPanel() {        if(this.state.showConfigPanel === true) {            return (<div className='configPanel'>                <div className='config' ref='configPanel'>                    <img className='close' src='./image/icon/close.png' onClick={this.close.bind(this)}/>                    {this.getConfigs()}                    <div className='btn-div'>                        <span className='confirm' onClick={this.confirm.bind(this)}>确定</span>                    </div>                </div>            </div>)        }        return null;    }    confirm() {        this.setState({            showConfigPanel: false        })    }    close() {        this.setState({            showConfigPanel: false        })    }    renderPrams() {        let list = [];        this.state.tabs.forEach((item, key) => {            list.push(<div className='config-unit' key={key}>                <div className='config-title'>                    <span className='config-label'> {item.label} </span>                </div>                <div className='config-control'>                    <span className='config-input' data-code={item.code}> {item.value} </span>                </div>            </div>)        });        return list;    }    render() {        return <div className="low-bg">            {this.configPanel()}            <div className="open-config" onClick={this.showConfigPanel.bind(this)}>设置</div>            <img className="low-img" src={`./image/low/low.gif`}/>            <div className="param-div">                {this.renderPrams()}            </div>            <Toolbar navigate={this.props.navigate && this.props.navigate.bind(this)}/>        </div>    }}export default Low;