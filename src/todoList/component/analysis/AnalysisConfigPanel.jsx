/**
 * Created by X-jn on 2019/3/30.
 */
import React from 'react';
import Tabs from './../common/Tabs.jsx';
import Toolbar from './../common/ToolBar.jsx'
import './analysis.less'

class AnalysisConfigPanel extends React.Component {

    openSetting(item) {
        this.props.openSetting(item);
    }

    renderTab() {
        let list = [];
        this.props.dataSource.forEach((item, key) => {
            list.push(<div className='analysis-tab' style={{backgroundImage: `url(../../freelancer/public/image/icon/${item.imgUrl})`}} key={key} onClick={this.openSetting.bind(this, item)}>
                <span className="data-display" > {item.value} </span>
            </div>);
        });
        return list;
    }

    render() {
       return <div className='analysis-tabs'>
           {this.renderTab()}
       </div>

    }
}

export default AnalysisConfigPanel;
