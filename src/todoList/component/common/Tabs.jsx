/**
 * Created by X-jn on 2019/3/27.
 */
import React from 'react';
import './tabs.less'

class Tabs extends React.PureComponent {

    setInput(item) {
        return <input className="text-input" onChange={this.onInputChange.bind(this, item)} />
    }

    onInputChange(item, e) {
        if(item.label === '泵排量') {
            this.props.getValue(e.target.value);
        }
    }

    jump(item) {
        this.props.pageJump(item.url)
    }

    render() {
        let list = [];
        this.props.dataSource.forEach((item, key)=> {
            list.push(<div key={key} className="tab" onClick={this.props.hasPageUrl ? this.jump.bind(this, item) : null}>
                {this.props.withInput ? this.setInput(item) : null}
                <img className="icon" src= {`/public/image/icon/${item.value}`}/>
                {item.label}
            </div>)
        })
        return <div className="tab-div">
            {list}
            </div>
    }
}

export default Tabs;