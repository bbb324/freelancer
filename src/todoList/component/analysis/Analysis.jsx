import React from 'react';import Tabs from './../common/Tabs.jsx';import Toolbar from './../common/ToolBar.jsx'import AnalysisConfigPanel from './AnalysisConfigPanel.jsx'import AnalysisAnimation from './AnalysisAnimation.jsx'import Mode from '../common/CalculatMode.jsx'import './analysis.less'class Analysis extends React.Component {    constructor(props) {        super(props);        this.state = {            percent: 0,            showConfigPanel: true,            tabs: [                {                    label: '泵排量', imgUrl: 'ana-pump.png', code: 'pump', value: '',                    formula: 'π*（缸套直径/2）^2*活塞冲程*缸套数*冲数*上水效率'                },                {label: '循环压耗', imgUrl: 'ana-cycle.png', code: 'cycle', value: ''},                {                    label: '钻头压降', imgUrl: 'ana-drill.png', code: 'drill', value: '',                    formula: '泵压 - 循环压耗'                },                {label: '液流变参数', imgUrl: 'ana-params.png', code: 'params', value: ''},                {                    label: '环空返速', imgUrl: 'ana-loop.png', code: 'loop', value: '',                    formula: '1.2732 * Math.pow(10, 3) *泵排量 / (Math.pow(井眼直径, 2) - Math.pow(钻具外径, 2))'                },                {label: '流态', imgUrl: 'ana-flow.png', code: 'flow', value: ''}            ]        };    }    getCalculator(code) {        switch (code) {            case 'pump':                return <Mode.Pump />;            case 'cycle':                return <Mode.Cycle />            case 'drill':                return <Mode.Drill />            case 'params':                return <Mode.Params />            case 'loop':                return <Mode.Loop />            case 'flow':                return <Mode.Flow />            default:                return <div> default </div>        }    }  getPercent(params) {       if(params != undefined) {           let value = params[0].value;  //这里后面要改，这里只输入了一个值，需要一个公式           if(value >= 100) {              value = 100           }           if(value <= 0) {               value = 0;           }           return 32*value*0.01;       } else {           return 0;       }    }    showConfigPanel() {        this.setState({            showConfigPanel: true        });    }    getConfigs() {        let list = [];        this.state.tabs.forEach((item, key) => {            list.push(<li className='config-unit' key={key}>               <div className='config-title'>                   <span className='config-label'> {item.label} </span>                   <span className='config-formula'> {item.formula} </span>               </div>                <div className='config-control'>                    {this.getCalculator(item.code)}                </div>            </li>)        });        return list;    }    getParams() {        let inputs = this.refs.configPanel.querySelectorAll('input');        const tabs = Object.assign(this.state.tabs, []);        tabs.forEach(item => {            item.value = this.refs.configPanel.querySelector(`input[data-code="${item.code}"]`).value        });        return tabs;    }    confirm() {        const params = this.getParams();        const percent = this.getPercent(params);        this.setState({            showConfigPanel: false,            tabs: params,            percent: percent        })    }    cancel() {        this.setState({            showConfigPanel: false        })    }    configPanel() {        if(this.state.showConfigPanel === true) {            return <div className='configPanel'>                <div className='config' ref='configPanel'>                    {this.getConfigs()}                    <div className='btn-div'>                        <span className='confirm' onClick={this.confirm.bind(this)}>确定</span>                        <span onClick={this.cancel.bind(this)}>取消</span>                    </div>                </div>            </div>        }        return null;    }    render() {        return (<div className="ana-content">            {this.configPanel()}            <div className="shiubeng-bg">                <div className="open-config" onClick={this.showConfigPanel.bind(this)}>设置</div>               <AnalysisAnimation />               <div className="water-bg" style={{height: `${this.state.percent}%`}}>                   <img className="water" src={`./image/icon/water.png`}/>               </div>            </div>            <AnalysisConfigPanel dataSource={this.state.tabs} />            <Toolbar navigate={this.props.navigate && this.props.navigate.bind(this)}/>            </div>)    }}export default Analysis;