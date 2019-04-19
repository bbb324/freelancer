import React from 'react';import Tabs from './../common/Tabs.jsx';import Toolbar from './../common/ToolBar.jsx'import Mode from './EffectCalculateMode.jsx'import './effect.less'class Effect extends React.Component {    constructor(props) {        super(props);        this.state = {            percent: 0,            showConfigPanel: false,            tabs: [                {label: '水力功率', code: 'power', value: 0,                    formula: '泵压*泵排量'                },                {label: '喷嘴水功率', code: 'nozzle-water', value: 0,                    formula: '喷嘴压降*泵排量'                },                {label: '比水功率', code: 'water-power', value: 0,                    formula: '喷嘴水功率*1000/(π*钻头直径*钻头直径/4)'                },                {label: '钻头压降', code: 'pressure', value:0,                    formula: '泵压 - 循环压耗'                },                {label: '泵排量', code: 'pump', value: 0,                    formula: 'π*（缸套直径/2）^2*活塞冲程*缸套数*冲数*上水效率 * 100'                },                {label: '喷嘴压降', code: 'drop', value: 0,                    formula: '810*钻井液密度*泵排量*泵排量/(0.98*0.98*(喷嘴1*喷嘴1+喷嘴2*喷嘴2+喷嘴3*喷嘴3+喷嘴4*喷嘴4+喷嘴5*喷嘴5+喷嘴6*喷嘴6+喷嘴7*喷嘴7+喷嘴8*喷嘴8)*(喷嘴1*喷嘴1+喷嘴2*喷嘴2+喷嘴3*喷嘴3+喷嘴4*喷嘴4+喷嘴5*喷嘴5+喷嘴6*喷嘴6+喷嘴7*喷嘴7+喷嘴8*喷嘴8)'                },                {label: '射流冲击力', code: 'jet', value: 0,                    formula: '1273*钻井液密度*泵排量*泵排量/(喷嘴1*喷嘴1+喷嘴2*喷嘴2+喷嘴3*喷嘴3+喷嘴4*喷嘴4+喷嘴5*喷嘴5+喷嘴6*喷嘴6+喷嘴7*喷嘴7+喷嘴8*喷嘴8)'                },                {label: '喷射速度', code: 'speed', value: 0,                    formula: '1273*泵排量/(喷嘴1*喷嘴1+喷嘴2*喷嘴2+喷嘴3*喷嘴3+喷嘴4*喷嘴4+喷嘴5*喷嘴5+喷嘴6*喷嘴6+喷嘴7*喷嘴7+喷嘴8*喷嘴8)'                },                {label: '钻铤环空返速', code: 'collar', value: 0,                    formula: '1.2732 * Math.pow(10, 3) *泵排量 / (Math.pow(井眼直径, 2) - Math.pow(钻具外径, 2))'                },                {label: '钻杆环空返速', code: 'drillpipe', value: 0,                    formula: '1.2732 * Math.pow(10, 3) *泵排量 / (Math.pow(井眼直径, 2) - Math.pow(钻具外径, 2))'                },            ],            singleItem: ''        };    }    componentWillMount() {        let tabList = Object.assign(this.state.tabs, []);        tabList.forEach(item => {            item.value = (+window.localStorage.getItem(item.label)).toFixed(2);        })        let totalValue = 0;        this.setState({            tabs: tabList,        })    }    setValue(v, code) {        const tabs = Object.assign(this.state.tabs, []);        let tab = tabs.filter(i => {return i.code === code})[0];        tab.value = v;       this.setState({           tabs: tabs       })    }    getCalculator(code) {        switch (code) {            case 'power':                return <Mode.Power setValue={this.setValue.bind(this)} code={code} /> ;            case 'nozzle-water':                return <Mode.Nozzle setValue={this.setValue.bind(this)} code={code} />;            case 'water-power':                return <Mode.WaterPower setValue={this.setValue.bind(this)} code={code} />;            case 'pressure':                return <Mode.Pressure setValue={this.setValue.bind(this)} code={code} />;            case 'pump':                return <Mode.Pump setValue={this.setValue.bind(this)} code={code} />;            case 'drop':                return <Mode.Drop setValue={this.setValue.bind(this)} code={code} />;            case 'jet':                return <Mode.Jet setValue={this.setValue.bind(this)} code={code} />;            case 'speed':                return <Mode.Speed setValue={this.setValue.bind(this)} code={code} />;            case 'collar':            case 'drillpipe':                return <Mode.Loop setValue={this.setValue.bind(this)} code={code} />;            default:                return <div> 公示不明确 </div>        }    }    showConfigPanel() {        this.setState({            showConfigPanel: true,            singleItem: ''        });    }    setFormula(formula) {        if(formula === undefined) return null;        if(typeof formula === 'string') {            return <p> {formula} </p>        } else {            let list = [];            formula.forEach((item, key) => {                list.push(<p key={key}> {item} </p>)            })            return list;        }    }    openSetting(item) {        this.setState({            showConfigPanel: true,            singleItem: item        })    }    renderPrams() {        let list = [];        this.state.tabs.forEach((item, key) => {            list.push(<div className='config-unit' key={key} onClick={this.openSetting.bind(this, item)}>                <div className='config-title'>                    <span className='config-label'> {item.label} </span>                </div>                <div className='config-control'>                    <span className='config-input' data-code={item.code}> {item.value} </span>                </div>            </div>)        });        return list;    }    getParams() {        let inputs = this.refs.configPanel.querySelectorAll('input');        const tabs = Object.assign(this.state.tabs, []);        tabs.forEach(item => {            item.value = this.refs.configPanel.querySelector(`input[data-code="${item.code}"]`).value        });        return tabs;    }    confirm() {        this.setState({            showConfigPanel: false,        })    }    close() {        this.setState({            showConfigPanel: false        })    }    setBack(values) {        const tabList = Object.assign(this.state.tabs, []);        values.forEach(item => {            tabList.forEach(tabUnit => {                if(tabUnit.label === item.label) {                    tabUnit.value = item.value.toFixed(2);                }            });        });        this.setState({            tabs: tabList,        })    }    configPanel() {        if(this.state.showConfigPanel === true) {            return <div className='configPanel'>                <div className='config' ref='configPanel'>                    <img className='close' src='./image/icon/close.png' onClick={this.close.bind(this)}/>                    <Mode.Total setBack={this.setBack.bind(this)}/>                </div>            </div>        }        return null;    }    render() {        return (<div className="effect-content">            {this.configPanel()}            <div className="open-config" onClick={this.showConfigPanel.bind(this)}>设置</div>            <img className="drill" src={`./image/effect/drill.gif`}/>            <div className="param-div">                {this.renderPrams()}            </div>            <Toolbar navigate={this.props.navigate && this.props.navigate.bind(this)}/>            </div>)    }}export default Effect;