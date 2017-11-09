// @flow

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import MuiThemeProvider from 'material-ui-next/styles/MuiThemeProvider';
import { createMuiTheme } from 'material-ui-next/styles';

import store, { history } from './store';
import App from './App';

// Css imports
import './styles/index.css';
import 'typeface-roboto';

// Polyfill imports
import 'core-js/es6/object';
import 'core-js/es6/map';
import 'core-js/modules/es6.symbol';
import 'core-js/modules/es7.array.includes';
import 'core-js/modules/es6.string.includes';
import 'core-js/modules/es6.array.find';
import 'core-js/modules/es6.array.find-index';
import 'core-js/modules/es6.array.iterator.js';
import 'core-js/modules/es6.array.from';
import 'core-js/modules/es6.object.keys';
import 'core-js/modules/es7.object.entries';
import 'core-js/modules/es6.number.is-integer';

import blue from 'material-ui-next/colors/blue';
import red from 'material-ui-next/colors/red';

const target = document.querySelector('#root');

// Override global styles
const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: red,
        error: red,
    },
});

render(
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <div>
                    <App />
                </div>
            </ConnectedRouter>
        </Provider>
    </MuiThemeProvider>,
    target
);