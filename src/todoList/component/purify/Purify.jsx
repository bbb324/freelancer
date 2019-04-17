import React from 'react';import Toolbar from './../common/ToolBar.jsx'import Mode from './PurCalculateMode.jsx'import './purify.less'class Purify extends React.Component {    constructor(props) {        super(props);        this.state = {            showConfigPanel: false,            bottomHeight: 47,            upperHeight: 15,            left: [                {                    label: '表面粘度', code: 'surface-viscosity', value: 0,                    formula: 'Ф600 / 2'                },                {label: '塑性粘度', code: 'plastic-viscosity', value: 0,                    formula: 'Ф600 -Ф300'                },                {label: '动切力', code: 'yield-point', value: 0,                    formula: '0.479 * (2*Ф300-Ф600)'                },                {label: '动塑比', code: 'freeze-plastic', value: 0,                    formula: 'YP / VP'                },                {label: '环空反速', code: 'loop', value: 0,                    formula: '1.2732 * Math.pow(10, 3) *泵排量 / (Math.pow(井眼直径, 2) - Math.pow(钻具外径, 2))'                }            ],            right: [                {label: '岩屑滑落速度', code: 'slip-speed', value: 0,                    formula: '0.071*岩屑直径*(岩屑密度-钻井液密度)^0.667/(钻井液密度*有效视粘度)^0.333'                },                {label: '岩屑净上升速度', code: 'rising-speed', value: 0,                    formula: '环空返速-岩屑滑落速度'                },                {label: '流性指数', code: 'flow-index', value: 0,                    formula: '3.322 * Math.log10(Ф600 / Ф300)'                },                {label: '稠度系数', code: 'consistency-coefficient', value: 0,                    formula: '(0.511 * Ф300) / Math.pow(511, 3.322 * Math.log10(Ф600 / Ф300))'                },                {label: '井眼净化能力', code: 'purify-ability', value: 0,                    formula : '岩屑净上升速度/环空返速*100%'                }            ],            singleItem: ''        };    }    setValue(v, code, side) {        const tabs = Object.assign(this.state[side], []);        let tab = tabs.filter(i => {return i.code === code})[0];        tab.value = v;        if(side === 'right') {            this.setState({                right: tabs            })        } else {            this.setState({                left: tabs            })        }    }    getCalculator(code, value) {        switch (code) {            case 'surface-viscosity':                return <Mode.Viscosity setValue={this.setValue.bind(this)} code={code} side={'left'} />;            case 'plastic-viscosity':                return <Mode.PlasticViscosity setValue={this.setValue.bind(this)} code={code} side={'left'}  />;            case 'yield-point':                return <Mode.YieldPoint setValue={this.setValue.bind(this)} code={code} side={'left'}  />;            case 'freeze-plastic':                return <Mode.FreezePlastic setValue={this.setValue.bind(this)} code={code} side={'left'}  />;            case 'loop':                return <Mode.Loop setValue={this.setValue.bind(this)} code={code} side={'left'} />;            case 'slip-speed':                return <Mode.SlipSpeed setValue={this.setValue.bind(this)} code={code} side={'right'} />;            case 'rising-speed':                return <Mode.RisingSpeed setValue={this.setValue.bind(this)} code={code} side={'right'} />;            case 'flow-index':                return <Mode.FlowIndex setValue={this.setValue.bind(this)} code={code} side={'right'} />;            case 'consistency-coefficient':                return <Mode.Coefficient setValue={this.setValue.bind(this)} code={code} side={'right'} />;            case 'purify-ability':                return <Mode.Ability setValue={this.setValue.bind(this)} code={code} side={'right'} />;            default:                return <div> default </div>        }    }    openSetting(item) {        this.setState({            showConfigPanel: true,            singleItem: item        })    }    leftConfig() {        let list = [];        this.state.left.forEach((item, key) => {            list.push(<li key={key} className="left-param" onClick={this.openSetting.bind(this, item)}>                    <span className="title"> {item.label} </span>                    <span className="value"> {item.value} </span>                </li>)        });        return list;    }    rightConfig() {        let list = [];        this.state.right.forEach((item, key) => {            list.push(<li key={key} className="right-param" onClick={this.openSetting.bind(this, item)}>                <span className="title"> {item.label} </span>                <span className="value"> {item.value} </span>            </li>)        });        return list;    }    showConfigPanel() {        this.setState({            showConfigPanel: true,            singleItem: ''        });    }    setFormula(formula) {        if(formula === undefined) return null;        if(typeof formula === 'string') {            return <p> {formula} </p>        } else {            let list = [];            formula.forEach((item, key) => {                list.push(<p key={key}> {item} </p>)            })            return list;        }    }    getConfigs() {        let list = [];        if(this.state.singleItem !== '') {            list.push(<li className='config-unit' key={this.state.singleItem.code}>                <div className='config-title'>                    <span className='config-label'> {this.state.singleItem.label} </span>                    <span className='config-formula'> {this.setFormula(this.state.singleItem.formula)} </span>                </div>                <div className='config-control'>                    {this.getCalculator(this.state.singleItem.code, this.state.singleItem.value)}                </div>            </li>)        } else {            let tabList = [...this.state.left, ...this.state.right];            tabList.forEach((item, key) => {                list.push(<li className='config-unit' key={key}>                    <div className='config-title'>                        <span className='config-label'> {item.label} </span>                        <span className='config-formula'> {this.setFormula(item.formula)} </span>                    </div>                    <div className='config-control'>                        {this.getCalculator(item.code, item.value)}                    </div>                </li>)            });        }        return list;    }    close() {        this.setState({            showConfigPanel: false        })    }    setBack(values) {        const left = Object.assign(this.state.left, []);        const right = Object.assign(this.state.right, []);        values.forEach(item => {            left.forEach(leftUnit => {                if(leftUnit.label === item.label) {                    leftUnit.value = item.value;                }            });            right.forEach(rightUnit => {                if(rightUnit.label === item.label) {                    rightUnit.value = item.value;                }            })        });        this.setState({            left: left,            right: right,        })    }    configPanel() {        if(this.state.showConfigPanel === true) {            return (<div className='configPanel'>                <div className='config' ref='configPanel'>                    <img className='close' src='./image/icon/close.png' onClick={this.close.bind(this)}/>                    <Mode.Total setBack={this.setBack.bind(this)}/>                </div>            </div>)        }        return null;    }    confirm() {        this.setState({            showConfigPanel: false        })    }    render() {        return <div className="purify-bg">            {this.configPanel()}            <div className="open-config" onClick={this.showConfigPanel.bind(this)}>设置</div>            <div className="left-param-list">                <ul>                    {this.leftConfig()}                </ul>            </div>            <div className="pump-bg">                <div className="water-bg-upper" style={{height: `${this.state.upperHeight}%`}}>                    <img className="water" src={`./image/icon/water.png`}/>                </div>                <div className="water-bg-bottom" style={{height: `${this.state.bottomHeight}%`}}>                    <img className="water" src={`./image/icon/water.png`}/>                </div>            </div>            <div className="right-param-list">                <ul>                    {this.rightConfig()}                </ul>            </div>            <Toolbar navigate={this.props.navigate && this.props.navigate.bind(this)}/>        </div>    }}export default Purify;