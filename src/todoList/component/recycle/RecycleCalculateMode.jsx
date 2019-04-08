import React from 'react';

function get(ref) {
    return ref.value;
}

// 地面管汇压耗
class Pipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }
    calculate() {
        // 地面管汇摩阻系数*钻井液密度*（泵排量/100）^1.86*9.818
        let value = get(this.refs.a) * get(this.refs.b) * Math.pow((get(this.refs.c) / 100), 1.86) * 9.818;
        this.props.setValue(value, this.props.code);
        this.setState({
            value: value
        })
    }
    render() {
        return <div className="math-params">
            <input placeholder="地面管汇摩阻系数" className='cal-input' ref='a'/>
            <input placeholder="钻井液密度" className='cal-input' ref='b'/>
            <input placeholder="泵排量" className='cal-input' ref='c'/>

            <div>
                <span className='cal-btn' onClick={this.calculate.bind(this)}>计算</span>
                <span> {this.state.value} </span>
            </div>
        </div>
    }
}

// 钻杆内循环压耗
class InnerCycle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }
    calculate() {
        // 7628*塑性粘度^0.2*钻井液密度^0.8*泵排量^1.8*钻具长度/钻具内径^4.82
        let value = 7628 * Math.pow(get(this.refs.a), 0.2) * Math.pow(get(this.refs.b), 0.8) *  Math.pow(get(this.refs.c), 1.8) * get(this.refs.d) / Math.pow(get(this.refs.e), 4.82);
        this.props.setValue(value, this.props.code);
        this.setState({
            value: value
        })
    }
    render() {
        return <div className="math-params">
            <input placeholder="塑性粘度" className='cal-input' ref='a'/>
            <input placeholder="钻井液密度" className='cal-input' ref='b'/>
            <input placeholder="泵排量" className='cal-input' ref='c'/>
            <input placeholder="钻具长度" className='cal-input' ref='d'/>
            <input placeholder="钻具内径" className='cal-input' ref='e'/>

            <div>
                <span className='cal-btn' onClick={this.calculate.bind(this)}>计算</span>
                <span> {this.state.value} </span>
            </div>
        </div>
    }
}




// 钻头压降
class Drill extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }
    calculate() {
        // v1 地面管汇压耗 = 地面管汇摩阻系数*钻井液密度*（泵排量/100）^1.86*9.818
        let value = get(this.refs.a) - get(this.refs.b);
        this.props.setValue(value, this.props.code);
        this.setState({
            value: value
        })
    }
    render() {
        return <div className="math-params">
            <input placeholder="泵压" className='cal-input' ref='a'/>
            <input placeholder="循环压耗" className='cal-input' ref='b'/>

            <div>
                <span className='cal-btn' onClick={this.calculate.bind(this)}>计算</span>
                <span> {this.state.value} </span>
            </div>
        </div>
    }
}

// 循环总压耗
class Cycle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }
    calculate() {
        // v1 地面管汇压耗 = 地面管汇摩阻系数*钻井液密度*（泵排量/100）^1.86*9.818
        let v1 = get(this.refs.e) * get(this.refs.b) * Math.pow((get(this.refs.a) / 100), 1.86) * 9.818;
        // v2 钻铤段的内压耗 = 7628 * 塑性粘度^0.2*钻井液密度^0.8*泵排量^1.8* ((钻具长度/钻具内径)^4.82)
        let v2 = 7628 * Math.pow(get(this.refs.c), 0.2) * Math.pow(get(this.refs.b), 0.8) * Math.pow(get(this.refs.a), 1.8) * get(this.refs.j) / Math.pow(get(this.refs.f), 4.82);
        // v3 钻杆段的内压耗
        let v3 = '';

        // v4 钻铤段环空压耗
        // v5 钻杆段环空压耗


        this.state = {
            value: v1 + v2
        }
    }
    render() {
        return <div className="math-params">
            <input placeholder="泵排量" className='cal-input' ref='a'/>
            <input placeholder="钻井液密度" className='cal-input' ref='b'/>
            <input placeholder="塑性粘度" className='cal-input' ref='c'/>
            <input placeholder="井眼直径" className='cal-input' ref='d'/>
            <input placeholder="地面管汇摩阻系数" className='cal-input' ref='e'/>
            <input placeholder="钻杆加重钻杆钻铤内径" className='cal-input' ref='f'/>
            <input placeholder="钻杆加重钻杆钻铤外径" className='cal-input' ref='g'/>
            <input placeholder="钻杆接箍外径" className='cal-input' ref='h'/>
            <input placeholder="钻杆加重钻杆钻铤长度" className='cal-input' ref='j'/>
            <div>
                <span className='cal-btn' onClick={this.calculate.bind(this)}>计算</span>
                <span> {this.state.value} </span>
            </div>
        </div>
    }
}

// 钻杆环空压耗
class BodyCycle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }

    calculate() {
        // 7628*塑性粘度^0.2*钻井液密度^0.8*泵排量^1.8*钻具长度/(井眼直径-钻具外径)^3/(井眼直径+钻具外径)^1.8
        let value = 7628 * Math.pow(get(this.refs.a), 0.2) * Math.pow(get(this.refs.b), 0.8) *  Math.pow(get(this.refs.c), 1.8) * get(this.refs.d) / Math.pow((get(this.refs.e) - get(this.refs.f)), 3) / Math.pow((get(this.refs.e) + get(this.refs.f)), 1.8)
        this.props.setValue(value, this.props.code);
        this.setState({
            value: value
        })
    }


    render() {
        return <div className="math-params">
            <input placeholder="塑性粘度" className='cal-input' ref='a'/>
            <input placeholder="钻井液密度" className='cal-input' ref='b'/>
            <input placeholder="泵排量" className='cal-input' ref='c'/>
            <input placeholder="钻具长度" className='cal-input' ref='d'/>
            <input placeholder="井眼直径" className='cal-input' ref='e'/>
            <input placeholder="钻具外径" className='cal-input' ref='f'/>
            <div>
                <span className='cal-btn' onClick={this.calculate.bind(this)}>计算</span>
                <span> {this.state.value} </span>
            </div>
        </div>
    }
}


module.exports = {
    Drill,
    Cycle,
    Pipe,
    InnerCycle,
    BodyCycle
};