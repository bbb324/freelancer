import React from 'react';import Tabs from './../common/Tabs.jsx';import Toolbar from './../common/ToolBar.jsx'import Analysis from '../analysis/Analysis.jsx'import Effect from '../effect/Effect.jsx'import Purify from '../purify/Purify.jsx'import '../analysis/analysis.less'import './app.less'class App extends React.Component {    constructor(props) {        super(props);        this.tabs = [            {label: '综合分析', value: 'analysis.png', url: 'comprehensive_analysis.html', index: 1},            {label: '净化能力', value: 'purify.png', url: 'purify.html', index: 2},            {label: '循环压耗', value: 'recycle.png', index: 3},            {label: '环空返速', value: 'back-speed.png', index: 4},            {label: '钻头水功率', value: 'effect.png', url: 'effect.html', index: 5},            {label: '起钻重泵', value: 'heavy.png', index: 6},            {label: '堵漏替量', value: 'lou.png', index: 7},            {label: '堵漏效果模拟', value: 'memic.png', index: 8},            {label: '智能分析', value: 'ai-analysis.png', index: 9}        ];        this.state = {            curIndex: 0        }    }    toPage(item) {        this.setState({            curIndex: item.index        })    }    navigate(item) {        this.setState({            curIndex: 0        })    }    getFrontPage() {        if(this.state.curIndex === 0) {            return <div className="front-page-content">                {/* <div className="title">                 <span className="text">长庆钻井总公司</span>                 </div>*/}                <div>                    <img className='front-page-header' src='./image/homepageImage/header.png'/>                </div>                <div className="tab-content">                    <Tabs dataSource={this.tabs} pageJump={this.toPage.bind(this)} hasPageUrl={true}/>                </div>                <Toolbar navigate={this.navigate.bind(this)}/>            </div>        }        return null;    }    // 综合分析    getAnalysis() {        if(this.state.curIndex === 1) {            return <Analysis  navigate={this.navigate.bind(this)}/>        }       return null;    }    // 净化能力    getPurify() {        if(this.state.curIndex === 2) {            return <Purify />        }        return null;    }    // 钻头水功率    getEffect() {        if(this.state.curIndex === 5) {            return <Effect />        }        return null;    }    render() {        return (<div>            {this.getFrontPage()}            {this.getAnalysis()}            {this.getPurify()}            {this.getEffect()}        </div>)    }}export default App;