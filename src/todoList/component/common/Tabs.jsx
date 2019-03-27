/**
 * Created by X-jn on 2019/3/27.
 */
import React from 'react';
import './tabs.less'

class Tabs extends React.Component {
    render() {
        let list = [];
        this.props.dataSource.forEach((item, key)=> {
            list.push(<div key={key} className="tab">
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