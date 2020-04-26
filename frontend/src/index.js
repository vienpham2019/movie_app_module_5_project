import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {createStore} from 'redux'
import {Provider} from 'react-redux'

// react-slick css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 

import App from './App'
import movieReducer from './reducer/movieReducer'

const store = createStore(movieReducer)

ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
