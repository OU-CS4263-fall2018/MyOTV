import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './redux/store/configureStore';
import { BrowserRouter } from 'react-router-dom';
import {
    Route,
    Link
} from 'react-router-dom';

ReactDOM.render(
<Provider store={store}>
    <BrowserRouter>
        <PersistGate persistor={persistor}>
            <App />
        </PersistGate>
    </BrowserRouter>
</Provider>, document.getElementById('root'));
serviceWorker.register();