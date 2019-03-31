import React from 'react';import Tabs from './../common/Tabs.jsx';import Toolbar from './../common/ToolBar.jsx'import './effect.less'class Effect extends React.Component {    constructor(props) {        super(props);        this.state = {            percent: 0,            showConfigPanel: false,            tabs: [                {label: '水力功率', imgUrl: 'ana-pump.png', code: 'power', value: 0},                {label: '噴嘴水功率', imgUrl: 'nozzle-water.png', code: 'nozzle-water', value: 0},                {label: '比水功率', imgUrl: 'ana-cycle.png', code: 'water-power', value: 0},                {label: '钻头压降', imgUrl: 'ana-cycle.png', code: 'pressure', value:0},                {label: '泵排量', imgUrl: 'ana-cycle.png', code: 'pump', value: 0},                {label: '喷嘴压降', imgUrl: 'ana-cycle.png', code: 'drop', value: 0},                {label: '射流冲击力', imgUrl: 'ana-cycle.png', code: 'jet', value: 0}            ]        };    }    renderPrams() {        let list = [];        this.state.tabs.forEach((item, key) => {            list.push(<div className='config-unit' key={key}>                <div className='config-title'>                    <span className='config-label'> {item.label} </span>                </div>                <div className='config-control'>                    <span className='config-input' data-code={item.code}> {item.value} </span>                </div>            </div>)        });        return list;    }      getPercent(params) {           if(params != undefined) {               let value = params[0].value;  //这里后面要改，这里只输入了一个值，需要一个公式               if(value >= 100) {                  value = 100               }               if(value <= 0) {                   value = 0;               }               return 32*value*0.01;           } else {               return 0;           }        }    showConfigPanel() {        this.setState({            showConfigPanel: true        });    }    getConfigs() {        let list = [];        this.state.tabs.forEach((item, key) => {            list.push(<div className='config-unit' key={key}>               <div className='config-title'>                   <span className='config-label'> {item.label} </span>               </div>                <div className='config-control'>                    <input className='config-input' data-code={item.code} defaultValue={item.value}/>                </div>            </div>)        });        return list;    }    getParams() {        let inputs = this.refs.configPanel.querySelectorAll('input');        const tabs = Object.assign(this.state.tabs, []);        tabs.forEach(item => {            item.value = this.refs.configPanel.querySelector(`input[data-code="${item.code}"]`).value        });        return tabs;    }    confirm() {        const params = this.getParams();        const percent = this.getPercent(params);        this.setState({            showConfigPanel: false,            tabs: params,            percent: percent        })    }    cancel() {        this.setState({            showConfigPanel: false        })    }    configPanel() {        if(this.state.showConfigPanel === true) {            return <div className='configPanel'>                <div className='config' ref='configPanel'>                    {this.getConfigs()}                    <div className='btn-div'>                        <span className='confirm' onClick={this.confirm.bind(this)}>确定</span>                        <span onClick={this.cancel.bind(this)}>取消</span>                    </div>                </div>            </div>        }        return null;    }    render() {        return (<div className="effect-content">            {this.configPanel()}            <div className="open-config" onClick={this.showConfigPanel.bind(this)}>设置</div>            <img className="drill" src={`./image/effect/drill.gif`}/>            <div className="param-div">                {this.renderPrams()}            </div>            <Toolbar navigate={this.props.navigate && this.props.navigate.bind(this)}/>            </div>)    }}export default Effect;