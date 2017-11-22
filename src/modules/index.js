import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import app from './app';
import main from './main';

export default combineReducers({
    router: routerReducer,
    app,
    main,
});