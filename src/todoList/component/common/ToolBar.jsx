/**
 * Created by X-jn on 2019/3/27.
 */
import React from 'react';
import './toolbar.less'

class ToolBar extends React.Component {

    constructor(props) {
        super(props);
        this.tabs = [
            {label: '功能', value: 'toobar-func.png', index: 0},
            {label: '我的', value: 'toobar-my.png'},
            {label: '历史', value: 'toobar-history.png'}
        ]
    }

    render() {
        let list = [];
        this.tabs.forEach((item, key)=> {
            list.push(<div key={key} className="toolbar" onClick={this.props.navigate && this.props.navigate.bind(this, item)}>
                <img className="icon" src= {`./image/homepageImage/${item.value}`}/>
                {item.label}
            </div>)
        })
        return <div className="toolbar-div">
            {list}
        </div>
    }
}

export default ToolBar;