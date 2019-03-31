/**
 * Created by X-jn on 2019/3/27.
 */
import React from 'react';
import './tabs.less'

class Tabs extends React.PureComponent {

    setSpan(item) {
        return <span className="text-input" onClick={this.showConfigPanel.bind(this, item)} />
    }

    showConfigPanel(item, e) {
       this.props.showConfigPanel(true);
    }

    jump(item) {
        this.props.pageJump(item)
    }

    render() {
        let list = [];
        this.props.dataSource.forEach((item, key)=> {
            list.push(<div key={key} className="tab" onClick={this.props.hasPageUrl ? this.jump.bind(this, item) : null}>
                {this.props.withInput ? this.setSpan(item) : null}
                <img className="icon" src= {`./image/icon/${item.value}`}/>
                {item.label}
            </div>)
        })
        return <div className="tab-div">
            {list}
            </div>
    }
}

export default Tabs;