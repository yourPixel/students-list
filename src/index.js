import React from 'react';
import {render} from 'react-dom';
import Root from './containers';
import {unregister} from './serviceWorker';
import './containers/index.scss';

render(<Root />, document.getElementById('root'));
unregister();
