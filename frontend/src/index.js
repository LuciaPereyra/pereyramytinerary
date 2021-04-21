import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './App.css';
import App from './App';
import {applyMiddleware, createStore} from "redux"
import {Provider} from "react-redux"
import thunk from "redux-thunk"
import rootReducer from "./redux/reducers/rootreducer"

const miStore = createStore(rootReducer,applyMiddleware(thunk)) // creo store, contiene función 

ReactDOM.render(
  // conecto mi App con miStore
  <React.Fragment>
    <Provider store={miStore}>
      <App/>
    </Provider> 
  </React.Fragment>,
  document.getElementById('root')
);

