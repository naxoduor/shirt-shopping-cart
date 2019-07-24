import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import rootReducer from './reducers'
import 'bootstrap/dist/css/bootstrap.css'

const initialState = [];

const store = createStore(
    rootReducer, composeWithDevTools(applyMiddleware(thunk)));

const app = <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
</Provider>
ReactDOM.render(app, document.getElementById('root'));
