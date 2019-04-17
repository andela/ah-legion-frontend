import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import style from 'bootstrap/dist/css/bootstrap.css';
import './index.scss';
import './css/App.css';
import Routes from './routes';
import * as serviceWorker from './serviceWorker';
import store from './store/store';

require('dotenv').config();

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
