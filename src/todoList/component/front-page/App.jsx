import React from 'react';import Tabs from './../common/Tabs.jsx';import Toolbar from './../common/ToolBar.jsx'import './app.less'class App extends React.Component {    constructor(props) {        super(props);        this.tabs = [            {label: '综合分析', value: 'analysis.png', url: 'comprehensive_analysis.html'},            {label: '净化能力', value: 'clearify.png'},            {label: '循环压耗', value: 'recycle.png'},            {label: '环空返速', value: 'back-speed.png'},            {label: '钻头水功率', value: 'effect.png'},            {label: '起钻重泵', value: 'heavy.png'},            {label: '堵漏替量', value: 'lou.png'},            {label: '堵漏效果模拟', value: 'memic.png'},            {label: '智能分析', value: 'ai-analysis.png'}        ]    }    toPage(v) {        window.open(`${v}`);    }    render() {        return (<div className="front-page-content">            {/* <div className="title">                <span className="text">长庆钻井总公司</span>            </div>*/}            <div>                <img className='front-page-header' src='./image/homepageImage/header.png'/>            </div>            <div className="tab-content">                <Tabs dataSource={this.tabs} pageJump={this.toPage.bind(this)} hasPageUrl={true}/>            </div>            <Toolbar />            </div>)    }}export default App;