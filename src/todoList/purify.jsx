/**
 * Created by junxie on 18/5/27.
 */
import React from 'react';
import ReactDom from 'react-dom';
import App from './component/front-page/App';
import Purify from './component/purify/Purify.jsx';

ReactDom.render(<Purify />,
    document.getElementById('root')
);