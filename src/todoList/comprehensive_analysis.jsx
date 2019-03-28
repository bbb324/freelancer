/**
 * Created by junxie on 18/5/27.
 */
import React from 'react';
import ReactDom from 'react-dom';
import App from './component/front-page/App';
import Analysis from './component/analysis/Analysis.jsx';



/*ReactDom.render(<App />,
 document.getElementById('root')
 );*/

ReactDom.render(<Analysis />,
    document.getElementById('root')
);