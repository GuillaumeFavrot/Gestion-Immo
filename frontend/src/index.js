// The index.js file is a key component of a React app. 
// Its role is to :
// 1) Insert the app (<App />) component into the 'root' div of the index.html file.
// 2) Provide the app with the redux store so that any component of the app can easily access any information in the store without any prop drilling.

import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './components/App';
import store from './components/state/store'
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
      <App />
    </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
