import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import {productsReducer} from './reducers/productReducers';
import thunk from 'redux-thunk';
import { cartReducer } from "./reducers/cartReducers";
import { orderReducer } from "./reducers/orderReducers";


const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers({
    products: productsReducer,
    cart: cartReducer,
    order: orderReducer,

    }), 
    initialState, 
    composeEnhancer(applyMiddleware(thunk))

);
export default store;
