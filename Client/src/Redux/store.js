import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer'
import thunkMiddleware from 'redux-thunk'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(thunkMiddleware))// Esta linea nos permite hacer peticiones a un servidor
)
export default store
