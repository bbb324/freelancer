import React from 'react';

function get(ref) {
    return ref.value;
}

var event = document.createEvent('HTMLEvents')

// 水力功率
class Power extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }
    calculate() {
        // 泵压*泵排量
        let value = get(this.refs.a) * get(this.refs.b);
        this.props.setValue(value, this.props.code);
        this.setState({
            value: value
        });
    }
    render() {
        return <div className="math-params">
            <input type="number" placeholder="泵压" className='cal-input' ref='a'/>
            <input type="number" placeholder="泵排量" className='cal-input' ref='b'/>
            <div>
                <span className='cal-btn' onClick={this.calculate.bind(this)}>计算</span>
                <span> {this.state.value} </span>
            </div>
        </div>
    }
}

// 喷嘴水功率
class Nozzle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }
    calculate() {
        // 喷嘴压降*泵排量
        let value = get(this.refs.a) * get(this.refs.b);
        this.props.setValue(value, this.props.code);

        event.initEvent("triggerNozzle", true, true);
        event.nozzleValue = value;
        document.dispatchEvent(event);

        this.setState({
            value: value
        });
    }
    render() {
        return <div className="math-params">
            <input type="number" placeholder="喷嘴压降" className='cal-input' ref='a'/>
            <input type="number" placeholder="泵排量" className='cal-input' ref='b'/>
            <div>
                <span className='cal-btn' onClick={this.calculate.bind(this)}>计算</span>
                <span> {this.state.value} </span>
            </div>
        </div>
    }
}

// 比水功率
class WaterPower extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            initNozzleValue: ''
        }
    }
    calculate() {
        // 喷嘴水功率*1000/(π*钻头直径*钻头直径/4)
        let value = get(this.refs.a) * 1000/ (Math.PI * get(this.refs.b) * get(this.refs.c)/4)
        this.props.setValue(value, this.props.code);
        this.setState({
            value: value,
        });
    }
    render() {
        return <div className="math-params">
            <input type="number" placeholder="喷嘴水功率" className='cal-input' ref='a' defaultValue={this.state.initNozzleValue}/>
            <input type="number" placeholder="钻头直径" className='cal-input' ref='b'/>
            <input type="number" placeholder="钻头直径" className='cal-input' ref='c'/>
            <div>
                <span className='cal-btn' onClick={this.calculate.bind(this)}>计算</span>
                <span> {this.state.value} </span>
            </div>
        </div>
    }

    componentDidMount() {
        this.eventListener = document.addEventListener('triggerNozzle', event => {
            this.setState({
                initNozzleValue: event.nozzleValue
            })
        }, false);
    }
    componentWillUnMount() {
        document.removeEventListener(this.eventListener);
    }
}
// 钻头压降
class Pressure extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }
    calculate() {
        //  泵压 - 循环压耗
        let value = get(this.refs.a) - get(this.refs.b);
        this.props.setValue(value, this.props.code);
        this.setState({
            value: value
        });
    }
    render() {
        return <div className="math-params">
            <input type="number" placeholder="泵压" className='cal-input' ref='a'/>
            <input type="number" placeholder="循环压耗" className='cal-input' ref='b'/>
            <div>
                <span className='cal-btn' onClick={this.calculate.bind(this)}>计算</span>
                <span> {this.state.value} </span>
            </div>
        </div>
    }
}

// 泵排量
class Pump extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }
    calculate() {
        let value = Math.PI * Math.pow(( get(this.refs.a) / 2), 2) * get(this.refs.b) * get(this.refs.c) * get(this.refs.d)  * get(this.refs.e) * 100;
        this.props.setValue(value, this.props.code);
        this.setState({
            value: value
        });
    }
    render() {
        return <div className="math-params">
            <input placeholder="管套直径" className='cal-input' ref='a'/>
            <input placeholder="活塞冲程" className='cal-input' ref='b'/>
            <input placeholder="缸套数" className='cal-input' ref='c'/>
            <input placeholder="冲数" className='cal-input' ref='d'/>
            <input placeholder="上水效率" className='cal-input' ref='e'/>
            <div>
                <span className='cal-btn' onClick={this.calculate.bind(this)}>计算</span>
                <span> {this.state.value} %</span>
            </div>
        </div>
    }
}

