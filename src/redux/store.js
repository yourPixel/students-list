import students from './reducers/students';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export const store = createStore(students, applyMiddleware(thunk));

// store.subscribe(() => console.log(store.getState()));
