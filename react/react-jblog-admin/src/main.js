import React from 'react';
import ReactDOM from 'react-dom';
import reducers from './redux/reducers';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import Page from './router';
import './assets/scss/main.scss';

const store = createStore(reducers, compose(
  applyMiddleware(thunk), window.devToolsExtension ?
    window.devToolsExtension() :
    f => f
));

const render = Component => {
  ReactDOM.render((
    <Provider store={store}>
      <Component store={store}></Component>
    </Provider>
  ), document.getElementById('root'))
};

render(Page);
