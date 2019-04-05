import React from 'react';

function get(ref) {
    return ref.value;
}

// 泵排量计算公式
class Viscosity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }
    calculate() {
        // Ф600 / 2
        let value = get(this.refs.a) / 2
        this.setState({
            value: value
        });
    }
    render() {
        return <div className="math-params">
            <input placeholder="Ф600" className='cal-input' ref='a'/>
            <div>
                <span className='cal-btn' onClick={this.calculate.bind(this)}>计算</span>
                <span> {this.state.value} </span>
            </div>
        </div>
    }
}

// 塑性粘度计算公式
class PlasticViscosity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }
    calculate() {
        // Ф600 / 2
        let value = get(this.refs.a) - get(this.refs.b)
        this.setState({
            value: value
        });
    }
    render() {
        return <div className="math-params">
            <input placeholder="Ф600" className='cal-input' ref='a'/>
            <input placeholder="Ф300" className='cal-input' ref='b'/>
            <div>
                <span className='cal-btn' onClick={this.calculate.bind(this)}>计算</span>
                <span> {this.state.value} </span>
            </div>
        </div>
    }
}

// 动切力
class YieldPoint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }
    calculate() {
        // 0.479 * (2*Ф300-Ф600)
        let value = 0.479 * (2 * get(this.refs.b) - get(this.refs.b))
        this.setState({
            value: value
        });
    }
    render() {
        return <div className="math-params">
            <input placeholder="Ф600" className='cal-input' ref='a'/>
            <input placeholder="Ф300" className='cal-input' ref='b'/>
            <div>
                <span className='cal-btn' onClick={this.calculate.bind(this)}>计算</span>
                <span> {this.state.value} </span>
            </div>
        </div>
    }
}
// 动塑比
class FreezePlastic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }
    calculate() {
        //  动切力 / 动塑比
        let value = get(this.refs.a) / get(this.refs.b);
        this.setState({
            value: value
        });
    }
    render() {
        return <div className="math-params">
            <input placeholder="动切力(YP)" className='cal-input' ref='a'/>
            <input placeholder="塑性粘度(VP)" className='cal-input' ref='b'/>
            <div>
                <span className='cal-btn' onClick={this.calculate.bind(this)}>计算</span>
                <span> {this.state.value} </span>
            </div>
        </div>
    }
}

// 环空返速
class Loop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }
    calculate() {
        //  1.2732 * Math.pow(10, 3) *泵排量 / (Math.pow(井眼直径, 2) - Math.pow(钻具外径, 2))
        let value =1.2732 * Math.pow(10, 3) * get(this.refs.a) / (Math.pow(get(this.refs.b), 2) - Math.pow(get(this.refs.c), 2))
        this.setState({
            value: value
        });
    }
    render() {
        return <div className="math-params">
            <input placeholder="泵排量" className='cal-input' ref='a'/>
            <input placeholder="井眼直径" className='cal-input' ref='b'/>
            <input placeholder="钻具外径" className='cal-input' ref='c'/>
            <div>
                <span className='cal-btn' onClick={this.calculate.bind(this)}>计算</span>
                <span> {this.state.value} </span>
            </div>
        </div>
    }
}

// 岩屑滑落速度
class SlipSpeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }
    calculate() {
        //  0.071*岩屑直径*(岩屑密度-钻井液密度)^0.667/(钻井液密度*有效视粘度)^0.333
        let value = 0.071 * get(this.refs.a) * Math.pow((get(this.refs.b) - get(this.refs.c)), 0.667) / Math.pow(( get(this.refs.c) * get(this.refs.d)), 0.333);
        this.setState({
            value: value
        });
    }
    render() {
        return <div className="math-params">
            <input placeholder="岩屑直径" className='cal-input' ref='a'/>
            <input placeholder="岩屑密度" className='cal-input' ref='b'/>
            <input placeholder="钻井液密度" className='cal-input' ref='c'/>
            <input placeholder="有效视粘度" className='cal-input' ref='d'/>
            <div>
                <span className='cal-btn' onClick={this.calculate.bind(this)}>计算</span>
                <span> {this.state.value} </span>
            </div>
        </div>
    }
}

// 岩屑净上升速度
class RisingSpeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }
    calculate() {
        //  环空返速-岩屑滑落速度
        let value = get(this.refs.a) - get(this.refs.b)
        this.setState({
            value: value
        });
    }
    render() {
        return <div className="math-params">
            <input placeholder="环空返速" className='cal-input' ref='a'/>
            <input placeholder="岩屑滑落速度" className='cal-input' ref='b'/>
            <div>
                <span className='cal-btn' onClick={this.calculate.bind(this)}>计算</span>
                <span> {this.state.value} </span>
            </div>
        </div>
    }
}

// 流性指数
class FlowIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }
    calculate() {
        //  3.322 * Math.log10(Ф600 / Ф300)
        let value = 3.322 * Math.log10(get(this.refs.a) / get(this.refs.b));
        this.setState({
            value: value
        });
    }
    render() {
        return <div className="math-params">
            <input placeholder="Ф600" className='cal-input' ref='a'/>
            <input placeholder="Ф300" className='cal-input' ref='b'/>
            <div>
                <span className='cal-btn' onClick={this.calculate.bind(this)}>计算</span>
                <span> {this.state.value} </span>
            </div>
        </div>
    }
}

// 稠度系数
class Coefficient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }
    calculate() {
        //  (0.511 * Ф300) / Math.pow(511, 3.322 * Math.log10(Ф600 / Ф300))
        let value =(0.511 * get(this.refs.b)) / Math.pow(511, 3.322 * Math.log10( get(this.refs.a) / get(this.refs.b)))
        this.setState({
            value: value
        });
    }
    render() {
        return <div className="math-params">
            <input placeholder="Ф600" className='cal-input' ref='a'/>
            <input placeholder="Ф300" className='cal-input' ref='b'/>
            <div>
                <span className='cal-btn' onClick={this.calculate.bind(this)}>计算</span>
                <span> {this.state.value} </span>
            </div>
        </div>
    }
}

// 井眼净化能力
class Ability extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }
    calculate() {
        //  岩屑净上升速度/环空返速*100%
        let value =get(this.refs.a) / get(this.refs.b) * 100
        this.setState({
            value: value
        });
    }
    render() {
        return <div className="math-params">
            <input placeholder="岩屑净上升速度" className='cal-input' ref='a'/>
            <input placeholder="环空返速" className='cal-input' ref='b'/>
            <div>
                <span className='cal-btn' onClick={this.calculate.bind(this)}>计算</span>
                <span> {this.state.value}%</span>
            </div>
        </div>
    }
}

module.exports = {
    Viscosity,
    PlasticViscosity,
    YieldPoint,
    FreezePlastic,
    Loop,
    SlipSpeed,
    RisingSpeed,
    FlowIndex,
    Coefficient,
    Ability

};