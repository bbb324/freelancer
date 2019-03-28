/**
 * Created by X-jn on 2019/3/27.
 */
import React from 'react';
import './toolbar.less'

class ToolBar extends React.Component {

    constructor(props) {
        super(props);
        this.tabs = [
            {label: '功能', value: 'toobar-func.png'},
            {label: '我的', value: 'toobar-my.png'},
            {label: '历史', value: 'toobar-history.png'},
        ]
    }

    render() {
        let list = [];
        this.tabs.forEach((item, key)=> {
            list.push(<div key={key} className="toolbar">
                <img className="icon" src= {`/public/image/homepageImage/${item.value}`}/>
                {item.label}
            </div>)
        })
        return <div className="toolbar-div">
            {list}
        </div>
    }
}

export default ToolBar;