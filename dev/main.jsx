import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './style.scss';
import 'octicons/octicons/octicons.scss';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

ReactDOM.render(<App />, document.getElementById('app'));