// 喷嘴压降
class Drop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }
    calculate() {
        //  810*钻井液密度*泵排量*泵排量/(0.98*0.98*(喷嘴1*喷嘴1+喷嘴2*喷嘴2+喷嘴3*喷嘴3+喷嘴4*喷嘴4+喷嘴5*喷嘴5+喷嘴6*喷嘴6+喷嘴7*喷嘴7+喷嘴8*喷嘴8)*(喷嘴1*喷嘴1+喷嘴2*喷嘴2+喷嘴3*喷嘴3+喷嘴4*喷嘴4+喷嘴5*喷嘴5+喷嘴6*喷嘴6+喷嘴7*喷嘴7+喷嘴8*喷嘴8)

        // 喷嘴 1至8 计算结果
        let val =  Math.pow(get(this.refs.c), 2) * Math.pow(get(this.refs.d), 2) * Math.pow(get(this.refs.e), 2) * Math.pow(get(this.refs.f), 2) * Math.pow(get(this.refs.g), 2) * Math.pow(get(this.refs.h), 2) * Math.pow(get(this.refs.i), 2) * Math.pow(get(this.refs.j), 2);
        let value = 810 * get(this.refs.a) * Math.pow(get(this.refs.b), 2) / (0.98 * 0.98 * val );
        this.props.setValue(value, this.props.code);
        this.setState({
            value: value
        });
    }
    render() {
        return <div className="math-params">
            <input type="number" placeholder="钻井液密度" className='cal-input' ref='a'/>
            <input type="number" placeholder="泵排量" className='cal-input' ref='b'/>
            <input type="number" placeholder="喷嘴1" className='cal-input' ref='c'/>
            <input type="number" placeholder="喷嘴2" className='cal-input' ref='d'/>
            <input type="number" placeholder="喷嘴3" className='cal-input' ref='e'/>
            <input type="number" placeholder="喷嘴4" className='cal-input' ref='f'/>
            <input type="number" placeholder="喷嘴5" className='cal-input' ref='g'/>
            <input type="number" placeholder="喷嘴6" className='cal-input' ref='h'/>
            <input type="number" placeholder="喷嘴7" className='cal-input' ref='i'/>
            <input type="number" placeholder="喷嘴8" className='cal-input' ref='j'/>
            <div>
                <span className='cal-btn' onClick={this.calculate.bind(this)}>计算</span>
                <span> {this.state.value} </span>
            </div>
        </div>
    }
}

// 射流冲击力
class Jet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }
    calculate() {

        // 喷嘴 1至8 计算结果
        let val =  Math.pow(get(this.refs.c), 2) * Math.pow(get(this.refs.d), 2) * Math.pow(get(this.refs.e), 2) * Math.pow(get(this.refs.f), 2) * Math.pow(get(this.refs.g), 2) * Math.pow(get(this.refs.h), 2) * Math.pow(get(this.refs.i), 2) * Math.pow(get(this.refs.j), 2);

        let value = 1273 * get(this.refs.a) * Math.pow(get(this.refs.b), 2) / val;

        this.props.setValue(value, this.props.code);
        this.setState({
            value: value
        });
    }
    render() {
        return <div className="math-params">
            <input type="number" placeholder="钻井液密度" className='cal-input' ref='a'/>
            <input type="number" placeholder="泵排量" className='cal-input' ref='b'/>
            <input type="number" placeholder="喷嘴1" className='cal-input' ref='c'/>
            <input type="number" placeholder="喷嘴2" className='cal-input' ref='d'/>
            <input type="number" placeholder="喷嘴3" className='cal-input' ref='e'/>
            <input type="number" placeholder="喷嘴4" className='cal-input' ref='f'/>
            <input type="number" placeholder="喷嘴5" className='cal-input' ref='g'/>
            <input type="number" placeholder="喷嘴6" className='cal-input' ref='h'/>
            <input type="number" placeholder="喷嘴7" className='cal-input' ref='i'/>
            <input type="number" placeholder="喷嘴8" className='cal-input' ref='j'/>
            <div>
                <span className='cal-btn' onClick={this.calculate.bind(this)}>计算</span>
                <span> {this.state.value} </span>
            </div>
        </div>
    }
}

// 喷射速度
class Speed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }
    calculate() {

        // 喷嘴 1至8 计算结果
        let val =  Math.pow(get(this.refs.c), 2) * Math.pow(get(this.refs.d), 2) * Math.pow(get(this.refs.e), 2) * Math.pow(get(this.refs.f), 2) * Math.pow(get(this.refs.g), 2) * Math.pow(get(this.refs.h), 2) * Math.pow(get(this.refs.i), 2) * Math.pow(get(this.refs.j), 2);

        let value = 1273 * get(this.refs.a) * get(this.refs.b) / val;

        this.props.setValue(value, this.props.code);
        this.setState({
            value: value
        });
    }
    render() {
        return <div className="math-params">
            <input type="number" placeholder="钻井液密度" className='cal-input' ref='a'/>
            <input type="number" placeholder="泵排量" className='cal-input' ref='b'/>
            <input type="number" placeholder="喷嘴1" className='cal-input' ref='c'/>
            <input type="number" placeholder="喷嘴2" className='cal-input' ref='d'/>
            <input type="number" placeholder="喷嘴3" className='cal-input' ref='e'/>
            <input type="number" placeholder="喷嘴4" className='cal-input' ref='f'/>
            <input type="number" placeholder="喷嘴5" className='cal-input' ref='g'/>
            <input type="number" placeholder="喷嘴6" className='cal-input' ref='h'/>
            <input type="number" placeholder="喷嘴7" className='cal-input' ref='i'/>
            <input type="number" placeholder="喷嘴8" className='cal-input' ref='j'/>
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
        // value 环空返速 = 1.2732 * Math.pow(10, 3) *泵排量 / (Math.pow(井眼直径, 2) - Math.pow(钻具外径, 2))
        let value = 1.2732 * Math.pow(10, 3) * get(this.refs.a) / (Math.pow(get(this.refs.b), 2) - Math.pow(get(this.refs.c), 2));
        this.props.setValue(value, this.props.code);
        this.setState({
            value: value
        })
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


module.exports = {
    Power,
    Nozzle,
    WaterPower,
    Pressure,
    Pump,
    Drop,
    Jet,
    Speed,
    Loop

};