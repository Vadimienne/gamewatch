import {createStore} from 'redux';
import rootReducer from './reducers/rootReducer';

//const store = createStore(rootReducer);

export const initStore = (initialState, options) => {
    return createStore(rootReducer, initialState)
}

//export default store;